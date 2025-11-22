'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-40 flex items-center gap-2 p-1.5 rounded-full bg-gradient-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-xl border border-slate-700/30 shadow-2xl h-[50px]">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-green-500/80 text-white'
            : 'text-white/60 hover:text-white'
        }`}
      >
        EN
      </button>
      <div className="w-px h-4 bg-white/10"></div>
      <button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'es'
            ? 'bg-green-500/80 text-white'
            : 'text-white/60 hover:text-white'
        }`}
      >
        ES
      </button>
    </div>
  );
}
