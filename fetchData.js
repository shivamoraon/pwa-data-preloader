const axios = require("axios");
const { openDB } = required("idb");
require("dotenv").config();

const api = axios.create({
  baseURL: process.env.API_URL,
});

const defaultStorageMethod = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const fetchAndStoreData = async (
  endpoints,
  storageMethod = defaultStorageMethod
) => {
  const db = await openDB("pwa-cache", 1, {
    upgrade(db) {
      db.createObjectStore("dataStore");
    },
  });

  for (const endpoint of endpoints) {
    try {
      const response = await api.get(endpoint);
      const data = response.data;

      await db.put("dataStore", data, endpoint);
      storageMethod(endpoint, data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  }
};

module.exports = fetchAndStoreData;
