export interface App {
  auth: {
    isLoading: boolean;
  };
}

export type User = {
  token?: string;
  user?: string;
};

export type ReduxStore = {
  app: App;
  user: User;
};
