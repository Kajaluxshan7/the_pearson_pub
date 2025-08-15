export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip connectivity check for specific routes
  if (
    to.path === "/offline" ||
    to.path?.startsWith("/@vite") ||
    to.path?.startsWith("/src/") ||
    to.path?.includes("@react-refresh") ||
    to.path?.includes("site.webmanifest") ||
    to.path?.includes("sw.js") ||
    to.path?.includes("/fonts/")
  ) {
    return;
  }

  // Only run on client side
  if (process.client) {
    const { checkConnectivity } = useConnectivity();

    try {
      // Do a quick check only - don't block page loading on reload
      const isConnected = await checkConnectivity();

      // Only redirect to offline if we're certain the backend is unreachable
      // and this is not a page reload/refresh
      if (!isConnected && from && from.fullPath !== to.fullPath) {
        console.log("Redirecting to offline page due to connectivity issues");
        return navigateTo("/offline");
      }
    } catch (error) {
      console.error("Connectivity check failed:", error);
      // Don't redirect to offline on error, let the page load normally
      // The page can handle missing data gracefully
    }
  }
});
