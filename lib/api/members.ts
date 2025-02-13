"use client";

import type { IMemberForm } from "@/dependencies/yup";
import type { StoreDispatch, RootState } from "@/redux/store";
import type { FormType } from "@/types/dashboard/forms";
import type { ResponseMember } from "@/types/dashboard/view";
import type { UUID } from "crypto";

import axios from "axios";
import { toast } from "sonner";

import { setAuthLoading } from "@/redux/slice/app";
import { apiConfig } from "@/config/api";

/**
 * Fetches the list of mentors.
 * @returns {Promise<IMemberForm[] | any>}
 */
const getMentors =
  () =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<IMemberForm[] | any> => {
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

/**
 * Fetches the list of trainees.
 * @returns {Promise<IMemberForm[] | any>}
 */
const getTrainees =
  () =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<IMemberForm[] | any> => {
    dispatch(setAuthLoading(true));
    const response = await axios.get(`${apiConfig.url}/user/trainee/`, {
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

/**
 * Adds a new member.
 * @param {IMemberForm} formData - The form data for the new member.
 * @param {FormType} type - The type of the form.
 * @returns {Promise<IMemberForm | any>}
 */
const addMember =
  (formData: IMemberForm, type: FormType) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<IMemberForm | any> => {
    dispatch(setAuthLoading(true));
    try {
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
        toast.success("Member added successfully");

        return response.data;
      } else {
        toast.error("Failed to add member");
      }
    } catch (error) {
      const errorData = (error as any).response.data;

      const errorFields = [
        "email",
        "employee_id",
        "phone_number",
        "username",
        "password",
        "non_field_errors",
      ];
      const errorMessage =
        errorFields.find((field) => errorData[field]) || "Failed to add member";

      toast.error(errorData[errorMessage] || errorMessage);
      dispatch(setAuthLoading(false));

      return null;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

/**
 * Deletes a member or multiple members.
 * @param {UUID | UUID[]} id - The ID(s) of the member(s) to delete.
 * @param {boolean} [many=false] - Whether to delete multiple members.
 * @returns {Promise<boolean>}
 */
const deleteMember =
  (id: UUID | UUID[], many = false) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<boolean | undefined> => {
    if (many) {
      const response = await axios.delete(`${apiConfig.url}/member/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
        data: id,
      });

      if (response.status === 204) {
        toast.success("Deleted successfully");

        return true;
      } else {
        toast.error("Failed to delete members");
      }
    } else {
      const response = await axios.delete(`${apiConfig.url}/member/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      if (response.status === 204) {
        toast.success("Deleted successfully");

        return true;
      } else {
        toast.error("Failed to delete member");
      }
    }
  };

/**
 * Fetches information about a specific member.
 * @param {UUID} id - The ID of the member.
 * @returns {Promise<ResponseMember | any>}
 */
const getMemberInfo =
  (id: UUID) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<ResponseMember | any> => {
    dispatch(setAuthLoading(true));
    const response = await axios.get(`${apiConfig.url}/member/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.token}`,
      },
    });

    dispatch(setAuthLoading(false));
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get member info");
    }
  };

export { getMentors, getTrainees, addMember, deleteMember, getMemberInfo };
