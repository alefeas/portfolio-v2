import type { Metadata } from "next";

const projectTitles: Record<string, string> = {
  "1": "House of CB",
  "2": "Payto",
  "3": "Air George",
};

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
