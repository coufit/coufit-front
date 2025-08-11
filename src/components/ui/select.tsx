"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type SelectProps = React.HTMLAttributes<HTMLDivElement> & {
  defaultValue?: string;
};

export const Select: React.FC<SelectProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn("relative inline-block text-left", className)} {...props}>
    {children}
  </div>
);

export type SelectTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  className,
  children,
  ...props
}) => (
  <button
    className={cn(
      "w-full py-2 px-3 border border-gray-200 rounded-md flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-emerald-500",
      className
    )}
    {...props}
  >
    <span className="flex-1 text-left">{children}</span>
    <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
  </button>
);

export type SelectValueProps = React.HTMLAttributes<HTMLSpanElement>;

export const SelectValue: React.FC<SelectValueProps> = ({
  className,
  ...props
}) => <span className={cn("flex-1 text-left", className)} {...props} />;

export type SelectContentProps = React.HTMLAttributes<HTMLUListElement>;

export const SelectContent: React.FC<SelectContentProps> = ({
  className,
  children,
  ...props
}) => (
  <ul
    className={cn(
      "absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10",
      className
    )}
    {...props}
  >
    {children}
  </ul>
);

export type SelectItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
  value: string;
};

export const SelectItem: React.FC<SelectItemProps> = ({
  className,
  children,
  ...props
}) => (
  <li
    className={cn("px-3 py-2 hover:bg-gray-100 cursor-pointer", className)}
    {...props}
  >
    {children}
  </li>
);
