"use client";

import React from "react";
import { useId } from "react";

export function GradientCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full transition-all ease-in duration-250 
    md:w-[50%] md:h-[50%] lg:h-max xl:w-[40%] 2xl:w-[30%]"
    >
      <div
        key={title}
        className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 md:rounded-3xl overflow-hidden flex flex-col justify-center items-center w-full h-full md:w-auto md:h-auto 
        "
        style={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <p className="text-xl lg:text-3xl font-bold text-neutral-800 dark:text-white relative z-20 mt-6">
          {title}
        </p>
        <Grid
          pattern={Array.from({ length: 20 }, (_, i) => [i + 1, i + 1])}
          size={20}
        />
        {children}
      </div>
    </div>
  );
}

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];

  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
          height={size ?? 20}
          squares={p}
          width={size ?? 20}
          x="-12"
          y="4"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          height={height}
          id={patternId}
          patternUnits="userSpaceOnUse"
          width={width}
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        fill={`url(#${patternId})`}
        height="100%"
        strokeWidth={0}
        width="100%"
      />
      {squares && (
        <svg className="overflow-visible" x={x} y={y}>
          {squares.map(([x, y]: any, index: number) => (
            <rect
              key={`${x}-${y}-${index}`}
              height={height + 1}
              strokeWidth="0"
              width={width + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
