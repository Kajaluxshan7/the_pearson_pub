<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Menu Hero Section -->
    <section class="relative py-20 bg-gray-900 text-white">
      <div class="absolute inset-0 overflow-hidden">
        <NuxtImg 
          src="/images/food/foods.jpg" 
          alt="Our Menu" 
          class="w-full h-full object-cover opacity-30"
          format="webp"
          quality="80"
        />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Our Menu</h1>
        <p class="text-xl max-w-3xl mx-auto">
          Discover our delicious selection of pub favorites and craft beverages
        </p>
      </div>
    </section>

    <!-- Menu Categories Navigation -->
    <section class="py-8 bg-white sticky top-0 z-10 shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-center space-x-4 overflow-x-auto pb-2">
          <UButton
            v-for="category in categories"
            :key="category.id"
            :color="activeCategory === category.id ? 'yellow' : 'gray'"
            variant="ghost"
            @click="activeCategory = category.id"
          >
            {{ category.name }}
          </UButton>
        </div>
      </div>
    </section>

    <!-- Menu Items Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          v-for="category in filteredCategories" 
          :key="category.id"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div 
            v-for="item in category.items" 
            :key="item.id"
            class="transition-all duration-300"
            :class="{ 
              'opacity-0 translate-y-8': !isVisible[item.id], 
              'opacity-100 translate-y-0': isVisible[item.id] 
            }"
          >
            <MenuCard :item="item" />
          </div>
        </div>
      </div>
    </section>

    <!-- Special Dietary Requirements -->
    <section class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl font-bold mb-4">Dietary Information</h2>
        <p class="text-gray-600 mb-8">
          We cater to various dietary requirements. Please ask our staff for allergen information.
        </p>
        <div class="flex justify-center space-x-4 flex-wrap">
          <span 
            v-for="(info, index) in dietaryInfo" 
            :key="index"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 m-2"
          >
            <UIcon 
              :name="info.icon" 
              class="w-4 h-4 mr-2 text-yellow-500"
            />
            {{ info.label }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useMenu } from '~/composables/useMenu'
import type { MenuItem, MenuCategory } from '~/types/menu'

// Page meta
useHead({
  title: 'Menu - The Pearson Pub',
  meta: [
    { name: 'description', content: 'Explore our delicious menu of pub favorites and craft beverages at The Pearson Pub.' }
  ]
})

const { menuCategories } = useMenu()

// State
const activeCategory = ref<string>('')
const isVisible = ref<Record<string, boolean>>({})
const observer = ref<IntersectionObserver | null>(null)

// Computed
const categories = computed<MenuCategory[]>(() => 
  Array.isArray(menuCategories.value) ? menuCategories.value : []
)

const filteredCategories = computed(() => 
  categories.value.filter(category => category.id === activeCategory.value)
)

// Constants
const dietaryInfo = [
  { icon: 'i-heroicons-leaf', label: 'Vegetarian Options' },
  { icon: 'i-heroicons-no-symbol', label: 'Gluten-Free Options' },
  { icon: 'i-heroicons-heart', label: 'Vegan Options' },
  { icon: 'i-heroicons-exclamation-circle', label: 'Allergen Information Available' }
]

// Methods
const setupIntersectionObserver = () => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const itemId = entry.target.getAttribute('data-item-id')
        if (itemId) {
          isVisible.value[itemId] = entry.isIntersecting
        }
      })
    },
    { threshold: 0.1 }
  )
}

const observeMenuItems = () => {
  if (!observer.value) return

  // Clean up previous observations
  observer.value.disconnect()

  // Observe new elements
  nextTick(() => {
    const menuItems = document.querySelectorAll('[data-item-id]')
    menuItems.forEach(item => {
      observer.value?.observe(item)
    })
  })
}

// Lifecycle
onMounted(() => {
  if (categories.value.length > 0) {
    activeCategory.value = categories.value[0].id
  }
  
  setupIntersectionObserver()
  observeMenuItems()

  // Initialize visibility state
  categories.value.forEach(category => {
    category.items.forEach(item => {
      isVisible.value[item.id] = false
    })
  })
})

onUnmounted(() => {
  observer.value?.disconnect()
})

// Watch for category changes to re-observe items
watch(activeCategory, () => {
  nextTick(observeMenuItems)
})
</script>
