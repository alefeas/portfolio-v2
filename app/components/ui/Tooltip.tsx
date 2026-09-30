'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { TooltipProps } from '@/app/types';

export default function Tooltip({ label, children, isVisible }: TooltipProps) {
  const childrenRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isVisible && childrenRef.current) {
      const rect = childrenRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + rect.height + 16,
        left: rect.left + rect.width / 2,
      });
    }
  }, [isVisible]);

  const tooltipContent = isVisible && (
    <motion.div
      className="fixed z-50 bg-background text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-border whitespace-nowrap"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      initial={{ opacity: 0, y: 10, scale: 0.8, x: '-50%' }}
      animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
      exit={{ opacity: 0, y: 10, scale: 0.8, x: '-50%' }}
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
  );

  return (
    <>
      <div ref={childrenRef}>
        {children}
      </div>
      {mounted && createPortal(
        <AnimatePresence>
          {tooltipContent}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
