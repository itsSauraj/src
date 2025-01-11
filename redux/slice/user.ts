import { createSlice, Dispatch } from "@reduxjs/toolkit";

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

const addUser = (userObj: any) => (dispatch: Dispatch) => {
  dispatch(toggleToken(userObj.token));
  dispatch(toggleUser(userObj.user));
};

const removeUser = () => (dispatch: Dispatch) => {
  dispatch(toggleToken(null));
  dispatch(toggleUser(null));
}

export { addUser, removeUser };

export const { toggleToken, toggleUser } = userSlice.actions;
export default userSlice.reducer;
