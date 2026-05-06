<template>
  <UModal :model-value="modelValue" :ui="{ width: 'max-w-full sm:max-w-6xl' }" @update:model-value="$emit('update:modelValue', $event)">
    <div class="relative">
      <!-- Event Content -->
      <div v-if="event" class="max-h-[80vh] overflow-y-auto">
        <!-- Cinematic Hero Section with 16:9 aspect ratio -->
        <div
          class="relative aspect-video bg-black overflow-hidden flex items-center justify-center"
        >
          <!-- Blurred/Gradient background using current image -->
          <div class="absolute inset-0 z-0">
            <img
              :src="currentImage"
              :alt="event.title"
              class="w-full h-full object-cover blur-xl scale-110 opacity-60"
              loading="eager"
              decoding="async"
              @error="handleImageError"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            />
          </div>

          <!-- Centered 4:5 image -->
          <div class="relative z-10 flex items-center justify-center h-full w-full">
            <img
              :src="currentImage"
              :alt="event.title"
              class="shadow-2xl rounded-2xl object-cover bg-white/10"
              :style="{
                width: 'clamp(180px,60vw,360px)',
                height: 'clamp(220px,45vh,480px)',
                aspectRatio: '4/5',
                maxWidth: '90vw',
                maxHeight: '90vw'
              }"
              loading="eager"
              decoding="async"
              @error="handleImageError"
            />
          </div>

          <!-- Close Button -->
          <button
            class="absolute top-3 right-3 sm:top-6 sm:right-6 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md z-30"
            @click="close"
          >
            <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>

          <!-- Image Navigation for Multiple Images -->
          <div
            v-if="event.images && event.images.length > 1"
            class="absolute top-1/2 left-2 right-2 sm:left-8 sm:right-8 flex justify-between items-center transform -translate-y-1/2 z-20"
          >
            <button
              class="bg-black/60 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md"
              @click="previousImage"
            >
              <UIcon name="i-heroicons-chevron-left" class="w-6 h-6" />
            </button>
            <button
              class="bg-black/60 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md"
              @click="nextImage"
            >
              <UIcon name="i-heroicons-chevron-right" class="w-6 h-6" />
            </button>
          </div>

          <!-- Thumbnails Carousel -->
          <div
            v-if="event.images && event.images.length > 1"
            class="absolute bottom-2 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20"
          >
            <button
              v-for="(img, index) in event.images"
              :key="index"
              class="w-8 h-10 sm:w-12 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-lg"
              :class="
                index === currentImageIndex
                  ? 'border-yellow-500 scale-105'
                  : 'border-transparent opacity-70 hover:opacity-100'
              "
              @click="currentImageIndex = index"
            >
              <img
                :src="img"
                :alt="event.title"
                class="object-cover w-full h-full"
                loading="eager"
                decoding="async"
              />
            </button>
          </div>

          <!-- Status Badge -->
          <div class="absolute top-3 left-3 sm:top-6 sm:left-6 z-30">
            <div
              :class="[
                'px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg backdrop-blur-md',
                getStatusColor(event.status) === 'green'
                  ? 'bg-green-500/90 text-white'
                  : getStatusColor(event.status) === 'blue'
                  ? 'bg-blue-500/90 text-white'
                  : 'bg-gray-500/90 text-white'
              ]"
            >
              {{ getStatusLabel(event.status) }}
            </div>
          </div>
        </div>

        <!-- Event Content Section -->
        <div class="p-4 sm:p-8 bg-white dark:bg-gray-900 rounded-b-3xl shadow-2xl mt-[-2px]">
          <!-- Event Title -->
          <div class="mb-6">
            <h1
              class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2"
            >
              {{ event.title }}
            </h1>
            <p
              v-if="event.date"
              class="text-lg text-yellow-600 dark:text-yellow-400 font-medium"
            >
              {{ formatEventDateRange(event.date, event.endDate || '') }}
            </p>
          </div>

          <!-- Event Description -->
          <div
            v-if="event.description || event.fullDescription"
            class="prose prose-lg dark:prose-invert max-w-none mb-6 sm:mb-8"
          >
            <div
              v-html="
                formatEventContent(event.fullDescription || event.description)
              "
            />
          </div>

          <!-- Event Details Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Date -->
            <div v-if="event.date" class="flex items-start space-x-4">
              <div
                class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0"
              >
                <UIcon
                  name="i-heroicons-calendar"
                  class="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                />
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-900 dark:text-white text-lg">Event Date</p>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ formatEventDateRange(event.date, event.endDate || '') }}
                </p>
              </div>
            </div>

            <!-- Time -->
            <div v-if="event.time" class="flex items-start space-x-4">
              <div
                class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0"
              >
                <UIcon
                  name="i-heroicons-clock"
                  class="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                />
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-900 dark:text-white text-lg">Time</p>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ event.time.replace(/\s*\/?\s*\b(EST|EDT)\b\s*/g, '').trim() }}
                </p>
              </div>
            </div>

            <!-- Location -->
            <div v-if="event.location" class="flex items-start space-x-4">
              <div
                class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0"
              >
                <UIcon
                  name="i-heroicons-map-pin"
                  class="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                />
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-900 dark:text-white text-lg">Location</p>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ event.location }}
                </p>
              </div>
            </div>

            <!-- Price -->
            <div v-if="event.price" class="flex items-start space-x-4">
              <div
                class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0"
              >
                <UIcon
                  name="i-heroicons-currency-dollar"
                  class="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                />
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-900 dark:text-white text-lg">Entry Fee</p>
                <p class="text-gray-600 dark:text-gray-400">Free for all</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div
            class="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700 gap-4"
          >
            <div class="flex items-center space-x-4 text-gray-600 dark:text-gray-400" />

            <div class="flex space-x-3">
              <UButton
                color="yellow"
                variant="solid"
                size="lg"
                class="shadow-lg"
                @click="shareEvent"
              >
                <UIcon name="i-heroicons-share" class="w-5 h-5 mr-2" />
                Share Event
              </UButton>
              <UButton
                color="gray"
                variant="outline"
                size="lg"
                class="shadow-lg"
                @click="addToCalendar"
              >
                <UIcon name="i-heroicons-calendar" class="w-5 h-5 mr-2" />
                Add to Calendar
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { DateTime } from 'luxon'
import DOMPurify from 'isomorphic-dompurify'

