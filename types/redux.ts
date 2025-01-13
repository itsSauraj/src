export interface App {
  auth: {
    isLoading: boolean;
  };
}

export type User = {
  token?: string | any;
  user?: string;
};

export type ReduxStore = {
  app: App;
  user: User;
};
