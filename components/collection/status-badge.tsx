import { FaPlay } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { FaCircleCheck } from "react-icons/fa6";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const StatusBadge = ({
  status,
}: {
  status: "started" | "completed" | "not-started";
}) => {
  const statusColor = {
    started: "bg-blue-400 hover:bg-blue-400 text-white",
    completed: "bg-green-400 hover:bg-green-400",
    "not-started": "bg-yellow-400 hover:bg-yellow-400",
  }[status];

  const statusText = {
    started: "Started",
    completed: "Completed",
    "not-started": "Not Started",
  }[status];

  const statusIcon = {
    started: <FaPlay />,
    completed: <FaCircleCheck />,
    "not-started": <SiBookstack />,
  }[status];

  return (
    <Badge
      className={cn(
        "flex gap-2 items-center hover:opacity-100 text-black/70 w-max",
        statusColor,
      )}
    >
      {statusIcon}
      {statusText}
    </Badge>
  );
};

export const LinkBadge = () => {
  return (
    <Link
    key={`${index}-${collection.id}`}
    className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-medium border 
          bg-primary-100 text-primary-800 border-primary-300"
    href={`/dashboard/collections/${collection.id}`}
    >
    {collection.title}
    </Link>
  )
}