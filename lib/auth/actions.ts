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

    if (response.status === 200) {
      return response.data;
    }

    return { message: "Invalid credentials" };
  } catch (error) {
    return {
      message: (error as any).response.data.detail,
    };
  }
};

export const verifyOtp = async (
  user_id: string,
  otp: string,
): Promise<LoginResponse | boolean> => {
  try {
    const response = await axios.post(
      `${apiConfig.url}/profile/verify_account/`,
      {
        otp: otp,
        user_id: user_id,
      },
    );

    if (response.status === 200) {
      return response.data;
    }

    return false;
  } catch (error) {
    return false;
  }
};

export const validateToken = async (token: string): Promise<string | any> => {
  try {
    const response = await axios.post(`${apiConfig.url}/auth/user/refresh/`, {
      token: token,
    });

    if (response.status === 200) {
      return response.data.token as string;
    }

    return null;
  } catch (error) {
    return null;
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
