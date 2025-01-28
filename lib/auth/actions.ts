/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import type {
  LoginRequest,
  LoginResponse,
  RegistrationRequest,
} from "@/types/auth/actions";

import axios from "axios";
// sonner
import { toast } from "sonner";

import { apiConfig } from "@/config/api";

export const register = async (
  formData: RegistrationRequest,
): Promise<LoginResponse | any> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${apiConfig.url}/auth/user/`,
      formData,
    );

    return response.data;
  } catch (error) {
    toast.error("Error registering");

    return error;
  }
};

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse | any> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${apiConfig.url}/auth/user/login/`,
      credentials,
    );

    return response.data;
  } catch (error) {
    toast.error("Error logging in");

    return error;
  }
};

export const validateToken = async (token: string): Promise<string | any> => {
  try {
    const response = await axios.post(`${apiConfig.url}/auth/user/refresh/`, {
      token: token,
    });

    return response.data.token as string;
  } catch (error) {
    return error;
  }
};

export const logout = async (token: string): Promise<void> => {
  try {
    await axios.post(`${apiConfig.url}/auth/user/logout/`, {
      token: token,
    });
  } catch (error) {
    toast.error("Error logging out");
  }
};
