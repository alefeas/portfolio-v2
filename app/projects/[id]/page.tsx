'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useMemo, lazy, Suspense } from 'react';
import { useTranslation } from '@/app/hooks/useTranslation';
import { FeatureItem, TechTag, RepositoryLink, Carousel, DemoCredentialsModal } from '@/app/components/ui';
import { getProjects } from '@/app/constants/projects';

const BackButton = lazy(() => import('@/app/components/ui/BackButton'));

export default function ProjectDetail() {
  const params = useParams();
  const projectId = parseInt(params.id as string);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { t } = useTranslation();
  
  const projects = useMemo(() => getProjects(t), [t]);
  const project = useMemo(() => projects.find(p => p.id === projectId), [projects, projectId]);

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
          <h1 className="text-4xl font-semibold text-white mb-4">{t('projectNotFound')}</h1>
          <Link href="/#projects" className="text-green-400 hover:text-green-300">
            {t('backToProjects')}
          </Link>
        </div>
      </div>
    );
  }

  const safeProject = project!;

  return (
    <div className="min-h-screen text-white">
      {/* Back Button */}
      <Suspense fallback={null}>
        <BackButton href="/#projects" title="Back to Projects" />
      </Suspense>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 mt-16 md:mt-20">
        {/* Badges */}
        <div className="flex items-center gap-2 md:gap-3 mb-6 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-gradient-to-br from-slate-900/40 to-slate-800/30 text-xs text-white/60 border border-slate-700/30">
            {safeProject.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs border ${
            safeProject.isLive
              ? 'bg-green-500/10 text-green-400 border-green-500/30' 
              : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
          }`}>
            {safeProject.status}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-4 leading-tight text-3xl sm:text-3xl md:text-4xl font-bold">{safeProject.title}</h1>
        
        {/* Subtitle */}
        <p className="text-base text-white/60 leading-relaxed mb-8 md:mb-12">
          {safeProject.description}
        </p>

        {/* Main Image / Carousel */}
        <Carousel images={allImages} title={safeProject.title} />

        {/* Two Column Layout - Starts after Carousel */}
        <div className="flex justify-between gap-8 mt-2 md:mt-4">
          {/* Right: Section Navigator */}
          <aside className="hidden lg:block w-48 flex-shrink-0 order-2">
            <div className="sticky top-32 space-y-2 mt-8 max-h-[calc(100vh-200px)] overflow-y-scroll pr-2">
              <h3 className="text-sm font-semibold text-white mb-4">Sections</h3>
              <nav className="space-y-1">
                <a href="#overview" className="block text-sm text-white/60 hover:text-white transition-colors">Overview</a>
                {(safeProject.features as string[]).length > 0 && (
                  <a href="#features" className="block text-sm text-white/60 hover:text-white transition-colors">Key Features</a>
                )}
                <a href="#challenges" className="block text-sm text-white/60 hover:text-white transition-colors">Challenges</a>
                <a href="#learnings" className="block text-sm text-white/60 hover:text-white transition-colors">What I Learned</a>
                {!safeProject.isPrivate && (safeProject.github || safeProject.githubFrontend) && (
                  <a href="#repositories" className="block text-sm text-white/60 hover:text-white transition-colors">Repositories</a>
                )}
                <a href="#tech" className="block text-sm text-white/60 hover:text-white transition-colors">Built With</a>
              </nav>
            </div>
          </aside>

          {/* Left: Main Content */}
          <div className="flex-1 max-w-3xl order-1">



        {/* Overview */}
        <div className="mb-6 md:mb-8 pt-4 md:pt-6" id="overview">
          <h2 className="text-2xl font-semibold mb-3">{t('overview') || 'Overview'}</h2>
          <p className="text-base text-white/80 leading-relaxed">
            {safeProject.detailedDescription}
          </p>
        </div>

        {/* Features */}
        <div className="mb-6 md:mb-8 pt-4 md:pt-6" id="features">
          <h2 className="text-2xl font-semibold mb-4 md:mb-5">{t('keyFeatures')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {(safeProject.features as string[]).map((feature: string, index: number) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="mb-6 md:mb-8 pt-4 md:pt-6" id="challenges">
          <h2 className="text-2xl font-semibold mb-3">{t('challengesSolutions')}</h2>
          <p className="text-base text-white/80 leading-relaxed">
            {safeProject.challenges}
          </p>
        </div>

        {/* What I Learned */}
        <div className="mb-6 md:mb-8 pt-4 md:pt-6" id="learnings">
          <h2 className="text-2xl font-semibold mb-3">{t('whatILearned')}</h2>
          <p className="text-base text-white/80 leading-relaxed">
            {safeProject.learnings}
          </p>
        </div>



        {/* Repositories */}
        {!safeProject.isPrivate && (safeProject.github || safeProject.githubFrontend) && (
          <div className="mb-6 md:mb-8 pt-4 md:pt-6" id="repositories">
            <h2 className="text-2xl font-semibold mb-4 md:mb-5">{t('repositories')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {safeProject.github && (
                <RepositoryLink
                  href={safeProject.github}
                  title={t('backendRepository') as string}
                  subtitle={safeProject.github.split('/').slice(-1)[0]}
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>}
                />
              )}
              {safeProject.githubFrontend && (
                <RepositoryLink
                  href={safeProject.githubFrontend}
                  title={t('frontendRepository') as string}
                  subtitle={safeProject.githubFrontend.split('/').slice(-1)[0]}
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>}
                />
              )}
              {!safeProject.isPrivate && safeProject.demo && (
                <RepositoryLink
                  href={safeProject.demo}
                  title={t('liveDemo') as string}
                  subtitle={t('viewLiveApplication') as string}
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
        <div className="mb-6 md:mb-8 pt-4 md:pt-6" id="tech">
          <h2 className="text-2xl font-semibold mb-4 md:mb-5">{t('builtWith')}</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {safeProject.tech.map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </div>
        </div>
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
