'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { floatingNavItems, getNavIcon } from '@/app/constants/floatingNav';

export default function FloatingNav() {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = floatingNavItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setSelectedIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-1/2 z-40 transform -translate-x-1/2 flex items-center">
      <ul className="mx-auto w-max p-1 flex items-center gap-4 bg-gradient-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-full shadow-2xl">
        {floatingNavItems.map((item, index) => (
          <li key={item.id} className="relative">
            <a
              href={`#${item.id}`}
              className="flex items-center justify-center relative cursor-pointer rounded-full h-10 w-12 text-white/60 hover:text-white"
              onMouseEnter={() => {
                setHoveredLabel(item.label);
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                setHoveredLabel(null);
                setHoveredIndex(null);
              }}
            >
              {getNavIcon(item.icon)}
              {selectedIndex === index && (
                <motion.div 
                  className="absolute bottom-[3px] size-[3.5px] rounded-full bg-green-500 shadow-lg shadow-green-500/50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </a>
            <AnimatePresence>
              {hoveredIndex === index && hoveredLabel && (
                <motion.div
                  className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-slate-900/40 to-slate-800/30 text-white px-6 py-2 rounded-full text-sm font-medium shadow-2xl whitespace-nowrap border border-slate-700/30"
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
                    {hoveredLabel}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </div>
  );
}