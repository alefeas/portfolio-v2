// Domain Models
export interface Project {
  id: number;
  titleKey: string;
  descriptionKey: string;
  detailedDescriptionKey: string;
  featuresKey: string;
  challengesKey: string;
  learningsKey: string;
  tech: string[];
  categoryKey: string;
  statusKey: string;
  github: string;
  demo: string;
  heroImage: string;
  isPrivate?: boolean;
}

export interface Technology {
  name: string;
  logo: string;
}

export interface TechCategory {
  category: string;
  techs: Technology[];
}

export interface NavLink {
  key: string;
  href: string;
  icon: string;
  target?: string;
}

export interface ContactMethod {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

// UI Component Props
export * from './ui';

// Context Types
export * from './contexts';

// Extended Domain Types
export * from './domain';