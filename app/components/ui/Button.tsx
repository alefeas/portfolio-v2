import { motion } from 'framer-motion';
import { ButtonProps } from '@/app/types';

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  target,
  rel,
  title,
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center gap-2 rounded-full font-normal transition-all duration-300';

  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-accent px-6 py-3 rounded-lg',
    secondary: 'bg-background border border-border text-foreground px-4 py-2 rounded-2xl hover:bg-primary/10 hover:text-primary hover:border-primary/30',
    ghost: 'text-muted-foreground hover:text-primary',
    cta: 'bg-primary text-primary-foreground hover:bg-accent px-6 py-2.5 rounded-full h-11 text-sm',
  };

  const isInternalLink = href && href.startsWith('#');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (isInternalLink && href) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onClick?.();
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={handleClick}
      target={target}
      rel={rel}
      title={title}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  );
}
