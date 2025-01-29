import { UUID } from "crypto";

export interface App {
  auth: {
    isLoading: boolean;
  };
  notifications: NotificationState;
  settings: {
    notification: boolean;
    sidebar: boolean;
  };
}

export type User = {
  token?: string | any;
  user?: any;
  userType?: "admin" | "mentor" | "trainee" | null;
};

export interface Notification {
  created_at: string;
  id: string | UUID;
  message: string;
  read: boolean;
  recipient: string | UUID;
  sender: string | UUID;
  title: string;
  type: "success" | "error" | "info" | "warning";
}

export interface NotificationState {
  items: Notification[];
  unreadCount: number;
  isConnected: boolean;
  error: string | null;
  isLoading: boolean;
}
