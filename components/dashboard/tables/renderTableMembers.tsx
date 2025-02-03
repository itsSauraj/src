"use client";

import type { ColDef } from "ag-grid-community";
import type { IMemberForm } from "@/dependencies/yup";
import type { UUID } from "crypto";

import { useState, useEffect } from "react";

import { getAllColumns } from "./columns/members";

import { Table } from "@/components/ui/table/AgCustomTable";

const RenderTable = ({
  rowData,
  selectedColumns,
  setDeletable,
  setOpen,
  setSelectedRowId,
}: {
  rowData: IMemberForm[];
  selectedColumns: string[];
  setDeletable: (id: UUID | null) => void;
  setOpen: (open: boolean) => void;
  setSelectedRowId: (id: UUID[] | null) => void;
}) => {
  const actions = {
    setDeletable: setDeletable,
    setOpen: setOpen,
  };

  const [colDefs, setColDefs] = useState<ColDef[]>(
    getAllColumns(actions, selectedColumns),
  );

  useEffect(() => {
    setColDefs(getAllColumns(actions, selectedColumns));
  }, [selectedColumns]);

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
