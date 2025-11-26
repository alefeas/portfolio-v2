'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ColorThief from 'colorthief';
import { CarouselProps } from '@/app/types';

const AUTOPLAY_INTERVAL = 5000; // 5 seconds

export default function Carousel({ images, title }: CarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dominantColor, setDominantColor] = useState<string>('rgba(0, 0, 0, 0)');
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const hasImages = images.length > 0;

  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setProgress(0);
    }
  };

  // Autoplay effect
  useEffect(() => {
    if (!hasImages || isPaused) return;

    const interval = setInterval(() => {
      nextImage();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [hasImages, currentImageIndex, isPaused]);

  // Progress bar effect
  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (AUTOPLAY_INTERVAL / 50));
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isPaused]);

  useEffect(() => {
    const extractColor = async () => {
      if (images && images[currentImageIndex]) {
        try {
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);
            setDominantColor(`rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.3)`);
          };
          img.src = images[currentImageIndex];
        } catch (error) {
          console.error('Error extracting color:', error);
        }
      }
    };
    extractColor();
  }, [currentImageIndex, images]);

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
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-3xl" />
          
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700/30 rounded-b-3xl overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-green-400"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
