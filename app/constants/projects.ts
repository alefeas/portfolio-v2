import type { TranslationKey } from '@/app/lib/translations';
import type { ProjectDetail } from '@/app/types';

export interface ProjectRaw {
  id: number;
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
}

export const projectsRaw: ProjectRaw[] = [
  {
    id: 1,
    titleKey: 'paytoTitle',
    descriptionKey: 'paytoDesc',
    detailedDescriptionKey: 'paytoDetailDesc',
    featuresKey: 'paytoFeatures',
    challengesKey: 'paytoChallenges',
    learningsKey: 'paytoLearnings',
    subtitle: 'Financial management made simple for Argentine businesses',
    tech: [
      'Laravel 12',
      'PHP 8.2',
      'Next.js 15',
      'React 19',
      'TypeScript',
      'MySQL',
      'Tailwind CSS',
      'shadcn/ui',
      'Recharts',
      'Sanctum',
      'Pest PHP',
    ],
    categoryKey: 'fullStack',
    statusKey: 'live',
    github: 'https://github.com/alefeas/payto-backend',
    githubFrontend: 'https://github.com/alefeas/payto-frontend',
    demo: 'https://payto.vercel.app',
    heroImage: '/projects/payto/hero.png',
    images: [
      '/projects/payto/screenshot-1.png',
      '/projects/payto/screenshot-2.png',
      '/projects/payto/screenshot-3.png',
      '/projects/payto/screenshot-4.png',
    ],
  },
  {
    id: 2,
    titleKey: 'argentumTitle',
    descriptionKey: 'argentumDesc',
    detailedDescriptionKey: 'argentumDetailDesc',
    featuresKey: 'argentumFeatures',
    challengesKey: 'argentumChallenges',
    learningsKey: 'argentumLearnings',
    subtitle: 'Real-time collaborative platform for seamless team communication',
    tech: [
      'Next.js 15',
      'TypeScript',
      'Node.js',
      'WebSocket',
      'React 19',
      'Tailwind CSS',
      'Sequelize',
      'Redis',
      'Socket.io',
    ],
    categoryKey: 'fullStack',
    statusKey: 'inDevelopment',
    github: '',
    demo: '',
    heroImage: '',
    images: [],
    isPrivate: true,
  },
];

export const getProjects = (
  t: (key: TranslationKey) => string | string[]
): ProjectDetail[] =>
  projectsRaw.map((project) => ({
    ...project,
    title: t(project.titleKey) as string,
    description: t(project.descriptionKey) as string,
    detailedDescription: t(project.detailedDescriptionKey) as string,
    features: t(project.featuresKey) as string[],
    challenges: t(project.challengesKey) as string,
    learnings: t(project.learningsKey) as string,
    category: t(project.categoryKey) as string,
    status: t(project.statusKey) as string,
    isLive: project.statusKey === 'live',
  }));
