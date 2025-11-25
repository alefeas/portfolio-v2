'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { floatingNavItems, getNavIcon } from '@/app/constants/floatingNav';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden fixed top-6 left-6 z-40">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-gradient-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-xl border border-slate-700/30 transition-colors duration-300 relative z-50 group"
        aria-label="Toggle menu"
      >
        <motion.svg
          animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M216 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h168a8 8 0 0 1 8 8ZM40 72h128a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16Zm128 112H40a8 8 0 0 0 0 16h128a8 8 0 0 0 0-16Z" />
        </motion.svg>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 left-0 w-48 bg-gradient-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-xl shadow-2xl overflow-hidden relative z-40"
          >
            <nav className="flex flex-col">
              {floatingNavItems.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-green-500/10 transition-all duration-200 border-b border-slate-700/30 last:border-b-0 relative"
                >
                  <div className="text-green-400 flex-shrink-0">
                    {getNavIcon(item.icon)}
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                  {selectedIndex === index && (
                    <motion.div 
                      className="absolute right-3 size-[3.5px] rounded-full bg-green-500 shadow-lg shadow-green-500/50"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 z-20"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
