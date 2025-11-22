'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from '@/app/hooks/useTranslation';
import { TranslationKey } from '@/app/lib/translations';
import ColorThief from 'colorthief';

type Project = {
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

const getProjects = (t: (key: TranslationKey) => string | string[]): Project[] => [
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [dominantColor, setDominantColor] = useState<string>('rgba(0, 0, 0, 0)');
  const emailTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const passwordTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
  const hasImages = allImages.length > 0;

  useEffect(() => {
    const extractColor = async () => {
      if (allImages && allImages[currentImageIndex]) {
        try {
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);
            setDominantColor(`rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.3)`);
          };
          img.src = allImages[currentImageIndex];
        } catch (error) {
          console.error('Error extracting color:', error);
        }
      }
    };
    extractColor();
  }, [currentImageIndex, allImages]);

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
  
  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };
  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

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
      <Link
        href="/#projects"
        className="fixed top-6 left-6 z-50 flex items-center justify-center gap-2 px-4 py-2 h-[50px] rounded-full bg-gradient-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-xl border border-slate-700/30 text-white/60 hover:text-white transition-colors duration-300 shadow-2xl"
        title="Back to Projects"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Back</span>
      </Link>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-20 mt-20">
        {/* Badges */}
        <div className="flex items-center gap-3 mb-8">
          <span className="px-3 py-1 text-sm bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20">
            {safeProject.category}
          </span>
          <span className={`px-3 py-1 text-sm rounded-full border ${
            safeProject.isLive
              ? 'bg-green-500/20 text-green-400 border-green-500/30' 
              : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
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
        {hasImages && (
          <div className="mb-20">
            <div className="relative group">
              <motion.div
                className="relative w-full rounded-lg overflow-hidden bg-gradient-to-br from-slate-900/40 to-slate-800/30"
                style={{ aspectRatio: '2/1' }}
                initial={{ boxShadow: `0 25px 0px 0px ${dominantColor}` }}
                animate={{ boxShadow: `0 25px 50px -12px ${dominantColor}` }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={allImages[currentImageIndex]}
                    alt={`${safeProject.title} - Image ${currentImageIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-lg" />
              </motion.div>

              {/* Navigation Buttons - Only show if multiple images */}
              {allImages.length > 1 && (
                <>
                  <motion.button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gradient-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-sm border border-slate-700/30 text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>

                  <motion.button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gradient-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-sm border border-slate-700/30 text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>

                  {/* Dots Indicator */}
                  <div className="flex justify-center gap-2 mt-4">
                    {allImages.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-green-500 w-8 shadow-lg shadow-green-500/50'
                            : 'bg-white/30 w-2 hover:bg-green-500/60'
                        }`}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

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
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 transition-all duration-300"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-white/90">{feature}</span>
              </div>
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
                <a
                  href={safeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 transition-all duration-300 group"
                >
                  <div>
                    <h3 className="text-white font-medium transition-colors">Backend Repository</h3>
                    <p className="text-sm text-white/60">{safeProject.github.split('/').slice(-1)[0]}</p>
                  </div>
                  <svg className="w-6 h-6 text-white/60 group-hover:text-green-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
              {safeProject.githubFrontend && (
                <a
                  href={safeProject.githubFrontend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 transition-all duration-300 group"
                >
                  <div>
                    <h3 className="text-white font-medium transition-colors">Frontend Repository</h3>
                    <p className="text-sm text-white/60">{safeProject.githubFrontend.split('/').slice(-1)[0]}</p>
                  </div>
                  <svg className="w-6 h-6 text-white/60 group-hover:text-green-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
              {!safeProject.isPrivate && safeProject.demo && (
                <button
                  onClick={() => {
                    if (projectId === 1) {
                      setShowDemoModal(true);
                    } else {
                      window.open(safeProject.demo, '_blank');
                    }
                  }}
                  className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 transition-all duration-300 group w-full text-left cursor-pointer"
                >
                  <div>
                    <h3 className="text-white font-medium transition-colors">Live Demo</h3>
                    <p className="text-sm text-white/60">View the live application</p>
                  </div>
                  <svg className="w-6 h-6 text-white/60 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-20">
          <h2 className="text-2xl font-medium mb-8">{t('builtWith')}</h2>
          <div className="flex flex-wrap gap-2">
            {safeProject.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium bg-gradient-to-br from-slate-900/40 to-slate-800/30 text-slate-300 rounded-lg border border-slate-700/30 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>



        {/* Outro */}
        <div className="text-center py-20 border-t border-slate-800/60">
          <p className="text-white/60 mb-6">Interested in working together?</p>
          <Link href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-green-700/80 hover:bg-green-600/90 text-white rounded-lg transition-all duration-300 text-sm font-medium">
            Get in touch
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Demo Credentials Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDemoModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-lg bg-gradient-to-br from-slate-900/80 to-slate-800/70 border border-slate-700/50 p-6 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">{t('demoCredentials')}</h3>
                <button
                  onClick={() => setShowDemoModal(false)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Note */}
              <p className="text-sm text-slate-300 mb-6">{t('demoNote')}</p>

              {/* Credentials */}
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Email:</p>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 group">
                    <p className="text-sm font-mono text-slate-200 select-all cursor-text">{t('demoEmail')}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <AnimatePresence>
                        {copiedEmail && (
                          <motion.span
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            className="text-xs text-green-400 font-medium whitespace-nowrap"
                          >
                            Copied!
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(t('demoEmail') as string);
                          setCopiedEmail(true);
                          setCopiedPassword(false);
                          if (emailTimeoutRef.current) {
                            clearTimeout(emailTimeoutRef.current);
                          }
                          emailTimeoutRef.current = setTimeout(() => {
                            setCopiedEmail(false);
                          }, 2000);
                        }}
                        className="text-slate-400 hover:text-green-400 transition-colors cursor-pointer flex-shrink-0"
                        title="Copy to clipboard"
                      >
                        {copiedEmail ? (
                          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-400 mb-1">Password:</p>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 group">
                    <p className="text-sm font-mono text-slate-200 select-all cursor-text">{t('demoPassword')}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <AnimatePresence>
                        {copiedPassword && (
                          <motion.span
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            className="text-xs text-green-400 font-medium whitespace-nowrap"
                          >
                            Copied!
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(t('demoPassword') as string);
                          setCopiedPassword(true);
                          setCopiedEmail(false);
                          if (passwordTimeoutRef.current) {
                            clearTimeout(passwordTimeoutRef.current);
                          }
                          passwordTimeoutRef.current = setTimeout(() => {
                            setCopiedPassword(false);
                          }, 2000);
                        }}
                        className="text-slate-400 hover:text-green-400 transition-colors cursor-pointer flex-shrink-0"
                        title="Copy to clipboard"
                      >
                        {copiedPassword ? (
                          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  window.open(safeProject.demo as string, '_blank');
                }}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors duration-300 font-medium text-sm cursor-pointer"
              >
                Open Live Demo
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
