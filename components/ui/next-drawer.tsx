"use client";

export type backdrop = "opaque" | "blur" | "transparent";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@nextui-org/react";

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
    <>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                {title}
              </DrawerHeader>
              <DrawerBody>{children}</DrawerBody>
              <DrawerFooter>{footer}</DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
