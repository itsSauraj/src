import type { BreadcrumbItem } from "@/types/index";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const paths = pathname.split("/").filter((path) => path);

  return paths.map((path, index) => {
    const label = path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const href =
      index < paths.length - 1
        ? "/" + paths.slice(0, index + 1).join("/")
        : undefined;

    return { label, href };
  });
};
