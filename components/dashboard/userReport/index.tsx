"use client";

import type { UUID } from "crypto";
import type { TrainingReportData } from "@/types/dashboard/report";
import type { StoreDispatch, RootState } from "@/redux/store";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import UserProfile from "@/components/dashboard/userReport/userProfile";
import TraineeActivity from "@/components/dashboard/userReport/traineeActivity";
//components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
//skeletons
import { UserProfileSkeleton } from "@/components/dashboard/skeleton/userProfile";
import { ScrollArea } from "@/components/ui/scroll-area";
// API
import { getTraineeReport } from "@/lib/api";

const UserReport = ({ trainee_id }: { trainee_id: UUID }) => {
  const [traineeReport, setTraineeReport] = useState<TrainingReportData | null>(
    null,
  );
  const dispatch = useDispatch<StoreDispatch>();

  const isLoading = useSelector((state: RootState) => state.app.auth.isLoading);

  useEffect(() => {
    if (!trainee_id) return;

    const getTraineeReportDataAsync = async () => {
      try {
        const data = (await dispatch(getTraineeReport(trainee_id))) as any;

        if (data) setTraineeReport(data as TrainingReportData);
      } catch (error) {
        toast.error("Failed to fetch trainee report");
      }
    };

    getTraineeReportDataAsync();
  }, [trainee_id, dispatch]);

  if (!traineeReport && isLoading) return <Loader />;
  if (!traineeReport && !isLoading) return <>Failed to load data</>;

  return (
    <>
      {traineeReport?.trainee ? (
        <UserProfile
          className="min-w-[350px] lg:w-1/4"
          traineeData={traineeReport.trainee}
        />
      ) : (
        <UserProfileSkeleton className="min-w-[300px]" />
      )}
      {traineeReport && (
        <Card className="flex-grow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">
              User activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[70vh] pr-4">
              <TraineeActivity report={traineeReport} />
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default UserReport;
