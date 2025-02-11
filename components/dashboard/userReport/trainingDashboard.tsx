import type { TrainingReportData, Collection } from "@/types/dashboard/report";

import React from "react";
import { SiBookstack } from "react-icons/si";
import { FaCircleCheck } from "react-icons/fa6";
import { IoBookSharp } from "react-icons/io5";
import { Progress } from "antd";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { themeProgressText, getProgressColor } from "@/lib/utils_components";

export const TrainingDashboard = ({ data }: { data: TrainingReportData }) => {
  const calculateOverallProgress = () => {
    const totalProgress = data.collections.reduce(
      (sum, collection) => sum + collection.progress,
      0,
    );

    return Math.round(totalProgress / data.collections.length);
  };

  const Stats = [
    {
      icon: SiBookstack,
      title: "Total Collections",
      value: data.collections.length,
    },
    {
      icon: FaCircleCheck,
      title: "Completed Collections",
      value: data.collections.filter((c) => c.is_completed).length,
    },
    {
      icon: IoBookSharp,
      title: "Total Courses",
      value: data.collections.reduce(
        (sum, collection) => sum + collection.courses.length,
        0,
      ),
    },
    {
      icon: FaCircleCheck,
      title: "Completed Courses",
      value: data.collections.reduce(
        (sum, collection) =>
          sum +
          collection.courses.filter((course) => course.is_completed).length,
        0,
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 h-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-32 w-32">
                <Progress
                  format={themeProgressText}
                  percent={calculateOverallProgress()}
                  size={120}
                  status={
                    calculateOverallProgress() === 100 ? "success" : "active"
                  }
                  strokeColor={getProgressColor(calculateOverallProgress())}
                  type="circle"
                />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold">
                  Training Progress Overview
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {data.trainee.first_name} {data.trainee.last_name}&#39;s
                  learning journey
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {Stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
            />
          ))}
        </div>
      </div>
      <div className="grid gap-6 mt-6 md:grid-cols-3">
        {data.collections.map((collection, index) => (
          <ReportCollectionsCard key={index} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export const StatCard = ({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: number;
}) => (
  <Card className="h-full">
    <CardContent className="pt-6">
      <div className="flex items-center space-x-2">
        <Icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const ReportCollectionsCard = ({
  collection,
}: {
  collection: Collection;
}) => {
  const getCourseCardContentHeight =
    collection.courses.length > 3 ? "h-40" : "h-auto";

  `h-[${collection.courses.length < 5 ? collection.courses.length * 50 : "300"}px]`;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="relative h-16 w-16">
            <Progress
              format={themeProgressText}
              percent={collection.progress}
              size={64}
              strokeColor={getProgressColor(collection.progress)}
              type="circle"
            />
          </div>
          <div className="flex flex-col gap-1">
            <CardTitle className="line-clamp-1">{collection.title}</CardTitle>
            <div className="flex items-center space-x-2 space-y-1">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-medium border ${
                  !collection.is_started
                    ? "bg-gray-100 text-gray-800 border-gray-300"
                    : collection.is_completed
                      ? "bg-green-100 text-green-800 border-green-300"
                      : "bg-blue-100 text-blue-800 border-blue-300"
                }`}
              >
                {!collection.is_started
                  ? "Not Started"
                  : collection.is_completed
                    ? "Completed"
                    : "In Progress"}
              </span>
              {collection.due_time > 0 && (
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-medium border 
                      bg-red-100 text-red-800 border-red-300"
                >
                  Due ({collection.due_time} days)
                </span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 border-t-1">
        <ScrollArea
          className={getCourseCardContentHeight}
          style={{
            position: "relative",
          }}
        >
          <div className="pr-4">
            {collection.courses.map((course, courseIndex) => (
              <div key={courseIndex} className="relative pl-8">
                <div className="flex items-center">
                  <span className="absolute left-0 top-2">
                    {course.is_completed ? (
                      <FaCircleCheck className="h-4 w-4 text-[#52CA14]" />
                    ) : (
                      <IoBookSharp className="h-4 w-4 text-blue-500" />
                    )}
                  </span>
                  <p className="font-medium line-clamp-1">{course.title}</p>
                </div>
                <Progress
                  percent={course.progress}
                  showInfo={false}
                  strokeColor={getProgressColor(course.progress)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
