import type { UUID } from "crypto";
import type { Exam } from "@/types/dashboard/exam";

import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import {
  Calendar,
  Clock,
  User,
  Users,
  Timer,
  Book,
  MoreVertical,
} from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CreateToolTipT } from "@/components/collection/tooltip";

const ExamScheduleList = ({
  schedules,
  handleActionClick,
}: {
  schedules: Exam[];
  handleActionClick: (id: UUID, action: "cancel" | "edit") => void;
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const formatDate = React.useCallback((dateString: string) => {
    return format(parseISO(dateString), "PPP").toString();
  }, []);

  const formatTime = React.useCallback((timeString: string) => {
    return format(parseISO(`2000-01-01T${timeString}`), "h:mm a");
  }, []);

  const handleDropdownActionClick = (id: UUID, action: "cancel" | "edit") => {
    setOpenDropdown(null);
    handleActionClick(id, action);
  };

  return (
    <div className="w-full lg:max-w-[80%] mx-auto p-4 space-y-4">
      {schedules.map((schedule) => (
        <Card key={schedule.id} className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Book className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">
                  {schedule.collection.title}
                </CardTitle>
              </div>
              <DropdownMenu
                open={openDropdown === schedule.id}
                onOpenChange={(open) =>
                  setOpenDropdown(open ? schedule.id : null)
                }
              >
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      handleDropdownActionClick(schedule.id as UUID, "edit")
                    }
                  >
                    Edit Schedule
                  </DropdownMenuItem>
                  <Link href={`/dashboard/exam/${schedule.id}`}>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() =>
                      handleDropdownActionClick(schedule.id as UUID, "cancel")
                    }
                  >
                    Cancel Exam
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Date and Time Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {formatDate(schedule.exam_date.toString())}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">
                      {formatTime(schedule.exam_time.toString())}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Timer className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{schedule.duration} minutes</p>
                  </div>
                </div>
              </div>

              {/* Trainee Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium">Trainee</p>
                </div>
                <div className="pl-7 space-y-2">
                  <p className="font-medium">
                    {schedule.assigned_trainee.first_name}{" "}
                    {schedule.assigned_trainee.last_name}
                  </p>
                  <CreateToolTipT
                    content={schedule.assigned_trainee.email}
                    trigger={
                      <a
                        className="text-sm text-muted-foreground underline"
                        href={`mailto:${schedule.assigned_trainee.email}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {schedule.assigned_trainee.email}
                      </a>
                    }
                  />
                </div>
              </div>

              {/* Mentor Section */}
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <p className="text-sm font-medium">Mentor</p>
                  </div>
                  <div className="pl-7 space-y-2">
                    <p className="font-medium">
                      {schedule.assigned_mentor.first_name}{" "}
                      {schedule.assigned_mentor.last_name}
                    </p>
                    <CreateToolTipT
                      content={schedule.assigned_mentor.email}
                      trigger={
                        <a
                          className="text-sm text-muted-foreground underline"
                          href={`mailto:${schedule.assigned_mentor.email}`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {schedule.assigned_mentor.email}
                        </a>
                      }
                    />
                  </div>
                </div>
                <div className="flex w-full  justify-end">
                  <CreateToolTipT
                    content="View Exam Details"
                    trigger={
                      <Link
                        className="text-primary"
                        href={`/dashboard/exam/${schedule.id}`}
                      >
                        <FaArrowRightLong
                          className="w-10 text-3xl hover:scale-110
                    transition-all duration-150 ease-in-out"
                        />
                      </Link>
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExamScheduleList;
