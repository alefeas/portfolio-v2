'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ColorThief from 'colorthief';
import { CarouselProps } from '@/app/types';

export default function Carousel({ images, title }: CarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dominantColor, setDominantColor] = useState<string>('rgba(0, 0, 0, 0)');

  const hasImages = images.length > 0;

  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

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
      <div className="relative group">
        <motion.div
          className="relative w-full rounded-lg overflow-hidden bg-gradient-to-br from-slate-900/40 to-slate-800/30 shadow-lg"
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-lg" />
        </motion.div>

        {/* Navigation Buttons - Only show if multiple images */}
        {images.length > 1 && (
          <>
            <motion.button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-br from-slate-900/60 to-slate-800/50 backdrop-blur-md border border-slate-600/50 text-white hover:text-green-400 hover:border-green-500/50 hover:cursor-pointer flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:shadow-lg hover:shadow-green-500/20"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-br from-slate-900/60 to-slate-800/50 backdrop-blur-md border border-slate-600/50 text-white hover:text-green-400 hover:border-green-500/50 hover:cursor-pointer flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:shadow-lg hover:shadow-green-500/20"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-green-500 w-8 shadow-lg shadow-green-500/50'
                      : 'bg-white/30 w-2 hover:bg-green-500/60'
                  }`}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
