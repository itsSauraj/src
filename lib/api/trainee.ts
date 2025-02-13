/* eslint-disable @typescript-eslint/no-unused-vars */
import type { StoreDispatch, RootState } from "@/redux/store";
import type { MemberCollection } from "@/types/dashboard/view";
import type { TrainingReportData } from "@/types/dashboard/report";
import type { ResponseMiniFiedTraineeCollectionData } from "@/types/dashboard/report";

import { UUID } from "crypto";

import axios from "axios";
import { toast } from "sonner";

import { setAuthLoading } from "@/redux/slice/app";
import { apiConfig } from "@/config/api";

/**
 * Fetches the assigned trainee collection.
 * @returns {Promise<MemberCollection[] | undefined>}
 */
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
    } catch (error) {
      return undefined;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

/**
 * Starts a course for a trainee.
 * @param {UUID} collection_id - The collection ID.
 * @param {UUID} course_id - The course ID.
 * @returns {Promise<Boolean>}
 */
const setStartCourse =
  (collection_id: UUID, course_id: UUID) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Boolean> => {
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

    return response.status === 200;
  };

/**
 * Marks a lesson as complete.
 * @param {Object} data - The data containing collection_id, course_id, and lesson_id.
 * @returns {Promise<Boolean>}
 */
const markLessonAsComplete =
  (data: { collection_id: UUID; course_id: UUID; lesson_id: UUID }) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Boolean> => {
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

    return response.status === 200;
  };

/**
 * Unmarks a lesson as complete.
 * @param {Object} data - The data containing collection_id, course_id, and lesson_id.
 * @returns {Promise<boolean>}
 */
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

      return response.status === 200;
    } catch (error) {
      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

/**
 * Fetches the trainee report.
 * @param {UUID} id - The trainee ID.
 * @returns {Promise<TrainingReportData | undefined>}
 */
const getTraineeReport =
  (id: UUID) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<TrainingReportData | undefined> => {
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
    } catch (error) {
      return undefined;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

/**
 * Fetches the minified trainee collection data.
 * @param {UUID} trainee_id - The trainee ID.
 * @returns {Promise<ResponseMiniFiedTraineeCollectionData | undefined>}
 */
const getMiniFiedTraineeCollectionData =
  (trainee_id: UUID) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<ResponseMiniFiedTraineeCollectionData | undefined> => {
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

      if (response.status === 200) {
        return response.data;
      }

      return undefined;
    } catch (error) {
      return undefined;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

/**
 * Assigns a course collection to a trainee.
 * @param {UUID} trainee_id - The trainee ID.
 * @param {UUID[]} courses - The array of course IDs.
 * @returns {Promise<Boolean>}
 */
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

      if (response.status === 201) {
        toast.success("Courses assigned successfully");

        return true;
      }

      toast.error("Failed to assign courses");

      return false;
    } catch (error) {
      toast.error("Failed to assign courses");

      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

/**
 * Deassigns a course collection from a trainee.
 * @param {UUID} trainee_id - The trainee ID.
 * @param {UUID[]} courses - The array of course IDs.
 * @returns {Promise<Boolean>}
 */
const deassignCourseCollection =
  (trainee_id: UUID, courses: UUID[]) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Boolean> => {
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
    } catch (error) {
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
