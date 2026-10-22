import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..', '..');
const outDir = path.join(root, 'scripts', 'e6-docs', 'out');
const pdfDir = path.join(root, 'public', 'e6');
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(pdfDir, { recursive: true });

const css = `
  :root {
    --ink: #111827;
    --muted: #4b5563;
    --line: #d1d5db;
    --accent: #1d4ed8;
    --soft: #eff6ff;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: "Segoe UI", Arial, sans-serif;
    font-size: 9.5pt;
    line-height: 1.4;
    color: var(--ink);
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .sheet { width: 100%; }
  .topline {
    display: flex;
    justify-content: space-between;
    gap: 8mm;
    padding-bottom: 3.5mm;
    border-bottom: 2px solid var(--accent);
    color: var(--muted);
    font-size: 8pt;
    letter-spacing: .055em;
    text-transform: uppercase;
  }
  h1 {
    margin: 4mm 0 1mm;
    font-size: 17.5pt;
    line-height: 1.15;
    letter-spacing: -.02em;
  }
  .subtitle {
    margin: 0 0 3.5mm;
    color: var(--accent);
    font-size: 10.4pt;
    font-weight: 600;
  }
  .meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2mm 7mm;
    margin: 3mm 0;
    padding: 3mm 4mm;
    border: 1px solid var(--line);
    border-radius: 2mm;
  }
  .meta div { display: flex; flex-direction: column; gap: .4mm; }
  .meta span {
    color: var(--muted);
    font-size: 7.8pt;
    letter-spacing: .05em;
    text-transform: uppercase;
  }
  .meta strong { font-size: 9.6pt; font-weight: 600; }
  .options { margin: 1.5mm 0 0; font-size: 9.3pt; }
  .options span { margin-right: 5mm; white-space: nowrap; }
  h2 {
    margin: 3.2mm 0 1.2mm;
    padding-bottom: .8mm;
    border-bottom: 1px solid var(--line);
    color: var(--accent);
    font-size: 11pt;
    line-height: 1.25;
  }
  h3 { margin: 3mm 0 1mm; font-size: 9.8pt; }
  p { margin: 0 0 1.6mm; text-align: justify; }
  .box p { text-align: left; }
  ul, ol { margin: 0 0 2mm 4.5mm; padding: 0; }
  li { margin-bottom: .6mm; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; }
  .box {
    padding: 2.6mm 3.2mm;
    border: 1px solid var(--line);
    border-radius: 2mm;
    background: #fafafa;
    break-inside: avoid;
  }
  .box h3 { margin-top: 0; }
  .box p:last-child, .box ul:last-child { margin-bottom: 0; }
  .tag {
    display: inline-block;
    margin: 0 1mm 1mm 0;
    padding: .45mm 1.8mm;
    border: 1px solid #bfdbfe;
    border-radius: 99px;
    background: var(--soft);
    color: var(--accent);
    font-size: 8.2pt;
  }
  .schema {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3mm;
    margin: 3mm 0 1.5mm;
  }
  .node {
    min-width: 31mm;
    padding: 2.5mm 4mm;
    border: 1px solid var(--accent);
    border-radius: 2mm;
    background: var(--soft);
    text-align: center;
    font-weight: 600;
  }
  .node small { display: block; margin-top: .4mm; color: var(--muted); font-size: 8pt; font-weight: 400; }
  .arrow { color: var(--accent); font-size: 16pt; }
  .schema-note { margin: 0 0 2mm; text-align: center; color: var(--muted); font-size: 8.4pt; }
  .footer {
    display: flex;
    justify-content: space-between;
    gap: 8mm;
    margin-top: 4mm;
    padding-top: 2mm;
    border-top: 1px solid var(--line);
    color: var(--muted);
    font-size: 7.8pt;
  }
  .page-break { break-before: page; }
  @page { size: A4; margin: 13mm 14mm 14mm; }
  @media print {
    body { background: #fff; }
    a { color: inherit; text-decoration: none; }
  }
`;

