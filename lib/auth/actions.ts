"use server";

import type { LoginRequest, LoginResponse } from "@/types/auth/actions";

import axios from "axios";

import { apiConfig } from "@/config/api";

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
    // TODO: Error Notification
    console.error(error);
  }
};
