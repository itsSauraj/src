"use client";

import React, { useState } from "react";
import { ListFilter } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const ColumnSelectorDropdown = ({
  parentSelectedColumns,
  setParentSelectedColumns,
  columns,
}: {
  parentSelectedColumns: string[];
  setParentSelectedColumns: (columns: string[]) => void;
  columns: Record<string, string>[];
}) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    parentSelectedColumns,
  );

  const toggleColumn = (columnKey: string) => {
    setSelectedColumns((prev) => {
      if (prev.includes(columnKey)) {
        return prev.filter((col) => col !== columnKey);
      } else {
        const newSelected = [...prev, columnKey];

        return columns
          .map((column) => column.key)
          .filter((key) => newSelected.includes(key));
      }
    });
  };

  const applyColumns = () => {
    setParentSelectedColumns(selectedColumns);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <ListFilter className="mr-2 h-4 w-4" />
          Select Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Visible Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuItem
            key={column.key}
            className="flex items-center space-x-2"
            onSelect={(e) => e.preventDefault()}
          >
            <Checkbox
              checked={selectedColumns.includes(column.key)}
              id={column.key}
              onCheckedChange={() => toggleColumn(column.key)}
            />
            <label
              className="text-sm font-medium cursor-pointer"
              htmlFor={column.key}
            >
              {column.label}
            </label>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            applyColumns();
          }}
        >
          <Button className="w-full">Apply</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ColumnSelectorDropdown };
