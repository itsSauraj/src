/* eslint-disable react-hooks/rules-of-hooks */
import type { CustomCellRendererProps } from "ag-grid-react";
import type { ValueFormatterParams } from "ag-grid-community";
import type { UUID } from "crypto";

import { TbViewportWide } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const DateFormatter = (params: ValueFormatterParams): string => {
  return new Date(params.value).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const ActionsFormatter = (
  setDeletable: (value: UUID | null) => void,
  setOpen: (value: boolean) => void,
  props: CustomCellRendererProps,
) => {

  const router = useRouter();

  const handleView = () => {
    router.push(`/dashboard/trainees/${props.data.id}`);
  };

  const handleDelete = () => {
    setDeletable(props.data.id);
    setOpen(true);
  };

  return (
    <div className="flex justify-around gap-2 items-center h-full">
      {props.data.groups && props.data.groups[0] !== "trainee" ? null : (
        <Button
          className="text-lg bg-gray-500 dark:bg-gray-200/80 dark:text-black/60 h-auto p-2 hover:opacity-70"
          onClick={handleView}
        >
          <TbViewportWide />
        </Button>
      )}
      <Button
        className="text-lg bg-red-500 dark:bg-red-600/80 dark:text-white h-auto p-2 hover:bg-red-600/80 hover:opacity-70"
        onClick={handleDelete}
      >
        <MdDelete />
      </Button>
    </div>
  );
};
