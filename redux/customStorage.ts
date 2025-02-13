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
    /**
     * Retrieves an item from localStorage.
     * @param {string} key - The key of the item to retrieve.
     * @returns {Promise<string | null>} - A promise that resolves to the retrieved item.
     */
    getItem(key: string) {
      return Promise.resolve(localStorage.getItem(key));
    },
    /**
     * Sets an item in localStorage.
     * @param {string} key - The key of the item to set.
     * @param {any} value - The value of the item to set.
     * @returns {Promise<any>} - A promise that resolves to the set value.
     */
    setItem(key: string, value: any) {
      localStorage.setItem(key, value);

      return Promise.resolve(value);
    },
    /**
     * Removes an item from localStorage.
     * @param {string} key - The key of the item to remove.
     * @returns {Promise<void>} - A promise that resolves when the item is removed.
     */
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
