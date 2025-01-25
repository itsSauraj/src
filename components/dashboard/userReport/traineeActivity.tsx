"use client";

import type { TrainingReportData } from "@/types/dashboard/report";

import React from "react";

import { TrainingDashboard } from "./trainingDashboard";
import { ComprehensiveTrainingReport } from "./comprensiveReport";

// API

const TraineeActivity = ({ report }: { report: TrainingReportData }) => {
  return (
    <>
      <TrainingDashboard data={report} />
      Detailed Report of the Courses
      <ComprehensiveTrainingReport data={report} />
    </>
  );
};

export default TraineeActivity;
