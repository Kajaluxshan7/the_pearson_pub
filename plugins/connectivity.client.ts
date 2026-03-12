import { useConnectivity } from '@/composables/useConnectivity'

export default defineNuxtPlugin(() => {
  const router = useRouter()
  const { checkConnectivity } = useConnectivity()

  // Global navigation guard for connectivity.
  // Perform a fast check (with fallback on slow responses) and avoid blocking navigation for > 2s.
  router.beforeEach(async (to, from) => {
    // Skip connectivity check for offline page
    if (to.path === '/offline') {
      return true
    }

    try {
      const checkPromise = checkConnectivity()
      // If connectivity check takes too long, continue navigation and let the page decide
      const isConnected = await Promise.race([
        checkPromise,
        new Promise<boolean>(resolve => setTimeout(() => resolve(true), 2000))
      ])

      if (!isConnected) {
        if (process.dev) {
          console.warn('Connectivity: backend unreachable, redirecting to /offline')
        }
        return '/offline'
      }
      return true
    } catch (error) {
      if (process.dev) {
        console.error('Connectivity check failed:', error)
      }
      // Fall back to navigation; offline page will handle itself if necessary
      return true
    }
  })
})
