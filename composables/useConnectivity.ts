import { ref, computed } from "vue";

export interface ConnectivityStatus {
  isOnline: boolean;
  backendReachable: boolean;
  lastChecked: Date | null;
  checkingBackend: boolean;
  retryCount: number;
  maxRetries: number;
}

export const useConnectivity = () => {
  const status = ref<ConnectivityStatus>({
    isOnline: true,
    backendReachable: false,
    lastChecked: null,
    checkingBackend: false,
    retryCount: 0,
    maxRetries: 3,
  });

  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl as string;

  // Simple online/offline detection
  const updateOnlineStatus = () => {
    if (process.client) {
      status.value.isOnline = navigator.onLine;
    }
  };

  // Check if backend API is reachable
  const checkBackendHealth = async (timeout = 5000): Promise<boolean> => {
    if (!status.value.isOnline) {
      return false;
    }

    status.value.checkingBackend = true;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // Try to reach the backend health endpoint
      const response = await fetch(`${apiBaseUrl}/health`, {
        method: "GET",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      });

      clearTimeout(timeoutId);

      const isReachable = response.ok;
      status.value.backendReachable = isReachable;
      status.value.lastChecked = new Date();

      if (isReachable) {
        status.value.retryCount = 0; // Reset retry count on success
      }

      return isReachable;
    } catch (error) {
      console.warn("Backend health check failed:", error);
      status.value.backendReachable = false;
      status.value.lastChecked = new Date();
      return false;
    } finally {
      status.value.checkingBackend = false;
    }
  };

  // Alternative backend check using any API endpoint
  const checkBackendAlternative = async (timeout = 5000): Promise<boolean> => {
    if (!status.value.isOnline) {
      return false;
    }

    status.value.checkingBackend = true;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // Try to reach the public API endpoint
      const response = await fetch(`${apiBaseUrl}/public-api/landing-content`, {
        method: "GET",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      });

      clearTimeout(timeoutId);

      const isReachable = response.ok || response.status === 404; // 404 is still reachable
      status.value.backendReachable = isReachable;
      status.value.lastChecked = new Date();

      if (isReachable) {
        status.value.retryCount = 0;
      }

      return isReachable;
    } catch (error) {
      console.warn("Backend alternative check failed:", error);
      status.value.backendReachable = false;
      status.value.lastChecked = new Date();
      return false;
    } finally {
      status.value.checkingBackend = false;
    }
  };

  // Comprehensive connectivity check
  const checkConnectivity = async (retryOnFail = true): Promise<boolean> => {
    updateOnlineStatus();

    if (!status.value.isOnline) {
      status.value.backendReachable = false;
      return false;
    }

    // Try health endpoint first, then fallback to API endpoint
    let isReachable = await checkBackendHealth(3000);

    if (!isReachable) {
      isReachable = await checkBackendAlternative(3000);
    }

    // Retry logic
    if (
      !isReachable &&
      retryOnFail &&
      status.value.retryCount < status.value.maxRetries
    ) {
      status.value.retryCount++;
      console.log(
        `Backend unreachable, retry ${status.value.retryCount}/${status.value.maxRetries}`
      );

      // Wait before retry (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * status.value.retryCount)
      );

      return await checkConnectivity(false); // Don't retry recursively
    }

    return isReachable;
  };

  // Quick check without retries
  const quickConnectivityCheck = async (): Promise<boolean> => {
    updateOnlineStatus();

    if (!status.value.isOnline) {
      return false;
    }

    return await checkBackendAlternative(2000);
  };

  // Setup online/offline event listeners
  const setupEventListeners = () => {
    if (process.client) {
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);

      // Initial check
      updateOnlineStatus();
    }
  };

  // Cleanup event listeners
  const cleanup = () => {
    if (process.client) {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    }
  };

  // Computed properties
  const canUseBackend = computed(
    () => status.value.isOnline && status.value.backendReachable
  );
  const shouldShowFallback = computed(
    () => !status.value.isOnline || !status.value.backendReachable
  );
  const connectionQuality = computed(() => {
    if (!status.value.isOnline) return "offline";
    if (!status.value.backendReachable) return "limited";
    return "good";
  });

  return {
    status: readonly(status),
    canUseBackend,
    shouldShowFallback,
    connectionQuality,
    checkConnectivity,
    quickConnectivityCheck,
    checkBackendHealth,
    setupEventListeners,
    cleanup,
  };
};
