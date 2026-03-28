import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-card)] border border-border/50 overflow-hidden transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={cn("p-5 pb-0", className)} {...props} />;
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardFooter({ className, ...props }: CardProps) {
  return (
    <div className={cn("p-5 pt-0 flex items-center", className)} {...props} />
  );
}
