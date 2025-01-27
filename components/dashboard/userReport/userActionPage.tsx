"use client";

import type { TrainingReportData } from "@/types/dashboard/report";

import React, { useState } from "react";

// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseTransfer from "@/components/dashboard/collections/courseTransfer";
import TraineeActivity from "@/components/dashboard/userReport/traineeActivity";

export default function UserActionPage({
  information,
  setTraineeReport,
}: {
  information: TrainingReportData;
  setTraineeReport: (data: TrainingReportData) => void;
}) {
  const [activeTab, setActiveTab] = useState<any>("profile");

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="profile"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="profile">User Report</TabsTrigger>
          <TabsTrigger value="courses">Course Management</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <TraineeActivity report={information} />
        </TabsContent>

        <TabsContent value="courses">
          <CourseTransfer
            setTraineeReport={setTraineeReport}
            trainee_id={information.trainee.id}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
