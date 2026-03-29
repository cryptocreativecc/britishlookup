"use client";

import { cn } from "@/lib/utils";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void;
  containerClassName?: string;
}

export function SearchBar({
  className,
  containerClassName,
  onSearch,
  ...props
}: SearchBarProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        type="search"
        className={cn(
          "w-full h-12 pl-11 pr-4 rounded-[var(--radius-card)] border border-border bg-white text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors",
          className
        )}
        name="q"
        placeholder="Search businesses, categories, locations…"
        onChange={(e) => onSearch?.(e.target.value)}
        {...props}
      />
    </div>
  );
}
