import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function AddDialog({
  state,
  setState,
  title,
  description,
  children,
  className,
}: {
  state: boolean;
  setState: (value: boolean) => void;
  title: string;
  description: string;
  children?: React.JSX.Element;
  className?: string;
}) {
  return (
    <Dialog open={state} onOpenChange={setState}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        <DialogHeader className="">
          <DialogTitle className="captalize">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
