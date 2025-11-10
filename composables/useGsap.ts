/**
 * GSAP Composable - Lazy Loaded
 *
 * Use this instead of the global plugin to reduce initial bundle size.
 * Only pages that need GSAP animations should import this.
 *
 * Usage:
 * ```typescript
 * import { useGsap } from '~/composables/useGsap'
 *
 * const { gsap, ScrollTrigger, isLoaded } = await useGsap()
 * ```
 */

import { ref } from "vue";

const gsapInstance = ref<any>(null);
const ScrollTriggerInstance = ref<any>(null);
const isLoading = ref(false);
const isLoaded = ref(false);

export const useGsap = async () => {
  // Return cached instance if already loaded
  if (isLoaded.value && gsapInstance.value) {
    return {
      gsap: gsapInstance.value,
      ScrollTrigger: ScrollTriggerInstance.value,
      isLoaded: isLoaded.value,
    };
  }

  // Prevent multiple simultaneous loads
  if (isLoading.value) {
    // Wait for loading to complete
    await new Promise<void>((resolve) => {
      const checkInterval = setInterval(() => {
        if (isLoaded.value) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 50);
    });

    return {
      gsap: gsapInstance.value,
      ScrollTrigger: ScrollTriggerInstance.value,
      isLoaded: isLoaded.value,
    };
  }

  // Load GSAP dynamically
  try {
    isLoading.value = true;

    // Dynamic imports - only loaded when needed
    const [gsapModule, scrollTriggerModule] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]);

    gsapInstance.value = gsapModule.default || gsapModule;
    ScrollTriggerInstance.value =
      scrollTriggerModule.default || scrollTriggerModule;

    // Register ScrollTrigger plugin
    if (gsapInstance.value && ScrollTriggerInstance.value) {
      gsapInstance.value.registerPlugin(ScrollTriggerInstance.value);
    }

    isLoaded.value = true;
  } catch (error) {
    console.error("Failed to load GSAP:", error);
    isLoaded.value = false;
  } finally {
    isLoading.value = false;
  }

  return {
    gsap: gsapInstance.value,
    ScrollTrigger: ScrollTriggerInstance.value,
    isLoaded: isLoaded.value,
  };
};

/**
 * Preload GSAP without using it immediately
 * Useful for loading GSAP in the background while user reads content
 */
export const preloadGsap = () => {
  if (!isLoaded.value && !isLoading.value) {
    useGsap().catch(console.error);
  }
};
