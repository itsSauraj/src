"use client";

import Link, { LinkProps } from "next/link";
import React, { useState } from "react";

import { LinkContent } from "./linkContent";

import { cn } from "@/lib/utils";

interface Links {
  label: string;
  href?: string;
  icon?: React.JSX.Element | React.ReactNode;
  child?: React.JSX.Element;
  type?: string;
}

export const SidebarLink = ({
  link,
  className,
  onClick,
  ...props
}: {
  link: Links;
  className?: string;
  onClick?: () => void;
  props?: LinkProps;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const baseClassName =
    "flex items-center justify-start gap-2 group/sidebar py-2";

  if (link.child) {
    return link.child;
  }

  if (link.type === "button") {
    return (
      <button className={cn(baseClassName, className)} onClick={onClick}>
        <LinkContent link={link} />
      </button>
    );
  }

  return (
    <>
      {isMounted ? (
        <Link
          className={cn(baseClassName, className)}
          href={link.href || "#"}
          {...props}
        >
          <LinkContent link={link} />
        </Link>
      ) : null}
    </>
  );
};
