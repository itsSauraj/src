"use client";

import type { ColDef } from "ag-grid-community";
import type { Member } from "@/types/compoents/table";
import type { StoreDispatch } from "@/redux/store";
import type { members } from "@/types";

import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

// hooks
import { useMediaQuery } from "@/hooks/use-media-query";
// functions
import { getMentors, getTrainees } from "@/redux/slice/app";
// loader
import Loader from "@/components/ui/loader";
// componets
import {
  DateFormatter,
  ActionsFormatter,
} from "@/components/ui/table/formater";
import { Table } from "@/components/ui/table/AgCustomTable";

const RenderTable = ({ type }: { type: members }) => {
  const dispatch = useDispatch<StoreDispatch>();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const [rowData, setRowData] = useState<Member[]>([]);
  const [colDefs] = useState<ColDef[]>([
    {
      headerName: "First Name",
      field: "first_name",
      flex: !isSmallScreen ? 1 : 0,
      cellClass: "font-bold",
      headerClass: "font-bold",
    },
    {
      headerName: "Last Name",
      field: "last_name",
      width: 250,
    },
    {
      field: "email",
      width: 250,
    },
    {
      headerName: "Phone Number",
      field: "phone_number",
      width: 200,
      sortable: false,
    },
    {
      headerName: "Joining Date",
      field: "joining_date",
      valueFormatter: DateFormatter,
      width: 200,
    },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: ActionsFormatter,
      width: 120,
      editable: false,
      sortable: false,
      filter: false,
    },
  ]);

  useEffect(() => {
    if (type === "mentor") {
      dispatch(getMentors()).then((data) => {
        setRowData(data);
      });
    } else if (type === "trainee") {
      dispatch(getTrainees()).then((data) => {
        setRowData(data);
      });
    } else {
      setRowData([]);
    }
  }, []);

  if (rowData.length === 0) return <Loader />;

  return <Table colDefs={colDefs} rowData={rowData} />;
};

export default RenderTable;
