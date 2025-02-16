"use client";

import type { UUID } from "crypto";
import type { StoreDispatch, RootState } from "@/redux/store";
import type { Exam } from "@/types/dashboard/exam";

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";
import { useSearchParams } from "next/navigation";

// componets
import ExamSchedulingForm from "@/components/dashboard/exam/admin/schedule";
import ExamDetailsCard from "@/components/dashboard/exam/admin/scheduleDetails";
import { ScrollArea } from "@/components/ui/scroll-area";
// collections
import { ModalDialog } from "@/components/collection/modal";
import { MyAlertDialog } from "@/components/collection/alert-dialog";
import Loader from "@/components/ui/loader";
// apis
import { getScheduledExam, cancelScheduledExam } from "@/lib/api";

const MentorsPage = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const searchParams = useSearchParams();
  const isLoading = useSelector((state: RootState) => state.app.auth.isLoading);

  const [rowData, setRowData] = useState<Exam[]>([]);
  const [open, setOpen] = useState(searchParams.get("trainee") ? true : false);
  const [openCancel, setOpenCancel] = useState(false);
  const [selectedExam, setSelectedExam] = useState<UUID | null>(null);
  const [formType, setFormType] = useState<"update" | "schedule">("schedule");

  useEffect(() => {
    dispatch(getScheduledExam())
      .then((data) => {
        setRowData(data);
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line no-console
      });
  }, [dispatch]);

  useEffect(() => {
    !open && setFormType("schedule");
  }, [open]);

  const handleActionClick = useCallback(
    (id: UUID, action: "cancel" | "edit") => {
      setSelectedExam(id);
      switch (action) {
        case "cancel":
          setOpenCancel(true);
          break;
        case "edit":
          setOpen(true);
          setFormType("update");
          break;
        default:
          break;
      }
    },
    [],
  );

  const handleCancelConfirm = useCallback(() => {
    if (selectedExam) {
      dispatch(cancelScheduledExam(selectedExam)).then(() => {
        setSelectedExam(null);
        setOpenCancel(false);
        setRowData((prev) => prev.filter((item) => item.id !== selectedExam));
      });
    }
  }, [selectedExam]);

  if (isLoading && rowData.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col w-full h-full gap-3">
        <div className="flex justify-end gap-2">
          <ModalDialog
            description=""
            setState={setOpen}
            state={open}
            title={
              formType === "update" ? "Update Exam Schedule" : "Schedule Exam"
            }
          >
            <ExamSchedulingForm
              defaultValues={
                formType === "update"
                  ? rowData.find((item) => item.id === selectedExam)
                  : undefined
              }
              setSchedule={setRowData}
              setState={setOpen}
              type={formType}
            />
          </ModalDialog>
        </div>
        {rowData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <Empty
              description={
                <span className="text-neutral-500">
                  No Exam Schedules found
                </span>
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        ) : (
          <ScrollArea className="h-[75vh]">
            <div className="w-full">
              <ExamDetailsCard
                handleActionClick={handleActionClick}
                schedules={rowData}
              />
            </div>
          </ScrollArea>
        )}
      </div>
      <MyAlertDialog
        description="Are you sure you want to cancel this exam?"
        setOpen={setOpenCancel}
        title="Cancel Exam"
        onContinue={handleCancelConfirm}
        onOpen={openCancel}
      />
    </>
  );
};

export default MentorsPage;
