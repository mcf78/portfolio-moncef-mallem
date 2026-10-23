import { useState } from 'react';
import { ClipboardList, FileText, Github, Table2 } from 'lucide-react';
import { btn, Eyebrow, PageHeader, TechChip } from './kit';
import { DocumentDialog, type DocumentActif } from './DocumentDialog';

type Projet = {
  titre: string;
  description: string;
  sp: string;
  spUrl: string;
  documentationUrl: string;
  technologies: { nom: string; logo: string }[];
  githubUrl: string;
  tableauSyntheseUrl: string | null;
};

export const projets: Projet[] = [
  {
    titre: 'Application mobile e-commerce',
    description:
      "Application mobile cross-platform pour la gestion d'une boutique en ligne avec panier, paiement et suivi des commandes. Elle est connectée à PrestaShop via une API REST.",
    sp: 'SP1',
    // SP1/SP2 ouvrent la fiche officielle Annexe VII-1-B (recto/verso).
    spUrl: './e6/sp1-application-mobile.pdf',
    documentationUrl: './e6/realisation-application-mobile.pdf',
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
    tableauSyntheseUrl: './e5/tableau-synthese-e5.pdf',
  },
  {
    titre: 'Site web StadiumCompany',
    description:
      "StadiumCompany est une organisation qui gère un grand stade multi-événements. Dans le cadre du projet, la partie SLAM consiste à concevoir et développer le site web officiel de StadiumCompany.",
    sp: 'SP2',
    spUrl: './e6/sp2-stadiumcompany.pdf',
    // La documentation StadiumCompany couvre l'intégralité du projet (PDF 40 pages).
    documentationUrl: './e6/documentation-stadiumcompany.pdf',
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
    tableauSyntheseUrl: './e5/tableau-synthese-e5.pdf',
  },
];

export function Projets() {
  const [documentActif, setDocumentActif] = useState<DocumentActif | null>(null);

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
                <button
                  type="button"
                  onClick={() =>
                    setDocumentActif({
                      titre: `${projet.sp} — ${projet.titre}`,
                      url: projet.spUrl,
                      meta: 'Fiche officielle · Annexe VII-1-B · PDF',
                    })
                  }
                  className={`${btn('secondary')} flex-1`}
                >
                  <ClipboardList size={16} />
                  <span>{projet.sp}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setDocumentActif({
                      titre: `Documentation — ${projet.titre}`,
                      url: projet.documentationUrl,
                      meta: 'Documentation E6 · PDF · lecture intégrée',
                    })
                  }
                  className={`${btn('primary')} flex-1`}
                >
                  <FileText size={16} />
                  <span>Documentation</span>
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <a href={projet.githubUrl} target="_blank" rel="noopener noreferrer" className={btn('secondary', 'sm')}>
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
                {projet.tableauSyntheseUrl && (
                  <a href={projet.tableauSyntheseUrl} target="_blank" rel="noopener noreferrer" className={btn('soft', 'sm')}>
                    <Table2 size={14} />
                    <span>Tableau de synthèse</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <DocumentDialog document={documentActif} onClose={() => setDocumentActif(null)} />
    </div>
  );
}
