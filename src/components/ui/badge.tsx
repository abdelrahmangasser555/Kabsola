import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-red-50 dark:bg-red-950/50",
        warning:
          "border-yellow-500/50 text-yellow-600 dark:text-yellow-500 dark:border-yellow-500/50 [&>svg]:text-yellow-600 bg-yellow-50 dark:bg-yellow-950/50",
        info: "border-blue-500/50 text-blue-600 dark:text-blue-500 dark:border-blue-500/50 [&>svg]:text-blue-600 bg-blue-50 dark:bg-blue-950/50",
        success:
          "border-green-500/50 text-green-600 dark:text-green-500 dark:border-green-500/50 [&>svg]:text-green-600 bg-green-50 dark:bg-green-950/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
