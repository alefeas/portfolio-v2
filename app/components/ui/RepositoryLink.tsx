import { RepositoryLinkProps } from '@/app/types';

export default function RepositoryLink({ href, title, subtitle, icon, onClick }: RepositoryLinkProps) {
  const Component = onClick ? 'button' : 'a';

  return (
    <Component
      {...(onClick ? { onClick, type: 'button' } : { href, target: '_blank', rel: 'noopener noreferrer' })}
      className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 transition-all duration-300 group w-full text-left cursor-pointer hover:border-slate-600/50"
    >
      <div>
        <h3 className="text-white font-medium transition-colors">{title}</h3>
        <p className="text-sm text-white/60">{subtitle}</p>
      </div>
      <div className="text-white/60 group-hover:text-green-400 transition-colors flex-shrink-0">
        {icon}
      </div>
    </Component>
  );
}