const header = (title, subtitle, annexe = 'Annexe VII-1-B') => `
  <div class="topline">
    <span>BTS Services Informatiques aux Organisations — Session 2027</span>
    <span>${annexe}</span>
  </div>
  <h1>${title}</h1>
  <p class="subtitle">${subtitle}</p>
`;

const footer = (label) => `
  <div class="footer">
    <span>MALLEM Moncef — BTS SIO SLAM — ${label}</span>
    <span>Session 2027</span>
  </div>
`;

const appSp1 = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>SP1 — Application mobile e-commerce</title><style>${css}</style></head>
<body><div class="sheet">
  ${header('Situation professionnelle 1', 'Application mobile e-commerce connectée à PrestaShop')}
  <div class="meta">
    <div><span>Candidat</span><strong>MALLEM Moncef</strong></div>
    <div><span>Option</span><strong>SLAM</strong></div>
    <div><span>Centre de formation</span><strong>Paris Ynov Campus — Nanterre</strong></div>
    <div><span>Organisation support</span><strong>Librairie Sana</strong></div>
    <div><span>Projet</span><strong>Application mobile e-commerce</strong></div>
    <div><span>Période</span><strong>2025 – 2027</strong></div>
  </div>

  <h2>Organisation support</h2>
  <p>Librairie Sana est une SARL spécialisée dans la vente de livres religieux et de produits culturels. Elle dispose d'un site e-commerce PrestaShop en production, d'un dépôt logistique, d'un service après-vente et de pôles internes de création graphique.</p>

  <h2>Contexte</h2>
  <p>L'entreprise développe son activité e-commerce et souhaite proposer une application mobile connectée à sa boutique PrestaShop. L'objectif est de rendre le catalogue et le suivi des commandes accessibles depuis un smartphone, tout en conservant la synchronisation avec la base de données de la boutique.</p>

  <h2>Besoin</h2>
  <p>Concevoir une application mobile cross-platform permettant de consulter les produits, de gérer un panier, de passer commande et de suivre les commandes. L'application doit s'appuyer sur les API REST de PrestaShop et sur les données de la boutique.</p>

  <div class="two-col">
    <div class="box">
      <h3>Utilisateurs</h3>
      <ul>
        <li><strong>Client :</strong> consulter le catalogue, rechercher un produit, gérer son panier, passer commande et suivre sa commande.</li>
        <li><strong>Équipe interne :</strong> consulter les données, suivre les commandes et disposer d'un outil connecté au système e-commerce.</li>
      </ul>
    </div>
    <div class="box">
      <h3>Contraintes techniques</h3>
      <ul>
        <li>Application cross-platform en Flutter/Dart.</li>
        <li>Connexion aux API REST de PrestaShop.</li>
        <li>Base de données MySQL et phpMyAdmin.</li>
        <li>Services mobiles Firebase.</li>
        <li>Environnement Linux/Bash et PuTTY.</li>
      </ul>
    </div>
  </div>

  <h2>Résultats attendus</h2>
  <p>Une application fonctionnelle sur Android et iOS, connectée à l'API, avec un parcours d'achat et un suivi des commandes. Le code source, les maquettes, les tests et la documentation sont disponibles.</p>

  <h2>Compétences mobilisées</h2>
  <p>
    <span class="tag">Concevoir et développer une solution applicative</span>
    <span class="tag">Gérer les données d'une application</span>
    <span class="tag">Assurer la maintenance corrective et évolutive</span>
    <span class="tag">Travailler en mode projet</span>
  </p>

  <h2>Livrables</h2>
  <ul>
    <li>Maquettes des écrans et parcours utilisateurs.</li>
    <li>Application Flutter et intégration de l'API REST.</li>
    <li>Base de données de test et jeu de tests.</li>
    <li>Documentation technique et captures d'écran.</li>
  </ul>

  ${footer('Situation professionnelle 1 — support de la réalisation n°1')}
