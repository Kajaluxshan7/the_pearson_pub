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
      <div v-if="showProgress" class="mb-6 max-w-sm mx-auto">
        <div class="flex justify-between text-sm text-gray-400 mb-2">
          <span>Loading...</span>
          <span>{{ Math.round(progress) }}%</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full transition-all duration-500 ease-out shadow-lg"
            :style="{ width: progress + '%' }"
          >
            <div
              class="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
            />
          </div>
        </div>
      </div>

      <!-- Loading Status Text -->
      <div class="space-y-3 min-h-[56px] flex flex-col items-center justify-center">
        <transition name="text-fade" mode="out-in">
          <p :key="currentText" class="text-gray-300 text-lg font-medium text-center">
            {{ currentText }}
          </p>
        </transition>
        <p v-if="subText" class="text-gray-400 text-sm text-center">
          {{ subText }}
        </p>
      </div>

      <!-- Step Indicators -->
      <div v-if="steps.length > 0" class="mt-6">
        <div class="flex items-center justify-center flex-wrap gap-1">
          <template v-for="(step, idx) in steps" :key="step">
            <div
              :class="[
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                idx < currentStep
                  ? 'bg-yellow-500 text-gray-900'
                  : idx === currentStep
                  ? 'bg-yellow-500/20 border-2 border-yellow-500 text-yellow-400'
                  : 'bg-gray-700 text-gray-500'
              ]"
            >
              <svg v-if="idx < currentStep" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span v-else class="text-xs">{{ idx + 1 }}</span>
            </div>
            <div
              v-if="idx < steps.length - 1"
              :class="[
                'w-5 h-0.5 transition-all duration-500',
                idx < currentStep ? 'bg-yellow-500' : 'bg-gray-700'
              ]"
            />
          </template>
        </div>
        <p class="text-center text-xs text-gray-500 mt-2">
          {{ currentStep < steps.length ? steps[currentStep] : steps[steps.length - 1] }}
        </p>
      </div>

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
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  logoUrl?: string
  progress?: number
  showProgress?: boolean
  texts?: string[]
  steps?: string[]
  currentStep?: number
  subText?: string
  error?: string | null
  retrying?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'The Pearson Pub',
  subtitle: 'A traditional pub atmosphere with modern amenities in Whitby',
  logoUrl: '/pearson-pub-logo.png',
  progress: 0,
  showProgress: true,
  texts: () => [],
  steps: () => ['Menu', 'Events', 'Hours', 'Specials', 'Ready'],
  currentStep: 0,
  subText: '',
  error: null,
  retrying: false
})

defineEmits<{
  retry: []
  fallback: []
}>()

// State
const logoError = ref(false)
const currentText = ref(props.texts[0] ?? '')
const textIndex = ref(0)

// Cycling loading text - properly placed at top level
let textInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (props.texts.length > 1) {
    textInterval = setInterval(() => {
      textIndex.value = (textIndex.value + 1) % props.texts.length
      currentText.value = props.texts[textIndex.value]
    }, 2500)
  }
})

onUnmounted(() => {
  if (textInterval) {
    clearInterval(textInterval)
    textInterval = null
  }
})

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

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

.animate-spin-reverse {
  animation: spin-reverse 3s linear infinite;
}

.animate-shimmer {
  animation: shimmer 2s ease-in-out infinite;
}

/* Text cycling fade transition */
.text-fade-enter-active,
.text-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.text-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.text-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
