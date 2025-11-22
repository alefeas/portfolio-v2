import { motion } from 'framer-motion';
import StatusDot from './StatusDot';
import { StatusBadgeProps } from '@/app/types';

export default function StatusBadge({ children }: StatusBadgeProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.25, delay: 0, ease: "easeOut" }}
      className="flex w-fit items-center rounded-full gap-3 py-2 pl-4 pr-5 bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 backdrop-blur-xl"
    >
      <StatusDot />
      <h3 className="text-sm text-green-200 font-medium">
        {children}
      </h3>
    </motion.div>
  );
}