</div></body></html>`;

const appRealisation = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>Réalisation 1 — Application mobile e-commerce</title><style>${css}</style></head>
<body><div class="sheet">
  ${header('Fiche descriptive de réalisation professionnelle', "Épreuve E6 — Conception et développement d'applications (option SLAM)")}
  <div class="meta">
    <div><span>N° réalisation</span><strong>1</strong></div>
    <div><span>Nom, prénom</span><strong>MALLEM Moncef</strong></div>
    <div><span>N° candidat</span><strong>………………………………</strong></div>
    <div><span>Date</span><strong>Session 2027</strong></div>
    <div><span>Centre de formation</span><strong>Paris Ynov Campus — Nanterre</strong></div>
    <div><span>Option</span><strong>☑ SLAM &nbsp; ☐ SISR</strong></div>
  </div>
  <p class="options"><span>☐ Épreuve ponctuelle</span><span>☑ Contrôle en cours de formation</span><span>☑ Seul(e)</span><span>☐ En équipe</span></p>

  <h2>Organisation support de la réalisation professionnelle</h2>
  <p>Librairie Sana est une SARL spécialisée dans la vente de livres religieux et de produits culturels. Elle exploite un site e-commerce PrestaShop en production, un dépôt logistique et un service après-vente.</p>

  <h2>Intitulé de la réalisation professionnelle</h2>
  <p><strong>Développement d'une application mobile e-commerce connectée à PrestaShop.</strong></p>
  <p><strong>Période de réalisation :</strong> 2025 – 2027 &nbsp;·&nbsp; <strong>Lieu :</strong> Paris</p>

  <h2>Compétences travaillées</h2>
  <ul>
    <li>Concevoir et développer une solution applicative.</li>
    <li>Gérer les données d'une application.</li>
    <li>Assurer la maintenance corrective et évolutive d'une solution applicative.</li>
  </ul>

  <h2>Conditions de réalisation</h2>
  <div class="two-col">
    <div class="box">
      <h3>Ressources fournies</h3>
      <ul>
        <li>Accès à la boutique PrestaShop et à sa base de données de test.</li>
        <li>Documentation de l'API REST PrestaShop.</li>
        <li>Environnement de développement Flutter.</li>
        <li>Maquettes et spécifications fonctionnelles.</li>
      </ul>
    </div>
    <div class="box">
      <h3>Résultats attendus</h3>
      <ul>
        <li>Application mobile cross-platform fonctionnelle.</li>
        <li>Connexion à l'API REST et synchronisation des données.</li>
        <li>Catalogue, panier, commande et suivi des commandes.</li>
        <li>Code source et documentation livrés.</li>
      </ul>
    </div>
  </div>

  <h2>Ressources documentaires, matérielles et logicielles utilisées</h2>
  <div class="box">
    <p><strong>Documentaires :</strong> documentation PrestaShop et API REST, maquettes, MCD/MLD, spécifications fonctionnelles, documentation Flutter.</p>
    <p><strong>Matérielles :</strong> PC de développement, smartphone Android, émulateur, serveur PrestaShop.</p>
    <p><strong>Logicielles :</strong> Flutter, Dart, Android Studio, VS Code, MySQL/phpMyAdmin, Firebase, Git, PuTTY, Linux/Bash.</p>
  </div>

  <h2>Modalités d'accès aux productions et à leur documentation</h2>
  <p>Les productions sont accessibles depuis le portfolio, onglet <strong>Projets E6</strong>, via les boutons <strong>SP1</strong> et <strong>Réalisation</strong>. Le code source, les captures et les tests sont présentés à l'épreuve.</p>

  ${footer('Réalisation n°1')}
</div>

<div class="sheet page-break">
  ${header('Descriptif de la réalisation professionnelle', 'Application mobile e-commerce connectée à PrestaShop', 'Annexe VII-1-B — verso')}

  <h2>Contexte</h2>
  <p>Librairie Sana exploite un site e-commerce PrestaShop en production. Pour accompagner le développement de la vente en ligne, l'entreprise souhaite une application mobile connectée à la boutique. L'application doit permettre au client de consulter les produits, de gérer son panier, de passer commande et de suivre ses commandes.</p>

  <h2>Description de la réalisation</h2>
  <p>J'ai conçu et développé une application mobile cross-platform en Flutter. Les écrans communiquent avec l'API REST de PrestaShop pour récupérer le catalogue, les informations produits et les commandes. La logique applicative gère le panier et la navigation. Les appels API sont centralisés et les données sont synchronisées avec la base MySQL de la boutique. Les écrans ont été adaptés aux formats mobiles et testés sur émulateur et appareil Android.</p>

  <h2>Étapes de mise en place</h2>
  <ol>
    <li>Analyse du besoin et des parcours utilisateurs.</li>
    <li>Conception des maquettes et du modèle de données.</li>
    <li>Mise en place de la connexion à l'API REST PrestaShop.</li>
    <li>Développement des écrans Flutter et de la logique panier/commandes.</li>
    <li>Tests, corrections, documentation et livraison.</li>
  </ol>

  <h2>Compétences mobilisées</h2>
  <p>Conception et développement d'une solution mobile, consommation d'une API REST, gestion de données, tests, documentation et travail en mode projet.</p>

  <h2>Schéma d'architecture</h2>
  <div class="schema">
    <div class="node">Application mobile<small>Flutter / Dart</small></div>
    <div class="arrow">→</div>
    <div class="node">API REST<small>PrestaShop</small></div>
    <div class="arrow">→</div>
    <div class="node">Base de données<small>MySQL</small></div>
  </div>
  <p class="schema-note">Firebase : services mobiles et notifications.</p>

  <h2>Documents et productions associés</h2>
  <div class="two-col">
    <ul>
      <li>Maquettes des écrans.</li>
      <li>MCD/MLD et modèle de données.</li>
      <li>Code source Flutter.</li>
    </ul>
    <ul>
      <li>Collection de tests API.</li>
      <li>Captures d'écran.</li>
      <li>Documentation technique.</li>
    </ul>
  </div>

  ${footer('Réalisation n°1 — verso')}
</div></body></html>`;

