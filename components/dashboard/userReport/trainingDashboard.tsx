import type { TrainingReportData } from "@/types/dashboard/report";

import React from "react";
import { SiBookstack } from "react-icons/si";
import { FaCircleCheck } from "react-icons/fa6";
import { IoBookSharp } from "react-icons/io5";
import { Progress } from "antd";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TrainingDashboard = ({ data }: { data: TrainingReportData }) => {
  const calculateOverallProgress = () => {
    const totalProgress = data.collections.reduce(
      (sum, collection) => sum + collection.progress,
      0,
    );

    return Math.round(totalProgress / data.collections.length);
  };

  const getProgressColor = (progress: number) => {
    if (progress < 35) return "#EF4444";
    if (progress < 70) return "#F59E0B";

    return "#52CA14";
  };

  const themeProgressText = (progress?: number, successPercent?: number) => { // eslint-disable-line
    return <span className="dark:text-white">{progress}%</span>;
  };

  const StatCard = ({
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
          <StatCard
            icon={SiBookstack}
            title="Total Collections"
            value={data.collections.length}
          />
          <StatCard
            icon={FaCircleCheck}
            title="Completed Collections"
            value={data.collections.filter((c) => c.is_completed).length}
          />
          <StatCard
            icon={IoBookSharp}
            title="Total Courses"
            value={data.collections.reduce(
              (sum, collection) => sum + collection.courses.length,
              0,
            )}
          />
          <StatCard
            icon={FaCircleCheck}
            title="Completed Courses"
            value={data.collections.reduce(
              (sum, collection) =>
                sum +
                collection.courses.filter((course) => course.is_completed)
                  .length,
              0,
            )}
          />
        </div>
      </div>
      <div className="grid gap-6 mt-6 md:grid-cols-3">
        {data.collections.map((collection, index) => (
          <Card key={index}>
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
                <div>
                  <CardTitle className="line-clamp-2">
                    {collection.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 space-y-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
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
                    {collection.due_time && (
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border 
                      bg-red-100 text-red-800 border-red-300"
                      >
                        Due ({collection.due_time} days)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  {collection.courses.map((course, courseIndex: number) => (
                    <div key={courseIndex} className="relative pl-8">
                      <span className="absolute left-0 top-1">
                        {course.is_completed ? (
                          <FaCircleCheck className="h-4 w-4 text-[#52CA14]" />
                        ) : (
                          <IoBookSharp className="h-4 w-4 text-blue-500" />
                        )}
                      </span>
                      <p className="font-medium">{course.title}</p>
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
        ))}
      </div>
    </div>
  );
};
