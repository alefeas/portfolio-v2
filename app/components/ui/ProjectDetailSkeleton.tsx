'use client';

import { motion } from 'framer-motion';

export default function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen text-white">
      {/* Back Button Skeleton */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
        <div className="h-10 w-32 bg-slate-700/30 rounded animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 mt-16 md:mt-20">
        {/* Badges */}
        <div className="flex items-center gap-2 md:gap-3 mb-6 flex-wrap">
          <div className="h-8 w-24 bg-slate-700/30 rounded-full animate-pulse" />
          <div className="h-8 w-20 bg-slate-700/30 rounded-full animate-pulse" />
        </div>

        {/* Title */}
        <div className="mb-4">
          <div className="h-12 w-3/4 bg-slate-700/30 rounded animate-pulse" />
        </div>

        {/* Subtitle */}
        <div className="mb-8 md:mb-12 space-y-2">
          <div className="h-4 w-full bg-slate-700/30 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-slate-700/30 rounded animate-pulse" />
        </div>

        {/* Carousel Skeleton */}
        <div className="mb-20">
          <div className="w-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900/40 to-slate-800/30" style={{ aspectRatio: '2/1' }}>
            <div className="w-full h-full bg-slate-700/30 animate-pulse" />
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-6 w-40 bg-slate-700/30 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-700/30 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-slate-700/30 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
