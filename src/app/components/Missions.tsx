import { useState } from 'react';
import { Github, FileText } from 'lucide-react';
import { btn, cx, PageHeader, TabPanel, Tabs, TechChip, type Tone } from './kit';

type Tech = { nom: string; logo: string };
type Realisation = {
  titre: string;
  description: string;
  technologies: Tech[];
  githubUrl: string;
  documentationUrl: string | null;
};
type Rubrique = { id: string; titre: string; tone: Tone; realisations: Realisation[] };

const rubriques: Rubrique[] = [
  {
    id: 'projets-formation',
    titre: 'Projet en formation',
    tone: 'brand',
    realisations: [
      {
        titre: "Installation et configuration d'un serveur Apache 2",
        description: "Configuration complète d'un serveur web Apache 2 avec mise en place des bonnes pratiques de sécurité et optimisation des performances.",
        technologies: [
          { nom: 'Apache', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg' },
          { nom: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
        ],
        githubUrl: 'https://github.com',
        documentationUrl: 'https://drive.google.com/file/d/1W5jmNOc32lm4RpYwgkB0a-Vs7RhAsW73/view?usp=sharing',
      },
      {
        titre: 'Portfolio Personnel',
        description: 'Site portfolio personnel moderne et responsive pour présenter mes projets et compétences avec animations fluides.',
        technologies: [
          { nom: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
          { nom: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
          { nom: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        ],
        githubUrl: 'https://github.com',
        documentationUrl: null,
      },
      {
        titre: 'OCS GLPI',
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
        githubUrl: 'https://github.com',
        documentationUrl: 'https://drive.google.com/file/d/1UfgXUa8yjtpzf10_m6_UXLXK_LmpxXzJ/view?usp=sharing',
      },
      {
        titre: 'Gestion des tickets avec GLPI & OCS Inventory',
        description: "Maîtriser l'interface GLPI pour créer, traiter et clôturer des tickets d'incident selon la méthodologie ITIL. Consulter l'inventaire matériel/logiciel via OCS Inventory et lier les tickets aux actifs inventoriés pour une gestion optimale du parc informatique.",
        technologies: [
          { nom: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
          { nom: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
          { nom: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        ],
        githubUrl: 'https://github.com',
        documentationUrl: 'https://drive.google.com/file/d/1VGqSX7Kk72z-o0_NLjU6pXM_FahAKSZj/view?usp=sharing',
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
        githubUrl: 'https://github.com',
        documentationUrl: 'https://drive.google.com/file/d/1z5gYyA7jVAhe5jJsL2_dcRa5mKM906dT/view?usp=sharing',
      },
    ],
  },
  {
    id: 'projets-entreprise',
    titre: 'Projet en entreprise',
    tone: 'orange',
    realisations: [
      {
        titre: 'API REST PrestaShop',
        description: "Conception et développement d'une API REST pour connecter une application mobile à la plateforme PrestaShop.",
        technologies: [{ nom: 'Prestashop', logo: 'https://cdn.simpleicons.org/prestashop' }],
        githubUrl: 'https://github.com',
        documentationUrl: null,
      },
      {
        titre: 'Application Mobile E-commerce',
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
        githubUrl: 'https://github.com',
        documentationUrl: null,
      },
      {
        titre: 'Application de Gestion de Stock',
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
        githubUrl: 'https://github.com',
        documentationUrl: null,
      },
    ],
  },
  {
    id: 'projets-tutores',
    titre: 'Projet tutoré',
    tone: 'green',
    realisations: [
      {
        titre: 'Site web e-commerce Shopify',
        description: "Conception et développement d'une boutique en ligne complète sur la plateforme Shopify avec personnalisation du thème et intégration de modules.",
        technologies: [],
        githubUrl: 'https://github.com',
        documentationUrl: null,
      },
    ],
  },
];

function CarteRealisation({ realisation }: { realisation: Realisation }) {
  return (
    <article className="flex flex-col rounded-[12px] border border-line bg-surface p-4 transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-card">
      <h3 className="text-[15px] leading-snug font-semibold tracking-[-0.006em] text-ink">{realisation.titre}</h3>
      <p className="mt-1.5 text-[13.5px] leading-[1.55] text-ink-3">{realisation.description}</p>
      {realisation.technologies.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {realisation.technologies.map((tech) => (
            <TechChip key={tech.nom} nom={tech.nom} logo={tech.logo} />
          ))}
        </div>
      )}
      <div className="mt-auto flex gap-2 pt-4">
        <a href={realisation.githubUrl} target="_blank" rel="noopener noreferrer" className={cx(btn('secondary', 'sm'), 'flex-1')}>
          <Github size={15} />
          <span>GitHub</span>
        </a>
        {/* Le bouton n'apparaît que si la documentation a un lien (renseigner documentationUrl pour l'afficher). */}
        {realisation.documentationUrl && (
          <a href={realisation.documentationUrl} target="_blank" rel="noopener noreferrer" className={cx(btn('soft', 'sm'), 'flex-1')}>
            <FileText size={15} />
            <span>Documentation</span>
          </a>
        )}
      </div>
    </article>
  );
}

export function Missions() {
  const [rubriqueActive, setRubriqueActive] = useState(rubriques[0].id);
  const rubrique = rubriques.find((r) => r.id === rubriqueActive) ?? rubriques[0];

  const handleDownloadTableau = () => {
    window.open('https://drive.google.com/file/d/1YFMRH7RI_2jN9y4shdEoahllQHknzz6O/view?usp=sharing', '_blank');
  };

  return (
    <div>
      <PageHeader
        title="Mes petites réalisations"
        description={
          <p>
            Voici quelques-uns des projets que j'ai réalisés. Ils sont classés dans l'ordre : projets globaux,
            projets en formation, projets en entreprise et enfin les projets personnels. Vous pouvez cliquer sur
            les boutons pour accéder au site ou au code source.
          </p>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          label="Rubriques de l'épreuve E5"
          value={rubriqueActive}
          onChange={setRubriqueActive}
          items={rubriques.map((r) => ({ id: r.id, label: r.titre, tone: r.tone, count: r.realisations.length }))}
        />
        <button onClick={handleDownloadTableau} className={cx(btn(), 'shrink-0')}>
          <FileText size={16} />
          <span>Tableau de Synthèse</span>
        </button>
      </div>

      <TabPanel key={rubrique.id} id={rubrique.id} className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {rubrique.realisations.map((realisation) => (
          <CarteRealisation key={realisation.titre} realisation={realisation} />
        ))}
      </TabPanel>
    </div>
  );
}
