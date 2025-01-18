import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const memberSchema = yup.object().shape({
  employee_id: yup
    .string()
    .min(3, "Employee ID must be at least 3 characters")
    .required("Employee ID is required"),
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string(),
  email: yup.string().email().required("Email is required"),
  phone_number: yup.string().required("Phone Number is required"),
  username: yup.string().required("Username is required"),
  joining_date: yup.date().required("Joining Date is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match"),
});

// Course
export const moduleSchema = yup.object({
  title: yup.string().required("Module title is required"),
  description: yup.string(),
  parent_module: yup.string().nullable(),
  lessons: yup.array().of(
    yup.object({
      title: yup.string().required("Lesson title is required"),
      description: yup.string(),
      hours: yup.number().min(0).max(23).required(),
      minutes: yup.number().min(0).max(59).required(),
      seconds: yup.number().min(0).max(59).required(),
    }),
  ),
});

export const courseSchema = yup.object({
  title: yup.string().required("Course title is required"),
  description: yup.string().required("Course description is required"),
  modules: yup.array().of(moduleSchema),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const collectionSchema = yup.object().shape({
  title: yup.string().required("Collection title is required"),
  description: yup.string(),
  image: yup
    .mixed<File | string>()
    .nullable()
    .nullable()
    .test("fileSize", "Image size must be less than 5MB", (value) => {
      if (!value) return true;

      return value instanceof File && value.size <= MAX_FILE_SIZE;
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (!value) return true;

      return value instanceof File && ACCEPTED_IMAGE_TYPES.includes(value.type);
    }),
  courses: yup.array().of(yup.string().uuid()),
});

export type CourseFormData = yup.InferType<typeof courseSchema>;
export interface IMemberForm
  extends Omit<yup.InferType<typeof memberSchema>, "joining_date"> {
  joining_date: string | Date;
}
export type CollectionFormData = yup.InferType<typeof collectionSchema>;
