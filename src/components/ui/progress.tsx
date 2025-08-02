// components/ui/progress.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
    return (
      <div
        ref={ref}
        className={cn(
          "w-full bg-gray-200 rounded-full overflow-hidden",
          className
        )}
        {...props}
      >
        <div
          style={{ width: `${percentage}%` }}
          className="h-full bg-emerald-600"
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";
