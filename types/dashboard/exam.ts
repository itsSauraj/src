import type { UUID } from "crypto";

export interface Person {
  id: string | UUID;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface Course {
  id: string | UUID;
  title: string;
}

export interface Collection {
  id: string | UUID;
  title: string;
  courses: Course[];
}

export interface Exam {
  id: string | UUID;
  collection: Collection;
  exam_date: string;
  exam_time: string;
  assigned_mentor: Person;
  assigned_trainee: Person;
  created_by: Person;
  exam_details: string;
  duration: number;
}
