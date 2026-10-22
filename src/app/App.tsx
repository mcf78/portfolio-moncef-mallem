import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { Accueil } from './components/Accueil';
import { APropos } from './components/APropos';
import { BtsSio } from './components/BtsSio';
import { EntrepriseEcole } from './components/EntrepriseEcole';
import { Projets } from './components/Projets';
import { Missions } from './components/Missions';
import { Certifications } from './components/Certifications';
import { VeilleTechnologique } from './components/VeilleTechnologique';
import { Contact } from './components/Contact';
import { cx } from './components/kit';
import {
  Menu,
  X,
  Github,
  Linkedin,
  Home,
  User,
  Building2,
  ClipboardCheck,
  FolderKanban,
  BadgeCheck,
  Radar,
  Mail,
  Sun,
  Moon,
  type LucideIcon,
} from 'lucide-react';

type Theme = 'light' | 'dark';

const THEME_KEY = 'portfolio-theme';

function readStoredTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

const systemTheme = (): Theme => (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Année courante pour le copyright, pour ne plus avoir à la mettre à jour à la main.
const annee = new Date().getFullYear();

export default function App() {
  const [activeTab, setActiveTab] = useState('accueil');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme() ?? systemTheme());

  const selectTab = useCallback((tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      selectTab(event.detail);
    };

    window.addEventListener('changeTab', handleTabChange as EventListener);
    return () => {
      window.removeEventListener('changeTab', handleTabChange as EventListener);
    };
  }, [selectTab]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Follow the OS theme until the visitor picks one explicitly.
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!media) return;
    const onChange = () => {
      if (!readStoredTheme()) setTheme(systemTheme());
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private mode: the choice simply isn't remembered.
    }
    setTheme(next);
  };

  const tabs: { id: string; label: string; icon: LucideIcon }[] = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'apropos', label: 'À propos', icon: User },
    { id: 'entreprise', label: 'Entreprise', icon: Building2 },
    { id: 'missions', label: 'Épreuve E5', icon: ClipboardCheck },
    { id: 'projets', label: 'Projets E6', icon: FolderKanban },
    { id: 'certifications', label: 'Certifications', icon: BadgeCheck },
    { id: 'veille', label: 'Veille technologique', icon: Radar },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'accueil':
        return <Accueil />;
      case 'apropos':
        return <APropos />;
      case 'btssio':
        return <BtsSio />;
      case 'entreprise':
        return <EntrepriseEcole />;
      case 'projets':
        return <Projets />;
      case 'missions':
        return <Missions />;
      case 'certifications':
        return <Certifications />;
      case 'veille':
        return <VeilleTechnologique />;
      case 'contact':
        return <Contact />;
      default:
        return <Accueil />;
    }
  };

  const iconButton =
    'grid size-9 place-items-center rounded-[8px] text-ink-3 transition-colors duration-150 hover:bg-hover hover:text-ink';

  const socialButton =
    'inline-flex h-9 items-center gap-1.5 rounded-[8px] border border-line bg-surface px-3 text-[12.5px] font-medium text-ink transition-colors duration-150 hover:border-brand-line hover:bg-surface-2';

  const socialLinks = (
    <>
      <a
        href="https://github.com/mcf78"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub de Moncef MALLEM"
        className={socialButton}
      >
        <Github size={15} />
        <span>GitHub</span>
      </a>
      <a
        href="https://www.linkedin.com/in/moncef-mallem/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn de Moncef MALLEM"
        className={socialButton}
      >
        <Linkedin size={15} />
        <span>LinkedIn</span>
      </a>
    </>
  );

  const themeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
      title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
      className={iconButton}
    >
      {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );

  const brand = (
    <div className="flex min-w-0 items-center gap-2.5">
      <span aria-hidden className="pf-ring grid size-8 shrink-0 place-items-center rounded-[9px] p-[2px]">
        <span className="grid size-full place-items-center rounded-[7px] bg-surface text-[11px] font-semibold tracking-[-0.02em] text-ink">MM</span>
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[14px] font-semibold tracking-[-0.01em] text-ink">Portfolio BTS SIO</span>
        <span className="block truncate text-[12px] text-ink-3">Moncef MALLEM</span>
      </span>
    </div>
  );

  const navItems = (variant: 'rail' | 'sheet') =>
    tabs.map((tab) => {
      const active = activeTab === tab.id;
      const Icon = tab.icon;
      return (
        <button
          key={tab.id}
          type="button"
          data-tab={tab.id}
          onClick={() => selectTab(tab.id)}
          aria-current={active ? 'page' : undefined}
          className={cx(
            'group flex w-full items-center gap-2.5 rounded-[8px] px-3 text-left font-medium transition-[background-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
            variant === 'rail' ? 'h-10 text-[14px]' : 'h-11 text-[15px]',
            active ? 'bg-surface text-ink shadow-tab' : 'text-ink-2 hover:bg-hover hover:text-ink',
          )}
        >
          <Icon size={18} className={cx('shrink-0 transition-colors', active ? 'text-brand-ink' : 'text-ink-4 group-hover:text-ink-3')} />
          {tab.label}
        </button>
      );
    });

  return (
    <div className="min-h-dvh bg-canvas text-ink lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
      {/* Barre latérale (desktop) */}
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line bg-rail px-3 pt-4 pb-3 lg:flex">
        <div className="px-1.5">{brand}</div>
        <nav aria-label="Navigation principale" className="mt-6 flex flex-col gap-1">
          {navItems('rail')}
        </nav>
        <div className="mt-auto border-t border-line px-1.5 pt-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {socialLinks}
            <span className="ml-auto">{themeButton}</span>
          </div>
          <p className="mt-2.5 text-[11.5px] leading-snug text-ink-3">© {annee} Portfolio BTS SIO - Tous droits réservés</p>
        </div>
      </aside>

      {/* Barre supérieure (mobile / tablette) */}
      <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-xl lg:hidden">
        <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
          {brand}
          <div className="flex items-center gap-0.5">
            {themeButton}
            <button
              type="button"
              data-menu-toggle
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className={iconButton}
            >
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav aria-label="Navigation principale" className="pf-enter border-t border-line px-3 pt-2 pb-3 sm:px-5">
            <div className="flex flex-col gap-1">{navItems('sheet')}</div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-line px-1 pt-2">{socialLinks}</div>
          </nav>
        )}
      </header>

      <main className="min-w-0 overflow-x-clip px-4 py-6 sm:px-6 lg:px-10 lg:pt-5 lg:pb-3">
        <div key={activeTab} className="pf-enter mx-auto w-full max-w-[1120px] 2xl:max-w-[1240px]">
          {renderContent()}
        </div>
        <footer className="mx-auto mt-10 max-w-[1120px] border-t border-line pt-5 lg:hidden">
          <div className="flex items-center justify-center gap-1.5">{socialLinks}</div>
          <p className="mt-3 text-center text-[12px] text-ink-3">© {annee} Portfolio BTS SIO - Tous droits réservés</p>
        </footer>
      </main>
    </div>
  );
}
