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
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  timestamp: string;
  read: boolean;
}

export interface NotificationState {
  items: Notification[];
  unreadCount: number;
  isConnected: boolean;
  error: string | null;
  isLoading: boolean;
}
