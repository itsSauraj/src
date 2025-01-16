"use client";

import type { ICourse, IExistingModule } from "@/types/dashboard/forms";

import React, { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

// Components
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const ModuleCombobox: React.FC<{
  form: UseFormReturn<ICourse>;
  moduleIndex: number;
}> = ({ form, moduleIndex }) => {
  const [existingModules, setExistingModules] = useState<IExistingModule[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const modules = form.watch("modules").filter((module, index) => {
      return index !== moduleIndex;
    });
    const existingModules = modules.map((module) => ({
      id: module.id,
      title: module.title,
    }));

    console.log(existingModules);
  }, [form.watch("modules")]);

  return (
    <FormField
      control={form.control}
      name={`modules.${moduleIndex}.parent_module`}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Parent Module</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  aria-expanded={open}
                  className="w-full justify-between"
                  role="combobox"
                  variant="outline"
                >
                  {field.value
                    ? existingModules.find(
                        (module) => module.id === field.value,
                      )?.title
                    : "Select parent module..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search modules..." />
                <CommandEmpty>No module found.</CommandEmpty>
                <CommandGroup>
                  {existingModules.map((module) => (
                    <CommandItem
                      key={module.id}
                      value={module.title}
                      onSelect={() => {
                        form.setValue(
                          `modules.${moduleIndex}.parent_module`,
                          module.id,
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === module.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {module.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ModuleCombobox;
