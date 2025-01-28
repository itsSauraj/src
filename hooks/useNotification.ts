import type { StoreDispatch, RootState } from "@/redux/store";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  connectWebSocket,
  disconnectWebSocket,
  addNotification,
} from "@/redux/slice/app";
import { WebSocketService } from "@/services/webSocket";

export const useNotifications = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const { items, unreadCount, isConnected, error, isLoading } = useSelector(
    (state: RootState) => state.app.notifications,
  );

  useEffect(() => {
    const wsService = WebSocketService.getInstance();
    const token = localStorage.getItem("token");
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws";

    if (token && !isConnected && !isLoading) {
      dispatch(connectWebSocket({ token, url: wsUrl }));
    }

    const removeListener = wsService.addListener((data) => {
      dispatch(addNotification(data));
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
