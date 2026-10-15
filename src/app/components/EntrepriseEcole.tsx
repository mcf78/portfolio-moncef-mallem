import { Briefcase, MapPin } from 'lucide-react';
import { Card, PageHeader } from './kit';
import logoSana from '../../../assets/97abc63f856b5a3f64003cab0d4db7672afb9be6.png';
import logoYnov from '../../../assets/10b51bc5a1b5bef5f158c7a39339d76d9b3e1048.png';

// Logos sur tuile blanche pour rester lisibles en mode sombre.
function Logo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="grid size-20 shrink-0 place-items-center rounded-[12px] border border-line bg-white p-2">
      <img src={src} alt={alt} className="size-full object-contain" />
    </div>
  );
}

const etiquette = 'text-[11.5px] font-semibold tracking-[0.06em] text-ink-3 uppercase';

export function EntrepriseEcole() {
  return (
    <div>
      <PageHeader title="Entreprise & École" description="Mon parcours de formation et mes perspectives d'avenir" />

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Mon entreprise */}
        <Card className="sm:p-6">
          <div className="mb-4 flex items-center gap-4">
            <Logo src={logoSana} alt="Logo Librairie Sana" />
            <p className={etiquette}>Entreprise</p>
          </div>
          <p className="text-[15px] leading-[1.65] text-ink-2">
            Librairie Sana est une entreprise (SARL) spécialisée dans la vente de livres religieux et de produits culturels. Elle dispose d'un site e-commerce PrestaShop en production, d'un dépôt logistique, d'un service après-vente (SAV), ainsi que de pôles internes de création graphique dédiés à la production de visuels marketing et de contenus digitaux. L'entreprise développe également des solutions logicielles internes, incluant des outils sur tablette et des projets d'optimisation des flux logistiques assistés par l'IA.
          </p>
          <div className="mt-4 flex gap-3 rounded-[10px] border border-brand-line bg-brand-soft p-4">
            <Briefcase size={18} className="mt-0.5 shrink-0 text-brand-ink" />
            <p className="text-[14.5px] leading-[1.6] text-ink-2">
              Je suis embauché en tant que Développeur d'Application Mobile – Architecture Client-Serveur PrestaShop, en charge du développement de l'application mobile en cours, de l'intégration des API REST et de la création d'outils métiers connectés au système e-commerce.
            </p>
          </div>
        </Card>

        {/* Mon école (textes repris du parcours et de la présentation du BTS SIO) */}
        <Card className="sm:p-6">
          <div className="mb-4 flex items-center gap-4">
            <Logo src={logoYnov} alt="Logo Paris Ynov Campus" />
            <p className={etiquette}>École</p>
          </div>
          <p className="text-[12px] font-semibold text-brand-ink tabular-nums">2025 – 2027</p>
          <h2 className="mt-0.5 text-[17px] leading-snug font-semibold tracking-[-0.006em] text-ink">BTS Services Informatiques aux Organisations (SIO)</h2>
          <p className="mt-1 text-[14px] text-ink-3">Option Solutions Logicielles et Applications Métiers (SLAM)</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[14px] text-ink-3">
            <MapPin size={14} className="shrink-0" />
            Paris Ynov Campus – Nanterre (France)
          </p>
          <p className="mt-4 border-t border-line pt-4 text-[14.5px] leading-[1.65] text-ink-2">
            Le BTS SIO (Services Informatiques aux Organisations) est un diplôme national de l'enseignement supérieur français. Il forme des informaticiens qui seront capables de gérer des parcs informatiques, d'administrer des réseaux, de développer des applications, de concevoir des bases de données, de sécuriser des systèmes d'information, de mettre en place des solutions de virtualisation et de cloud computing.
          </p>
        </Card>
      </div>
    </div>
  );
}
