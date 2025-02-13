import type { BreadcrumbItem } from "@/types/index";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge.
 * @param {...ClassValue[]} inputs - The class names to combine.
 * @returns {string} - The combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates breadcrumb items from a given pathname.
 * @param {string} pathname - The pathname to generate breadcrumbs from.
 * @returns {BreadcrumbItem[]} - The generated breadcrumb items.
 */
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

/**
 * Formats a duration string into a human-readable format.
 * @param {string} duration - The duration in seconds.
 * @returns {string} - The formatted duration.
 */
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

/**
 * Converts a UTC time string to a local date-time string.
 * @param {string} utcTime - The UTC time string.
 * @returns {string | undefined} - The local date-time string or undefined if utcTime is null.
 */
export const formatDateTimeToLocal = (utcTime: string) => {
  if (utcTime == null) return;

  const dateObj = new Date(utcTime);

  return dateObj.toLocaleString();
};

/**
 * Gets a color class based on the index and type.
 * @param {number} index - The index to determine the color.
 * @param {"border" | "background" | "text"} type - The type of color class to return.
 * @returns {string} - The color class.
 */
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
