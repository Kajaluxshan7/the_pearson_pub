<template>
  <div
    ref="containerRef"
    class="optimized-image-container relative overflow-hidden"
    :class="containerClasses"
    :style="containerStyles"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Loading Placeholder -->
    <div
      v-if="!imageLoaded || loading"
      class="image-placeholder absolute inset-0 flex items-center justify-center"
      :class="placeholderClasses"
    >
      <div class="placeholder-content">
        <!-- Skeleton Animation -->
        <div
          v-if="!error && showSkeleton"
          class="skeleton-animation w-full h-full relative overflow-hidden"
        >
          <div
            class="skeleton-base absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
          ></div>
          <div
            class="skeleton-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10 -translate-x-full animate-shimmer"
          ></div>
        </div>

        <!-- Loading Spinner -->
        <div v-else-if="!error && showSpinner" class="loading-spinner">
          <div
            class="spinner-ring w-12 h-12 border-4 border-gray-300 border-t-yellow-500 rounded-full animate-spin"
          ></div>
          <p
            v-if="loadingText"
            class="mt-3 text-sm text-gray-500 dark:text-gray-400"
          >
            {{ loadingText }}
          </p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state text-center p-6">
          <UIcon
            name="i-heroicons-photo"
            class="w-16 h-16 text-gray-400 mx-auto mb-3"
          />
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {{ errorMessage || "Failed to load image" }}
          </p>
          <button
            v-if="allowRetry"
            @click="retryLoad"
            class="retry-btn px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-lg transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    </div>

    <!-- Main Image -->
    <Transition
      enter-active-class="transition-all duration-700 ease-out"
      enter-from-class="opacity-0 scale-105"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <img
        v-show="imageLoaded && !error"
        ref="imageRef"
        :src="optimizedSrc"
        :alt="alt"
        :class="imageClasses"
        :style="imageStyles"
        :loading="lazyLoading ? 'lazy' : 'eager'"
        :decoding="asyncDecoding ? 'async' : 'sync'"
        @load="handleImageLoad"
        @error="handleImageError"
        @click="handleImageClick"
      />
    </Transition>

    <!-- Overlay Effects -->
    <div
      v-if="showOverlay"
      class="image-overlay absolute inset-0 pointer-events-none"
    >
      <!-- Hover Overlay -->
      <div
        class="hover-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300"
        :class="{ 'opacity-100': isHovered && hoverEffect }"
      ></div>

      <!-- Zoom Indicator -->
      <div
        v-if="zoomable && isHovered"
        class="zoom-indicator absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 transition-opacity duration-300"
        :class="{ 'opacity-100': isHovered }"
      >
        <UIcon
          name="i-heroicons-magnifying-glass-plus"
          class="w-4 h-4 text-white"
        />
      </div>

      <!-- Caption -->
      <div
        v-if="caption && isHovered"
        class="image-caption absolute bottom-4 left-4 right-4 text-white text-sm bg-black/50 rounded-lg p-3 backdrop-blur-sm opacity-0 transition-opacity duration-300"
        :class="{ 'opacity-100': isHovered }"
      >
        {{ caption }}
      </div>
    </div>

    <!-- Progress Bar for Loading -->
    <div
      v-if="showProgress && loading"
      class="progress-bar absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden"
    >
      <div
        class="progress-fill h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300"
        :style="{ width: `${loadingProgress}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { use3DAnimations } from "~/composables/use3DAnimations";
import { usePerformance } from "~/composables/usePerformance";

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none";
  quality?: number;
  format?: "webp" | "avif" | "png" | "jpg" | "auto";
  sizes?: string;
  lazyLoading?: boolean;
  asyncDecoding?: boolean;
  zoomable?: boolean;
  hoverEffect?: boolean;
  showSkeleton?: boolean;
  showSpinner?: boolean;
  showProgress?: boolean;
  showOverlay?: boolean;
  allowRetry?: boolean;
  retryAttempts?: number;
  loadingText?: string;
  errorMessage?: string;
  caption?: string;
  borderRadius?: string;
  shadow?: boolean;
  blur?: number;
  grayscale?: boolean;
  sepia?: boolean;
  brightness?: number;
  contrast?: number;
  saturate?: number;
  customClass?: string;
}

