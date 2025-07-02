import { ref, onMounted, nextTick } from "vue";

interface LoadingState {
  isLoading: boolean;
  progress: number;
  loadingText: string;
  error: string | null;
}

interface LoadingConfig {
  duration?: number;
  showProgress?: boolean;
  enableSkeleton?: boolean;
  customTexts?: string[];
}

export const useAdvancedLoading = (config: LoadingConfig = {}) => {
  const {
    duration = 2000,
    showProgress = true,
    enableSkeleton = true,
    customTexts = [
      "Loading delicious content...",
      "Preparing your experience...",
      "Setting up the atmosphere...",
      "Almost ready...",
    ],
  } = config;

  const loadingState = ref<LoadingState>({
    isLoading: true,
    progress: 0,
    loadingText: customTexts[0] || "Loading...",
    error: null,
  });

  let progressInterval: NodeJS.Timeout | null = null;
  let textInterval: NodeJS.Timeout | null = null;

  // Simulate realistic loading with progress
  const startLoading = () => {
    loadingState.value.isLoading = true;
    loadingState.value.progress = 0;
    loadingState.value.error = null;

    let currentProgress = 0;
    let textIndex = 0;

    // Progress animation
    if (showProgress) {
      progressInterval = setInterval(() => {
        const increment = Math.random() * 15 + 5; // Random increment between 5-20
        currentProgress = Math.min(currentProgress + increment, 95);
        loadingState.value.progress = currentProgress;

        if (currentProgress >= 95) {
          clearInterval(progressInterval!);
          // Final push to 100%
          setTimeout(() => {
            loadingState.value.progress = 100;
            finishLoading();
          }, 200);
        }
      }, 150);
    }

    // Text rotation
    if (customTexts.length > 1) {
      textInterval = setInterval(() => {
        textIndex = (textIndex + 1) % customTexts.length;
        loadingState.value.loadingText = customTexts[textIndex];
      }, duration / customTexts.length);
    }

    // Auto finish if no progress tracking
    if (!showProgress) {
      setTimeout(finishLoading, duration);
    }
  };

  // Finish loading
  const finishLoading = async () => {
    if (progressInterval) clearInterval(progressInterval);
    if (textInterval) clearInterval(textInterval);

    loadingState.value.progress = 100;
    loadingState.value.loadingText = "Ready!";

    await nextTick();

    setTimeout(() => {
      loadingState.value.isLoading = false;
    }, 300);
  };

  // Handle errors
  const setError = (error: string) => {
    loadingState.value.error = error;
    loadingState.value.isLoading = false;
    if (progressInterval) clearInterval(progressInterval);
    if (textInterval) clearInterval(textInterval);
  };

  // Create skeleton elements
  const createSkeletonLoader = (
    count: number = 6,
    type: "card" | "list" | "grid" = "card"
  ) => {
    const skeletons = [];

    for (let i = 0; i < count; i++) {
      skeletons.push({
        id: `skeleton-${i}`,
        type,
        delay: i * 100,
      });
    }

    return skeletons;
  };

  // Loading screen with 3D background
  const LoadingScreen = {
    template: `
      <div 
        v-if="loadingState.isLoading" 
        class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      >
        <!-- 3D Background Container -->
        <div 
          ref="threeContainer" 
          class="absolute inset-0 opacity-30"
        ></div>
        
        <!-- Loading Content -->
        <div class="relative z-10 text-center text-white max-w-md mx-auto px-6">
          <!-- Logo/Brand -->
          <div class="mb-8">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-yellow-400">The Pearson Pub</h1>
          </div>
          
          <!-- Loading Text -->
          <div class="mb-6">
            <p class="text-lg font-medium animate-pulse">{{ loadingState.loadingText }}</p>
          </div>
          
          <!-- Progress Bar (if enabled) -->
          <div v-if="showProgress" class="mb-6">
            <div class="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-300 ease-out"
                :style="{ width: loadingState.progress + '%' }"
              ></div>
            </div>
            <p class="text-sm text-gray-400 mt-2">{{ Math.round(loadingState.progress) }}%</p>
          </div>
          
          <!-- Floating Dots Animation -->
          <div class="flex justify-center space-x-2">
            <div 
              v-for="i in 3" 
              :key="i"
              class="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
              :style="{ animationDelay: (i - 1) * 0.2 + 's' }"
            ></div>
          </div>
          
          <!-- Error Message -->
          <div v-if="loadingState.error" class="mt-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <p class="text-red-200">{{ loadingState.error }}</p>
            <button 
              @click="startLoading" 
              class="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    `,
  };

  // Skeleton component templates
  const SkeletonCard = {
    template: `
      <div class="animate-pulse">
        <div class="bg-gray-300 dark:bg-gray-700 rounded-lg h-48 mb-4"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          <div class="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    `,
  };

  const SkeletonList = {
    template: `
      <div class="animate-pulse flex space-x-4 p-4">
        <div class="bg-gray-300 dark:bg-gray-700 rounded-lg h-16 w-16"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    `,
  };

  // Page transition effects
  const createPageTransition = () => {
    return {
      name: "page-transition",
      css: false,
      mode: "out-in",
      onEnter: (el: HTMLElement, done: Function) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px) scale(0.95)";

        requestAnimationFrame(() => {
          el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";

          setTimeout(done, 600);
        });
      },
      onLeave: (el: HTMLElement, done: Function) => {
        el.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        el.style.opacity = "0";
        el.style.transform = "translateY(-20px) scale(1.05)";

        setTimeout(done, 300);
      },
    };
  };

  // Auto-start loading on mount
  onMounted(() => {
    if (typeof window !== "undefined") {
      startLoading();
    }
  });

  return {
    loadingState: readonly(loadingState),
    startLoading,
    finishLoading,
    setError,
    createSkeletonLoader,
    LoadingScreen,
    SkeletonCard,
    SkeletonList,
    createPageTransition,
  };
};
