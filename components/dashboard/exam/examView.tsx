"use client";

import type { UUID } from "crypto";
import type { Exam } from "@/types/dashboard/exam";
import type { StoreDispatch } from "@/redux/store";

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Empty } from "antd";
import { useRouter } from "next/navigation";

import ExamDetails from "./component/examDetails";

import { MyAlertDialog } from "@/components/collection/alert-dialog";
import Loader from "@/components/ui/loader";
// API
import { getExamDetails, cancelScheduledExam } from "@/lib/api";

const ExamScheduleDetails = ({ id }: { id: UUID }) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<Exam | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const dispatch = useDispatch<StoreDispatch>();

  useEffect(() => {
    dispatch(getExamDetails(id))
      .then((data: Exam) => {
        setDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line no-console
      });
  }, [id]);

  const handleCancelConfirm = useCallback(() => {
    if (id) {
      dispatch(cancelScheduledExam(id)).then(() => {
        router.replace("/dashboard/exam");
      });
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return details ? (
    <>
      <ExamDetails details={details} onCancelExam={setOpen}/>
      <MyAlertDialog
        description="Are you sure you want to cancel this exam?"
        setOpen={setOpen}
        title="Cancel Exam"
        onContinue={handleCancelConfirm}
        onOpen={open}
      />
    </>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <Empty
        description={
          <span className="text-neutral-500">No Such Exam found</span>
        }
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </div>
  );
};

export default ExamScheduleDetails;
