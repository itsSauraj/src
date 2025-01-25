"use client";

import type { TrainingReportData } from "@/types/dashboard/report";
import type { StoreDispatch, RootState } from "@/redux/store";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import TraineeActivity from "@/components/dashboard/userReport/traineeActivity";
//components
import Loader from "@/components/ui/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
//skeletons
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// API
import { getTraineeReport } from "@/lib/api";

const Dashboard = () => {
  // TODO: get trainee id from user and redirect to repoctive page for admin and trainee
  const trainee_id = useSelector((state: RootState) => state.user?.user?.id);

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
        toast.error("Failed to fetch your report");
      }
    };

    getTraineeReportDataAsync();
  }, [trainee_id, dispatch]);

  if (!traineeReport && isLoading) return <Loader />;
  if (!traineeReport && !isLoading) return <>Failed to load data</>;

  return (
    <Card className="flex-grow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Your activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[70vh] pr-4">
          {traineeReport && <TraineeActivity report={traineeReport} />}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
