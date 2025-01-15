import type { CustomCellRendererProps } from "ag-grid-react";
import type { ValueFormatterParams } from "ag-grid-community";

export const dateFormatter = (params: ValueFormatterParams): string => {
  return new Date(params.value).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
