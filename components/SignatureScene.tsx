'use client';

import { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";

const SIGNER_NAME = "Ouabas Hakima";

function formatDate(date: Date) {
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function SignatureScene() {
  const signatureCardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const todayLabel = useMemo(() => formatDate(new Date()), []);
  const filename = useMemo(
    () =>
      `signature-ouabas-hakima-${new Date()
        .toISOString()
        .replace(/[:.]/g, "-")}.png`,
    []
  );

  async function handleDownload() {
    if (!signatureCardRef.current) {
      return;
    }

    try {
      setIsDownloading(true);
      const dataUrl = await toPng(signatureCardRef.current, {
        backgroundColor: "#09090b",
        pixelRatio: 2,
        cacheBust: true
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = filename;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 px-6 py-16 text-neutral-100 md:px-12">
      <header className="text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">
          Signature électronique
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
          {SIGNER_NAME}
        </h1>
        <p className="mt-4 max-w-xl text-balance text-neutral-400 md:text-lg">
          Cette signature manuscrite est générée de manière numérique avec une
          typographie fluide et prête à être utilisée dans vos documents
          électroniques.
        </p>
      </header>

      <div className="flex flex-col items-center gap-6">
        <div
          ref={signatureCardRef}
          className="signature-card relative flex w-[min(90vw,640px)] flex-col items-center gap-6 rounded-3xl border border-white/10 bg-neutral-950/90 px-10 py-10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl md:px-16 md:py-16"
        >
          <div className="absolute inset-0 rounded-3xl border border-white/5" />
          <div className="absolute -top-6 left-10 rounded-full border border-purple-500/40 bg-purple-500/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-purple-200">
            Authentique
          </div>

          <div className="flex flex-col items-center gap-4 pt-8">
            <span className="text-sm uppercase tracking-[0.5em] text-neutral-500">
              Signé par
            </span>
            <span className="signature-text text-[56px] leading-none text-white md:text-[72px]">
              {SIGNER_NAME}
            </span>
          </div>

          <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="flex w-full flex-col gap-6 text-sm text-neutral-400 md:flex-row md:items-start md:justify-between md:text-base">
            <div className="flex flex-col gap-2 uppercase tracking-[0.32em]">
              <span className="text-xs text-neutral-500">Date</span>
              <span className="text-neutral-200">{todayLabel}</span>
            </div>
            <div className="flex flex-col gap-2 uppercase tracking-[0.32em]">
              <span className="text-xs text-neutral-500">Identifiant</span>
              <span className="text-neutral-200">OUABAS-HAKIMA-ESIGN</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-purple-400/30 bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:scale-[1.02] hover:shadow-[0_20px_60px_-20px_rgba(99,102,241,0.8)] active:scale-[0.98]"
          disabled={isDownloading}
        >
          <span className="pointer-events-none absolute inset-0 bg-white/10 transition-opacity group-hover:opacity-0" />
          <span>{isDownloading ? "Préparation…" : "Télécharger la signature"}</span>
        </button>
      </div>

      <footer className="max-w-xl text-center text-xs text-neutral-500">
        Signature numérique générée automatiquement pour les usages électroniques
        autorisés de Ouabas Hakima.
      </footer>
    </div>
  );
}

export default SignatureScene;
