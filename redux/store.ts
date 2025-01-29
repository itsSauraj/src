"use client";

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import { REGISTER } from "redux-persist/es/constants";

import rootReducer from "./rootReducer";

import { customStorage } from "@/redux/customStorage";

const filterTransform = createTransform(
  (inboundState: { user?: { isloading?: boolean }; notifications?: any }) => {
    const newState =
      inboundState && typeof inboundState === "object"
        ? { ...inboundState }
        : {};

    if (newState.user) {
      delete newState.user.isloading;
      if (newState.notifications) {
        return undefined;
      }
    }

    return newState;
  },
  null,
  { whitelist: ["app"] },
);

const persistConfig = {
  key: "root",
  storage: customStorage,
  transforms: [filterTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REGISTER, "persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
