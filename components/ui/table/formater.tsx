/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import type { CustomCellRendererProps } from "ag-grid-react";
import type { ValueFormatterParams } from "ag-grid-community";
import type { UUID } from "crypto";

import React from "react";
import { TbViewportWide } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import { CiImageOff } from "react-icons/ci";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const pathName = usePathname();

  const handleView = () => {
    router.push(`${pathName}/${props.data.id}`);
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

export const ImageFormatter = (
  props: CustomCellRendererProps,
  title?: string,
) => {
  if (!props.value) {
    return (
      <div className="flex items-center gap-3 h-full w-full">
        <CiImageOff size={20} />
        <p className="text-gray-500 dark:text-gray-400">No Image</p>
      </div>
    );
  }
  const imagePath = process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH + props.value;

  return (
    <div className={cn("flex items-center gap-2")}>
      <Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  className="h-full w-full cursor-zoom-in"
                  variant="ghost"
                >
                  <img
                    alt={title}
                    className="h-full w-full object-cover rounded-md"
                    src={imagePath}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/placeholder-image.png";
                    }}
                  />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Expand</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <img
              alt={title}
              className="h-full w-full object-contain"
              src={imagePath}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const TextFormatter = (props: CustomCellRendererProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="h-full">
            <p className="truncate cursor-pointer">{props.value}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{props.value}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
