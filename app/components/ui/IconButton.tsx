import { IconButtonProps } from '@/app/types';

export default function IconButton({ icon, label, href, target = '_blank', className = '', onMouseEnter, onMouseLeave }: IconButtonProps & { onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className={`flex items-center justify-center w-14 h-14 bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 rounded-full text-slate-400 no-underline relative overflow-visible transition-all duration-150 hover:text-white hover:border-slate-600/50 ${className}`}
      title={label}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {icon}
    </a>
  );
}