interface Event {
  id: string | number
  title: string
  description: string
  fullDescription?: string
  date: string
  startDate?: string
  endDate?: string
  startDateTime?: string
  endDateTime?: string
  time?: string
  image?: string
  images?: string[]
  location?: string
  status: 'upcoming' | 'current' | 'ended'
  featured?: boolean
  venue?: {
    name: string
    capacity?: number
    layout?: string
  }
  price?: {
    general?: number
    vip?: number
    student?: number
  }
  tags?: string[]
  contactInfo?: {
    phone?: string
    email?: string
  }
  ctaLink?: string
  ctaText?: string
}

const props = defineProps<{
  modelValue: boolean
  event: Event | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const currentImageIndex = ref(0)

// Reset image index when event changes
watch(() => props.event, () => {
  currentImageIndex.value = 0
})

const currentImage = computed(() => {
  const event = props.event
  if (!event) {
    return '/images/entertainment/eventDefault.jpg'
  }
  if (!event.images || event.images.length === 0) {
    return event.image && event.image !== ''
      ? event.image
      : '/images/entertainment/eventDefault.jpg'
  }
  if (event.images.length === 1) {
    return event.images[0] || '/images/entertainment/eventDefault.jpg'
  }
  return event.images[currentImageIndex.value] || '/images/entertainment/eventDefault.jpg'
})

const close = () => {
  emit('update:modelValue', false)
}

const previousImage = () => {
  const event = props.event
  if (event?.images && event.images.length > 1) {
    currentImageIndex.value = currentImageIndex.value === 0
      ? event.images.length - 1
      : currentImageIndex.value - 1
  }
}

const nextImage = () => {
  const event = props.event
  if (event?.images && event.images.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % event.images.length
  }
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    upcoming: 'green',
    current: 'blue',
    ended: 'gray'
  }
  return colors[status] || 'gray'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    upcoming: 'Upcoming',
    current: 'Now Live',
    ended: 'Past Event'
  }
  return labels[status] || status
}

const formatEventDateRange = (startDate: string, endDate: string) => {
  if (!startDate) {
    return ''
  }

  try {
    const start = DateTime.fromISO(startDate, { zone: 'America/Toronto' })

    if (!endDate || endDate === startDate) {
      return start.toFormat('yyyy-MM-dd (cccc)')
    }

    const end = DateTime.fromISO(endDate, { zone: 'America/Toronto' })
    return `${start.toFormat('yyyy-MM-dd (cccc)')} to ${end.toFormat('yyyy-MM-dd (cccc)')}`
  } catch (error) {
    console.error('Date range formatting error:', error)
    return startDate + (endDate && endDate !== startDate ? ` to ${endDate}` : '')
  }
}

const formatEventContent = (content: string) => {
  if (!content) {
    return ''
  }
  return DOMPurify.sanitize(content.replace(/\n/g, '<br>'))
}

const handleImageError = (event: any) => {
  if (event.target && !event.target.src.includes('/images/entertainment/eventDefault.jpg')) {
    event.target.src = '/images/entertainment/eventDefault.jpg'
  }
}

const addToCalendar = () => {
  if (!props.event) {
    return
  }

  const event = props.event
  const startDate = new Date(event.date || '')
  const endDate = event.endDate
    ? new Date(event.endDate)
    : new Date(startDate.getTime() + 2 * 60 * 60 * 1000)

  const formatDateForCalendar = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&dates=${formatDateForCalendar(startDate)}/${formatDateForCalendar(
    endDate
  )}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(
    event.location || 'The Pearson Pub, Whitby'
  )}`

  window.open(calendarUrl, '_blank')
}

const shareEvent = async () => {
  if (!props.event) {
    return
  }

  const shareData = {
    title: `${props.event.title} - The Pearson Pub`,
    text: props.event.description,
    url: window.location.origin + '/events'
  }

  try {
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData)
    } else {
      await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
    }
  } catch (err) {
    if (process.dev) console.log('Error sharing:', err)
    try {
      await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
    } catch (clipboardErr) {
      if (process.dev) console.log('Clipboard fallback failed:', clipboardErr)
    }
  }
}
</script>
