import { TechTagProps } from '@/app/types';

export default function TechTag({ children }: TechTagProps) {
  return (
    <span className="px-3 py-1.5 text-sm font-normal bg-muted text-muted-foreground rounded-lg border border-border transition-colors duration-200">
      {children}
    </span>
  );
}
