import type {
  TrainingReportData,
  Course,
  Module,
  Lesson,
} from "@/types/dashboard/report";

import React from "react";
import { Progress, Table, Collapse, Badge } from "antd";

import { formatDateTimeToLocal } from "@/lib/utils";

interface CollectionProgressProps {
  started_on: string;
  estimated_completion_date?: string;
  completed_on?: string | null;
  progress: number;
  is_completed: boolean;
}

const CollectionProgress: React.FC<CollectionProgressProps> = ({
  started_on,
  estimated_completion_date,
  completed_on,
  progress,
  is_completed,
}) => (
  <div className="space-y-4">
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div>
        <strong>Started On:</strong> {new Date(started_on).toLocaleDateString()}
      </div>
      <div>
        <strong>Estimated On:</strong>{" "}
        {estimated_completion_date
          ? new Date(estimated_completion_date).toLocaleDateString()
          : "Not Completed"}
      </div>
      <div>
        <strong>Completed On:</strong>{" "}
        {completed_on
          ? new Date(completed_on).toLocaleDateString()
          : "Not Completed"}
      </div>
    </div>
    <Progress percent={progress} status={is_completed ? "success" : "active"} />
  </div>
);

interface ModuleComponentProps {
  module: Module;
  getProgressColor: (progress: number) => string;
}

const ModuleComponent: React.FC<ModuleComponentProps> = ({
  module,
  getProgressColor,
}) => {
  const calculateProgress = (
    items: Lesson[],
    completedKey: string = "completed",
  ) => {
    if (!items || items.length === 0) return 0;
    const completedItems = items.filter(
      (item) => item[completedKey as keyof Lesson],
    );

    return Math.round((completedItems.length / items.length) * 100);
  };

  const moduleProgress = calculateProgress(module.lessons);

  return (
    <div className="mb-2 border p-2 rounded">
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
              completed_on ? formatDateTimeToLocal(completed_on) : "-",
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
};

interface CourseComponentProps {
  course: Course;
}

const CourseComponent: React.FC<CourseComponentProps> = ({ course }) => {
  const getProgressColor = (progress: number) => {
    if (progress < 30) return "#ff4d4f";
    if (progress < 70) return "#faad14";

    return "#52c41a";
  };

  return (
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
      {course.modules.map((module) => (
        <ModuleComponent
          key={module.id}
          getProgressColor={getProgressColor}
          module={module}
        />
      ))}
    </div>
  );
};

export const ComprehensiveTrainingReport: React.FC<{
  data: TrainingReportData;
}> = ({ data }) => {
  const collectionItems = data.collections.map((collection) => {
    const courseItems = collection.courses.map((course) => ({
      key: course.id,
      label: (
        <div key={course.id} className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{course.title}</h3>
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
      children: <CourseComponent course={course} />,
    }));

    return {
      key: collection.id,
      label: (
        <div key={collection.id} className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">{collection.title}</h2>
          </div>
          <Badge
            color={
              !collection.is_started
                ? "volcano"
                : collection.is_completed
                  ? "green"
                  : "red"
            }
            text={
              !collection.is_started
                ? "Not Started"
                : collection.is_completed
                  ? "Completed"
                  : "In Progress"
            }
          />
        </div>
      ),
      children: (
        <div className="space-y-4">
          <CollectionProgress {...collection} />
          <Collapse accordion items={courseItems} />
        </div>
      ),
    };
  });

  return (
    <div className="p-6 space-y-6">
      <Collapse
        accordion
        defaultActiveKey={data.collections.map((c) => c.id)}
        items={collectionItems}
      />
    </div>
  );
};
