'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { floatingNavItems, getNavIcon } from '@/app/constants/floatingNav';
import { Tooltip } from '@/app/components/ui';

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
            <Tooltip label={item.label} isVisible={hoveredIndex === index}>
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
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
}