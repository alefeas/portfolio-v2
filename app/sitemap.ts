import type { MetadataRoute } from 'next';
import { projectsRaw } from '@/app/constants/projects';
import { SITE_URL } from '@/app/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectsRaw.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
