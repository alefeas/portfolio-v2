'use client';

import Image from 'next/image';
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
        descriptionAfter={` ${t('and')} ${t('efficient')} ${t('applicationsText')}`}
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
              <h3 className="heading-4 text-foreground mb-2">{t(category.category.toLowerCase() as TranslationKey)}</h3>
              <div className="w-8 h-px bg-primary/60 mx-auto"></div>
            </div>
            
            {/* Tech Grid */}
            <div className="grid grid-cols-2 gap-5">
              {category.techs.map((tech) => (
                <div
                  key={tech.name}
                  className="group relative"
                >
                  {/* Subtle outer glow */}
                  <motion.div
                    className="relative flex flex-col items-center justify-center p-6 bg-background rounded-2xl border border-border cursor-pointer overflow-hidden h-28 group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors duration-300"
                    whileHover={{ 
                      y: -2,
                      transition: { duration: 0.15, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Logo */}
                    <div className="w-12 h-12 mb-2 flex items-center justify-center relative z-10">
                      <Image 
                        src={tech.logo} 
                        alt={tech.name}
                        width={48}
                        height={48}
                        className="object-contain"
                        style={{ 
                          transition: "all 0.2s ease-out",
                          filter: "brightness(0)",
                        }}
                      />
                    </div>
                    
                    {/* Tech Name */}
                    <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary text-center relative z-10 tracking-wide whitespace-nowrap"
                          style={{ transition: "color 0.15s ease-out" }}>
                      {tech.name}
                    </span>
                    
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-10 rounded-full"
                         style={{ transition: "width 0.2s ease-out" }} />
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
