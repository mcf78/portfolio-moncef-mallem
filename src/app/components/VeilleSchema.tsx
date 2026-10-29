import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Bot,
  Database,
  Network,
  Send,
  UserRound,
  type LucideIcon,
} from 'lucide-react';

type SujetId = 'ia' | 'blockchain';
type Etape = { titre: string; detail: string; icone: LucideIcon };

const schemas: Record<SujetId, {
  etapes: Etape[];
  attention: string;
  sources: { nom: string; url: string }[];
}> = {
  ia: {
    etapes: [
      { titre: 'Utilisateur', detail: 'Envoie une demande.', icone: UserRound },
      { titre: 'Application IA', detail: 'Propose une action.', icone: Bot },
      { titre: 'Outils et données', detail: 'Droits d’accès contrôlés.', icone: Database },
    ],
    attention: 'À surveiller : permissions limitées et contrôle des accès aux outils.',
    sources: [
      { nom: 'OWASP', url: 'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/' },
    ],
  },
  blockchain: {
    etapes: [
      { titre: 'Demande signée', detail: 'Transaction envoyée.', icone: Send },
      { titre: 'Validation du réseau', detail: 'Vérification des règles.', icone: Network },
      { titre: 'Registre partagé', detail: 'Résultat enregistré.', icone: Blocks },
    ],
    attention: 'Usages suivis : traçabilité et contrats intelligents ; règles propres à chaque réseau.',
    sources: [
      { nom: 'Ethereum', url: 'https://ethereum.org/developers/docs/transactions/' },
      { nom: 'IOTA', url: 'https://docs.iota.org/about-iota/iota-architecture/' },
    ],
  },
};

export function VeilleSchema({ sujetId }: { sujetId: SujetId }) {
  const schema = schemas[sujetId];

  return (
    <figure className="mt-4 rounded-[10px] bg-surface-2 p-3 sm:p-4">
      <figcaption className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="text-[13px] font-semibold text-ink">Le principe en un schéma</span>
        <span className="text-[11px] text-ink-3">Schéma simplifié</span>
      </figcaption>

      <ol className="flex flex-col gap-1 sm:flex-row">
        {schema.etapes.map(({ titre, detail, icone: Icone }, index) => (
          <li key={titre} className="relative flex min-w-0 flex-1 flex-col pb-5 last:pb-0 sm:pr-6 sm:pb-0 sm:last:pr-0">
            <div className="flex h-full items-center gap-2.5 rounded-[8px] border border-line-strong bg-surface px-2.5 py-1.5 sm:py-2.5">
              <Icone aria-hidden size={20} className="shrink-0 text-brand-ink" />
              <div className="min-w-0">
                <p className="text-[12.5px] leading-snug font-semibold text-ink">{titre}</p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-ink-2">{detail}</p>
              </div>
            </div>
            {index < schema.etapes.length - 1 && (
              <>
                <ArrowDown aria-hidden size={16} className="absolute bottom-0 left-1/2 -translate-x-1/2 text-brand-ink sm:hidden" />
                <ArrowRight aria-hidden size={16} className="absolute top-1/2 right-1 hidden -translate-y-1/2 text-brand-ink sm:block" />
              </>
            )}
          </li>
        ))}
      </ol>

      <p className="mt-2 text-[12px] leading-[1.5] text-ink-2">{schema.attention}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-3">
        <span>{schema.sources.length === 1 ? 'Source :' : 'Sources :'}</span>
        {schema.sources.map((source) => (
          <a
            key={source.nom}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-brand-ink underline underline-offset-2 hover:text-brand-hover"
          >
            {source.nom}
            <ArrowUpRight aria-hidden size={11} />
          </a>
        ))}
      </div>
    </figure>
  );
}
