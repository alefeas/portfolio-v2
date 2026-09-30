import { CardProps } from '@/app/types';

export default function Card({ children, className = '', variant = 'default', onClick }: CardProps) {
  const variants = {
    default: 'bg-background rounded-2xl border border-border',
    hover: 'bg-background rounded-2xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors duration-300',
  };

  return (
    <div className={`${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
