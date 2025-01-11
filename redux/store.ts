// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";

import appReducer from "@/redux/slice/app";
import userReducer from "@/redux/slice/user";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
