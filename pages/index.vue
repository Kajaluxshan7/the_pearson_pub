<template>
  <div class="min-h-screen">    
    <!-- Hero Section -->
    <Hero />

    <!-- Quick Info Section -->
    <section 
      class="py-12 bg-gray-50 opacity-0 transform translate-y-8"
      :class="{ 'animate-fade-in-up': isVisible.quickInfo }"
      ref="quickInfoRef"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UCard v-for="(card, index) in quickInfoCards" 
            :key="index"
            class="opacity-0 transform translate-y-8 u-card"
            :style="{ animationDelay: getStaggeredDelay(index) }"
            :class="{ 'animate-fade-in-up': isVisible.quickInfo }"
          >
            <div class="text-center p-6">
              <UIcon :name="card.icon" class="w-12 h-12 text-primary-500 mx-auto mb-4 transform transition-transform hover:scale-110"/>
              <h3 class="text-xl font-semibold mb-2">{{ card.title }}</h3>
              <div v-html="card.content"></div>
              <UButton
                v-if="card.button"
                :to="card.button.path"
                color="primary"
                variant="ghost"
                class="mt-4 transform transition-all hover:scale-105"
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
      class="py-16 bg-white opacity-0 transform translate-y-8"
      :class="{ 'animate-fade-in-up': isVisible.about }"
      ref="aboutRef"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6 opacity-0 transform translate-y-8"
               :class="{ 'animate-fade-in-up': isVisible.about }"
               style="animation-delay: 200ms">
            <h2 class="text-3xl font-bold text-gray-900">A Whitby Landmark Since Day One</h2>
            <p class="text-lg text-gray-600">
              The vintage appearance of our home-style pub on the corner of Brock and
              Mary St. has become a well-known landmark to local residents and travelers
              alike.
            </p>
            <p class="text-lg text-gray-600">
              Come inside and enjoy our traditional pub atmosphere that many call home to
              gatherings of family, friends, and coworkers for all occasions.
            </p>
            <UButton
              to="/about"
              color="primary"
              variant="soft"
              class="transform transition-all hover:scale-105"
            >
              Learn More About Us
            </UButton>
          </div>
          <div class="grid grid-cols-2 gap-4">
  <UCard v-for="(image, index) in aboutImages" 
         :key="index"
         class="aspect-w-1 aspect-h-1 opacity-0 transform translate-y-8 u-card"
         :class="{ 'animate-fade-in-up': isVisible.about }"
         :style="{ animationDelay: getStaggeredDelay(index + 2) }">
    <img :src="image.src" 
         :alt="image.alt" 
         class="object-cover rounded-lg hover:scale-105 transition-transform duration-500"/>
  </UCard>
</div>
        </div>
      </div>
    </section>

    <!-- Entertainment Schedule Section -->
    <section 
      class="py-16 bg-gray-900 text-white opacity-0 transform translate-y-8"
      :class="{ 'animate-fade-in-up': isVisible.entertainment }"
      ref="entertainmentRef"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Live Entertainment</h2>
          <p class="text-gray-400">Join us for live music and entertainment throughout the week</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UCard class="bg-gray-800">
            <div class="text-center p-6">
              <h3 class="text-xl font-semibold mb-4 text-primary-500">Friday Nights</h3>
              <UIcon name="i-heroicons-musical-note" class="w-12 h-12 text-gray-400 mx-auto mb-4"/>
              <p class="text-gray-300">Live Bands</p>
              <p class="text-gray-400">9:30 PM - 1:30 AM</p>
            </div>
          </UCard>

          <UCard class="bg-gray-800">
            <div class="text-center p-6">
              <h3 class="text-xl font-semibold mb-4 text-primary-500">Saturday Nights</h3>
              <UIcon name="i-heroicons-musical-note" class="w-12 h-12 text-gray-400 mx-auto mb-4"/>
              <p class="text-gray-300">Live Bands</p>
              <p class="text-gray-400">9:30 PM - 1:30 AM</p>
            </div>
          </UCard>

          <UCard class="bg-gray-800">
            <div class="text-center p-6">
              <h3 class="text-xl font-semibold mb-4 text-primary-500">Sunday Nights</h3>
              <UIcon name="i-heroicons-microphone" class="w-12 h-12 text-gray-400 mx-auto mb-4"/>
              <p class="text-gray-300">Karaoke Night</p>
              <p class="text-gray-400">10:00 PM - 2:00 AM</p>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section 
      class="py-16 bg-gradient-to-br from-primary-500/10 to-primary-500/30 opacity-0 transform translate-y-8"
      :class="{ 'animate-fade-in-up': isVisible.cta }"
      ref="ctaRef"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Join Us Today</h2>
        <p class="text-lg text-gray-600 mb-8">
          Experience our traditional pub atmosphere, great food, and live entertainment
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            to="/menu"
            color="primary"
            size="xl"
          >
            View Our Menu
          </UButton>
          <UButton
            to="/contact"
            color="white"
            variant="soft"
            size="xl"
          >
            Make a Reservation
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAnimations } from '~/composables/useAnimations'

