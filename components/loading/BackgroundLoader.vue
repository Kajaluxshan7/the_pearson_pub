<template>
  <div
    v-if="show"
    class="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-sm"
  >
    <div class="flex items-center gap-3">
      <!-- Loading spinner -->
      <div
        class="animate-spin rounded-full h-5 w-5 border-2 border-yellow-500 border-t-transparent"
      ></div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
          {{ title }}
        </p>
        <p
          v-if="subtitle"
          class="text-xs text-gray-500 dark:text-gray-400 truncate"
        >
          {{ subtitle }}
        </p>
      </div>

      <!-- Close button -->
      <button
        @click="$emit('close')"
        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show?: boolean;
  title?: string;
  subtitle?: string;
}

withDefaults(defineProps<Props>(), {
  show: false,
  title: "Loading...",
  subtitle: "",
});

defineEmits<{
  close: [];
}>();
</script>