const stadiumSp2 = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>SP2 — Site web StadiumCompany</title><style>${css}</style></head>
<body><div class="sheet">
  ${header('Situation professionnelle 2', 'Site web officiel de StadiumCompany')}
  <div class="meta">
    <div><span>Candidat</span><strong>MALLEM Moncef</strong></div>
    <div><span>Option</span><strong>SLAM</strong></div>
    <div><span>Centre de formation</span><strong>Paris Ynov Campus — Nanterre</strong></div>
    <div><span>Organisation support</span><strong>StadiumCompany</strong></div>
    <div><span>Projet</span><strong>Site web officiel</strong></div>
    <div><span>Période</span><strong>2026 – 2027</strong></div>
  </div>

  <h2>Organisation support</h2>
  <p>StadiumCompany est une organisation fictive qui gère un grand stade multi-événements : matchs, concerts et spectacles. Le projet est réalisé dans le cadre de la formation BTS SIO SLAM.</p>

  <h2>Contexte</h2>
  <p>La gestion des événements et des réservations est réalisée manuellement. L'organisation souhaite un site web officiel pour présenter les événements, centraliser les informations et permettre la réservation en ligne.</p>

  <h2>Besoin</h2>
  <p>Créer un site web responsive avec une partie publique (événements, billetterie, réservation, boutique, restauration, contact) et un espace administrateur pour gérer les événements, les places et les réservations.</p>

  <div class="two-col">
    <div class="box">
      <h3>Utilisateurs</h3>
      <ul>
        <li><strong>Visiteur / client :</strong> consulter les événements, vérifier les places disponibles et réserver.</li>
        <li><strong>Administrateur :</strong> gérer les événements, les places et les réservations depuis le back-office.</li>
      </ul>
    </div>
    <div class="box">
      <h3>Contraintes techniques</h3>
      <ul>
        <li>HTML5, CSS3, Bootstrap 5 et JavaScript.</li>
        <li>PHP et PDO pour le traitement serveur.</li>
        <li>MySQL/MariaDB pour les données.</li>
        <li>Déploiement Apache2 sur VM Debian.</li>
        <li>Site responsive et sécurisé.</li>
      </ul>
    </div>
  </div>

  <h2>Résultats attendus</h2>
  <p>Un site fonctionnel avec les pages publiques, une base de données opérationnelle, un espace administrateur protégé, des tests et une documentation.</p>

  <h2>Compétences mobilisées</h2>
  <p>
    <span class="tag">Concevoir et développer une solution applicative</span>
    <span class="tag">Gérer les données d'une application</span>
    <span class="tag">Assurer la maintenance corrective et évolutive</span>
    <span class="tag">Travailler en mode projet</span>
  </p>

  <h2>Livrables</h2>
  <ul>
    <li>Wireframes et spécifications fonctionnelles.</li>
    <li>MCD/MPD et script SQL de création de la base.</li>
    <li>Code source du site et du back-office.</li>
    <li>Jeu de tests, captures et documentation.</li>
  </ul>

  ${footer('Situation professionnelle 2 — support de la réalisation n°2')}
