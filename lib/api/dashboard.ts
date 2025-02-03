import type { StoreDispatch, RootState } from "@/redux/store";

import axios from "axios";
// sonner
import { toast } from "sonner";

import { setAuthLoading } from "@/redux/slice/app";
import { apiConfig } from "@/config/api";

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
      // eslint-disable-line
      toast.error("Failed to get dashboard report");

      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

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
      // eslint-disable-line
      toast.error("Failed to get dashboard report");

      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

export { getDashboardReport, getDashboardCourseCollectionStatus };
