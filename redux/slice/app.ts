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

/**
 * Connect to WebSocket
 * @param {Object} param0 - The token and URL for WebSocket connection
 * @param {string} param0.token - The authentication token
 * @param {string} param0.url - The WebSocket URL
 */
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

/**
 * Disconnect from WebSocket
 */
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
    /**
     * Toggle authentication loading state
     * @param {Object} state - The current state
     * @param {Object} action - The action object
     * @param {boolean} action.payload - The loading state
     */
    toggleAuthLoading: (state, action) => {
      state.auth.isLoading = action.payload;
    },
    /**
     * Toggle sidebar visibility
     * @param {Object} state - The current state
     */
    toggleSideBar: (state) => {
      state.settings.sidebar = !state.settings.sidebar;
    },
    /**
     * Toggle notification setting
     * @param {Object} state - The current state
     */
    toggleNotification: (state) => {
      state.settings.notification = !state.settings.notification;
    },
    /**
     * Initialize notifications
     * @param {Object} state - The current state
     * @param {Object} action - The action object
     * @param {Notification[]} action.payload - The notifications array
     */
    initialNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications.items = action.payload;
      state.notifications.unreadCount = action.payload.length;
    },
    /**
     * Add a new notification
     * @param {Object} state - The current state
     * @param {Object} action - The action object
     * @param {Notification} action.payload - The new notification
     */
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.items.unshift(action.payload);
      if (!action.payload.read) {
        state.notifications.unreadCount += 1;
      }
    },
    /**
     * Remove a notification by ID
     * @param {Object} state - The current state
     * @param {Object} action - The action object
     * @param {string} action.payload - The notification ID
     */
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications.items = state.notifications.items.filter(
        (n) => n.id !== action.payload,
      );
    },
    /**
     * Mark a notification as read by ID
     * @param {Object} state - The current state
     * @param {Object} action - The action object
     * @param {string} action.payload - The notification ID
     */
    markAsRead: (state, action: PayloadAction<string>) => {
      const index = state.notifications.items.findIndex(
        (n) => n.id === action.payload,
      );

      if (index !== -1 && !state.notifications.items[index].read) {
        state.notifications.items[index].read = true;
        state.notifications.unreadCount = Math.max(
          0,
          state.notifications.unreadCount - 1,
        );
      }
    },
    /**
     * Mark all notifications as read
     * @param {Object} state - The current state
     */
    markAllAsRead: (state) => {
      state.notifications.items.forEach((notification) => {
        notification.read = true;
      });
      state.notifications.unreadCount = 0;
    },
    /**
     * Clear all notifications
     * @param {Object} state - The current state
     */
    clearNotifications: (state) => {
      state.notifications.items = [];
      state.notifications.unreadCount = 0;
    },
    /**
     * Set error message
     * @param {Object} state - The current state
     * @param {Object} action - The action object
     * @param {string | null} action.payload - The error message
     */
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
  initialNotifications,
  addNotification,
  removeNotification,
  markAsRead,
  markAllAsRead,
  clearNotifications,
  setError,
} = appSlice.actions;

/**
 * Set authentication loading state
 * @param {boolean} isLoading - The loading state
 */
const setAuthLoading = (isLoading: boolean) => (dispatch: StoreDispatch) => {
  dispatch(toggleAuthLoading(isLoading));
};

/**
 * Toggle sidebar pin state
 */
const toogleSideBarPin = () => (dispatch: StoreDispatch) => {
  dispatch(toggleSideBar());
};

export { setAuthLoading, toogleSideBarPin };
export default appSlice.reducer;
