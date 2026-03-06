import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    titleKey: 'houseOfCbTitle',
    descriptionKey: 'houseOfCbDesc',
    detailedDescriptionKey: 'houseOfCbDetailDesc',
    featuresKey: 'houseOfCbFeatures',
    challengesKey: 'houseOfCbChallenges',
    learningsKey: 'houseOfCbLearnings',
    tech: ["Smarty, PHP 8.2", "Next.js 15", "React 19", "TypeScript", "MySQL", "Tailwind CSS", "REST API", "Docker", "AWS"],
    categoryKey: 'fullStack',
    statusKey: 'live',
    github: "",
    demo: "https://app.houseofcb.com",
    heroImage: "/projects/hofcb/hero.png",
    isPrivate: true
  },
  {
    id: 2,
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
    id: 3,
    titleKey: 'airGeorgeTitle',
    descriptionKey: 'airGeorgeDesc',
    detailedDescriptionKey: 'airGeorgeDetailDesc',
    featuresKey: 'airGeorgeFeatures',
    challengesKey: 'airGeorgeChallenges',
    learningsKey: 'airGeorgeLearnings',
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Email Integration", "SEO Optimization", "Responsive Design"],
    categoryKey: 'frontEnd',
    statusKey: 'live',
    github: "",
    demo: "https://www.airgeorge.ar",
    heroImage: "/projects/air-george/hero.png",
    isPrivate: true
  }
];