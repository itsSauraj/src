"use client";

import type { ColDef } from "ag-grid-community";
import type { IMemberForm } from "@/dependencies/yup";

import { useState } from "react";

// hooks
import { useMediaQuery } from "@/hooks/use-media-query";
// loader
import Loader from "@/components/ui/loader";
// componets
import {
  DateFormatter,
  ActionsFormatter,
} from "@/components/ui/table/formater";
import { Table } from "@/components/ui/table/AgCustomTable";

const RenderTable = ({ rowData }: { rowData: IMemberForm[] }) => {
  const isSmallScreen = useMediaQuery("(max-width: 1300px)");

  const [colDefs] = useState<ColDef[]>([
    {
      headerName: "Employee ID",
      field: "employee_id",
      width: 150,
      cellClass: "font-bold",
      headerClass: "font-bold",
      editable: false,
    },
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

  if (rowData.length === 0) return <Loader />;

  return <Table colDefs={colDefs} rowData={rowData} />;
};

export default RenderTable;
