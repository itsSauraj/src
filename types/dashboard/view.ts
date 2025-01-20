import { Co } from './view';
import { UUID } from "crypto";

export interface Course {
  id: UUID;
  title: string;
  description: string;
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
  courses: Course[];
  image: string | File | undefined;
}
