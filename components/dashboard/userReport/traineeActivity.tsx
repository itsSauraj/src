"use client";

import type { TrainingReportData } from "@/types/dashboard/report";

import React from "react";

import { TrainingDashboard } from "./trainingDashboard";
import { ComprehensiveTrainingReport } from "./comprensiveReport";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
// API
import { cn } from "@/lib/utils";

const TraineeActivity = ({
  className,
  report,
}: {
  className?: string;
  report: TrainingReportData;
}) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">User activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[70vh] pr-4">
          <TrainingDashboard data={report} />
          Detailed Report of the Courses
          <ComprehensiveTrainingReport data={report} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TraineeActivity;
