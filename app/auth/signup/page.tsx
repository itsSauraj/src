"use client";

import type { StoreDispatch, RootState } from "@/redux/store";

import React, { useState, ChangeEvent } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

// Importing Yup schemas (assuming you'll create this)
import { registerSchema } from "@/dependencies/yup";
// Import the ui components
import { Input } from "@/components/ui/custom-input";
import { Button } from "@/components/ui/button";
// api actions
import { registerUser } from "@/redux/slice/user";

interface RegistrationRequest {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const RegisterPage = () => {
  const app = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<StoreDispatch>();

  const [formData, setFormData] = useState<RegistrationRequest>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState<Partial<RegistrationRequest>>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerSchema.validate(formData, { abortEarly: false });
      // Assuming you'll create a registration action
      console.log(formData);
      dispatch(registerUser(formData));
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const newErrors: Partial<RegistrationRequest> = {};

        error.inner.forEach((e: any) => {
          newErrors[e.path as keyof RegistrationRequest] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form
      className="flex justify-center items-center flex-col space-y-4 gap-3 p-4"
      onSubmit={handleRegister}
    >
      <Input
        className="text-lg"
        error={errors.username}
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />
      <Input
        className="text-lg"
        error={errors.first_name}
        name="first_name"
        placeholder="First Name"
        onChange={handleChange}
      />
      <Input
        className="text-lg"
        error={errors.last_name}
        name="last_name"
        placeholder="Last Name"
        onChange={handleChange}
      />
      <Input
        className="text-lg"
        error={errors.email}
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
      />
      <Input
        className="text-lg"
        error={errors.password}
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />
      <Input
        className="text-lg"
        error={errors.confirm_password}
        name="confirm_password"
        placeholder="Confirm Password"
        type="password"
        onChange={handleChange}
      />
      <Button className="w-full" disabled={app.auth.isLoading} type="submit">
        {app.auth.isLoading && <Loader2 className="animate-spin" />}
        Register
      </Button>
      <Link href="/auth/login">Login</Link>
    </form>
  );
};

export default RegisterPage;
