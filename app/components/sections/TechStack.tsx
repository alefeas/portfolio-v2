'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/app/hooks/useTranslation';
import { TranslationKey } from '@/app/lib/translations';
import { technologies } from '@/app/constants/technologies';
import { SectionHeader } from '@/app/components/ui';

export default function TechStack() {
  const { t } = useTranslation();

  return (
    <section id="tech-stack" className="py-20 px-6 max-w-6xl mx-auto">
      <SectionHeader
        icon={<svg width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
          <path d="M224 128a96 96 0 1 1-96-96 96 96 0 0 1 96 96Z" opacity=".2"/>
          <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm40-68a12 12 0 0 1 0 24h-40a12 12 0 0 1-12-12v-40a12 12 0 0 1 24 0v28h28Z"/>
        </svg>}
        badge={t('techStack')}
        title={t('technologiesIWorkWith')}
        description={t('techStackDescFull')}
        highlightText={t('scalable')}
      />

      {/* Tech Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        {technologies.map((category) => (
          <div
            key={category.category}
            className="space-y-6 pb-8 sm:pb-12"
          >
            {/* Category Title */}
            <div className="text-center">
              <h3 className="heading-4 text-white mb-2">{t(category.category.toLowerCase() as TranslationKey)}</h3>
              <div className="w-8 h-px bg-green-500/60 mx-auto"></div>
            </div>
            
            {/* Tech Grid */}
            <div className="grid grid-cols-2 gap-5">
              {category.techs.map((tech) => (
                <div
                  key={tech.name}
                  className="group relative"
                >
                  {/* Subtle outer glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/0 to-green-400/0 group-hover:from-green-500/20 group-hover:to-green-400/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100"
                       style={{ transition: "opacity 0.2s ease-out" }} />
                  
                  <motion.div
                    className="relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900/40 to-slate-800/30 rounded-2xl border border-slate-700/30 cursor-pointer overflow-hidden backdrop-blur-sm shadow-lg h-28 group-hover:border-green-500/60 group-hover:shadow-green-500/10"
                    whileHover={{ 
                      y: -3, 
                      scale: 1.02,
                      transition: { duration: 0.1, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-400/3 opacity-0 group-hover:opacity-100 rounded-2xl" 
                         style={{ transition: "opacity 0.1s ease-out" }} />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full rounded-2xl"
                         style={{ transition: "transform 0.8s ease-out" }} />
                    
                    {/* Logo */}
                    <div className="w-12 h-12 mb-2 flex items-center justify-center relative z-10">
                      <img 
                        src={tech.logo} 
                        alt={tech.name}
                        className="w-full h-full object-contain"
                        style={{ 
                          transition: "all 0.2s ease-out",
                          filter: "brightness(0) invert(1)",
                        }}
                      />
                    </div>
                    
                    {/* Tech Name */}
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-white text-center relative z-10 tracking-wide whitespace-nowrap"
                          style={{ transition: "color 0.1s ease-out" }}>
                      {tech.name}
                    </span>
                    
                    {/* Bottom accent line with enhanced glow */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-green-500 to-green-400 group-hover:w-12 group-hover:shadow-[0_0_8px_rgba(34,197,94,0.6)] rounded-full"
                         style={{ transition: "all 0.2s ease-out" }} />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}