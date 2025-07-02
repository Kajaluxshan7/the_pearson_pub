import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  memoryUsage: number;
  fps: number;
  resourcesLoaded: number;
  totalResources: number;
}

interface LazyLoadConfig {
  threshold: number;
  rootMargin: string;
  enablePlaceholder: boolean;
  enableBlur: boolean;
  quality: number;
}

interface CacheConfig {
  maxAge: number;
  maxSize: number;
  strategy: "lru" | "fifo";
}

export const usePerformance = () => {
  const metrics = ref<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0,
    memoryUsage: 0,
    fps: 0,
    resourcesLoaded: 0,
    totalResources: 0,
  });

  const isLazyLoading = ref(false);
  const observer = ref<IntersectionObserver | null>(null);
  const imageCache = ref<Map<string, string>>(new Map());
  const loadingQueue = ref<string[]>([]);

  let fpsMonitor: number | null = null;
  let lastTime = 0;
  let frameCount = 0;

  // Enhanced debounce with immediate option
  const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate = false
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>) => {
      const callNow = immediate && !timeout;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        if (!immediate) func(...args);
      }, wait);
      if (callNow) func(...args);
    };
  };

  // Enhanced throttle with leading and trailing options
  const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number,
    options: { leading?: boolean; trailing?: boolean } = {}
  ): ((...args: Parameters<T>) => void) => {
    const { leading = true, trailing = true } = options;
    let inThrottle: boolean;
    let lastFunc: NodeJS.Timeout;
    let lastRan: number;

    return (...args: Parameters<T>) => {
      if (!lastRan && leading) {
        func(...args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            if (trailing) func(...args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  // FPS monitoring
  const startFPSMonitoring = () => {
    let frames = 0;
    let startTime = performance.now();

    const countFrame = () => {
      frames++;
      const currentTime = performance.now();

      if (currentTime >= startTime + 1000) {
        metrics.value.fps = Math.round(
          (frames * 1000) / (currentTime - startTime)
        );
        frames = 0;
        startTime = currentTime;
      }

      fpsMonitor = requestAnimationFrame(countFrame);
    };

    fpsMonitor = requestAnimationFrame(countFrame);
  };

  // Advanced resource loading monitoring
  const monitorResourceLoading = () => {
    if (typeof window === "undefined") return;

    const updateResourceMetrics = () => {
      const resources = performance.getEntriesByType("resource");
      metrics.value.totalResources = resources.length;
      metrics.value.resourcesLoaded = resources.filter(
        (r) => r.duration > 0
      ).length;
    };

    // Monitor new resources
    const observer = new PerformanceObserver((list) => {
      updateResourceMetrics();
    });

    observer.observe({ entryTypes: ["resource"] });
    updateResourceMetrics();
  };

  // Enhanced lazy loading with progressive enhancement
  const setupAdvancedLazyLoading = (
    config: LazyLoadConfig = {
      threshold: 0.1,
      rootMargin: "100px",
      enablePlaceholder: true,
      enableBlur: true,
      quality: 75,
    }
  ) => {
    if (typeof window === "undefined") return;

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            loadElementContent(element, config);
            observer.value?.unobserve(element);
          }
        });
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin,
      }
    );
  };

  // Load element content with progressive enhancement
  const loadElementContent = async (
    element: HTMLElement,
    config: LazyLoadConfig
  ) => {
    const src = element.dataset.src;
    if (!src) return;

    element.classList.add("loading");

    try {
      // Check cache first
      if (imageCache.value.has(src)) {
        applyImageSrc(element as HTMLImageElement, imageCache.value.get(src)!);
        return;
      }

      // Create low-quality placeholder if enabled
      if (config.enableBlur && config.enablePlaceholder) {
        const placeholderSrc = await generatePlaceholder(src, 20, 20);
        applyImageSrc(element as HTMLImageElement, placeholderSrc, true);
      }

      // Load high-quality image
      const optimizedSrc = optimizeImageUrl(src, {
        quality: config.quality,
        format: "webp",
      });

      const highQualityImage = await loadImageWithProgress(optimizedSrc);
      imageCache.value.set(src, highQualityImage);
      applyImageSrc(element as HTMLImageElement, highQualityImage);
    } catch (error) {
      console.warn("Failed to load image:", src, error);
      element.classList.add("load-error");
    } finally {
      element.classList.remove("loading");
    }
  };

  // Apply image source with smooth transition
  const applyImageSrc = (
    img: HTMLImageElement,
    src: string,
    isPlaceholder = false
  ) => {
    img.style.transition = "opacity 0.3s ease-in-out, filter 0.3s ease-in-out";

    if (isPlaceholder) {
      img.style.filter = "blur(8px)";
    } else {
      img.style.filter = "none";
      img.classList.add("loaded");
    }

    img.src = src;
  };

  // Generate low-quality placeholder
  const generatePlaceholder = async (
    src: string,
    width: number,
    height: number
  ): Promise<string> => {
    return optimizeImageUrl(src, {
      width,
      height,
      quality: 20,
      format: "webp",
    });
  };

  // Load image with progress tracking
  const loadImageWithProgress = (src: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(src);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Enhanced image optimization
  const optimizeImageUrl = (
    src: string,
    options: {
      width?: number;
      height?: number;
      quality?: number;
      format?: "webp" | "avif" | "jpeg" | "png";
      fit?: "cover" | "contain" | "fill";
    } = {}
  ) => {
    const {
      width,
      height,
      quality = 80,
      format = "webp",
      fit = "cover",
    } = options;

    // If it's already an optimized URL, return as-is
    if (src.includes("/_nuxt/image/")) return src;

    const params = new URLSearchParams();
    if (width) params.append("w", width.toString());
    if (height) params.append("h", height.toString());
    params.append("q", quality.toString());
    params.append("f", format);
    params.append("fit", fit);

    return `/_nuxt/image/${src}?${params.toString()}`;
  };

  // Batch load resources for better performance
  const batchLoadImages = async (sources: string[], batchSize = 3) => {
    const batches = [];
    for (let i = 0; i < sources.length; i += batchSize) {
      batches.push(sources.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      await Promise.all(batch.map((src) => loadImageWithProgress(src)));
    }
  };

  // Critical resource preloading with priority
  const preloadCriticalResources = (
    resources: Array<{
      href: string;
      as: string;
      type?: string;
      priority?: "high" | "low";
    }>
  ) => {
    if (typeof document === "undefined") return;

    resources.forEach(({ href, as, type, priority = "high" }) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      if (priority === "high") link.setAttribute("importance", "high");

      document.head.appendChild(link);
    });
  };
  // Measure Core Web Vitals
  const measureCoreWebVitals = () => {
    if (typeof window === "undefined") return;

    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log("LCP:", lastEntry.startTime);
    }).observe({ type: "largest-contentful-paint", buffered: true });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        console.log("FID:", entry.processingStart - entry.startTime);
      });
    }).observe({ type: "first-input", buffered: true });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log("CLS:", clsValue);
    }).observe({ type: "layout-shift", buffered: true });
  };

  // Memory management
  const cleanupImageCache = (maxSize = 50) => {
    if (imageCache.value.size > maxSize) {
      const entries = Array.from(imageCache.value.entries());
      const toDelete = entries.slice(0, entries.length - maxSize);
      toDelete.forEach(([key]) => imageCache.value.delete(key));
    }
  };

  // Enhanced cleanup
  const cleanup = () => {
    if (observer.value) {
      observer.value.disconnect();
    }

    if (fpsMonitor) {
      cancelAnimationFrame(fpsMonitor);
    }

    imageCache.value.clear();
    loadingQueue.value = [];
  };

  onMounted(() => {
    if (typeof window !== "undefined") {
      measureLoadTime();
      setupAdvancedLazyLoading();
      startFPSMonitoring();
      monitorResourceLoading();
      measureCoreWebVitals();

      // Clean cache periodically
      const cacheCleanupInterval = setInterval(() => {
        cleanupImageCache();
        getMemoryUsage();
      }, 30000); // Every 30 seconds

      onUnmounted(() => {
        clearInterval(cacheCleanupInterval);
        cleanup();
      });
    }
  });

  // Measure page load performance
  const measureLoadTime = () => {
    if (typeof window !== "undefined" && "performance" in window) {
      const perfData = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      metrics.value.loadTime = perfData.loadEventEnd - perfData.loadEventStart;
    }
  };

  // Measure render performance
  const measureRenderTime = async (callback: () => Promise<void> | void) => {
    const start = performance.now();
    await callback();
    await nextTick();
    const end = performance.now();
    metrics.value.renderTime = end - start;
  };

  // Add element to lazy loading
  const lazyLoad = (element: HTMLElement) => {
    if (observer.value) {
      element.classList.add("lazy-loading");
      observer.value.observe(element);
    }
  };

  // Memory usage monitoring
  const getMemoryUsage = () => {
    if (
      typeof window !== "undefined" &&
      "performance" in window &&
      "memory" in performance
    ) {
      const memory = (performance as any).memory;
      metrics.value.memoryUsage = memory.usedJSHeapSize / 1048576; // Convert to MB
    }
  };
  // Legacy compatibility functions
  const createLazyLoader = (element: HTMLElement, callback: () => void) => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            obs.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    obs.observe(element);
    return obs;
  };

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  };

  const preloadImages = async (urls: string[]): Promise<void> => {
    try {
      await Promise.all(urls.map((url) => preloadImage(url)));
    } catch (error) {
      console.warn("Some images failed to preload:", error);
    }
  };

  const measurePerformance = (name: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  };

  const optimizeForMobile = () => {
    return typeof window !== "undefined" && window.innerWidth <= 768;
  };

  const isVisible = ref(false);

  return {
    // New enhanced features
    metrics: computed(() => metrics.value),
    measureRenderTime,
    optimizeImageUrl,
    preloadCriticalResources,
    batchLoadImages,
    getMemoryUsage,
    measureCoreWebVitals,
    cleanupImageCache,
    cleanup,

    // Enhanced existing features
    debounce,
    throttle,
    lazyLoad,
    measureLoadTime,

    // Legacy compatibility
    createLazyLoader,
    preloadImage,
    preloadImages,
    measurePerformance,
    optimizeForMobile,
    isVisible,
  };
};
