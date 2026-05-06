<template>
  <!-- Grid View -->
  <div
    v-if="viewMode === 'grid'"
    class="menu-card transition-all duration-500 transform hover:scale-105 cursor-pointer"
    :style="{ animationDelay: `${index * 100}ms` }"
    @click="$emit('click')"
  >
    <UCard
      class="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-0 h-full flex flex-col"
      :class="{ 'opacity-50 pointer-events-none': !item.isAvailable }"
    >
      <template #header>
        <div class="relative overflow-hidden aspect-square">
          <img
            :src="imageUrl"
            class="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
            :alt="item.name"
            loading="lazy"
            decoding="async"
            @error="(e) => { const t = e.target as HTMLImageElement; if (t && !t.src.includes('foods.jpg')) t.src = '/images/food/foods.jpg' }"
          />

          <!-- Badges -->
          <div class="absolute top-3 left-3 flex flex-col gap-2">
            <UBadge
              v-if="!item.isAvailable"
              color="gray"
              variant="solid"
              class="font-semibold text-xs"
            >
              Sold Out
            </UBadge>
          </div>

          <!-- Dietary Icons -->
          <div class="absolute bottom-3 left-3 flex gap-1">
            <UBadge
              v-if="item.dietaryInfo?.isVegetarian"
              color="green"
              variant="subtle"
              class="text-xs flex items-center"
            >
              <UIcon name="i-heroicons-sparkles" class="w-3 h-3 mr-1" />
              V
            </UBadge>
            <UBadge
              v-if="item.dietaryInfo?.isVegan"
              color="emerald"
              variant="subtle"
              class="text-xs"
            >
              VG
            </UBadge>
            <UBadge
              v-if="item.dietaryInfo?.isGlutenFree"
              color="blue"
              variant="subtle"
              class="text-xs"
            >
              GF
            </UBadge>
          </div>
          <!-- Price Badge -->
          <div v-if="item.price && item.price > 0" class="absolute top-3 right-3">
            <UBadge color="yellow" variant="solid" class="font-bold text-sm">
              ${{ item.price }}
            </UBadge>
          </div>
        </div>
      </template>

      <div class="p-0 flex flex-col flex-grow">
        <h3
          class="text-lg font-semibold mb-2 line-clamp-2 flex-grow"
          :class="
            item.isAvailable
              ? 'text-gray-900 dark:text-white'
              : 'text-red-600 dark:text-red-400'
          "
        >
          {{ item.name }}
        </h3>
      </div>
    </UCard>
  </div>

  <!-- List View -->
  <div
    v-else
    class="menu-card transition-all duration-500 cursor-pointer"
    :style="{ animationDelay: `${index * 100}ms` }"
    @click="$emit('click')"
  >
    <UCard
      class="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-0"
      :class="{ 'opacity-50 pointer-events-none': !item.isAvailable }"
    >
      <div class="flex flex-col sm:flex-row">
        <!-- Image -->
        <div class="sm:w-48 relative overflow-hidden">
          <img
            :src="imageUrl"
            class="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
            :alt="item.name"
            loading="lazy"
            decoding="async"
            @error="(e) => { const t = e.target as HTMLImageElement; if (t && !t.src.includes('foods.jpg')) t.src = '/images/food/foods.jpg' }"
          />

          <!-- Badges -->
          <div class="absolute top-3 left-3 flex flex-col gap-2">
            <UBadge
              v-if="!item.isAvailable"
              color="gray"
              variant="solid"
              class="font-semibold text-xs"
            >
              Sold Out
            </UBadge>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 p-6">
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <h3
                class="text-xl font-bold mb-2"
                :class="
                  item.isAvailable
                    ? 'text-gray-900 dark:text-white'
                    : 'text-red-600 dark:text-red-400'
                "
              >
                {{ item.name }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {{ item.description }}
              </p>

              <!-- Dietary Info -->
              <div class="flex flex-wrap gap-2 mb-4">
                <UBadge
                  v-if="item.dietaryInfo?.isVegetarian"
                  color="green"
                  variant="subtle"
                  class="text-xs flex items-center"
                >
                  <UIcon name="i-heroicons-sparkles" class="w-3 h-3 mr-1" />
                  Vegetarian
                </UBadge>
                <UBadge
                  v-if="item.dietaryInfo?.isVegan"
                  color="emerald"
                  variant="subtle"
                  class="text-xs"
                >
                  Vegan
                </UBadge>
                <UBadge
                  v-if="item.dietaryInfo?.isGlutenFree"
                  color="blue"
                  variant="subtle"
                  class="text-xs"
                >
                  Gluten Free
                </UBadge>
              </div>

              <!-- Availability Status -->
              <div class="mb-4">
                <UBadge
                  :color="item.isAvailable ? 'green' : 'red'"
                  variant="solid"
                  class="text-sm"
                >
                  {{ item.isAvailable ? 'Available' : 'Not Available' }}
                </UBadge>
              </div>
            </div>

            <!-- Price and Action -->
            <div class="text-right ml-4">
              <p
                v-if="item.price && item.price > 0"
                class="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-4"
              >
                ${{ item.price }}
              </p>
              <UButton
                color="yellow"
                variant="solid"
                size="md"
                :disabled="!item.isAvailable"
              >
                View Details
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/types/menu'

const FALLBACK_IMAGE = '/images/food/foods.jpg'

const props = defineProps<{
  item: MenuItem
  viewMode: 'grid' | 'list'
  index: number
}>()

defineEmits<{
  click: []
}>()

const getImageUrl = (item: MenuItem): string => {
  if (item.images && Array.isArray(item.images) && item.images.length > 0) {
    const firstImage = item.images[0]
    if (firstImage && typeof firstImage === 'string' && firstImage.trim()) {
      return firstImage
    }
  }
  if (item.image && typeof item.image === 'string' && item.image.trim()) {
    return item.image
  }
  return FALLBACK_IMAGE
}

const imageUrl = computed(() => getImageUrl(props.item))
</script>
