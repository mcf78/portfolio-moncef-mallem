import { lazy, Suspense } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { FileText, Loader2, X } from 'lucide-react';

// PDF.js est chargé uniquement à l'ouverture d'un document : la page d'accueil
// et les autres sections restent légères.
const PdfViewer = lazy(() => import('./PdfViewer').then((module) => ({ default: module.PdfViewer })));

export type DocumentActif = {
  titre: string;
  url: string;
  meta?: string;
};

/**
 * Lecteur de document intégré au portfolio. Le PDF est rendu dans la page :
 * aucun nouvel onglet, aucun téléchargement imposé.
 */
export function DocumentDialog({ document: doc, onClose }: { document: DocumentActif | null; onClose: () => void }) {
  return (
    <DialogPrimitive.Root open={Boolean(doc)} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-ink/45 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-canvas outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:h-[min(92dvh,940px)] sm:w-[min(96vw,1080px)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[14px] sm:border sm:border-line sm:shadow-pop">
          <header className="flex shrink-0 items-center gap-3 border-b border-line bg-surface px-4 py-3 sm:px-5">
            <FileText aria-hidden size={17} className="shrink-0 text-brand" />
            <div className="min-w-0 flex-1">
              <DialogPrimitive.Title className="truncate text-[14.5px] leading-tight font-semibold text-ink">
                {doc?.titre ?? 'Document'}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-0.5 truncate text-[11.5px] text-ink-3">
                {doc?.meta ?? 'Documentation · PDF · lecture intégrée'}
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close
              type="button"
              aria-label="Fermer le document"
              className="grid size-8 shrink-0 place-items-center rounded-[8px] text-ink-3 transition-colors hover:bg-hover hover:text-ink"
            >
              <X size={18} />
            </DialogPrimitive.Close>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto bg-surface-2 p-3 sm:p-5">
            {doc && (
              <Suspense
                fallback={
                  <div className="grid min-h-64 place-items-center rounded-[8px] border border-line bg-surface px-6 py-12 text-center">
                    <span className="inline-flex items-center gap-2 text-[13px] text-ink-3">
                      <Loader2 size={16} className="animate-spin" />
                      Ouverture du lecteur…
                    </span>
                  </div>
                }
              >
                <PdfViewer src={doc.url} titre={doc.titre} />
              </Suspense>
            )}
          </div>

          <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-line bg-surface px-4 py-2 text-[11px] text-ink-3 sm:px-5">
            <span>Le document reste dans le portfolio.</span>
            <span className="hidden sm:inline">Échap pour fermer</span>
          </footer>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
