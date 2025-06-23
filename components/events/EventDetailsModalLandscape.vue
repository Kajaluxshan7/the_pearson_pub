<template>
  <UModal
    :model-value="isOpen"
    @update:model-value="handleClose"
    :ui="{
      width: 'w-full max-w-7xl',
      height: 'h-full max-h-[90vh]',
      background: 'bg-white dark:bg-gray-900',
      rounded: 'rounded-xl',
      shadow: 'shadow-2xl'
    }"
    :prevent-close="false"
    class="z-50"
  >
    <UCard v-if="event" class="h-full overflow-hidden">
      <!-- Landscape Header with Image and Basic Info -->
      <template #header>
        <div class="relative h-80 sm:h-96 overflow-hidden rounded-t-xl">
          <!-- Main Image Display -->
          <div class="relative w-full h-full">
            <!-- Image Carousel for Multiple Images -->
            <template v-if="event.images && event.images.length > 1">
              <div class="relative w-full h-full">
                <NuxtImg
                  v-for="(img, idx) in event.images"
                  :key="img"
                  v-show="carouselIndex === idx"
                  :src="img"
                  :alt="`${event.title} image ${idx + 1}`"
                  class="w-full h-full object-cover absolute inset-0 transition-opacity duration-500"
                  format="webp"
                  quality="85"
                />
                
                <!-- Navigation arrows -->
                <button
                  v-if="event.images.length > 1"
                  @click="previousImage"
                  class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <UIcon name="i-heroicons-chevron-left" class="w-6 h-6" />
                </button>
                <button
                  v-if="event.images.length > 1"
                  @click="nextImage"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <UIcon name="i-heroicons-chevron-right" class="w-6 h-6" />
                </button>
                
                <!-- Dots indicator -->
                <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  <button
                    v-for="(img, idx) in event.images"
                    :key="idx"
                    @click="carouselIndex = idx"
                    :class="[
                      'w-3 h-3 rounded-full transition-all duration-200',
                      carouselIndex === idx ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'
                    ]"
                    :aria-label="`View image ${idx + 1}`"
                  />
                </div>
              </div>
            </template>
            
            <!-- Single Image -->
            <template v-else>
              <NuxtImg
                :src="event.image || '/images/entertainment/music.jpg'"
                :alt="event.title"
                class="w-full h-full object-cover"
                format="webp"
                quality="85"
              />
            </template>

            <!-- Overlay Gradient -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

            <!-- Event Info Overlay -->
            <div class="absolute inset-0 flex items-end">
              <div class="p-6 sm:p-8 text-white w-full">
                <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div class="flex-1">
                    <!-- Badges -->
                    <div class="flex flex-wrap gap-2 mb-4">
                      <UBadge
                        v-if="event.featured"
                        color="yellow"
                        variant="solid"
                        class="font-semibold"
                      >
                        <UIcon name="i-heroicons-star" class="w-4 h-4 mr-1" />
                        Featured
                      </UBadge>
                      <UBadge
                        :color="getStatusColor(event.status)"
                        variant="solid"
                        class="font-semibold"
                      >
                        {{ formatStatus(event.status) }}
                      </UBadge>
                      <UBadge
                        :color="getCategoryColor(event.category)"
                        variant="subtle"
                        class="font-semibold"
                      >
                        {{ formatCategory(event.category) }}
                      </UBadge>
                    </div>

                    <!-- Title and Description -->
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                      {{ event.title }}
                    </h1>
                    <p class="text-lg sm:text-xl text-gray-200 mb-4 line-clamp-2">
                      {{ event.description }}
                    </p>

                    <!-- Quick Info -->
                    <div class="flex flex-wrap gap-4 text-sm">
                      <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-calendar" class="w-5 h-5 text-yellow-400" />
                        <span class="font-medium">{{ event.date }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-clock" class="w-5 h-5 text-yellow-400" />
                        <span class="font-medium">{{ event.time }}</span>
                      </div>
                      <div v-if="event.location" class="flex items-center gap-2">
                        <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-yellow-400" />
                        <span class="font-medium">{{ event.location }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Price and CTA -->
                  <div v-if="event.price" class="text-right">
                    <p class="text-sm text-gray-300 mb-1">From</p>
                    <p class="text-3xl font-bold text-yellow-400 mb-3">
                      ${{ minPrice(event.price) }}
                    </p>
                    <UButton
                      v-if="event.ctaLink"
                      :to="event.ctaLink"
                      color="yellow"
                      variant="solid"
                      size="lg"
                      class="min-w-[120px]"
                      @click="handleClose"
                    >
                      {{ event.ctaText || 'Book Now' }}
                    </UButton>
                  </div>
                </div>
              </div>
            </div>

            <!-- Close Button -->
            <button
              @click="handleClose"
              class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label="Close modal"
            >
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </template>

      <!-- Scrollable Content Area -->
      <div class="p-6 sm:p-8 max-h-[calc(90vh-400px)] overflow-y-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Full Description -->
            <section v-if="event.fullDescription || event.description">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About This Event
              </h2>
              <div class="prose prose-gray dark:prose-invert max-w-none">
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {{ event.fullDescription || event.description }}
                </p>
              </div>
            </section>

            <!-- Performers -->
            <section v-if="event.performers && event.performers.length > 0">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Performers
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="performer in event.performers"
                  :key="performer"
                  class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <UIcon name="i-heroicons-microphone" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900 dark:text-white">{{ performer }}</h3>
                      <p class="text-sm text-gray-600 dark:text-gray-300">Performer</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Tags -->
            <section v-if="event.tags && event.tags.length > 0">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Tags
              </h2>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="tag in event.tags"
                  :key="tag"
                  color="gray"
                  variant="subtle"
                  class="text-sm"
                >
                  {{ tag }}
                </UBadge>
              </div>
            </section>

            <!-- Reviews Summary -->
            <section v-if="event.averageRating && event.totalReviews">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Reviews
              </h2>
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div class="flex items-center gap-4 mb-4">
                  <div class="text-center">
                    <div class="text-3xl font-bold text-gray-900 dark:text-white">
                      {{ event.averageRating.toFixed(1) }}
                    </div>
                    <div class="flex items-center justify-center">
                      <UIcon
                        v-for="star in 5"
                        :key="star"
                        name="i-heroicons-star-solid"
                        :class="star <= Math.floor(event.averageRating) ? 'text-yellow-400' : 'text-gray-300'"
                        class="w-5 h-5"
                      />
                    </div>
                  </div>
                  <div>
                    <p class="text-lg font-semibold text-gray-900 dark:text-white">
                      Excellent
                    </p>
                    <p class="text-gray-600 dark:text-gray-300">
                      Based on {{ event.totalReviews }} reviews
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Event Details Card -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Event Details
              </h3>
              
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <UIcon name="i-heroicons-calendar" class="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{{ event.date }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ event.time }}</p>
                  </div>
                </div>
                
                <div v-if="event.location" class="flex items-start gap-3">
                  <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{{ event.location }}</p>
                    <p v-if="event.venue" class="text-sm text-gray-600 dark:text-gray-300">
                      Capacity: {{ event.venue.capacity }}
                    </p>
                  </div>
                </div>
                
                <div v-if="event.ageRestriction" class="flex items-start gap-3">
                  <UIcon name="i-heroicons-identification" class="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">Age Restriction</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ event.ageRestriction }}</p>
                  </div>
                </div>
                
                <div v-if="event.ticketsAvailable" class="flex items-start gap-3">
                  <UIcon name="i-heroicons-ticket" class="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">Tickets Available</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ event.ticketsAvailable }} remaining</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pricing Card -->
            <div v-if="event.price" class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Ticket Prices
              </h3>
              <div class="space-y-3">
                <div v-for="(price, type) in event.price" :key="type" class="flex justify-between items-center">
                  <span class="capitalize text-gray-700 dark:text-gray-300">{{ type }}</span>
                  <span class="font-bold text-lg text-gray-900 dark:text-white">${{ price }}</span>
                </div>
              </div>
            </div>

            <!-- Contact Card -->
            <div v-if="event.contactInfo" class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h3>
              <div class="space-y-3">
                <div v-if="event.contactInfo.phone" class="flex items-center gap-3">
                  <UIcon name="i-heroicons-phone" class="w-5 h-5 text-yellow-600" />
                  <a 
                    :href="`tel:${event.contactInfo.phone}`" 
                    class="text-gray-700 dark:text-gray-300 hover:text-yellow-600 transition-colors"
                  >
                    {{ event.contactInfo.phone }}
                  </a>
                </div>
                <div v-if="event.contactInfo.email" class="flex items-center gap-3">
                  <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-yellow-600" />
                  <a 
                    :href="`mailto:${event.contactInfo.email}`" 
                    class="text-gray-700 dark:text-gray-300 hover:text-yellow-600 transition-colors"
                  >
                    {{ event.contactInfo.email }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Special Requirements -->
            <div v-if="event.specialRequirements && event.specialRequirements.length > 0" class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Important Information
              </h3>
              <ul class="space-y-2">
                <li 
                  v-for="requirement in event.specialRequirements" 
                  :key="requirement"
                  class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <UIcon name="i-heroicons-information-circle" class="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  {{ requirement }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted, computed } from 'vue'
import type { Event } from '~/types/events'

// Props and emits
const props = defineProps<{
  event: Event | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  'update:isOpen': [boolean]
}>()

// Carousel state
const carouselIndex = ref(0)
let carouselInterval: any = null

// Methods
const handleClose = () => {
  emit('update:isOpen', false)
  emit('close')
  stopCarousel()
}

const nextImage = () => {
  if (props.event?.images && props.event.images.length > 1) {
    carouselIndex.value = (carouselIndex.value + 1) % props.event.images.length
  }
}

const previousImage = () => {
  if (props.event?.images && props.event.images.length > 1) {
    carouselIndex.value = carouselIndex.value === 0
      ? props.event.images.length - 1
      : carouselIndex.value - 1
  }
}

const stopCarousel = () => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
    carouselInterval = null
  }
}