</div></body></html>`;

const stadiumRealisation = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>Réalisation 2 — Site web StadiumCompany</title><style>${css}</style></head>
<body><div class="sheet">
  ${header('Fiche descriptive de réalisation professionnelle', "Épreuve E6 — Conception et développement d'applications (option SLAM)")}
  <div class="meta">
    <div><span>N° réalisation</span><strong>2</strong></div>
    <div><span>Nom, prénom</span><strong>MALLEM Moncef</strong></div>
    <div><span>N° candidat</span><strong>………………………………</strong></div>
    <div><span>Date</span><strong>Session 2027</strong></div>
    <div><span>Centre de formation</span><strong>Paris Ynov Campus — Nanterre</strong></div>
    <div><span>Option</span><strong>☑ SLAM &nbsp; ☐ SISR</strong></div>
  </div>
  <p class="options"><span>☐ Épreuve ponctuelle</span><span>☑ Contrôle en cours de formation</span><span>☐ Seul(e)</span><span>☑ En équipe</span></p>

  <h2>Organisation support de la réalisation professionnelle</h2>
  <p>StadiumCompany est une organisation fictive qui gère un grand stade multi-événements : matchs, concerts et spectacles. Le projet est réalisé dans le cadre de la formation BTS SIO SLAM.</p>

  <h2>Intitulé de la réalisation professionnelle</h2>
  <p><strong>Conception et développement du site web officiel de StadiumCompany.</strong></p>
  <p><strong>Période de réalisation :</strong> 2026 – 2027 &nbsp;·&nbsp; <strong>Lieu :</strong> Paris Ynov Campus — Nanterre</p>

  <h2>Compétences travaillées</h2>
  <ul>
    <li>Concevoir et développer une solution applicative.</li>
    <li>Gérer les données d'une application.</li>
    <li>Assurer la maintenance corrective et évolutive d'une solution applicative.</li>
  </ul>

  <h2>Conditions de réalisation</h2>
  <div class="two-col">
    <div class="box">
      <h3>Ressources fournies</h3>
      <ul>
        <li>Cahier des charges et spécifications fonctionnelles.</li>
        <li>Maquettes et MCD/MPD.</li>
        <li>Environnement PHP/MySQL et VM Debian.</li>
        <li>Documentation Bootstrap, PHP, PDO et MySQL.</li>
      </ul>
    </div>
    <div class="box">
      <h3>Résultats attendus</h3>
      <ul>
        <li>Site responsive avec pages publiques.</li>
        <li>Espace administrateur protégé.</li>
        <li>Base de données opérationnelle.</li>
        <li>Tests et documentation livrés.</li>
      </ul>
    </div>
  </div>

  <h2>Ressources documentaires, matérielles et logicielles utilisées</h2>
  <div class="box">
    <p><strong>Documentaires :</strong> cahier des charges, wireframes, MCD/MPD, spécifications fonctionnelles, documentation Bootstrap, PHP, PDO et MySQL.</p>
    <p><strong>Matérielles :</strong> PC, VM Debian, serveur Apache2, base MySQL/MariaDB.</p>
    <p><strong>Logicielles :</strong> VS Code, XAMPP, MySQL/MariaDB, phpMyAdmin, Git, MobaXterm, navigateur.</p>
  </div>

  <h2>Modalités d'accès aux productions et à leur documentation</h2>
  <p>Les productions sont accessibles depuis le portfolio, onglet <strong>Projets E6</strong>, via les boutons <strong>SP2</strong> et <strong>Réalisation</strong>. Le code source, les captures et les tests sont présentés à l'épreuve.</p>

  ${footer('Réalisation n°2')}
</div>

<div class="sheet page-break">
  ${header('Descriptif de la réalisation professionnelle', 'Site web officiel de StadiumCompany', 'Annexe VII-1-B — verso')}

  <h2>Contexte</h2>
  <p>StadiumCompany gère un stade multi-événements. Le site doit présenter les événements, permettre la réservation de places et fournir un espace d'administration pour gérer les données.</p>

  <h2>Description de la réalisation</h2>
  <p>J'ai développé un site web dynamique en PHP avec une base MySQL. Les pages publiques affichent les événements et les places disponibles. Le formulaire de réservation enregistre les demandes et met à jour le statut des places. Un espace administrateur protégé par session permet de consulter les réservations et les événements. Le site est responsive avec Bootstrap 5 et déployé sur Apache2 sous Debian.</p>

  <h2>Étapes de mise en place</h2>
  <ol>
    <li>Analyse du besoin et rédaction des spécifications.</li>
    <li>Conception des wireframes et du MCD/MPD.</li>
    <li>Création de la base de données et des tables.</li>
    <li>Développement des pages publiques et du back-office.</li>
    <li>Tests, sécurisation et déploiement sur Apache2/Debian.</li>
  </ol>

  <h2>Compétences mobilisées</h2>
  <p>Conception et développement d'une application web, modélisation et gestion des données, sécurisation des formulaires et des sessions, tests, déploiement et travail en mode projet.</p>

  <h2>Schéma d'architecture</h2>
  <div class="schema">
    <div class="node">Navigateur<small>HTML / CSS / JS</small></div>
    <div class="arrow">→</div>
    <div class="node">Serveur web<small>Apache2 / PHP</small></div>
    <div class="arrow">→</div>
    <div class="node">Base de données<small>MySQL / MariaDB</small></div>
  </div>
  <p class="schema-note">Déploiement sur VM Debian — accès administrateur protégé par session.</p>

  <h2>Documents et productions associés</h2>
  <div class="two-col">
    <ul>
      <li>Wireframes et spécifications.</li>
      <li>MCD/MPD et script SQL.</li>
      <li>Code source du site.</li>
    </ul>
    <ul>
      <li>Jeu de tests fonctionnels.</li>
      <li>Captures du site et du back-office.</li>
      <li>Documentation technique.</li>
    </ul>
  </div>

  ${footer('Réalisation n°2 — verso')}
</div></body></html>`;

const documents = [
  ['sp1-application-mobile', appSp1],
  ['realisation-application-mobile', appRealisation],
  ['sp2-stadiumcompany', stadiumSp2],
  ['realisation-stadiumcompany', stadiumRealisation],
];

for (const [name, html] of documents) {
  const htmlPath = path.join(outDir, `${name}.html`);
  const pdfPath = path.join(pdfDir, `${name}.pdf`);
  fs.writeFileSync(htmlPath, html, 'utf8');
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-pdf-header-footer',
    '--virtual-time-budget=2000',
    `--print-to-pdf=${pdfPath}`,
    pathToFileURL(htmlPath).href,
  ], { stdio: 'ignore' });
  if (!fs.existsSync(pdfPath)) throw new Error(`PDF non généré : ${pdfPath}`);
  console.log(`${name}.pdf — ${(fs.statSync(pdfPath).size / 1024).toFixed(0)} Ko`);
}

console.log('Documents E6 générés dans public/e6.');