const isVisible = ref({
  quickInfo: false,
  about: false,
  entertainment: false,
  cta: false,
})

const quickInfoRef = ref(null)
const aboutRef = ref(null)
const entertainmentRef = ref(null)
const ctaRef = ref(null)

const { getStaggeredDelay, createIntersectionObserver } = useAnimations()

onMounted(() => {
  const refs = {
    quickInfo: quickInfoRef,
    about: aboutRef,
    entertainment: entertainmentRef,
    cta: ctaRef
  }

  const { observe, cleanup } = createIntersectionObserver(refs, isVisible)
  
  observe()
  return cleanup
})

const quickInfoCards = [
  {
    icon: 'i-heroicons-clock',
    title: 'Hours',
    content: `
      <p class="text-gray-600">Mon-Tue: 11am - 12am</p>
      <p class="text-gray-600">Wed-Sat: 11am - 2am</p>
      <p class="text-gray-600">Sun: 11am - 12am</p>
    `
  },
  {
    icon: 'i-heroicons-map-pin',
    title: 'Location',
    content: `
      <p class="text-gray-600">101 MARY ST W</p>
      <p class="text-gray-600">WHITBY, ON, L1N 2R4</p>
    `,
    button: {
      text: 'Get Directions',
      path: '/contact'
    }
  },
  {
    icon: 'i-heroicons-phone',
    title: 'Contact',
    content: `
      <p class="text-gray-600">905-430-5699</p>
      <p class="text-gray-600">thepearsonpub@rogers.com</p>
    `,
    button: {
      text: 'Contact Us',
      path: '/contact'
    }
  }
]

const aboutImages = [
  {
    src: '../images/pub/interior-bar.jpg',
    alt: 'Pub Interior'
  },
  {
    src: '../images/food/foods.jpg',
    alt: 'Pub Food'
  },
  {
    src: '../images/drinks/drinks.jpg',
    alt: 'Pub Drinks'
  },
  {
    src: '../images/entertainment/music.jpg',
    alt: 'Live Entertainment'
  }
]
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes imageLoad {
  from {
    filter: blur(10px);
    opacity: 0;
  }
  to {
    filter: blur(0);
    opacity: 1;
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Card hover effects */
.u-card {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.u-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
}

/* Image loading animation */
img {
  animation: imageLoad 0.8s ease forwards;
}

/* About section styling */
.about {
  padding: 5rem 0;
  background: #f9f9f9;
  text-align: center;
}

/* Stagger animations for cards */
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-fill-mode: both;
}

UCard {
  animation-duration: 0.8s;
  animation-fill-mode: both;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
}

.about h2::after {
  content: "";
  width: 60px;
  height: 4px;
  background-color: #ff5722;
  display: block;
  margin: 0.5rem auto;
  transform-origin: center;
  transition: width 0.3s ease;
}

.about:hover h2::after {
  width: 80px;
}

.about p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin: 0 auto;
  max-width: 600px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .about h2 {
    font-size: 2rem;
  }
  .about p {
    font-size: 1rem;
  }
}
</style>
