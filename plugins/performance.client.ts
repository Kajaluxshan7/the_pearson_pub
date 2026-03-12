export default defineNuxtPlugin(() => {
  if (process.client) {
    // Improve page reload behavior
    const handlePageReload = () => {
      // NOTE: Avoid clearing the entire service worker cache or nuxt caches unless
      // a specific problem is detected — this can be detrimental to PWA/Offline UX.
      // Only clear app-related keys in development when a particular error is observed.
      if (process.dev && 'caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            // Limit to development-only caches and those that match local dev identifiers
            if (name.includes('nuxt') || name.includes('dev')) {
              caches.delete(name)
            }
          })
        })
      }

      // Clear session storage for connectivity states on page reload only if it affects UX
      const navigationEntries = performance.getEntriesByType('navigation')
      const nav = navigationEntries?.[0] as PerformanceNavigationTiming | undefined
      if (nav?.type === 'reload') {
        if (process.dev) {
          console.log('Page reload detected, clearing dev session state')
        }
        sessionStorage.removeItem('pearson-pub-visited')
        sessionStorage.removeItem('background-data-loaded')
      }
    }

    // Handle page visibility changes (tab switching)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        if (process.dev) {
          console.log('Page became visible')
        }
        // Optional: refresh data if page was hidden for too long
      }
    })

    // Initialize on load
    handlePageReload()
  }
})
