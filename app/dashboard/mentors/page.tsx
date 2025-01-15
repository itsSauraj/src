"use client";

import type { IMemberForm } from "@/dependencies/yup";
import type { StoreDispatch } from "@/redux/store";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// componets
import RenderTable from "@/components/dashboard/renderTable";
import { AddDialog } from "@/components/collection/modal";
import { AddMember } from "@/components/dashboard/forms";
import { getMentors } from "@/lib/api";

export const Dashboard = () => {
  const [rowData, setRowData] = useState<IMemberForm[]>([]);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<StoreDispatch>();

  useEffect(() => {
    dispatch(getMentors()).then((data) => {
      setRowData(data);
    });
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-3">
      <div className="flex justify-end">
        <AddDialog
          description="Add a new mentor to your training group"
          setState={setOpen}
          state={open}
          title="Add Mentor"
        >
          <AddMember setData={setRowData} setState={setOpen} type="mentor" />
        </AddDialog>
      </div>
      <div className="flex flex-col w-full h-full">
        <RenderTable rowData={rowData} />
      </div>
    </div>
  );
};

export default Dashboard;
