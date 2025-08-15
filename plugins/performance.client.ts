export default defineNuxtPlugin(() => {
  if (process.client) {
    // Improve page reload behavior
    const handlePageReload = () => {
      // Clear any problematic cache that might prevent proper loading
      if ("caches" in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            if (name.includes("nuxt") || name.includes("api")) {
              caches.delete(name);
            }
          });
        });
      }

      // Clear session storage for connectivity states on page reload
      if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        console.log("Page reload detected, clearing session state");
        sessionStorage.removeItem("pearson-pub-visited");
        sessionStorage.removeItem("background-data-loaded");
      }
    };

    // Handle page visibility changes (tab switching)
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        console.log("Page became visible");
        // Optional: refresh data if page was hidden for too long
      }
    });

    // Initialize on load
    handlePageReload();
  }
});
