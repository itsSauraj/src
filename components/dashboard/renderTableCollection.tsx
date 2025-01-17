"use client";

import type { ColDef } from "ag-grid-community";
import type { CollectionFormData } from "@/dependencies/yup";
import type { UUID } from "crypto";

import { useState } from "react";

// componets
import { ActionsFormatter } from "@/components/ui/table/formater";
import { Table } from "@/components/ui/table/AgCustomTable";

const RenderTable = ({
  rowData,
  setDeletable,
  setOpen,
  setSelectedRowId,
}: {
  rowData: CollectionFormData[];
  setDeletable: (id: UUID | null) => void;
  setOpen: (open: boolean) => void;
  setSelectedRowId: (id: UUID[] | null) => void;
}) => {
  const [colDefs] = useState<ColDef[]>([
    {
      headerName: "Title",
      field: "title",
      cellClass: "font-bold",
      headerClass: "font-bold",
      flex: 1,
    },
    {
      headerName: "Description",
      field: "description",
      cellClass: "font-bold",
      headerClass: "font-bold",
      flex: 2,
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
      colDefs={colDefs}
      rowData={rowData}
      setSelectedRowId={setSelectedRowId}
    />
  );
};

export default RenderTable;
