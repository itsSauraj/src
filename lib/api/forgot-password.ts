import type { StoreDispatch } from "@/redux/store";

import axios from "axios";
import { toast } from "sonner";

import { setAuthLoading } from "@/redux/slice/app";
import { apiConfig } from "@/config/api";

/**
 * Sends a password reset email.
 * @param {string} email - The email address to send the reset link to.
 * @returns {Promise<any>} - The response data or false if the request failed.
 */
const sendResetEmail =
  (email: string) =>
  async (dispatch: StoreDispatch): Promise<any> => {
    dispatch(setAuthLoading(true));

    try {
      const response = await axios.post(
        `${apiConfig.url}/profile/forgot_password/`,
        { email },
        { headers: { "Content-Type": "application/json" } },
      );

      dispatch(setAuthLoading(false));

      if (response.status === 200) {
        localStorage.setItem("reset_email", email);
        localStorage.setItem("user_id", response.data.user_id);
        toast.success(response.data.message);

        return response.data;
      }

      toast.error("Failed to process request");

      return false;
    } catch (error) {
      toast.error(
        (error as any).response.data.message || "Failed to process request",
      );

      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

/**
 * Verifies the OTP sent to the user's email.
 * @param {string} otp - The OTP to verify.
 * @returns {Promise<any>} - The response data or false if the request failed.
 */
const verifyOTP =
  (otp: string) =>
  async (dispatch: StoreDispatch): Promise<any> => {
    dispatch(setAuthLoading(true));

    try {
      const response = await axios.post(
        `${apiConfig.url}/profile/verify_otp/`,
        {
          otp,
          user_id: localStorage.getItem("user_id"),
        },
        { headers: { "Content-Type": "application/json" } },
      );

      dispatch(setAuthLoading(false));

      if (response.status === 200) {
        localStorage.setItem("reset_token", response.data.token);
        toast.success(response.data.message);

        return response.data;
      }

      toast.error("Failed to process request");

      return false;
    } catch (error) {
      toast.error(
        (error as any).response.data.message || "Failed to process request",
      );

      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

/**
 * Resets the user's password.
 * @param {Object} formData - The new password data.
 * @param {string} formData.new_password - The new password.
 * @param {string} formData.confirm_password - The confirmation of the new password.
 * @returns {Promise<any>} - The response data or false if the request failed.
 */
const resetPassword =
  (formData: { new_password: string; confirm_password: string }) =>
  async (dispatch: StoreDispatch): Promise<any> => {
    dispatch(setAuthLoading(true));

    try {
      const response = await axios.post(
        `${apiConfig.url}/profile/reset_password/`,
        {
          new_password: formData.new_password,
          confirm_password: formData.confirm_password,
          token: localStorage.getItem("reset_token"),
        },
        { headers: { "Content-Type": "application/json" } },
      );

      dispatch(setAuthLoading(false));

      if (response.status === 200) {
        localStorage.removeItem("user_id");
        localStorage.removeItem("reset_email");
        localStorage.removeItem("reset_token");
        toast.success(response.data.message);

        return response.data;
      }

      toast.error("Failed to process request");

      return false;
    } catch (error) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("reset_email");
      localStorage.removeItem("reset_token");
      toast.error(
        (error as any).response.data.message || "Failed to process request",
      );

      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

export { sendResetEmail, verifyOTP, resetPassword };