const props = withDefaults(defineProps<OptimizedImageProps>(), {
  objectFit: "cover",
  quality: 80,
  format: "auto",
  lazyLoading: true,
  asyncDecoding: true,
  zoomable: false,
  hoverEffect: true,
  showSkeleton: true,
  showSpinner: false,
  showProgress: false,
  showOverlay: true,
  allowRetry: true,
  retryAttempts: 3,
  borderRadius: "0.5rem",
  shadow: false,
  blur: 0,
  grayscale: false,
  sepia: false,
  brightness: 100,
  contrast: 100,
  saturate: 100,
});

const emit = defineEmits<{
  load: [event: Event];
  error: [event: Event];
  click: [event: MouseEvent];
  retry: [attempt: number];
}>();

// Refs
const containerRef = ref<HTMLElement>();
const imageRef = ref<HTMLImageElement>();
const imageLoaded = ref(false);
const loading = ref(true);
const error = ref(false);
const isHovered = ref(false);
const loadingProgress = ref(0);
const retryCount = ref(0);

// Composables
const { preloadImage, optimizeResource } = usePerformance();
const { addFloatingElement, createGSAPAnimation } = use3DAnimations();

// Computed Properties
const optimizedSrc = computed(() => {
  let url = props.src;

  // Add format parameter if supported
  if (props.format !== "auto") {
    url += url.includes("?") ? "&" : "?";
    url += `format=${props.format}`;
  }

  // Add quality parameter
  if (props.quality !== 80) {
    url += url.includes("?") ? "&" : "?";
    url += `quality=${props.quality}`;
  }

  // Add width/height if specified
  if (props.width) {
    url += url.includes("?") ? "&" : "?";
    url += `w=${props.width}`;
  }
  if (props.height) {
    url += url.includes("?") ? "&" : "?";
    url += `h=${props.height}`;
  }

  return url;
});

const containerClasses = computed(() => [
  "group",
  props.customClass,
  {
    "cursor-pointer": props.zoomable,
    "shadow-lg hover:shadow-xl transition-shadow duration-300": props.shadow,
  },
]);

const containerStyles = computed(() => ({
  width: typeof props.width === "number" ? `${props.width}px` : props.width,
  height: typeof props.height === "number" ? `${props.height}px` : props.height,
  aspectRatio: props.aspectRatio,
  borderRadius: props.borderRadius,
}));

const imageClasses = computed(() => [
  "w-full h-full transition-all duration-500",
  `object-${props.objectFit}`,
  {
    "transform group-hover:scale-110": props.hoverEffect && !props.zoomable,
    "cursor-zoom-in": props.zoomable,
    filter:
      props.blur > 0 ||
      props.grayscale ||
      props.sepia ||
      props.brightness !== 100 ||
      props.contrast !== 100 ||
      props.saturate !== 100,
  },
]);

const imageStyles = computed(() => {
  const filters = [];

  if (props.blur > 0) filters.push(`blur(${props.blur}px)`);
  if (props.grayscale) filters.push("grayscale(100%)");
  if (props.sepia) filters.push("sepia(100%)");
  if (props.brightness !== 100)
    filters.push(`brightness(${props.brightness}%)`);
  if (props.contrast !== 100) filters.push(`contrast(${props.contrast}%)`);
  if (props.saturate !== 100) filters.push(`saturate(${props.saturate}%)`);

  return {
    filter: filters.length > 0 ? filters.join(" ") : undefined,
    borderRadius: props.borderRadius,
  };
});

const placeholderClasses = computed(() => [
  "bg-gray-100 dark:bg-gray-800",
  {
    "animate-pulse": props.showSkeleton,
  },
]);

