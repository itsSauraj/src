"use client";

import { combineReducers } from "@reduxjs/toolkit";

import appReducer from "@/redux/slice/app";
import userReducer from "@/redux/slice/user";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
});

export default rootReducer;
