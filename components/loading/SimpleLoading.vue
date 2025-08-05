<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
    role="alert"
    aria-live="assertive"
    aria-busy="true"
  >
    <!-- Loading Content -->
    <div class="text-center">
      <!-- Logo and Spinner -->
      <div class="mb-8">
        <div class="relative w-24 h-24 mx-auto mb-6">
          <!-- Spinning ring -->
          <div
            class="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"
            aria-hidden="true"
          ></div>
          <div
            class="absolute inset-0 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin"
            aria-hidden="true"
          ></div>
          <!-- Logo -->
          <div
            class="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center"
          >
            <UIcon
              :name="iconName"
              class="w-8 h-8 text-white"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <!-- Title and Subtitle -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {{ title }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          {{ subtitle }}
        </p>
      </div>

      <!-- Progress Bar -->
      <div v-if="showProgress" class="mb-4 max-w-xs mx-auto">
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-300 ease-out"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {{ Math.round(progress) }}%
        </p>
      </div>

      <!-- Loading Text -->
      <p class="text-gray-600 dark:text-gray-300 animate-pulse">
        {{ currentText }}
      </p>

      <!-- Error State -->
      <div
        v-if="error"
        class="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
      >
        <p class="text-red-600 dark:text-red-400 mb-2">{{ error }}</p>
        <UButton
          color="red"
          variant="outline"
          size="sm"
          @click="$emit('retry')"
        >
          Try Again
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  iconName?: string;
  progress?: number;
  showProgress?: boolean;
  texts?: string[];
  error?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Loading...",
  subtitle: "Please wait",
  iconName: "i-heroicons-building-storefront",
  progress: 0,
  showProgress: true,
  texts: () => [
    "Loading content...",
    "Preparing your experience...",
    "Almost ready...",
  ],
  error: null,
});

defineEmits<{
  retry: [];
}>();

// Cycling loading text
const currentText = ref(props.texts[0]);
const textIndex = ref(0);

onMounted(() => {
  const interval = setInterval(() => {
    textIndex.value = (textIndex.value + 1) % props.texts.length;
    currentText.value = props.texts[textIndex.value];
  }, 2000);

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>
