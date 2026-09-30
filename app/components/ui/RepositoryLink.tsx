import { RepositoryLinkProps } from '@/app/types';

export default function RepositoryLink({ href, title, subtitle, icon, onClick }: RepositoryLinkProps) {
  const Component = onClick ? 'button' : 'a';

  return (
    <Component
      {...(onClick ? { onClick, type: 'button' } : { href, target: '_blank', rel: 'noopener noreferrer' })}
      className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border transition-colors duration-200 group w-full text-left cursor-pointer hover:border-primary/40 hover:bg-primary/5"
    >
      <div>
        <h3 className="text-foreground font-semibold transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">{subtitle}</p>
      </div>
      <div className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0">
        {icon}
      </div>
    </Component>
  );
}
