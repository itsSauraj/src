"use client";

import type { CourseCompletionStatus } from "@/types/dashboard/report";
import type { AgChartOptions } from "ag-charts-community";

import React, { memo, useMemo } from "react";
import { AgCharts as AgChartsReact } from "ag-charts-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = ({
  data,
}: {
  data: CourseCompletionStatus[] | any[];
}) => {
  const chartOptions = useMemo<AgChartOptions>(
    () => ({
      theme: "ag-default",
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
    [data],
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
