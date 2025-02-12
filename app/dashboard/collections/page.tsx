"use client";

import type { CollectionFormData } from "@/dependencies/yup";
import type { StoreDispatch, RootState } from "@/redux/store";
import type { UUID } from "crypto";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";

// componets
import { ColumnSelectorDropdown } from "@/components/collection/tableColumnsSelector";
import { RenderTableCollections } from "@/components/dashboard/tables";
import {
  defaultColumns,
  allColumns,
} from "@/components/dashboard/tables/columns/collections";
import { ModalDialog } from "@/components/collection/modal";
import { MyAlertDialog } from "@/components/collection/alert-dialog";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
// form
import { AddCollection } from "@/components/dashboard/forms";
// API
import { getCourseCollection, deleteCollection } from "@/lib/api";

const CollectoinsPage = () => {
  const [rowData, setRowData] = useState<CollectionFormData[]>([]);
  const [open, setOpen] = useState(false);
  const [openAlertDeleteMultiple, setOpenAlertDeleteMultiple] =
    useState<boolean>(false);
  const [deletableID, setDeletableID] = useState<UUID | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<UUID[] | null>(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedColumns, setSelectedColumns] =
    useState<string[]>(defaultColumns);

  const dispatch = useDispatch<StoreDispatch>();
  const isLoading = useSelector((state: RootState) => state.app.auth.isLoading);

  useEffect(() => {
    dispatch(getCourseCollection()).then((data) => {
      setRowData(data);
    });
  }, []);

  const deleteCollections = () => {
    if (deletableID) {
      dispatch(deleteCollection(deletableID)).then(() => {
        dispatch(getCourseCollection()).then((data) => {
          setRowData(data);
        });
      });
    }
  };

  const deleteMultipleMentors = () => {
    if (selectedRowId && selectedRowId.length > 0) {
      dispatch(deleteCollection(selectedRowId, true)).then(() => {
        dispatch(getCourseCollection()).then((data) => {
          setRowData(data);
        });
      });
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-full gap-3">
        <div className="flex justify-end gap-2">
          {selectedRowId && selectedRowId.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setOpenAlertDeleteMultiple(true)}
            >
              Delete Collection
            </Button>
          )}
          <ModalDialog
            description="Add a new Course Collection"
            setState={setOpen}
            state={open}
            title="Add Collection"
          >
            <AddCollection setCollections={setRowData} setState={setOpen} />
          </ModalDialog>
          {rowData.length > 0 && (
            <ColumnSelectorDropdown
              columns={allColumns}
              parentSelectedColumns={selectedColumns}
              setParentSelectedColumns={setSelectedColumns}
            />
          )}
        </div>

        {isLoading ? (
          <Loader />
        ) : rowData && rowData.length > 0 ? (
          <div className="flex flex-col w-full h-full">
            <RenderTableCollections
              rowData={rowData}
              selectedColumns={selectedColumns}
              setDeletable={setDeletableID}
              setOpen={setOpenAlert}
              setRowData={setRowData}
              setSelectedRowId={setSelectedRowId}
            />
          </div>
        ) : (
          <div className="flex flex-col w-full h-full">
            <div className="w-full h-full flex justify-center items-center">
              <Empty
                description={
                  <span className="text-neutral-500">No Collections found</span>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          </div>
        )}

        <MyAlertDialog
          description="Are you sure you want to delete this Collection?"
          setOpen={setOpenAlert}
          title="Delete Collection"
          onContinue={deleteCollections}
          onOpen={openAlert}
        />
        <MyAlertDialog
          description="Are you sure you want to delete selected collections?"
          setOpen={setOpenAlertDeleteMultiple}
          title="Delete Collections"
          onContinue={deleteMultipleMentors}
          onOpen={openAlertDeleteMultiple}
        />
      </div>
    </>
  );
};

export default CollectoinsPage;
