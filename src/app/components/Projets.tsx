import { ClipboardList, Download, FileText, Github } from 'lucide-react';
import { btn, Eyebrow, PageHeader, TechChip } from './kit';

type Projet = {
  titre: string;
  description: string;
  sp: string;
  spUrl: string;
  realisationUrl: string;
  technologies: { nom: string; logo: string }[];
  githubUrl: string;
  tableauSyntheseUrl: string | null;
  documentationUrl: string | null;
};

export const projets: Projet[] = [
  {
    titre: 'Application mobile e-commerce',
    description:
      "Application mobile cross-platform pour la gestion d'une boutique en ligne avec panier, paiement et suivi des commandes. Elle est connectée à PrestaShop via une API REST.",
    sp: 'SP1',
    spUrl: './e6/sp1-application-mobile.pdf',
    realisationUrl: './e6/realisation-application-mobile.pdf',
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
    tableauSyntheseUrl: null,
    documentationUrl: null,
  },
  {
    titre: 'Site web StadiumCompany',
    description:
      "StadiumCompany est une organisation qui gère un grand stade multi-événements. Dans le cadre du projet, la partie SLAM consiste à concevoir et développer le site web officiel de StadiumCompany.",
    sp: 'SP2',
    spUrl: './e6/sp2-stadiumcompany.pdf',
    realisationUrl: './e6/realisation-stadiumcompany.pdf',
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
    tableauSyntheseUrl: 'https://drive.google.com/file/d/1C_v2esw7DCRbywN0r6Se69FQms6dnhN8/view?usp=sharing',
    documentationUrl: 'https://drive.google.com/file/d/1z5gYyA7jVAhe5jJsL2_dcRa5mKM906dT/view?usp=sharing',
  },
];

export function Projets() {
  return (
    <div>
      <PageHeader
        title="Mes projets E6"
        description="Deux réalisations présentées à l'épreuve E6 — option SLAM."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {projets.map((projet) => (
          <article
            key={projet.titre}
            className="flex flex-col rounded-[12px] border border-line bg-surface p-5 transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-card sm:p-6"
          >
            <h2 className="text-[19px] leading-snug font-semibold tracking-[-0.012em] text-ink">{projet.titre}</h2>

            <p className="mt-2 text-[14.5px] leading-[1.6] text-ink-2">
              <span className="font-medium text-ink">Contexte : </span>
              {projet.description}
            </p>

            <div className="mt-5">
              <Eyebrow>Technologies utilisées</Eyebrow>
              <div className="flex flex-wrap gap-1.5">
                {projet.technologies.map((tech) => (
                  <TechChip key={tech.nom} nom={tech.nom} logo={tech.logo} compact />
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="flex flex-col gap-2 sm:flex-row">
                <a
                  href={projet.spUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btn('secondary')} flex-1`}
                >
                  <ClipboardList size={16} />
                  <span>{projet.sp}</span>
                </a>
                <a
                  href={projet.realisationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btn('primary')} flex-1`}
                >
                  <FileText size={16} />
                  <span>Réalisation</span>
                </a>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <a href={projet.githubUrl} target="_blank" rel="noopener noreferrer" className={btn('secondary', 'sm')}>
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
                {/* Ces boutons n'apparaissent que si le lien est renseigné dans les données ci-dessus. */}
                {projet.tableauSyntheseUrl && (
                  <a href={projet.tableauSyntheseUrl} target="_blank" rel="noopener noreferrer" className={btn('soft', 'sm')}>
                    <Download size={14} />
                    <span>Tableau de synthèse</span>
                  </a>
                )}
                {projet.documentationUrl && (
                  <a href={projet.documentationUrl} target="_blank" rel="noopener noreferrer" className={btn('soft', 'sm')}>
                    <FileText size={14} />
                    <span>Documentation</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
