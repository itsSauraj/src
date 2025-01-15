"use client";

import type { ColDef, RowSelectionOptions } from "ag-grid-community";
import type { IRows } from "@/types/compoents/table";

import React, { useMemo } from "react";
import { useTheme } from "next-themes";
//Theme
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { themeQuartz, iconSetQuartzBold } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

const customDark = themeQuartz.withPart(iconSetQuartzBold).withParams({
  accentColor: "#FFFFFF",
  backgroundColor: "#404040",
  browserColorScheme: "inherit",
  chromeBackgroundColor: "#2D2C2C",
  foregroundColor: "#FFF",
  headerFontSize: 14,
});

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection: RowSelectionOptions = {
  mode: "multiRow",
};

export const Table = ({
  rowData,
  colDefs,
}: {
  rowData: IRows[];
  colDefs: ColDef[];
}) => {
  const themeIsDark = useTheme().theme === "dark";

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <AgGridReact
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        rowData={rowData}
        rowSelection={rowSelection}
        theme={themeIsDark ? customDark : undefined}
        onCellValueChanged={(event) => {
          console.log(event.data);
        }}
        onSelectionChanged={(event) => {
          const selected_rows = event.api.getSelectedRows();
          const selected_rows_id = selected_rows.map((row) => row.id);

          console.log(selected_rows_id);
        }}
      />
    </div>
  );
};
