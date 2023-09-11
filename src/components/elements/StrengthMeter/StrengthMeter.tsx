import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

export interface StrengthMeterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: string;
}

const variants = {
  empty: { width: "0%" },
  poor: { width: "33%", backgroundColor: "#ef4444" },
  good: { width: "66%", backgroundColor: "#eab308" },
  strong: { width: "100%", backgroundColor: "#22c55e" },
};

function StrengthMeter({
  variant = "empty",
  className,
  ...props
}: StrengthMeterProps) {
  return (
    <div
      className={cn(
        "h-5 w-full border-2 rounded-lg relative overflow-hidden",
        className
      )}
      {...props}
    >
      <motion.div
        className="bg-red-500 w-8/12 h-full text-center"
        animate={variant}
        variants={variants}
        data-testid="indicator-element"
      />
      <p
        className={`absolute left-1/2 translate-x-[-50%] top-0 capitalize text-xs font-bold ${
          variant === "poor" ? "text-black" : "text-white"
        }`}
      >
        {variant}
      </p>
    </div>
  );
}

export { StrengthMeter };
