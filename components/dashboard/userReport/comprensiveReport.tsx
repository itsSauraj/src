import type { TrainingReportData } from "@/types/dashboard/report";

import React from "react";
import { Progress, Table, Collapse, Badge } from "antd";

import { formatDateTimeToLocal } from "@/lib/utils";

export const ComprehensiveTrainingReport: React.FC<{
  data: TrainingReportData;
}> = ({ data }) => {
  // Utility function to calculate progress dynamically
  const calculateProgress = (
    items: any[],
    completedKey: string = "completed",
  ) => {
    if (!items || items.length === 0) return 0;

    const completedItems = items.filter((item) => item[completedKey]);

    return Math.round((completedItems.length / items.length) * 100);
  };

  const collectionItems = data.collections.map((collection) => {
    const courseItems = collection.courses.map((course) => {
      const getProgressColor = (progress: number) => {
        if (progress < 30) return "#ff4d4f";
        if (progress < 70) return "#faad14";

        return "#52c41a";
      };

      return {
        key: course.id,
        label: (
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-xs text-gray-500">{course.description}</p>
            </div>
            <Badge
              color={
                !course.is_started
                  ? "volcano"
                  : course.is_completed
                    ? "green"
                    : "red"
              }
              text={
                !course.is_started
                  ? "Not Started"
                  : course.is_completed
                    ? "Completed"
                    : "In Progress"
              }
            />
          </div>
        ),
        children: (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <strong>Started:</strong>{" "}
                {new Date(course.started_on).toLocaleDateString()}
              </div>
              <div>
                <strong>Completed:</strong>{" "}
                {course.completed_on
                  ? new Date(course.completed_on).toLocaleDateString()
                  : "Not Completed"}
              </div>
            </div>
            <Progress
              percent={course.progress}
              status={course.is_completed ? "success" : "active"}
              strokeColor={getProgressColor(course.progress)}
            />

            {course.modules.map((module) => {
              const moduleProgress = calculateProgress(module.lessons);

              return (
                <div key={module.id} className="mb-2 border p-2 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span>{module.title}</span>
                    <Badge color="default" text={`Module ${module.sequence}`} />
                  </div>
                  <Progress
                    percent={moduleProgress}
                    status={moduleProgress === 100 ? "success" : "active"}
                    strokeColor={getProgressColor(moduleProgress)}
                  />
                  <Table
                    columns={[
                      { title: "Lesson", dataIndex: "title", key: "title" },
                      {
                        title: "Completed On",
                        dataIndex: "completed_on",
                        key: "completed_date",
                        render: (completed_on) =>
                          completed_on
                            ? formatDateTimeToLocal(completed_on)
                            : "-",
                      },
                      {
                        title: "Status",
                        key: "completed",
                        render: (lesson) => (
                          <Badge
                            color={lesson.completed ? "green" : "red"}
                            text={lesson.completed ? "Completed" : "Pending"}
                          />
                        ),
                      },
                    ]}
                    dataSource={module.lessons}
                    pagination={false}
                  />
                </div>
              );
            })}
          </div>
        ),
      };
    });

    return {
      key: collection.id,
      label: (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">{collection.title}</h2>
            <p className="text-sm text-gray-500">{collection.description}</p>
          </div>
          <Badge
            color={collection.is_completed ? "green" : "red"}
            text={collection.is_completed ? "Completed" : "In Progress"}
          />
        </div>
      ),
      children: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Started On:</strong>{" "}
              {new Date(collection.started_on).toLocaleDateString()}
            </div>
            <div>
              <strong>Estimated On:</strong>{" "}
              {collection.estimated_completion_date
                ? new Date(
                    collection.estimated_completion_date,
                  ).toLocaleDateString()
                : "Not Completed"}
            </div>
            <div>
              <strong>Completed On:</strong>{" "}
              {collection.completed_on
                ? new Date(collection.completed_on).toLocaleDateString()
                : "Not Completed"}
            </div>
          </div>

          <Progress
            percent={collection.progress}
            status={collection.is_completed ? "success" : "active"}
          />

          <Collapse accordion items={courseItems} />
        </div>
      ),
    };
  });

  return (
    <div className="p-6 space-y-6">
      <Collapse accordion items={collectionItems} />
    </div>
  );
};
