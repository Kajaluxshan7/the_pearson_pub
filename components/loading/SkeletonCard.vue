<template>
  <div
    class="animate-pulse"
    :class="[
      'rounded-lg overflow-hidden',
      type === 'menu' ? 'aspect-square' : 'aspect-video',
    ]"
    :style="{ animationDelay: delay + 'ms' }"
  >
    <!-- Image skeleton -->
    <div
      class="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
      :class="[
        type === 'menu' ? 'h-48' : 'h-40',
        'w-full mb-4 rounded-lg skeleton-shimmer',
      ]"
    ></div>

    <!-- Content skeleton -->
    <div class="space-y-3 p-4">
      <!-- Title -->
      <div
        class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded skeleton-shimmer w-3/4"
      ></div>

      <!-- Description -->
      <div class="space-y-2">
        <div
          class="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded skeleton-shimmer"
        ></div>
        <div
          class="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded skeleton-shimmer w-5/6"
        ></div>
      </div>

      <!-- Price/Button skeleton -->
      <div class="flex justify-between items-center pt-2">
        <div
          class="h-6 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 dark:from-yellow-700 dark:via-yellow-600 dark:to-yellow-700 rounded-full skeleton-shimmer w-16"
        ></div>
        <div
          class="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg skeleton-shimmer w-20"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: "menu" | "event" | "default";
  delay?: number;
}

withDefaults(defineProps<Props>(), {
  type: "default",
  delay: 0,
});
</script>

<style scoped>
.skeleton-shimmer {
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
