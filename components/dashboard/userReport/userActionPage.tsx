"use client";

import type { TrainingReportData } from "@/types/dashboard/report";

import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<any>(
    searchParams.get("tab") || "user-report",
  );

  React.useEffect(() => {
    if (activeTab) {
      router.replace(`${pathname}?tab=${activeTab}`);
    }
  }, [activeTab]);

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="user-report"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="user-report">User Report</TabsTrigger>
          <TabsTrigger value="course-progress">Course Progress</TabsTrigger>
          <TabsTrigger value="courses-assignment">
            Course Assignment
          </TabsTrigger>
          <TabsTrigger value="exam-reportcard">Exam Report</TabsTrigger>
        </TabsList>

        <TabsContent value="user-report">
          <TrainingDashboard data={information} />
        </TabsContent>

        <TabsContent value="course-progress">
          <ComprehensiveTrainingReport data={information} />
        </TabsContent>

        <TabsContent value="courses-assignment">
          <CourseTransfer
            setTraineeReport={setTraineeReport}
            trainee_id={information.trainee.id}
          />
        </TabsContent>
        <TabsContent value="exam-reportcard">
          <div>Comming soon</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
