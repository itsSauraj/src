"use client";

export type backdrop = "opaque" | "blur" | "transparent";

import React from "react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MyDrawer({
  isOpen,
  onOpenChange,
  title,
  children,
  footer,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Sheet modal={true} open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="min-w-[100svw] lg:min-w-[800px]">
        <SheetHeader>
          <SheetTitle>{title && title}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[100svh] py-3">{children}</ScrollArea>
        <SheetFooter>{footer}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
