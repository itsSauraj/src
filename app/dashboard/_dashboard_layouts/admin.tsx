"use client";

import type { InfoCardData } from "@/types/dashboard/report";
import type { StoreDispatch, RootState } from "@/redux/store";

import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AdminSkeleton } from "./adminSkeleton";

//compoonents
import { Skeleton } from "@/components/ui/skeleton";
// dashboard_components
import { CourseCollectionChart } from "@/components/dashboard/charts";
import { InfoCardsLink } from "@/components/collection/infoCards";
import {
  getDashboardReport,
  getDashboardCourseCollectionStatus,
} from "@/lib/api";
import { cn } from "@/lib/utils";

const MemoizedInfoCard = memo(
  ({
    index,
    title,
    count,
  }: {
    index: number;
    title: string;
    count: number;
  }) => (
    <InfoCardsLink key={`${index}-${title}`} index={index} title={title}>
      <h1 className={cn("text-3xl font-bold")}>{count}</h1>
    </InfoCardsLink>
  ),
);

MemoizedInfoCard.displayName = "MemoizedInfoCard";

const AdminPageDashboard = () => {
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const [reportData, setReportData] = useState<InfoCardData[] | null>(null);
  const [graphData, setGraphData] = useState<any>(null);
  const isLoading = useSelector((state: RootState) => state.app.auth.isLoading);
  const dispatch = useDispatch<StoreDispatch>();

  const fetchDashboardData = useCallback(async () => {
    const data = await dispatch(getDashboardReport());
    const data2 = await dispatch(getDashboardCourseCollectionStatus());

    if (data && data !== false) {
      setReportData(data);
    }

    if (data2 && data2 !== false) {
      setGraphData(data2);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (!isMounted) {
    return null;
  }

  if (isLoading) return <AdminSkeleton />;
  if (!reportData && !isLoading) return null;

  return (
    <div>
      <section className="flex gap-3 flex-wrap">
        {reportData?.map((card, index) => (
          <MemoizedInfoCard
            key={`${index}-${card.title}`}
            count={card.count}
            index={index}
            title={card.title}
          />
        ))}
      </section>
      <section className="flex gap-3 mt-6">
        {graphData ? (
          <CourseCollectionChart data={graphData} />
        ) : (
          <Skeleton className="flex-grow h-[250px]" />
        )}
      </section>
    </div>
  );
};

export default memo(AdminPageDashboard);
