import { ArrowUpRight, BadgeCheck, FileText, GraduationCap, Route } from 'lucide-react';
import {
  certifications,
  certificationsComplementaires,
  certificationsPrincipales,
  organismes,
  type Certification,
  type Organisme,
} from '../data/certifications';
import { Card, CardTitle, cx, Eyebrow, PageHeader } from './kit';

/** Petit bloc-marque textuel : lisible, sans dépendre d'un logo distant. */
export function OrganismeMark({
  organisme,
  taille = 'md',
}: {
  organisme: Organisme;
  taille?: 'sm' | 'md';
}) {
  const style = organismes[organisme];
  return (
    <span
      title={organisme}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-[5px] font-bold whitespace-nowrap',
        taille === 'sm' ? 'h-[22px] px-1.5 text-[8.5px] tracking-[0.1em]' : 'h-6 px-2 text-[9.5px] tracking-[0.08em]',
      )}
      style={{ background: style.fond, color: style.encre }}
    >
      {style.mot}
    </span>
  );
}

function CertificationCard({ certification }: { certification: Certification }) {
  const c = certification;
  return (
    <article className="group flex flex-col overflow-hidden rounded-[12px] border border-line bg-surface transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card">
      <a
        href={c.fichier}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ouvrir le certificat : ${c.titre}`}
        className="relative block aspect-[16/9] overflow-hidden border-b border-line bg-surface-2"
      >
        <img
          src={c.apercu}
          alt={`Aperçu du certificat ${c.titre} — ${c.organisme}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.025]"
        />
      </a>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <OrganismeMark organisme={c.organisme} taille="sm" />
          <span className="shrink-0 text-[11.5px] leading-none text-ink-3">{c.date}</span>
          <span title={c.domaine} className="ml-auto hidden min-w-0 truncate text-[10px] leading-none font-semibold tracking-[0.04em] text-ink-4 uppercase sm:block">
            {c.domaine}
          </span>
        </div>

        <h3 className="mt-2 text-[15px] leading-snug font-semibold tracking-[-0.006em] text-ink">{c.titre}</h3>
        <p className="mt-1 text-[13px] leading-[1.55] text-ink-3">{c.description}</p>

        <div className="mt-2.5 flex flex-wrap gap-1">
          {c.competences.map((competence) => (
            <span
              key={competence}
              className="rounded-full border border-line bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-ink-2"
            >
              {competence}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-2 gap-y-1 pt-3">
          <a
            href={c.fichier}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[12.5px] font-medium text-brand-ink hover:underline"
          >
            <FileText size={13} />
            Voir le certificat
            <ArrowUpRight size={12} />
          </a>
          {c.verification && (
            <a
              href={c.verification.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11.5px] font-medium text-ink-3 transition-colors hover:text-brand-ink"
            >
              Vérifier
            </a>
          )}
        </div>
        {c.code && <p className="mt-1 truncate text-[10.5px] text-ink-4">Code : {c.code}</p>}
      </div>
    </article>
  );
}

export function Certifications() {
  const nbOrganismes = new Set(certifications.map((c) => c.organisme)).size;
  const nbDomaines = new Set(certifications.map((c) => c.domaine)).size;
  const chiffres = [
    { valeur: certifications.length, libelle: 'certificats' },
    { valeur: nbOrganismes, libelle: 'organismes' },
    { valeur: nbDomaines, libelle: 'domaines' },
  ];

  return (
    <div>
      <PageHeader
        title="Certifications"
        description={`${certifications.length} certifications obtenues entre 2025 et 2026, autour de l'IA appliquée au développement, de la data et du e-commerce.`}
      />

      {/* Fil conducteur : relie les certificats au métier plutôt que de les empiler. */}
      <Card dense className="mb-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <Eyebrow className="flex items-center gap-1.5">
              <Route size={12} className="text-ink-3" />
              Fil conducteur
            </Eyebrow>
            <p className="max-w-[76ch] text-[14px] leading-[1.6] text-ink-2">
              Comprendre l'IA, savoir l'intégrer dans une application, puis l'appliquer à un contexte e-commerce :
              les certificats Anthropic couvrent le développement et les usages, NVIDIA la donnée et le NLP,
              HubSpot le marketing digital.
            </p>
          </div>
          <div className="grid shrink-0 grid-cols-3 gap-2">
            {chiffres.map(({ valeur, libelle }) => (
              <div key={libelle} className="rounded-[10px] border border-line bg-surface-2 px-3 py-2 text-center">
                <p className="text-[20px] leading-none font-semibold text-ink tabular-nums">{valeur}</p>
                <p className="mt-1 text-[11px] leading-none text-ink-3">{libelle}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="mb-2.5 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-[17px] leading-snug font-semibold tracking-[-0.01em] text-ink">Certifications principales</h2>
          <p className="mt-0.5 text-[13px] leading-snug text-ink-3">
            Les {certificationsPrincipales.length} certificats les plus représentatifs de mon parcours.
          </p>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-brand-line bg-brand-soft px-2.5 py-1 text-[11.5px] font-medium text-brand-ink sm:inline-flex">
          <BadgeCheck size={13} />
          {certificationsPrincipales.length} parmi {certifications.length}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {certificationsPrincipales.map((certification) => (
          <CertificationCard key={certification.id} certification={certification} />
        ))}
      </div>

      <Card dense className="mt-4">
        <CardTitle icon={<GraduationCap size={14} />} aside={<span className="text-[12px] text-ink-3">Pour compléter les fondamentaux</span>}>
          Compléments de parcours
        </CardTitle>
        <div className="grid gap-2 sm:grid-cols-2">
          {certificationsComplementaires.map((c) => (
            <a
              key={c.id}
              href={c.fichier}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-[10px] border border-line bg-surface-2 px-3 py-2.5 transition-[border-color,background-color] duration-150 hover:border-brand-line hover:bg-surface"
            >
              <OrganismeMark organisme={c.organisme} taille="sm" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-medium text-ink">{c.titre}</span>
                <span className="block text-[11.5px] text-ink-3">
                  {c.organisme} · {c.date}
                </span>
              </span>
              <ArrowUpRight size={15} className="shrink-0 text-ink-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-ink" />
            </a>
          ))}
        </div>
      </Card>

      <p className="mt-3 text-[12px] leading-snug text-ink-3">
        Chaque certificat s'ouvre dans un nouvel onglet, au format PDF ou PNG d'origine.
      </p>
    </div>
  );
}
