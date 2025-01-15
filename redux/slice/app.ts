"use client";

import type { App } from "@/types/redux";
import type { StoreDispatch } from "@/redux/store";

import { createSlice } from "@reduxjs/toolkit";

const initialState: App = {
  auth: {
    isLoading: false,
  },
  notifications: [],
  settings: {
    notification: true,
    sidebar: false,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    toggleAuthLoading: (state, action) => {
      state.auth.isLoading = action.payload;
    },
    toggleSideBar: (state) => {
      state.settings.sidebar = !state.settings.sidebar;
    },
    toggleNotification: (state) => {
      state.settings.notification = !state.settings.notification;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    clearNotification: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  toggleAuthLoading,
  toggleSideBar,
  toggleNotification,
  addNotification,
  clearNotification,
} = appSlice.actions;

const setAuthLoading = (isLoading: boolean) => (dispatch: StoreDispatch) => {
  dispatch(toggleAuthLoading(isLoading));
};

const toogleSideBarPin = () => (dispatch: StoreDispatch) => {
  dispatch(toggleSideBar());
};

export { setAuthLoading, toogleSideBarPin };
export default appSlice.reducer;
