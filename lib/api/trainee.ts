import type { StoreDispatch, RootState } from "@/redux/store";
import type { MemberCollection } from "@/types/dashboard/view";
import type { TrainingReportData } from "@/types/dashboard/report";
import type { ResponseMiniFiedTraineeCollectionData } from "@/types/dashboard/report";

import { UUID } from "crypto";

import axios from "axios";
// sonner
import { toast } from "sonner";

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

const unmarkLessonAsComplete =
  (data: { collection_id: UUID; course_id: UUID; lesson_id: UUID }) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<boolean> => {
    dispatch(setAuthLoading(true));

    try {
      const response = await axios.delete(
        `${apiConfig.url}/member/action/lesson`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
          data: data,
        },
      );

      dispatch(setAuthLoading(false));

      return response.status === 200;
    } catch (error) {
      console.error("Error unmarking lesson as complete:", error);
      dispatch(setAuthLoading(false));

      return false;
    }
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

const getMiniFiedTraineeCollectionData =
  (trainee_id: UUID) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<ResponseMiniFiedTraineeCollectionData | any> => {
    dispatch(setAuthLoading(true));

    try {
      const response = await axios.get(
        `${apiConfig.url}/trainee/collection/mini/${trainee_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );

      dispatch(setAuthLoading(false));

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

const assignCourseCollection =
  (trainee_id: UUID, courses: UUID[]) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Boolean> => {
    dispatch(setAuthLoading(true));

    try {
      const response = await axios.post(
        `${apiConfig.url}/trainee/course/`,
        { user: trainee_id, collection: courses },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );

      dispatch(setAuthLoading(false));

      if (response.status === 201) {
        toast.success("Courses assigned successfully");

        return true;
      }

      toast.error("Failed to assign courses");

      return false;
    } catch (error) { // eslint-disable-line  
      toast.error("Failed to assign courses");

      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

const deassignCourseCollection =
  (trainee_id: UUID, courses: UUID[]) =>
  async (dispatch: StoreDispatch, getState: () => RootState) => {
    dispatch(setAuthLoading(true));

    try {
      const response = await axios.delete(`${apiConfig.url}/trainee/course/`, {
        data: { user: trainee_id, collection: courses },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      if (response.status === 204) {
        toast.success("Courses deassigned successfully");

        return true;
      } else {
        toast.error("Failed to deassign courses");

        return false;
      }
    } catch (error) { // eslint-disable-line
      toast.error("Failed to deassign courses");

      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

export {
  getTarineeAggignedCollection,
  setStartCourse,
  markLessonAsComplete,
  unmarkLessonAsComplete,
  getTraineeReport,
  getMiniFiedTraineeCollectionData,
  assignCourseCollection,
  deassignCourseCollection,
};
