"use client";

import type { UUID } from "crypto";
import type { StoreDispatch } from "@/redux/store";

import React from "react";
import { useDispatch } from "react-redux";
//icons
import { X } from "lucide-react";

import { markNotificationAsRead, markAllNotificationAsRead } from "@/lib/api";
//Components
import { Button } from "@/components/ui/button";
import { CreateToolTipT } from "@/components/collection/tooltip";

export const ReadOneButton = ({ id }: { id: UUID }) => {
  const dispatch = useDispatch<StoreDispatch>();

  const handleRead = async () => {
    try {
      dispatch(markNotificationAsRead(id));
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  };

  return (
    <CreateToolTipT
      content="Close"
      trigger={
        <Button
          className="px-1 h-6 absolute top-0 right-0 hover:text-red-500"
          variant="link"
          onClick={handleRead}
        >
          <X />
        </Button>
      }
    />
  );
};

export const ReadAllButton = () => {
  const dispatch = useDispatch<StoreDispatch>();

  const handleReadAll = async () => {
    try {
      dispatch(markAllNotificationAsRead());
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  };

  return (
    <CreateToolTipT
      content="Close All"
      trigger={
        <Button
          className="text-sm h-max px-2 py-1"
          variant="outline"
          onClick={handleReadAll}
        >
          Close All
        </Button>
      }
    />
  );
};
