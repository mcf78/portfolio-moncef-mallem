import {
  Code2,
  Database,
  Globe,
  Server,
  Smartphone,
  Wrench,
  GitBranch,
  ShoppingCart,
  Cpu,
  FileText,
  Rocket,
  Compass,
  GraduationCap,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardTitle, PageHeader, TechChip } from './kit';

// Technologies organisées par catégorie avec logos
export const technologiesParCategorie = {
    'Langages de programmation & scripts': [
      { nom: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { nom: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { nom: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { nom: 'C++ (Arduino)', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { nom: 'Bash', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
    ],
    'Développement web': [
      { nom: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { nom: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { nom: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { nom: 'Symfony', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg' },
    ],
    'Développement mobile & applicatif': [
      { nom: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { nom: 'Dart', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
    ],
    'Outils de développement & IDE': [
      { nom: 'Visual Studio Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { nom: 'Android Studio', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg' },
      { nom: 'IntelliJ IDEA', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
      { nom: 'PyCharm', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg' },
      { nom: 'Basthon', logo: '' },
      { nom: 'Arduino IDE', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg' },
    ],
    'Systèmes, serveurs & virtualisation': [
      { nom: 'Linux (Debian)', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg' },
      { nom: 'Windows', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg' },
      { nom: 'Windows Server', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg' },
      { nom: 'VirtualBox', logo: 'https://cdn.simpleicons.org/virtualbox' },
      { nom: 'PuTTY', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/putty/putty-original.svg' },
    ],
    'Bases de données & administration': [
      { nom: 'phpMyAdmin', logo: 'https://cdn.simpleicons.org/phpmyadmin' },
      { nom: 'Oracle Live SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' },
    ],
    'Gestion de versions & collaboration': [
      { nom: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { nom: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { nom: 'Trello', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg' },
    ],
    'E-commerce & CMS': [
      { nom: 'PrestaShop', logo: 'https://cdn.simpleicons.org/prestashop' },
      { nom: 'Shopify', logo: 'https://cdn.simpleicons.org/shopify' },
    ],
    'Conception, modélisation & robotique': [
      { nom: 'SolidWorks', logo: 'https://cdn.simpleicons.org/dassaultsystemes' },
      { nom: 'Tinkercad', logo: 'https://cdn.simpleicons.org/tinkercad' },
      { nom: 'Arduino', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg' },
    ],
    'Bureautique': [
      { nom: 'Microsoft Word', logo: 'https://img.icons8.com/color/512/ms-word.png' },
      { nom: 'Microsoft Excel', logo: 'https://img.icons8.com/color/512/ms-excel.png' },
      { nom: 'Microsoft PowerPoint', logo: 'https://img.icons8.com/color/512/ms-powerpoint.png' },
    ],
  };

export function APropos() {
  // Une icône par catégorie pour que chaque groupe se repère d'un coup d'œil.
  const iconeParCategorie: Record<string, LucideIcon> = {
    'Langages de programmation & scripts': Code2,
    'Développement web': Globe,
    'Développement mobile & applicatif': Smartphone,
    'Outils de développement & IDE': Wrench,
    'Systèmes, serveurs & virtualisation': Server,
    'Bases de données & administration': Database,
    'Gestion de versions & collaboration': GitBranch,
    'E-commerce & CMS': ShoppingCart,
    'Conception, modélisation & robotique': Cpu,
    'Bureautique': FileText,
  };

  // Ordre d'affichage : les domaines proches restent côte à côte dans la grille.
  const ordreAffichage = [
    'Langages de programmation & scripts',
    'Développement web',
    'Développement mobile & applicatif',
    'Outils de développement & IDE',
    'Bases de données & administration',
    'Systèmes, serveurs & virtualisation',
    'Gestion de versions & collaboration',
    'E-commerce & CMS',
    'Conception, modélisation & robotique',
    'Bureautique',
  ];
  const categories = Object.entries(technologiesParCategorie).sort(
    ([a], [b]) => ordreAffichage.indexOf(a) - ordreAffichage.indexOf(b),
  );

  const parcours = [
    {
      periode: '2025 – 2027',
      titre: 'BTS Services Informatiques aux Organisations (SIO)',
      details: ['Option Solutions Logicielles et Applications Métiers (SLAM)', 'Paris Ynov Campus – Nanterre (France)'],
    },
    {
      periode: '2025 – 2027',
      titre: "Développeur d'application mobile",
      details: ["Développement d'applications mobiles et logique métier", 'Paris (France)'],
    },
    {
      periode: '2025',
      titre: 'CDD – 3 mois',
      details: ['Mission technique en environnement informatique', 'Le Blanc-Mesnil (France)'],
    },
    {
      periode: '2023 – 2024',
      titre: "Baccalauréat technologique Sciences et Technologies de l'Industrie et du Développement Durable",
      details: ["Spécialité Systèmes d'Information et Numérique", 'Lycée Les Pierres Vives – Carrières-sur-Seine (France)'],
    },
  ];

  const objectifs = [
    {
      titre: 'À court terme',
      items: [
        'Obtenir le BTS SIO avec mention',
        'Approfondir mes compétences en développement',
        'Mener à bien mes projets E5 et E6',
        'Obtenir des certifications techniques',
      ],
    },
    {
      titre: 'À moyen/long terme',
      items: [
        'Poursuivre en Bachelor/Licence Pro',
        'Me spécialiser en Machine Learning',
        'Devenir développeur full-stack senior',
        'Contribuer à des projets innovants',
      ],
    },
  ];

  return (
    <div>
      <PageHeader title="À Propos" description="Mon profil, mon parcours et les compétences que je mets en pratique." />

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Ce que je fais */}
        <Card dense className="lg:col-span-5">
          <CardTitle icon={<Compass size={14} />}>Qu'est-ce que je fais ?</CardTitle>
          <p className="text-[13.5px] leading-[1.6] text-ink-2">
            Étudiant en BTS SIO option SLAM, je développe des applications web et mobiles et je gère les serveurs et
            bases de données qui les accompagnent.
          </p>
          <dl className="mt-3 grid grid-cols-[76px_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-[13px] leading-[1.5]">
            <dt className="font-semibold text-brand-ink">Web</dt>
            <dd className="text-ink-2">Interfaces et back-end en HTML, CSS, JavaScript, PHP et Symfony.</dd>
            <dt className="font-semibold text-brand-ink">Mobile</dt>
            <dd className="text-ink-2">Applications Flutter/Dart connectées à des API REST et à PrestaShop.</dd>
            <dt className="font-semibold text-brand-ink">Systèmes</dt>
            <dd className="text-ink-2">Linux Debian, Apache, MySQL/MariaDB, scripts Bash et bases SQL.</dd>
          </dl>
        </Card>

        {/* Mon parcours et expérience */}
        <Card dense className="lg:col-span-7">
          <CardTitle icon={<GraduationCap size={14} />}>Mon parcours et expérience</CardTitle>
          <ol className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
            {parcours.map((etape) => (
              <li key={etape.titre} className="relative border-l border-line-strong pl-3">
                <span aria-hidden className="absolute top-[5px] -left-[4px] size-[7px] rounded-full bg-brand ring-2 ring-surface" />
                <p className="text-[11.5px] leading-4 font-semibold tracking-[0.01em] text-ink-3 tabular-nums">{etape.periode}</p>
                <h3 className="mt-0.5 text-[13.5px] leading-snug font-semibold text-ink">{etape.titre}</h3>
                <p className="mt-0.5 text-[12.5px] leading-snug text-ink-3">{etape.details.join(' · ')}</p>
              </li>
            ))}
          </ol>
        </Card>

        {/* Mon futur */}
        <Card dense className="lg:col-span-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
            <div className="min-w-0 lg:w-[34%] lg:shrink-0">
              <CardTitle icon={<Rocket size={14} />}>Mon futur</CardTitle>
              <p className="text-[13.5px] leading-[1.55] text-ink-2">
                Après l'obtention de mon BTS SIO, je souhaite poursuivre mon développement professionnel en me
                spécialisant davantage dans les technologies qui me passionnent.
              </p>
            </div>
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              {objectifs.map((groupe) => (
                <div key={groupe.titre} className="rounded-[10px] border border-line bg-surface-2 p-3">
                  <h4 className="mb-2 text-[13px] font-semibold text-ink">{groupe.titre}</h4>
                  <ul className="space-y-1">
                    {groupe.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] leading-[1.5] text-ink-2">
                        <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-brand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Ce que je maîtrise */}
        <Card dense className="lg:col-span-12">
          <CardTitle icon={<Layers size={14} />} aside={<span className="text-[12px] text-ink-3">{categories.length} domaines</span>}>
            Qu'est-ce que je maîtrise ?
          </CardTitle>
          <div className="gap-x-2.5 sm:columns-2 xl:columns-3">
            {categories.map(([categorie, technologies]) => {
              const Icone = iconeParCategorie[categorie] ?? Code2;
              return (
                <div key={categorie} className="mb-2.5 break-inside-avoid rounded-[10px] border border-line bg-surface-2 p-3">
                  <h3 className="mb-2 flex items-center gap-2 text-[13px] leading-tight font-semibold text-ink">
                    <Icone aria-hidden size={14} strokeWidth={2} className="shrink-0 text-ink-3" />
                    <span className="min-w-0">{categorie}</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {technologies.map((tech) => (
                      <TechChip key={tech.nom} nom={tech.nom} logo={tech.logo} compact />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
