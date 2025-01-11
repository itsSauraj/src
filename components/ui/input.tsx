"use client";

import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

import { cn } from "@/lib/utils";
const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input"> & { error?: string }
>(({ className, type, error, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const errorClass =
    "border-[1px] border-red-500  text-red-500 placeholder:text-red-500";
  const errorEyeClass = "text-red-500";

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
            error != "" && errorClass,
          )}
          type={type === "password" && showPassword ? "text" : type}
          {...props}
        />
        {type === "password" && (
          <span
            className={cn(
              "absolute w-full h-full top-0 right-0 flex items-center justify-end pr-3 pointer-events-none",
            )}
          >
            {!showPassword ? (
              <FaEyeSlash
                className={cn(
                  "pointer-events-auto cursor-pointer",
                  error != "" && errorEyeClass,
                )}
                onClick={(_e) => setShowPassword(!showPassword)}
              />
            ) : (
              <IoEyeSharp
                className={cn(
                  "pointer-events-auto cursor-pointer",
                  error != "" && errorEyeClass,
                )}
                onClick={(_e) => setShowPassword(!showPassword)}
              />
            )}
          </span>
        )}
      </div>
      {error != "" && <span className="text-red-500 text-[10px]">{error}</span>}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