const startCarousel = () => {
  if (props.event?.images && props.event.images.length > 1) {
    carouselIndex.value = 0
    carouselInterval = setInterval(nextImage, 5000)
  }
}

// Helper functions
const getStatusColor = (status: string) => {
  const colors = {
    upcoming: 'blue',
    ongoing: 'green',
    completed: 'gray',
    cancelled: 'red'
  } as const
  return colors[status as keyof typeof colors] || 'gray'
}

const getCategoryColor = (category: string) => {
  const colors = {
    music: 'purple',
    quiz: 'blue',
    food: 'orange',
    special: 'yellow',
    entertainment: 'green'
  } as const
  return colors[category as keyof typeof colors] || 'gray'
}

const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatCategory = (category: string) => {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

const minPrice = computed(() => {
  if (!props.event?.price) return '0'
  const prices = Object.values(props.event.price).filter((p): p is number => 
    typeof p === 'number' && !isNaN(p)
  )
  return prices.length > 0 ? Math.min(...prices).toFixed(2) : '0'
})

// Watchers
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    startCarousel()
  } else {
    stopCarousel()
  }
})

// Cleanup
onUnmounted(() => {
  stopCarousel()
})

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (!props.isOpen) return
  
  switch (event.key) {
    case 'Escape':
      handleClose()
      break
    case 'ArrowLeft':
      previousImage()
      break
    case 'ArrowRight':
      nextImage()
      break
  }
}

// Add keyboard listeners when modal is open
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for content area */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background-color: rgb(243 244 246);
}

.dark .overflow-y-auto::-webkit-scrollbar-track {
  background-color: rgb(31 41 55);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgb(209 213 219);
  border-radius: 9999px;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgb(75 85 99);
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgb(156 163 175);
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgb(107 114 128);
}
</style>
