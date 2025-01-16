"use client";

import { FC, useState, useEffect } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    if (typeof window !== "undefined") {
      // Access the document safely on the client
      const htmlElement = document.documentElement;

      if (newTheme === "dark") {
        htmlElement.classList.add("dark");
        htmlElement.classList.remove("light");
      } else {
        htmlElement.classList.add("light");
        htmlElement.classList.remove("dark");
      }
    }
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light",
    onChange,
  });

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      // Ensure the class is set based on the initial theme
      const htmlElement = document.documentElement;

      if (theme === "dark") {
        htmlElement.classList.add("dark");
        htmlElement.classList.remove("light");
      } else {
        htmlElement.classList.add("light");
        htmlElement.classList.remove("dark");
      }
    }
  }, [theme]);

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className="w-6 h-6" />;

  return (
    <div
      aria-label={isSelected ? "Switch to dark mode" : "Switch to light mode"}
      className={cn(
        "px-px transition-opacity hover:opacity-80 cursor-pointer",
        className,
        classNames?.base,
      )}
      role="button"
      tabIndex={0}
      onClick={onChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onChange();
        }
      }}
      {...getBaseProps()}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={cn(
          "w-auto h-auto",
          "bg-transparent",
          "rounded-lg",
          "flex items-center justify-center",
          "group-data-[selected=true]:bg-transparent",
          "!text-default-500",
          "pt-px",
          "px-0",
          "mx-0",
          classNames?.wrapper,
        )}
      >
        {isSelected ? (
          <>
            <MoonFilledIcon size={22} />
            <span className="text-sm p-1 ml-1 text-gray-700 dark:text-gray-200">
              Change Theme
            </span>
          </>
        ) : (
          <>
            <SunFilledIcon size={22} />
            <span className="text-sm p-1 ml-1 text-gray-700 dark:text-gray-200">
              Change Theme
            </span>
          </>
        )}
      </div>
    </div>
  );
};
