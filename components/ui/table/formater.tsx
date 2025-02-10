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
import { Image } from "antd";
import { FaCheck } from "react-icons/fa";
import { X } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn, formatDuration } from "@/lib/utils";
import { CreateToolTipT } from "@/components/collection/tooltip";

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
        <CreateToolTipT
          content="View"
          trigger={
            <Button
              className="text-lg bg-primary dark:bg-gray-200/80 dark:text-black/60 h-auto p-2 hover:opacity-70"
              onClick={handleView}
            >
              <TbViewportWide />
            </Button>
          }
        />
      )}
      <CreateToolTipT
        content="Delete"
        trigger={
          <Button
            className={cn(
              "text-lg bg-red-500 dark:bg-red-600/80 dark:text-white h-auto p-2 \
          hover:bg-red-600/80 hover:opacity-70",
            )}
            onClick={handleDelete}
          >
            <MdDelete />
          </Button>
        }
      />
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

  return <Image alt={title} src={imagePath} width={200} />;
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

export const BooleanFormatter = (params: ValueFormatterParams): JSX.Element => {
  return (
    <div className="h-full flex justify-center items-center">
      {params.value ? (
        <FaCheck className="text-green-500 font-bold text-xl" />
      ) : (
        <X className="text-red-600 font-semibold text-lg" />
      )}
    </div>
  );
};

export const ListRenderer = (params: ValueFormatterParams): JSX.Element => {
  return (
    <div className="flex flex-col gap-2">
      {params.value.map((item: any) => (
        <p key={item.id} className="text-sm">
          {item.title}
        </p>
      ))}
    </div>
  );
};

export const DurationFormatter = (params: ValueFormatterParams): string => {
  return formatDuration(params.value);
};
