import type { ReactNode } from 'react';
import { Briefcase, Building2, Mail, MapPin, Phone, Store } from 'lucide-react';
import { Card, CardTitle, cx, PageHeader } from './kit';
import logoSana from '../../../assets/97abc63f856b5a3f64003cab0d4db7672afb9be6.png';

function Info({ label, value, muted }: { label: string; value: ReactNode; muted?: boolean }) {
  return (
    <div className="grid gap-0.5 py-2 sm:grid-cols-[138px_minmax(0,1fr)] sm:gap-3">
      <dt className="text-[12px] font-medium text-ink-3">{label}</dt>
      <dd className={cx('text-[13px] leading-snug', muted ? 'text-ink-4' : 'text-ink')}>{value}</dd>
    </div>
  );
}

export function EntrepriseEcole() {
  return (
    <div>
      <PageHeader
        title="Entreprise"
        description="Librairie Sana — Commerce de détail / librairie."
      />

      <Card className="mb-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="grid size-20 shrink-0 place-items-center rounded-[12px] border border-line bg-white p-2">
            <img src={logoSana} alt="Logo Librairie Sana" className="size-full object-contain" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[20px] leading-tight font-semibold tracking-[-0.02em] text-ink">Librairie Sana</h2>
              <span className="rounded-full border border-brand-line bg-brand-soft px-2 py-0.5 text-[11.5px] font-medium text-brand-ink">
                SARL
              </span>
            </div>
            <p className="mt-1 text-[14px] leading-snug text-ink-2">
              Commerce de détail / librairie
            </p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-ink-3">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="shrink-0 text-ink-4" />
                116 rue Jean-Pierre Timbaud, 75011 Paris
              </span>
              <a href="tel:+33148052928" className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-ink">
                <Phone size={14} className="shrink-0 text-ink-4" />
                01 48 05 29 28
              </a>
              <a
                href="mailto:sav@librairie-sana.com"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-ink"
              >
                <Mail size={14} className="shrink-0 text-ink-4" />
                sav@librairie-sana.com
              </a>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-4">
        <CardTitle icon={<Store size={14} />}>Ce que fait l'entreprise</CardTitle>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {[
            {
              titre: 'Vente en ligne',
              texte: 'Boutique PrestaShop en production pour le commerce de librairie.',
            },
            {
              titre: 'Préparation & expédition',
              texte: 'Le dépôt logistique prépare et expédie les commandes.',
            },
            {
              titre: 'Service après-vente',
              texte: 'Suivi et réponses aux demandes des clients.',
            },
            {
              titre: 'Pôles internes',
              texte: 'Création graphique, contenus digitaux et solutions logicielles.',
            },
          ].map((activite) => (
            <li key={activite.titre} className="flex gap-2.5">
              <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand" />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-ink">{activite.titre}</p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-ink-3">{activite.texte}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="flex h-full flex-col">
          <CardTitle icon={<Briefcase size={14} />}>Mon poste</CardTitle>
          <p className="text-[15px] leading-snug font-semibold text-ink">
            Développeur d'Application Mobile — Architecture Client-Serveur PrestaShop
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-brand-line bg-brand-soft px-2 py-0.5 text-[11px] font-medium text-brand-ink">
              Paris 11e
            </span>
            <span className="rounded-full border border-line bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-ink-3">
              2025 – 2027
            </span>
          </div>
          <ul className="mt-3.5 space-y-2">
            {[
              "Développement de l'application mobile en cours.",
              'Intégration des API REST.',
              "Création d'outils métiers connectés au système e-commerce.",
              "Participation aux projets d'optimisation logistique assistés par l'IA.",
            ].map((mission) => (
              <li key={mission} className="flex gap-2.5 text-[12.5px] leading-snug text-ink-2">
                <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-ink-4" />
                <span>{mission}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto border-t border-line pt-3">
            <p className="text-[10.5px] font-semibold tracking-[0.06em] text-ink-4 uppercase">Environnement technique</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {['Flutter', 'Dart', 'PrestaShop', 'API REST', 'MySQL', 'Firebase'].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line bg-surface-2 px-2 py-0.5 text-[11px] text-ink-2"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Card>

        <Card className="h-full">
          <CardTitle icon={<Building2 size={14} />}>Identité de l'entreprise</CardTitle>
          <dl className="divide-y divide-line">
            <Info label="Raison sociale" value="Librairie Sana" />
            <Info label="Forme juridique" value="SARL — société à responsabilité limitée" muted />
            <Info label="Activité" value="Commerce de détail / librairie" />
            <Info label="Siège social" value="116 rue Jean-Pierre Timbaud, 75011 Paris" />
            <Info label="SIREN" value="438 767 014" />
            <Info
              label="Contact"
              value={
                <span>
                  01 48 05 29 28
                  <br />
                  sav@librairie-sana.com
                </span>
              }
            />
            <Info label="Site e-commerce" value="Boutique PrestaShop en production" />
            <Info label="Chiffre d'affaires" value="≈ 2,2 M €" />
          </dl>
        </Card>
      </div>
    </div>
  );
}
