import { ref, readonly } from "vue";

// Track if this is the user's first visit to the site in this session
const isFirstVisit = ref(true);
const hasShownInitialLoading = ref(false);
const pageLoadCount = ref(0);

export const useFirstVisit = () => {
  const checkFirstVisit = (): boolean => {
    if (process.client) {
      // Check sessionStorage for this browser session
      const hasVisited = sessionStorage.getItem("pearson-pub-visited");
      const visitCount = parseInt(
        sessionStorage.getItem("pearson-pub-visit-count") || "0"
      );

      if (!hasVisited) {
        // Mark as visited for this session
        sessionStorage.setItem("pearson-pub-visited", "true");
        sessionStorage.setItem("pearson-pub-visit-count", "1");
        isFirstVisit.value = true;
        pageLoadCount.value = 1;
        return true;
      } else {
        // Increment visit count but don't show loading after first visit
        const newCount = visitCount + 1;
        sessionStorage.setItem("pearson-pub-visit-count", newCount.toString());
        pageLoadCount.value = newCount;
        isFirstVisit.value = false;
        return false;
      }
    }
    return false;
  };

  const shouldShowLoading = (): boolean => {
    // Show loading on first visit or on hard navigation (reload / initial navigation)
    try {
      const first = checkFirstVisit();

      // Detect navigation type: 'reload' or 'navigate' should show loader
      let navType = null as string | null;
      try {
        const navEntries =
          performance && performance.getEntriesByType
            ? (performance.getEntriesByType(
                "navigation"
              ) as PerformanceNavigationTiming[])
            : ([] as PerformanceNavigationTiming[]);
        if (navEntries && navEntries.length > 0) {
          navType = navEntries[0].type;
        } else if ((performance as any).navigation) {
          // fallback for older browsers
          const pnav = (performance as any).navigation;
          navType =
            pnav.type === 1 ? "reload" : pnav.type === 0 ? "navigate" : "other";
        }
      } catch (e) {
        navType = null;
      }

      const isHardNav = navType === "reload" || navType === "navigate";

      // Show loader if first visit and not yet shown OR if this was a hard navigation (reload/initial)
      return (!hasShownInitialLoading.value && first) || isHardNav;
    } catch (e) {
      return false;
    }
  };

  const markLoadingShown = () => {
    hasShownInitialLoading.value = true;
  };

  const resetFirstVisit = () => {
    if (process.client) {
      sessionStorage.removeItem("pearson-pub-visited");
      sessionStorage.removeItem("pearson-pub-visit-count");
      isFirstVisit.value = true;
      hasShownInitialLoading.value = false;
      pageLoadCount.value = 0;
    }
  };

  const getVisitCount = (): number => {
    if (process.client) {
      return parseInt(sessionStorage.getItem("pearson-pub-visit-count") || "0");
    }
    return 0;
  };

  return {
    isFirstVisit: readonly(isFirstVisit),
    pageLoadCount: readonly(pageLoadCount),
    checkFirstVisit,
    shouldShowLoading,
    markLoadingShown,
    resetFirstVisit,
    getVisitCount,
  };
};
