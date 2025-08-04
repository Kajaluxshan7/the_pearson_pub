<template>
  <div>
    <!-- Loading Screen - Shows until all backend data is fetched -->
    <LoadingScreen3D
      v-if="loadingState.isLoading"
      :progress="loadingState.progress"
      :texts="loadingTexts"
      title="The Pearson Pub"
      subtitle="Loading your pub experience..."
      icon-name="i-heroicons-building-storefront"
      :error="loadingState.error"
      @retry="initializeData"
    />

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
import { useLandingPageData } from '~/composables/useLandingPageData'

const colorMode = useColorMode()
if (colorMode) colorMode.preference = 'light'

// Initialize landing page data composable
const { initializeAllData, isLoading: dataLoading, error: dataError } = useLandingPageData()

// Loading state
const loadingState = ref({
  isLoading: true,
  progress: 0,
  error: null as string | null
})

const loadingTexts = [
  'Loading menu items...',
  'Fetching upcoming events...',
  'Getting contact information...',
  'Loading specials...',
  'Almost ready!'
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

// Initialize data and handle loading
const initializeData = async () => {
  try {
    loadingState.value.isLoading = true
    loadingState.value.progress = 0
    loadingState.value.error = null

    // Start progress animation
    const progressInterval = setInterval(() => {
      if (loadingState.value.progress < 90) {
        loadingState.value.progress += Math.random() * 10 + 5
      }
    }, 100)

    // Fetch all backend data
    await initializeAllData()

    // Complete progress
    clearInterval(progressInterval)
    loadingState.value.progress = 100

    // Small delay to show completion
    setTimeout(() => {
      loadingState.value.isLoading = false
    }, 500)

  } catch (error) {
    console.error('Failed to initialize data:', error)
    loadingState.value.error = 'Failed to load data. Please try again.'
    loadingState.value.progress = 0
  }
}

onMounted(() => {
  initializeData()
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', updateScroll)
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