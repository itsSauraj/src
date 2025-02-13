/* eslint-disable @typescript-eslint/no-unused-vars */
import type { StoreDispatch, RootState } from "@/redux/store";

import axios from "axios";
import { toast } from "sonner";

import { setAuthLoading } from "@/redux/slice/app";
import { apiConfig } from "@/config/api";

/**
 * Fetches the dashboard report.
 * @returns {Promise<any>} The dashboard report data or false if an error occurs.
 */
const getDashboardReport =
  () =>
  async (dispatch: StoreDispatch, getState: () => RootState): Promise<any> => {
    try {
      dispatch(setAuthLoading(true));
      const response = await axios.get(
        `${apiConfig.url}/dashboard/get_report`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );

      if (response.status === 200) {
        dispatch(setAuthLoading(false));

        return response.data;
      }

      toast.error("Failed to get dashboard report");

      return false;
    } catch (error) {
      toast.error("Failed to get dashboard report");

      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

/**
 * Fetches the dashboard course completion status.
 * @returns {Promise<any>} The course completion status data or false if an error occurs.
 */
const getDashboardCourseCollectionStatus =
  () =>
  async (dispatch: StoreDispatch, getState: () => RootState): Promise<any> => {
    try {
      dispatch(setAuthLoading(true));
      const response = await axios.get(
        `${apiConfig.url}/dashboard/get_course_completion_status`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );

      if (response.status === 200) {
        dispatch(setAuthLoading(false));

        return response.data;
      }

      toast.error("Failed to get dashboard report");

      return false;
    } catch (error) {
      toast.error("Failed to get dashboard report");

      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

export { getDashboardReport, getDashboardCourseCollectionStatus };
