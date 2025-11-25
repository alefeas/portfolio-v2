'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import { StatusDot, SectionHeader, Card } from '@/app/components/ui';

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
      <SectionHeader
        icon={<svg width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
          <path d="M188 88a27.75 27.75 0 0 0-12 2.71V60a28 28 0 0 0-41.36-24.6A28 28 0 0 0 80 44v6.71A27.75 27.75 0 0 0 68 48a28 28 0 0 0-28 28v76a88 88 0 0 0 176 0v-36a28 28 0 0 0-28-28m12 64a72 72 0 0 1-144 0V76a12 12 0 0 1 24 0v44a8 8 0 0 0 16 0V44a12 12 0 0 1 24 0v68a8 8 0 0 0 16 0V60a12 12 0 0 1 24 0v68.67A48.08 48.08 0 0 0 120 176a8 8 0 0 0 16 0a32 32 0 0 1 32-32a8 8 0 0 0 8-8v-20a12 12 0 0 1 24 0Z"/>
        </svg>}
        badge={t('aboutMe')}
        title={t('getToKnowMe')}
        description={t('getToKnowDesc')}
        highlightText={t('meaningful')}
      />

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        {/* Image */}
        <div className="relative w-full max-w-2xl lg:max-w-sm flex-shrink-0">
          {/* Mobile: Square image */}
          <div className="lg:hidden aspect-square rounded-2xl overflow-hidden">
            <img 
              src="/profile-v2.jpeg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Desktop: Vertical image */}
          <div className="hidden lg:block aspect-[3/4] rounded-2xl overflow-hidden">
            <img 
              src="/profile-v2.jpeg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full max-w-2xl">
          <div className="space-y-8">
            {/* Bio */}
            <div>
              <h3 className="heading-4 text-white mb-3">{t('whoIAm')}</h3>
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
            <Card className="p-6">
              <h4 className="heading-5 text-white mb-2 flex items-center gap-2">
                <StatusDot />
                {t('currentlyLearning')}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {t('expandingKnowledge')} <span className="text-green-400 font-medium">{t('cloudTech')}</span>, 
                <span className="text-green-400 font-medium"> {t('microservices')}</span>, {t('and')} 
                <span className="text-green-400 font-medium"> {t('databaseOpt')}</span> {t('stayingCurrent')}.
              </p>
            </Card>

            {/* Skills highlight */}
            <div>
              <h4 className="heading-5 text-white mb-2">{t('whatIBest')}</h4>
              <div className="space-y-3">
                {[
                  t('fullStackWeb'),
                  t('databaseDesign'),
                  t('apiDev'),
                  t('uiUx')
                ].map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-slate-300 text-sm">{skill}</span>
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