"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { SideBar } from "@/components/dashboard";
import { validateToken } from "@/lib/auth/actions";
import { StoreDispatch } from "@/redux/store";
import { setToken } from "@/redux/slice/user";
import { ReduxStore } from "@/types/redux";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<StoreDispatch>();
  const user = useSelector((state: ReduxStore) => state.user);

  useEffect(() => {
    const validate = async () => {
      try {
        const new_token = await validateToken(user.token as string);

        dispatch(setToken(new_token));
        router.push("/");
      } catch (error: any) {
        // TODO: Error Notification
        router.push("/auth/login");
      }
    };

    validate();

    return () => {
      validate;
    };
  }, []);

  useEffect(() => {
    if (user.token) {
      router.push("/");
    }
  }, [user.token]);

  return (
    <>
      <SideBar />
    </>
  );
}
