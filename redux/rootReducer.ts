"use client";

import { combineReducers } from "@reduxjs/toolkit";

import appReducer from "@/redux/slice/app";
import userReducer from "@/redux/slice/user";
import memberReducer from "@/redux/slice/members";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  members: memberReducer,
});

export default rootReducer;
