import type { StoreDispatch, RootState } from "@/redux/store";
import type { MemberCollection } from "@/types/dashboard/view";
import type { TrainingReportData } from "@/types/dashboard/report";

import { UUID } from "crypto";

import axios from "axios";
// sonner

import { setAuthLoading } from "@/redux/slice/app";
import { apiConfig } from "@/config/api";

const getTarineeAggignedCollection =
  () =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<MemberCollection[] | undefined> => {
    dispatch(setAuthLoading(true));
    try {
      const response = await axios.get(`${apiConfig.url}/member/collection/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      }

      return undefined;
    } catch (error) { // eslint-disable-line
      return undefined;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

const setStartCourse =
  (collection_id: UUID, course_id: UUID) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Boolean | any> => {
    dispatch(setAuthLoading(true));
    const response = await axios.post(
      `${apiConfig.url}/member/${collection_id}/${course_id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
      },
    );

    dispatch(setAuthLoading(false));

    if (response.status === 200) {
      return true;
    }

    return false;
  };

const markLessonAsComplete =
  (data: { collection_id: UUID; course_id: UUID; lesson_id: UUID }) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Boolean | any> => {
    dispatch(setAuthLoading(true));
    const response = await axios.post(
      `${apiConfig.url}/member/action/lesson`,
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
      },
    );

    dispatch(setAuthLoading(false));

    if (response.status === 200) {
      return true;
    }

    return false;
  };

const getTraineeReport =
  (id: UUID) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<TrainingReportData | any> => {
    dispatch(setAuthLoading(true));
    try {
      const response = await axios.get(
        `${apiConfig.url}/user/trainee/${id}/report`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );

      if (response.status === 200) {
        return response.data;
      }

      return undefined;
    } catch (error) { // eslint-disable-line
      return undefined;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

export {
  getTarineeAggignedCollection,
  setStartCourse,
  markLessonAsComplete,
  getTraineeReport,
};
