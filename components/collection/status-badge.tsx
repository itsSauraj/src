import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const StatusBadge = ({
  status,
}: {
  status: "started" | "completed" | "not-started";
}) => {
  const statusColor = {
    started: "bg-blue-400 hover:bg-blue-400",
    completed: "bg-green-400 hover:bg-green-400",
    "not-started": "bg-yellow-400 hover:bg-yellow-400",
  }[status];

  const statusText = {
    started: "Started",
    completed: "Completed",
    "not-started": "Not Started",
  }[status];

  return (
    <Badge className={cn("hover:opacity-100 text-black/70 w-max", statusColor)}>
      {statusText}
    </Badge>
  );
};
