<template>
  <div>
    <LoadingScreen3D
  v-if="loadingState.isLoading"
  :progress="loadingState.progress"
  :texts="loadingTexts"
  title="The Pearson Pub"
  subtitle=""
  icon-name="i-heroicons-building-storefront"
  :error="loadingState.error"
  @retry="startLoading"
/>

    <USkeleton v-if="loadingState.isLoading" class="h-16 w-16 rounded-full">
      <div class="w-16 h-16 border-4 border-yellow-500 rounded-full animate-spin border-t-transparent"></div>
    </USkeleton>

    <div v-else class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <!-- Header -->
      <LayoutsHeader />

      <!-- Main Content -->
      <main class="flex-grow">
        <NuxtPage />
      </main>
      <!-- Footer -->
      <LayoutsFooter />

      <!-- Scroll to Top Button -->
      <ClientOnly>
        <UButton
          v-show="scrollY > 500"
          icon="i-heroicons-arrow-up"
          color="yellow"
          variant="solid"
          class="fixed bottom-10 left-1/2 transform -translate-x-1/2 rounded-full shadow-lg"
          size="xs"
          @click="scrollToTop"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '#imports'

const colorMode = useColorMode()
colorMode.preference = 'light'

// Loading state
const loadingState = ref({
  isLoading: true,
  progress: 0,
  error: null
})

const loadingTexts = [
''
]

// Scroll position
const scrollY = ref(0)

// Update scroll position
const updateScroll = () => {
  if (typeof window !== 'undefined') {
    scrollY.value = window.scrollY
  }
}

// Scroll to top function
const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Simulate loading
let progressTimer: ReturnType<typeof setInterval> | null = null;
const startLoading = () => {
  loadingState.value.isLoading = true;
  loadingState.value.progress = 0;
  loadingState.value.error = null;
  if (progressTimer) clearInterval(progressTimer);
  if (typeof window !== 'undefined') {
    progressTimer = setInterval(() => {
      if (loadingState.value.progress < 90) {
        loadingState.value.progress += Math.random() * 3 + 1; // Fast at first
      } else if (loadingState.value.progress < 99) {
        loadingState.value.progress += 0.2; // Slow near the end
      }
      if (loadingState.value.progress >= 99) {
        loadingState.value.progress = 99;
        clearInterval(progressTimer!);
        // Simulate real load complete after a short delay
        setTimeout(() => {
          loadingState.value.progress = 100;
          setTimeout(() => {
            loadingState.value.isLoading = false;
          }, 400); // Let bar reach 100% before hiding
        }, 400);
      }
    }, 60);
  }
};

onMounted(() => {
  startLoading();
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', updateScroll);
    updateScroll();
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', updateScroll);
  }
  if (progressTimer) clearInterval(progressTimer);
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>