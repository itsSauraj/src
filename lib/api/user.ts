/* eslint-disable @typescript-eslint/no-unused-vars */
import type { StoreDispatch, RootState } from "@/redux/store";
import type { UserUpdateData } from "@/types/dashboard/forms";

import { UUID } from "crypto";

import axios from "axios";
import { toast } from "sonner";

import { apiConfig } from "@/config/api";

/**
 * Updates user details.
 *
 * @param {UUID} user_id - The ID of the user to update.
 * @param {UserUpdateData} data - The data to update the user with.
 * @returns {Promise<Boolean | any>} - The response data or false if the update failed.
 */
const updateUserDetails =
  (user_id: UUID, data: UserUpdateData) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Boolean | any> => {
    try {
      const response = await axios.patch(
        `${apiConfig.url}/member/${user_id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("User details updated successfully");

        return response.data;
      }

      toast.error("Failed to update user details");

      return false;
    } catch (error) {
      toast.error("Something went wrong, please try again");

      return false;
    }
  };

export { updateUserDetails };
