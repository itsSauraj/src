"use client";

import type { UUID } from "crypto";
import type { Exam } from "@/types/dashboard/exam";
import type { StoreDispatch } from "@/redux/store";

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Empty } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

import ExamDetails from "./component/examDetails";

import { MyAlertDialog } from "@/components/collection/alert-dialog";
import Loader from "@/components/ui/loader";
import ExamSchedulingForm from "@/components/dashboard/exam/admin/schedule";
import { ModalDialog } from "@/components/collection/modal";
// API
import { getExamDetails, cancelScheduledExam } from "@/lib/api";

const ExamScheduleDetails = ({ id }: { id: UUID }) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<Exam | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

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
      <ExamDetails
        critical={searchParams.get("user") !== "admin"}
        details={details}
        onCancelExam={setOpen}
        onEditExam={setOpenEdit}
      />
      <MyAlertDialog
        description="Are you sure you want to cancel this exam?"
        setOpen={setOpen}
        title="Cancel Exam"
        onContinue={handleCancelConfirm}
        onOpen={open}
      />
      <ModalDialog
        noTrigger
        description="Schedule Exam"
        setState={setOpenEdit}
        state={openEdit}
        title="Schedule Exam"
      >
        <ExamSchedulingForm
          defaultValues={details}
          setSchedule={setDetails}
          setState={setOpenEdit}
          type="update-single"
        />
      </ModalDialog>
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
