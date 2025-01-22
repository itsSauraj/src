import { UUID } from "crypto";

export interface Course {
  id: UUID;
  title: string;
  description: string;
  duration: string;
}

export interface Metadata {
  id: string;
  title: string;
  description: string;
  duration: string;
  parent_module?: string | null;
  sequence?: number;
}

export interface Lesson {
  id: string | UUID;
  title: string;
  description: string;
  sequence: number;
  duration: string;
}

export interface Module {
  metadata: Metadata;
  sub_modules: Module[];
  lessons: Lesson[];
}

export interface CourseData {
  metadata: Metadata;
  modules: Module[];
}

export interface ResponseMember {
  employeeId: string;
  id: UUID;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  joiningDate: string;
  groups: string[];
}

export interface CourseCollection {
  id: UUID;
  title: string;
  description: string;
  duration: string;
  alloted_time: number;
  courses: Course[];
  image: string | File | undefined;
}

export interface MemberCollection {
  collection: CourseCollection;
  started_on: string | null;
  completed_on: string | null;
  completed: boolean;
  assigned_by: string;
}

export type MStartedCourse = Record<string, Record<string, number> | null>;

export type MembersCollectionGroup = {
  collections: MemberCollection[];
  started_courses: MStartedCourse;
};

export type TraineeCourseView = {
  course: CourseData;
  isStarted: boolean;
  completed_lessons: (UUID | string)[];
};
