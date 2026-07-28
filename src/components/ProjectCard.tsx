"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type MouseEvent } from "react";
import type { Project } from "@/data/projects";
import { projectCopyKey } from "@/data/projects";
import { useTranslations } from "@/i18n/LocaleProvider";

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex h-7 items-center gap-1 rounded-full border border-black/12 px-2 backdrop-blur-[5px]">
      <span className="text-[13px] font-bold uppercase leading-[19.5px] text-black/40">
        {label}
      </span>
      <Image
        src="/assets/arrow-up-right.svg"
        alt=""
        width={16}
        height={16}
        className="opacity-30"
        style={{ width: 16, height: 16 }}
      />
    </span>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const { media } = project;

  if (media.type === "composite") {
    const isChatSupport = media.watermark === "CHAT SUPPORT";

    return (
      <div
        className="relative aspect-[597/388] w-full overflow-hidden rounded-xl"
        style={{ backgroundColor: media.bg }}
      >
        {media.watermark ? (
          <p
            className={
              isChatSupport
                ? "pointer-events-none absolute left-[4%] top-[13%] select-none font-semibold leading-[1.05] tracking-[-0.01em]"
                : "pointer-events-none absolute left-[10%] top-0 select-none font-medium leading-none tracking-tight"
            }
            style={{
              color: media.watermarkColor,
              fontSize: isChatSupport
                ? "clamp(2.4rem, 5.8vw, 4.7rem)"
                : media.watermark === "OLIVIA"
                  ? "clamp(4.5rem, 11vw, 10rem)"
                  : "clamp(5rem, 12vw, 12.2rem)",
            }}
          >
            {media.watermark}
          </p>
        ) : null}
        {media.phoneSrc ? (
          <div
            className={
              isChatSupport
                ? "absolute inset-x-[16%] bottom-[5%] top-[28%] overflow-hidden rounded-[9px] shadow-[0_14px_28px_-14px_rgba(20,20,20,0.25)]"
                : "absolute inset-x-[6%] bottom-0 top-[3%] md:inset-x-[8%]"
            }
          >
            <Image
              src={media.phoneSrc}
              alt=""
              fill
              className={
                isChatSupport
                  ? "object-cover object-left-top"
                  : "object-contain object-bottom"
              }
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={false}
            />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[597/388] w-full overflow-hidden rounded-xl"
      style={{ backgroundColor: media.bg ?? "#e2e2de" }}
    >
      {media.src ? (
        <Image
          src={media.src}
          alt=""
          fill
          className={
            media.objectFit === "contain" ? "object-contain" : "object-cover"
          }
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ) : null}
    </div>
  );
}

function PdfLoadingOverlay({ label }: { label: string }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-[var(--bg)]/92 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
    >
      <span className="pdf-loader" aria-hidden="true" />
      <p className="text-base font-medium text-black/50">{label}</p>
    </div>
  );
}

function downloadFileName(src: string, title: string) {
  const fromPath = src.split("/").pop();
  if (fromPath?.endsWith(".pdf")) return fromPath;
  return `${title.replace(/[^\w\s-]/g, "").trim() || "case"}.pdf`;
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const t = useTranslations();
  const copy = t.projects[projectCopyKey[project.id]];
  const badgeLabel = project.badge ? t.badges[project.badge] : null;
  const [downloading, setDownloading] = useState(false);

  async function handlePdfDownload(event: MouseEvent<HTMLAnchorElement>) {
    if (!project.pdfSrc) return;

    event.preventDefault();
    if (downloading) return;

    setDownloading(true);
    try {
      const response = await fetch(project.pdfSrc);
      if (!response.ok) throw new Error("Failed to download PDF");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = downloadFileName(project.pdfSrc, copy.title);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open the file URL if programmatic download fails
      window.open(project.pdfSrc, "_blank", "noopener,noreferrer");
    } finally {
      setDownloading(false);
    }
  }

  const cardContent = (
    <>
      <div className="overflow-hidden rounded-xl transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)]">
        <ProjectMedia project={project} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold leading-[1.2] text-black">
          {copy.title}
        </h2>
        {badgeLabel ? <Badge label={badgeLabel} /> : null}
      </div>

      <p className="mt-3 text-base font-medium leading-[1.7] text-black/40">
        {copy.description}
      </p>

      <p className="mt-4 text-base font-semibold leading-[1.2] text-black">
        {copy.meta}
      </p>
    </>
  );

  return (
    <article
      className="project-card group flex flex-col"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {downloading ? (
        <PdfLoadingOverlay label={t.pdfViewer.loading} />
      ) : null}

      {project.pdfSrc ? (
        <a
          href={project.pdfSrc}
          download
          onClick={handlePdfDownload}
          className="block outline-none"
          aria-label={`${copy.title} — ${t.pdfViewer.loadingAria}`}
        >
          {cardContent}
        </a>
      ) : (
        <Link href={`#${project.id}`} className="block outline-none">
          {cardContent}
        </Link>
      )}
    </article>
  );
}
