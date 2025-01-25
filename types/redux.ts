export interface App {
  auth: {
    isLoading: boolean;
  };
  notifications: Array<{
    id: string;
    message: string;
    type: "success" | "error" | "warning  " | "info";
  }>;
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

