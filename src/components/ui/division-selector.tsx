"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type DivisionOption = {
  value: string;
  label: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

interface DivisionSelectorProps {
  options: DivisionOption[];
  selectedDivisions: string[];
  onToggleDivision: (value: string) => void;
  error?: string | null;
}

export const DivisionSelector = ({ options, selectedDivisions, onToggleDivision, error }: DivisionSelectorProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid grid-cols-2 gap-3 pt-2",
        { "rounded-md border border-red-500/60 p-4 -mt-2": error }
      )}
      role="group"
      aria-labelledby="divisions-label" // Make sure the FormField's label has this id
    >
      {options.map(({ value, label }) => {
        const isSelected = selectedDivisions.includes(value);
        return (
          <motion.div key={value} variants={itemVariants}>
            <button
              type="button"
              onClick={() => onToggleDivision(value)}
              aria-pressed={isSelected}
              className={cn(
                "w-full text-left p-4 border rounded-md transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-foreground/50",
                "font-standard text-sm tracking-wide",
                isSelected
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent border-foreground/20 text-foreground/80 hover:border-foreground/70 hover:bg-foreground/[0.03]"
              )}
            >
              {label}
            </button>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
