/* eslint-disable @typescript-eslint/no-unused-vars */
import type { UUID } from "crypto";
import type { StoreDispatch, RootState } from "@/redux/store";
import type { ExamScheduleRequest } from "@/dependencies/yup";
import type { Exam } from "@/types/dashboard/exam";

import axios from "axios";
import { toast } from "sonner";

import { setAuthLoading } from "@/redux/slice/app";
import { apiConfig } from "@/config/api";

/**
 * Schedules an exam.
 * @param {ExamScheduleRequest} formData The exam scheduling form data.
 * @returns {Promise<any>} The exam scheduling response data.
 */
const scheduleExam =
  (formData: ExamScheduleRequest) =>
  async (dispatch: StoreDispatch, getState: () => RootState): Promise<Exam> => {
    dispatch(setAuthLoading(true));
    try {
      const response = await axios.post(`${apiConfig.url}/exam/`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      toast.success("Exam scheduled successfully");

      return response.data;
    } catch (error) {
      toast.error("Failed to schedule exam");
      throw error;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

/**
 * Gets the scheduled exam.
 * @returns {Promise<any>} The scheduled exam data.
 */
const getScheduledExam =
  () =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Exam[]> => {
    dispatch(setAuthLoading(true));
    try {
      const response = await axios.get(`${apiConfig.url}/exam/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

/**
 * Gets the exam details.
 * @param {UUID} id The exam ID.
 * @returns {Promise<Exam>} The exam details data.
 */
const getExamDetails =
  (id: UUID) =>
  async (dispatch: StoreDispatch, getState: () => RootState): Promise<Exam> => {
    dispatch(setAuthLoading(true));
    try {
      const response = await axios.get(`${apiConfig.url}/exam/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

/**
 * Cancels the scheduled exam.
 * @param {UUID} id The scheduled exam ID.
 */
const cancelScheduledExam =
  (id: UUID) => async (dispatch: StoreDispatch, getState: () => RootState) => {
    dispatch(setAuthLoading(true));
    try {
      const response = await axios.delete(`${apiConfig.url}/exam/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      toast.success("Exam cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel exam");
      throw error;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

/**
 * Update the examination details
 * @param {UUID} id exam id
 * @param {ExamScheduleRequest} formData partial will be also fine
 * @param {boolean} checked if true then user will get notified update of the exam
 * @returns `Promise<Exam>` The updated exam details data.
 */
const updateExam =
  (id: UUID, formData: ExamScheduleRequest, checked: boolean) =>
  async (dispatch: StoreDispatch, getState: () => RootState): Promise<Exam> => {
    dispatch(setAuthLoading(true));
    try {
      const response = await axios.patch(
        `${apiConfig.url}/exam/${id}/${checked ? "true" : "false"}/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );

      toast.success("Exam updated successfully");

      return response.data;
    } catch (error) {
      toast.error("Failed to update exam");
      throw error;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

export {
  scheduleExam,
  getScheduledExam,
  getExamDetails,
  cancelScheduledExam,
  updateExam,
};
