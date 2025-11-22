'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/app/hooks/useTranslation';
import { TranslationKey } from '@/app/lib/translations';

const technologies = [
  {
    category: "Frontend",
    techs: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }
    ]
  },
  {
    category: "Backend",
    techs: [
      { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
      { name: "ASP.NET", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
      { name: "PHP (Laravel)", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" }
    ]
  },
  {
    category: "Databases",
    techs: [
      { name: "Oracle", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
      { name: "PL/SQL", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/oracle/oracle-original.svg" },
      { name: "SQL Server", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
    ]
  },
  {
    category: "Tools",
    techs: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" }
    ]
  }
];

export default function TechStack() {
  const { t } = useTranslation();

  return (
    <section id="tech-stack" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section Badge */}
      <div className="mb-8">
        <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-950/55 px-4 py-2 text-emerald-300">
          <svg width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
            <path d="M224 128a96 96 0 1 1-96-96 96 96 0 0 1 96 96Z" opacity=".2"/>
            <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm40-68a12 12 0 0 1 0 24h-40a12 12 0 0 1-12-12v-40a12 12 0 0 1 24 0v28h28Z"/>
          </svg>
          <h1 className="text-sm font-medium tracking-wide max-sm:text-xs">{t('techStack')}</h1>
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-3xl font-medium text-white mb-3">{t('technologiesIWorkWith')}</h2>
        <p className="text-slate-400 text-base max-w-2xl">
          {t('techStackDescFull')}
          <span className="text-green-400 font-medium"> {t('scalable')}</span> {t('and')} 
          <span className="text-green-400 font-medium"> {t('efficient')}</span> {t('applicationsText')}
        </p>
      </div>

      {/* Tech Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {technologies.map((category, categoryIndex) => (
          <div
            key={category.category}
            className="space-y-6"
          >
            {/* Category Title */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">{t(category.category.toLowerCase() as TranslationKey)}</h3>
              <div className="w-8 h-px bg-green-500/60 mx-auto"></div>
            </div>
            
            {/* Tech Grid */}
            <div className="grid grid-cols-2 gap-5">
              {category.techs.map((tech, techIndex) => (
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
                        className="w-full h-full object-contain filter brightness-75 group-hover:brightness-110 group-hover:drop-shadow-[0_0_12px_rgba(34,197,94,0.4)] group-hover:saturate-110"
                        style={{ transition: "all 0.1s ease-out" }}
                      />
                    </div>
                    
                    {/* Tech Name */}
                    <span className="text-sm font-semibold text-slate-400 group-hover:text-white text-center relative z-10 tracking-wide"
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