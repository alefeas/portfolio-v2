interface CarouselCounterProps {
  current: number;
  total: number;
}

export default function CarouselCounter({ current, total }: CarouselCounterProps) {
  return (
    <div className="absolute top-3 right-3 lg:top-4 lg:right-4 px-2 py-1 lg:px-3 lg:py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border text-foreground text-[12px] lg:text-sm font-medium">
      {current} / {total}
    </div>
  );
}
