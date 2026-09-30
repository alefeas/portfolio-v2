import { BadgeProps } from '@/app/types';

export default function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-muted text-foreground border-border',
    success: 'bg-muted text-muted-foreground border-border',
    warning: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
    info: 'bg-accent/10 text-accent border-accent/30',
  };

  return (
    <span className={`px-3 py-1 text-sm rounded-full border ${variants[variant]} ${className}`}>
      {label}
    </span>
  );
}
