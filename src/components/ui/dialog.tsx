// components/ui/dialog.tsx
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent: React.FC<
  React.ComponentProps<typeof DialogPrimitive.Content>
> = ({ className = "", children, ...props }) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
    <DialogPrimitive.Content
      className={cn(
        "fixed top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg",
        className
      )}
      {...props}
    >
      <DialogPrimitive.Close className="absolute top-4 right-4 focus:outline-none">
        <X className="w-5 h-5 text-gray-400" />
      </DialogPrimitive.Close>
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => (
  <div className={cn("flex flex-col space-y-1.5 p-0", className)} {...props} />
);

export const DialogTitle: React.FC<
  React.ComponentProps<typeof DialogPrimitive.Title>
> = ({ className = "", ...props }) => (
  <DialogPrimitive.Title
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
);

export const DialogDescription: React.FC<
  React.ComponentProps<typeof DialogPrimitive.Description>
> = ({ className = "", ...props }) => (
  <DialogPrimitive.Description
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
);
