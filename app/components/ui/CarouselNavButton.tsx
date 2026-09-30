import { CarouselNavButtonProps } from '@/app/types';

export default function CarouselNavButton({ direction, onClick, disabled, variant = 'carousel' }: CarouselNavButtonProps) {
  const isPrev = direction === 'prev';

  const carouselClasses = `absolute ${isPrev ? 'left-3 lg:left-4' : 'right-3 lg:right-4'} top-1/2 -translate-y-1/2 w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-background/90 backdrop-blur-md border border-border flex items-center justify-center text-foreground lg:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-primary/30`;

  const standaloneClasses = `w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer`;

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
