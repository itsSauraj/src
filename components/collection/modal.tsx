import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddDialog({
  state,
  setState,
  title,
  description,
  children,
}: {
  state: boolean;
  setState: (value: boolean) => void;
  title: string;
  description: string;
  children?: React.JSX.Element;
}) {
  return (
    <Dialog open={state} onOpenChange={setState}>
      <DialogTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="captalize">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
