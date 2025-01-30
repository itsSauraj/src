"use client";

import React, { useState, useEffect } from "react";
import { AgCharts as AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// DemoData
const demoData = [
  { course: "Web Development", completed: 75, inProgress: 25 },
  { course: "Data Science", completed: 60, inProgress: 40 },
  { course: "UI/UX Design", completed: 85, inProgress: 15 },
  { course: "Mobile Dev", completed: 45, inProgress: 55 },
];

const AdminDashboard = () => {
  const [options, setOptions] = useState<AgChartOptions>({});

  useEffect(() => {
    const courseCompletionData = demoData.map((course) => ({
      ...course,
      enrolled: course.completed + course.inProgress,
    }));

    setOptions({
      theme: "ag-default-dark",
      title: {
        text: "Course Completion Status",
      },
      data: courseCompletionData,
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
          yKey: "completed",
          yName: "Completed",
          xName: "Courses",
        },
        {
          type: "bar",
          xKey: "course",
          yKey: "inProgress",
          yName: "In Progress",
          xName: "Courses",
        },
      ],
      legend: {
        enabled: true,
      },
    });
  }, []);

  return (
    <div className="w-full space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Completion Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <AgChartsReact options={options} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
