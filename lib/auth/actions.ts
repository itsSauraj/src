/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import type {
  LoginRequest,
  LoginResponse,
  RegistrationRequest,
} from "@/types/auth/actions";

import axios from "axios";
import { apiConfig } from "@/config/api";

/**
 * Registers a new user.
 * @param {RegistrationRequest} formData - The registration data.
 * @returns {Promise<LoginResponse | any>} The response data or error.
 */
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

/**
 * Logs in a user.
 * @param {LoginRequest} credentials - The login credentials.
 * @returns {Promise<LoginResponse | any>} The response data or error message.
 */
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

/**
 * Verifies the OTP for a user.
 * @param {string} user_id - The user ID.
 * @param {string} otp - The OTP code.
 * @returns {Promise<LoginResponse | boolean>} The response data or false.
 */
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

/**
 * Validates a token.
 * @param {string} token - The token to validate.
 * @returns {Promise<string | any>} The new token or null.
 */
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

/**
 * Logs out a user.
 * @param {string} token - The token to invalidate.
 * @returns {Promise<void>}
 */
export const logout = async (token: string): Promise<void> => {
  try {
    await axios.post(`${apiConfig.url}/auth/user/logout/`, {
      token: token,
    });
  } catch (error) {
    return;
  }
};
