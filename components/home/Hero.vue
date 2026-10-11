<template>
  <section
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900"
  >
    <div class="absolute inset-0 z-0">
      <img
        src="/images/pub/hero-background.webp"
        alt="The Pearson Pub Interior"
        class="w-full h-full object-cover"
        loading="eager"
        fetchpriority="high"
        @error="handleImageError"
      />
      <div class="absolute inset-0 bg-black/60" />
    </div>
    <div class="container mx-auto px-4 relative z-10 text-center hero-enter">
      <!-- Main Hero Content -->
      <div class="max-w-4xl mx-auto space-y-8">
        <h1
          class="text-5xl md:text-7xl font-semibold text-white leading-tight mb-6"
          style="
            text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.5);
            font-family: 'Cinzel', 'Georgia', serif;
          "
        >
          Welcome to<br />
          <span class="text-yellow-400">The Pearson Pub</span>
        </h1>

        <p
          class="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-12"
          style="text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.7)"
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
            class="w-full sm:w-auto transform transition px-8 py-4 text-lg font-semibold rounded-lg justify-center text-gray-900"
          >
            Menu
          </UButton>
          <UButton
            to="/events"
            variant="outline"
            size="xl"
            color="yellow"
            class="w-full sm:w-auto transition px-8 py-4 text-lg font-semibold rounded-lg justify-center ring-1 ring-white text-white hover:bg-yellow-400 hover:text-gray-900"
          >
            Events
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const handleImageError = (event: Event) => {
  // Log error in development only
  if (process.dev) {
    console.error('Hero image failed to load:', event)
  }
}
</script>

<style scoped>
.hero-enter {
  animation: hero-in 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes hero-in {
  from {
    opacity: 0.001;
    transform: translateY(16px);
  }
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

@keyframes bounce {
  0%,
  100% {
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
