"use server";

import axios from "axios";

import { apiConfig } from "@/config/api";

export const fetchMentors = async (): Promise<any> => {
  try {
    const response = await axios.get<any>(`${apiConfig.url}user/mentor/`);

    return response.data;
  } catch (error) {
    return error;
  }
};
