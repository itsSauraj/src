import { Plus, Upload } from "lucide-react";

import { CreateToolTipT } from "./tooltip";

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

export function ModalDialog({
  state,
  setState,
  type,
  title,
  description,
  children,
  className,
  disabled,
}: {
  state: boolean;
  setState: (open: boolean) => void;
  type?: "add" | "import";
  title: string;
  description: string;
  children?: React.JSX.Element;
  className?: string;
  disabled?: boolean;
}) {
  const icons = {
    add: <Plus className="h-4 w-4 mr-2" />,
    import: <Upload className="h-4 w-4 mr-2" />,
  };

  return (
    <Dialog open={state} onOpenChange={setState}>
      <CreateToolTipT
        content={title}
        trigger={
          <DialogTrigger asChild>
            <Button>
              {icons[type || "add"]}
              {title}
            </Button>
          </DialogTrigger>
        }
      />
      <DialogContent
        className={cn("sm:max-w-[425px]", className)}
        onPointerDownOutside={(e) => disabled && e.preventDefault()}
      >
        <DialogHeader className="">
          <DialogTitle className="captalize">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
