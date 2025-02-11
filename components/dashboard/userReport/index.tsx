"use client";

import type { UUID } from "crypto";
import type { TrainingReportData } from "@/types/dashboard/report";
import type { StoreDispatch, RootState } from "@/redux/store";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import UserProfile from "@/components/dashboard/userReport/userProfile";
import UserActionPage from "@/components/dashboard/userReport/userActionPage";
//components
import { Card, CardContent } from "@/components/ui/card";
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
      } catch (error) { // eslint-disable-line
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
          className="min-w-[350px] lg:w-[350px]"
          traineeData={traineeReport.trainee}
        />
      ) : (
        <UserProfileSkeleton className="min-w-[300px]" />
      )}
      {traineeReport && (
        <Card className="flex-grow">
          <CardContent className="p-3">
            <ScrollArea className="h-[80vh] pr-4">
              <UserActionPage
                information={traineeReport}
                setTraineeReport={setTraineeReport}
              />
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default UserReport;
