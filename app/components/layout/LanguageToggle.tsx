'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-6 right-6 z-40 flex items-center gap-2 p-1 rounded-full bg-black/90 backdrop-blur-xl border border-white/20 shadow-2xl"
    >
      <motion.button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-green-500/80 text-white'
            : 'text-white/60 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        EN
      </motion.button>
      <div className="w-px h-4 bg-white/10"></div>
      <motion.button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'es'
            ? 'bg-green-500/80 text-white'
            : 'text-white/60 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ES
      </motion.button>
    </motion.div>
  );
}
