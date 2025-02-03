"use client";

import type { CourseCompletionStatus } from "@/types/dashboard/report";
import type { AgChartOptions, AgChartTheme } from "ag-charts-community";

import React, { memo, useMemo } from "react";
import { useTheme } from "next-themes";
import { AgCharts as AgChartsReact } from "ag-charts-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const customDark = themeQuartz.withPart(iconSetQuartzBold).withParams({
//   accentColor: "#FFFFFF",
//   backgroundColor: "#404040",
//   browserColorScheme: "inherit",
//   chromeBackgroundColor: "#2D2C2C",
//   foregroundColor: "#FFF",
//   headerFontSize: 14,
// });

const AdminDashboard = ({
  data,
}: {
  data: CourseCompletionStatus[] | any[];
}) => {
  const { theme } = useTheme();

  const customDarkTheme: AgChartTheme = {
    palette: {
      fills: ["#6366f1", "#06b6d4", "#22c55e", "#f97316", "#a855f7", "#ec4899"],
      strokes: [
        "#6366f1",
        "#06b6d4",
        "#22c55e",
        "#f97316",
        "#a855f7",
        "#ec4899",
      ],
    },
    overrides: {
      common: {
        background: {
          fill: "#000000", // Background color from your theme
        },
      },
      bar: {
        series: {
          strokeWidth: 0,
          highlightStyle: {
            item: {
              fill: "#818cf8", // Lighter indigo for hover
              strokeWidth: 0,
            },
          },
        },
      },
      overrides: {
        background: {
          fill: "#2D2C2C", // Chrome background color from your theme
        },
        title: {
          fontSize: 14, // Header font size from your theme
          fontFamily: "Inter, sans-serif",
          fontWeight: "bold",
          color: "#FFFFFF", // Foreground color from your theme
        },
        subtitle: {
          fontSize: 12,
          fontFamily: "Inter, sans-serif",
          color: "#FFFFFF", // Foreground color from your theme
        },
        axes: {
          number: {
            title: {
              fontSize: 12,
              fontFamily: "Inter, sans-serif",
              color: "#FFFFFF",
            },
            label: {
              fontSize: 12,
              fontFamily: "Inter, sans-serif",
              color: "#FFFFFF",
            },
            line: {
              color: "#4B4B4B", // Slightly lighter than background
            },
            tick: {
              color: "#4B4B4B",
            },
            grid: {
              style: [
                {
                  stroke: "#4B4B4B",
                  lineDash: [4, 2],
                },
              ],
            },
          },
          category: {
            title: {
              fontSize: 12,
              fontFamily: "Inter, sans-serif",
              color: "#FFFFFF",
            },
            label: {
              fontSize: 12,
              fontFamily: "Inter, sans-serif",
              color: "#FFFFFF",
            },
            line: {
              color: "#4B4B4B",
            },
            tick: {
              color: "#4B4B4B",
            },
          },
        },
      },
      legend: {
        item: {
          label: {
            fontSize: 12,
            fontFamily: "Inter, sans-serif",
            color: "#FFFFFF",
          },
        },
        spacing: 24,
        position: "bottom",
        backgroundColor: "#2D2C2C",
      },
    },
  };

  const chartOptions = useMemo<AgChartOptions>(
    () => ({
      theme: theme === "dark" ? customDarkTheme : "ag-default",
      data: data || [],
      series: [
        {
          type: "bar",
          xKey: "course",
          yKey: "enrolled",
          yName: "Enrolled",
          xName: "Courses",
        },
        {
          type: "bar",
          xKey: "course",
          yKey: "not_started",
          yName: "Not Started",
          xName: "Courses",
        },
        {
          type: "bar",
          xKey: "course",
          yKey: "completed",
          yName: "Completed",
          xName: "Courses",
        },
        {
          type: "bar",
          xKey: "course",
          yKey: "in_progress",
          yName: "In Progress",
          xName: "Courses",
        },
      ],
      legend: {
        enabled: true,
      },
      navigator: {
        enabled: true,
        height: 20,
        min: 0,
        max: 1,
        mask: {
          fill: "rgba(161, 161, 161, 0.3)",
        },
        minHandle: {
          fill: "#535353",
        },
        maxHandle: {
          fill: "#535353",
        },
      },
      zoom: {
        enabled: true,
        mouseWheel: {
          enabled: true,
        },
        panKey: "ctrl",
      },
    }),
    [data, theme],
  );

  if (!data) {
    return <div>Failed to load data</div>;
  }

  return (
    <Card className="h-max flex-grow">
      <CardHeader>
        <CardTitle>Course Completion Status</CardTitle>
      </CardHeader>
      <CardContent>
        <AgChartsReact options={chartOptions} />
      </CardContent>
    </Card>
  );
};

export default memo(AdminDashboard);
