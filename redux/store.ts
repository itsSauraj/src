"use client";

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { REGISTER } from "redux-persist/es/constants";

import rootReducer from "./rootReducer";

import { customStorage } from "@/redux/customStorage";

const persistConfig = {
  key: "root",
  storage: customStorage,
  blacklist: ["app.user.isloading"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

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
