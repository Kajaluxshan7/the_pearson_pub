<script setup lang="ts">
interface Stat {
  id: string
  label: string
  value: number | string
  icon: string
  color: string
  bgColor: string
}

interface SiteInfo {
  name: string
  description?: string
  phone?: string
}

defineProps<{
  statistics: Stat[]
  siteInfo: SiteInfo
  isVisible: boolean
}>()

const aboutRef = ref<HTMLElement | null>(null)

defineExpose({ aboutRef })
</script>

<template>
  <section
    ref="aboutRef"
    class="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
    :class="{ 'animate-fade-in-up': isVisible }"
  >
    <!-- Decorative Background -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-yellow-500" />
      <div class="absolute bottom-10 right-10 w-48 h-48 rounded-full border border-yellow-300" />
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div
          class="space-y-8"
          :class="{ 'animate-fade-in-left': isVisible }"
          style="animation-delay: 200ms"
        >
          <div class="inline-block">
            <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase">
              Our Story
            </span>
            <div class="w-16 h-1 bg-yellow-500 mt-2" />
          </div>

          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            A Local Landmark
            <span class="text-yellow-600 dark:text-yellow-400">Since Day One</span>
          </h2>

          <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ siteInfo?.description || 'A cozy neighborhood pub offering great food, drinks, and entertainment.' }}
          </p>

          <div class="grid grid-cols-2 gap-8">
            <div v-for="stat in statistics" :key="stat.id" class="text-center">
              <div :class="[stat.bgColor, 'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4']">
                <UIcon :name="stat.icon" :class="[stat.color, 'w-8 h-8']" />
              </div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-300">{{ stat.label }}</div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <UButton to="/about" color="yellow" size="lg" class="flex-1 sm:flex-none">
              Learn More
              <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 ml-2" />
            </UButton>
            <UButton
              v-if="siteInfo.phone"
              :to="`tel:${siteInfo.phone}`"
              variant="outline"
              color="gray"
              size="lg"
              class="flex-1 sm:flex-none"
            >
              <UIcon name="i-heroicons-phone" class="w-5 h-5 mr-2" />
              {{ siteInfo.phone }}
            </UButton>
          </div>
        </div>

        <div
          class="relative"
          :class="{ 'animate-fade-in-right': isVisible }"
          style="animation-delay: 400ms"
        >
          <!-- Instagram Portrait Grid -->
          <div class="grid grid-cols-2 gap-4 lg:gap-6">
            <div class="space-y-4 lg:space-y-6">
              <div class="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl group">
                <NuxtImg
                  src="/images/pub/interior-main.jpg"
                  alt="Restaurant Interior - Cozy dining atmosphere"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  format="webp"
                  quality="85"
                  width="600"
                  sizes="sm:100vw md:50vw lg:300px"
                  loading="lazy"
                />
              </div>
              <div class="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl group">
                <NuxtImg
                  src="/images/food/signature_dishes.jpg"
                  alt="Signature Dishes - Our chef's featured plates"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  format="webp"
                  quality="85"
                  width="600"
                  sizes="sm:100vw md:50vw lg:300px"
                  loading="lazy"
                />
              </div>
            </div>
            <div class="space-y-4 lg:space-y-6 pt-8 lg:pt-12">
              <div class="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl group">
                <NuxtImg
                  src="/images/pub/interior-bar.jpg"
                  alt="Bar Area - Stylish bar with craft cocktails"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  format="webp"
                  quality="85"
                  width="600"
                  sizes="sm:100vw md:50vw lg:300px"
                  loading="lazy"
                />
              </div>
              <div class="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl group">
                <NuxtImg
                  src="/images/entertainment/music.jpg"
                  alt="Live Entertainment - Music nights at the pub"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  format="webp"
                  quality="85"
                  width="600"
                  sizes="sm:100vw md:50vw lg:300px"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <!-- Photo Labels Overlay -->
          <div class="absolute inset-0 pointer-events-none">
            <div class="grid grid-cols-2 gap-4 lg:gap-6 h-full">
              <div class="space-y-4 lg:space-y-6">
                <div class="aspect-[4/5] relative">
                  <div class="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Restaurant Interior
                  </div>
                </div>
                <div class="aspect-[4/5] relative">
                  <div class="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Signature Dishes
                  </div>
                </div>
              </div>
              <div class="space-y-4 lg:space-y-6 pt-8 lg:pt-12">
                <div class="aspect-[4/5] relative">
                  <div class="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Bar & Lounge
                  </div>
                </div>
                <div class="aspect-[4/5] relative">
                  <div class="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Live Entertainment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
