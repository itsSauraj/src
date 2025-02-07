import type { Module as IModule } from "@/types/dashboard/view";

interface Module {
  id: string;
  title: string;
  expanded: boolean;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  expanded: boolean;
}

interface CourseContent {
  id: string;
  type: "course";
  title: string;
  description: string;
  image?: File;
  expanded: boolean;
  modules: Module[];
}

interface ImportCreateCourse {
  course: {
    title?: string;
    image?: string;
    description?: string;
  };
  modules?: IModule[];
}

interface FileMetadata {
  title: string;
  duration: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface FolderStructure {
  title?: string;
  lessons?: FileMetadata[];
  modules?: FolderStructure[];
  duration?: string;
}

export type {
  Module,
  Lesson,
  CourseContent,
  ImportCreateCourse,
  FolderStructure,
  FileMetadata,
};
