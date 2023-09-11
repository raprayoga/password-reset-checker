import React, { useState } from "react";
import { motion } from "framer-motion";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: string;
}

export interface PlaceHolderProps {
  isOnFocus: boolean;
  value: string | number | readonly string[] | undefined;
}

const variants = {
  open: { y: "-130%", x: "-20%", scale: 0.7 },
  closed: { y: "-50%", x: 0, scale: 1 },
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, placeholder, ...props }, ref) => {
    const [onFocus, setOnFocus] = useState<boolean>(false);

    return (
      <div className="relative w-full h-full">
        <input
          className="h-full w-full border rounded outline-0 py-2 placeholder:text-gray text-black px-2 pt-4 outline-none"
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
