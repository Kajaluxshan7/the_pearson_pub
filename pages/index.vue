<template>
  <div class="min-h-screen">    
    <Hero />
    <section 
      class="py-12 bg-gray-50"
      :class="{ 'opacity-0 transform translate-y-8': !isVisible.quickInfo, 'animate-fade-in-up': isVisible.quickInfo }"
      ref="quickInfoRef"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UCard 
            v-for="(card, index) in quickInfoCards" 
            :key="index"
            class="transform hover:scale-105 transition-all duration-300"
            :class="{
              'opacity-0 translate-y-8': !isVisible.quickInfo,
              'animate-fade-in-up': isVisible.quickInfo
            }"
            :style="{ animationDelay: getStaggeredDelay(index) }"
          >
            <div class="text-center p-6">
              <UIcon 
                :name="card.icon" 
                class="w-12 h-12 text-yellow-500 mx-auto mb-4 transform transition-transform hover:scale-110"
              />
              <h3 class="text-xl font-semibold mb-2">{{ card.title }}</h3>
              <div v-html="card.content"></div>
              <UButton
                v-if="card.button"
                :to="card.button.path"
                color="yellow"
                variant="ghost"
                class="mt-4"
              >
                {{ card.button.text }}
              </UButton>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section 
      class="py-16 bg-white"
      :class="{ 'opacity-0 transform translate-y-8': !isVisible.about, 'animate-fade-in-up': isVisible.about }"
      ref="aboutRef"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            class="space-y-6"
            :class="{ 'opacity-0 transform translate-y-8': !isVisible.about, 'animate-fade-in-up': isVisible.about }"
            style="animation-delay: 200ms"
          >
            <h2 class="text-3xl font-bold text-gray-900">A Whitby Landmark Since Day One</h2>
            <p class="text-lg text-gray-600">
              The Pearson Pub has been serving the Whitby community with great food, drinks, and entertainment
              in a welcoming atmosphere. Our traditional pub setting combined with modern amenities makes us
              the perfect spot for any occasion.
            </p>
            <UButton
              to="/about"
              color="yellow"
              class="mt-4"
            >
              Learn More About Us
            </UButton>
          </div>
          <div class="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <img
              src="/images/pub/interior-main.jpg"
              alt="Pub Interior"
              class="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Hero from '../components/home/Hero.vue'  


// Quick info cards data
const quickInfoCards = [
  {
    icon: 'i-heroicons-calendar',
    title: 'Opening Hours',
    content: `
      <p class="text-gray-600">
        Mon-Tue: 11:00am - 12:00am<br>
        Wed-Sat: 11:00am - 2:00am<br>
        Sun: 11:00am - 12:00am
      </p>
    `,
    button: { text: 'Contact Us', path: '/contact' }
  },
  {
    icon: 'i-heroicons-musical-note',
    title: 'Live Entertainment',
    content: `
      <p class="text-gray-600">
        Friday &amp; Saturday: Live Bands<br>
        Sunday: Karaoke Night<br>
        Check schedule for details
      </p>
    `,
    button: { text: 'View Schedule', path: '/events' }
  },
  {
    icon: 'i-heroicons-star',
    title: 'Special Events',
    content: `
      <p class="text-gray-600">
        Sports Events<br>
        Trivia Nights<br>
        Private Parties
      </p>
    `,
    button: { text: 'Learn More', path: '/events' }
  }
]

// Visibility states
const isVisible = ref({
  quickInfo: false,
  about: false,
  gallery: false,
  testimonials: false
})

// Refs for intersection observer
const quickInfoRef = ref(null)
const aboutRef = ref(null)
const galleryRef = ref(null)
const testimonialsRef = ref(null)

// Staggered animation delay
const getStaggeredDelay = (index: number) => `${index * 100}ms`

// Intersection observer callback
const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target
      // Check which section is intersecting and update visibility
      if (target === quickInfoRef.value) isVisible.value.quickInfo = true
      if (target === aboutRef.value) isVisible.value.about = true
      if (target === galleryRef.value) isVisible.value.gallery = true
      if (target === testimonialsRef.value) isVisible.value.testimonials = true
      // Stop observing after becoming visible
      observer.unobserve(target)
    }
  })
}

let observer: IntersectionObserver

onMounted(() => {
  // Initialize intersection observer
  observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
    rootMargin: '0px'
  })

  // Start observing sections
  if (quickInfoRef.value) observer.observe(quickInfoRef.value)
  if (aboutRef.value) observer.observe(aboutRef.value)
  if (galleryRef.value) observer.observe(galleryRef.value)
  if (testimonialsRef.value) observer.observe(testimonialsRef.value)
})

onUnmounted(() => {
  // Clean up observer
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style>
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
