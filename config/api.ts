export type ApiConfig = typeof apiConfig;

export const apiConfig = {
  url: process.env.BACKEND_APP_API_URL || "http://localhost:3000",
};
