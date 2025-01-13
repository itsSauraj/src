"use client";

import { createSlice, Dispatch, GetState } from "@reduxjs/toolkit";

import { Members } from "@/types/redux";
//API CALLs

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

export const { toggleMentorIsLoading, toggleTraineeIsLoading } =
  memberSlice.actions;

const setLoading =
  (page: string, isLoading: boolean) => (dispatch: Dispatch) => {
    if (page === "trainee") dispatch(toggleTraineeIsLoading(isLoading));
    if (page === "mentor") dispatch(toggleMentorIsLoading(isLoading));
  };

const setMembers =
  (page: string) =>
  async (dispatch: Dispatch, getState: GetState<typeof initialState>) => {};

export { setLoading };
export default memberSlice.reducer;
