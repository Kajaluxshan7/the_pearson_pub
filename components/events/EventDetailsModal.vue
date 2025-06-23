<template>
  <UModal
    :model-value="isOpen"
    @update:model-value="(val: boolean) => emit('update:isOpen', val)"
    class="z-50"
  >
    <UCard v-if="event" class="max-w-4xl mx-auto">
      <template #header>
        <div class="relative overflow-hidden rounded-t-lg">
          <!-- Image Carousel for Multiple Images -->
          <template v-if="event.images && event.images.length > 1">
            <div class="relative w-full h-80">
              <NuxtImg
                v-for="(img, idx) in event.images"
                :key="img"
                v-show="carouselIndex === idx"
                :src="img"
                class="w-full h-80 object-cover absolute top-0 left-0 transition-opacity duration-500"
                :alt="event.title + ' image ' + (idx + 1)"
                format="webp"
                quality="80"
              />
              
              <!-- Navigation arrows -->
              <button
                v-if="event.images.length > 1"
                @click="previousImage"
                class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
              </button>
              <button
                v-if="event.images.length > 1"
                @click="nextImage"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
              </button>
              
              <!-- Dots indicator -->
              <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                <button
                  v-for="(img, idx) in event.images"
                  :key="idx"
                  @click="carouselIndex = idx"
                  :class="[
                    'w-2 h-2 rounded-full transition-colors',
                    carouselIndex === idx ? 'bg-white' : 'bg-white/50'
                  ]"
                />
              </div>
            </div>
          </template>
          
          <!-- Single Image -->
          <template v-else>
            <NuxtImg
              :src="event.image || '/images/entertainment/music.jpg'"
              class="w-full h-80 object-cover"
              :alt="event.title"
              format="webp"
              quality="80"
            />
          </template>

          <!-- Event Status Badge -->
          <div class="absolute top-4 left-4">
            <UBadge
              :color="getStatusColor(event.status)"
              variant="solid"
              class="font-semibold"
            >
              {{ event.status.charAt(0).toUpperCase() + event.status.slice(1) }}
            </UBadge>
          </div>

          <!-- Featured Badge -->
          <div v-if="event.featured" class="absolute top-4 right-4">
            <UBadge color="yellow" variant="solid" class="font-semibold">
              Featured
            </UBadge>
          </div>
        </div>
      </template>

      <div class="p-6 space-y-6">
        <!-- Event Header -->
        <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
          <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            <div class="flex-1">
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {{ event.title }}
              </h2>
              <UBadge
                :color="getCategoryColor(event.category)"
                variant="subtle"
                class="mb-4"
              >
                {{ event.category.charAt(0).toUpperCase() + event.category.slice(1) }}
              </UBadge>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ event.fullDescription || event.description }}
              </p>
            </div>

            <!-- Price Info -->
            <div v-if="event.price" class="text-right">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">From</p>
              <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                ${{ minPrice(event.price) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Event Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Date & Time -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Date & Time
            </h3>
            <div class="space-y-2">
              <div class="flex items-center text-gray-600 dark:text-gray-300">
                <UIcon name="i-heroicons-calendar" class="w-5 h-5 mr-3 text-yellow-600" />
                <span>{{ event.date }}</span>
              </div>
              <div class="flex items-center text-gray-600 dark:text-gray-300">
                <UIcon name="i-heroicons-clock" class="w-5 h-5 mr-3 text-yellow-600" />
                <span>{{ event.time }}</span>
              </div>
              <div v-if="event.location" class="flex items-center text-gray-600 dark:text-gray-300">
                <UIcon name="i-heroicons-map-pin" class="w-5 h-5 mr-3 text-yellow-600" />
                <span>{{ event.location }}</span>
              </div>
            </div>
          </div>

          <!-- Event Info -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Event Details
            </h3>
            <div class="space-y-2">
              <div v-if="event.ageRestriction" class="flex items-center text-gray-600 dark:text-gray-300">
                <UIcon name="i-heroicons-identification" class="w-5 h-5 mr-3 text-yellow-600" />
                <span>{{ event.ageRestriction }}</span>
              </div>
              <div v-if="event.venue" class="flex items-center text-gray-600 dark:text-gray-300">
                <UIcon name="i-heroicons-users" class="w-5 h-5 mr-3 text-yellow-600" />
                <span>Capacity: {{ event.venue.capacity }}</span>
              </div>
              <div v-if="event.ticketsAvailable" class="flex items-center text-gray-600 dark:text-gray-300">
                <UIcon name="i-heroicons-ticket" class="w-5 h-5 mr-3 text-yellow-600" />
                <span>{{ event.ticketsAvailable }} tickets available</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Performers -->
        <div v-if="event.performers && event.performers.length > 0" class="space-y-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Performers
          </h3>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="performer in event.performers"
              :key="performer"
              color="blue"
              variant="subtle"
            >
              {{ performer }}
            </UBadge>
          </div>
        </div>

        <!-- Tags -->
        <div v-if="event.tags && event.tags.length > 0" class="space-y-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Tags
          </h3>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="tag in event.tags"
              :key="tag"
              color="gray"
              variant="subtle"
            >
              {{ tag }}
            </UBadge>
          </div>
        </div>

        <!-- Special Requirements -->
        <div v-if="event.specialRequirements && event.specialRequirements.length > 0" class="space-y-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Special Requirements
          </h3>
          <ul class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
            <li v-for="requirement in event.specialRequirements" :key="requirement">
              {{ requirement }}
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div v-if="event.contactInfo" class="space-y-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Contact Information
          </h3>
          <div class="space-y-2">
            <div v-if="event.contactInfo.phone" class="flex items-center text-gray-600 dark:text-gray-300">
              <UIcon name="i-heroicons-phone" class="w-5 h-5 mr-3 text-yellow-600" />
              <a :href="`tel:${event.contactInfo.phone}`" class="hover:text-yellow-600">
                {{ event.contactInfo.phone }}
              </a>
            </div>
            <div v-if="event.contactInfo.email" class="flex items-center text-gray-600 dark:text-gray-300">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 mr-3 text-yellow-600" />
              <a :href="`mailto:${event.contactInfo.email}`" class="hover:text-yellow-600">
                {{ event.contactInfo.email }}
              </a>
            </div>
          </div>
        </div>

        <!-- Reviews Summary -->
        <div v-if="event.averageRating" class="space-y-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Reviews
          </h3>
          <div class="flex items-center gap-3">
            <div class="flex items-center">
              <UIcon
                v-for="star in 5"
                :key="star"
                name="i-heroicons-star-solid"
                :class="star <= Math.floor(event.averageRating) ? 'text-yellow-400' : 'text-gray-300'"
                class="w-5 h-5"
              />
            </div>
            <span class="text-gray-600 dark:text-gray-300">
              {{ event.averageRating.toFixed(1) }} out of 5 ({{ event.totalReviews }} reviews)
            </span>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex flex-col sm:flex-row justify-end gap-3">
          <UButton color="gray" variant="outline" @click="closeModal">
            Close
          </UButton>
          <UButton
            v-if="event.ctaLink"
            :to="event.ctaLink"
            color="yellow"
            variant="solid"
            @click="closeModal"
          >
            {{ event.ctaText || 'Book Now' }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import type { Event } from '~/types/events'

const props = defineProps<{
  event: Event | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  'update:isOpen': [boolean]
}>()

const carouselIndex = ref(0)
let carouselInterval: any = null

const closeModal = () => {
  emit('update:isOpen', false)
  emit('close')
  if (carouselInterval) {
    clearInterval(carouselInterval)
    carouselInterval = null
  }
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'upcoming': return 'blue'
    case 'ongoing': return 'green'
    case 'completed': return 'gray'
    case 'cancelled': return 'red'
    default: return 'gray'
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'music': return 'purple'
    case 'quiz': return 'blue'
    case 'food': return 'orange'
    case 'special': return 'yellow'
    case 'entertainment': return 'green'
    default: return 'gray'
  }
}

// Auto-play carousel
watch(() => props.isOpen, (isOpen) => {
  if (isOpen && props.event?.images && props.event.images.length > 1) {
    carouselIndex.value = 0
    carouselInterval = setInterval(nextImage, 4000)
  } else if (carouselInterval) {
    clearInterval(carouselInterval)
    carouselInterval = null
  }
})

onUnmounted(() => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
})

function minPrice(priceObj: Record<string, number | undefined | null>): string {
  const prices = Object.values(priceObj).filter((p): p is number => typeof p === 'number' && !isNaN(p))
  if (!prices.length) return '-';
  return Math.min(...prices).toFixed(2)
}
</script>
