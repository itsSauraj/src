/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type { User } from "@/types/redux";
import type { LoginRequest } from "@/types/auth/actions";
import type { RootState, StoreDispatch } from "@/redux/store";

import { createSlice } from "@reduxjs/toolkit";

import { validateToken as ValidateToken } from "@/lib/auth/actions";
import { login } from "@/lib/auth/actions";
import { setAuthLoading } from "@/redux/slice/app";
import { logout } from "@/lib/auth/actions";

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

const logInUser =
  (formData: LoginRequest) => async (dispatch: StoreDispatch) => {
    dispatch(setAuthLoading(true));
    try {
      const userObj = await login(formData);

      if (!userObj) {
        return;
      }

      dispatch(toggleToken(userObj.token));
      dispatch(toggleUser(userObj.user));
      dispatch(setUserType(userObj.groups[0]));
    } catch (error: any) {
      return;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

const logoutUser =
  () => async (dispatch: StoreDispatch, getState: () => RootState) => {
    const token = getState().user.token;

    await logout(token);
    dispatch(toggleToken(null));
    dispatch(toggleUser(null));
    dispatch(setUserType(null));
  };

export { logInUser, logoutUser, validateToken };
export default userSlice.reducer;
