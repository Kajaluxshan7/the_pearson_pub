<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="backendLoading && !landingContent" class="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
      <div class="text-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto mb-4"></div>
        <p class="text-xl text-gray-600 dark:text-gray-300"></p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="backendError" class="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
      <div class="text-center p-8">
        <h2 class="text-2xl font-bold text-red-600 mb-4">Failed to Load Content</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ backendError }}</p>
        <UButton @click="retryLoading" color="yellow">
          Try Again
        </UButton>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Lazy loaded Hero -->
      <component :is="Hero" v-if="Hero" />

      <!-- Specials Section -->
      <section id="specials" class="specials section py-20 bg-gray-50 dark:bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Specials Title -->
          <div class="mb-12 text-center" data-aos="fade-up">
            <h2 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white" style="font-family: 'Cinzel', 'Georgia', serif;">
              Daily <span class="text-yellow-600 dark:text-yellow-400">Specials</span>
            </h2>
            <div class="w-16 h-1 bg-yellow-500 mx-auto mb-4"></div>
            <p class="text-xl text-gray-600 dark:text-gray-300">Check Our Chef's Recommendations</p>
          </div>
          <div class="flex flex-col lg:flex-row gap-12">
            <!-- Tabs List -->
            <nav class="lg:w-1/4">
              <div class="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 overflow-x-auto lg:overflow-visible border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 pb-4 lg:pb-0 lg:pr-8">
                <button
                  v-for="(tab, index) in specialsTabs"
                  :key="tab.id"
                  @click="activeSpecialTab = tab.id"
                  :class="[
                    'py-3 px-6 font-medium text-left whitespace-nowrap transition-all duration-300 rounded-lg lg:rounded-none lg:rounded-l-lg transform hover:scale-105',
                    activeSpecialTab === tab.id
                      ? 'bg-yellow-500 text-white shadow-lg lg:bg-transparent lg:text-yellow-600 dark:lg:text-yellow-400 lg:font-bold lg:border-l-4 lg:border-yellow-500 lg:shadow-none'
                      : 'text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                  ]"
                >
                  {{ tab.title }}
                </button>
              </div>
            </nav>
            <!-- Tabs Content -->
            <div class="lg:flex-1">
              <transition name="fade" mode="out-in" appear>
                <div
                  v-if="selectedTab"
                  :key="selectedTab.id"
                  class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8"
                >
                  <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                    <div class="lg:flex-1 order-2 lg:order-1">
                      <h3 class="text-3xl font-bold mb-3 text-gray-900 dark:text-white">{{ selectedTab.title }}</h3>
                      <p class="italic text-yellow-600 dark:text-yellow-400 mb-4 text-lg">{{ selectedTab.subtitle }}</p>
                      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ selectedTab.description }}</p>
                      <div v-if="selectedTab && 'price' in selectedTab && selectedTab.price" class="mt-4">
                        <span class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">${{ selectedTab.price }}</span>
                      </div>
                    </div>
                    <div class="lg:w-80 order-1 lg:order-2 text-center">
                      <div class="relative overflow-hidden rounded-xl shadow-lg">
                        <NuxtImg
                          :src="selectedTab.img"
                          :alt="selectedTab.title"
                          class="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-500"
                          width="320"
                          height="256"
                          format="webp"
                          quality="80"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-white dark:bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <div class="inline-block mb-4">
              <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase">What We Offer</span>
              <div class="w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6" style="font-family: 'Cinzel', 'Georgia', serif;">
              Experience <span class="text-yellow-600 dark:text-yellow-400">Excellence</span>
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover what makes {{ siteInfo.name }} a beloved destination
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <template v-for="(feature, index) in features" :key="feature.id">
              <NuxtLink
                v-if="feature.link"
                :to="feature.link"
                class="feature-card group bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 text-center hover:bg-gradient-to-br hover:from-yellow-50 hover:to-orange-50 dark:hover:from-gray-600 dark:hover:to-gray-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-600"
              >
                <div :class="[feature.bgColor, 'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300']">
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

      <!-- About Section -->
      <section 
        class="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
        :class="{ 'opacity-0 transform translate-y-8': !isVisible.about, 'animate-fade-in-up': isVisible.about }"
        ref="aboutRef"
      >
        <!-- Decorative Background -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-yellow-500"></div>
          <div class="absolute bottom-10 right-10 w-48 h-48 rounded-full border border-yellow-300"></div>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div 
              class="space-y-8"
              :class="{ 'opacity-0 transform translate-x-8': !isVisible.about, 'animate-fade-in-left': isVisible.about }"
              style="animation-delay: 200ms"
            >
              <div class="inline-block">
                <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase">Our Story</span>
                <div class="w-16 h-1 bg-yellow-500 mt-2"></div>
              </div>
              
              <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                A Local Landmark <span class="text-yellow-600 dark:text-yellow-400">Since Day One</span>
              </h2>
              
              <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ siteInfo?.description || 'A cozy neighborhood pub offering great food, drinks, and entertainment.' }}
              </p>
              
              <div class="grid grid-cols-2 gap-8">
                <div v-for="(stat, index) in statistics" :key="stat.id" class="text-center">
                  <div :class="[stat.bgColor, 'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4']">
                    <UIcon :name="stat.icon" :class="[stat.color, 'w-8 h-8']" />
                  </div>
                  <div class="text-3xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-300">{{ stat.label }}</div>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-4">
                <UButton 
                  to="/about" 
                  color="yellow" 
                  size="lg"
                  class="flex-1 sm:flex-none"
                >
                  Learn More
                  <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 ml-2" />
                </UButton>
                <UButton 
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
              :class="{ 'opacity-0 transform translate-x-8': !isVisible.about, 'animate-fade-in-right': isVisible.about }"
              style="animation-delay: 400ms"
            >
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-4">
                  <NuxtImg
                    src="/images/about/interior-1.jpg"
                    alt="Restaurant Interior"
                    class="w-full h-48 object-cover rounded-2xl shadow-lg"
                    width="200"
                    height="192"
                    format="webp"
                    quality="80"
                    loading="lazy"
                  />
                  <NuxtImg
                    src="/images/about/food-1.jpg"
                    alt="Delicious Food"
                    class="w-full h-32 object-cover rounded-2xl shadow-lg"
                    width="200"
                    height="128"
                    format="webp"
                    quality="80"
                    loading="lazy"
                  />
                </div>
                <div class="space-y-4 pt-8">
                  <NuxtImg
                    src="/images/about/bar-1.jpg"
                    alt="Bar Area"
                    class="w-full h-32 object-cover rounded-2xl shadow-lg"
                    width="200"
                    height="128"
                    format="webp"
                    quality="80"
                    loading="lazy"
                  />
                  <NuxtImg
                    src="/images/about/exterior-1.jpg"
                    alt="Restaurant Exterior"
                    class="w-full h-48 object-cover rounded-2xl shadow-lg"
                    width="200"
                    height="192"
                    format="webp"
                    quality="80"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, shallowRef } from 'vue'
