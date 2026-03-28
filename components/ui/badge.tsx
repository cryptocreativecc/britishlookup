import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "brand";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full transition-colors",
        {
          "bg-surface text-text": variant === "default",
          "border border-border text-text-muted": variant === "outline",
          "bg-brand-light text-brand-dark": variant === "brand",
        },
        className
      )}
      {...props}
    />
  );
}
