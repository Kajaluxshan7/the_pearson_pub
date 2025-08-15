export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client side
  if (process.client) {
    // Handle router navigation to prevent warnings for dev server routes
    nuxtApp.vueApp.config.warnHandler = (
      msg: string,
      instance: any,
      trace: string
    ) => {
      // Suppress Vue Router warnings for development server routes
      if (
        msg.includes("[Vue Router warn]") &&
        (msg.includes("/@vite/client") ||
          msg.includes("/src/main.tsx") ||
          msg.includes("/@react-refresh") ||
          msg.includes("/site.webmanifest") ||
          msg.includes("/sw.js") ||
          msg.includes("/fonts/"))
      ) {
        return; // Suppress these warnings
      }

      // Log other warnings normally in development
      if (process.dev) {
        console.warn(msg, trace);
      }
    };

    // Handle service worker and manifest routes gracefully
    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      let url: string;

      if (typeof input === "string") {
        url = input;
      } else if (input instanceof URL) {
        url = input.href;
      } else {
        url = input.url;
      }

      // Handle problematic requests gracefully
      if (
        url.includes("sw.js") ||
        url.includes("site.webmanifest") ||
        url.includes("/fonts/cinzel-v23-latin-regular.woff2")
      ) {
        // Return empty response for these requests to prevent errors
        return new Response("", { status: 404, statusText: "Not Found" });
      }

      return originalFetch(input, init);
    };
  }
});
