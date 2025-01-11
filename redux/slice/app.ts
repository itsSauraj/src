import { createSlice, Dispatch } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    auth: {
      isLoading: false,
    },
  },
  reducers: {
    toggleAuthLoading: (state, action) => {
      state.auth.isLoading = action.payload;
    },
  },
});

export const { toggleAuthLoading } = appSlice.actions;

const setAuthLoading = (isLoading: boolean) => (dispatch: Dispatch) => {
  dispatch(toggleAuthLoading(isLoading));
};

export { setAuthLoading };
export default appSlice.reducer;
