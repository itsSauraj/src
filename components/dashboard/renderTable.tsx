"use client";

import type { ColDef } from "ag-grid-community";
import type { Member } from "@/types/compoents/table";
import type { RootState, StoreDispatch } from "@/redux/store";

import { useState, useEffect } from "react";

// loader
import { useDispatch, useSelector } from "react-redux";

import Loader from "@/components/ui/loader";
// componets
import { dateFormatter } from "@/components/ui/table/formater";
import { Table } from "@/components/ui/table/AgCustomTable";
import { setMembers } from "@/redux/slice/members";

const RenderTable = ({ type }: { type: "mentor" | "trainee" }) => {
  const dispatch = useDispatch<StoreDispatch>();
  const {
    members: { mentors, trainees },
  } = useSelector((state: RootState) => state.members);

  console.log(mentors, trainees);

  const [rowData, setRowData] = useState<Member[]>([]);
  const [colDefs] = useState<ColDef[]>([
    {
      headerName: "First Name",
      field: "first_name",
      width: 300,
    },
    {
      headerName: "Last Name",
      field: "last_name",
      width: 300,
    },
    {
      field: "email",
      editable: false,
      width: 300,
    },
    {
      headerName: "Phone Number",
      field: "phone_number",
      width: 300,
    },
    {
      headerName: "Joining Date",
      field: "joining_date",
      valueFormatter: dateFormatter,
      width: 250,
    },
  ]);

  useEffect(() => {
    dispatch(setMembers("mentors"));
    // if (type === "mentor") setRowData(DemoData);
    // else if (type === "trainee") setRowData([]);
    // else setRowData([]);
  }, []);


  if (rowData.length === 0) return <Loader />;

  return <Table colDefs={colDefs} rowData={rowData} />;
};

export default RenderTable;

export const DemoData: Member[] = [
  {
    id: "c35a82b4-0db7-4c00-9283-76b17f959901",
    username: "mentor",
    first_name: "John",
    last_name: "Doe",
    email: "mentor@mail.com",
    phone_number: "1234567890",
    joining_date: "2022-07-15",
  },
  {
    id: "dcf95c72-c8cb-47ee-a589-d9d3309e40c0",
    username: "mentor2",
    first_name: "John",
    last_name: "Doe",
    email: "mentor2@mail.com",
    phone_number: "1234567890",
    joining_date: "2022-07-15",
  },
  {
    id: "51ad9cfa-a66d-4011-98d2-fafb21988286",
    username: "cutuuu",
    first_name: "Cutie",
    last_name: "Pie",
    email: "cutuuu@gmail.com",
    phone_number: "1234567890",
    joining_date: "2022-07-15",
  },
];
