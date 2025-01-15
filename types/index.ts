import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type members = "mentor" | "trainee";
