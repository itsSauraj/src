"use client";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const createAsyncLocalStorage = () => {
  return {
    getItem(key: string) {
      return Promise.resolve(localStorage.getItem(key));
    },
    setItem(key: string, value: any) {
      localStorage.setItem(key, value);

      return Promise.resolve(value);
    },
    removeItem(key: string) {
      localStorage.removeItem(key);

      return Promise.resolve();
    },
  };
};

export const customStorage =
  typeof window !== "undefined"
    ? createAsyncLocalStorage()
    : createNoopStorage();
