"use client";

import React, { useState, ChangeEvent } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

// Importing Yup schemas
import { loginSchema } from "@/dependencies/yup";
// import the redux actions
import { setAuthLoading } from "@/redux/slice/app";
import { logInUser } from "@/redux/slice/user";
// Import the ui components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Import the types
import { StoreDispatch } from "@/redux/store";
import { ReduxStore } from "@/types/redux";
import { LoginRequest } from "@/types/auth/actions";

const LoginPage = () => {
  const app = useSelector((state: ReduxStore) => state.app);

  const dispatch = useDispatch<StoreDispatch>();

  const [formData, setFormData] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setAuthLoading(true));
    try {
      await loginSchema.validate(formData, { abortEarly: false });
      dispatch(logInUser(formData));
    } catch (error: any) {
      dispatch(logInUser(formData));
      if (error.name === "ValidationError") {
        error.inner.forEach((e: any) => {
          setErrors((prev) => ({
            ...prev,
            [e.path]: e.message,
          }));
        });
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
      onSubmit={handleLogin}
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
        error={errors.password}
        name="password"
        placeholder="Pawword"
        type="password"
        onChange={handleChange}
      />
      <Button className="w-full" disabled={app.auth.isLoading} type="submit">
        {app.auth.isLoading && <Loader2 className="animate-spin" />}
        Login
      </Button>
      <Link href="/auth/signup">Signup</Link>
    </form>
  );
};

export default LoginPage;
