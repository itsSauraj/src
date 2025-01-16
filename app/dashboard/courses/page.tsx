"use client";

import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";

import { Button } from "@/components/ui/button";
import MyDrawer from "@/components/ui/next-drawer";
import { AddCouse } from "@/components/dashboard/forms";
import { AddDialog } from "@/components/collection/modal";

export const CourseDashboard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [open, setOpen] = useState(false);

  const handleBackdropChange = () => {
    onOpen();
  };

  return (
    <div className="flex flex-col w-full h-[80svh]">
      <div className="flex justify-end">
        <AddDialog
          className="sm:min-w-[100svw] lg:min-w-[80svw] sm:max-h-full lg:max-h-[80svh] overflow-y-scroll"
          description="Add a new mentor to your training group"
          setState={setOpen}
          state={open}
          title="Add Course"
        >
          <div className="h-full">
            <AddCouse />
          </div>
        </AddDialog>
        <div className="flex gap-2">
          <Button
            className="capitalize"
            color="primary"
            onClick={() => handleBackdropChange()}
          >
            View Course
          </Button>
        </div>
        <MyDrawer
          footer={
            <Button
              className="capitalize"
              color="primary"
              onClick={() => onOpenChange()}
            >
              Close
            </Button>
          }
          isOpen={isOpen}
          title="Add Course"
          onOpenChange={onOpenChange}
        >
          Course Detaile here
        </MyDrawer>
      </div>
    </div>
  );
};

export default CourseDashboard;
