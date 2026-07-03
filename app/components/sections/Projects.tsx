'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/app/hooks/useTranslation';
import { getProjects } from '@/app/constants/projects';
import { SectionHeader, CarouselNavButton } from '@/app/components/ui';

const PAGE_SIZE = 6;

export default function Projects() {
  const { t } = useTranslation();
  const projects = getProjects(t);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const paginated = projects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, [page]);

  return (
    <section id="projects" className="py-16 md:py-20 px-4 md:px-6 max-w-6xl mx-auto">
      <SectionHeader
        icon={<svg width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
          <path d="M216 56h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V72a16 16 0 0 0-16-16M96 48a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm120 24v72H40V72Z"/>
        </svg>}
        badge={t('projects')}
        title={t('selectedWork')}
        description={t('selectedWorkDesc')}
        highlightText={t('innovative')}
      />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6">
        {paginated.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group cursor-pointer space-y-6 block"
          >
            {/* Project Image */}
            <div className="w-full bg-cover bg-center rounded-lg overflow-hidden">
              <div className="w-full aspect-[2] rounded-lg relative overflow-hidden bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30">
                {project.heroImage ? (
                  <Image 
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    className="object-cover object-top transition-all duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-900/40 to-slate-800/30 flex items-center justify-center text-slate-500">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Project Info */}
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-500 text-xs md:text-sm">{project.category}</span>
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  project.isLive
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                }`}>{project.status}</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold leading-[1.25] text-white">
                {project.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-400 line-clamp-2">
                {project.description}
              </p>
              <span className="w-fit text-xs md:text-sm text-green-400 flex items-center gap-1">
                <span className="relative">
                  {t('readMore')}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{borderBottom: '1px dotted white', height: '1px', background: 'none'}}></span>
                </span>
                <svg className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <CarouselNavButton direction="prev" onClick={() => setPage(p => p - 1)} disabled={page === 1} variant="standalone" />

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-9 h-9 rounded-full text-sm backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                n === page
                  ? 'border-green-500/50 bg-green-500/10 text-green-400'
                  : 'bg-gradient-to-br from-slate-900/60 to-slate-800/40 border-slate-700/30 text-white/60 hover:border-slate-600/50 hover:from-slate-900/80 hover:to-slate-800/60 hover:text-white'
              }`}
            >
              {n}
            </button>
          ))}

          <CarouselNavButton direction="next" onClick={() => setPage(p => p + 1)} disabled={page === totalPages} variant="standalone" />
        </div>
      )}
    </section>
  );
}
