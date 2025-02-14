/* eslint-disable @typescript-eslint/no-unused-vars */
import type { StoreDispatch, RootState } from "@/redux/store";
import type { UUID } from "crypto";

import axios from "axios";
import { toast } from "sonner";

import { apiConfig } from "@/config/api";
import {
  markAsRead,
  removeNotification,
  markAllAsRead,
  clearNotifications,
} from "@/redux/slice/app";

/**
 * Marks a notification as read.
 * @param {UUID} id - The ID of the notification to mark as read.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating success or failure.
 */
const markNotificationAsRead =
  (id: UUID) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<boolean> => {
    try {
      const response = await axios.put(
        `${apiConfig.url}/notifications/${id}/mark_as_read/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );

      if (response.status === 200) {
        dispatch(markAsRead(id));
        dispatch(removeNotification(id));
        toast.success("Notification read successfully");

        return true;
      }

      toast.error("Failed to mark notification as read");

      return false;
    } catch (error) {
      toast.error("Failed to mark notification as read");

      return false;
    }
  };

/**
 * Marks all notifications as read.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating success or failure.
 */
const markAllNotificationAsRead =
  () =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<boolean> => {
    try {
      const response = await axios.patch(
        `${apiConfig.url}/notifications/mark_all_as_read/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );

      if (response.status === 200) {
        dispatch(markAllAsRead());
        dispatch(clearNotifications());
        toast.success("All notifications read successfully");

        return true;
      }

      toast.error("Failed to mark notifications as read");

      return false;
    } catch (error) {
      toast.error("Failed to mark notifications as read");

      return false;
    }
  };

export { markNotificationAsRead, markAllNotificationAsRead };
