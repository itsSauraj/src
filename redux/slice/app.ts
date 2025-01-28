"use client";

import type { App, NotificationState, Notification } from "@/types/redux";
import type { StoreDispatch } from "@/redux/store";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { WebSocketService } from "@/services/webSocket";

const notificationInitialState: NotificationState = {
  items: [],
  unreadCount: 0,
  isConnected: false,
  error: null,
  isLoading: false,
};

const initialState: App = {
  auth: {
    isLoading: false,
  },
  notifications: notificationInitialState,
  settings: {
    notification: true,
    sidebar: false,
  },
};

export const connectWebSocket = createAsyncThunk(
  "notifications/connect",
  async (
    { token, url }: { token: string; url: string },
    { rejectWithValue },
  ) => {
    try {
      const wsService = WebSocketService.getInstance();

      await wsService.connect(token, url);

      return true;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to connect",
      );
    }
  },
);

export const disconnectWebSocket = createAsyncThunk(
  "notifications/disconnect",
  async (_, { rejectWithValue }) => {
    try {
      const wsService = WebSocketService.getInstance();

      wsService.disconnect();

      return true;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to disconnect",
      );
    }
  },
);

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
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.items.unshift(action.payload);
      if (!action.payload.read) {
        state.notifications.unreadCount += 1;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.items.find(
        (n) => n.id === action.payload,
      );

      if (notification && !notification.read) {
        notification.read = true;
        state.notifications.unreadCount = Math.max(
          0,
          state.notifications.unreadCount - 1,
        );
      }
    },
    markAllAsRead: (state) => {
      state.notifications.items.forEach((notification) => {
        notification.read = true;
      });
      state.notifications.unreadCount = 0;
    },
    clearNotifications: (state) => {
      state.notifications.items = [];
      state.notifications.unreadCount = 0;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.notifications.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectWebSocket.pending, (state) => {
        state.notifications.isLoading = true;
        state.notifications.error = null;
      })
      .addCase(connectWebSocket.fulfilled, (state) => {
        state.notifications.isLoading = false;
        state.notifications.isConnected = true;
        state.notifications.error = null;
      })
      .addCase(connectWebSocket.rejected, (state, action) => {
        state.notifications.isLoading = false;
        state.notifications.isConnected = false;
        state.notifications.error = action.payload as string;
      })
      .addCase(disconnectWebSocket.fulfilled, (state) => {
        state.notifications.isConnected = false;
      });
  },
});

export const {
  toggleAuthLoading,
  toggleSideBar,
  toggleNotification,
  addNotification,
  markAsRead,
  markAllAsRead,
  clearNotifications,
  setError,
} = appSlice.actions;

const setAuthLoading = (isLoading: boolean) => (dispatch: StoreDispatch) => {
  dispatch(toggleAuthLoading(isLoading));
};

const toogleSideBarPin = () => (dispatch: StoreDispatch) => {
  dispatch(toggleSideBar());
};

export { setAuthLoading, toogleSideBarPin };
export default appSlice.reducer;
