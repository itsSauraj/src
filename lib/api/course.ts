import type { StoreDispatch, RootState } from "@/redux/store";
import type { CourseFormData, CollectionFormData } from "@/dependencies/yup";
import type { Course, TraineeCourseView } from "@/types/dashboard/view";

import { UUID } from "crypto";

import axios from "axios";
// sonner
import { toast } from "sonner";

import { setAuthLoading } from "@/redux/slice/app";
import { apiConfig } from "@/config/api";

/**
 * Fetches all courses.
 * @returns {Promise<Course[]>} List of courses.
 */
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

/**
 * Fetches course details.
 * @param {UUID} id - Course ID.
 * @param {UUID | null} collection_id - Collection ID.
 * @param {string} user_group - User group.
 * @returns {Promise<TraineeCourseView>} Course details.
 */
const getCourseDetails =
  (id: UUID, collection_id: UUID | null = null, user_group = "admin") =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<TraineeCourseView | any> => {
    const response = await axios.get(
      user_group === "admin"
        ? `${apiConfig.url}/course/${id}`
        : `${apiConfig.url}/member/${collection_id}/${id}`,
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

/**
 * Deletes a course.
 * @param {UUID} id - Course ID.
 * @returns {Promise<boolean>} Deletion status.
 */
const deleteCourse =
  (id: UUID) => async (dispatch: StoreDispatch, getState: () => RootState) => {
    dispatch(setAuthLoading(true));

    const response = await axios.delete(`${apiConfig.url}/course/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.token}`,
      },
    });

    dispatch(setAuthLoading(false));

    if (response.status === 204) {
      toast.success("Course deleted successfully");

      return true;
    } else {
      toast.error("Failed to delete course");
    }
  };

/**
 * Creates a new course.
 * @param {CourseFormData} courseData - Course data.
 * @returns {Promise<Course>} Created course.
 */
const createNewCourse =
  (courseData: CourseFormData) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Course | any> => {
    dispatch(setAuthLoading(true));

    const response = await axios.post(`${apiConfig.url}/course/`, courseData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

/**
 * Creates a new collection.
 * @param {FormData} formData - Collection data.
 * @returns {Promise<CollectionFormData>} Created collection.
 */
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

/**
 * Updates a collection.
 * @param {UUID} id - Collection ID.
 * @param {FormData} formData - Collection data.
 * @returns {Promise<CollectionFormData>} Updated collection.
 */
const updateCollection =
  (id: UUID, formData: FormData) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<CollectionFormData | any> => {
    const response = await axios.patch(
      `${apiConfig.url}/course/collection/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      },
    );

    if (response.status === 200) {
      toast.success("Updated successfully");

      return response.data;
    } else {
      toast.error("Failed to update");
    }
  };

/**
 * Fetches all course collections.
 * @returns {Promise<CollectionFormData[]>} List of collections.
 */
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

/**
 * Fetches course collection details.
 * @param {UUID} id - Collection ID.
 * @returns {Promise<CollectionFormData>} Collection details.
 */
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

/**
 * Deletes a collection or multiple collections.
 * @param {UUID | UUID[]} id - Collection ID(s).
 * @param {boolean} many - Flag to indicate multiple deletions.
 * @returns {Promise<boolean>} Deletion status.
 */
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

/**
 * Removes a course from a collection.
 * @param {UUID} collectoin_id - Collection ID.
 * @param {UUID} course_id - Course ID.
 * @returns {Promise<boolean>} Removal status.
 */
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

/**
 * Adds a course to a collection.
 * @param {UUID} collectoin_id - Collection ID.
 * @param {FormData} formData - Course data.
 * @returns {Promise<boolean>} Addition status.
 */
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

/**
 * Sets a collection as default.
 * @param {UUID} id - Collection ID.
 * @returns {Promise<boolean>} Operation status.
 */
const setDefaultCollection =
  (id: UUID) => async (dispatch: StoreDispatch, getState: () => RootState) => {
    dispatch(setAuthLoading(true));
    try {
      const response = await axios.put(
        `${apiConfig.url}/course/collection/${id}/default`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );

      if (response.status == 200) {
        toast.success("Default collection set successfully");

        return true;
      }

      toast.error("Failed to set default collection");
    } catch (error) { // eslint-disable-line
      toast.error("Failed to set default collection");
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

export {
  getCourses,
  getCourseDetails,
  deleteCourse,
  createNewCourse,
  createNewCollection,
  getCourseCollection,
  getCourseCollectionDetails,
  deleteCollection,
  updateCollection,
  removeCourseFromCollection,
  addCourseToCollection,
  setDefaultCollection,
};
