'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from '@/app/hooks/useTranslation';
import { TranslationKey } from '@/app/lib/translations';
import { Button, FeatureItem, TechTag, RepositoryLink, BackButton, Carousel, DemoCredentialsModal } from '@/app/components/ui';
import type { ProjectDetail } from '@/app/types';

const getProjects = (t: (key: TranslationKey) => string | string[]): ProjectDetail[] => [
  {
    id: 1,
    titleKey: 'paytoTitle' as TranslationKey,
    descriptionKey: 'paytoDesc' as TranslationKey,
    detailedDescriptionKey: 'paytoDetailDesc' as TranslationKey,
    featuresKey: 'paytoFeatures' as TranslationKey,
    challengesKey: 'paytoChallenges' as TranslationKey,
    learningsKey: 'paytoLearnings' as TranslationKey,
    subtitle: "Financial management made simple for Argentine businesses",
    tech: ["Laravel 12", "PHP 8.2", "Next.js 15", "React 19", "TypeScript", "MySQL", "Tailwind CSS", "shadcn/ui", "Recharts", "Sanctum", "Pest PHP"],
    categoryKey: 'fullStack' as TranslationKey,
    statusKey: 'live' as TranslationKey,
    github: "https://github.com/alefeas/payto-backend",
    githubFrontend: "https://github.com/alefeas/payto-frontend",
    demo: "https://payto.vercel.app",
    heroImage: "/projects/payto/hero.png",
    images: [
      '/projects/payto/screenshot-1.png',
      '/projects/payto/screenshot-2.png',
      '/projects/payto/screenshot-3.png',
      '/projects/payto/screenshot-4.png'
    ]
  },
  {
    id: 2,
    titleKey: 'argentumTitle' as TranslationKey,
    descriptionKey: 'argentumDesc' as TranslationKey,
    detailedDescriptionKey: 'argentumDetailDesc' as TranslationKey,
    featuresKey: 'argentumFeatures' as TranslationKey,
    challengesKey: 'argentumChallenges' as TranslationKey,
    learningsKey: 'argentumLearnings' as TranslationKey,
    subtitle: "Real-time collaborative platform for seamless team communication",
    tech: ["Next.js 15", "TypeScript", "Node.js", "WebSocket", "React 19", "Tailwind CSS", "Sequelize", "Redis", "Socket.io"],
    categoryKey: 'fullStack' as TranslationKey,
    statusKey: 'inDevelopment' as TranslationKey,
    github: "",
    demo: "",
    heroImage: "",
    images: [],
    isPrivate: true
  }
].map(project => ({
  ...project,
  title: t(project.titleKey) as string,
  description: t(project.descriptionKey) as string,
  detailedDescription: t(project.detailedDescriptionKey) as string,
  features: t(project.featuresKey) as string[],
  challenges: t(project.challengesKey) as string,
  learnings: t(project.learningsKey) as string,
  category: t(project.categoryKey) as string,
  status: t(project.statusKey) as string,
  isLive: project.statusKey === 'live'
}));

export default function ProjectDetail() {
  const params = useParams();
  const projectId = parseInt(params.id as string);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { t } = useTranslation();
  const projects = getProjects(t);
  const project = projects.find(p => p.id === projectId);

  useEffect(() => {
    setIsLoaded(true);
  }, [projectId]);

  const allImages = useMemo(() => {
    if (!project) return [];
    return project.heroImage 
      ? [project.heroImage, ...(project.images || [])]
      : project.images || [];
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/#projects" className="text-green-400 hover:text-green-300">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const safeProject = project!;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      {/* Back Button */}
      <BackButton href="/#projects" title="Back to Projects" />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-20 mt-20">
        {/* Badges */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-sm text-white/60">
            {safeProject.category}
          </span>
          <span className={`text-sm ${
            safeProject.isLive
              ? 'text-green-400' 
              : 'text-yellow-400'
          }`}>
            {safeProject.status}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-medium mb-6 max-w-3xl">{safeProject.title}</h1>
        
        {/* Brief Description */}
        <p className="text-base text-white/80 leading-relaxed mb-8">
          {safeProject.description}
        </p>

        {/* Main Image / Carousel */}
        <Carousel images={allImages} title={safeProject.title} />

        {/* Overview */}
        <div className="mb-20">
          <h2 className="text-2xl font-medium mb-4">{t('overview') || 'Overview'}</h2>
          <p className="text-white/80 leading-relaxed">
            {safeProject.detailedDescription}
          </p>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-2xl font-medium mb-8">{t('keyFeatures')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(safeProject.features as string[]).map((feature: string, index: number) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="mb-20">
          <h2 className="text-2xl font-medium mb-4">{t('challengesSolutions')}</h2>
          <p className="text-white/80 leading-relaxed">
            {safeProject.challenges}
          </p>
        </div>

        {/* What I Learned */}
        <div className="mb-20">
          <h2 className="text-2xl font-medium mb-4">{t('whatILearned')}</h2>
          <p className="text-white/80 leading-relaxed">
            {safeProject.learnings}
          </p>
        </div>



        {/* Repositories */}
        {!safeProject.isPrivate && (safeProject.github || safeProject.githubFrontend) && (
          <div className="mb-20">
            <h2 className="text-2xl font-medium mb-8">Repositories</h2>
            <div className="space-y-3">
              {safeProject.github && (
                <RepositoryLink
                  href={safeProject.github}
                  title="Backend Repository"
                  subtitle={safeProject.github.split('/').slice(-1)[0]}
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>}
                />
              )}
              {safeProject.githubFrontend && (
                <RepositoryLink
                  href={safeProject.githubFrontend}
                  title="Frontend Repository"
                  subtitle={safeProject.githubFrontend.split('/').slice(-1)[0]}
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>}
                />
              )}
              {!safeProject.isPrivate && safeProject.demo && (
                <RepositoryLink
                  href={safeProject.demo}
                  title="Live Demo"
                  subtitle="View the live application"
                  icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>}
                  onClick={() => {
                    if (projectId === 1) {
                      setShowDemoModal(true);
                    } else {
                      window.open(safeProject.demo, '_blank');
                    }
                  }}
                />
              )}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-20">
          <h2 className="text-2xl font-medium mb-8">{t('builtWith')}</h2>
          <div className="flex flex-wrap gap-2">
            {safeProject.tech.map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </div>
        </div>



        {/* Outro */}
        <div className="text-center py-20 border-t border-slate-800/60">
          <p className="text-white/60 mb-6">Interested in working together?</p>
          <div className="flex justify-center">
            <Button href="/#contact" variant="primary">
              Get in touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Credentials Modal */}
      <DemoCredentialsModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        title={t('demoCredentials') as string}
        note={t('demoNote') as string}
        email={t('demoEmail') as string}
        password={t('demoPassword') as string}
        onOpenDemo={() => {
          setShowDemoModal(false);
          window.open(safeProject.demo as string, '_blank');
        }}
      />
    </div>
  );
}
