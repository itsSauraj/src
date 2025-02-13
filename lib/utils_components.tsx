import React from "react";

/**
 * Renders a span element displaying the progress percentage.
 * @param _progress - The current progress percentage.
 * @param _successPercent - The success percentage (optional).
 * @returns A span element with the progress percentage.
 */
export const themeProgressText = (
  _progress?: number,
  _successPercent?: number,
) => {
  return <span className="dark:text-white">{_progress}%</span>;
};

/**
 * Returns a color based on the progress percentage.
 * @param progress - The current progress percentage.
 * @returns A color code as a string.
 */
export const getProgressColor = (progress: number) => {
  if (progress < 35) return "#EF4444";
  if (progress < 70) return "#F59E0B";

  return "#52CA14";
};
