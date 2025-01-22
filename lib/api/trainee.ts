import type { StoreDispatch, RootState } from "@/redux/store";
import type { MemberCollection } from "@/types/dashboard/view";

import { UUID } from "crypto";

import axios from "axios";
// sonner

import { setAuthLoading } from "@/redux/slice/app";
import { apiConfig } from "@/config/api";

export const getTarineeAggignedCollection =
  () =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<MemberCollection[] | any> => {
    dispatch(setAuthLoading(true));
    const response = await axios.get(`${apiConfig.url}/member/collection/`, {
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

export const setStartCourse =
  (id: UUID) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Boolean | any> => {
    dispatch(setAuthLoading(true));
    const response = await axios.post(
      `${apiConfig.url}/member/collection/${id}`,
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

export const markLessonAsComplete =
  (course_id: UUID, lesson_id: UUID) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Boolean | any> => {
    dispatch(setAuthLoading(true));
    const response = await axios.post(
      `${apiConfig.url}/member/collection/${course_id}/${lesson_id}`,
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
