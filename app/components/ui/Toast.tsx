'use client';

import { motion } from 'framer-motion';
import { ToastProps } from '@/app/types';

export default function Toast({ type, title, description }: ToastProps) {
  const isSuccess = type === 'success';
  const bgClass = isSuccess 
    ? 'bg-gradient-to-r from-emerald-950/60 to-green-950/60 border-green-500/40' 
    : 'bg-gradient-to-r from-red-950/60 to-rose-950/60 border-red-500/40';
  const textClass = isSuccess ? 'text-green-300' : 'text-red-300';
  const titleClass = isSuccess ? 'text-green-300' : 'text-red-300';
  const subtitleClass = isSuccess ? 'text-green-400/80' : 'text-red-400/80';
  const iconColor = isSuccess ? 'text-green-400' : 'text-red-400';

  return (
    <motion.div
      className={`fixed top-24 right-6 p-4 ${bgClass} border rounded-xl ${textClass} text-sm max-w-xs z-50`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3">
        {isSuccess ? (
          <svg className={`w-5 h-5 flex-shrink-0 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className={`w-5 h-5 flex-shrink-0 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )}
        <div>
          <p className={`font-semibold ${titleClass}`}>{title}</p>
          <p className={`text-xs ${subtitleClass}`}>{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
