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

export const useNotifications = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const { items, unreadCount, isConnected, error, isLoading } = useSelector(
    (state: RootState) => state.app.notifications,
  );
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    const wsService = WebSocketService.getInstance();
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws";

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
