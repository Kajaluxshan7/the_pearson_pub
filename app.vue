<template>
  <div>
    <!-- Connectivity Indicator -->
    <ConnectivityIndicator>
      <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <!-- Use NuxtLayout for proper Nuxt 3 structure -->
        <NuxtLayout>
          <LayoutHeader />
          <main id="main-content" class="flex-grow">
            <NuxtPage />
          </main>
          <LayoutFooter />
        </NuxtLayout>

        <!-- Scroll to Top Button -->
        <ClientOnly>
          <UButton
            v-show="scrollY > 500"
            icon="i-heroicons-arrow-up"
            color="gray"
            variant="solid"
            aria-label="Back to top"
            class="fixed bottom-20 right-5 w-12 h-12 justify-center rounded-full shadow-lg z-40"
            size="lg"
            @click="scrollToTop"
          />
        </ClientOnly>
      </div>
    </ConnectivityIndicator>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Import header and footer components (adjust paths if needed)
import LayoutHeader from '~/components/layout/Header.vue'
import LayoutFooter from '~/components/layout/Footer.vue'

// Color mode is managed by @nuxtjs/color-mode with 'light' fallback (nuxt.config.ts)

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

// OPTIMIZATION: Data loading is handled by individual pages and composables
// This prevents loading all data on every page navigation

onMounted(() => {
  // Setup scroll tracking for scroll-to-top button
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', updateScroll)
  }
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
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
