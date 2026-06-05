import { CarouselNavButtonProps } from '@/app/types';

export default function CarouselNavButton({ direction, onClick, disabled, variant = 'carousel' }: CarouselNavButtonProps) {
  const isPrev = direction === 'prev';

  const carouselClasses = `absolute ${isPrev ? 'left-3 lg:left-4' : 'right-3 lg:right-4'} top-1/2 -translate-y-1/2 w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm border border-slate-700/30 flex items-center justify-center text-white lg:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-slate-600/50 hover:from-slate-900/80 hover:to-slate-800/60`;

  const standaloneClasses = `w-9 h-9 rounded-full bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm border border-slate-700/30 flex items-center justify-center text-white transition-all duration-300 hover:border-slate-600/50 hover:from-slate-900/80 hover:to-slate-800/60 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={variant === 'carousel' ? carouselClasses : standaloneClasses}
      aria-label={isPrev ? 'Previous' : 'Next'}
    >
      <svg className={variant === 'carousel' ? 'w-4 h-4 lg:w-5 lg:h-5' : 'w-4 h-4'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={isPrev ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
        />
      </svg>
    </button>
  );
}
