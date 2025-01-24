"use client";

import type { UUID } from "crypto";
import type { TrainingReportData } from "@/types/dashboard/report";
import type { StoreDispatch, RootState } from "@/redux/store";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserProfile from "@/components/dashboard/userReport/userProfile";
import TraineeActivity from "@/components/dashboard/userReport/traineeActivity";
//components
import Loader from "@/components/ui/loader";
//skeletons
import { UserProfileSkeleton } from "@/components/dashboard/skeleton/userProfile";
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
        console.error("Failed to fetch trainee report:", error);
      }
    };

    getTraineeReportDataAsync();
  }, [trainee_id, dispatch]);

  if (!traineeReport) return <Loader />;

  return (
    <>
      {traineeReport?.trainee ? (
        <UserProfile
          className="min-w-[350px] lg:w-1/4"
          information={traineeReport.trainee}
        />
      ) : (
        <UserProfileSkeleton className="min-w-[300px]" />
      )}
      {traineeReport && (
        <TraineeActivity className="flex-grow" report={traineeReport} />
      )}
    </>
  );
};

export default UserReport;
