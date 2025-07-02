<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        src="../../public/images/pub/hero-background.jpg "
        alt="The Pearson Pub Interior"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/60"></div>
    </div>
    <div 
      class="container mx-auto px-4 relative z-10 text-center"
      :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-8': !isVisible }"
      style="transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <!-- Main Hero Content -->
      <div class="max-w-4xl mx-auto space-y-8">
        <h1 
          class="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          style="text-shadow: 2px 4px 8px rgba(0,0,0,0.5); font-family: 'Cinzel', 'Georgia', serif;"
        >
          Welcome to<br>
          <span class="text-yellow-400">The Pearson Pub</span>
        </h1>
        
        <p 
          class="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-12"
          style="text-shadow: 1px 2px 4px rgba(0,0,0,0.7)"
        >
          A Traditional Pub with a Modern Touch
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <UButton
            to="/menu"
            color="yellow"
            variant="solid"
            size="xl"
            class="w-full sm:w-auto transform transition hover:scale-105 px-8 py-4 text-lg font-semibold rounded-lg"
          >
            Menu
          </UButton>
          <UButton
            to="/events"
            variant="outline"
            size="xl"
            color="yellow"
            class="w-full sm:w-auto transform transition hover:scale-105 px-8 py-4 text-lg font-semibold rounded-lg border-1 border-white text-white hover:bg-yellow-600 hover:text-gray-900"
          >
            Events
          </UButton>
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