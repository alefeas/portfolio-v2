// Extended domain types used in pages and components

export type ProjectDetail = {
  id: number;
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
};
