import React from "react";

export const themeProgressText = (
  _progress?: number,
  _successPercent?: number,
) => {
  return <span className="dark:text-white">{_progress}%</span>;
};

export const getProgressColor = (progress: number) => {
  if (progress < 35) return "#EF4444";
  if (progress < 70) return "#F59E0B";

  return "#52CA14";
};
