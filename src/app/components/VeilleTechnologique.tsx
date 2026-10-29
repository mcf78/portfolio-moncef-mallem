import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Download,
  Filter,
  History,
  Rss,
  Search,
  Workflow,
  Radio,
  Archive as ArchiveIcon,
  Globe,
  type LucideIcon,
} from 'lucide-react';
import { sujets, type Sujet } from '../data/veille';
import { btn, Card, CardTitle, cx, Dot, Eyebrow, PageHeader, type Tone } from './kit';
import { VeilleSchema } from './VeilleSchema';

// Fil de veille généré chaque jour par scripts/veille/collecter.mjs (GitHub Actions).
type Article = { id: string; domaine: Sujet['id']; titre: string; url: string; source: string; origine: string; date: string };
type EtatSource = { nom: string; domaine: Sujet['id']; site: string; flux: string; ok: boolean; articles: number };
type Archive = { miseAJour: string; derniereCollecte: string; sources: EtatSource[]; articles: Article[] };

const tons: Record<Sujet['id'], Tone> = { ia: 'red', blockchain: 'brand' };
const PAR_PAGE = 40;

const presentations: Record<Sujet['id'], {
  numero: string;
  question: string;
  apport: string;
}> = {
  ia: {
    numero: '01',
    question: 'Comment intégrer une IA dans une application tout en protégeant les données et les actions qu’elle peut effectuer ?',
    apport: 'Identifier les risques des fonctions IA et les contrôles à prévoir dans une application.',
  },
  blockchain: {
    numero: '02',
    question: 'Dans quels cas une blockchain répond-elle à un besoin concret, et quelles contraintes faut-il prendre en compte ?',
    apport: 'Comparer des architectures et choisir une technologie en fonction des besoins d’un projet.',
  },
};

