"use client";

import type { ColDef } from "ag-grid-community";
import type { CollectionFormData } from "@/dependencies/yup";
import type { UUID } from "crypto";

import { useEffect, useState } from "react";

import { getAllColumns } from "./columns/collections";

// componets

import { Table } from "@/components/ui/table/AgCustomTable";

const RenderTable = ({
  rowData,
  setDeletable,
  selectedColumns,
  setOpen,
  setSelectedRowId,
  setRowData,
}: {
  rowData: CollectionFormData[];
  setDeletable: (id: UUID | null) => void;
  selectedColumns: string[];
  setOpen: (open: boolean) => void;
  setSelectedRowId: (id: UUID[] | null) => void;
  setRowData: (data: CollectionFormData[]) => void;
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
      actionType="collection"
      colDefs={colDefs}
      rowData={rowData}
      setRowData={setRowData as any}
      setSelectedRowId={setSelectedRowId}
    />
  );
};

export default RenderTable;
