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
  Target,
  Sparkles,
  GraduationCap,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardTitle, Eyebrow, PageHeader, TechChip } from './kit';

export function APropos() {
  // Technologies organisées par catégorie avec logos
  const technologiesParCategorie = {
    'Langages de programmation & scripts': [
      { nom: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { nom: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { nom: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { nom: 'Dart', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
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
      { nom: 'Basthon', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
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

  // Ordre d'affichage : équilibre les deux colonnes du bloc (les données ci-dessus restent inchangées).
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
      <PageHeader title="À Propos" description="Découvrez mes compétences et mon domaine d'expertise" />

      <div className="grid gap-4 lg:grid-cols-12 lg:gap-3">
        {/* Ce que je fais */}
        <Card dense className="lg:col-span-6">
          <CardTitle icon={<Sparkles size={14} />}>Qu'est-ce que je fais ?</CardTitle>
          <p className="text-[14px] leading-[1.6] text-ink-2">
            Je suis un étudiant en informatique orienté vers les solutions logicielles et le développement d'applications. J'ai choisi cette voie pour son aspect concret et sa capacité à répondre à des besoins réels. Au fil de mes projets, j'ai travaillé avec plusieurs technologies telles que HTML, CSS, JavaScript, Python, SQL, Bash (Linux) et Dart, aussi bien dans le développement web que dans des applications plus techniques. J'ai également mené des projets mêlant programmation, automatisation et robotique, ce qui m'a permis de développer une approche rigoureuse et méthodique. Aujourd'hui, je souhaite continuer à me spécialiser dans le développement logiciel et participer à des projets à forte valeur technique.
          </p>
        </Card>

        {/* Mon parcours et expérience */}
        <Card dense className="lg:col-span-6">
          <CardTitle icon={<GraduationCap size={14} />}>Mon parcours et expérience</CardTitle>
          <ol className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
            {parcours.map((etape) => (
              <li key={etape.titre} className="relative border-l-2 border-brand-line pl-3">
                <span aria-hidden className="absolute top-[3px] -left-[5px] size-2 rounded-full bg-brand ring-2 ring-surface" />
                <p className="text-[11.5px] leading-4 font-semibold tracking-[0.01em] text-brand-ink tabular-nums">{etape.periode}</p>
                <h3 className="mt-0.5 text-[13.5px] leading-snug font-semibold text-ink">{etape.titre}</h3>
                <p className="mt-0.5 text-[12.5px] leading-snug text-ink-3">{etape.details.join(' · ')}</p>
              </li>
            ))}
          </ol>
        </Card>

        {/* Ce que je maîtrise */}
        <Card dense className="lg:col-span-8">
          <CardTitle icon={<Layers size={14} />}>Qu'est-ce que je maîtrise ?</CardTitle>
          <div className="gap-x-5 sm:columns-2">
            {categories.map(([categorie, technologies]) => {
              const Icone = iconeParCategorie[categorie] ?? Code2;
              return (
                <div key={categorie} className="mb-2.5 break-inside-avoid">
                  <h3 className="mb-1 flex items-center gap-2 text-[13px] leading-tight font-semibold text-ink">
                    <span aria-hidden className="grid size-[22px] shrink-0 place-items-center rounded-[6px] border border-brand-line bg-brand-soft text-brand-ink">
                      <Icone size={13} strokeWidth={2.2} />
                    </span>
                    {categorie}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {technologies.map((tech) => (
                      <TechChip key={tech.nom} nom={tech.nom} logo={tech.logo} compact />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Mon futur */}
        <Card dense className="lg:col-span-4">
          <CardTitle icon={<Rocket size={14} />}>Mon Futur</CardTitle>
          <Eyebrow>Objectifs Professionnels</Eyebrow>
          <p className="text-[13.5px] leading-[1.55] text-ink-2">
            Après l'obtention de mon BTS SIO, je souhaite poursuivre mon développement professionnel en
            me spécialisant davantage dans les technologies qui me passionnent.
          </p>
          <div className="mt-3 space-y-3">
            {objectifs.map((groupe) => (
              <div key={groupe.titre}>
                <h4 className="mb-1 flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                  <Target className="text-brand-ink" size={14} />
                  {groupe.titre}
                </h4>
                <ul className="space-y-0.5">
                  {groupe.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] leading-[1.5] text-ink-2">
                      <span className="text-brand-ink">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
