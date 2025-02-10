"use client";

import type { TrainingReportData } from "@/types/dashboard/report";

import React, { useState } from "react";

// Components
import { TrainingDashboard } from "./trainingDashboard";
import { ComprehensiveTrainingReport } from "./comprensiveReport";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseTransfer from "@/components/dashboard/collections/courseTransfer";

export default function UserActionPage({
  information,
  setTraineeReport,
}: {
  information: TrainingReportData;
  setTraineeReport: (data: TrainingReportData) => void;
}) {
  const [activeTab, setActiveTab] = useState<any>("userProfileReport");

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="userProfileReport"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="userProfileReport">User Report</TabsTrigger>
          <TabsTrigger value="userCourseProgress">Course Progress</TabsTrigger>
          <TabsTrigger value="userCoursesManagement">
            Course Assignment
          </TabsTrigger>
          <TabsTrigger value="userExamManagement">Exam Report</TabsTrigger>
        </TabsList>

        <TabsContent value="userProfileReport">
          <TrainingDashboard data={information} />
        </TabsContent>

        <TabsContent value="userCourseProgress">
          <ComprehensiveTrainingReport data={information} />
        </TabsContent>

        <TabsContent value="userCoursesManagement">
          <CourseTransfer
            setTraineeReport={setTraineeReport}
            trainee_id={information.trainee.id}
          />
        </TabsContent>
        <TabsContent value="userExamManagement">
          <div>Comming soon</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
