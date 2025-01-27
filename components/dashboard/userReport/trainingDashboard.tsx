import type { TrainingReportData } from "@/types/dashboard/report";

import React from "react";
import {
  Progress,
  Card as AntCard,
  Row,
  Col,
  Statistic,
  Timeline,
  Typography,
  Tooltip,
} from "antd";
import { SiBookstack } from "react-icons/si";
import { FaCircleCheck } from "react-icons/fa6";
import { IoBookSharp } from "react-icons/io5";

import { StatusBadge } from "@/components/collection/status-badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const { Text } = Typography;

export const TrainingDashboard: React.FC<{ data: TrainingReportData }> = ({
  data,
}) => {
  const calculateOverallProgress = () => {
    const totalProgress = data.collections.reduce(
      (sum: number, collection: any) => sum + collection.progress,
      0,
    );

    return Math.round(totalProgress / data.collections.length);
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "#ff4d4f";
    if (progress < 70) return "#faad14";

    return "#52c41a";
  };

  const themeProgressText = (progress?: number, successPercent?: number) => { // eslint-disable-line
    return <span className="dark:text-white">{progress}%</span>;
  };

  return (
    <div className="min-h-max lg:p-9">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <AntCard
            hoverable
            className="dark:bg-neutral-900 dark:border-0 bg-opacity-100 rounded-lg shadow-md"
          >
            <div className="flex flex-col lg:flex-row items-center space-x-4">
              <Progress
                format={themeProgressText}
                percent={calculateOverallProgress()}
                size={120}
                strokeColor={getProgressColor(calculateOverallProgress())}
                type="circle"
              />
              <div className="flex-grow">
                <h2 className="m-0 dark:text-white text-lg lg:text-2xl font-bold">
                  Training Progress Overview
                </h2>
                <p className="dark:text-white text-[12px]">
                  Comprehensive view of{" "}
                  <span className="font-semibold underline capitalize">
                    {data.trainee.first_name + " " + data.trainee.last_name}{" "}
                  </span>
                  learning journey
                </p>
              </div>
            </div>
          </AntCard>
        </Col>

        <Col span={24}>
          <AntCard
            hoverable
            className="dark:bg-neutral-900 dark:border-0 bg-opacity-100 rounded-lg shadow-md"
          >
            <Row align="middle" justify="space-around">
              <Col span={6}>
                <Statistic
                  className="text-center items-center"
                  prefix={<SiBookstack className="text-xl dark:text-white" />}
                  title="Total Collections"
                  value={data.collections.length}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  className="text-center items-center"
                  prefix={
                    <FaCircleCheck className="text-xl  dark:text-white" />
                  }
                  title="Completed Collections"
                  value={
                    data.collections.filter((c: any) => c.is_completed).length
                  }
                />
              </Col>
              <Col span={6}>
                <Statistic
                  className="text-center items-center"
                  prefix={
                    <IoBookSharp className="text-xl -m-[2px]  dark:text-white" />
                  }
                  title="Total Courses"
                  value={data.collections.reduce(
                    (sum: number, collection: any) =>
                      sum + collection.courses.length,
                    0,
                  )}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  className="text-center items-center"
                  prefix={
                    <FaCircleCheck className="text-xl  dark:text-white" />
                  }
                  title="Completed Courses"
                  value={data.collections.reduce(
                    (sum: number, collection: any) =>
                      sum +
                      collection.courses.filter(
                        (course: any) => course.is_completed,
                      ).length,
                    0,
                  )}
                />
              </Col>
            </Row>
          </AntCard>
        </Col>

        {data.collections.map((collection: any, index: number) => (
          <Col key={index} lg={8} sm={12} xs={24}>
            <AntCard
              hoverable
              className="dark:bg-neutral-900 dark:border-0 bg-opacity-100 rounded-lg shadow-md"
            >
              <div className="flex items-center">
                <Col className="w-[120px]">
                  <Progress
                    percent={collection.progress}
                    size={80}
                    strokeColor={getProgressColor(collection.progress)}
                    type="circle"
                  />
                </Col>
                <Col className="w-[60%]">
                  <Tooltip
                    className="text-ellipsis whitespace-nowrap overflow-hidden relative w-full"
                    title={collection.title}
                  >
                    <h2 className="font-bold text-lg">{collection.title}</h2>
                  </Tooltip>
                  <StatusBadge
                    status={
                      !collection.is_started
                        ? "not-started"
                        : collection.is_completed
                          ? "completed"
                          : "started"
                    }
                  />
                </Col>
              </div>

              <ScrollArea className="h-[200px]">
                <Timeline
                  className="mt-4 px-2"
                  items={collection.courses.map((course: any) => ({
                    color: course.is_completed ? "green" : "blue",
                    children: (
                      <div>
                        <Text strong>{course.title}</Text>
                        <Progress
                          percent={course.progress}
                          size="small"
                          strokeColor={getProgressColor(course.progress)}
                        />
                      </div>
                    ),
                    dot: course.is_completed ? (
                      <FaCircleCheck />
                    ) : (
                      <IoBookSharp />
                    ),
                  }))}
                />
              </ScrollArea>
            </AntCard>
          </Col>
        ))}
      </Row>
    </div>
  );
};
