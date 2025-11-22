import { InputProps } from '@/app/types';

export default function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <input
        {...props}
        className="w-full px-4 py-3 bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 rounded-xl text-white placeholder-slate-400 focus:border-green-500/50 focus:outline-none transition-all duration-300"
      />
      {label && <p className="text-xs text-slate-500 mt-2 ml-1">{label}</p>}
    </div>
  );
}
