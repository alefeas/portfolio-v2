'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BackButtonProps } from '@/app/types';

export default function BackButton({ href, title = "Back" }: BackButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // If href starts with #, scroll to element
    if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Otherwise navigate using router
      router.push(href);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed top-6 left-6 z-50 h-[50px] px-4 py-2 flex items-center gap-2 rounded-full bg-gradient-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-xl border border-slate-700/30 shadow-2xl text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
      title={title}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span className="text-sm font-medium">Back</span>
    </motion.button>
  );
}
