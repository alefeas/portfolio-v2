'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Hero() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <section className="relative flex h-screen flex-col gap-8 pb-32 pt-24 sm:justify-center px-6 max-w-4xl mx-auto overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Status Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="flex w-fit items-center rounded-full gap-3 py-2 pl-4 pr-5 border border-green-600/30 bg-slate-950/40 backdrop-blur-xl shadow-lg shadow-green-600/10"
      >
        <div className="relative size-3">
          <div className="absolute size-full animate-ping rounded-full bg-green-500 opacity-75"></div>
          <div className="size-full rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
        </div>
        <h3 className="text-sm text-green-200 font-medium">
          Available for projects
        </h3>
      </motion.div>

      {/* Main Title */}
      <motion.h1 
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.1] tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
      >
        Hi, I'm <span className="bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">Alejo</span>. <br /> 
        <span className="whitespace-nowrap">Building the future.</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.h2 
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-2xl leading-relaxed text-gray-300 text-lg max-sm:text-base"
      >
        <span className="text-green-500 font-medium">Passionate</span> about crafting exceptional digital experiences with modern technologies. 
        Building <span className="text-green-400 font-medium">innovative</span> solutions through clean code and continuous learning.
      </motion.h2>

      {/* Enhanced Keyboard Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex items-start text-center max-xs:flex-col gap-6"
      >
        <div className="hero-nav-board">
          {[
            { key: 'Github', href: 'https://github.com/yourusername', icon: 'github' },
            { key: 'LinkedIn', href: 'https://linkedin.com/in/yourusername/', icon: 'linkedin' },
            { key: 'Resume', href: '/resume.pdf', icon: 'resume' },
            { key: 'Email', href: 'mailto:your@email.com', icon: 'email' }
          ].map((item, index) => (
            <div 
              key={item.key}
              className="hero-nav-position"
            >
              <motion.a
                aria-label={item.key}
                className="hero-nav-key"
                target="_blank"
                href={item.href}
                onHoverStart={() => setHoveredKey(item.key)}
                onHoverEnd={() => setHoveredKey(null)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.icon === 'github' && (
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                )}
                {item.icon === 'linkedin' && (
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )}
                {item.icon === 'resume' && (
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                )}
                {item.icon === 'email' && (
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                  </svg>
                )}
                {hoveredKey === item.key && (
                  <motion.div
                    className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-xl text-white px-4 py-2 rounded-full text-sm font-medium shadow-2xl border border-white/20 whitespace-nowrap"
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
                      {item.key}
                    </motion.span>
                  </motion.div>
                )}
              </motion.a>
            </div>
          ))}
        </div>
        
        <div className="hero-cta-container">
          <motion.a
            href="#projects"
            className="hero-cta"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <span className="hero-cta-text">Explore More</span>
            <motion.div 
              className="hero-cta-arrow"
              animate={{ x: [0, 2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.div>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}