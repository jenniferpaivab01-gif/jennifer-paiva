import { notFound } from "next/navigation";
import { PdfViewer } from "@/components/PdfViewer";
import { projects, projectCopyKey, type ProjectId } from "@/data/projects";
import { dictionaries, defaultLocale } from "@/i18n";

type CasePageProps = {
  params: Promise<{ id: string }>;
};

const caseProjects = projects.filter((project) => project.pdfSrc);

export function generateStaticParams() {
  return caseProjects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: CasePageProps) {
  const { id } = await params;
  const project = caseProjects.find((item) => item.id === id);
  if (!project) return {};

  const copy =
    dictionaries[defaultLocale].projects[projectCopyKey[project.id]];

  return {
    title: `${copy.title} — Jenni`,
    description: copy.description,
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { id } = await params;

  const project = projects.find((item) => item.id === id && item.pdfSrc);

  if (!project?.pdfSrc) notFound();

  return <PdfViewer src={project.pdfSrc} projectId={project.id as ProjectId} />;
}
