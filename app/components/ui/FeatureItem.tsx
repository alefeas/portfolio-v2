import { FeatureItemProps } from '@/app/types';

export default function FeatureItem({ children }: FeatureItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-background border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors duration-200">
      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
      <span className="text-foreground">{children}</span>
    </div>
  );
}
