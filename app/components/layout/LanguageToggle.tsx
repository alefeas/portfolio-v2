'use client';

import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { getChromeScene } from '@/app/lib/animations';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();

  return (
    <div
      key={getChromeScene(pathname)}
      className="chrome-enter site-chrome fixed top-6 right-6 z-40 flex items-center gap-2 p-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border shadow-sm h-[50px]"
    >
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-sm font-normal transition-colors duration-300 ${
          language === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-primary'
        }`}
      >
        EN
      </button>
      <div className="w-px h-4 bg-primary/20"></div>
      <button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1.5 rounded-full text-sm font-normal transition-colors duration-300 ${
          language === 'es'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-primary'
        }`}
      >
        ES
      </button>
    </div>
  );
}
