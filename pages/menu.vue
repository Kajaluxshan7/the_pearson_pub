<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-white">
    <!-- Hero Section -->
    <section class="relative py-16 bg-amber-900 text-white overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          src="../public/images/menu/76b52f7a-dec8-4ca5-bd44-ca6c53200ae6.jpeg"
          alt="Menu background"
          class="w-full h-full object-cover opacity-20"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-amber-900/80 to-amber-900/95"></div>
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
        <p class="text-xl text-amber-100 max-w-2xl mx-auto">
          Discover our carefully crafted selection of pub favorites and seasonal
          specialties
        </p>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-6 py-12">
      <!-- Menu Categories Navigation -->
      <nav class="mb-12 overflow-x-auto" ref="categoryNav">
        <ul class="flex space-x-6 min-w-max px-4">
          <li v-for="category in categories" :key="category.id">
            <button
              @click="activeCategory = category.id"
              :class="[
                'px-6 py-3 rounded-full transition-all duration-300',
                activeCategory === category.id
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
              ]"
            >
              {{ category.name }}
            </button>
          </li>
        </ul>
      </nav>

      <!-- Daily Specials -->
      <section
        v-if="activeCategory === 'specials'"
        class="mb-16"
        ref="specialsRef"
        :class="{ 'animate-fade-in-up': isVisible.specials }"
      >
        <h2 class="text-2xl font-bold text-amber-900 mb-8">Today's Specials</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UCard
            v-for="(special, index) in dailySpecials"
            :key="special.id"
            class="transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
            :style="getAnimationStyle(index)"
          >
            <div class="relative">
              <img
                :src="special.image"
                :alt="special.name"
                class="w-full h-48 object-cover rounded-t-xl"
              />
              <div class="absolute top-4 right-4">
                <UBadge color="white" class="font-semibold">
                  {{ special.price }}
                </UBadge>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{{ special.name }}</h3>
              <p class="text-gray-600">{{ special.description }}</p>
            </div>
          </UCard>
        </div>
      </section>

      <!-- Regular Menu Items -->
      <!-- Replace the existing menu sections template with this -->
<section class="space-y-16">
  <transition-group
    name="menu-transition"
    tag="div"
    class="space-y-16"
  >
    <div
      v-for="section in filteredMenuItems"
      :key="section.id"
      ref="menuSectionRefs"
      :class="{ 'animate-fade-in-up': isVisible[section.id] }"
    >
      <h2 class="text-2xl font-bold text-amber-900 mb-8 flex items-center">
        <UIcon :name="section.icon" class="w-6 h-6 mr-3" />
        {{ section.name }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MenuCard
          v-for="item in section.items"
          :key="item.id"
          :item="item"
          :style="getAnimationStyle(section.items.indexOf(item))"
          class="transform transition-all duration-300 hover:scale-102"
        />
      </div>
    </div>
  </transition-group>
</section>
    </div>

    <!-- Sticky CTA -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900 to-amber-800 text-white py-4 transform transition-transform duration-300"
      :class="{ 'translate-y-full': !showCTA }"
      v-show="showCTA"
    >
      <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <p class="text-lg">Ready to order?</p>
        <div class="flex space-x-4">
          <UButton
            to="/contact"
            color="white"
            variant="solid"
            size="lg"
          >
            Book a Table
          </UButton>
          <UButton
            color="white"
            variant="outline"
            size="lg"
            @click="scrollToTop"
          >
            Back to Top
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAnimations } from '~/composables/useAnimations'
import type { Ref } from 'vue'

interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  image?: string
  category: string
}

interface MenuSection {
  id: string
  name: string
  category: string
  icon: string
  items: MenuItem[]
}

const { useElementAnimation } = useAnimations({
  duration: 800,
  delay: 100
})

const specialsRef = ref<HTMLElement | null>(null)
const menuSectionRefs = ref<HTMLElement[]>([])
const categoryNav = ref<HTMLElement | null>(null)
const showCTA = ref(false)
const activeCategory = ref('all')

const { isVisible, style: getAnimationStyle } = useElementAnimation(specialsRef)

// Categories
const categories = [
  { id: 'all', name: 'All Menu' },
  { id: 'specials', name: "Today's Specials" },
  { id: 'starters', name: 'Starters' },
  { id: 'mains', name: 'Main Courses' },
  { id: 'drinks', name: 'Drinks' }
]

// Daily Specials Data
const dailySpecials = [
  {
    id: 'special1',
    name: "Chef's Special Burger",
    description: 'Hand-crafted beef patty with special sauce and fresh toppings',
    price: '$16.99',
    image: '../public/images/food/foods.jpg'
  },
  // ... more specials
]

// Menu Sections Data
const menuSections = [
  {
    id: 'starters',
    name: 'Starters',
    category: 'starters',
    icon: 'i-heroicons-fire',
    items: [
      // ... menu items
    ]
  },
  // ... more sections
]

// Scroll handling
const handleScroll = () => {
  showCTA.value = window.scrollY > 500
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.menu-transition-enter-active,
.menu-transition-leave-active {
  transition: all 0.5s ease;
}

.menu-transition-enter-from,
.menu-transition-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Custom scale factor for hover effect */
.hover\:scale-102:hover {
  transform: scale(1.02);
}

/* Smooth scrolling for the whole page */
html {
  scroll-behavior: smooth;
}

/* Hide scrollbar but keep functionality */
.overflow-x-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
