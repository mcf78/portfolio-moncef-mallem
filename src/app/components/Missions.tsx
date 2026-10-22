import { useState } from 'react';
import { ArrowUpRight, Check, FileText, Table2 } from 'lucide-react';
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

const COMPETENCES = [
  { code: 'C1', court: 'Patrimoine', titre: 'Gérer le patrimoine informatique' },
  { code: 'C2', court: 'Incidents', titre: "Répondre aux incidents et aux demandes d'assistance et d'évolution" },
  { code: 'C3', court: 'Présence en ligne', titre: "Développer la présence en ligne de l'organisation" },
  { code: 'C4', court: 'Mode projet', titre: 'Travailler en mode projet' },
  { code: 'C5', court: 'Service', titre: 'Mettre à disposition des utilisateurs un service informatique' },
  { code: 'C6', court: 'Développement pro', titre: 'Organiser son développement professionnel' },
];

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

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
        githubUrl: 'https://github.com',
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
        githubUrl: 'https://github.com',
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
        githubUrl: 'https://github.com',
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
        githubUrl: 'https://github.com',
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
        githubUrl: 'https://github.com',
        documentationUrl: 'https://drive.google.com/file/d/1z5gYyA7jVAhe5jJsL2_dcRa5mKM906dT/view?usp=sharing',
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
        githubUrl: 'https://github.com',
        documentationUrl: './e6/realisation-application-mobile.pdf',
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
        githubUrl: 'https://github.com',
        documentationUrl: './e6/realisation-application-mobile.pdf',
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
        githubUrl: 'https://github.com',
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
        githubUrl: 'https://github.com',
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
    <article className="flex flex-col gap-3 rounded-[12px] border border-line bg-surface p-3.5 transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-card sm:flex-row sm:items-center sm:justify-between">
      <h3 className="min-w-0 text-[14.5px] leading-snug font-semibold tracking-[-0.006em] text-ink">
        {realisation.titre}
      </h3>
      <a
        href={href}
        {...(hasDocumentation ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={cx(btn(hasDocumentation ? 'soft' : 'ghost', 'sm'), 'shrink-0')}
      >
        {hasDocumentation ? <FileText size={14} /> : <Table2 size={14} />}
        <span>{hasDocumentation ? 'Documentation' : 'Voir la synthèse'}</span>
        {hasDocumentation ? <ArrowUpRight size={13} /> : null}
      </a>
    </article>
  );
}

