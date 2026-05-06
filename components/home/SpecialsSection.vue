<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { TimezoneUtil } from '~/utils/timezone'

interface SpecialTab {
  id: string
  title: string
  specialType: string
  specials?: any[]
  subtitle?: string
  description?: string
  images?: string[]
  price?: number | string
  dayName?: string
  [key: string]: any
}

const props = defineProps<{
  tabs: SpecialTab[]
  menuCategories: any[]
}>()

const activeSpecialTab = ref('daily-special')
const currentImageIndex = ref(0)
let specialSwapInterval: ReturnType<typeof setInterval> | null = null
let imageSwapInterval: ReturnType<typeof setInterval> | null = null

const selectedTab = computed(() => {
  return props.tabs.find(tab => tab.id === activeSpecialTab.value) || null
})

const currentImage = computed(() => {
  const images = selectedTab.value?.images
  if (!images?.length) return '/images/food/default.jpg'
  return images[currentImageIndex.value] || images[0]
})

function isSeasonalAvailable(startDate: string, endDate: string): boolean {
  if (!startDate || !endDate) return false
  const now = new Date()
  return now >= new Date(startDate) && now <= new Date(endDate)
}

const previousSpecialImage = () => {
  const images = selectedTab.value?.images
  if (!images?.length || images.length <= 1) return
  currentImageIndex.value = currentImageIndex.value === 0 ? images.length - 1 : currentImageIndex.value - 1
}

const nextSpecialImage = () => {
  const images = selectedTab.value?.images
  if (!images?.length || images.length <= 1) return
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length
}

const startSpecialRotation = () => {
  stopSpecialRotation()
  if (props.tabs.length > 1) {
    specialSwapInterval = setInterval(() => {
      const currentTabIndex = props.tabs.findIndex(tab => tab.id === activeSpecialTab.value)
      const nextTabIndex = (currentTabIndex + 1) % props.tabs.length
      activeSpecialTab.value = props.tabs[nextTabIndex].id
    }, 12000)
  }
}

const startImageRotation = () => {
  stopImageRotation()
  const images = selectedTab.value?.images
  if (images?.length && images.length > 1) {
    imageSwapInterval = setInterval(() => {
      const currentImages = selectedTab.value?.images
      if (currentImages?.length && currentImages.length > 1) {
        currentImageIndex.value = (currentImageIndex.value + 1) % currentImages.length
      }
    }, 2000)
  }
}

const stopSpecialRotation = () => {
  if (specialSwapInterval) { clearInterval(specialSwapInterval); specialSwapInterval = null }
}

const stopImageRotation = () => {
  if (imageSwapInterval) { clearInterval(imageSwapInterval); imageSwapInterval = null }
}

const goToMenuCategory = () => {
  try {
    const currentDay = TimezoneUtil.nowToronto()
      .toJSDate()
      .toLocaleDateString('en-US', { weekday: 'long', timeZone: 'America/Toronto' })
      .toLowerCase()
    let matchedCategory = null
    if (props.menuCategories && Array.isArray(props.menuCategories)) {
      for (const category of props.menuCategories) {
        if (category.name.toLowerCase().includes(currentDay)) {
          matchedCategory = category.id
          break
        }
      }
    }
    if (matchedCategory) {
      navigateTo(`/menu?category=${matchedCategory}`)
    } else {
      navigateTo(`/menu?day=${currentDay}`)
    }
  } catch {
    navigateTo('/menu')
  }
}

watch(activeSpecialTab, () => {
  currentImageIndex.value = 0
  nextTick(() => startImageRotation())
})

watch(() => props.tabs, (tabs) => {
  if (tabs.length > 0 && !tabs.find(tab => tab.id === activeSpecialTab.value)) {
    activeSpecialTab.value = tabs[0].id
  }
  stopSpecialRotation()
  stopImageRotation()
  currentImageIndex.value = 0
  nextTick(() => {
    startSpecialRotation()
    startImageRotation()
  })
}, { deep: true })

onMounted(() => {
  startSpecialRotation()
  startImageRotation()
})

onUnmounted(() => {
  stopSpecialRotation()
  stopImageRotation()
})
</script>

