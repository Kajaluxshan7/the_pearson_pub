<template>
  <!-- Loading Screen -->  <div
    v-if="isLoading"
    class="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
  >
    <USkeleton class="h-16 w-16 rounded-full">
      <div class="w-16 h-16 border-4 border-yellow-500 rounded-full animate-spin border-t-transparent"></div>
    </USkeleton>
  </div>

  <div v-else class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">    <!-- Header -->
    <LayoutsHeader />

    <!-- Main Content -->
    <main class="flex-grow">
      <NuxtPage />
    </main>    <!-- Footer -->
    <LayoutsFooter />

    <!-- Scroll to Top Button -->
    <ClientOnly>
      <UButton
        v-show="scrollY > 500"
        icon="i-heroicons-arrow-up"
        color="yellow"
        variant="solid"
        class="fixed bottom-20 right-6 rounded-full shadow-lg"
        size="lg"
        @click="scrollToTop"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
colorMode.preference = 'light'

// Loading state
const isLoading = ref(true)

// Scroll position
const scrollY = ref(0)

// Update scroll position
const updateScroll = () => {
  if (process.client) {
    scrollY.value = window.scrollY
  }
}

// Scroll to top function
const scrollToTop = () => {
  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)

  if (process.client) {
    window.addEventListener('scroll', updateScroll)
    updateScroll()
  }
})

onUnmounted(() => {
  if (process.client) {
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