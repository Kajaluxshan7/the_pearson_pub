<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="animate-fade-in mb-6">Welcome to The Pearson Pub</h1>
      <p class="animate-fade-in mb-8" style="--stagger-delay: 0.2s">
        A traditional pub atmosphere with modern amenities
      </p>
      
      <div class="flex justify-center gap-4 mb-12">
        <UButton
          to="/menu"
          color="amber"
          variant="solid"
          size="xl"
          class="hero-button animate-fade-in"
          style="--stagger-delay: 0.4s"
        >
          View Our Menu
        </UButton>
        <UButton
          to="/contact"
          color="white"
          variant="outline"
          size="xl"
          class="hero-button animate-fade-in"
          style="--stagger-delay: 0.5s"
        >
          Book a Table
        </UButton>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.title"
          class="feature-card animate-fade-in"
          :style="{ '--stagger-delay': `${0.6 + index * 0.1}s` }"
        >
          <UIcon 
            :name="feature.icon" 
            class="w-8 h-8 mb-3 text-amber-400"
          />
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const features = ref([
  {
    title: 'Live Entertainment',
    description: 'Live bands every Friday & Saturday, Karaoke on Sundays',
    icon: 'i-heroicons-musical-note'
  },
  {
    title: '14 Beers on Tap',
    description: 'Featuring local craft beers and classic favorites',
    icon: 'i-heroicons-beer-mug'
  },
  {
    title: 'Sports Bar',
    description: 'Multiple TVs showing your favorite sports events',
    icon: 'i-heroicons-tv'
  }
])
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
    url('/images/pub/hero-background.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.hero-content {
  position: relative;
  text-align: center;
  color: #fff;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.animate-fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: heroContentFadeIn 1s var(--stagger-delay, 0s) forwards;
}

@keyframes heroContentFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.hero-button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>