import { useLandingPageData } from "~/composables/useLandingPageData";

// Lazy load Hero for better LCP
const Hero = shallowRef<any>(null)
if (process.client) {
  import('../components/home/Hero.vue').then(mod => Hero.value = mod.default)
}

definePageMeta({
  title: 'The Pearson Pub | Whitby',
  description: 'Live menu, events, and more. Experience The Pearson Pub in Whitby.',
  layout: 'default',
  prerender: true
})

// SSR/SSG: useAsyncData for consolidated backend data
const { data: landingData } = await useAsyncData('landing-content', async () => {
  const { initializeAllData } = useLandingPageData()
  await initializeAllData()
  return true
})

// Landing page data integration
const {
  landingContent,
  menuData,
  eventsData,
  contactInfo,
  featuredMenuItems,
  menuCategories,
  upcomingEvents,
  allEvents,
  operationHours,
  siteInfo,
  isLoading: backendLoading,
  error: backendError,
  initializeAllData,
} = useLandingPageData();

// Statistics computed from backend data
const statistics = computed(() => [
  {
    id: 'categories',
    label: 'Menu Categories',
    value: menuCategories.value.length || 0,
    icon: 'i-heroicons-squares-2x2',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'items',
    label: 'Menu Items',
    value: landingContent.value?.allItems?.length || 0,
    icon: 'i-heroicons-fire',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: 'events',
    label: 'Upcoming Events',
    value: upcomingEvents.value.length || 0,
    icon: 'i-heroicons-calendar-days',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    id: 'hours',
    label: 'Operating Days',
    value: operationHours.value.length || 7,
    icon: 'i-heroicons-clock',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
]);

// Features showcase (dynamic content from backend)
const features = computed(() => [
  {
    id: 'menu',
    title: 'Diverse Menu',
    description: `Explore our extensive menu with ${menuCategories.value.length} categories ranging from traditional pub fare to modern cuisine.`,
    icon: 'i-heroicons-book-open',
    link: '/menu',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    id: 'events',
    title: 'Live Events',
    description: `Join us for live music, quiz nights, and special events. ${upcomingEvents.value.length} upcoming events this month.`,
    icon: 'i-heroicons-musical-note',
    link: '/events',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    id: 'contact',
    title: 'Easy Booking',
    description: 'Contact us easily for reservations, inquiries, or special requests.',
    icon: 'i-heroicons-phone',
    link: '/contact',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
]);

// Specials Section State (dynamic from backend)
const specialsTabs = computed(() => {
  if (!landingContent.value?.todaysSpecials?.length) {
    // Fallback static content
    return [
      {
        id: 'specials-tab-1',
        title: 'Classic Fish & Chips',
        subtitle: 'Crispy battered fish served with golden fries and house tartar sauce.',
        description: 'A British pub staple! Fresh cod fillets, hand-battered and fried to perfection, served with thick-cut fries, mushy peas, and our signature tartar sauce.',
        img: '/images/food/fish_and_chips.jpg',
      },
      {
        id: 'specials-tab-2',
        title: 'Shepherd\'s Pie',
        subtitle: 'Traditional comfort food with seasoned lamb and vegetables.',
        description: 'A hearty helping of seasoned ground lamb and vegetables, topped with creamy mashed potatoes and baked until golden brown.',
        img: '/images/food/shepherds_pie.jpg',
      },
      {
        id: 'specials-tab-3',
        title: 'Bangers & Mash',
        subtitle: 'Traditional British sausages with creamy mashed potatoes.',
        description: 'Premium pork sausages served with fluffy mashed potatoes, caramelized onions, and rich gravy.',
        img: '/images/food/bangers_mash.jpg',
      },
    ];
  }
  
  // Dynamic content from backend
  return landingContent.value.todaysSpecials.map((special: any, index: number) => ({
    id: `special-${special.id}`,
    title: special.name || special.title,
    subtitle: special.description?.substring(0, 80) + '...' || 'Today\'s special offering',
    description: special.description || 'A delicious special prepared by our chef.',
    img: special.images?.[0] || `/images/food/special_${index + 1}.jpg`,
    price: special.price,
  }));
});

const activeSpecialTab = ref('specials-tab-1')
const selectedTab = computed(() =>
  specialsTabs.value.find((tab) => tab.id === activeSpecialTab.value)
)

// Visibility states
const isVisible = ref({
  about: false
})

// Refs for intersection observer
const aboutRef = ref(null)

// Intersection observer callback
const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target
      // Check which section is intersecting and update visibility
      if (target === aboutRef.value) isVisible.value.about = true
      // Stop observing after becoming visible
      observer.unobserve(target)
    }
  })
}

let observer: IntersectionObserver

// Retry loading function
const retryLoading = async () => {
  await initializeAllData()
}

onMounted(async () => {
  // Initialize landing page data if not already loaded
  if (!landingContent.value) {
    await initializeAllData();
  }

  // Initialize intersection observer
  observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
    rootMargin: '50px'
  })

  // Observe sections
  if (aboutRef.value) observer.observe(aboutRef.value)

  // Start advanced loading
  startLoading()
  await nextTick()
  finishLoading()

  // Initialize 3D animations with more performance checks
  if (process.client && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const runAnimations = () => {
      // Simple fade-in animations without heavy dependencies
      if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.feature-card, .special-card')
        animatedElements.forEach((el, i) => {
          if (el instanceof HTMLElement) {
            // Simple CSS-based animation
            el.style.opacity = '0'
            el.style.transform = 'translateY(20px)'
            setTimeout(() => {
              el.style.transition = 'all 0.6s ease'
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, i * 100)
          }
        });
      }
    }
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(runAnimations);
    } else {
      setTimeout(runAnimations, 200);
    }
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out forwards;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
