import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    titleKey: 'paytoTitle',
    descriptionKey: 'paytoDesc',
    detailedDescriptionKey: 'paytoDetailDesc',
    featuresKey: 'paytoFeatures',
    challengesKey: 'paytoChallenges',
    learningsKey: 'paytoLearnings',
    tech: ["Laravel 12", "PHP 8.2", "Next.js 15", "React 19", "TypeScript", "MySQL", "Tailwind CSS", "shadcn/ui", "Recharts", "Sanctum", "Pest PHP"],
    categoryKey: 'fullStack',
    statusKey: 'live',
    github: "https://github.com/alefeas/payto-backend",
    demo: "https://payto.vercel.app",
    heroImage: "/projects/payto/hero.png"
  },
  {
    id: 2,
    titleKey: 'argentumTitle',
    descriptionKey: 'argentumDesc',
    detailedDescriptionKey: 'argentumDetailDesc',
    featuresKey: 'argentumFeatures',
    challengesKey: 'argentumChallenges',
    learningsKey: 'argentumLearnings',
    tech: ["Next.js 15", "TypeScript", "Node.js", "WebSocket", "React 19", "Tailwind CSS", "Sequelize", "Redis", "Socket.io"],
    categoryKey: 'fullStack',
    statusKey: 'inDevelopment',
    github: "",
    demo: "",
    heroImage: "",
    isPrivate: true
  }
];