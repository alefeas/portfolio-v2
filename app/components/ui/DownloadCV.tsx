'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/app/hooks/useTranslation';

export default function DownloadCV() {
  const { t } = useTranslation();

  const handleDownload = () => {
    const cvFileName = t('cvFileName') as string;
    const link = document.createElement('a');
    link.href = `/resume/${cvFileName}`;
    link.download = cvFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(cvFileName);
  };

  
  return (
    <motion.button
      onClick={handleDownload}
      className="flex items-center justify-center gap-2 rounded-full font-normal transition-all duration-300 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {t('downloadCV')}
    </motion.button>
  );
}
