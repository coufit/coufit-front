"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  defaultValue?: string;
};

export const Tabs: React.FC<TabsProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn("space-y-4", className)} {...props}>
    {children}
  </div>
);

export type TabsListProps = React.HTMLAttributes<HTMLDivElement>;
export const TabsList: React.FC<TabsListProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn("flex space-x-2", className)} {...props}>
    {children}
  </div>
);

export type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};
export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  children,
  className,
  ...props
}) => (
  <button
    className={cn(
      "flex-1 py-2 text-center font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
};
export const TabsContent: React.FC<TabsContentProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn("p-0", className)} {...props}>
    {children}
  </div>
);
