"use client";

import type { IMemberForm } from "@/dependencies/yup";
import type { StoreDispatch, RootState } from "@/redux/store";
import type { UUID } from "crypto";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// componets
import RenderTable from "@/components/dashboard/renderTable";
import { AddDialog } from "@/components/collection/modal";
import { AddMember } from "@/components/dashboard/forms";
import { MyAlertDialog } from "@/components/collection/alert-dialog";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
// API
import { getTrainees, deleteMember } from "@/lib/api";

export const Dashboard = () => {
  const [rowData, setRowData] = useState<IMemberForm[]>([]);
  const [open, setOpen] = useState(false);
  const [openAlertDeleteMultiple, setOpenAlertDeleteMultiple] =
    useState<boolean>(false);
  const [deletableID, setDeletableID] = useState<UUID | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<UUID[] | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const dispatch = useDispatch<StoreDispatch>();
  const isLoading = useSelector((state: RootState) => state.app.auth.isLoading);

  useEffect(() => {
    dispatch(getTrainees()).then((data) => {
      setRowData(data);
    });
  }, []);

  const deleteMentor = () => {
    if (deletableID) {
      dispatch(deleteMember(deletableID)).then(() => {
        dispatch(getTrainees()).then((data) => {
          setRowData(data);
        });
      });
      setDeletableID(null);
    }
  };

  const deleteMultipleMentors = () => {
    if (selectedRowId && selectedRowId.length > 0) {
      dispatch(deleteMember(selectedRowId, true)).then(() => {
        dispatch(getTrainees()).then((data) => {
          setRowData(data);
        });
      });
      setSelectedRowId(null);
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
              Delete Mentors
            </Button>
          )}
          <AddDialog
            description="Add a new trainee to your training group"
            setState={setOpen}
            state={open}
            title="Add Trainee"
          >
            <AddMember setData={setRowData} setState={setOpen} type="trainee" />
          </AddDialog>
        </div>
        <div className="flex flex-col w-full h-full">
          {isLoading ? (
            <Loader />
          ) : rowData && rowData.length > 0 ? (
            <RenderTable
              rowData={rowData}
              setDeletable={setDeletableID}
              setOpen={setOpenAlert}
              setSelectedRowId={setSelectedRowId}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              No Data Found
            </div>
          )}
        </div>
      </div>
      <MyAlertDialog
        description="Are you sure you want to delete this trainee?"
        setOpen={setOpenAlert}
        title="Delete Trainee"
        onContinue={deleteMentor}
        onOpen={openAlert}
      />
      <MyAlertDialog
        description="Are you sure you want to delete selected trainees?"
        setOpen={setOpenAlertDeleteMultiple}
        title="Delete Trainees"
        onContinue={deleteMultipleMentors}
        onOpen={openAlertDeleteMultiple}
      />
    </>
  );
};

export default Dashboard;
