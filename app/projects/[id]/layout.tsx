import type { Metadata } from "next";
import { translations } from '@/app/lib/translations';
import { projectsRaw } from '@/app/constants/projects';

// Usar inglés por defecto para los títulos de las pestañas
const projectTitles: Record<string, string> = Object.fromEntries(
  projectsRaw.map((project) => [
    project.id.toString(), 
    translations.en[project.titleKey] as string
  ])
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const projectTitle = projectTitles[id] || "Project";

  return {
    title: `${projectTitle} - AFM`,
    description: `Detailed case study and information about ${projectTitle}`,
  };
}

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
