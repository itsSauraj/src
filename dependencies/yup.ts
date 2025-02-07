import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

export const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  confirm_password: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
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
  alloted_time: yup.number().required("Alloted time is required"),
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

export const collectionSchemaCourses = yup.object().shape({
  courses: yup.array().of(yup.string().uuid()),
});

export const userUpdateSchema = yup.object().shape({
  employee_id: yup.string().required("Employee ID is required"),
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string(),
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  address: yup.string().nullable(),
  phone_number: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .required("Phone number is required"),
  birth_date: yup
    .date()
    .nullable()
    .max(new Date(), "Date of birth cannot be in the future"),
  joining_date: yup
    .date()
    .nullable()
    .max(new Date(), "Joining date cannot be in the future"),
});

export const ImportCourseSchema = yup
  .object({
    title: yup
      .string()
      .required("Course title is required")
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must not exceed 100 characters"),
    description: yup
      .string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description must not exceed 1000 characters"),
    image: yup.mixed().required("Image is required"),
  })
  .required();

export type ImportFormData = yup.InferType<typeof ImportCourseSchema>;

export type CourseFormData = yup.InferType<typeof courseSchema>;
export interface IMemberForm
  extends Omit<yup.InferType<typeof memberSchema>, "joining_date"> {
  joining_date: string | Date;
}
export type CollectionFormData = yup.InferType<typeof collectionSchema>;
export type CollectionCoursesFormData = yup.InferType<
  typeof collectionSchemaCourses
>;
