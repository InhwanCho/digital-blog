import { cn } from "@/lib/utils";

export default function LinkExternal({ children, className, ...props }: React.ComponentProps<'a'>) {
  return (
    <a
      {...props}      
      className={cn('text-primary cursor-pointer transition hover:text-slate-500', className)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
