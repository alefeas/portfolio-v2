'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/app/hooks/useTranslation';

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section Badge */}
      <div className="mb-8">
        <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-950/55 px-4 py-2 text-emerald-300">
          <svg width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
            <path d="M188 88a27.75 27.75 0 0 0-12 2.71V60a28 28 0 0 0-41.36-24.6A28 28 0 0 0 80 44v6.71A27.75 27.75 0 0 0 68 48a28 28 0 0 0-28 28v76a88 88 0 0 0 176 0v-36a28 28 0 0 0-28-28m12 64a72 72 0 0 1-144 0V76a12 12 0 0 1 24 0v44a8 8 0 0 0 16 0V44a12 12 0 0 1 24 0v68a8 8 0 0 0 16 0V60a12 12 0 0 1 24 0v68.67A48.08 48.08 0 0 0 120 176a8 8 0 0 0 16 0a32 32 0 0 1 32-32a8 8 0 0 0 8-8v-20a12 12 0 0 1 24 0Z"/>
          </svg>
          <h1 className="text-sm font-medium tracking-wide max-sm:text-xs">{t('aboutMe')}</h1>
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-3xl font-medium text-white mb-3">{t('getToKnowMe')}</h2>
        <p className="text-slate-400 text-base max-w-2xl">
          {t('getToKnowDesc')}
          <span className="text-green-400 font-medium"> {t('meaningful')}</span> {t('digitalExperiences')}.
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Image */}
        <div className="relative w-full max-w-sm flex-shrink-0">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden">
            <img 
              src="/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full max-w-lg">
          <div className="space-y-8">
            {/* Bio */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{t('whoIAm')}</h3>
              <div className="space-y-3 text-slate-300 leading-relaxed text-sm">
                <p>
                  {t('whoIAmDesc')} <span className="text-green-400 font-medium">{t('fullStackDeveloper')}</span> {t('whoIAmDesc2')}
                </p>
                <p>
                  {t('seekingOpportunity')}
                </p>
              </div>
            </div>

            {/* Current Focus */}
            <div className="p-6 bg-gradient-to-br from-slate-900/40 to-slate-800/30 rounded-2xl border border-slate-700/30">
              <h4 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                {t('currentlyLearning')}
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                {t('expandingKnowledge')} <span className="text-green-400 font-medium">{t('cloudTech')}</span>, 
                <span className="text-green-400 font-medium"> {t('microservices')}</span>, {t('and')} 
                <span className="text-green-400 font-medium"> {t('databaseOpt')}</span> {t('stayingCurrent')}.
              </p>
            </div>

            {/* Skills highlight */}
            <div>
              <h4 className="text-base font-semibold text-white mb-2">{t('whatIBest')}</h4>
              <div className="space-y-3">
                {[
                  t('fullStackWeb'),
                  t('databaseDesign'),
                  t('apiDev'),
                  t('uiUx')
                ].map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-slate-300 text-xs">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}