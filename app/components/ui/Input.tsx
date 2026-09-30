import { InputProps } from '@/app/types';

export default function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <input
        {...props}
        className="w-full px-4 py-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none transition-colors duration-200"
      />
      {label && <p className="text-sm text-muted-foreground mt-2 ml-1">{label}</p>}
    </div>
  );
}
