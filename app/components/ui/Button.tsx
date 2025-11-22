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
  const baseStyles = 'flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300';

  const variants = {
    primary: 'bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg',
    secondary: 'bg-gradient-to-br from-slate-900/40 to-slate-800/30 rounded-2xl border border-slate-700/30 text-white px-4 py-2 hover:border-slate-600/50',
    ghost: 'text-white/60 hover:text-white',
    cta: 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-8 py-3.5 rounded-full h-14',
  };

  const isInternalLink = href && href.startsWith('#');
  const isCtaVariant = variant === 'cta';

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
      whileHover={isCtaVariant ? { y: -2 } : {}}
      whileTap={isCtaVariant ? { y: 0 } : {}}
    >
      {children}
    </Component>
  );
}
