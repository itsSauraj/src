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
  emp_id: yup
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

export interface IMemberForm
  extends Omit<yup.InferType<typeof memberSchema>, "joining_date"> {
  joining_date: string | Date;
}
