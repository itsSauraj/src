"use client";

import type { Member } from "@/types/compoents/table";
import type { StoreDispatch } from "@/redux/store";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// componets
import RenderTable from "@/components/dashboard/renderTable";
import { AddDialog } from "@/components/collection/modal";
import { AddMember } from "@/components/dashboard/forms";
import { getTrainees } from "@/lib/api";

export const Dashboard = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const [rowData, setRowData] = useState<Member[]>([]);

  useEffect(() => {
    dispatch(getTrainees()).then((data) => {
      setRowData(data);
    });
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-3">
      <div className="flex justify-end">
        <AddDialog
          description="Add a new trainee to your training group"
          title="Add Trainee"
        >
          <AddMember type="trainee" />
        </AddDialog>
      </div>
      <div className="flex flex-col w-full h-full">
        <RenderTable rowData={rowData} />
      </div>
    </div>
  );
};

export default Dashboard;
