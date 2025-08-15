<template>
  <div>
    <!-- Connectivity Indicator -->
    <ConnectivityIndicator>
      <!-- Remove the blocking loading screen that causes white screen -->
      <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
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
    </ConnectivityIndicator>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '#imports'
import { useLandingPageData } from '~/composables/useLandingPageData'

const colorMode = useColorMode()
if (colorMode) colorMode.preference = 'light'

// Initialize landing page data composable
const { initializeAllData } = useLandingPageData()

// Background loading state (non-blocking)
const loadingState = ref({
  isLoading: false,
  progress: 0,
  error: null as string | null
})

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

// Background data loading (non-blocking)
const loadDataInBackground = async () => {
  loadingState.value.isLoading = true;
  loadingState.value.error = null;
  
  try {
    // Load data in background without blocking UI
    await initializeAllData();
    console.log("Background data loading completed");
  } catch (error) {
    console.error('Failed to load background data:', error);
    loadingState.value.error = 'Failed to load some data. Website will still work.';
  } finally {
    loadingState.value.isLoading = false;
  }
};

onMounted(() => {
  console.log("App mounted");
  
  // Load data in background without blocking the UI - only on first app load
  const hasBackgroundLoaded = sessionStorage.getItem('background-data-loaded');
  if (!hasBackgroundLoaded) {
    loadDataInBackground().finally(() => {
      sessionStorage.setItem('background-data-loaded', 'true');
    });
  }
  
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', updateScroll);
    updateScroll();
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', updateScroll);
  }
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