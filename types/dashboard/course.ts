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

export type { Module, Lesson, CourseContent };
