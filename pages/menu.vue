<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
    <div class="container mx-auto px-4 pb-12">
      <!-- Page Title -->
      <div 
        class="text-center mb-12 opacity-0 animate-fade-in"
        :class="{ 'opacity-100': !isLoading }"
      >
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Menu</h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover our carefully curated selection of dishes, from daily specials to time-honored classics
        </p>
      </div>

      <!-- Pearson's Famous Dishes -->
      <div v-if="pearsonFamous.length" class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <UIcon name="i-heroicons-star" class="w-6 h-6 text-yellow-500 mr-2" />
          Pearson's Famous Dishes
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="item in pearsonFamous"
            :key="item.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div class="aspect-w-16 aspect-h-9 relative">
              <img
                :src="item.image || '/images/food/placeholder.jpg'"
                :alt="item.name"
                class="object-cover w-full h-full"
              />
              <div class="absolute top-4 right-4">
                <span class="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Famous
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {{ item.name }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ item.description }}
              </p>
              <div class="flex justify-between items-center">
                <span class="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                  £{{ item.price.toFixed(2) }}
                </span>
                <span 
                  v-if="!item.isAvailable"
                  class="text-red-500 text-sm font-medium"
                >
                  Currently Unavailable
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu Categories -->
      <div class="space-y-12">
        <div class="flex overflow-x-auto py-4 -mx-4 px-4 space-x-4 sticky top-16 bg-gray-50 dark:bg-gray-900 z-10">
          <UButton
            v-for="category in menuCategories"
            :key="category.id"
            :color="activeCategory === category.id ? 'yellow' : 'gray'"
            :variant="activeCategory === category.id ? 'solid' : 'soft'"
            class="whitespace-nowrap"
            @click="activeCategory = category.id"
          >
            {{ category.name }}
          </UButton>
        </div>

        <TransitionGroup
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 transform translate-y-4"
          enter-to-class="opacity-100 transform translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 transform translate-y-0"
          leave-to-class="opacity-0 transform translate-y-4"
        >
          <div
            v-for="category in menuCategories"
            :key="category.id"
            v-show="activeCategory === category.id"
            class="space-y-8"
          >
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {{ category.name }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400">
                {{ category.description }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="item in filterMenuItems(category.items)"
                :key="item.id"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div v-if="item.image" class="aspect-w-16 aspect-h-9">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="object-cover w-full h-full"
                  />
                </div>
                <div class="p-6">
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      {{ item.name }}
                    </h3>
                    <span class="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                      £{{ item.price.toFixed(2) }}
                    </span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 mb-4">
                    {{ item.description }}
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="allergen in item.allergens"
                      :key="allergen"
                      class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                    >
                      Contains {{ allergen }}
                    </span>
                    <span
                      v-if="item.dietaryInfo?.isVegetarian"
                      class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded"
                    >
                      Vegetarian
                    </span>
                    <span
                      v-if="item.dietaryInfo?.isVegan"
                      class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded"
                    >
                      Vegan
                    </span>
                    <span
                      v-if="item.dietaryInfo?.isGlutenFree"
                      class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded"
                    >
                      Gluten Free
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MenuItem } from '~/types/menu'

const { menuCategories, getFeaturedItems, getPearsonFamousItems } = useMenu()

const activeCategory = ref(menuCategories.value[0]?.id || '')
const isLoading = ref(true)
const showFeatured = ref(true)

const pearsonFamous = computed(() => getPearsonFamousItems.value)
const featuredItems = computed(() => getFeaturedItems.value)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})

const filterMenuItems = (items: MenuItem[]) => {
  return items.filter(item => item.isVisible)
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
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
