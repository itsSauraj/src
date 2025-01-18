import type { StoreDispatch, RootState } from "@/redux/store";
import type { CourseFormData, CollectionFormData } from "@/dependencies/yup";
import type { Course } from "@/types/dashboard/view";

import { UUID } from "crypto";

import axios from "axios";
// sonner
import { toast } from "sonner";

import { setAuthLoading } from "@/redux/slice/app";
import { apiConfig } from "@/config/api";

const getCourses =
  () =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Course[] | any> => {
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
  (id: UUID) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Course | any> => {
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

const createNewCourse =
  (courseData: CourseFormData) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Course | any> => {
    dispatch(setAuthLoading(true));

    const response = await axios.post(`${apiConfig.url}/course/`, courseData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.token}`,
      },
    });

    dispatch(setAuthLoading(false));

    if (response.status === 201) {
      toast.success("Course created successfully");

      return response.data;
    } else {
      toast.error("Failed to create new course");
    }
  };

const createNewCollection =
  (formData: FormData) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<CollectionFormData | any> => {
    dispatch(setAuthLoading(true));

    const response = await axios.post(
      `${apiConfig.url}/course/collection/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      },
    );

    dispatch(setAuthLoading(false));

    if (response.status === 201) {
      toast.success("Collection created successfully");

      return response.data;
    } else {
      dispatch(setAuthLoading(false));
      toast.error("Failed to create new collection");
    }
  };

const getCourseCollection =
  () =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<CollectionFormData[] | any> => {
    const response = await axios.get(`${apiConfig.url}/course/collection`, {
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

const getCourseCollectionDetails =
  (id: UUID) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<CollectionFormData | any> => {
    const response = await axios.get(
      `${apiConfig.url}/course/collection/${id}`,
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

    return [];
  };

const deleteCollection =
  (id: UUID | UUID[], many = false) =>
  async (dispatch: StoreDispatch, getState: () => RootState) => {
    dispatch(setAuthLoading(true));

    if (many) {
      const response = await axios.delete(
        `${apiConfig.url}/course/collection/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
          data: id,
        },
      );

      dispatch(setAuthLoading(false));

      if (response.status === 204) {
        toast.success("Deleted successfully");

        return true;
      } else {
        toast.error("Failed to delete collections");
      }
    } else {
      const response = await axios.delete(
        `${apiConfig.url}/course/collection/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );

      dispatch(setAuthLoading(false));

      if (response.status === 204) {
        toast.success("Deleted successfully");

        return true;
      } else {
        toast.error("Failed to delete collection");
      }
    }
  };

export {
  getCourses,
  getCourseDetails,
  createNewCourse,
  createNewCollection,
  getCourseCollection,
  getCourseCollectionDetails,
  deleteCollection,
};
