import React, { ComponentProps } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface PanelProps extends ComponentProps<typeof motion.div> {
  className?: string;
}

export const Panel = ({ children, className, ...props }: PanelProps) => {
  return (
    <motion.div
      className={cn(
        "bg-gradient-to-b from-brand-surface to-brand-canvas backdrop-blur-sm rounded-3xl shadow-2xl shadow-brand-border/40 border border-brand-border p-8 md:p-12",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
