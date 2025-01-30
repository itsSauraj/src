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

export const getColor = (
  index: number,
  type: "border" | "background" | "text",
) => {
  const colorTypes = {
    border: [
      "border-red-500 dark:border-red-700",
      "border-green-500 dark:border-green-700",
      "border-blue-500 dark:border-blue-700",
      "border-orange-500 dark:border-orange-700",
    ],
    background: [
      "bg-red-500 dark:bg-red-700",
      "bg-green-500 dark:bg-green-700",
      "bg-blue-500 dark:bg-blue-700",
      "bg-orange-500 dark:bg-orange-700",
    ],
    text: [
      "text-red-500 dark:text-red-700",
      "text-green-500 dark:text-green-700",
      "text-blue-500 dark:text-blue-700",
      "text-orange-500 dark:text-orange-700",
    ],
  };

  return colorTypes[type][index % colorTypes[type].length];
};
