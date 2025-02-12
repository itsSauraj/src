"use client";

import type { IMemberForm } from "@/dependencies/yup";
import type { StoreDispatch } from "@/redux/store";

import { useState } from "react";
import { useDispatch } from "react-redux";

// componets
import ExamSchedulingForm from "./admin/schedule";

import {
  defaultColumns,
  allColumns,
} from "@/components/dashboard/tables/columns/members";
// collections
import { ColumnSelectorDropdown } from "@/components/collection/tableColumnsSelector";
import { ModalDialog } from "@/components/collection/modal";
// import { ExamSchedulingForm } from "@/components/dashboard/forms";

const MentorsPage = () => {
  const [rowData, setRowData] = useState<IMemberForm[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] =
    useState<string[]>(defaultColumns);

  const dispatch = useDispatch<StoreDispatch>();

  return (
    <>
      <div className="flex flex-col w-full h-full gap-3">
        <div className="flex justify-end gap-2">
          <ModalDialog
            description="Schedule Exam"
            setState={setOpen}
            state={open}
            title="Schedule Exam"
          >
            <ExamSchedulingForm />
          </ModalDialog>
          {rowData.length > 0 && (
            <ColumnSelectorDropdown
              columns={allColumns}
              parentSelectedColumns={selectedColumns}
              setParentSelectedColumns={setSelectedColumns}
            />
          )}
        </div>
        {/* //  */}
      </div>
    </>
  );
};

export default MentorsPage;
