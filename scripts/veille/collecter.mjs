// Collecteur de veille technologique.
//
// Lancé chaque jour par GitHub Actions (voir .github/workflows/deploy.yml), il :
//   1. lit les sources et les mots-clés de scripts/veille/sources.json ;
//   2. récupère les flux RSS/Atom de chaque source et les articles marquants de Hacker News ;
//   3. ne garde que les articles qui correspondent aux sujets suivis (mots-clés) ;
//   4. les ajoute à l'archive public/veille/articles.json, sans jamais effacer les anciens ;
//   5. régénère public/veille/sources.opml, à importer dans Feedly pour suivre les mêmes sources.
//
// Usage : node scripts/veille/collecter.mjs            (collecte du jour)
//         node scripts/veille/collecter.mjs --historique (en plus : reconstitue l'historique depuis le début de chaque sujet)
// Aucune dépendance : Node 22 suffit (fetch est intégré).

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ici = dirname(fileURLToPath(import.meta.url));
const racine = join(ici, '..', '..');
const fichierArchive = join(racine, 'public', 'veille', 'articles.json');
const fichierOpml = join(racine, 'public', 'veille', 'sources.opml');
const config = JSON.parse(readFileSync(join(ici, 'sources.json'), 'utf8'));
const historique = process.argv.includes('--historique');
// Environ 1 500 articles par an et par sujet au rythme quotidien : le plafond (simple garde-fou)
// laisse plus de dix ans d'historique, rien n'est effacé en pratique.
const MAX_PAR_DOMAINE = 20000;
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- Outils ----------

const regex = (liste) => liste.map(([source, flags]) => new RegExp(source, flags));
const filtres = Object.fromEntries(
  Object.entries(config.domaines).map(([id, d]) => [
    id,
    {
      inclure: regex(d.inclure),
      exclure: regex(d.exclure || []),
      hackerNews: regex(d.exigerPourHackerNews || []),
      // Mots-clés plus stricts pour les sites d'actualité généralistes ("actualite": true dans sources.json).
      actualite: d.inclureActualite ? regex(d.inclureActualite) : null,
    },
  ]),
);

/**
 * Un titre est retenu s'il contient au moins un mot-clé du sujet (ou de la source, si elle a ses
 * propres mots-clés) et aucun mot-clé exclu.
 */
function correspond(domaine, titre, toutAccepter = false, inclureSource = null) {
  const f = filtres[domaine];
  if (f.exclure.some((r) => r.test(titre))) return false;
  return toutAccepter || (inclureSource || f.inclure).some((r) => r.test(titre));
}

