import { FeatureItemProps } from '@/app/types';

export default function FeatureItem({ children }: FeatureItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 transition-all duration-300">
      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
      <span className="text-white/90">{children}</span>
    </div>
  );
}
