import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowDown, ArrowUp, FileText, Github, Loader2, Maximize2 } from 'lucide-react';
import { btn, cx, PageHeader, TabPanel, Tabs, type Tone } from './kit';
import { DocumentDialog, type DocumentActif } from './DocumentDialog';

const PdfViewer = lazy(() => import('./PdfViewer').then((module) => ({ default: module.PdfViewer })));

type Tech = { nom: string; logo: string };
type Realisation = {
  titre: string;
  description: string;
  imageUrl?: string;
  technologies: Tech[];
  githubUrl: string | null;
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
        imageUrl: './previews/apache.webp',
        technologies: [
          { nom: 'Apache', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg' },
          { nom: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
        ],
        githubUrl: 'https://github.com/mcf78',
        documentationUrl: './e5/installation-apache2.pdf',
        competences: [0, 4],
      },
      {
        titre: 'Portfolio personnel',
        description: 'Site portfolio personnel moderne et responsive pour présenter mes projets et compétences avec animations fluides.',
        imageUrl: './previews/portfolio.webp',
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
        imageUrl: './previews/ocs-glpi.webp',
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
        documentationUrl: './e5/ocs-glpi.pdf',
        competences: [0, 4],
      },
      {
        titre: 'Gestion des tickets GLPI & OCS',
        description: "Maîtriser l'interface GLPI pour créer, traiter et clôturer des tickets d'incident selon la méthodologie ITIL. Consulter l'inventaire matériel/logiciel via OCS Inventory et lier les tickets aux actifs inventoriés pour une gestion optimale du parc informatique.",
        imageUrl: './previews/tickets-glpi.webp',
        technologies: [
          { nom: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
          { nom: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
          { nom: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        ],
        githubUrl: 'https://github.com/mcf78',
        documentationUrl: './e5/tickets-glpi.pdf',
        competences: [0, 1, 4],
      },
      {
        titre: 'Site web StadiumCompany',
        description: 'StadiumCompany est une organisation qui gère un grand stade multi-événements. Dans le cadre du projet, la partie SLAM consiste à concevoir et développer le site web officiel de StadiumCompany.',
        imageUrl: './previews/stadiumcompany.webp',
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
        imageUrl: './previews/api-prestashop.webp',
        technologies: [{ nom: 'Prestashop', logo: 'https://cdn.simpleicons.org/prestashop' }],
        githubUrl: 'https://github.com/mcf78',
        documentationUrl: './e6/sp1-application-mobile.pdf',
        competences: [2, 3, 4],
      },
      {
        titre: 'Application mobile e-commerce',
        description: "Application mobile cross-platform pour la gestion d'une boutique en ligne avec panier, paiement et suivi des commandes.",
        imageUrl: './previews/mobile-ecommerce.webp',
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
        imageUrl: './previews/gestion-stock.webp',
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
        imageUrl: './previews/shopify.webp',
        technologies: [],
        githubUrl: null,
        documentationUrl: './e5/documentation-shopify.pdf',
        competences: [2, 3, 4],
      },
    ],
  },
];

function CarteRealisation({
  realisation,
  onOpenDocument,
}: {
  realisation: Realisation;
  onOpenDocument: (document: DocumentActif) => void;
}) {
  const hasDocumentation = Boolean(realisation.documentationUrl);

  return (
    <article className="flex items-start gap-3 rounded-[12px] border border-line bg-surface p-3 transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-card sm:gap-4">
      {realisation.imageUrl && (
        <div className="aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-[7px] bg-surface-2 min-[360px]:w-32 sm:w-36">
          <img
            src={realisation.imageUrl}
            alt={`Aperçu : ${realisation.titre}`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <h3 className="text-[15px] leading-snug font-semibold tracking-[-0.006em] text-ink [overflow-wrap:anywhere]">
          {realisation.titre}
        </h3>
        <div className="flex flex-wrap gap-2">
          {realisation.githubUrl && (
            <a
              href={realisation.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(btn('secondary', 'sm'), 'flex-1')}
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
          )}
          {hasDocumentation && (
            <button
              type="button"
              onClick={() => {
                if (!realisation.documentationUrl) return;
                onOpenDocument({
                  titre: realisation.titre,
                  url: realisation.documentationUrl,
                  meta: 'Documentation E5 · PDF · lecture intégrée',
                });
              }}
              className={cx(btn('soft', 'sm'), 'flex-1')}
            >
              <FileText size={14} />
              <span>Documentation</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function Missions() {
  const [rubriqueActive, setRubriqueActive] = useState(rubriques[0].id);
  const [documentActif, setDocumentActif] = useState<DocumentActif | null>(null);
  const [retourAuTableau, setRetourAuTableau] = useState(false);
  const rubrique = rubriques.find((r) => r.id === rubriqueActive) ?? rubriques[0];
  const nombreRealisations = rubriques.reduce((total, r) => total + r.realisations.length, 0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tableauRef = useRef<HTMLElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // La destination suit le défilement réel, y compris lorsque la dernière
  // catégorie est trop courte pour placer son début tout en haut de l'écran.
  useEffect(() => {
    let frame: number | null = null;
    const mesurerPosition = () => {
      frame = null;
      const ancre = tabsRef.current;
      if (!ancre) return;
      const hautDesProjets = ancre.getBoundingClientRect().top;
      const seuil = Math.min(window.innerHeight * 0.45, 320);
      const enBasDePage = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      setRetourAuTableau(
        window.scrollY > 1 && (
          hautDesProjets <= seuil ||
          (enBasDePage && hautDesProjets < window.innerHeight - 80)
        ),
      );
    };
    const planifierMesure = () => {
      if (frame === null) frame = window.requestAnimationFrame(mesurerPosition);
    };
    window.addEventListener('scroll', planifierMesure, { passive: true });
    window.addEventListener('resize', planifierMesure);
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(planifierMesure) : null;
    if (pageRef.current) observer?.observe(pageRef.current);
    planifierMesure();
    return () => {
      window.removeEventListener('scroll', planifierMesure);
      window.removeEventListener('resize', planifierMesure);
      observer?.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  function naviguerDansE5() {
    const cible = retourAuTableau ? tableauRef.current : tabsRef.current;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    cible?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

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
    <div ref={pageRef} className="pb-24">
      <PageHeader
        title="Mes réalisations"
        description="Réalisations de l'épreuve E5, classées par contexte : formation, entreprise et projet tutoré."
      />

      <section id="tableau-synthese" ref={tableauRef} className="mb-4 scroll-mt-24 lg:scroll-mt-6">
        <div className="overflow-hidden rounded-[12px] border border-line bg-surface">
          <div className="flex flex-col gap-3 border-b border-line bg-surface-2 px-4 py-3.5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.06em] text-ink-3 uppercase">Tableau de synthèse E5</p>
              <h2 className="mt-0.5 text-[17px] leading-snug font-semibold tracking-[-0.012em] text-ink">
                Tableau officiel des réalisations
              </h2>
              <p className="mt-0.5 text-[12.5px] text-ink-3">
                MALLEM Moncef · BTS SIO SLAM · Session 2027 · {nombreRealisations} réalisations
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <p className="text-[12px] leading-snug text-ink-3">Aperçu intégré · PDF · 2 pages</p>
              <button
                type="button"
                onClick={() =>
                  setDocumentActif({
                    titre: 'Tableau de synthèse E5',
                    url: './e5/tableau-synthese-e5.pdf',
                    meta: 'Document officiel · MALLEM Moncef · 2 pages',
                  })
                }
                className={cx(btn('secondary', 'sm'))}
              >
                <Maximize2 size={14} />
                <span>Agrandir</span>
              </button>
            </div>
          </div>

          <div className="max-h-[45vh] overflow-y-auto bg-surface-2 p-3">
            <Suspense
              fallback={
                <div className="grid min-h-64 place-items-center rounded-[8px] border border-line bg-surface px-6 py-12 text-center">
                  <span className="inline-flex items-center gap-2 text-[13px] text-ink-3">
                    <Loader2 size={16} className="animate-spin" />
                    Chargement du tableau…
                  </span>
                </div>
              }
            >
              <PdfViewer src="./e5/tableau-synthese-e5.pdf" titre="Tableau de synthèse E5 — MALLEM Moncef" />
            </Suspense>
          </div>

        </div>
      </section>

      <div id="realisations-e5" ref={tabsRef} className="mt-5 scroll-mt-20 lg:scroll-mt-6" />
      <div className="sticky top-16 z-30 rounded-[12px] border border-brand-line bg-canvas p-3 shadow-[0_6px_20px_rgba(6,27,49,0.08)] lg:top-3">
        <h2 className="text-[15px] font-semibold text-ink">Explorer les réalisations</h2>
        <p className="mt-0.5 mb-3 text-[12.5px] text-ink-3">
          Cliquez sur une catégorie pour afficher ses projets.
        </p>
        <Tabs
          appearance="prominent"
          label="Rubriques de l'épreuve E5"
          value={rubriqueActive}
          onChange={setRubriqueActive}
          items={rubriques.map((r) => ({
            id: r.id,
            tone: r.tone,
            label: (
              <span className="block text-left">
                <span className="block">{r.contexte}</span>
                <span className="mt-0.5 block text-[11px] leading-snug font-medium">
                  {rubriqueActive === r.id ? 'Projets affichés' : (
                    <span className="underline underline-offset-2">
                      {r.realisations.length === 1 ? 'Afficher le projet' : `Afficher les ${r.realisations.length} projets`}
                      <span aria-hidden> →</span>
                    </span>
                  )}
                </span>
              </span>
            ),
          }))}
        />
      </div>

      <TabPanel key={rubrique.id} id={rubrique.id} className="mt-3 grid gap-2 md:grid-cols-2">
        {rubrique.realisations.map((realisation) => (
          <CarteRealisation
            key={realisation.titre}
            realisation={realisation}
            onOpenDocument={setDocumentActif}
          />
        ))}
      </TabPanel>

      <DocumentDialog document={documentActif} onClose={() => setDocumentActif(null)} />
      {!documentActif && typeof document !== 'undefined' && createPortal(
        <div className="pointer-events-none fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex justify-center sm:inset-x-auto sm:right-6 lg:right-10">
          <button
            type="button"
            onClick={naviguerDansE5}
            aria-controls={retourAuTableau ? 'tableau-synthese' : 'realisations-e5'}
            className={cx(
              btn('primary', 'lg'),
              'pointer-events-auto min-h-12 w-full max-w-80 cursor-pointer gap-3 shadow-[0_8px_30px_rgba(6,27,49,0.22)] sm:w-auto',
            )}
          >
            {retourAuTableau ? <ArrowUp aria-hidden size={20} /> : <ArrowDown aria-hidden size={20} />}
            <span>{retourAuTableau ? 'Revenir au tableau' : 'Voir les projets'}</span>
          </button>
        </div>,
        document.body,
      )}
    </div>
  );
}
