import type { StoreDispatch, RootState } from "@/redux/store";
import type { UserUpdateData } from "@/types/dashboard/forms";

import { UUID } from "crypto";

import axios from "axios";
// sonner
import { toast } from "sonner";

import { setAuthLoading } from "@/redux/slice/app";
import { apiConfig } from "@/config/api";

const updateUserDetails =
  (user_id: UUID, data: UserUpdateData) =>
  async (
    dispatch: StoreDispatch,
    getState: () => RootState,
  ): Promise<Boolean | any> => {
    dispatch(setAuthLoading(true));
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

      dispatch(setAuthLoading(false));

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
