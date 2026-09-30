import { StatusDotProps } from '@/app/types';

export default function StatusDot({ className = '' }: StatusDotProps) {
  return (
    <div className={`relative size-3 ${className}`}>
      <div className="absolute size-full animate-ping rounded-full bg-primary opacity-75"></div>
      <div className="size-full rounded-full bg-primary"></div>
    </div>
  );
}
