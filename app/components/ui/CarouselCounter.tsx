interface CarouselCounterProps {
  current: number;
  total: number;
}

export default function CarouselCounter({ current, total }: CarouselCounterProps) {
  return (
    <div className="absolute top-3 right-3 lg:top-4 lg:right-4 px-2 py-1 lg:px-3 lg:py-1.5 rounded-full bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm border border-slate-700/30 text-white text-[12px] lg:text-sm font-medium">
      {current} / {total}
    </div>
  );
}
