import { UUID } from "crypto";

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
};

export type Member = {
  id: UUID;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  address?: string;
  birth_date?: string;
  phone_number?: string;
  joining_date?: string;
  groups?: Array<number | string>;
};
export type Members = Member[];

// export type ReduxStore = {
//   app: App;
//   user: User;
//   member: Member;
//   members: Members;
// };