function decoder(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&(apos|#39);/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

const texte = (s) =>
  decoder((s || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();

const balise = (bloc, nom) => {
  const m = bloc.match(new RegExp(`<${nom}(?:\\s[^>]*)?>([\\s\\S]*?)</${nom}>`, 'i'));
  return m ? m[1] : '';
};

/** Adresse canonique : sans paramètres de suivi ni « / » final, pour repérer les doublons. */
function canonique(url) {
  try {
    const u = new URL(url);
    for (const p of [...u.searchParams.keys()]) if (/^(utm_|ref$|source$|fbclid|gclid)/i.test(p)) u.searchParams.delete(p);
    u.hash = '';
    return (u.host.replace(/^www\./, '') + u.pathname.replace(/\/+$/, '') + (u.search || '')).toLowerCase();
  } catch {
    return url;
  }
}

const identifiant = (url) => createHash('sha1').update(canonique(url)).digest('hex').slice(0, 16);
const domaineDe = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return '';
  }
};

async function telecharger(url) {
  const reponse = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (veille technologique du portfolio de Moncef MALLEM)', Accept: '*/*' },
    signal: AbortSignal.timeout(25000),
  });
  if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
  // Certains flux (Le Monde Informatique…) sont encodés en ISO-8859-1 : on lit l'encodage annoncé.
  const octets = new Uint8Array(await reponse.arrayBuffer());
  let encodage = ((reponse.headers.get('content-type') || '').match(/charset=([\w-]+)/i) || [])[1];
  if (!encodage) encodage = (new TextDecoder('ascii').decode(octets.slice(0, 200)).match(/encoding=["']([\w-]+)["']/i) || [])[1];
  try {
    return new TextDecoder(encodage || 'utf-8').decode(octets);
  } catch {
    return new TextDecoder('utf-8').decode(octets);
  }
}

/** Lit un flux RSS 2.0 ou Atom et renvoie [{ titre, url, date }]. */
function lireFlux(xml) {
  const blocs = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) || [];
  return blocs
    .map((b) => {
      let url = texte(balise(b, 'link'));
      if (!/^https?:\/\//.test(url)) {
        const m = b.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i) || b.match(/<link[^>]*href=["']([^"']+)["']/i);
        url = m ? decoder(m[1]) : '';
      }
      const brute = texte(balise(b, 'pubDate') || balise(b, 'published') || balise(b, 'updated') || balise(b, 'dc:date'));
      const date = new Date(brute);
      return { titre: texte(balise(b, 'title')), url, date: Number.isNaN(date.getTime()) ? null : date.toISOString() };
    })
    .filter((a) => a.titre && /^https?:\/\//.test(a.url) && a.date);
}

// ---------- Collecte ----------

const nouveaux = [];
const etatSources = [];

for (const s of config.sources) {
  const debut = config.domaines[s.domaine].depuis;
  try {
    const articles = lireFlux(await telecharger(s.flux))
      .filter((a) => a.date >= debut && a.date <= new Date(Date.now() + 864e5).toISOString())
      .filter((a) => correspond(s.domaine, a.titre, s.tout, s.inclure ? regex(s.inclure) : s.actualite ? filtres[s.domaine].actualite : null))
      .sort((a, b) => b.date.localeCompare(a.date));
    // Les sources très actives (arXiv, sites d'actualité…) sont plafonnées pour ne pas noyer le fil.
    const retenus = s.maxParPassage ? articles.slice(0, s.maxParPassage) : articles;
    for (const a of retenus) nouveaux.push({ ...a, domaine: s.domaine, origine: s.nom });
    etatSources.push({ nom: s.nom, domaine: s.domaine, site: s.site, flux: s.flux, ok: true, articles: retenus.length });
    console.log(`✓ ${s.nom} : ${retenus.length} article(s) retenu(s)`);
  } catch (e) {
    etatSources.push({ nom: s.nom, domaine: s.domaine, site: s.site, flux: s.flux, ok: false, articles: 0 });
    console.log(`✗ ${s.nom} : ${e.message} (la source sera réessayée au prochain passage)`);
  }
}

/** Hacker News (API publique Algolia) : les articles les plus discutés sur un sujet, sur une période. */
async function hackerNews(domaine, debutSec, finSec, pointsMin, garder) {
  const { requetes } = config.domaines[domaine].hackerNews;
  const trouves = new Map();
  for (const q of requetes) {
    const url =
      'https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=20' +
      `&query=${encodeURIComponent(q)}&numericFilters=${encodeURIComponent(`created_at_i>=${debutSec},created_at_i<${finSec},points>=${pointsMin}`)}`;
    try {
      const { hits = [] } = JSON.parse(await telecharger(url));
      for (const h of hits) {
        if (!h.url || /^(Ask|Tell|Launch) HN/i.test(h.title) || !correspond(domaine, h.title)) continue;
        // Hacker News parle de tout : on exige en plus un terme de sécurité quand le sujet le demande.
        if (!filtres[domaine].hackerNews.every((r) => r.test(h.title))) continue;
        const id = identifiant(h.url);
        if (!trouves.has(id) || trouves.get(id).points < h.points) {
          trouves.set(id, { titre: h.title, url: h.url, date: new Date(h.created_at).toISOString(), points: h.points });
        }
      }
    } catch (e) {
      console.log(`  Hacker News « ${q} » : ${e.message}`);
    }
    await attendre(120);
  }
  return [...trouves.values()].sort((a, b) => b.points - a.points).slice(0, garder);
}

for (const [domaine, d] of Object.entries(config.domaines)) {
  const hn = d.hackerNews;
  let total = 0;
  if (historique) {
    // Un passage par trimestre, du début du sujet jusqu'à aujourd'hui.
    const debut = new Date(`${d.depuis}T00:00:00Z`);
    for (let t = new Date(debut); t < new Date(); t.setUTCMonth(t.getUTCMonth() + 3)) {
      const fin = new Date(t);
      fin.setUTCMonth(fin.getUTCMonth() + 3);
      const lot = await hackerNews(domaine, Math.floor(t / 1000), Math.floor(fin / 1000), hn.pointsHistorique, hn.parTrimestre);
      for (const a of lot) nouveaux.push({ ...a, domaine, origine: 'Hacker News' });
      total += lot.length;
    }
  }
  // Collecte du jour : les 4 derniers jours, pour ne rien rater si un passage échoue.
  const maintenant = Math.floor(Date.now() / 1000);
  const recents = await hackerNews(domaine, maintenant - 4 * 86400, maintenant + 3600, hn.pointsQuotidien, hn.parJour);
  for (const a of recents) nouveaux.push({ ...a, domaine, origine: 'Hacker News' });
  total += recents.length;
  console.log(`✓ Hacker News (${d.nom}) : ${total} article(s) retenu(s)`);
}

// ---------- Fusion avec l'archive (rien n'est jamais supprimé, sauf au-delà du plafond) ----------

const ancienne = existsSync(fichierArchive) ? JSON.parse(readFileSync(fichierArchive, 'utf8')) : { articles: [] };
const parId = new Map(ancienne.articles.map((a) => [a.id, a]));
const titresVus = new Set(ancienne.articles.map((a) => `${a.domaine}|${a.titre.toLowerCase()}`));
let ajoutes = 0;
for (const a of nouveaux) {
  const id = identifiant(a.url);
  const cleTitre = `${a.domaine}|${a.titre.toLowerCase()}`;
  if (parId.has(id) || titresVus.has(cleTitre)) continue;
  parId.set(id, { id, domaine: a.domaine, titre: a.titre, url: a.url, source: domaineDe(a.url), origine: a.origine, date: a.date });
  titresVus.add(cleTitre);
  ajoutes++;
}

const articles = [];
for (const domaine of Object.keys(config.domaines)) {
  articles.push(
    ...[...parId.values()]
      .filter((a) => a.domaine === domaine)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, MAX_PAR_DOMAINE),
  );
}
articles.sort((a, b) => b.date.localeCompare(a.date));

const archive = {
  miseAJour: ajoutes > 0 || !ancienne.miseAJour ? new Date().toISOString() : ancienne.miseAJour,
  derniereCollecte: new Date().toISOString(),
  domaines: Object.fromEntries(Object.entries(config.domaines).map(([id, d]) => [id, { nom: d.nom, depuis: d.depuis, motsCles: d.hackerNews.requetes }])),
  sources: etatSources,
  articles,
};

mkdirSync(dirname(fichierArchive), { recursive: true });
writeFileSync(fichierArchive, JSON.stringify(archive, null, 1) + '\n');

// ---------- Fichier OPML pour Feedly (ou tout autre lecteur RSS) ----------

const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const opml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<opml version="2.0">',
  '  <head><title>Veille technologique — Moncef MALLEM</title></head>',
  '  <body>',
  ...Object.entries(config.domaines).flatMap(([id, d]) => [
    `    <outline text="${attr(d.nom)}" title="${attr(d.nom)}">`,
    ...config.sources
      .filter((s) => s.domaine === id)
      .map((s) => `      <outline type="rss" text="${attr(s.nom)}" title="${attr(s.nom)}" xmlUrl="${attr(s.flux)}" htmlUrl="${attr(s.site)}"/>`),
    '    </outline>',
  ]),
  '  </body>',
  '</opml>',
  '',
].join('\n');
writeFileSync(fichierOpml, opml);

const parDomaine = Object.keys(config.domaines).map((d) => `${d}: ${articles.filter((a) => a.domaine === d).length}`).join(', ');
console.log(`\n${ajoutes} nouvel(s) article(s). Archive : ${articles.length} articles (${parDomaine}).`);
