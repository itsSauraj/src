"use client";

import type { IMemberForm } from "@/dependencies/yup";
import type { StoreDispatch } from "@/redux/store";
import type { FormType } from "@/types/dashboard/forms";

import axios from "axios";

import { apiConfig } from "@/config/api";
import { RootState } from "@/redux/store";

const getMentors =
  () => async (dispatch: StoreDispatch, getState: () => RootState) => {
    const response = await axios.get(`${apiConfig.url}/user/mentor/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    return [];
  };

const getTrainees =
  () => async (dispatch: StoreDispatch, getState: () => RootState) => {
    const response = await axios.get(`${apiConfig.url}/user/trainee/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    return [];
  };

const addMember =
  (formData: IMemberForm, type: FormType) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<IMemberForm> => {
    const response = await axios.post(
      `${apiConfig.url}/auth/user/member/`,
      {
        ...formData,
        role: type
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        }
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to add member");
    }
  };

export { getMentors, getTrainees, addMember };
