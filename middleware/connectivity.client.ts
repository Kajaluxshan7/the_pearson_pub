export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip connectivity check for offline page only
  if (to.path === "/offline") {
    return;
  }

  // Only run on client side
  if (process.client) {
    const { checkConnectivity } = useConnectivity();

    // Don't block hydration - check connectivity in background after a small delay
    setTimeout(async () => {
      try {
        // Non-blocking connectivity check - happens after page loads
        const isConnected = await checkConnectivity();

        // Only redirect to offline if we're certain the backend is unreachable
        // and this is not a page reload/refresh
        if (!isConnected && from && from.fullPath !== to.fullPath) {
          console.log("Redirecting to offline page due to connectivity issues");
          navigateTo("/offline");
        }
      } catch (error) {
        console.error("Connectivity check failed:", error);
        // Don't redirect to offline on error, let the page load normally
        // The page can handle missing data gracefully
      }
    }, 300); // 300ms delay to allow hydration to complete first
  }
});
