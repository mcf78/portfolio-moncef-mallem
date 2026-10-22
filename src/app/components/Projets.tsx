import { ClipboardList, FileText } from 'lucide-react';
import { btn, PageHeader } from './kit';

export const projets = [
  {
    titre: 'Application mobile e-commerce',
    description:
      "Application mobile cross-platform pour la gestion d'une boutique en ligne avec panier, paiement et suivi des commandes. Elle est connectée à PrestaShop via une API REST.",
    sp: 'SP1',
    spUrl: './e6/sp1-application-mobile.pdf',
    realisationUrl: './e6/realisation-application-mobile.pdf',
  },
  {
    titre: 'Site web StadiumCompany',
    description:
      "StadiumCompany est une organisation qui gère un grand stade multi-événements. Dans le cadre du projet, la partie SLAM consiste à concevoir et développer le site web officiel de StadiumCompany.",
    sp: 'SP2',
    spUrl: './e6/sp2-stadiumcompany.pdf',
    realisationUrl: './e6/realisation-stadiumcompany.pdf',
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

            <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
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
          </article>
        ))}
      </div>
    </div>
  );
}
