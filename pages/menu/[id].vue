<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { itemsApi } from '~/composables/useApi'

interface MenuItemType {
  id: string | number
  name: string
  description?: string
  price?: number | string
  image?: string
  images?: string[]
  category?: { id: string | number; name: string }
  dietaryInfo?: Record<string, boolean>
  ingredients?: string[]
  isAvailable?: boolean
  [key: string]: any
}

const loading = ref(true)
const error = ref<string | null>(null)
const menuItem = ref<MenuItemType | null>(null)
const allMenuItems = ref<MenuItemType[]>([])
const currentImageIndex = ref(0)
const route = useRoute()
const router = useRouter()

// Fetch data
const fetchMenuItem = async () => {
  loading.value = true
  error.value = null

  try {
    const id = route.params.id as string

    // Fetch the specific item
    const response = await itemsApi.getById(id)
    if (response) {
      menuItem.value = response
    } else {
      error.value = 'Menu item not found.'
    }

    // Fetch all items for navigation
    try {
      const allResponse = await itemsApi.getAll()
      if (allResponse?.items) {
        allMenuItems.value = allResponse.items
      } else if (Array.isArray(allResponse)) {
        allMenuItems.value = allResponse
      }
    } catch {
      // Non-critical - navigation just won't work
    }
  } catch (err: any) {
    error.value = err?.message || 'Failed to load menu item. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchMenuItem)

// Re-fetch when route param changes
watch(
  () => route.params.id,
  () => {
    currentImageIndex.value = 0
    fetchMenuItem()
  }
)

// Navigation between items
const currentItemIndex = computed(() => {
  if (!menuItem.value || !allMenuItems.value.length) {
    return -1
  }
  return allMenuItems.value.findIndex(item => menuItem.value && item.id === menuItem.value.id)
})

const previousItem = computed(() => {
  const index = currentItemIndex.value
  if (index <= 0) {
    return null
  }
  return allMenuItems.value[index - 1]
})

const nextItem = computed(() => {
  const index = currentItemIndex.value
  if (index === -1 || index >= allMenuItems.value.length - 1) {
    return null
  }
  return allMenuItems.value[index + 1]
})

// Image carousel
const itemImages = computed(() => {
  if (!menuItem.value) return []
  if (menuItem.value.images?.length) return menuItem.value.images
  if (menuItem.value.image) return [menuItem.value.image]
  return ['/images/food/foods.jpg']
})

const currentImage = computed(() => {
  return itemImages.value[currentImageIndex.value] || '/images/food/foods.jpg'
})

const previousImage = () => {
  currentImageIndex.value =
    currentImageIndex.value === 0 ? itemImages.value.length - 1 : currentImageIndex.value - 1
}

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % itemImages.value.length
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target && !target.src.includes('/images/food/foods.jpg')) {
    target.src = '/images/food/foods.jpg'
  }
}

// Dietary info labels
const dietaryLabels: Record<string, { label: string; icon: string; color: string }> = {
  isVegetarian: { label: 'Vegetarian', icon: 'i-heroicons-leaf', color: 'text-green-600' },
  isVegan: { label: 'Vegan', icon: 'i-heroicons-leaf', color: 'text-green-700' },
  isGlutenFree: { label: 'Gluten Free', icon: 'i-heroicons-shield-check', color: 'text-amber-600' },
  isDairyFree: { label: 'Dairy Free', icon: 'i-heroicons-shield-check', color: 'text-blue-600' },
  isNutFree: { label: 'Nut Free', icon: 'i-heroicons-shield-check', color: 'text-orange-600' },
  isSpicy: { label: 'Spicy', icon: 'i-heroicons-fire', color: 'text-red-600' }
}

const activeDietaryInfo = computed(() => {
  if (!menuItem.value?.dietaryInfo) return []
  return Object.entries(menuItem.value.dietaryInfo)
    .filter(([, value]) => value)
    .map(([key]) => dietaryLabels[key])
    .filter(Boolean)
})

