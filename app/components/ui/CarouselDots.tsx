interface CarouselDotsProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}

export default function CarouselDots({ total, current, onDotClick }: CarouselDotsProps) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`h-2.5 rounded-full transition-all ${
            index === current 
              ? 'bg-green-500 w-8' 
              : 'bg-slate-700/50 w-2.5 hover:bg-green-500/70'
          }`}
          aria-label={`Go to image ${index + 1}`}
        />
      ))}
    </div>
  );
}