// Methods
const handleImageLoad = (event: Event) => {
  imageLoaded.value = true;
  loading.value = false;
  error.value = false;
  loadingProgress.value = 100;

  emit("load", event);

  // Add floating animation if enabled
  nextTick(() => {
    if (imageRef.value && props.hoverEffect) {
      addFloatingElement(imageRef.value, {
        amplitude: 2,
        speed: 0.01,
        direction: "y",
      });
    }
  });
};

const handleImageError = (event: Event) => {
  error.value = true;
  loading.value = false;
  imageLoaded.value = false;

  emit("error", event);
};

const handleImageClick = (event: MouseEvent) => {
  emit("click", event);

  if (props.zoomable && imageRef.value) {
    // Create zoom animation
    createGSAPAnimation(imageRef.value, {
      animation: "zoom",
      duration: 0.3,
    });
  }
};

const handleMouseEnter = () => {
  isHovered.value = true;
};

const handleMouseLeave = () => {
  isHovered.value = false;
};

const retryLoad = () => {
  if (retryCount.value < props.retryAttempts) {
    retryCount.value++;
    error.value = false;
    loading.value = true;
    loadingProgress.value = 0;

    emit("retry", retryCount.value);

    // Force image reload
    if (imageRef.value) {
      imageRef.value.src = "";
      setTimeout(() => {
        if (imageRef.value) {
          imageRef.value.src = optimizedSrc.value;
        }
      }, 100);
    }
  }
};

const simulateProgress = () => {
  if (props.showProgress && loading.value) {
    const interval = setInterval(() => {
      if (loadingProgress.value < 90 && loading.value) {
        loadingProgress.value += Math.random() * 20;
      } else {
        clearInterval(interval);
      }
    }, 200);
  }
};

// Watchers
watch(
  () => props.src,
  () => {
    imageLoaded.value = false;
    loading.value = true;
    error.value = false;
    loadingProgress.value = 0;
    retryCount.value = 0;

    simulateProgress();
  },
  { immediate: true }
);

// Lifecycle
onMounted(() => {
  simulateProgress();

  // Preload image for better performance
  if (props.src && !props.lazyLoading) {
    preloadImage(props.src);
  }

  // Set up intersection observer for lazy loading
  if (props.lazyLoading && containerRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            preloadImage(props.src);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.value);

    onUnmounted(() => {
      observer.disconnect();
    });
  }
});
</script>

<style scoped>
.optimized-image-container {
  position: relative;
  background-color: #f3f4f6;
  background-image: radial-gradient(
      circle at 25% 25%,
      #e5e7eb 2px,
      transparent 2px
    ),
    radial-gradient(circle at 75% 75%, #e5e7eb 2px, transparent 2px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}

.dark .optimized-image-container {
  background-color: #374151;
  background-image: radial-gradient(
      circle at 25% 25%,
      #4b5563 2px,
      transparent 2px
    ),
    radial-gradient(circle at 75% 75%, #4b5563 2px, transparent 2px);
}

/* Skeleton Animation */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Loading Spinner */
.spinner-ring {
  animation: ring-spin 1s linear infinite;
}

@keyframes ring-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Image Hover Effects */
.optimized-image-container:hover img {
  transform: scale(1.05);
}

.optimized-image-container.zoomable:hover img {
  transform: scale(1.1);
}

/* Overlay Animations */
.hover-overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 40%,
    transparent 70%
  );
}

/* Progress Bar */
.progress-fill {
  background: linear-gradient(90deg, #fbbf24, #f59e0b, #d97706);
  background-size: 200% 100%;
  animation: progressGlow 2s ease-in-out infinite;
}

@keyframes progressGlow {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Error State Animations */
.error-state {
  animation: errorFadeIn 0.5s ease-out;
}

@keyframes errorFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Retry Button Hover */
.retry-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .optimized-image-container img,
  .hover-overlay,
  .progress-fill {
    transition: none !important;
    animation: none !important;
  }
}

/* Print Styles */
@media print {
  .image-overlay,
  .progress-bar,
  .zoom-indicator {
    display: none !important;
  }
}
</style>
