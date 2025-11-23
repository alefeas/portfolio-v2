import { TechTagProps } from '@/app/types';

export default function TechTag({ children }: TechTagProps) {
  return (
    <span className="px-3 py-1.5 text-sm font-normal bg-gradient-to-br from-slate-900/40 to-slate-800/30 text-slate-300 rounded-lg border border-slate-700/30 transition-all duration-300">
      {children}
    </span>
  );
}
