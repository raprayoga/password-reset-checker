import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const inputVariant = cva(
  "h-full w-full border rounded outline-0 py-2 placeholder:text-gray text-black px-2 pt-4 outline-none",
  {
    variants: {
      variant: {
        default: "border-gray focus:shadow-gray",
        danger: "border-red-400 focus:shadow-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariant> {}

const variants = {
  open: { y: "-130%", x: "-20%", scale: 0.7 },
  closed: { y: "-50%", x: 0, scale: 1 },
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, value, placeholder, ...props }, ref) => {
    const [onFocus, setOnFocus] = useState<boolean>(false);

    return (
      <div className="relative w-full h-full">
        <input
          className={cn(inputVariant({ variant }), props.className)}
          data-testid="input-element"
          value={value}
          ref={ref}
          {...props}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        />
        <motion.span
          animate={onFocus || value ? "open" : "closed"}
          variants={variants}
          className="absolute text-gray-500 left-3 top-1/2 mt-auto fond-medium leading-none"
        >
          {placeholder}
        </motion.span>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
