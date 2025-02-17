"use client";

import type { StoreDispatch, RootState } from "@/redux/store";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  connectWebSocket,
  disconnectWebSocket,
  initialNotifications,
  addNotification,
} from "@/redux/slice/app";
import { WebSocketService } from "@/services/webSocket";

/**
 * A [Client Component] hook
 * that manages notifications using WebSocket and Redux.
 *
 * This hook connects to a WebSocket server, listens for notifications,
 * and updates the Redux store accordingly. It also displays toast messages
 * for new notifications.
 *
 *
 * @example
 *
 * ```ts
 * // TypeDeclaration
 * interface NotificationState {
 *  items: Notification[];
 *  unreadCount: number;
 *  isConnected: boolean;
 *  error: string | null;
 *  isLoading: boolean;
 * }
 *
 * // Redux Toolkit Slice
 * // state.app.notifications
 *
 * const notificationInitialState: NotificationState = {
 *  items: [],
 *  unreadCount: 0,
 *  isConnected: false,
 *  error: null,
 *  isLoading: false,
 *  };
 * ```
 *
 * *Usage in a component*
 *
 * ```ts
 * "use client"
 * import { useNotifications } from '@/hooks/useNotifications'
 *
 * export default function Page() {
 *  const { notifications, unreadCount, isConnected, error, isLoading } = useNotifications();
 *  // ...
 *  // ...
 * }
 * ```
 * @since 1.0.0
 * @version 1.0.0
 * @author https://github.com/itssauraj - Saurabh Yadav
 */

export const useNotifications = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const {
    items,
    unreadCount,
    isConnected,
    error,
    isLoading,
  }: {
    items: Notification[];
    unreadCount: number;
    isConnected: boolean;
    error: string | null;
    isLoading: boolean;
  } = useSelector((state: RootState) => state.app.notifications);
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    const wsService = WebSocketService.getInstance();
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "wss://localhost:8000/ws";

    if (token && !isConnected && !isLoading) {
      dispatch(connectWebSocket({ token, url: wsUrl }));
    }

    const removeListener = wsService.addListener((data) => {
      if (data.type === "initial_notifications") {
        dispatch(initialNotifications(data.notifications));
      }
      if (data.type === "new_notification") {
        toast.message(data.notification.title, {
          description: data.notification.message,
        });
        dispatch(addNotification(data.notification));
      }
    });

    return () => {
      removeListener();
      if (isConnected) {
        dispatch(disconnectWebSocket());
      }
    };
  }, [dispatch, isConnected, isLoading]);

  return {
    notifications: items,
    unreadCount,
    isConnected,
    error,
    isLoading,
  };
};
