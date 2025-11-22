import { CardProps } from '@/app/types';

export default function Card({ children, className = '', variant = 'default', onClick }: CardProps) {
  const variants = {
    default: 'bg-gradient-to-br from-slate-900/40 to-slate-800/30 rounded-2xl border border-slate-700/30',
    hover: 'bg-gradient-to-br from-slate-900/40 to-slate-800/30 rounded-2xl border border-slate-700/30',
  };

  return (
    <div className={`${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
