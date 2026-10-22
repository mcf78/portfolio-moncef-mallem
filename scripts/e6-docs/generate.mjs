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
    color: var(--ink);
    font-weight: 600;
    font-size: 9.5pt;
  }
  .annexe {
    margin-top: 3.5mm;
    text-align: center;
    font-weight: 700;
    font-size: 11pt;
  }
  .epreuve {
    text-align: center;
    font-size: 9.8pt;
    color: var(--ink);
  }
  h1 {
    margin: 4.5mm 0 2.5mm;
    text-align: center;
    font-size: 13pt;
    letter-spacing: .02em;
    text-transform: uppercase;
  }
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
  .identite {
    margin: 3mm 0 1.5mm;
    padding: 2.6mm 3.2mm;
    border: 1px solid var(--line);
    border-radius: 2mm;
    background: #fafafa;
  }
  .identite p { margin: 0 0 1mm; text-align: left; }
  .identite p:last-child { margin-bottom: 0; }
  .options { margin: 1.5mm 0 2mm; font-size: 9.3pt; }
  .options span { margin-right: 5mm; white-space: nowrap; }
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
  .sheet.sp { font-size: 8.9pt; line-height: 1.32; }
  .sheet.sp h1 { margin: 3.2mm 0 1.8mm; font-size: 12pt; }
  .sheet.sp h2 { margin: 2.4mm 0 .9mm; font-size: 10pt; }
  .sheet.sp p { margin-bottom: 1.2mm; }
  .sheet.sp ul { margin-bottom: 1.4mm; }
  .sheet.sp li { margin-bottom: .35mm; }
  .page-break { break-before: page; }
  @page { size: A4; margin: 13mm 14mm 14mm; }
  @media print {
    body { background: #fff; }
    a { color: inherit; text-decoration: none; }
  }
`;

/** Ligne d'en-tête officielle du modèle BTS SIO (haut de chaque page). */
const officielTop = (annexe, epreuve) => `
  <div class="topline">
    <span>BTS SERVICES INFORMATIQUES AUX ORGANISATIONS</span>
    <span>SESSION 2027</span>
  </div>
  <p class="annexe">${annexe}</p>
  <p class="epreuve">${epreuve}</p>
`;

const identite = (rows) => `<div class="identite">${rows.map((r) => `<p>${r}</p>`).join('')}</div>`;

const footer = (label) => `
  <div class="footer">
    <span>MALLEM Moncef — BTS SIO SLAM — ${label}</span>
    <span>Session 2027</span>
  </div>
`;

const annexeRecto = 'ANNEXE VII-1-B : Fiche descriptive de réalisation professionnelle (recto)';
const annexeVerso = 'ANNEXE VII-1-B : Fiche descriptive de réalisation professionnelle (verso, éventuellement pages suivantes)';
const epreuveE6 = 'Épreuve E6 — Concevoir et développer des solutions applicatives (option SLAM)';
const competencesSLAM = [
  'Concevoir et développer une solution applicative.',
  "Gérer les données d'une application.",
  "Assurer la maintenance corrective ou évolutive d'une solution applicative.",
];

const orgSana =
  'La réalisation se déroule au sein de la Librairie Sana, SARL active dans le commerce de détail / librairie, implantée à Paris (75011). L\u2019entreprise exploite un site e-commerce PrestaShop en production, un dépôt logistique en charge de la préparation et de l\u2019expédition des commandes, un service après-vente, ainsi que des pôles internes de création graphique et de contenus digitaux.';

const orgStadium =
  'Le projet est réalisé dans le cadre de la formation BTS SIO SLAM. StadiumCompany est une organisation de support pédagogique qui gère un grand stade multi-événements (matchs, concerts, spectacles). Elle édite un site web officiel présentant ses événements, sa billetterie en ligne et son espace administrateur.';

const appSp1 = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>SP1 — Application mobile e-commerce</title><style>${css}</style></head>
<body><div class="sheet sp">
  ${officielTop(
    'FICHE DE LA SITUATION PROFESSIONNELLE N°1 (SP1)',
    'Épreuve E6 — Concevoir et développer des solutions applicatives (option SLAM)',
  )}
  <h1>Description d'une situation professionnelle</h1>

  <p><strong>N° SP : 1</strong> — <strong>Nom, prénom :</strong> MALLEM Moncef — <strong>N° candidat :</strong> ……………………………</p>
  <p><strong>Épreuve :</strong> ☐ Épreuve ponctuelle &nbsp;&nbsp; ☑ Contrôle en cours de formation</p>
  <p><strong>Date :</strong> Juin 2027 &nbsp;·&nbsp; <strong>Modalité :</strong> ☑ Seul(e) &nbsp;&nbsp; ☐ En équipe</p>
  <p><strong>Centre de formation :</strong> Ynov Campus Paris &nbsp;·&nbsp; <strong>Option :</strong> SLAM</p>

  <h2>Organisation support de la situation professionnelle</h2>
  <p>${orgSana}</p>

  <h2>Intitulé de la situation professionnelle</h2>
  <p style="text-align:center"><strong>Développement d'une application mobile e-commerce connectée à PrestaShop.</strong></p>
  <p style="text-align:center"><strong>Période de réalisation :</strong> 2025 – 2027 &nbsp;·&nbsp; <strong>Lieu :</strong> Librairie Sana — Paris (75011)</p>

  <h2>Contexte</h2>
  <p>L'entreprise développe son activité e-commerce et souhaite proposer une application mobile connectée à sa boutique PrestaShop. L'objectif est de rendre le catalogue et le suivi des commandes accessibles depuis un smartphone, tout en conservant la synchronisation avec la base de données de la boutique.</p>

  <h2>Besoin</h2>
  <p>Concevoir une application mobile cross-platform permettant de consulter les produits, de gérer un panier, de passer commande et de suivre les commandes. L'application doit s'appuyer sur les API REST de PrestaShop et sur les données de la boutique.</p>

  <h2>Utilisateurs concernés</h2>
  <ul>
    <li><strong>Client :</strong> consulter le catalogue, rechercher un produit, gérer son panier, passer commande et suivre sa commande.</li>
    <li><strong>Équipe interne :</strong> consulter les données, suivre les commandes et disposer d'un outil connecté au système e-commerce.</li>
  </ul>

  <h2>Contraintes techniques</h2>
  <ul>
    <li>Application cross-platform en Flutter/Dart.</li>
    <li>Connexion aux API REST de PrestaShop.</li>
    <li>Base de données MySQL et phpMyAdmin.</li>
    <li>Services mobiles Firebase ; environnement Linux/Bash et PuTTY.</li>
  </ul>

  <h2>Compétences travaillées</h2>
  <ul>
    ${competencesSLAM.map((c) => `<li>${c}</li>`).join('')}
  </ul>

  <h2>Conditions de réalisation (ressources fournies, résultats attendus)</h2>
  <ul>
    <li>Accès à la boutique PrestaShop et à sa base de données de test (MySQL, phpMyAdmin).</li>
    <li>Documentation de l'API REST PrestaShop, maquettes et spécifications fonctionnelles.</li>
    <li>Environnement de développement Flutter / Android Studio.</li>
    <li>Application mobile fonctionnelle, connectée à l'API, avec catalogue, panier, commande et suivi ; code source et documentation livrés.</li>
  </ul>

  <h2>Description des ressources documentaires, matérielles et logicielles utilisées</h2>
  <p><strong>Documentaires :</strong> documentation PrestaShop et API REST, maquettes, MCD/MLD, spécifications fonctionnelles, documentation Flutter et Dart.</p>
  <p><strong>Matérielles :</strong> PC de développement, smartphone Android, émulateur, serveur de la boutique PrestaShop.</p>
  <p><strong>Logicielles :</strong> Flutter, Dart, Android Studio, VS Code, MySQL, phpMyAdmin, Firebase, Git, PuTTY, Linux/Bash.</p>

  ${footer('Situation professionnelle 1 — application mobile e-commerce')}
</div></body></html>`;

const appRealisation = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>Réalisation 1 — Application mobile e-commerce</title><style>${css}</style></head>
<body><div class="sheet">
  ${officielTop(annexeRecto, epreuveE6)}
  <h1>Description d'une réalisation professionnelle</h1>

  ${identite([
    '<strong>N° réalisation : 1</strong> — <strong>Nom, prénom :</strong> MALLEM Moncef — <strong>N° candidat :</strong> ……………………………',
    '<strong>Épreuve :</strong> ☐ Épreuve ponctuelle &nbsp;&nbsp; ☑ Contrôle en cours de formation',
    '<strong>Date :</strong> Juin 2027 &nbsp;·&nbsp; <strong>Modalité :</strong> ☑ Seul(e) &nbsp;&nbsp; ☐ En équipe',
    '<strong>Centre de formation :</strong> Ynov Campus Paris &nbsp;·&nbsp; <strong>Option :</strong> SLAM',
  ])}

  <h2>Organisation support de la réalisation professionnelle</h2>
  <p>${orgSana}</p>

  <h2>Intitulé de la réalisation professionnelle</h2>
  <p style="text-align:center"><strong>Développement d'une application mobile e-commerce connectée à PrestaShop.</strong></p>
  <p style="text-align:center"><strong>Période de réalisation :</strong> 2025 – 2027 &nbsp;·&nbsp; <strong>Lieu :</strong> Librairie Sana — Paris (75011)</p>

  <h2>Compétences travaillées</h2>
  <ul>
    ${competencesSLAM.map((c) => `<li>${c}</li>`).join('')}
  </ul>

  <h2>Conditions de réalisation (ressources fournies, résultats attendus)</h2>
  <div class="two-col">
    <div class="box">
      <h3>Ressources fournies</h3>
      <ul>
        <li>Accès à la boutique PrestaShop et à sa base de données de test (MySQL, phpMyAdmin).</li>
        <li>Documentation de l'API REST PrestaShop.</li>
        <li>Environnement de développement Flutter / Android Studio.</li>
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

  <h2>Description des ressources documentaires, matérielles et logicielles utilisées</h2>
  <div class="box">
    <p><strong>Documentaires :</strong> documentation PrestaShop et API REST, maquettes, MCD/MLD, spécifications fonctionnelles, documentation Flutter et Dart.</p>
    <p><strong>Matérielles :</strong> PC de développement, smartphone Android, émulateur, serveur de la boutique PrestaShop.</p>
    <p><strong>Logicielles :</strong> Flutter, Dart, Android Studio, VS Code, MySQL, phpMyAdmin, Firebase, Git, PuTTY, Linux/Bash.</p>
  </div>

  <h2>Modalités d'accès aux productions et à leur documentation</h2>
  <p>Les productions sont accessibles depuis le portfolio, onglet <strong>Projets E6</strong>, via les boutons <strong>SP1</strong>, <strong>Réalisation</strong> et <strong>GitHub</strong>. Le code source, les captures et les tests sont présentés à l'épreuve.</p>

  ${footer('Réalisation n°1 — recto')}
</div>

<div class="sheet page-break">
  ${officielTop(annexeVerso, epreuveE6)}
  <h1>Descriptif de la réalisation professionnelle</h1>
  <p style="text-align:center; margin-bottom:3mm">y compris les productions réalisées et schémas explicatifs</p>

  <h2>Contexte</h2>
  <p>Librairie Sana exploite un site e-commerce PrestaShop en production. Pour accompagner le développement de la vente en ligne, l'entreprise souhaite une application mobile connectée à la boutique. L'application doit permettre au client de consulter les produits, de gérer son panier, de passer commande et de suivre ses commandes.</p>

  <h2>Description de la réalisation</h2>
  <p>J'ai conçu et développé une application mobile cross-platform en Flutter. Les écrans communiquent avec l'API REST de PrestaShop pour récupérer le catalogue, les informations produits et les commandes. La logique applicative gère le panier, la navigation et la synchronisation des données avec la base MySQL de la boutique. Les écrans ont été adaptés aux formats mobiles puis testés sur émulateur et sur appareil Android. Firebase apporte les services mobiles (notifications, suivi).</p>

  <h2>Étapes de la mise en place</h2>
  <ol>
    <li>Analyse du besoin et des parcours utilisateurs.</li>
    <li>Conception des maquettes et du modèle de données (MCD/MLD).</li>
    <li>Mise en place de la connexion à l'API REST PrestaShop.</li>
    <li>Développement des écrans Flutter et de la logique panier/commandes.</li>
    <li>Tests, corrections, documentation et livraison.</li>
  </ol>

  <h2>Cette réalisation mobilise les compétences en : </h2>
  <p>conception et développement d'une solution mobile, consommation d'une API REST, gestion des données (MySQL, phpMyAdmin), services mobiles (Firebase), tests, documentation et travail en mode projet.</p>

  <h2>Schéma logique d'architecture : </h2>
  <div class="schema">
    <div class="node">Application mobile<small>Flutter / Dart</small></div>
    <div class="arrow">→</div>
    <div class="node">API REST<small>PrestaShop</small></div>
    <div class="arrow">→</div>
    <div class="node">Base de données<small>MySQL</small></div>
  </div>
  <p class="schema-note">Firebase : services mobiles et notifications — déploiement du back-end sur serveur Linux.</p>

  <h2>Documents et productions associés</h2>
  <div class="two-col">
    <ul>
      <li>Maquettes des écrans (parcours utilisateurs).</li>
      <li>MCD/MLD et modèle de données.</li>
      <li>Code source Flutter (référentiel GitHub).</li>
    </ul>
    <ul>
      <li>Collection de tests de l'API REST.</li>
      <li>Captures d'écran de l'application.</li>
      <li>Documentation technique.</li>
    </ul>
  </div>

  ${footer('Réalisation n°1 — verso')}
</div></body></html>`;

const stadiumSp2 = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>SP2 — Site web StadiumCompany</title><style>${css}</style></head>
<body><div class="sheet sp">
  ${officielTop(
    'FICHE DE LA SITUATION PROFESSIONNELLE N°2 (SP2)',
    'Épreuve E6 — Concevoir et développer des solutions applicatives (option SLAM)',
  )}
  <h1>Description d'une situation professionnelle</h1>

  <p><strong>N° SP : 2</strong> — <strong>Nom, prénom :</strong> MALLEM Moncef — <strong>N° candidat :</strong> ……………………………</p>
  <p><strong>Épreuve :</strong> ☐ Épreuve ponctuelle &nbsp;&nbsp; ☑ Contrôle en cours de formation</p>
  <p><strong>Date :</strong> Juin 2027 &nbsp;·&nbsp; <strong>Modalité :</strong> ☐ Seul(e) &nbsp;&nbsp; ☑ En équipe</p>
  <p><strong>Centre de formation :</strong> Ynov Campus Paris &nbsp;·&nbsp; <strong>Option :</strong> SLAM</p>

  <h2>Organisation support de la situation professionnelle</h2>
  <p>${orgStadium}</p>

  <h2>Intitulé de la situation professionnelle</h2>
  <p style="text-align:center"><strong>Conception et développement du site web officiel de StadiumCompany.</strong></p>
  <p style="text-align:center"><strong>Période de réalisation :</strong> 2026 – 2027 &nbsp;·&nbsp; <strong>Lieu :</strong> Ynov Campus Paris</p>

  <h2>Contexte</h2>
  <p>La gestion des événements et des réservations est réalisée manuellement. L'organisation souhaite un site web officiel pour présenter les événements, centraliser les informations et permettre la réservation en ligne.</p>

  <h2>Besoin</h2>
  <p>Créer un site web responsive avec une partie publique (événements, billetterie, réservation, boutique, restauration, contact) et un espace administrateur pour gérer les événements, les places et les réservations.</p>

  <h2>Utilisateurs concernés</h2>
  <ul>
    <li><strong>Visiteur / client :</strong> consulter les événements, vérifier les places disponibles et réserver.</li>
    <li><strong>Administrateur :</strong> gérer les événements, les places et les réservations depuis le back-office.</li>
  </ul>

  <h2>Contraintes techniques</h2>
  <ul>
    <li>HTML5, CSS3, Bootstrap 5 et JavaScript.</li>
    <li>PHP et PDO pour le traitement serveur.</li>
    <li>MySQL/MariaDB pour les données.</li>
    <li>Déploiement Apache2 sur VM Debian ; site responsive et sécurisé.</li>
  </ul>

  <h2>Compétences travaillées</h2>
  <ul>
    ${competencesSLAM.map((c) => `<li>${c}</li>`).join('')}
  </ul>

  <h2>Conditions de réalisation (ressources fournies, résultats attendus)</h2>
  <ul>
    <li>Cahier des charges, spécifications fonctionnelles, maquettes et MCD/MPD.</li>
    <li>Environnement PHP/MySQL et VM Debian.</li>
    <li>Documentation Bootstrap, PHP, PDO et MySQL.</li>
    <li>Site responsive avec pages publiques, espace administrateur protégé, base opérationnelle, tests et documentation livrés.</li>
  </ul>

  <h2>Description des ressources documentaires, matérielles et logicielles utilisées</h2>
  <p><strong>Documentaires :</strong> cahier des charges, wireframes, MCD/MPD, spécifications fonctionnelles, documentation Bootstrap, PHP, PDO et MySQL.</p>
  <p><strong>Matérielles :</strong> PC, VM Debian, serveur web Apache2, base de données MySQL/MariaDB.</p>
  <p><strong>Logicielles :</strong> VS Code, XAMPP, MySQL/MariaDB, phpMyAdmin, Git, MobaXterm, navigateur web.</p>

  ${footer('Situation professionnelle 2 — site web StadiumCompany')}
</div></body></html>`;

const stadiumRealisation = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>Réalisation 2 — Site web StadiumCompany</title><style>${css}</style></head>
<body><div class="sheet">
  ${officielTop(annexeRecto, epreuveE6)}
  <h1>Description d'une réalisation professionnelle</h1>

  ${identite([
    '<strong>N° réalisation : 2</strong> — <strong>Nom, prénom :</strong> MALLEM Moncef — <strong>N° candidat :</strong> ……………………………',
    '<strong>Épreuve :</strong> ☐ Épreuve ponctuelle &nbsp;&nbsp; ☑ Contrôle en cours de formation',
    '<strong>Date :</strong> Juin 2027 &nbsp;·&nbsp; <strong>Modalité :</strong> ☐ Seul(e) &nbsp;&nbsp; ☑ En équipe',
    '<strong>Centre de formation :</strong> Ynov Campus Paris &nbsp;·&nbsp; <strong>Option :</strong> SLAM',
  ])}

  <h2>Organisation support de la réalisation professionnelle</h2>
  <p>${orgStadium}</p>

  <h2>Intitulé de la réalisation professionnelle</h2>
  <p style="text-align:center"><strong>Conception et développement du site web officiel de StadiumCompany.</strong></p>
  <p style="text-align:center"><strong>Période de réalisation :</strong> 2026 – 2027 &nbsp;·&nbsp; <strong>Lieu :</strong> Ynov Campus Paris</p>

  <h2>Compétences travaillées</h2>
  <ul>
    ${competencesSLAM.map((c) => `<li>${c}</li>`).join('')}
  </ul>

  <h2>Conditions de réalisation (ressources fournies, résultats attendus)</h2>
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

  <h2>Description des ressources documentaires, matérielles et logicielles utilisées</h2>
  <div class="box">
    <p><strong>Documentaires :</strong> cahier des charges, wireframes, MCD/MPD, spécifications fonctionnelles, documentation Bootstrap, PHP, PDO et MySQL.</p>
    <p><strong>Matérielles :</strong> PC, VM Debian, serveur web Apache2, base de données MySQL/MariaDB.</p>
    <p><strong>Logicielles :</strong> VS Code, XAMPP, MySQL/MariaDB, phpMyAdmin, Git, MobaXterm, navigateur web.</p>
  </div>

  <h2>Modalités d'accès aux productions et à leur documentation</h2>
  <p>Les productions sont accessibles depuis le portfolio, onglet <strong>Projets E6</strong>, via les boutons <strong>SP2</strong>, <strong>Réalisation</strong>, <strong>GitHub</strong>, <strong>Tableau de synthèse</strong> et <strong>Documentation</strong>. Le code source, les captures et les tests sont présentés à l'épreuve.</p>

  ${footer('Réalisation n°2 — recto')}
</div>

<div class="sheet page-break">
  ${officielTop(annexeVerso, epreuveE6)}
  <h1>Descriptif de la réalisation professionnelle</h1>
  <p style="text-align:center; margin-bottom:3mm">y compris les productions réalisées et schémas explicatifs</p>

  <h2>Contexte</h2>
  <p>StadiumCompany gère un stade multi-événements. Le site doit présenter les événements, permettre la réservation de places et fournir un espace d'administration pour gérer les données (événements, places, réservations).</p>

  <h2>Description de la réalisation</h2>
  <p>J'ai développé, en équipe, un site web dynamique en PHP avec une base MySQL. Les pages publiques affichent les événements et les places disponibles. Le formulaire de réservation enregistre les demandes et met à jour le statut des places. Un espace administrateur protégé par session permet de gérer les événements, les places et les réservations. Le site est responsive (Bootstrap 5) et déployé sur Apache2 sous Debian.</p>

  <h2>Étapes de la mise en place</h2>
  <ol>
    <li>Analyse du besoin et rédaction des spécifications.</li>
    <li>Conception des wireframes et du MCD/MPD.</li>
    <li>Création de la base de données et des tables (script SQL).</li>
    <li>Développement des pages publiques et du back-office.</li>
    <li>Tests, sécurisation (formulaires, sessions) et déploiement sur Apache2/Debian.</li>
  </ol>

  <h2>Cette réalisation mobilise les compétences en : </h2>
  <p>conception et développement d'une application web, modélisation et gestion des données (MySQL/MariaDB), sécurisation des formulaires et des sessions, tests, déploiement et travail en équipe en mode projet.</p>

  <h2>Schéma logique d'architecture : </h2>
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
      <li>Code source du site (référentiel GitHub).</li>
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
