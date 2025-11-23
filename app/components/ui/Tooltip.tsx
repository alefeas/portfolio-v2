import { motion } from 'framer-motion';
import { TooltipProps } from '@/app/types';

export default function Tooltip({ label, children, isVisible }: TooltipProps) {
  return (
    <>
      {children}
      {isVisible && (
        <motion.div
          className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-slate-900/40 to-slate-800/30 text-white px-4 py-2 rounded-full text-sm font-normal shadow-2xl border border-slate-700/30 whitespace-nowrap"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.span
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="block"
          >
            {label}
          </motion.span>
        </motion.div>
      )}
    </>
  );
}
