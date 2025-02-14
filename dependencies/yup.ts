import type { UUID } from "crypto";

import * as yup from "yup";

// Schema for login form validation
export const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});
export type LoginSchema = yup.InferType<typeof loginSchema>;

// Schema for registration form validation
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
export type RegisterSchema = yup.InferType<typeof registerSchema>;

// Schema for member form validation
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
export type MemberSchema = yup.InferType<typeof memberSchema>;

// Interface for member form with additional properties
export interface IMemberForm
  extends Omit<yup.InferType<typeof memberSchema>, "joining_date"> {
  id: string | UUID;
  joining_date: string | Date;
}

// Schema for module form validation
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
export type ModuleSchema = yup.InferType<typeof moduleSchema>;

// Schema for course form validation
export const courseSchema = yup.object({
  title: yup.string().required("Course title is required"),
  description: yup.string().required("Course description is required"),
  modules: yup.array().of(moduleSchema),
});
export type CourseFormData = yup.InferType<typeof courseSchema>;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Schema for collection form validation
export const collectionSchema = yup.object().shape({
  title: yup.string().required("Collection title is required"),
  description: yup.string(),
  alloted_time: yup.number().required("Alloted time is required"),
  image: yup
    .mixed<File | string>()
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

// Schema for collection courses form validation
export const collectionSchemaCourses = yup.object().shape({
  courses: yup.array().of(yup.string().uuid()),
});
export type CollectionFormData = yup.InferType<typeof collectionSchema>;
export type CollectionCoursesFormData = yup.InferType<
  typeof collectionSchemaCourses
>;

// Schema for user update form validation
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
    .max(15, "Phone number must not exceed 15 digits"),
  birth_date: yup
    .date()
    .nullable()
    .max(new Date(), "Date of birth cannot be in the future")
    .transform((value, originalValue) =>
      originalValue ? new Date(originalValue) : null,
    ),
  joining_date: yup
    .date()
    .nullable()
    .max(new Date(), "Joining date cannot be in the future")
    .transform((value, originalValue) =>
      originalValue ? new Date(originalValue) : null,
    ),
});

// Schema for user profile update form validation
export const userProfileUpdateSchema = userUpdateSchema.shape({
  employee_id: yup.string().nullable(),
  phone_number: yup.string().nullable(),
});
export type UserProfileUpdateSchema = yup.InferType<
  typeof userProfileUpdateSchema
>;

// Schema for importing course form validation
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

// Schema for password change form validation
export const passwordSchema = yup.object().shape({
  current_password: yup.string().required("Current password is required"),
  new_password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required")
    .test(
      "password-strength",
      "Password must contain at least one uppercase letter, one lowercase letter, \
      one number, and one special character",
      (value) =>
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[^A-Za-z0-9]/.test(value),
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Passwords must match")
    .required("Please confirm your password"),
});
export type PasswordSchema = yup.InferType<typeof passwordSchema>;

// Schema for email request form validation
export const emailSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});
export type EmailRequest = yup.InferType<typeof emailSchema>;

// Schema for OTP request form validation
export const otpSchema = yup.object({
  otp: yup
    .string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});
export type OTPRequest = yup.InferType<typeof otpSchema>;

// Schema for reset password form validation
export const resetPasswordSchema = yup.object({
  new_password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .test(
      "password-strength",
      "Password must contain at least one uppercase letter, one lowercase letter, \
      one number, and one special character",
      (value) =>
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[^A-Za-z0-9]/.test(value),
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Passwords must match")
    .required("Confirm password is required"),
});
export type ResetPasswordRequest = yup.InferType<typeof resetPasswordSchema>;

// Schema for exam schedule form validation
const yesterday = () => {
  const date = new Date();

  date.setDate(date.getDate() - 1);

  return date;
};

export const examScheduleSchema = yup.object({
  assigned_trainee: yup.string().required("Trainee selection is required"),
  collection: yup.string().required("Collection ID is required"),
  exam_date: yup
    .date()
    .required("Exam date is required")
    .min(yesterday(), "Exam date must be in the future"),
  exam_time: yup.string().required("Exam time is required"),
  duration: yup
    .number()
    .required("Duration is required")
    .min(30, "Minimum duration is 30 minutes"),
  assigned_mentor: yup.string().required("Mentor selection is required"),
  exam_details: yup.string().required("Additional notes are required"),
});
export type ExamScheduleRequest = yup.Asserts<typeof examScheduleSchema>;
