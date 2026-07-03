// Extended domain types used in pages and components

import type { TranslationKey } from '@/app/lib/translations';

export interface ProjectRaw {
  id: number;
  slug: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  detailedDescriptionKey: TranslationKey;
  featuresKey: TranslationKey;
  challengesKey: TranslationKey;
  learningsKey: TranslationKey;
  subtitle: string;
  tech: string[];
  categoryKey: TranslationKey;
  statusKey: TranslationKey;
  github: string;
  githubFrontend?: string;
  demo: string;
  heroImage: string;
  images: string[];
  isPrivate?: boolean;
  demoUnavailable?: boolean;
  githubLabelKey?: TranslationKey;
}

export type ProjectDetail = {
  id: number;
  slug: string;
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  challenges: string;
  learnings: string;
  category: string;
  status: string;
  isLive: boolean;
  subtitle?: string;
  tech: string[];
  isPrivate?: boolean;
  github?: string;
  githubFrontend?: string;
  demo?: string;
  heroImage?: string;
  images?: string[];
  demoUnavailable?: boolean;
  githubLabelKey?: TranslationKey;
};
