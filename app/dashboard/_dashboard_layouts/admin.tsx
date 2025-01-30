"use client";

import type { AdminDashboardView } from "@/types/dashboard/report";
import type { StoreDispatch, RootState } from "@/redux/store";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AdminSkeleton } from "./adminSkeleton";

// Charts
import { CourseCollectionChart } from "@/components/dashboard/charts";
// Components
import { InfoCards } from "@/components/collection/infoCards";
// APIS
import { getDashboardReport } from "@/lib/api";
// utils
import { cn } from "@/lib/utils";

const AdminPageDashboard = () => {
  const [reportData, setReportData] = useState<AdminDashboardView | null>(null);
  const isLoading = useSelector((state: RootState) => state.app.auth.isLoading);

  const dispatch = useDispatch<StoreDispatch>();

  useEffect(() => {
    dispatch(getDashboardReport()).then((data) => {
      if (data && data !== false) {
        setReportData(data);
      }
    });
  }, []);

  if (isLoading) return <AdminSkeleton />;
  if (!reportData && !isLoading) return <div>Failed to load data</div>;

  return (
    <div>
      <section className="flex gap-3">
        {reportData?.info_cards &&
          reportData.info_cards.map((card, index) => (
            <InfoCards
              key={`${index}-${card.title}`}
              index={index}
              title={card.title}
            >
              <h1 className={cn("text-3xl font-bold")}>{card.count}</h1>
            </InfoCards>
          ))}
      </section>
      <section>
        <CourseCollectionChart />
      </section>
    </div>
  );
};

export default AdminPageDashboard;
