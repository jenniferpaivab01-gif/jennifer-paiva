"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { projectCopyKey, type ProjectId } from "@/data/projects";
import { useTranslations } from "@/i18n/LocaleProvider";

type PdfViewerProps = {
  src: string;
  projectId: ProjectId;
};

export function PdfViewer({ src, projectId }: PdfViewerProps) {
  const t = useTranslations();
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const title = t.projects[projectCopyKey[projectId]].title;

  useEffect(() => {
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        router.push("/#trabalho");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <main className="relative min-h-dvh w-full bg-white" aria-label={title}>
      <iframe
        src={`${src}#toolbar=0&navpanes=0&scrollbar=1`}
        title={title}
        className="fixed inset-0 h-dvh w-full border-0"
      />

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-black/50 via-black/20 to-transparent px-4 pb-5 pt-16 md:pb-6">
        <button
          ref={closeRef}
          type="button"
          onClick={() => router.push("/#trabalho")}
          aria-label={t.pdfViewer.closeAria}
          className="pointer-events-auto rounded-full bg-black px-8 py-3.5 text-base font-semibold text-white shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-transform hover:scale-[1.02] hover:bg-neutral-900 active:scale-[0.98]"
        >
          {t.pdfViewer.close}
        </button>
      </div>
    </main>
  );
}
