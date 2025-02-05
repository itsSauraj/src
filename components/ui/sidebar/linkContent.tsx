"use client";

import React from "react";
import { motion } from "framer-motion";

import { useSidebar } from "./provider";

import { cn } from "@/lib/utils";

interface Links {
  label: string;
  href?: string;
  icon?: React.JSX.Element | React.ReactNode;
  child?: React.JSX.Element;
  type?: string;
}

export const LinkContent = ({ link }: { link: Links }) => {
  const { open, animate } = useSidebar();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <span className="text-white">{link.icon}</span>
      {isMounted ? (
        <motion.span
          animate={{
            display: animate
              ? open
                ? "inline-block"
                : "none"
              : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="text-white text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
          initial={false}
          transition={{ duration: 0.15 }}
        >
          {link.label}
        </motion.span>
      ) : null}
    </>
  );
};
