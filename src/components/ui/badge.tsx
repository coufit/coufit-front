// components/ui/badge.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
export type BadgeVariant = "default" | "secondary" | "destructive";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    default: "bg-gray-100 text-gray-800",
    secondary: "bg-emerald-100 text-emerald-800",
    destructive: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
