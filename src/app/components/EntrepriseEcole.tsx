import { Briefcase } from 'lucide-react';
import { Card, PageHeader } from './kit';
import logoSana from '../../../assets/97abc63f856b5a3f64003cab0d4db7672afb9be6.png';

export function EntrepriseEcole() {
  return (
    <div>
      <PageHeader title="Entreprise & École" description="Mon parcours de formation et mes perspectives d'avenir" />

      {/* Mon entreprise */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Card className="sm:p-6">
          {/* Logo de l'entreprise (tuile blanche pour rester lisible en mode sombre) */}
          <div className="mb-4 grid size-20 place-items-center rounded-[12px] border border-line bg-white p-2">
            <img src={logoSana} alt="Logo Librairie Sana" className="size-full object-contain" />
          </div>
          <p className="text-[15px] leading-[1.65] text-ink-2">
            Librairie Sana est une entreprise (SARL) spécialisée dans la vente de livres religieux et de produits culturels. Elle dispose d'un site e-commerce PrestaShop en production, d'un dépôt logistique, d'un service après-vente (SAV), ainsi que de pôles internes de création graphique dédiés à la production de visuels marketing et de contenus digitaux. L'entreprise développe également des solutions logicielles internes, incluant des outils sur tablette et des projets d'optimisation des flux logistiques assistés par l'IA.
          </p>
        </Card>

        <Card className="sm:p-6">
          <div className="mb-4 grid size-20 place-items-center rounded-[12px] border border-brand-line bg-brand-soft text-brand-ink">
            <Briefcase size={30} strokeWidth={1.6} />
          </div>
          <p className="text-[15px] leading-[1.65] text-ink-2">
            Je suis embauché en tant que Développeur d'Application Mobile – Architecture Client-Serveur PrestaShop, en charge du développement de l'application mobile en cours, de l'intégration des API REST et de la création d'outils métiers connectés au système e-commerce.
          </p>
        </Card>
      </div>
    </div>
  );
}
