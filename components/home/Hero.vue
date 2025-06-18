<template>
  <section class="relative min-h-[90vh] flex items-center justify-center py-32 lg:py-48">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        src="/images/pub/hero-background.jpg"
        alt="Pub Background"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
    </div>

    <div 
      class="container mx-auto px-4 relative z-10 text-center"
      :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-4': !isVisible }"
      style="transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <!-- Hero Content -->
      <div class="max-w-4xl mx-auto space-y-8">
        <h1 
          class="text-4xl md:text-6xl font-bold text-white leading-tight"
          style="text-shadow: 0 2px 4px rgba(0,0,0,0.3)"
        >
          Welcome to The Pearson Pub
        </h1>
        
        <p 
          class="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto"
          style="text-shadow: 0 1px 2px rgba(0,0,0,0.3)"
        >
          A traditional pub atmosphere with modern amenities
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <UButton
            to="/menu"
            color="yellow"
            variant="solid"
            size="xl"
            class="w-full sm:w-auto transform transition hover:scale-105"
          >
            Explore Our Menu
          </UButton>
        </div>

        <!-- Feature Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <!-- Entertainment Card -->
          <div 
            class="bg-white/10 backdrop-blur-md rounded-lg p-6 transform transition-all duration-300 hover:scale-105"
          >
            <UIcon 
              name="i-heroicons-musical-note"
              class="w-8 h-8 text-yellow-400 mx-auto mb-3"
            />
            <h3 class="text-white font-semibold text-xl mb-2">Live Entertainment</h3>
            <p class="text-gray-200 text-sm">
              Enjoy live music every weekend with our featured local bands and artists
            </p>
          </div>

          <!-- Events Card -->
          <div 
            class="bg-white/10 backdrop-blur-md rounded-lg p-6 transform transition-all duration-300 hover:scale-105"
          >
            <UIcon 
              name="i-heroicons-star"
              class="w-8 h-8 text-yellow-400 mx-auto mb-3"
            />
            <h3 class="text-white font-semibold text-xl mb-2">Special Events</h3>
            <p class="text-gray-200 text-sm">
              Join us for sports screenings, quiz nights, and themed celebrations
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<style scoped>
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

@keyframes bounce {
  0%, 100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, 10px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>