export type FormType = "mentor" | "trainee" | "traineeGroup";

export type FormField = {
  emp_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  joining_date: Date | undefined;
  username: string;
  password: string;
  confirm_password: string;
};
