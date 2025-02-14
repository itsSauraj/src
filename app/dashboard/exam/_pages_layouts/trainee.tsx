"use client";

import type { StoreDispatch, RootState } from "@/redux/store";
import type { Exam } from "@/types/dashboard/exam";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";

// componets
import ExamDetailsCard from "@/components/dashboard/exam/admin/scheduleDetails";
import { ScrollArea } from "@/components/ui/scroll-area";
// collections
import Loader from "@/components/ui/loader";
// apis
import { getScheduledExam } from "@/lib/api";

const MentorsPage = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const isLoading = useSelector((state: RootState) => state.app.auth.isLoading);

  const [rowData, setRowData] = useState<Exam[]>([]);

  useEffect(() => {
    dispatch(getScheduledExam())
      .then((data) => {
        setRowData(data);
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line no-console
      });
  }, [dispatch]);

  if (isLoading && rowData.length === 0) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-full h-full gap-3">
      {rowData.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <Empty
            description={
              <span className="text-neutral-500">No Exam Schedules found</span>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      ) : (
        <ScrollArea className="h-[75vh]">
          <div className="w-full">
            <ExamDetailsCard schedules={rowData} userType="trainee" />
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default MentorsPage;
