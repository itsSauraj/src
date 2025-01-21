import type { StoreDispatch, RootState } from "@/redux/store";
import type { MemberCollection } from "@/types/dashboard/view";

import { UUID } from "crypto";

import axios from "axios";
// sonner
import { toast } from "sonner";

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
