'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/app/hooks/useTranslation';
import { TranslationKey } from '@/app/lib/translations';

const getProjects = (t: (key: TranslationKey) => string | string[]) => [
  {
    id: 1,
    titleKey: 'paytoTitle' as TranslationKey,
    descriptionKey: 'paytoDesc' as TranslationKey,
    detailedDescriptionKey: 'paytoDetailDesc' as TranslationKey,
    featuresKey: 'paytoFeatures' as TranslationKey,
    challengesKey: 'paytoChallenges' as TranslationKey,
    learningsKey: 'paytoLearnings' as TranslationKey,
    tech: ["Laravel 12", "PHP 8.2", "Next.js 15", "React 19", "TypeScript", "MySQL", "Tailwind CSS", "shadcn/ui", "Recharts", "Sanctum", "Pest PHP"],
    categoryKey: 'fullStack' as TranslationKey,
    statusKey: 'live' as TranslationKey,
    github: "https://github.com/alefeas/payto-backend",
    demo: "https://payto.vercel.app",
    heroImage: "/projects/payto/hero.png"
  },
  {
    id: 2,
    titleKey: 'argentumTitle' as TranslationKey,
    descriptionKey: 'argentumDesc' as TranslationKey,
    detailedDescriptionKey: 'argentumDetailDesc' as TranslationKey,
    featuresKey: 'argentumFeatures' as TranslationKey,
    challengesKey: 'argentumChallenges' as TranslationKey,
    learningsKey: 'argentumLearnings' as TranslationKey,
    tech: ["Next.js 15", "TypeScript", "Node.js", "WebSocket", "React 19", "Tailwind CSS", "Sequelize", "Redis", "Socket.io"],
    categoryKey: 'fullStack' as TranslationKey,
    statusKey: 'inDevelopment' as TranslationKey,
    github: "https://github.com/argentumonline/web",
    demo: "https://argentumonline-web.vercel.app",
    heroImage: ""
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

export default function Projects() {
  const { t } = useTranslation();
  const projects = getProjects(t);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section Badge */}
      <div className="mb-8">
        <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-950/55 px-4 py-2 text-emerald-300">
          <svg width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
            <path d="M216 56h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V72a16 16 0 0 0-16-16M96 48a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm120 24v72H40V72Z"/>
          </svg>
          <h1 className="text-sm font-medium tracking-wide max-sm:text-xs">{t('projects')}</h1>
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-3xl font-medium text-white mb-3">{t('selectedWork')}</h2>
        <p className="text-slate-400 text-base max-w-2xl">
          {t('selectedWorkDesc')}
          <span className="text-green-400 font-medium"> {t('innovative')}</span> {t('digitalSolutions')}.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="group cursor-pointer space-y-6"
            onClick={() => setSelectedProject(project)}
          >
            {/* Project Image */}
            <div className="w-full bg-cover bg-center rounded-lg overflow-hidden">
              <div className="w-full aspect-[1.75] rounded-lg relative overflow-hidden bg-slate-900/40 border border-slate-800/60">
                {project.heroImage ? (
                  <img 
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900/40 flex items-center justify-center text-slate-500">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Project Info */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-sm">{project.category}</span>
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  project.isLive
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                }`}>{project.status}</span>
              </div>
              <h4 className="text-xl font-semibold leading-[1.25] text-white max-sm:text-lg">
                {project.title}
              </h4>
              <p className="text-sm text-slate-400">
                {project.description}
              </p>
              <span className="w-fit text-sm text-green-400 flex items-center">
                <span className="relative">
                  {t('readMore')}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{borderBottom: '1px dotted white', height: '1px', background: 'none'}}></span>
                </span>
                <svg className="ml-1 inline-block transition-all duration-300 group-hover:ml-2" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/80 transition-all duration-300 border border-white/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Hero Image */}
              <div className="relative h-96 overflow-hidden border-b border-slate-800/60">
                {selectedProject.heroImage ? (
                  <img 
                    src={selectedProject.heroImage}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900/40 flex items-center justify-center">
                    <svg className="w-24 h-24 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />

                
                {/* Project Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-sm bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20">
                      {selectedProject.category}
                    </span>
                    <span className={`px-3 py-1 text-sm rounded-full border ${
                      selectedProject.isLive
                        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">{selectedProject.title}</h3>
                  <p className="text-white/80 text-base leading-relaxed max-w-3xl">
                    {selectedProject.detailedDescription}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Key Features */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">{t('keyFeatures')}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 text-slate-300">
                        <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">{t('challengesSolutions')}</h4>
                  <p className="text-slate-300 leading-relaxed">{selectedProject.challenges}</p>
                </div>

                {/* What I Learned */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">{t('whatILearned')}</h4>
                  <p className="text-slate-300 leading-relaxed">{selectedProject.learnings}</p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">{t('builtWith')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium bg-slate-800/60 text-slate-300 rounded-lg border border-slate-700/40 hover:border-green-500/50 hover:bg-slate-700/60 hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/projects/${selectedProject.id}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-700/80 hover:bg-green-600/90 text-white rounded-lg transition-all duration-300 flex-1 justify-center text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('viewFullProject')}
                  </Link>
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 hover:text-white rounded-lg border border-slate-700/40 hover:border-slate-600/60 transition-all duration-300 justify-center text-sm font-medium"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    {t('code')}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}