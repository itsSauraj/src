import type { UUID } from "crypto";

import { ResponseMember as Trainee } from "./view";

interface Collection {
  id: string | UUID;
  title: string;
  description: string;
  duration: string;
  image?: string;
  alloted_time: number;
  is_started: boolean;
  started_on: string;
  completed_on: string | null;
  is_completed: boolean;
  progress: number;
  days_taken: number;
  due_time: number;
  estimated_completion_date: string;
  assigned_by: string;
  courses: Course[];
}

interface Course {
  id: string | UUID;
  title: string;
  description: string;
  duration: string;
  progress: number;
  is_started: boolean;
  started_on: string;
  is_completed: boolean;
  completed_on: string | null;
  modules: Module[];
}

interface Module {
  id: string | UUID;
  title: string;
  description: string;
  sequence: number;
  duration: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string | UUID;
  title: string;
  description: string;
  sequence: number;
  duration: string;
  completed: boolean;
  completed_on: string | null;
}

export interface TrainingReportData {
  trainee: Trainee;
  collections: Collection[];
}

export interface MiniCollection {
  id: string | UUID;
  title: string;
  is_default: boolean;
}

export interface ResponseMiniFiedTraineeCollectionData {
  available_collections: MiniCollection[];
  assigned_collections: MiniCollection[];
}

// Admin Dashboard View
export type InfoCardData = {
  title: string;
  count: number;
};

export type CourseCompletionStatus = {
  course: string;
  enrolled: number;
  completed: number;
  in_progress: number;
  not_started: number;
};
