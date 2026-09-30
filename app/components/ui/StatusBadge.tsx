import { motion } from 'framer-motion';
import StatusDot from './StatusDot';
import { StatusBadgeProps } from '@/app/types';

export default function StatusBadge({ children }: StatusBadgeProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.25, delay: 0, ease: "easeOut" }}
      className="flex w-fit items-center rounded-full gap-3 py-2 pl-4 pr-5 bg-background border border-border"
    >
      <StatusDot />
      <h3 className="text-sm text-primary font-semibold">
        {children}
      </h3>
    </motion.div>
  );
}
