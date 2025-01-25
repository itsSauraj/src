"use client";

import type { ColDef } from "ag-grid-community";
import type { IMemberForm } from "@/dependencies/yup";
import type { UUID } from "crypto";

import { useState } from "react";

// hooks
import { useMediaQuery } from "@/hooks/use-media-query";
// componets
import {
  DateFormatter,
  ActionsFormatter,
} from "@/components/ui/table/formater";
import { Table } from "@/components/ui/table/AgCustomTable";

const RenderTable = ({
  rowData,
  setDeletable,
  setOpen,
  setSelectedRowId,
}: {
  rowData: IMemberForm[];
  setDeletable: (id: UUID | null) => void;
  setOpen: (open: boolean) => void;
  setSelectedRowId: (id: UUID[] | null) => void;
}) => {
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
      cellRenderer: (_params: any) =>
        ActionsFormatter(setDeletable, setOpen, _params),
      width: 120,
      editable: false,
      sortable: false,
      filter: false,
    },
  ]);

  return (
    <Table
      actionType="member"
      colDefs={colDefs}
      rowData={rowData}
      setSelectedRowId={setSelectedRowId}
    />
  );
};

export default RenderTable;
