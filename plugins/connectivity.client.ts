import { useConnectivity } from "@/composables/useConnectivity";

export default defineNuxtPlugin(() => {
  const router = useRouter();
  const { checkConnectivity } = useConnectivity();

  // Global navigation guard for connectivity
  router.beforeEach(async (to, from, next) => {
    // Skip connectivity check for offline page
    if (to.path === "/offline") {
      return next();
    }

    // Run a single connectivity check
    try {
      const isConnected = await checkConnectivity();

      if (!isConnected) {
        // Redirect to offline page if backend is not reachable
        return next("/offline");
      }

      // Continue to the requested route if connected
      next();
    } catch (error) {
      console.error("Connectivity check failed:", error);
      // On error, redirect to offline page
      return next("/offline");
    }
  });
});