// SEO
useHead({
  title: () =>
    menuItem.value
      ? `${menuItem.value.name} - Menu - The Pearson Pub`
      : 'Menu Item - The Pearson Pub',
  meta: [
    {
      name: 'description',
      content: () => menuItem.value?.description || 'Menu item at The Pearson Pub'
    },
    {
      property: 'og:title',
      content: () =>
        menuItem.value ? `${menuItem.value.name} - The Pearson Pub` : 'Menu Item - The Pearson Pub'
    },
    {
      property: 'og:description',
      content: () => menuItem.value?.description || 'Menu item at The Pearson Pub'
    },
    {
      property: 'og:image',
      content: () => menuItem.value?.image || '/images/food/foods.jpg'
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto" />
        <p class="text-gray-600 dark:text-gray-400">Loading menu item...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center space-y-4 max-w-md mx-auto p-6">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-16 h-16 text-red-500 mx-auto" />
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Item Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400">
          {{ error }}
        </p>
        <NuxtLink to="/menu">
          <UButton color="yellow" variant="solid" class="mt-4">
            <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
            Back to Menu
          </UButton>
        </NuxtLink>
      </div>
    </div>

    <!-- Menu Item Content -->
    <div v-else-if="menuItem" class="relative z-10">
      <!-- Breadcrumb -->
      <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav class="flex items-center space-x-2 text-sm">
            <NuxtLink to="/" class="text-gray-500 hover:text-yellow-600 transition-colors">Home</NuxtLink>
            <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400" />
            <NuxtLink to="/menu" class="text-gray-500 hover:text-yellow-600 transition-colors">Menu</NuxtLink>
            <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400" />
            <span v-if="menuItem.category" class="text-gray-500">{{ menuItem.category.name }}</span>
            <UIcon v-if="menuItem.category" name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400" />
            <span class="text-yellow-600 dark:text-yellow-400 font-medium">{{ menuItem.name }}</span>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Image Section -->
          <div class="relative">
            <div class="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xl">
              <img
                :src="currentImage"
                :alt="menuItem.name"
                class="w-full h-full object-cover transition-opacity duration-300"
                loading="eager"
                decoding="async"
                @error="handleImageError"
              />
            </div>

            <!-- Image Navigation -->
            <div v-if="itemImages.length > 1" class="absolute top-1/2 left-3 right-3 flex justify-between items-center -translate-y-1/2">
              <button
                class="bg-black/60 hover:bg-yellow-500 text-white p-2 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
                aria-label="Previous image"
                @click="previousImage"
              >
                <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
              </button>
              <button
                class="bg-black/60 hover:bg-yellow-500 text-white p-2 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
                aria-label="Next image"
                @click="nextImage"
              >
                <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
              </button>
            </div>

            <!-- Image Indicators -->
            <div v-if="itemImages.length > 1" class="flex justify-center gap-2 mt-4">
              <button
                v-for="(img, index) in itemImages"
                :key="index"
                class="w-3 h-3 rounded-full transition-all duration-300"
                :class="index === currentImageIndex ? 'bg-yellow-500 scale-125' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'"
                :aria-label="`View image ${index + 1}`"
                @click="currentImageIndex = index"
              />
            </div>
          </div>

          <!-- Details Section -->
          <div class="flex flex-col">
            <!-- Category Badge -->
            <div v-if="menuItem.category" class="mb-3">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                {{ menuItem.category.name }}
              </span>
            </div>

            <!-- Name -->
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-serif">
              {{ menuItem.name }}
            </h1>

            <!-- Price -->
            <div v-if="menuItem.price" class="mb-6">
              <span class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                ${{ typeof menuItem.price === 'number' ? menuItem.price.toFixed(2) : menuItem.price }}
              </span>
            </div>

            <!-- Availability -->
            <div v-if="menuItem.isAvailable === false" class="mb-4">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                <UIcon name="i-heroicons-x-circle" class="w-4 h-4 mr-1.5" />
                Currently Unavailable
              </span>
            </div>

            <!-- Description -->
            <p v-if="menuItem.description" class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
              {{ menuItem.description }}
            </p>

            <!-- Dietary Info -->
            <div v-if="activeDietaryInfo.length" class="mb-6">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Dietary Information</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="info in activeDietaryInfo"
                  :key="info.label"
                  class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800"
                  :class="info.color"
                >
                  <UIcon :name="info.icon" class="w-4 h-4 mr-1.5" />
                  {{ info.label }}
                </span>
              </div>
            </div>

            <!-- Ingredients -->
            <div v-if="menuItem.ingredients?.length" class="mb-6">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Ingredients</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="ingredient in menuItem.ingredients"
                  :key="ingredient"
                  class="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {{ ingredient }}
                </span>
              </div>
            </div>

            <!-- Back to Menu -->
            <div class="mt-auto pt-6">
              <NuxtLink to="/menu">
                <UButton color="yellow" variant="outline" size="lg">
                  <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
                  Back to Menu
                </UButton>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Item Navigation -->
        <div v-if="previousItem || nextItem" class="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <NuxtLink
            v-if="previousItem"
            :to="`/menu/${previousItem.id}`"
            class="group flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
          >
            <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <div>
              <div class="text-xs uppercase tracking-wider text-gray-500">Previous</div>
              <div class="font-semibold">{{ previousItem.name }}</div>
            </div>
          </NuxtLink>
          <div v-else />

          <NuxtLink
            v-if="nextItem"
            :to="`/menu/${nextItem.id}`"
            class="group flex items-center space-x-3 text-right text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
          >
            <div>
              <div class="text-xs uppercase tracking-wider text-gray-500">Next</div>
              <div class="font-semibold">{{ nextItem.name }}</div>
            </div>
            <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
