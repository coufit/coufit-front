"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full bg-white border border-gray-200 rounded-xl py-2 px-4 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
