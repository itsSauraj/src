import type { Exam } from "@/types/dashboard/exam";

import React, { useMemo } from "react";
import { format, parseISO } from "date-fns";
import {
  Calendar,
  Clock,
  Timer,
  Mail,
  Book,
  FileText,
  Edit,
  Trash2,
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LinkBadge } from "@/components/collection/status-badge";

const ExamDetails = ({
  critical,
  details,
  onCancelExam,
  onEditExam,
}: {
  critical: boolean;
  details: Exam;
  onCancelExam: React.Dispatch<React.SetStateAction<boolean>>;
  onEditExam: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const formatDate = useMemo(
    () => (dateString: string) => {
      return format(parseISO(dateString), "PPP");
    },
    [],
  );

  const formatTime = useMemo(
    () => (timeString: string) => {
      return format(parseISO(`2000-01-01T${timeString}`), "h:mm a");
    },
    [],
  );

  const getInitials = useMemo(
    () => (firstName: string, lastName: string) => {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    },
    [],
  );

  return (
    <div className="w-full mx-auto p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Book className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">{details.collection.title}</h1>
            </div>
            <Badge className="mt-2" variant="outline">
              Upcoming
            </Badge>
          </div>
          {!critical && (
            <div className="flex gap-2">
              <Button
                className="gap-2"
                variant="outline"
                onClick={() => onEditExam((value) => !value)}
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button
                className="gap-2"
                variant="destructive"
                onClick={() => onCancelExam((value) => !value)}
              >
                <Trash2 className="h-4 w-4" />
                Cancel Exam
              </Button>
            </div>
          )}
        </div>
      </div>

      <ScrollArea className="h-[75svh]">
        <div className="grid gap-6 md:grid-cols-2 py-2">
          {/* Time and Duration Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Schedule Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{formatDate(details.exam_date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{formatTime(details.exam_time)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Timer className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{details.duration} minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collection Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Book className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Course Title</p>
                  <p className="font-medium">{details.collection.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Courses</p>
                  <div className="flex flex-wrap gap-1">
                    {details.collection.courses.map((course) => (
                      <LinkBadge
                        key={course.id}
                        href="#"
                        value={course.title}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trainee Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trainee Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Link
                  href={`/dashboard/trainees/${details.assigned_trainee.id}`}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={
                        process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH +
                        details.assigned_trainee.avatar
                      }
                    />
                    <AvatarFallback>
                      {getInitials(
                        details.assigned_trainee.first_name,
                        details.assigned_trainee.last_name,
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="space-y-3">
                  <div>
                    <Link
                      className="font-medium hover:underline"
                      href={`/dashboard/trainees/${details.assigned_trainee.id}`}
                    >
                      {details.assigned_trainee.first_name}{" "}
                      {details.assigned_trainee.last_name}
                    </Link>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Link
                        className="flex items-center hover:underline"
                        href={`mailto:${details.assigned_trainee.email}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        {details.assigned_trainee.email}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mentor Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mentor Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={
                      process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH +
                      details.assigned_mentor.avatar
                    }
                  />
                  <AvatarFallback>
                    {getInitials(
                      details.assigned_mentor.first_name,
                      details.assigned_mentor.last_name,
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">
                      {details.assigned_mentor.first_name}{" "}
                      {details.assigned_mentor.last_name}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Link
                        className="flex items-center hover:underline"
                        href={`mailto:${details.assigned_mentor.email}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        {details.assigned_mentor.email}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Created By Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Created By
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {getInitials(
                          details.created_by.first_name,
                          details.created_by.last_name,
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {details.created_by.first_name}{" "}
                        {details.created_by.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {details.created_by.email}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Exam Details
                  </p>
                  <p className="text-sm">{details.exam_details}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ExamDetails;
