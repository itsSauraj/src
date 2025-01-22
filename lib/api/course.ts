import type { StoreDispatch, RootState } from "@/redux/store";
import type { CourseFormData, CollectionFormData } from "@/dependencies/yup";
import type { Course, TraineeCourseView } from "@/types/dashboard/view";

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
  (id: UUID, user_group = "admin") =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<TraineeCourseView | any> => {
    const response = await axios.get(
      user_group === "admin"
        ? `${apiConfig.url}/course/${id}`
        : `${apiConfig.url}/member/collection/${id}`,
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
      return response.data;
    } else {
      dispatch(setAuthLoading(false));
    }
  };

const updateCollection =
  (id: UUID, formData: FormData) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<CollectionFormData | any> => {
    dispatch(setAuthLoading(true));

    const response = await axios.patch(
      `${apiConfig.url}/course/collection/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      },
    );

    dispatch(setAuthLoading(false));

    if (response.status === 200) {
      toast.success("Upadted successfully");

      return response.data;
    } else {
      dispatch(setAuthLoading(false));
      toast.error("Failed to update");
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

const removeCourseFromCollection =
  (collectoin_id: UUID, course_id: UUID) =>
  async (dispatch: StoreDispatch, getState: () => RootState) => {
    if (!collectoin_id || !course_id) {
      toast.error("Invalid collection or course id");

      return;
    }

    dispatch(setAuthLoading(true));
    const response = await axios.delete(
      `${apiConfig.url}/course/collection/${collectoin_id}/${course_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
      },
    );

    dispatch(setAuthLoading(false));

    if (response.status === 204) {
      toast.success("Course Removed From Collection");

      return true;
    } else {
      toast.error("Failed to remove course from collection");
    }
  };

const addCourseToCollection =
  (collectoin_id: UUID, formData: FormData) =>
  async (dispatch: StoreDispatch, getState: () => RootState) => {
    dispatch(setAuthLoading(true));
    const response = await axios.patch(
      `${apiConfig.url}/course/collection/${collectoin_id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.token}`,
        },
      },
    );

    dispatch(setAuthLoading(false));

    if (response.status === 200) {
      toast.success("Course Added successfully");

      return true;
    } else {
      toast.error("Failed to add course to collection");
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
  updateCollection,
  removeCourseFromCollection,
  addCourseToCollection,
};
