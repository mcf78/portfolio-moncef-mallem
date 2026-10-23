import {
  Download,
  MessageCircle,
  MapPin,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { cx } from './kit';
import cvPdf from '../../../assets/cv-moncef-mallem.pdf';

export function Accueil() {
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

  const actions: { onClick: () => void; icon: LucideIcon; trail: LucideIcon; title: string; text: string; featured?: boolean }[] = [
    { onClick: handleDownloadCV, icon: Download, trail: ArrowRight, title: 'Télécharger mon CV', text: 'Consultez mon parcours complet au format PDF', featured: true },
    { onClick: handleContactClick, icon: MessageCircle, trail: ArrowRight, title: 'Me Contacter', text: 'Envoyez-moi un message directement' },
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
            <span aria-hidden className="size-1.5 rounded-full bg-success" />
            Développeur Application Mobile - PrestaShop
          </span>
        </div>
      </section>

      <section aria-label="Actions" className="grid gap-3 md:grid-cols-2">
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
            <span className={cx('mt-0.5 shrink-0', featured ? 'text-white' : 'text-brand')}>
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

    </div>
  );
}
