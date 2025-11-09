export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client side in development
  if (process.client && process.dev) {
    // Minimal warning handler - only suppress very specific noisy warnings
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      const message = args[0]?.toString() || "";

      // Suppress only Vue Router warnings about missing named routes
      if (
        message.includes("[Vue Router warn]") &&
        (message.includes("No match found") || message.includes("named route"))
      ) {
        return;
      }

      // Log all other warnings normally
      originalWarn.apply(console, args);
    };

    // NOTE: Fetch override removed - it was causing 404/503 errors
    // All resources now load naturally through the browser/dev server
  }
});
