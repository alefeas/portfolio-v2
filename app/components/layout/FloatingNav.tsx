'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { floatingNavItems, getNavIcon } from '@/app/constants/floatingNav';
import { Tooltip } from '@/app/components/ui';

export default function FloatingNav() {
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

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="site-chrome hidden md:fixed md:top-6 md:left-1/2 z-40 md:-translate-x-1/2 md:block"
    >
      <div className="chrome-enter">
      <ul className="mx-auto w-max p-1 flex items-center gap-4 bg-background/90 backdrop-blur-md border border-border rounded-full shadow-sm">
        {floatingNavItems.map((item, index) => (
          <li key={item.id} className="relative">
            <Tooltip label={item.label} isVisible={hoveredIndex === index}>
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                aria-label={`Go to ${item.label}`}
                className="flex items-center justify-center relative cursor-pointer rounded-full h-10 w-12 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-300"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {getNavIcon(item.icon)}
                {selectedIndex === index && (
                  <motion.div 
                    className="absolute bottom-[3px] size-[3.5px] rounded-full bg-primary"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </button>
            </Tooltip>
          </li>
        ))}
      </ul>
      </div>
    </nav>
  );
}
