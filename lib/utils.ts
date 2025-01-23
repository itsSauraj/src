import type { BreadcrumbItem } from "@/types/index";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const paths = pathname.split("/").filter((path) => path);

  return paths.map((path, index) => {
    const isUUID = uuidRegex.test(path);
    const label = isUUID
      ? "View"
      : path
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

export const formatDuration = (duration: string) => {
  const seconds = parseFloat(duration);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
};

export const formatDateTimeToLocal = (utcTime: string) => {
  if (utcTime == null) return;

  const dateObj = new Date(utcTime);

  return dateObj.toLocaleString();
};
