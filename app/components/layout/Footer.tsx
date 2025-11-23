'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/app/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    // Format: "Last updated by Alejo on July 18, 2025 at 5:20 PM UTC+7"
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Bangkok' // UTC+7
    };
    
    const formattedDate = date.toLocaleDateString('en-US', options);
    const timeString = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Bangkok'
    });
    
    setLastUpdated(`${t('footerLastUpdated')} ${formattedDate} at ${timeString} UTC+7`);
  }, [t]);

  return (
    <footer className="border-t border-slate-700/30">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-8">
          {/* Left: Brand Section */}
          <div className="flex-shrink-0">
            <h3 className="text-white font-semibold mb-2" style={{ fontSize: '18px' }}>Alejo Feas Matej • Developer</h3>
            <p className="text-white/60 leading-relaxed mb-4 max-w-xs text-sm">
              {t('footerDescription')}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://github.com/alefeas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                title="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/alefeas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:alfredo.feas@gmail.com"
                className="text-white/60 hover:text-white transition-colors"
                title="Email"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20,8L12,13L4,8V6H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Links Grid */}
          <div className="grid grid-cols-2 gap-12 ml-auto">
            {/* Navigation Section */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">{t('footerNavigation')}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/#hero" className="text-white/60 hover:text-white transition-colors text-sm">
                    {t('footerHome')}
                  </Link>
                </li>
                <li>
                  <Link href="/#projects" className="text-white/60 hover:text-white transition-colors text-sm">
                    {t('footerProjects')}
                  </Link>
                </li>
                <li>
                  <Link href="/#tech-stack" className="text-white/60 hover:text-white transition-colors text-sm">
                    {t('footerTechStack')}
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-white/60 hover:text-white transition-colors text-sm">
                    {t('footerContact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect Section */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">{t('footerConnect')}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/alefeas" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors text-sm">
                    {t('footerGitHub')} ↗
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/alefeas" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors text-sm">
                    {t('footerLinkedIn')} ↗
                  </a>
                </li>
                <li>
                  <a href="mailto:alfredo.feas@gmail.com" className="text-white/60 hover:text-white transition-colors text-sm">
                    {t('footerEmail')} ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
          <p>
            © {currentYear} Alejo Feas. {t('footerAllRightsReserved')}
          </p>
          <p>
            {lastUpdated}
          </p>
        </div>
      </div>
    </footer>
  );
}
