"use server";

import axios from "axios";

import { apiConfig } from "@/config/api";

export const fetchMentors = async (): Promise<any> => {
  try {
    const response = await axios.get<any>(`${apiConfig.url}user/mentor/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    return { error: "Failed to fetch mentors" };
  }
};
