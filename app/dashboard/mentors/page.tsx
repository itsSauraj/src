"use client";

import type { IMemberForm } from "@/dependencies/yup";
import type { StoreDispatch, RootState } from "@/redux/store";
import type { UUID } from "crypto";

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";

// componets
import {
  defaultColumns,
  allColumns,
} from "@/components/dashboard/tables/columns/members";
import { RenderTableMembers } from "@/components/dashboard/tables";
// collections
import { ColumnSelectorDropdown } from "@/components/collection/tableColumnsSelector";
import { ModalDialog } from "@/components/collection/modal";
import { AddMember } from "@/components/dashboard/forms";
import { MyAlertDialog } from "@/components/collection/alert-dialog";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
// API
import { getMentors, deleteMember } from "@/lib/api";

const MentorsPage = () => {
  const [rowData, setRowData] = useState<IMemberForm[]>([]);
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
    dispatch(getMentors()).then((data) => {
      setRowData(data);
    });
  }, []);


  const deleteMentor = useCallback(() => {
    if (deletableID) {
      dispatch(deleteMember(deletableID)).then(() => {
        setRowData((prev) => prev.filter((item) => item.id !== deletableID));
        setDeletableID(null);
      });
    }
  }, [deletableID, dispatch]);

  const deleteMultipleMentors = useCallback(() => {
    if (selectedRowId && selectedRowId.length > 0) {
      dispatch(deleteMember(selectedRowId, true)).then(() => {
        setRowData((prev) =>
          prev.filter((item) => !selectedRowId.includes(item.id as UUID)),
        );
        setSelectedRowId(null);
      });
    }
  }, [selectedRowId, dispatch]);

  return (
    <>
      <div className="flex flex-col w-full h-full gap-3">
        <div className="flex justify-end gap-2">
          {selectedRowId && selectedRowId.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setOpenAlertDeleteMultiple(true)}
            >
              Delete Mentors
            </Button>
          )}
          <ModalDialog
            description="Add a new mentor to your training group"
            setState={setOpen}
            state={open}
            title="Add Mentor"
          >
            <AddMember setData={setRowData} setState={setOpen} type="mentor" />
          </ModalDialog>
          {rowData.length > 0 && (
            <ColumnSelectorDropdown
              columns={allColumns}
              parentSelectedColumns={selectedColumns}
              setParentSelectedColumns={setSelectedColumns}
            />
          )}
        </div>
        <div className="flex flex-col w-full h-full">
          {isLoading ? (
            <Loader />
          ) : rowData && rowData.length > 0 ? (
            <RenderTableMembers
              rowData={rowData}
              selectedColumns={selectedColumns}
              setDeletable={setDeletableID}
              setOpen={setOpenAlert}
              setSelectedRowId={setSelectedRowId}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <Empty
                description={
                  <span className="text-neutral-500">No mentors found</span>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          )}
        </div>
        <MyAlertDialog
          description="Are you sure you want to delete this mentor?"
          setOpen={setOpenAlert}
          title="Delete Mentor"
          onContinue={deleteMentor}
          onOpen={openAlert}
        />
        <MyAlertDialog
          description="Are you sure you want to delete selected mentors?"
          setOpen={setOpenAlertDeleteMultiple}
          title="Delete Mentors"
          onContinue={deleteMultipleMentors}
          onOpen={openAlertDeleteMultiple}
        />
      </div>
    </>
  );
};

export default MentorsPage;