const fmt = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', ...options });
const jourMois = fmt({ day: 'numeric', month: 'short' });
const moisAnnee = fmt({ month: 'long', year: 'numeric' });
const dateHeure = fmt({ day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

/** « 23 avr. » pour une date précise, « février » quand seul le mois est connu. */
function dateFait(date: string) {
  const [a, m, j] = date.split('-').map(Number);
  const d = new Date(Date.UTC(a, m - 1, j || 15, 12));
  return j ? jourMois.format(d) : fmt({ month: 'long' }).format(d);
}

function useArchive() {
  const [archive, setArchive] = useState<Archive | null>(null);
  const [erreur, setErreur] = useState(false);
  useEffect(() => {
    let actif = true;
    fetch('./veille/articles.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: Archive) => actif && setArchive(data))
      .catch(() => actif && setErreur(true));
    return () => {
      actif = false;
    };
  }, []);
  return { archive, erreur };
}

function Chronologie({ sujet }: { sujet: Sujet }) {
  const parAnnee = useMemo(() => {
    const groupes = new Map<string, typeof sujet.faits>();
    for (const f of [...sujet.faits].sort((a, b) => b.date.localeCompare(a.date))) {
      const annee = f.date.slice(0, 4);
      groupes.set(annee, [...(groupes.get(annee) || []), f]);
    }
    return [...groupes.entries()];
  }, [sujet]);

  return (
    <Card dense className="flex min-h-0 flex-col lg:h-full">
      <CardTitle icon={<History size={14} />} aside={<span className="text-[12px] text-ink-3 tabular-nums">{sujet.faits.length} faits marquants</span>}>
        Chronologie depuis {sujet.depuis}
      </CardTitle>
      <p className="text-[13.5px] leading-[1.55] text-ink-2">{sujet.accroche}</p>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {sujet.angles.map((angle) => (
          <span key={angle} className="rounded-full border border-line bg-surface-2 px-2 py-0.5 text-[11.5px] font-medium text-ink-2">
            {angle}
          </span>
        ))}
      </div>

      <div className="mt-3 -mr-2 min-h-0 flex-1 overflow-y-auto pr-2">
        {parAnnee.map(([annee, faits]) => (
          <section key={annee} className="mb-3 last:mb-0">
            <h3 className="sticky top-0 z-10 bg-surface py-1 text-[12px] font-semibold tracking-[0.06em] text-ink-3">{annee}</h3>
            <ol className="relative ml-1.5 border-l border-line">
              {faits.map((f) => (
                <li key={f.date + f.titre} className="relative pb-3 pl-4 last:pb-1">
                  <span aria-hidden className="absolute top-[7px] -left-[4px] size-[7px] rounded-full ring-2 ring-surface" style={{ background: `var(--pf-dot-${tons[sujet.id]})` }} />
                  <p className="text-[11.5px] font-semibold text-ink-3 tabular-nums">{dateFait(f.date)}</p>
                  <p className="text-[13.5px] leading-snug font-semibold text-ink">{f.titre}</p>
                  <p className="mt-0.5 text-[12.5px] leading-snug text-ink-2">{f.detail}</p>
                  <a
                    href={f.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 inline-flex items-center gap-0.5 text-[12px] font-medium text-brand-ink hover:underline"
                  >
                    {f.source.nom}
                    <ArrowUpRight size={12} />
                  </a>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </Card>
  );
}

function PresentationSujet({ sujet }: { sujet: Sujet }) {
  const presentation = presentations[sujet.id];

  return (
    <section id="dossier-de-veille" aria-labelledby={`presentation-${sujet.id}`} className="rounded-[12px] border border-line bg-surface p-4 sm:p-5">
      <p className="text-[11px] font-semibold tracking-[0.06em] text-brand-ink uppercase">
        Thème {presentation.numero} · Suivi depuis {sujet.depuis}
      </p>
      <h2 id={`presentation-${sujet.id}`} className="mt-1 text-[22px] leading-snug font-semibold tracking-[-0.015em] text-ink">
        {sujet.titre}
      </h2>
      <div className="mt-3">
        <p className="text-[12px] font-semibold text-ink-3">Question suivie</p>
        <p className="mt-1 text-[15px] leading-snug font-medium text-ink">{presentation.question}</p>
      </div>

      <VeilleSchema sujetId={sujet.id} />
      <p className="mt-4 border-t border-line pt-3 text-[13px] leading-[1.6] text-ink-2">
        <span className="font-semibold text-ink">L’intérêt pour ma formation SLAM : </span>
        {presentation.apport}
      </p>
      <details className="group mt-4 border-t border-line">
        <summary className="flex cursor-pointer list-none flex-wrap items-center gap-2 py-3 text-[13px] font-semibold text-brand-ink hover:underline [&::-webkit-details-marker]:hidden">
          <History aria-hidden size={16} className="shrink-0 text-brand-ink" />
          <span className="min-w-0 flex-1">Consulter la chronologie complète</span>
          <span className="text-[12px] font-normal text-ink-3">{sujet.faits.length} repères</span>
          <ChevronDown aria-hidden size={16} className="shrink-0 text-ink-3 transition-transform group-open:rotate-180" />
        </summary>
        <div className="max-h-[32rem] overflow-y-auto">
          <Chronologie sujet={sujet} />
        </div>
      </details>
    </section>
  );
}

function FilDeVeille({ sujet, archive, erreur }: { sujet: Sujet; archive: Archive | null; erreur: boolean }) {
  const [recherche, setRecherche] = useState('');
  const [annee, setAnnee] = useState('toutes');
  const [limite, setLimite] = useState(PAR_PAGE);

  const duSujet = useMemo(() => (archive?.articles || []).filter((a) => a.domaine === sujet.id), [archive, sujet.id]);
  const annees = useMemo(() => {
    const compte = new Map<string, number>();
    for (const a of duSujet) compte.set(a.date.slice(0, 4), (compte.get(a.date.slice(0, 4)) || 0) + 1);
    return [...compte.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [duSujet]);
  const filtres = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    return duSujet.filter((a) => (annee === 'toutes' || a.date.startsWith(annee)) && (!q || `${a.titre} ${a.source} ${a.origine}`.toLowerCase().includes(q)));
  }, [duSujet, annee, recherche]);
  const parMois = useMemo(() => {
    const groupes = new Map<string, Article[]>();
    for (const a of filtres.slice(0, limite)) {
      const mois = moisAnnee.format(new Date(a.date));
      groupes.set(mois, [...(groupes.get(mois) || []), a]);
    }
    return [...groupes.entries()];
  }, [filtres, limite]);

  useEffect(() => setLimite(PAR_PAGE), [annee, recherche, sujet.id]);

  const puce = (actif: boolean) =>
    cx(
      'shrink-0 rounded-full border px-2.5 py-0.5 text-[12px] font-medium tabular-nums transition-colors',
      actif ? 'border-brand-line bg-brand-soft text-brand-ink' : 'border-line text-ink-3 hover:text-ink',
    );

  return (
    <Card dense className="flex h-full min-h-0 flex-col">
      <CardTitle
        className="flex-col items-start gap-2 sm:flex-row sm:items-center"
        icon={<Rss size={14} />}
        aside={
          archive && (
            <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-3">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              Mis à jour le {dateHeure.format(new Date(archive.miseAJour))}
            </span>
          )
        }
      >
        Fil de veille automatique
      </CardTitle>

      <div className="flex flex-wrap items-center gap-2">
        <label className="relative min-w-[210px] flex-1">
          <span className="sr-only">Rechercher dans le fil de veille</span>
          <Search size={15} className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-ink-4" />
          <input
            type="search"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher un article, une source…"
            className="h-8 w-full rounded-[8px] border border-line-strong bg-surface pr-3 pl-8 text-[13px] text-ink outline-none placeholder:text-ink-3 focus:border-brand"
          />
        </label>
        <div className="flex gap-1 overflow-x-auto" role="group" aria-label="Filtrer par année">
          <button type="button" onClick={() => setAnnee('toutes')} className={puce(annee === 'toutes')} aria-pressed={annee === 'toutes'}>
            Tout · {duSujet.length}
          </button>
          {annees.map(([a, n]) => (
            <button key={a} type="button" onClick={() => setAnnee(a)} className={puce(annee === a)} aria-pressed={annee === a}>
              {a} · {n}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 -mr-2 min-h-0 flex-1 overflow-y-auto pr-2" aria-live="polite">
        {erreur && <p className="py-6 text-center text-[13px] text-ink-3">Le fil de veille n'a pas pu être chargé. Réessaie dans quelques instants.</p>}
        {!archive && !erreur && (
          <div className="space-y-2 py-2" aria-label="Chargement">
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className="h-9 animate-pulse rounded-[8px] bg-surface-2" />
            ))}
          </div>
        )}
        {archive && filtres.length === 0 && <p className="py-6 text-center text-[13px] text-ink-3">Aucun article ne correspond à cette recherche.</p>}
        {parMois.map(([mois, articles]) => (
          <section key={mois} className="mb-2">
            <h3 className="sticky top-0 z-10 bg-surface py-1 text-[12px] font-semibold tracking-[0.04em] text-ink-3 first-letter:uppercase">{mois}</h3>
            <ul>
              {articles.map((a) => (
                <li key={a.id}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -mx-2 flex items-baseline gap-3 rounded-[7px] px-2 py-1.5 transition-colors hover:bg-hover"
                  >
                    <span className="w-12 shrink-0 text-[11.5px] text-ink-4 tabular-nums">{jourMois.format(new Date(a.date))}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] leading-snug text-ink group-hover:text-brand-ink">{a.titre}</span>
                      <span className="block truncate text-[11.5px] text-ink-3">
                        {a.source}
                        {a.origine === 'Hacker News' ? ' · via Hacker News' : ` · ${a.origine}`}
                      </span>
                    </span>
                    <ArrowUpRight size={14} className="shrink-0 self-center text-ink-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {filtres.length > limite && (
          <button type="button" onClick={() => setLimite((l) => l + PAR_PAGE)} className={cx(btn('secondary', 'sm'), 'mt-1 mb-2 w-full')}>
            Afficher plus ({filtres.length - limite} restants)
          </button>
        )}
      </div>
    </Card>
  );
}

function Methode({ archive }: { archive: Archive | null }) {
  const sources = archive?.sources || [];
  const nbArticles = archive?.articles.length;
  const etapes: { icone: LucideIcon; titre: string; texte: string }[] = [
    { icone: Globe, titre: 'Sources', texte: `${sources.length || 16} flux RSS (OWASP, CERT-FR, Google, IOTA, Ethereum…) et l'historique de Hacker News.` },
    { icone: Filter, titre: 'Filtrage', texte: 'Des mots-clés en français et en anglais pour chaque sujet ; le hors-sujet et la spéculation sont écartés.' },
    { icone: ArchiveIcon, titre: 'Archivage', texte: 'Chaque matin, GitHub Actions lance mon collecteur et ajoute les nouveaux articles, sans rien effacer.' },
    { icone: Radio, titre: 'Publication', texte: `Le portfolio se reconstruit et se met en ligne tout seul${nbArticles ? ` : ${nbArticles} articles archivés` : ''}.` },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <Card dense className="lg:col-span-12">
        <CardTitle icon={<Workflow size={14} />}>Comment fonctionne ma veille</CardTitle>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {etapes.map(({ icone: Icone, titre, texte }, i) => (
            <li key={titre} className="relative rounded-[10px] border border-line bg-surface-2 p-3">
              <div className="mb-1.5 flex items-center gap-2">
                <Icone aria-hidden size={15} className="shrink-0 text-brand" />
                <span className="text-[13.5px] font-semibold text-ink">
                  {i + 1}. {titre}
                </span>
              </div>
              <p className="text-[12.5px] leading-snug text-ink-2">{texte}</p>
              {i < etapes.length - 1 && (
                <ArrowRight aria-hidden size={16} className="absolute top-1/2 -right-[14px] z-10 hidden -translate-y-1/2 rounded-full bg-canvas text-ink-4 lg:block" />
              )}
            </li>
          ))}
        </ol>
      </Card>

      <Card dense className="lg:col-span-8">
        <CardTitle icon={<Rss size={14} />} aside={<span className="text-[12px] text-ink-3">● active · ○ indisponible au dernier passage</span>}>
          Mes sources
        </CardTitle>
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {sujets.map((s) => (
            <div key={s.id}>
              <Eyebrow className="flex items-center gap-1.5">
                <Dot tone={tons[s.id]} />
                {s.titre}
              </Eyebrow>
              <ul className="space-y-1">
                {sources
                  .filter((src) => src.domaine === s.id)
                  .map((src) => (
                    <li key={src.nom}>
                      <a href={src.site} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-[13px] text-ink-2 hover:text-brand-ink">
                        <span aria-hidden className={src.ok ? 'text-success' : 'text-ink-4'}>
                          {src.ok ? '●' : '○'}
                        </span>
                        {src.nom}
                        <ArrowUpRight size={12} className="text-ink-4 group-hover:text-brand-ink" />
                      </a>
                    </li>
                  ))}
                <li className="inline-flex items-center gap-1.5 text-[13px] text-ink-2">
                  <span aria-hidden className="text-success">●</span>
                  Hacker News (recherche par mots-clés)
                </li>
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card dense className="flex flex-col lg:col-span-4">
        <CardTitle icon={<Download size={14} />}>Suivre ma veille dans Feedly</CardTitle>
        <p className="text-[13px] leading-[1.55] text-ink-2">
          Toutes mes sources sont réunies dans un fichier OPML. Importé dans Feedly (ou tout autre lecteur RSS), il reproduit ma veille en un clic.
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-3 [&>*]:flex-[1_1_auto]">
          <a href="./veille/sources.opml" download="veille-moncef-mallem.opml" className={btn('primary', 'sm')}>
            <Download size={14} />
            Fichier OPML
          </a>
          <a href="https://feedly.com/" target="_blank" rel="noopener noreferrer" className={btn('secondary', 'sm')}>
            Ouvrir Feedly
            <ArrowUpRight size={14} />
          </a>
        </div>
        {archive && <p className="mt-2 text-[11.5px] text-ink-3">Dernière collecte : {dateHeure.format(new Date(archive.derniereCollecte))}</p>}
      </Card>
    </div>
  );
}

export function VeilleTechnologique() {
  const [themeActif, setThemeActif] = useState<Sujet['id']>(sujets[0].id);
  const [sujetFil, setSujetFil] = useState<Sujet['id']>(sujets[0].id);
  const { archive, erreur } = useArchive();
  const sujet = sujets.find((s) => s.id === themeActif) ?? sujets[0];
  const sujetDuFil = sujets.find((s) => s.id === sujetFil) ?? sujets[0];
  const compte = (id: Sujet['id']) => archive?.articles.filter((a) => a.domaine === id).length;
  const sommaireRef = useRef<HTMLDivElement>(null);

  function choisirTheme(id: Sujet['id']) {
    setThemeActif(id);
    setSujetFil(id);
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    sommaireRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  return (
    <div>
      <PageHeader
        title="Ma veille technologique"
        description="Deux thèmes à découvrir : la sécurité de l’IA et les usages de la blockchain. Choisissez un thème pour lire ma synthèse ; les articles collectés se trouvent ensuite en bas de page."
      />

      <div ref={sommaireRef} className="scroll-mt-20 lg:scroll-mt-6" />
      <div className="sticky top-16 z-30 bg-canvas py-3 lg:top-3">
        <h2 id="choix-themes-veille" className="mb-2 text-[14px] font-semibold text-ink">Deux thèmes à découvrir</h2>
        <div className="grid grid-cols-2 gap-2 sm:gap-3" role="group" aria-labelledby="choix-themes-veille">
          {sujets.map((theme) => {
            const actif = theme.id === themeActif;
            return (
              <button
                key={theme.id}
                type="button"
                aria-pressed={actif}
                aria-controls="dossier-de-veille"
                onClick={() => choisirTheme(theme.id)}
                className={cx(
                  'flex min-w-0 cursor-pointer flex-col items-start rounded-[10px] border px-3 py-3 text-left transition-[background-color,border-color,box-shadow] duration-150 sm:px-4',
                  actif ? 'border-brand bg-brand-soft shadow-tab' : 'border-line-strong bg-surface hover:border-brand hover:bg-surface-2',
                )}
              >
                <span className="text-[11px] font-medium text-ink-3">
                  Thème {presentations[theme.id].numero}{actif ? ' · ouvert' : ''}
                </span>
                <span className="mt-1 text-[15px] leading-snug font-semibold text-ink sm:text-[17px]">
                  {theme.id === 'ia' ? 'IA & sécurité' : 'Blockchain & IOTA'}
                </span>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-ink underline underline-offset-2">
                  Lire ce thème
                  <ArrowRight aria-hidden size={14} className="shrink-0" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div key={sujet.id} className="mt-3">
        <PresentationSujet sujet={sujet} />
      </div>

      <section id="fil-de-veille" aria-labelledby="titre-fil-de-veille" className="mt-6 scroll-mt-64 sm:scroll-mt-56 lg:scroll-mt-44">
        <div className="mb-3">
          <h2 id="titre-fil-de-veille" className="flex items-center gap-2 text-[19px] leading-snug font-semibold text-ink">
            <Rss aria-hidden size={19} className="shrink-0 text-brand-ink" />
            Pour aller plus loin : les articles collectés
          </h2>
          <p className="mt-1 text-[13px] leading-[1.6] text-ink-2">
            Mon fil de veille se met à jour chaque jour. Choisissez un sujet, recherchez un article et explorez les archives par année.
          </p>
        </div>
        <label className="mb-3 flex flex-wrap items-center gap-2 text-[13px] font-medium text-ink">
          Sujet des articles
          <select
            value={sujetFil}
            onChange={(event) => {
              const choix = sujets.find((theme) => theme.id === event.target.value);
              if (choix) setSujetFil(choix.id);
            }}
            className="h-9 max-w-full rounded-[8px] border border-line-strong bg-surface px-3 text-[13px] text-ink"
          >
            {sujets.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.id === 'ia' ? 'IA & sécurité' : 'Blockchain & IOTA'}{compte(theme.id) !== undefined ? ` (${compte(theme.id)})` : ''}
              </option>
            ))}
          </select>
        </label>
        <div className="h-[min(70dvh,720px)] min-h-[360px]">
          <FilDeVeille key={sujetDuFil.id} sujet={sujetDuFil} archive={archive} erreur={erreur} />
        </div>
      </section>

      <details className="group mt-5 border-t border-line">
        <summary className="flex cursor-pointer list-none items-center gap-2 py-3 text-[13px] font-medium text-brand-ink hover:underline [&::-webkit-details-marker]:hidden">
          <Workflow aria-hidden size={15} className="shrink-0" />
          <span className="min-w-0 flex-1">Méthode et sources de ma veille</span>
          <ChevronDown aria-hidden size={15} className="shrink-0 transition-transform group-open:rotate-180" />
        </summary>
        <Methode archive={archive} />
      </details>
    </div>
  );
}
