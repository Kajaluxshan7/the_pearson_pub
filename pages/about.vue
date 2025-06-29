<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="/images/pub/interior-main.jpg" 
          alt="Pub Interior" 
          class="w-full h-full object-cover opacity-40"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
      </div>
      
      <!-- Decorative Elements -->
      <div class="absolute top-10 right-10 w-24 h-24 rounded-full border border-yellow-500/30 animate-pulse"></div>
      <div class="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-yellow-500/20"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div class="inline-block mb-4">
          <span class="text-yellow-400 font-semibold text-lg tracking-wide uppercase">Heritage & Values</span>
          <div class="w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
        </div>
        <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight" style="font-family: 'Cinzel', 'Georgia', serif;">
          Our <span class="text-yellow-400">Story</span>
        </h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          Discover the <span class="text-yellow-300">heritage</span> and <span class="text-yellow-300">heart</span> behind The Pearson Pub
        </p>
      </div>
    </section>    <!-- History Section -->
    <section 
      class="py-20 relative overflow-hidden"
      :class="{
        'opacity-0 transform translate-y-8 transition duration-700': !animationState.history,
        'opacity-100 transform translate-y-0 transition duration-700': animationState.history
      }"
    >
      <!-- Background decorations -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-20 left-10 w-48 h-48 rounded-full border-2 border-yellow-500"></div>
        <div class="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-yellow-300"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="space-y-8">
            <div class="inline-block">
              <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase">Established Heritage</span>
              <div class="w-16 h-1 bg-yellow-500 mt-2"></div>
            </div>
            
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight" style="font-family: 'Cinzel', 'Georgia', serif;">
              Our <span class="text-yellow-600 dark:text-yellow-400">Heritage</span>
            </h2>
            
            <div class="space-y-6">
              <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Founded in the heart of the Whitby community, The Pearson Pub has been a gathering place for friends and families since our doors first opened.
              </p>
              <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                What started as a traditional English pub has evolved into a modern establishment that perfectly balances timeless charm with contemporary comfort. We've maintained our commitment to quality food, exceptional service, and creating memorable experiences for every guest who walks through our doors.
              </p>
              <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Over the years, we've become more than just a pub – we're a cornerstone of the community, hosting celebrations, gatherings, and creating countless memories for locals and visitors alike.
              </p>
            </div>

            <div class="flex items-center space-x-8 pt-6">
              <div class="text-center">
                <div class="text-4xl font-bold text-yellow-600 dark:text-yellow-400">25+</div>
                <div class="text-sm text-gray-600 dark:text-gray-300 font-medium">Years Serving</div>
              </div>
              <div class="text-center">
                <div class="text-4xl font-bold text-yellow-600 dark:text-yellow-400">1000+</div>
                <div class="text-sm text-gray-600 dark:text-gray-300 font-medium">Happy Customers</div>
              </div>
              <div class="text-center">
                <div class="text-4xl font-bold text-yellow-600 dark:text-yellow-400">50+</div>
                <div class="text-sm text-gray-600 dark:text-gray-300 font-medium">Menu Items</div>
              </div>
            </div>
          </div>
          
          <div class="relative group">
            <div class="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/pub/interior-bar.jpg" 
                alt="Pub Bar" 
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            <!-- Floating testimonial card -->
            <div class="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-sm transform hover:scale-105 transition-transform duration-300">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <UIcon name="i-heroicons-star" class="w-6 h-6 text-white" />
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white">Local Favorite</div>
                  <div class="text-sm text-gray-600 dark:text-gray-300">Since Day One</div>
                </div>
              </div>
              <p class="text-gray-700 dark:text-gray-300 text-sm italic">
                "The heart of Whitby's social scene"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>    <!-- Values Section -->
    <section 
      class="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
      :class="{
        'opacity-0 transform translate-y-8 transition duration-700': !animationState.values,
        'opacity-100 transform translate-y-0 transition duration-700': animationState.values
      }"
    >
      <!-- Background decorations -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-10 left-10 w-40 h-40 rounded-full border-2 border-yellow-500"></div>
        <div class="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-yellow-300"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase">What Drives Us</span>
            <div class="w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6" style="font-family: 'Cinzel', 'Georgia', serif;">
            Our <span class="text-yellow-600 dark:text-yellow-400">Values</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The principles that guide everything we do at The Pearson Pub
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(value, index) in values" 
            :key="index"
            class="group text-center p-8 bg-gray-50 dark:bg-gray-700 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-600"
            :style="{ animationDelay: `${index * 200}ms` }"
          >
            <div class="relative mb-6">
              <div class="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-yellow-500/20 transition-colors duration-300">
                <UIcon 
                  :name="value.icon" 
                  class="w-10 h-10 text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{{ value.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase">Meet The Team</span>
            <div class="w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6" style="font-family: 'Cinzel', 'Georgia', serif;">
            The People Behind <span class="text-yellow-600 dark:text-yellow-400">The Experience</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our dedicated team works tirelessly to ensure every visit is memorable
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(member, index) in teamMembers" 
            :key="index"
            class="group text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
          >
            <div class="relative mb-6">
              <div class="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
                <UIcon 
                  :name="member.icon" 
                  class="w-12 h-12 text-white"
                />
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ member.role }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAnimations } from '../composables/useAnimations'

const { useElementAnimation } = useAnimations()

// Simple animation state
const animationState = ref({
  history: false,
  values: false
})

// Trigger animations on mount
onMounted(() => {
  setTimeout(() => {
    animationState.value.history = true
  }, 300)
  
  setTimeout(() => {
    animationState.value.values = true
  }, 600)
})

const values = [
  {
    icon: 'i-heroicons-heart',
    title: 'Hospitality',
    description: 'Welcoming every guest like family with genuine warmth and attention to detail'
  },
  {
    icon: 'i-heroicons-star',
    title: 'Quality',
    description: 'Excellence in every pour and plate, using only the finest ingredients and techniques'
  },
  {
    icon: 'i-heroicons-users',
    title: 'Community',
    description: 'Building connections that last and being a cornerstone of the local community'
  }
]

const teamMembers = [
  {
    role: 'Management Team',
    description: 'Dedicated to providing exceptional service and maintaining our high standards',
    icon: 'i-heroicons-user-group'
  },
  {
    role: 'Kitchen Staff',
    description: 'Talented chefs crafting delicious meals with passion and precision',
    icon: 'i-heroicons-fire'
  },
  {
    role: 'Bar Team',
    description: 'Expert bartenders mixing the perfect drinks and creating memorable experiences',
    icon: 'i-heroicons-beaker'
  }
]

// Page meta
useHead({
  title: 'About Us - The Pearson Pub',
  meta: [
    {
      name: 'description',
      content: 'Learn about The Pearson Pub\'s heritage, values, and the passionate team behind our exceptional service.',
    },
  ],
})
</script>

<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(2rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.7s ease forwards;
}
</style>