export function Missions() {
  const [rubriqueActive, setRubriqueActive] = useState(rubriques[0].id);
  const rubrique = rubriques.find((r) => r.id === rubriqueActive) ?? rubriques[0];
  const nombreRealisations = rubriques.reduce((total, r) => total + r.realisations.length, 0);

  return (
    <div>
      <PageHeader
        title="Mes réalisations"
        description="Réalisations de l'épreuve E5, classées par contexte : formation, entreprise et projet tutoré."
      />

      <section id="tableau-synthese" className="mb-4 scroll-mt-24">
        <div className="overflow-hidden rounded-[12px] border border-line bg-surface">
          <div className="flex flex-col gap-3 border-b border-line bg-surface-2 px-4 py-3.5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.06em] text-brand-ink uppercase">Tableau de synthèse E5</p>
              <h2 className="mt-0.5 text-[17px] leading-snug font-semibold tracking-[-0.012em] text-ink">
                Compétences mobilisées par réalisation
              </h2>
              <p className="mt-0.5 text-[12.5px] text-ink-3">
                MALLEM Moncef · BTS SIO SLAM · Session 2027 · {nombreRealisations} réalisations
              </p>
            </div>
            <p className="max-w-[34ch] text-[12px] leading-snug text-ink-3">
              6 compétences · mobilisées selon les projets.
            </p>
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-surface-2/60 text-[12px] text-ink-3">
                  <th scope="col" className="w-[220px] px-4 py-2.5 text-[11.5px] font-semibold tracking-[0.04em] uppercase">
                    Réalisation
                  </th>
                  <th scope="col" className="w-[88px] px-3 py-2.5 text-[11.5px] font-semibold tracking-[0.04em] uppercase">
                    Contexte
                  </th>
                  {COMPETENCES.map((competence) => (
                    <th
                      key={competence.code}
                      scope="col"
                      title={competence.titre}
                      className="w-[62px] px-1.5 py-2.5 text-center align-bottom"
                    >
                      <span className="block text-[11px] font-semibold text-brand-ink">{competence.code}</span>
                      <span className="mt-0.5 block text-[10.5px] leading-tight font-medium text-ink-3">
                        {competence.court}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              {rubriques.map((rubrique) => (
                <tbody key={rubrique.id}>
                  <tr className="border-b border-line bg-surface-2/40">
                    <th
                      colSpan={8}
                      scope="colgroup"
                      className="px-4 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-ink-3 uppercase"
                    >
                      {rubrique.titre}
                    </th>
                  </tr>
                  {rubrique.realisations.map((realisation) => (
                    <tr
                      key={realisation.titre}
                      id={`realisation-${slugify(realisation.titre)}`}
                      className="scroll-mt-24 border-b border-line transition-colors duration-150 last:border-0 hover:bg-surface-2/40"
                    >
                      <th scope="row" className="px-4 py-2.5 text-[12.5px] leading-snug font-medium text-ink">
                        {realisation.titre}
                      </th>
                      <td className="px-3 py-2.5 text-[12px] text-ink-3">{rubrique.contexte}</td>
                      {COMPETENCES.map((competence, index) => {
                        const active = realisation.competences.includes(index);
                        return (
                          <td key={competence.code} className="px-1.5 py-2.5 text-center">
                            {active ? (
                              <span
                                role="img"
                                aria-label={`${competence.titre} : mobilisée`}
                                className="mx-auto grid size-[18px] place-items-center rounded-full bg-brand text-on-brand"
                              >
                                <Check size={11} strokeWidth={3} />
                              </span>
                            ) : (
                              <span
                                role="img"
                                aria-label={`${competence.titre} : non mobilisée`}
                                className="mx-auto block h-px w-3 bg-line-strong/60"
                              />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>

          <div className="lg:hidden">
            {rubriques.map((rubrique) => (
              <div key={rubrique.id} className="border-b border-line last:border-0">
                <p className="bg-surface-2/40 px-4 py-1.5 text-[10.5px] font-semibold tracking-[0.06em] text-ink-3 uppercase">
                  {rubrique.titre}
                </p>
                {rubrique.realisations.map((realisation) => (
                  <div key={realisation.titre} className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <div className="min-w-0">
                      <p className="text-[12.5px] leading-snug font-medium text-ink">{realisation.titre}</p>
                      <p className="mt-0.5 text-[10.5px] text-ink-4">{rubrique.contexte}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      {COMPETENCES.map((competence, index) => {
                        const active = realisation.competences.includes(index);
                        return (
                          <span
                            key={competence.code}
                            role="img"
                            title={`${competence.code} — ${competence.titre}${active ? ' : mobilisée' : ' : non mobilisée'}`}
                            aria-label={`${competence.code} ${competence.titre} : ${active ? 'mobilisée' : 'non mobilisée'}`}
                            className={cx(
                              'grid size-6 place-items-center rounded-[5px] text-[9.5px] font-semibold',
                              active ? 'bg-brand text-on-brand' : 'bg-surface-2 text-ink-4',
                            )}
                          >
                            {competence.code}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <p className="px-4 py-2 text-[10.5px] text-ink-4">Badge coloré : compétence mobilisée.</p>
          </div>

          <div className="border-t border-line px-4 py-3">
            <p className="text-[11px] font-semibold tracking-[0.06em] text-ink-3 uppercase">Légende</p>
            <ul className="mt-1.5 grid gap-x-4 gap-y-1 sm:grid-cols-2 xl:grid-cols-3">
              {COMPETENCES.map((competence) => (
                <li key={competence.code} className="flex gap-1.5 text-[12px] leading-snug text-ink-3">
                  <span className="shrink-0 font-semibold text-brand-ink">{competence.code}</span>
                  <span>{competence.titre}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Tabs
        label="Rubriques de l'épreuve E5"
        value={rubriqueActive}
        onChange={setRubriqueActive}
        items={rubriques.map((r) => ({ id: r.id, label: r.titre, tone: r.tone, count: r.realisations.length }))}
      />

      <TabPanel key={rubrique.id} id={rubrique.id} className="mt-3 grid gap-2 md:grid-cols-2">
        {rubrique.realisations.map((realisation) => (
          <CarteRealisation key={realisation.titre} realisation={realisation} />
        ))}
      </TabPanel>
    </div>
  );
}
