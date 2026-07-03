import type { Metadata } from 'next';
import { translations } from '@/app/lib/translations';
import { getProjectBySlug, projectsRaw } from '@/app/constants/projects';
import { SITE_URL } from '@/app/lib/site';

export function generateStaticParams() {
  return projectsRaw.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const title = translations.en[project.titleKey] as string;
  const description = translations.en[project.descriptionKey] as string;
  const projectUrl = `${SITE_URL}/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      title,
      description,
      url: projectUrl,
      type: 'article',
      images: project.heroImage
        ? [
            {
              url: project.heroImage,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: project.heroImage ? [project.heroImage] : undefined,
    },
  };
}

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
