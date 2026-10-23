import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { FileWarning, Loader2 } from 'lucide-react';
import { cx } from './kit';

// PDF.js affiche le document lui-même : pas d'iframe, donc pas de téléchargement
// ni d'ouverture d'un nouvel onglet, y compris sur mobile.
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const PAGE_MAX_WIDTH = 760;

function PdfPage({
  pdf,
  pageNumber,
  largeur,
  ratio,
}: {
  pdf: PDFDocumentProxy;
  pageNumber: number;
  largeur: number;
  ratio: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(pageNumber <= 2);
  const [rendue, setRendue] = useState(false);
  const [erreur, setErreur] = useState(false);

  // On ne dessine que les pages proches de l'écran : les documents de 20+ pages
  // restent fluides et la mémoire du navigateur reste raisonnable.
  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '900px 0px' },
    );
    observer.observe(zone);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible || largeur <= 0) return;
    let annule = false;
    let renderTask: RenderTask | null = null;

    pdf
      .getPage(pageNumber)
      .then((page) => {
        if (annule) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const base = page.getViewport({ scale: 1 });
        const ratioPixel = Math.min(window.devicePixelRatio || 1, 1.6);
        const viewport = page.getViewport({ scale: (largeur / base.width) * ratioPixel });
        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);
        canvas.style.width = '100%';
        canvas.style.height = 'auto';

        renderTask = page.render({ canvasContext: context, viewport });
        return renderTask.promise.then(() => {
          if (!annule) setRendue(true);
        });
      })
      .catch((error: unknown) => {
        if (annule) return;
        // L'annulation d'un rendu (fermeture du lecteur, changement de page) n'est pas une erreur.
        if (error instanceof Error && error.name === 'RenderingCancelledException') return;
        setErreur(true);
      });

    return () => {
      annule = true;
      renderTask?.cancel();
    };
  }, [pdf, pageNumber, largeur, visible]);

  return (
    <div ref={zoneRef} className="mx-auto w-full" style={{ maxWidth: PAGE_MAX_WIDTH }}>
      <div
        className="relative overflow-hidden rounded-[6px] border border-line bg-white shadow-[0_1px_3px_rgba(6,27,49,0.08)]"
        style={!rendue ? { aspectRatio: ratio } : undefined}
      >
        {!rendue && !erreur && (
          <div className="absolute inset-0 grid place-items-center bg-white">
            <span className="inline-flex items-center gap-2 text-[12px] text-ink-3">
              <Loader2 size={14} className="animate-spin" />
              Page {pageNumber}
            </span>
          </div>
        )}
        {erreur ? (
          <div className="grid h-full min-h-40 place-items-center bg-surface-2 px-6 text-center text-[12.5px] text-ink-3">
            Cette page n'a pas pu être affichée.
          </div>
        ) : (
          <canvas ref={canvasRef} className={cx('block w-full bg-white transition-opacity duration-200', rendue ? 'opacity-100' : 'opacity-0')} />
        )}
      </div>
      {rendue && <p className="mt-1.5 mb-3 text-center text-[10.5px] text-ink-4">{pageNumber}</p>}
    </div>
  );
}

export function PdfViewer({ src, titre, className }: { src: string; titre: string; className?: string }) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [largeur, setLargeur] = useState(0);
  const [ratio, setRatio] = useState(210 / 297);
  const [erreur, setErreur] = useState(false);

  // La largeur disponible pilote l'échelle de rendu : les pages restent nettes
  // et lisibles, du petit mobile au grand écran.
  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;
    const mesurer = () => setLargeur(Math.min(Math.max(zone.clientWidth - 24, 240), PAGE_MAX_WIDTH));
    mesurer();
    const observer = new ResizeObserver(mesurer);
    observer.observe(zone);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let annule = false;
    let documentCharge: PDFDocumentProxy | null = null;
    const chargement = pdfjsLib.getDocument({ url: src });

    setPdf(null);
    setErreur(false);

    chargement.promise
      .then(async (document) => {
        documentCharge = document;
        if (annule) return;
        setPdf(document);
        const premierePage = await document.getPage(1);
        const viewport = premierePage.getViewport({ scale: 1 });
        if (!annule) setRatio(viewport.width / viewport.height);
      })
      .catch(() => {
        if (!annule) setErreur(true);
      });

    return () => {
      annule = true;
      void chargement.destroy();
      void documentCharge?.destroy();
    };
  }, [src]);

  return (
    <div ref={zoneRef} className={cx('w-full', className)} aria-label={`Aperçu du document : ${titre}`}>
      {erreur ? (
        <div className="grid min-h-64 place-items-center rounded-[8px] border border-line bg-surface px-6 py-12 text-center">
          <div>
            <FileWarning size={24} className="mx-auto text-ink-3" />
            <p className="mt-2 text-[13.5px] font-medium text-ink">Le document n'a pas pu être chargé.</p>
            <p className="mt-1 text-[12.5px] text-ink-3">Vérifiez votre connexion puis rouvrez la documentation.</p>
          </div>
        </div>
      ) : !pdf ? (
        <div className="grid min-h-64 place-items-center rounded-[8px] border border-line bg-surface px-6 py-12 text-center">
          <span className="inline-flex items-center gap-2 text-[13px] text-ink-3">
            <Loader2 size={16} className="animate-spin" />
            Chargement du document…
          </span>
        </div>
      ) : (
        <div className="space-y-3">
          {Array.from({ length: pdf.numPages }, (_, index) => (
            <PdfPage key={index + 1} pdf={pdf} pageNumber={index + 1} largeur={largeur} ratio={ratio} />
          ))}
        </div>
      )}
    </div>
  );
}
