import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, FileText, Github, Table2 } from 'lucide-react';
import { btn, cx, PageHeader, TabPanel, Tabs, type Tone } from './kit';

type Tech = { nom: string; logo: string };
type Realisation = {
  titre: string;
  description: string;
  technologies: Tech[];
  githubUrl: string;
  documentationUrl: string | null;
  competences: number[];
};
type Rubrique = { id: string; titre: string; contexte: string; tone: Tone; realisations: Realisation[] };

export const rubriques: Rubrique[] = [
  {
    id: 'projets-formation',
    titre: 'Projet en formation',
    contexte: 'Formation',
    tone: 'brand',
    realisations: [
      {
        titre: 'Installation serveur Apache 2',
        description: "Configuration complète d'un serveur web Apache 2 avec mise en place des bonnes pratiques de sécurité et optimisation des performances.",
        technologies: [
          { nom: 'Apache', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg' },
          { nom: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
        ],
        githubUrl: 'https://github.com/mcf78',
        documentationUrl: 'https://drive.google.com/file/d/1W5jmNOc32lm4RpYwgkB0a-Vs7RhAsW73/view?usp=sharing',
        competences: [0, 4],
      },
      {
        titre: 'Portfolio personnel',
        description: 'Site portfolio personnel moderne et responsive pour présenter mes projets et compétences avec animations fluides.',
        technologies: [
          { nom: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
          { nom: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
          { nom: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        ],
        githubUrl: 'https://github.com/mcf78',
        documentationUrl: null,
        competences: [2, 4, 5],
      },
      {
        titre: 'Installation OCS Inventory & GLPI',
        description: "Installer et configurer OCS Inventory NG et GLPI sur une VM Debian afin de réaliser l'inventaire automatique des postes clients (Windows/Linux) et gérer le parc informatique via une interface web, en utilisant une architecture LAMP.",
        technologies: [
          { nom: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
          { nom: 'Apache2', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg' },
          { nom: 'MariaDB/MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
          { nom: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
          { nom: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
          { nom: 'Perl', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg' },
          { nom: 'Bash', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
        ],
        githubUrl: 'https://github.com/mcf78',
        documentationUrl: 'https://drive.google.com/file/d/1UfgXUa8yjtpzf10_m6_UXLXK_LmpxXzJ/view?usp=sharing',
        competences: [0, 4],
      },
      {
        titre: 'Gestion des tickets GLPI & OCS',
        description: "Maîtriser l'interface GLPI pour créer, traiter et clôturer des tickets d'incident selon la méthodologie ITIL. Consulter l'inventaire matériel/logiciel via OCS Inventory et lier les tickets aux actifs inventoriés pour une gestion optimale du parc informatique.",
        technologies: [
          { nom: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
          { nom: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
          { nom: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        ],
        githubUrl: 'https://github.com/mcf78',
        documentationUrl: 'https://drive.google.com/file/d/1VGqSX7Kk72z-o0_NLjU6pXM_FahAKSZj/view?usp=sharing',
        competences: [0, 1, 4],
      },
      {
        titre: 'Site web StadiumCompany',
        description: 'StadiumCompany est une organisation qui gère un grand stade multi-événements. Dans le cadre du projet, la partie SLAM consiste à concevoir et développer le site web officiel de StadiumCompany.',
        technologies: [
          { nom: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
          { nom: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
          { nom: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
          { nom: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
          { nom: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
          { nom: 'Linux/Bash', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
          { nom: 'MySQL/MariaDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
          { nom: 'VM Debian', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg' },
          { nom: 'MobaXterm', logo: '' },
        ],
        githubUrl: 'https://github.com/mcf78',
        documentationUrl: './e6/documentation-stadiumcompany.pdf',
        competences: [2, 3, 4],
      },
    ],
  },
  {
    id: 'projets-entreprise',
    titre: 'Projet en entreprise',
    contexte: 'Entreprise',
    tone: 'orange',
    realisations: [
      {
        titre: 'API REST PrestaShop',
        description: "Conception et développement d'une API REST pour connecter une application mobile à la plateforme PrestaShop.",
        technologies: [{ nom: 'Prestashop', logo: 'https://cdn.simpleicons.org/prestashop' }],
        githubUrl: 'https://github.com/mcf78',
        documentationUrl: './e6/sp1-application-mobile.pdf',
        competences: [2, 3, 4],
      },
      {
        titre: 'Application mobile e-commerce',
        description: "Application mobile cross-platform pour la gestion d'une boutique en ligne avec panier, paiement et suivi des commandes.",
        technologies: [
          { nom: 'Dart', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
          { nom: 'Bash', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
          { nom: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
          { nom: 'PhpMyAdmin', logo: 'https://cdn.simpleicons.org/phpmyadmin' },
          { nom: 'Prestashop', logo: 'https://cdn.simpleicons.org/prestashop' },
          { nom: 'Putty', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/putty/putty-original.svg' },
          { nom: 'API Rest', logo: '' },
        ],
        githubUrl: 'https://github.com/mcf78',
        documentationUrl: './e6/sp1-application-mobile.pdf',
        competences: [2, 3, 4],
      },
      {
        titre: 'Application de gestion de stock',
        description: "Développement d'une application complète de gestion de stock pour une entreprise.",
        technologies: [
          { nom: 'Dart', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
          { nom: 'Bash', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
          { nom: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
          { nom: 'PhpMyAdmin', logo: 'https://cdn.simpleicons.org/phpmyadmin' },
          { nom: 'Prestashop', logo: 'https://cdn.simpleicons.org/prestashop' },
          { nom: 'API Rest', logo: '' },
          { nom: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
        ],
        githubUrl: 'https://github.com/mcf78',
        documentationUrl: null,
        competences: [1, 3, 4],
      },
    ],
  },
  {
    id: 'projets-tutores',
    titre: 'Projet tutoré',
    contexte: 'Projet tutoré',
    tone: 'green',
    realisations: [
      {
        titre: 'Site web e-commerce Shopify',
        description: "Conception et développement d'une boutique en ligne complète sur la plateforme Shopify avec personnalisation du thème et intégration de modules.",
        technologies: [],
        githubUrl: 'https://github.com/mcf78',
        documentationUrl: null,
        competences: [2, 3, 4],
      },
    ],
  },
];

function CarteRealisation({ realisation }: { realisation: Realisation }) {
  const hasDocumentation = Boolean(realisation.documentationUrl);
  const href = realisation.documentationUrl ?? '#tableau-synthese';

  return (
    <article className="flex flex-col items-center gap-3 rounded-[12px] border border-line bg-surface px-3.5 py-4 text-center transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-card">
      <h3 className="min-w-0 text-[14.5px] leading-snug font-semibold tracking-[-0.006em] text-ink">
        {realisation.titre}
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <a
          href={realisation.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cx(btn('secondary', 'sm'))}
        >
          <Github size={14} />
          <span>GitHub</span>
        </a>
        <a
          href={href}
          {...(hasDocumentation ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={cx(btn(hasDocumentation ? 'soft' : 'ghost', 'sm'))}
        >
          {hasDocumentation ? <FileText size={14} /> : <Table2 size={14} />}
          <span>{hasDocumentation ? 'Documentation' : 'Voir la synthèse'}</span>
          {hasDocumentation ? <ArrowUpRight size={13} /> : null}
        </a>
      </div>
    </article>
  );
}

export function Missions() {
  const [rubriqueActive, setRubriqueActive] = useState(rubriques[0].id);
  const rubrique = rubriques.find((r) => r.id === rubriqueActive) ?? rubriques[0];
  const nombreRealisations = rubriques.reduce((total, r) => total + r.realisations.length, 0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Quand on change de catégorie, on remonte la barre d'onglets pour que la nouvelle
  // rubrique soit cadrée en haut, au lieu de rester collée au bas de l'écran.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    tabsRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }, [rubriqueActive]);

  return (
    <div>
      <PageHeader
        title="Mes réalisations"
        description="Réalisations de l'épreuve E5, classées par contexte : formation, entreprise et projet tutoré."
      />

      <div ref={tabsRef} className="scroll-mt-20 lg:scroll-mt-6">
        <Tabs
          label="Rubriques de l'épreuve E5"
          value={rubriqueActive}
          onChange={setRubriqueActive}
          items={rubriques.map((r) => ({ id: r.id, label: r.titre, tone: r.tone, count: r.realisations.length }))}
        />
      </div>

      <TabPanel key={rubrique.id} id={rubrique.id} className="mt-3 grid gap-2 md:grid-cols-2">
        {rubrique.realisations.map((realisation) => (
          <CarteRealisation key={realisation.titre} realisation={realisation} />
        ))}
      </TabPanel>

      <section id="tableau-synthese" className="mb-4 scroll-mt-24">
        <div className="overflow-hidden rounded-[12px] border border-line bg-surface">
          <div className="flex flex-col gap-3 border-b border-line bg-surface-2 px-4 py-3.5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.06em] text-brand-ink uppercase">Tableau de synthèse E5</p>
              <h2 className="mt-0.5 text-[17px] leading-snug font-semibold tracking-[-0.012em] text-ink">
                Tableau officiel des réalisations
              </h2>
              <p className="mt-0.5 text-[12.5px] text-ink-3">
                MALLEM Moncef · BTS SIO SLAM · Session 2027 · {nombreRealisations} réalisations
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <p className="text-[12px] leading-snug text-ink-3">Document officiel · PDF · 2 pages</p>
              <a
                href="./e5/tableau-synthese-e5.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={cx(btn('primary', 'sm'))}
              >
                <FileText size={14} />
                <span>Ouvrir le tableau officiel</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          <div className="bg-white">
            <iframe
              src="./e5/tableau-synthese-e5.pdf#view=FitH&navpanes=0"
              title="Tableau de synthèse E5 — MALLEM Moncef"
              className="block h-[72vh] min-h-[420px] w-full"
            />
          </div>

          <p className="border-t border-line px-4 py-2 text-[11px] text-ink-4">
            Si l'aperçu ne s'affiche pas (mobile ou navigateur sans lecteur PDF), utilisez le bouton « Ouvrir le tableau
            officiel » ci-dessus.
          </p>
        </div>
      </section>
    </div>
  );
}
