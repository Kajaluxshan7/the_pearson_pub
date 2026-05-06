<script setup lang="ts">
interface Feature {
  id: string
  title: string
  description: string
  icon: string
  link?: string
  color: string
  bgColor: string
}

defineProps<{
  features: Feature[]
  siteName: string
}>()
</script>

<template>
  <section class="py-20 bg-white dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="inline-block mb-4">
          <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase">
            What We Offer
          </span>
          <div class="w-16 h-1 bg-yellow-500 mx-auto mt-2" />
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
          Experience <span class="text-yellow-600 dark:text-yellow-400">Excellence</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover what makes {{ siteName }} a beloved destination
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <template v-for="feature in features" :key="feature.id">
          <NuxtLink
            v-if="feature.link"
            :to="feature.link"
            class="feature-card group bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 text-center hover:bg-gradient-to-br hover:from-yellow-50 hover:to-orange-50 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-600"
          >
            <div
              :class="[feature.bgColor, 'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300']"
            >
              <UIcon :name="feature.icon" :class="[feature.color, 'w-10 h-10']" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {{ feature.description }}
            </p>
            <UButton
              color="yellow"
              variant="outline"
              class="group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300"
            >
              Learn More
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2" />
            </UButton>
          </NuxtLink>
        </template>
      </div>
    </div>
  </section>
</template>