<template>
  <section
    v-if="tabs.length > 0"
    id="specials"
    class="specials section py-20 bg-gradient-to-br from-gray-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Specials Title -->
      <div class="mb-16 text-center" data-aos="fade-up">
        <div class="inline-block mb-4">
          <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase">
            Chef's Recommendations
          </span>
          <div class="w-16 h-1 bg-yellow-500 mx-auto mt-2" />
        </div>
        <h2 class="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white font-serif">
          Today's <span class="text-yellow-600 dark:text-yellow-400">Specials</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Discover our handcrafted daily selections, featuring the finest seasonal ingredients
          and chef's special creations
        </p>
      </div>

      <!-- Detailed View for Selected Special -->
      <transition name="fade" mode="out-in">
        <div
          v-if="selectedTab"
          :key="selectedTab.id"
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <!-- Image Gallery -->
            <div class="relative">
              <div class="aspect-[4/5] lg:aspect-[3/4] relative overflow-hidden">
                <template v-if="selectedTab.images && selectedTab.images.length > 1">
                  <div
                    v-for="(img, idx) in selectedTab.images"
                    v-show="currentImageIndex === idx"
                    :key="img"
                    class="absolute inset-0"
                  >
                    <NuxtImg
                      :src="img"
                      :alt="`${selectedTab.title} image ${idx + 1}`"
                      class="w-full h-full object-cover transition-opacity duration-500"
                      format="webp"
                      quality="90"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>

                  <!-- Navigation Controls -->
                  <div class="absolute inset-0 flex items-center justify-between p-4">
                    <button
                      class="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                      aria-label="Previous image"
                      @click="previousSpecialImage"
                    >
                      <UIcon name="i-heroicons-chevron-left" class="w-6 h-6" />
                    </button>
                    <button
                      class="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                      aria-label="Next image"
                      @click="nextSpecialImage"
                    >
                      <UIcon name="i-heroicons-chevron-right" class="w-6 h-6" />
                    </button>
                  </div>

                  <!-- Image Indicators -->
                  <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <button
                      v-for="(img, idx) in selectedTab.images"
                      :key="idx"
                      :class="[
                        'w-3 h-3 rounded-full transition-all',
                        currentImageIndex === idx
                          ? 'bg-yellow-500 scale-125'
                          : 'bg-white/60 hover:bg-white/80'
                      ]"
                      :aria-label="`View image ${idx + 1}`"
                      @click="currentImageIndex = idx"
                    />
                  </div>
                </template>
                <template v-else>
                  <NuxtImg
                    :src="currentImage"
                    :alt="selectedTab.title"
                    class="w-full h-full object-cover"
                    format="webp"
                    quality="90"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </template>
              </div>
            </div>

            <!-- Content Area -->
            <div class="p-8 lg:p-12 flex flex-col justify-center">
              <div class="space-y-6">
                <!-- Special Type Badge -->
                <div>
                  <span
                    :class="[
                      'inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide',
                      selectedTab.specialType === 'daily'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : selectedTab.specialType === 'seasonal'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    ]"
                  >
                    {{ selectedTab.specialType }} Special
                  </span>
                </div>

                <!-- Title -->
                <h3
                  :class="[
                    'text-3xl lg:text-4xl font-bold leading-tight flex items-center gap-3',
                    selectedTab.specialType === 'seasonal'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-900 dark:text-white'
                  ]"
                >
                  {{ selectedTab.title }}
                  <span
                    v-if="
                      selectedTab.specialType === 'seasonal' &&
                      'specials' in selectedTab &&
                      selectedTab.specials &&
                      selectedTab.specials.length > 0
                    "
                    :class="[
                      'inline-block px-3 py-1 rounded-full text-xs font-semibold',
                      isSeasonalAvailable(
                        selectedTab.specials[0].seasonal_start_datetime,
                        selectedTab.specials[0].seasonal_end_datetime
                      )
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    ]"
                  >
                    {{
                      isSeasonalAvailable(
                        selectedTab.specials[0].seasonal_start_datetime,
                        selectedTab.specials[0].seasonal_end_datetime
                      )
                        ? 'Available Now'
                        : 'Coming Soon'
                    }}
                  </span>
                </h3>

                <!-- Description -->
                <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {{ selectedTab.description }}
                </p>

                <!-- Day Name for Daily Specials -->
                <div
                  v-if="selectedTab.specialType === 'daily' && selectedTab.dayName"
                  class="flex items-center space-x-2 text-blue-600 dark:text-blue-400"
                >
                  <UIcon name="i-heroicons-calendar" class="w-5 h-5" />
                  <span class="font-medium">Available on {{ selectedTab.dayName }}s</span>
                </div>

                <!-- Price -->
                <div
                  v-if="selectedTab && 'price' in selectedTab && selectedTab.price"
                  class="text-3xl font-bold text-yellow-600 dark:text-yellow-400"
                >
                  ${{ selectedTab.price }}
                </div>

                <!-- Call to Action -->
                <div class="pt-4">
                  <UButton
                    color="yellow"
                    size="lg"
                    class="w-full sm:w-auto"
                    @click="goToMenuCategory"
                  >
                    <UIcon name="i-heroicons-eye" class="w-5 h-5 mr-2" />
                    View Full Menu
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Navigation Dots -->
      <div class="flex justify-center mt-12">
        <div class="flex space-x-3">
          <button
            v-for="tab in tabs"
            :key="`dot-${tab.id}`"
            :class="[
              'transition-all duration-300 rounded-full',
              activeSpecialTab === tab.id
                ? 'w-8 h-3 bg-yellow-500'
                : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-yellow-400'
            ]"
            :aria-label="`Go to ${tab.title}`"
            @click="activeSpecialTab = tab.id"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
