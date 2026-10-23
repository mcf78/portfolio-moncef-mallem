import { useRef, useState, type ComponentPropsWithoutRef, type KeyboardEvent, type ReactNode } from 'react';

// Shared building blocks for every page; colours come from the tokens in styles/portfolio.css.

export const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ');

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-[8px] font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] active:translate-y-px';

const btnSizes = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-9 px-3.5 text-[13.5px]',
  lg: 'h-10 px-4 text-[14px]',
};

const btnVariants = {
  primary: 'bg-brand text-on-brand shadow-[0_1px_2px_rgba(6,27,49,0.14)] hover:bg-brand-hover',
  secondary: 'border border-line-strong bg-surface text-ink hover:border-brand-line hover:bg-surface-2',
  soft: 'bg-brand-soft text-brand-ink hover:bg-brand-line/60',
  ghost: 'text-ink-2 hover:bg-hover hover:text-ink',
};

/** Button classes; size and variant are separate so call sites never stack conflicting utilities. */
export const btn = (variant: keyof typeof btnVariants = 'primary', size: keyof typeof btnSizes = 'md') =>
  cx(btnBase, btnSizes[size], btnVariants[variant]);

export function PageHeader({ title, description, actions }: { title: ReactNode; description?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <h1 className="text-[28px] leading-[1.125] font-semibold tracking-[-0.022em] text-ink sm:text-[30px]">{title}</h1>
        {description && <div className="mt-1.5 max-w-[78ch] text-[15px] leading-[1.6] text-ink-3">{description}</div>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

type CardProps = ComponentPropsWithoutRef<'section'> & { dense?: boolean };

export function Card({ className, children, dense, ...rest }: CardProps) {
  return (
    <section className={cx('rounded-[12px] border border-line bg-surface', dense ? 'p-4' : 'p-4 sm:p-5', className)} {...rest}>
      {children}
    </section>
  );
}

export function CardTitle({ icon, children, aside, className }: { icon?: ReactNode; children: ReactNode; aside?: ReactNode; className?: string }) {
  return (
    <div className={cx('mb-2.5 flex items-center justify-between gap-3', className)}>
      <h2 className="flex items-center gap-2 text-[15px] leading-snug font-semibold tracking-[-0.006em] text-ink">
        {icon && <span aria-hidden className="shrink-0 text-ink-3">{icon}</span>}
        {children}
      </h2>
      {aside}
    </div>
  );
}

/** Small uppercase label used above lists inside a card. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cx('mb-2 text-[11.5px] font-semibold tracking-[0.06em] text-ink-3 uppercase', className)}>{children}</h3>;
}

const initials = (nom: string) =>
  nom
    .replace(/\(.*?\)/g, '')
    .split(/[\s/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

/**
 * Technology chip: logo + name. The monogram sits under the logo until it loads, so a slow CDN, a
 * dead logo URL or a tool without any official logo (empty `logo`) shows initials instead.
 */
export function TechChip({ nom, logo, compact }: { nom: string; logo: string; compact?: boolean }) {
  const [state, setState] = useState<'loading' | 'loaded' | 'failed'>(logo ? 'loading' : 'failed');
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-[6px] border border-line bg-surface-2 pr-2 pl-1.5 leading-none text-ink-2',
        compact ? 'h-6 text-[12px]' : 'h-7 text-[12.5px]',
      )}
    >
      <span aria-hidden className="relative grid size-4 shrink-0 place-items-center overflow-hidden rounded-[4px]">
        {state !== 'loaded' && (
          <span className="absolute inset-0 grid place-items-center bg-surface-3 text-[7.5px] font-semibold text-ink-3 uppercase">{initials(nom)}</span>
        )}
        {state !== 'failed' && (
          <img
            src={logo}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={() => setState('loaded')}
            onError={() => setState('failed')}
            className={cx('relative size-full object-contain transition-opacity duration-200 dark:rounded-[3px] dark:bg-[#f7f8f8] dark:p-px', state === 'loaded' ? 'opacity-100' : 'opacity-0')}
          />
        )}
      </span>
      {nom}
    </span>
  );
}

export type Tone = 'brand' | 'orange' | 'green' | 'red';

export function Dot({ tone }: { tone: Tone }) {
  return <span aria-hidden className="inline-block size-1.5 shrink-0 rounded-full" style={{ background: `var(--pf-dot-${tone})` }} />;
}

type TabItem<T extends string> = { id: T; label: ReactNode; tone?: Tone; count?: number };

/** Segmented tabs (WAI-ARIA tabs pattern, arrow keys move between tabs). */
export function Tabs<T extends string>({ items, value, onChange, label }: { items: TabItem<T>[]; value: T; onChange: (id: T) => void; label: string }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    onChange(items[next].id);
    refs.current[next]?.focus();
  };
  return (
    <div role="tablist" aria-label={label} className="flex max-w-full flex-wrap gap-1 rounded-[10px] border border-line bg-surface-2 p-1 sm:inline-flex sm:flex-nowrap">
      {items.map((item, i) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={active}
            aria-controls={`panel-${item.id}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cx(
              'inline-flex h-8 shrink-0 items-center gap-2 rounded-[7px] px-3 text-[13px] font-medium transition-[background-color,color,box-shadow] duration-150',
              active ? 'bg-surface text-ink shadow-tab' : 'text-ink-3 hover:text-ink',
            )}
          >
            {item.tone && <Dot tone={item.tone} />}
            {item.label}
            {item.count !== undefined && (
              <span className={cx('rounded-full px-1.5 text-[11px] tabular-nums', active ? 'bg-brand-soft text-brand-ink' : 'bg-surface-3 text-ink-3')}>{item.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <div role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`} className={cx('pf-enter', className)}>
      {children}
    </div>
  );
}
