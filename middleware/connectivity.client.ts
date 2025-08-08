export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip connectivity check for offline page
  if (to.path === "/offline") {
    return;
  }

  // Only run on client side
  if (process.client) {
    const { checkConnectivity } = useConnectivity();

    try {
      const isConnected = await checkConnectivity();

      if (!isConnected) {
        return navigateTo("/offline");
      }
    } catch (error) {
      console.error("Connectivity check failed:", error);
      return navigateTo("/offline");
    }
  }
});
