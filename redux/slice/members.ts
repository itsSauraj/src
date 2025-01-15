"use client";

import type { Members } from "@/types/redux";
import type { RootState } from "@/redux/store";

import { createSlice, Dispatch } from "@reduxjs/toolkit";

//API CALLs

//Initial States
const initialMentors: Members = [];
const initialTrainees: Members = [];

const initialState = {
  members: {
    mentors: initialMentors,
    trainees: initialTrainees,
  },
  metorIsLoading: false,
  traineeIsLoading: false,
};

const memberSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    toggleMentorIsLoading: (state, action) => {
      state.metorIsLoading = action.payload;
    },
    toggleTraineeIsLoading: (state, action) => {
      state.traineeIsLoading = action.payload;
    },
    setMentors: (state, action) => {
      state.members.mentors = action.payload;
    },
    setTrainees: (state, action) => {
      state.members.trainees = action.payload;
    },
  },
});

export const {
  toggleMentorIsLoading,
  toggleTraineeIsLoading,
  setMentors,
  setTrainees,
} = memberSlice.actions;

const setLoading =
  (page: string, isLoading: boolean) => (dispatch: Dispatch) => {
    if (page === "trainee") dispatch(toggleTraineeIsLoading(isLoading));
    if (page === "mentor") dispatch(toggleMentorIsLoading(isLoading));
  };

const setMembers =
  (type: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    const token = getState().user.token;
  };

export { setLoading, setMembers };
export default memberSlice.reducer;
