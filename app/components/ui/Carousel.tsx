'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarouselProps } from '@/app/types';

const AUTOPLAY_INTERVAL = 5000; // 5 seconds

export default function Carousel({ images, title }: CarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const cycleStartRef = useRef<number>(Date.now());
  const pausedElapsedRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef<boolean>(false);

  const hasImages = images.length > 0;

  const nextImage = useCallback(() => {
    if (!hasImages) return;

    setCurrentImageIndex((prev) => (prev + 1) % images.length);

    // Solo resetear timers si NO estaba pausado
    if (!isPausedRef.current) {
      cycleStartRef.current = Date.now();
      pausedElapsedRef.current = 0;
    }
  }, [hasImages]);

  // Actualizar ref cuando isPaused cambia
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Autoplay effect - control manual del intervalo
  useEffect(() => {
    if (!hasImages) return;

    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      nextImage();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hasImages, isPaused, nextImage]);

  // Handle pause/resume
  useEffect(() => {
    if (isPaused) {
      pausedElapsedRef.current = Date.now() - cycleStartRef.current;
    } else {
      // Al reanudar, reiniciar el ciclo desde cero
      cycleStartRef.current = Date.now();
      pausedElapsedRef.current = 0;
    }
  }, [isPaused]);

  // Progress bar animation
  useEffect(() => {
    if (!progressRef.current || !hasImages) return;

    let animationFrameId: number;

    const animate = () => {
      if (!progressRef.current) return;

      const elapsed = isPaused 
        ? pausedElapsedRef.current 
        : Date.now() - cycleStartRef.current;

      const progress = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
      progressRef.current.style.width = `${progress}%`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, hasImages]);

  if (!hasImages) return null;

  return (
    <div className="mb-20">
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900/40 to-slate-800/30 shadow-lg"
          style={{ aspectRatio: '2/1' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <img
                src={images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-3xl" />
          
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700/30 rounded-b-3xl overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-green-500/80 transition-none"
              style={{ width: '0%' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
