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
  id: string;
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
}

interface ILessonSectionProps {
  moduleIndex: number;
  lessonIndex: number;
  form: UseFormReturn<ICourse>;
  removeLesson: () => void;
}

interface UserUpdateData {
  employee_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  phone_number?: string;
  address?: string;
  bith_date?: string;
  joining_date?: string;
}

export type {
  ILesson,
  IModule,
  ICourse,
  IExistingModule,
  IModuleSectionProps,
  ILessonSectionProps,
  UserUpdateData,
};
