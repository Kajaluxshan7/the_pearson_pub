export default defineNuxtPlugin(() => {
  // Handle page transitions and loading states
  if (process.client) {
    const router = useRouter();

    // Clear problematic session storage on app start
    if (typeof window !== "undefined") {
      // Don't clear visit tracking, but ensure proper state
      const currentVisit = sessionStorage.getItem("pearson-pub-visited");
      if (!currentVisit) {
        console.log("First visit detected");
      }
    }

    // Add loading state management
    router.beforeEach((to, from, next) => {
      // Don't show loading for same page navigation
      if (to.path === from.path) {
        next();
        return;
      }

      console.log(`Navigating from ${from.path} to ${to.path}`);
      next();
    });

    router.afterEach((to, from) => {
      // Ensure page is ready after navigation
      if (to.path !== from.path) {
        console.log(`Navigation completed to ${to.path}`);
      }
    });

    // Handle page reload/refresh
    window.addEventListener("beforeunload", () => {
      console.log("Page unloading");
    });

    // Handle back/forward navigation
    window.addEventListener("popstate", () => {
      console.log("Browser navigation detected");
    });
  }
});
