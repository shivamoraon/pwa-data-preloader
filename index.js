const fetchAndStoreData = require("./fetchData");

const pwaPreloadData = async (endpoints) => {
  await fetchAndStoreData(endpoints);
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register(
        "/src-pwa/custom-service-worker.js"
      );
      console.log("Service Worker registered");
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
};

module.exports = pwaPreloadData;
