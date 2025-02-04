"use client";

import type { ColDef, RowSelectionOptions } from "ag-grid-community";
import type { IRows } from "@/types/compoents/table";
import type { UUID } from "crypto";
import type { StoreDispatch } from "@/redux/store";

import React, { useMemo } from "react";
import { useTheme } from "next-themes";
//Theme
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  iconSetQuartzBold,
} from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
// Redux
import { useDispatch } from "react-redux";

//APIS
import {
  updateCollection,
  updateUserDetails,
  setDefaultCollection,
  getCourseCollection,
} from "@/lib/api";

const customLight = themeQuartz.withPart(iconSetQuartzBold).withParams({
  checkboxUncheckedBorderColor: "#2563eb",
  checkboxCheckedBorderColor: "#2563eb",
});

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
  setSelectedRowId,
  actionType,
  setRowData,
}: {
  rowData: IRows[];
  colDefs: ColDef[];
  setSelectedRowId: (id: UUID[]) => void;
  actionType?: "collection" | "member";
  setRowData?: (data: IRows[]) => void;
}) => {
  const themeIsDark = useTheme().theme === "dark";
  const dispatch = useDispatch<StoreDispatch>();
  const gridRef = React.useRef<any>(null);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      filter: true,
      editable: true,
    }),
    [],
  );

  const handleDefaultValueChange = async (event: any) => {
    await dispatch(setDefaultCollection(event.data.id));

    dispatch(getCourseCollection()).then((data: any) => {
      data && setRowData && setRowData(data);
    });
  };

  const updateValue = (id: UUID, data: any) => {
    if (actionType === "collection") {
      const formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
      }
      dispatch(updateCollection(id, formData));
    } else {
      dispatch(updateUserDetails(id, data));
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        getRowHeight={(params) => params.data.image && 100}
        pagination={true}
        rowData={rowData}
        rowSelection={rowSelection}
        theme={themeIsDark ? customDark : customLight}
        onCellValueChanged={(event) => {
          if (event.colDef.field === "is_default") {
            handleDefaultValueChange(event);

            return;
          }

          updateValue(event.data.id, {
            [event.colDef.field as string]: event.newValue,
          });
        }}
        onGridReady={(params) => {
          gridRef.current = params.api;
        }}
        onSelectionChanged={(event) => {
          const selected_rows = event.api.getSelectedRows();
          const selected_rows_id = selected_rows.map((row) => row.id);

          setSelectedRowId(selected_rows_id);
        }}
      />
    </div>
  );
};
