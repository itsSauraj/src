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
      <SheetContent className="min-w-[800px] max-w-[px]">
        <SheetHeader>
          <SheetTitle>{title && title}</SheetTitle>
        </SheetHeader>
        {children}
        <SheetFooter>{footer}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
