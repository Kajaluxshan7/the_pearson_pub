<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
  >
    <!-- Background Animation -->
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-transparent to-yellow-600/10 animate-pulse"
      />
      <div
        class="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-500/5 rounded-full animate-ping"
        style="animation-delay: 0s"
      />
      <div
        class="absolute top-3/4 right-1/4 w-24 h-24 bg-yellow-500/5 rounded-full animate-ping"
        style="animation-delay: 1s"
      />
      <div
        class="absolute top-1/2 left-3/4 w-16 h-16 bg-yellow-500/5 rounded-full animate-ping"
        style="animation-delay: 2s"
      />
    </div>

    <!-- Main Loading Content -->
    <div class="relative z-10 text-center max-w-md mx-auto px-6">
      <!-- Logo and Spinner -->
      <div class="mb-8">
        <div class="relative w-32 h-32 mx-auto mb-6">
          <!-- Outer spinning ring -->
          <div class="absolute inset-0 rounded-full border-4 border-gray-700 opacity-30" />
          <div
            class="absolute inset-0 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin"
          />

          <!-- Inner spinning ring (counter-clockwise) -->
          <div class="absolute inset-3 rounded-full border-2 border-gray-600 opacity-20" />
          <div
            class="absolute inset-3 rounded-full border-2 border-yellow-400 border-b-transparent animate-spin-reverse"
          />

          <!-- Logo Container -->
          <div
            class="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg"
          >
            <img
              v-if="logoUrl"
              :src="logoUrl"
              alt="The Pearson Pub"
              class="w-16 h-16 object-contain rounded-full"
              @error="logoError = true"
            />
            <UIcon
              v-else
              name="i-heroicons-building-storefront"
              class="w-16 h-16 text-white drop-shadow-md"
            />
          </div>
        </div>
      </div>

      <!-- Title and Subtitle -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-3 font-serif">
          {{ title }}
        </h1>
        <p class="text-xl text-gray-300 font-light">
          {{ subtitle }}
        </p>
      </div>

      <!-- Progress Bar -->
      <!-- (removed) -->

      <!-- Loading Status Text -->
      <!-- (removed) -->

      <!-- Step Indicators -->
      <!-- (removed) -->

      <!-- Error / Retry UI -->
      <div v-if="error" class="mt-6 p-4 bg-red-900/30 border border-red-700/50 rounded-xl text-center">
        <p class="text-red-400 text-sm mb-4">{{ error }}</p>
        <div class="flex gap-3 justify-center">
          <button
            v-if="!retrying"
            class="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold text-sm rounded-lg transition-colors"
            @click="$emit('retry')"
          >
            Try Again
          </button>
          <span v-else class="text-yellow-400 text-sm">Retrying...</span>
          <button
            class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm rounded-lg transition-colors"
            @click="$emit('fallback')"
          >
            Continue Offline
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  logoUrl?: string
  error?: string | null
  retrying?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'The Pearson Pub',
  subtitle: 'A traditional pub atmosphere with modern amenities in Whitby',
  logoUrl: '/pearson-pub-logo.png',
  error: null,
  retrying: false
})

defineEmits<{
  retry: []
  fallback: []
}>()

// State
const logoError = ref(false)

// Connectivity check is handled by the parent (pages/index.vue) to allow
// grace periods and avoid premature redirects; do not auto-navigate here.
</script>

<style scoped>
@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-spin-reverse {
  animation: spin-reverse 3s linear infinite;
}
</style>
