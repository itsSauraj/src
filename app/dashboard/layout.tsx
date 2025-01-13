"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { SideBar } from "@/components/dashboard";
import { StoreDispatch } from "@/redux/store";
import { validateToken } from "@/redux/slice/user";
import { ReduxStore } from "@/types/redux";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<StoreDispatch>();
  const user = useSelector((state: ReduxStore) => state.user);

  useEffect(() => {
    if (!user.token) {
      router.push("/auth/login");
    }

    dispatch(validateToken(user.token));
  }, []);

  useEffect(() => {
    if (!user.token) {
      router.push("/auth/login");
    }
  }, [user.token]);

  return <SideBar />;
}
