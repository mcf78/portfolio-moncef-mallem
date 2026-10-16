import {
  Download,
  MessageCircle,
  FileText,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  FolderKanban,
  Layers,
  Radar,
  type LucideIcon,
} from 'lucide-react';
import { cx } from './kit';
import { rubriques } from './Missions';
import { projets } from './Projets';
import { technologiesParCategorie } from './APropos';
import { sujets } from '../data/veille';
import cvPdf from '../../../assets/cv-moncef-mallem.pdf';

// Chiffres calculés à partir du contenu des pages : ils restent justes si le contenu change.
const nbRealisations = rubriques.reduce((total, r) => total + r.realisations.length, 0);
const nbTechnologies = new Set(Object.values(technologiesParCategorie).flat().map((t) => t.nom)).size;
const veilleDepuis = Math.min(...sujets.map((s) => s.depuis));

export function Accueil() {
  const ouvrir = (onglet: string) => window.dispatchEvent(new CustomEvent('changeTab', { detail: onglet }));

  const handleContactClick = () => {
    // Scroll to contact section or trigger tab change
    window.dispatchEvent(new CustomEvent('changeTab', { detail: 'contact' }));
  };

  const handleDownloadCV = () => {
    // Download the CV (PDF generated from the original CV image)
    const link = document.createElement('a');
    link.href = cvPdf;
    link.download = 'CV_Moncef_MALLEM.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTableau = () => {
    window.open('https://drive.google.com/file/d/1YFMRH7RI_2jN9y4shdEoahllQHknzz6O/view?usp=sharing', '_blank');
  };

  const actions: { onClick: () => void; icon: LucideIcon; trail: LucideIcon; title: string; text: string; featured?: boolean }[] = [
    { onClick: handleDownloadCV, icon: Download, trail: ArrowRight, title: 'Télécharger mon CV', text: 'Consultez mon parcours complet au format PDF', featured: true },
    { onClick: handleDownloadTableau, icon: FileText, trail: ArrowUpRight, title: 'Tableau de Synthèse', text: 'Téléchargez mon tableau de synthèse PDF' },
    { onClick: handleContactClick, icon: MessageCircle, trail: ArrowRight, title: 'Me Contacter', text: 'Envoyez-moi un message directement' },
  ];

  const raccourcis: { onglet: string; icon: LucideIcon; titre: string; detail: string }[] = [
    { onglet: 'missions', icon: ClipboardCheck, titre: 'Épreuve E5', detail: `${nbRealisations} réalisations` },
    { onglet: 'projets', icon: FolderKanban, titre: 'Projets (E6)', detail: `${projets.length} projets` },
    { onglet: 'apropos', icon: Layers, titre: 'Compétences', detail: `${nbTechnologies} technologies` },
    { onglet: 'veille', icon: Radar, titre: 'Veille technologique', detail: `${sujets.length} sujets depuis ${veilleDepuis}` },
  ];

  return (
    <div className="relative isolate lg:flex lg:min-h-[calc(100dvh-2rem)] lg:flex-col lg:justify-center">
      <div aria-hidden className="pf-aurora pointer-events-none absolute -top-10 right-0 -z-10 h-[380px] w-full sm:h-[520px] sm:w-[85%]" />

      <section className="py-6 sm:py-10">
        <div aria-hidden className="pf-ring mb-6 inline-grid size-[72px] place-items-center rounded-[20px] p-[2.5px]">
          <div className="grid size-full place-items-center rounded-[18px] bg-surface text-[22px] font-semibold tracking-[-0.03em] text-ink">MM</div>
        </div>

        <h1 className="text-[40px] leading-none font-semibold tracking-[-0.03em] text-ink sm:text-[56px]">Moncef MALLEM</h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
          <span className="inline-flex items-center gap-1.5 text-[15px] text-ink-3">
            <MapPin size={16} className="text-ink-4" />
            Houilles, France
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-soft px-3 py-1 text-[13.5px] font-medium text-brand-ink">
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            Développeur Application Mobile - PrestaShop
          </span>
        </div>
      </section>

      <section aria-label="Actions" className="grid gap-3 md:grid-cols-3">
        {actions.map(({ onClick, icon: Icon, trail: Trail, title, text, featured }) => (
          <button
            key={title}
            type="button"
            onClick={onClick}
            className={cx(
              'group flex items-start gap-3 rounded-[12px] border p-4 text-left transition-[background-color,border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-0.5',
              featured
                ? 'border-transparent bg-brand text-on-brand shadow-pop hover:bg-brand-hover'
                : 'border-line bg-surface hover:border-brand-line hover:shadow-card',
            )}
          >
            <span
              className={cx(
                'grid size-9 shrink-0 place-items-center rounded-[9px]',
                featured ? 'bg-white/15 text-white' : 'bg-brand-soft text-brand-ink',
              )}
            >
              <Icon size={18} />
            </span>
            <span className="min-w-0 flex-1">
              <span className={cx('block text-[15px] font-semibold tracking-[-0.006em]', featured ? 'text-white' : 'text-ink')}>{title}</span>
              <span className={cx('mt-0.5 block text-[13px] leading-snug', featured ? 'text-white/90' : 'text-ink-3')}>{text}</span>
            </span>
            <Trail
              size={16}
              className={cx(
                'mt-0.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5',
                featured ? 'text-white/80' : 'text-ink-4 group-hover:text-brand-ink',
              )}
            />
          </button>
        ))}
      </section>

      {/* Accès direct aux parties que le jury consulte en premier */}
      <nav aria-label="Accès rapide" className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {raccourcis.map(({ onglet, icon: Icon, titre, detail }) => (
          <button
            key={onglet}
            type="button"
            onClick={() => ouvrir(onglet)}
            className="group flex items-center gap-3 rounded-[12px] border border-line bg-surface/80 p-3 text-left backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-200 hover:border-brand-line hover:bg-surface hover:shadow-card"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-[8px] border border-line bg-surface-2 text-ink-3 transition-colors group-hover:text-brand-ink">
              <Icon size={16} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] leading-snug font-semibold text-ink">{titre}</span>
              <span className="block text-[12.5px] leading-snug text-ink-3 tabular-nums">{detail}</span>
            </span>
            <ArrowRight size={15} className="hidden shrink-0 text-ink-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-ink sm:block" />
          </button>
        ))}
      </nav>
    </div>
  );
}
