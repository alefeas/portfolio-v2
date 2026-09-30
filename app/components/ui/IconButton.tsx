import { IconButtonProps } from '@/app/types';
import Link from 'next/link';

export default function IconButton({ icon, label, href, target = '_blank', className = '', onMouseEnter, onMouseLeave }: IconButtonProps & { onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <Link
      href={href}
      target={target}
      rel="noopener noreferrer"
      className={`flex items-center justify-center w-11 h-11 bg-background border border-border rounded-full text-muted-foreground no-underline relative overflow-visible transition-all duration-150 hover:text-primary hover:border-primary/40 hover:bg-primary/5 ${className}`}
      title={label}
      aria-label={label}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {icon}
    </Link>
  );
}
