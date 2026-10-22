import type { ReactNode } from 'react';
import {
  Briefcase,
  Building2,
  Copyright,
  FileText,
  Handshake,
  Mail,
  MapPin,
  Phone,
  Receipt,
  Scale,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
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

function LegalItem({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <li className="rounded-[8px] border border-line bg-surface-2 p-2.5">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-[6px] bg-brand-soft text-brand-ink">
          <Icon size={13} />
        </span>
        <div className="min-w-0">
          <p className="text-[12.5px] font-semibold text-ink">{title}</p>
          <p className="mt-0.5 text-[12px] leading-snug text-ink-3">{text}</p>
        </div>
      </div>
    </li>
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

      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <Card className="lg:col-start-2 lg:row-start-1">
          <CardTitle icon={<Building2 size={14} />}>Identité & organisation</CardTitle>

          <section aria-labelledby="identite-entreprise">
            <h3 id="identite-entreprise" className="text-[12px] font-semibold tracking-[0.05em] text-ink-3 uppercase">
              Identité de l'entreprise
            </h3>
            <dl className="mt-1 divide-y divide-line">
              <Info label="Raison sociale" value="Librairie Sana" />
              <Info label="Forme juridique" value="SARL — société à responsabilité limitée" />
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
            <p className="mt-2 text-[11px] leading-snug text-ink-4">
              Chiffre d'affaires estimé à partir de données récentes — source Infonet.
            </p>
          </section>

          <section aria-labelledby="organisation-entreprise" className="mt-4 border-t border-line pt-4">
            <h3
              id="organisation-entreprise"
              className="flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.05em] text-ink-3 uppercase"
            >
              <Users size={14} className="text-brand-ink" />
              Organisation de l'entreprise
            </h3>
            <ul className="mt-2 space-y-2.5">
              {[
                ['Site e-commerce', 'Boutique PrestaShop en production.'],
                ['Dépôt logistique', 'Préparation et expédition des commandes.'],
                ['Service après-vente', 'Suivi et réponses aux demandes clients.'],
                ['Pôles internes', 'Création graphique, contenus digitaux et solutions logicielles.'],
              ].map(([titre, texte]) => (
                <li key={titre} className="flex gap-2.5">
                  <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand" />
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{titre}</p>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-ink-3">{texte}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </Card>

        <Card className="lg:col-start-1 lg:row-start-1 lg:mt-24">
          <CardTitle icon={<Briefcase size={14} />}>Mon poste & cadre juridique</CardTitle>

          <section aria-labelledby="mon-poste">
            <h3 id="mon-poste" className="text-[12px] font-semibold tracking-[0.05em] text-ink-3 uppercase">
              Mon poste
            </h3>
            <p className="mt-1 text-[14.5px] leading-snug font-semibold text-ink">
              Développeur d'Application Mobile — Architecture Client-Serveur PrestaShop
            </p>
            <ul className="mt-3 space-y-2">
              {[
                "Développement de l'application mobile en cours.",
                'Intégration des API REST.',
                "Création d'outils métiers connectés au système e-commerce.",
                "Participation aux projets d'optimisation logistique assistés par l'IA.",
              ].map((mission) => (
                <li key={mission} className="flex gap-2.5 text-[12.5px] leading-snug text-ink-2">
                  <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{mission}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="cadre-juridique" className="mt-4 border-t border-line pt-4">
            <h3
              id="cadre-juridique"
              className="flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.05em] text-ink-3 uppercase"
            >
              <Scale size={14} className="text-brand-ink" />
              Cadre juridique
            </h3>
            <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <LegalItem
                icon={Scale}
                title="Société"
                text="SARL : responsabilité limitée aux apports des associés."
              />
              <LegalItem
                icon={FileText}
                title="Consommateurs"
                text="CGV, mentions légales et droit de rétractation pour la vente en ligne."
              />
              <LegalItem
                icon={ShieldCheck}
                title="Données personnelles"
                text="RGPD : consentement, information et droits d'accès, de rectification et de suppression."
              />
              <LegalItem
                icon={Copyright}
                title="Propriété intellectuelle"
                text="Protection du logo, des contenus et des créations graphiques."
              />
              <LegalItem
                icon={Handshake}
                title="Contrats"
                text="Contrats de travail, prestataires et assurance de l'entreprise."
              />
              <LegalItem
                icon={Receipt}
                title="Fiscalité"
                text="TVA et obligations comptables liées à l'activité commerciale."
              />
            </ul>
          </section>
        </Card>
      </div>
    </div>
  );
}
