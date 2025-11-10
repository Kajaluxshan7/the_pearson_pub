<template>
  <div>
    <!-- Connectivity Indicator -->
    <ConnectivityIndicator>
      <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <!-- Use NuxtLayout for proper Nuxt 3 structure -->
        <NuxtLayout>
          <LayoutHeader/>
 <main class="flex-grow">
          <NuxtPage />
        </main>
          <LayoutFooter/>
        </NuxtLayout>

        <!-- Scroll to Top Button -->
        <ClientOnly>
          <UButton
            v-show="scrollY > 500"
            icon="i-heroicons-arrow-up"
            color="yellow"
            variant="solid"
            class="fixed bottom-10 left-1/2 transform -translate-x-1/2 rounded-full shadow-lg z-40"
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

// Import header and footer components (adjust paths if needed)
import LayoutHeader from '~/components/layout/Header.vue'
import LayoutFooter from '~/components/layout/Footer.vue'

// Set light mode as default
const colorMode = useColorMode()
if (colorMode) colorMode.preference = 'light'

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

// OPTIMIZATION: Data loading removed from app.vue - handled by individual pages
// This prevents loading all data on every page navigation

onMounted(() => {
  // Setup scroll tracking for scroll-to-top button
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