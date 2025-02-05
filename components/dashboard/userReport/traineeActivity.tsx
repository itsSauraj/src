import type { TrainingReportData } from "@/types/dashboard/report";

import React from "react";

import { TrainingDashboard } from "./trainingDashboard";
import { ComprehensiveTrainingReport } from "./comprensiveReport";

const TraineeActivity = ({ report }: { report: TrainingReportData }) => {
  return (
    <>
      <TrainingDashboard data={report} />
      <h3 className="text-lg font-semibold mt-6">
        Detailed Report of the Courses
      </h3>
      <ComprehensiveTrainingReport data={report} />
    </>
  );
};

export default TraineeActivity;
