/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type { User } from "@/types/redux";
import type { LoginRequest } from "@/types/auth/actions";
import type { RootState, StoreDispatch } from "@/redux/store";

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { setCookie, deleteCookie } from "cookies-next";

import { validateToken as ValidateToken } from "@/lib/auth/actions";
import { login, register, verifyOtp, logout } from "@/lib/auth/actions";
import { setAuthLoading } from "@/redux/slice/app";

const initialState: User = {
  token: null,
  user: null,
  userType: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    toggleToken: (state, action) => {
      state.token = action.payload;
    },
    toggleUser: (state, action) => {
      state.user = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

const { toggleToken, toggleUser, setUserType } = userSlice.actions;

/**
 * Validates the token and updates it if necessary.
 * @param {string} token - The token to validate.
 */
const validateToken = (token: string) => async (dispatch: StoreDispatch) => {
  try {
    const new_token = await ValidateToken(token);

    if (new_token === token) {
      return;
    }

    dispatch(toggleToken(new_token));
  } catch (error: any) {
    return error;
  }
};

/**
 * Logs in the user with the provided form data.
 * @param {LoginRequest} formData - The login request data.
 */
const logInUser =
  (formData: LoginRequest) => async (dispatch: StoreDispatch) => {
    dispatch(setAuthLoading(true));
    try {
      const userObj = await login(formData);

      if (!userObj) {
        return;
      }

      setCookie("token", userObj.token, {
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
        httpOnly: false,
        sameSite: "strict",
        path: "/",
      });
      setCookie("group", userObj.user.groups[0], {
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
        httpOnly: false,
        sameSite: "strict",
        path: "/",
      });

      localStorage.setItem("token", userObj.token);

      if (typeof userObj !== "boolean") {
        dispatch(toggleToken(userObj.token));
        dispatch(toggleUser(userObj.user));
      }
    } catch (error: any) {
      toast.error("Error logging in");

      return error;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

/**
 * Logs out the current user.
 */
const logoutUser =
  () => async (dispatch: StoreDispatch, getState: () => RootState) => {
    const token = getState().user.token;

    await logout(token);

    localStorage.removeItem("token");
    deleteCookie("token");

    dispatch(toggleToken(null));
    dispatch(toggleUser(null));
    dispatch(setUserType(null));
    dispatch(setAuthLoading(false));
  };

/**
 * Registers a new user with the provided form data.
 * @param {any} formData - The registration request data.
 */
const registerUser =
  (formData: any) =>
  async (dispatch: StoreDispatch): Promise<LoginRequest | any> => {
    try {
      const userObj = await register(formData);

      if (!userObj) {
        return;
      }

      setCookie("opt_verification_pending", true, {
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
        httpOnly: false,
        sameSite: "strict",
        path: "/",
      });

      localStorage.setItem("user_id", userObj.id);
    } catch (error: any) {
      toast.error("Error registering");

      return error;
    }
  };

/**
 * Verifies the OTP and updates the user state.
 * @param {string} otp - The OTP to verify.
 */
const verifyOTP = (otp: string) => async (dispatch: StoreDispatch) => {
  try {
    const user_id = localStorage.getItem("user_id") as string;
    const response = await verifyOtp(user_id, otp);

    if (response) {
      const userObj = response;

      if (typeof userObj !== "boolean") {
        setCookie("token", userObj.token, {
          maxAge: 60 * 60 * 24 * 7,
          secure: true,
          httpOnly: false,
          sameSite: "strict",
        });
        deleteCookie("otp_verification_pending");
        localStorage.removeItem("user_id");
        localStorage.setItem("token", userObj.token);

        dispatch(toggleToken(userObj.token));
        dispatch(toggleUser(userObj.user));
        dispatch(setUserType(userObj.user.groups[0]));
      }

      return;
    }
  } catch (error: any) {
    toast.error("Error verifying OTP");

    return error;
  }
};

export {
  logInUser,
  logoutUser,
  validateToken,
  registerUser,
  toggleToken,
  toggleUser,
  verifyOTP,
};
export default userSlice.reducer;
