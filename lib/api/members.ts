"use client";

import type { IMemberForm } from "@/dependencies/yup";
import type { StoreDispatch, RootState } from "@/redux/store";
import type { FormType } from "@/types/dashboard/forms";
import type { UUID } from "crypto";


import axios from "axios";

import { setAuthLoading } from "@/redux/slice/app";
import { apiConfig } from "@/config/api";

const getMentors =
  () => async (dispatch: StoreDispatch, getState: () => RootState) => {

    dispatch(setAuthLoading(true));

    const response = await axios.get(`${apiConfig.url}/user/mentor/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.token}`,
      },
    });

    dispatch(setAuthLoading(false));
    if (response.status === 200) {
      return response.data;
    }

    return [];
  };

const getTrainees =
  () => async (dispatch: StoreDispatch, getState: () => RootState) => {
    // dispatch(setAuthLoading(true));
    const response = await axios.get(`${apiConfig.url}/user/trainee/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.token}`,
      },
    });

    // dispatch(setAuthLoading(false));
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
        role: type,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
      },
    );

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to add member");
    }
  };

const deleteMember =
  (id: UUID | UUID[], many = false) =>
  async (dispatch: StoreDispatch, getState: () => RootState) => {
    if (many) {
      const response = await axios.delete(`${apiConfig.url}/member/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
        data: id,
      });

      if (response.status === 204) {
        return true;
      } else {
        throw new Error("Failed to delete members");
      }
    } else {
      const response = await axios.delete(`${apiConfig.url}/member/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      if (response.status === 204) {
        return true;
      } else {
        throw new Error("Failed to delete member");
      }
    }
  };

export { getMentors, getTrainees, addMember, deleteMember };
