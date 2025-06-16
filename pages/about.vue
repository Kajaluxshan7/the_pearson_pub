<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gray-900 text-white">
      <div class="absolute inset-0 overflow-hidden">
        <img 
          src="/images/pub/interior-main.jpg" 
          alt="Pub Interior" 
          class="w-full h-full object-cover opacity-30"
        />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
        <p class="text-xl max-w-3xl mx-auto">
          Discover the heritage and heart behind The Pearson Pub
        </p>
      </div>
    </section>

    <!-- History Section -->
    <section 
      class="py-16"
      :class="{ 'opacity-0 transform translate-y-8': !isVisible.history, 'animate-fade-in-up': isVisible.history }"
      ref="historyRef"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6">Our Heritage</h2>
            <p class="text-gray-600 mb-4">
              Founded in the heart of the community, The Pearson Pub has been a gathering place for friends and families since [Year].
            </p>
            <p class="text-gray-600">
              [Add your pub's history and story here]
            </p>
          </div>
          <div class="relative h-96">
            <img 
              src="/images/pub/interior-bar.jpg" 
              alt="Pub Bar" 
              class="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section 
      class="py-16 bg-white"
      :class="{ 'opacity-0 transform translate-y-8': !isVisible.values, 'animate-fade-in-up': isVisible.values }"
      ref="valuesRef"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(value, index) in values" 
            :key="index"
            class="text-center p-6"
          >
            <UIcon 
              :name="value.icon" 
              class="w-12 h-12 text-yellow-500 mx-auto mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimations } from '~/composables/useAnimations'

const { observeElement } = useAnimations()

const isVisible = ref({
  history: false,
  values: false
})

const historyRef = ref(null)
const valuesRef = ref(null)

const values = [
  {
    icon: 'i-heroicons-heart',
    title: 'Hospitality',
    description: 'Welcoming every guest like family'
  },
  {
    icon: 'i-heroicons-star',
    title: 'Quality',
    description: 'Excellence in every pour and plate'
  },
  {
    icon: 'i-heroicons-users',
    title: 'Community',
    description: 'Building connections that last'
  }
]

onMounted(() => {
  observeElement(historyRef.value, () => isVisible.value.history = true)
  observeElement(valuesRef.value, () => isVisible.value.values = true)
})
</script>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16 img {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
}
</style>

