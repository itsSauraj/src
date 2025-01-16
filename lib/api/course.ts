import type { StoreDispatch } from "@/redux/store";

import { UUID } from "crypto";

import axios from "axios";

import { apiConfig } from "@/config/api";
import { RootState } from "@/redux/store";

const getCourses =
  () => async (dispatch: StoreDispatch, getState: () => RootState) => {
    const response = await axios.get(`${apiConfig.url}/course/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    return [];
  };

const getCourseDetails =
  (id: UUID) => async (dispatch: StoreDispatch, getState: () => RootState) => {
    const response = await axios.get(`${apiConfig.url}/course/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    return [];
  };

export { getCourses, getCourseDetails };
