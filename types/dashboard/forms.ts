import { UseFormReturn } from "react-hook-form";

export type FormType = "mentor" | "trainee";

interface ILesson {
  title: string;
  description: string;
  hours: number;
  minutes: number;
  seconds: number;
}

interface IModule {
  title: string;
  description: string;
  parent_module: string | null;
  lessons: ILesson[];
}

interface ICourse {
  title: string;
  description: string;
  modules: IModule[];
}

interface IExistingModule {
  id: string;
  title: string;
}

interface IModuleSectionProps {
  moduleIndex: number;
  form: UseFormReturn<ICourse>;
  removeModule: () => void;
  existingModules: IExistingModule[];
}

interface ILessonSectionProps {
  moduleIndex: number;
  lessonIndex: number;
  form: UseFormReturn<ICourse>;
  removeLesson: () => void;
}

export type {
  ILesson,
  IModule,
  ICourse,
  IExistingModule,
  IModuleSectionProps,
  ILessonSectionProps,
};
