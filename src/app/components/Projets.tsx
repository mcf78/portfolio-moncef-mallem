import { Github, FileText, Download } from 'lucide-react';
import { btn, Eyebrow, PageHeader, TechChip } from './kit';

export const projets = [
    {
      titre: 'Projet E6 - Application mobile ecommerce',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
      description: 'Application mobile cross-platform pour la gestion d\'une boutique en ligne avec panier, paiement et suivi des commandes.',
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
      tableauSyntheseUrl: null,
      documentationUrl: null
    },
    {
      titre: 'Projet E6 - Site web StadiumCompany',
      image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=500&fit=crop',
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
      tableauSyntheseUrl: 'https://drive.google.com/file/d/1C_v2esw7DCRbywN0r6Se69FQms6dnhN8/view?usp=sharing',
      documentationUrl: 'https://drive.google.com/file/d/1z5gYyA7jVAhe5jJsL2_dcRa5mKM906dT/view?usp=sharing'
    },
  ];

export function Projets() {
  return (
    <div>
      <PageHeader
        title="Mes projets en formation"
        description="Mes deux projets de spécialité présentés dans le cadre de l'épreuve E6"
      />

      {/* Grille de projets */}
      <div className="grid gap-4 lg:grid-cols-2">
        {projets.map((projet, index) => (
          <article
            key={index}
            className="flex flex-col rounded-[12px] border border-line bg-surface p-5 transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-card sm:p-6"
          >
            {/* Titre */}
            <h2 className="text-[19px] leading-snug font-semibold tracking-[-0.012em] text-ink">{projet.titre}</h2>

            {/* Description */}
            <p className="mt-2 text-[14.5px] leading-[1.6] text-ink-2">{projet.description}</p>

            {/* Technologies */}
            <div className="mt-5">
              <Eyebrow>Technologies utilisées</Eyebrow>
              <div className="flex flex-wrap gap-1.5">
                {projet.technologies.map((tech, idx) => (
                  <TechChip key={idx} nom={tech.nom} logo={tech.logo} />
                ))}
              </div>
            </div>

            {/* Boutons */}
            <div className="mt-auto flex flex-wrap gap-2 pt-6 [&>*]:flex-[1_1_auto]">
              <a href={projet.githubUrl} target="_blank" rel="noopener noreferrer" className={btn('secondary')}>
                <Github size={16} />
                <span>GitHub</span>
              </a>
              {/* Ces boutons n'apparaissent que si le lien est renseigné dans les données ci-dessus. */}
              {projet.tableauSyntheseUrl && (
                <a href={projet.tableauSyntheseUrl} target="_blank" rel="noopener noreferrer" className={btn('primary')}>
                  <Download size={16} />
                  <span>Tableau de synthèse</span>
                </a>
              )}
              {projet.documentationUrl && (
                <a href={projet.documentationUrl} target="_blank" rel="noopener noreferrer" className={btn('soft')}>
                  <FileText size={16} />
                  <span>Documentation</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
