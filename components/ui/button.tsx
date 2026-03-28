import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand text-white hover:bg-brand-dark",
        outline: "border-2 border-brand text-brand hover:bg-brand hover:text-white",
        ghost: "text-brand hover:bg-brand-light",
        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-[var(--radius-btn)]",
        md: "h-11 px-6 text-sm rounded-[var(--radius-btn)]",
        lg: "h-12 px-8 text-base rounded-[var(--radius-btn)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { buttonVariants };
