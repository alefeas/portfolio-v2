import { BadgeProps } from '@/app/types';

export default function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-white border-white/20',
    success: 'bg-primary-500/20 text-primary-400 border-primary-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <span className={`px-3 py-1 text-sm rounded-full border ${variants[variant]} ${className}`}>
      {label}
    </span>
  );
}
