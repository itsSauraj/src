/* eslint-disable @typescript-eslint/no-unused-vars */
import type { UUID } from "crypto";
import type { StoreDispatch, RootState } from "@/redux/store";
import type { PasswordSchema } from "@/dependencies/yup";

import axios from "axios";
import { toast } from "sonner";
import { deleteCookie } from "cookies-next";

import { setAuthLoading } from "@/redux/slice/app";
import { toggleUser, toggleToken } from "@/redux/slice/user";
import { apiConfig } from "@/config/api";

const getProfile =
  (id: UUID) =>
  async (dispatch: StoreDispatch, getState: () => RootState): Promise<any> => {
    try {
      dispatch(setAuthLoading(true));
      const response = await axios.get(`${apiConfig.url}/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      if (response.status === 200) {
        dispatch(setAuthLoading(false));

        return response.data;
      }

      toast.error("Failed to get profile data");

      return false;
    } catch (error) {
      toast.error("Failed to get profile data");

      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

const updateProfile =
  (formData: FormData) =>
  async (dispatch: StoreDispatch, getState: () => RootState): Promise<any> => {
    try {
      dispatch(setAuthLoading(true));
      const response = await axios.patch(
        `${apiConfig.url}/profile/update_profile/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        dispatch(setAuthLoading(false));
        dispatch(toggleUser(response.data));

        return response.data;
      }

      toast.error("Failed to get profile data");

      return false;
    } catch (error) {
      toast.error("Failed to get profile data");

      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

const deleteProfile =
  () =>
  async (dispatch: StoreDispatch, getState: () => RootState): Promise<any> => {
    try {
      dispatch(setAuthLoading(true));
      const response = await axios.delete(
        `${apiConfig.url}/profile/delete_account/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("Profile deleted successfully");

        dispatch(setAuthLoading(false));
        dispatch(toggleUser(null));
        dispatch(toggleToken(null));
        deleteCookie("token");

        return true;
      }

      toast.error("Failed to delete profile");

      return false;
    } catch (error) {
      toast.error("Failed to delete profile");

      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

const changePassword =
  (data: PasswordSchema) =>
  async (dispatch: StoreDispatch, getState: () => RootState): Promise<any> => {
    try {
      dispatch(setAuthLoading(true));
      const response = await axios.patch(
        `${apiConfig.url}/profile/change_password/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("Password changed successfully");
        dispatch(setAuthLoading(false));

        return;
      }

      return false;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to change password");
      }
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

export { getProfile, updateProfile, deleteProfile, changePassword };
