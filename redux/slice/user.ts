import { createSlice, Dispatch } from "@reduxjs/toolkit";

import { LoginRequest } from "@/types/auth/actions";
import { login, logout } from "@/lib/auth/actions";
import { setAuthLoading } from "@/redux/slice/app";

const userSlice = createSlice({
  name: "user",
  initialState: { token: null, user: null },
  reducers: {
    toggleToken: (state, action) => {
      state.token = action.payload;
    },
    toggleUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { toggleToken, toggleUser } = userSlice.actions;

const setToken = (token: string) => (dispatch: Dispatch) => {
  dispatch(toggleToken(token));
};

const logInUser = (formData: LoginRequest) => async (dispatch: Dispatch) => {
  try {
    const userObj = await login(formData);

    // TODO: Error Notification
    if (!userObj) {
      return;
    }

    dispatch(setAuthLoading(false) as any);
    dispatch(toggleToken(userObj.token));
    dispatch(toggleUser(userObj.user));
  } catch (error: any) {
    // TODO: Error Notification
  }
};

const logoutUser = (token: string) => async (dispatch: Dispatch) => {
  await logout(token);
  dispatch(toggleToken(null));
  dispatch(toggleUser(null));
};

export { logInUser, logoutUser, setToken };
export default userSlice.reducer;
