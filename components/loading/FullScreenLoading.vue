<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
  >
    <!-- Background Animation -->
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-transparent to-yellow-600/10 animate-pulse"
      ></div>
      <div
        class="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-500/5 rounded-full animate-ping"
        style="animation-delay: 0s"
      ></div>
      <div
        class="absolute top-3/4 right-1/4 w-24 h-24 bg-yellow-500/5 rounded-full animate-ping"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute top-1/2 left-3/4 w-16 h-16 bg-yellow-500/5 rounded-full animate-ping"
        style="animation-delay: 2s"
      ></div>
    </div>

    <!-- Main Loading Content -->
    <div class="relative z-10 text-center max-w-md mx-auto px-6">
      <!-- Logo and Spinner -->
      <div class="mb-8">
        <div class="relative w-32 h-32 mx-auto mb-6">
          <!-- Outer spinning ring -->
          <div
            class="absolute inset-0 rounded-full border-4 border-gray-700 opacity-30"
          ></div>
          <div
            class="absolute inset-0 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin"
          ></div>

          <!-- Inner spinning ring (counter-clockwise) -->
          <div
            class="absolute inset-3 rounded-full border-2 border-gray-600 opacity-20"
          ></div>
          <div
            class="absolute inset-3 rounded-full border-2 border-yellow-400 border-b-transparent animate-spin-reverse"
          ></div>

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
            ></div>
          </div>
        </div>
      </div>

      <!-- Loading Status Text -->
      <div class="space-y-2">
        <p class="text-gray-300 text-lg animate-pulse font-medium">
          {{ currentText }}
        </p>
        <p v-if="subText" class="text-gray-400 text-sm">
          {{ subText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useConnectivity } from "@/composables/useConnectivity";
import { watchEffect } from "vue";

interface Props {
  title?: string;
  subtitle?: string;
  logoUrl?: string;
  progress?: number;
  showProgress?: boolean;
  showSteps?: boolean;
  showPreview?: boolean;
  texts?: string[];
  steps?: string[];
  currentStep?: number;
  subText?: string;
  error?: string | null;
  retrying?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "The Pearson Pub",
  subtitle: "A traditional pub atmosphere with modern amenities in Whitby",
  logoUrl: "/pearson-pub-logo.png",
  progress: 0,
  showProgress: true,
  showSteps: true,
  showPreview: true,
  texts: () => [],
  steps: () => ["Menu", "Events", "Hours", "Specials", "Ready"],
  currentStep: 0,
  subText: "",
  error: null,
  retrying: false,
});

defineEmits<{
  retry: [];
  fallback: [];
}>();

// State
const logoError = ref(false);
const currentText = ref(props.texts[0]);
const textIndex = ref(0);
const router = useRouter();
const { status, checkConnectivity } = useConnectivity();

// Cycling loading text
onMounted(() => {
  const interval = setInterval(() => {
    textIndex.value = (textIndex.value + 1) % props.texts.length;
    currentText.value = props.texts[textIndex.value];
  }, 2500);

  onUnmounted(() => {
    clearInterval(interval);
  });
});

// Single connectivity check on landing
onMounted(async () => {
  try {
    const isConnected = await checkConnectivity();
    if (!isConnected) {
      router.push("/offline");
    }
  } catch (error) {
    console.error("Connectivity check failed:", error);
    router.push("/offline");
  }
});
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
</style>
