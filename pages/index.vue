<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="backendLoading && !landingContent"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
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

      <!-- Operation Hours Banner -->
      <section class="bg-yellow-600 dark:bg-yellow-700 py-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-4">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-clock" class="w-5 h-5 text-white" />
              <span class="font-semibold text-white">Today's Hours:</span>
            </div>
            <div class="text-white text-sm md:text-base" v-if="currentDayHours">
              <div class="flex items-center gap-3">
                <!-- <span class="font-medium">{{ currentDayHours.day }}</span> -->
                <span>{{ currentDayHours.openTime }} - {{ currentDayHours.closeTime }}</span>
                <span 
                  class="px-2 py-1 rounded-full text-xs font-semibold"
                  :class="currentDayHours.isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
                >
                  {{ currentDayHours.isOpen ? 'OPEN NOW' : 'CLOSED' }}
                </span>
              </div>
            </div>
            <div v-else class="text-white text-sm md:text-base">
              <span class="px-2 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white">
                Hours not available
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Specials Section -->
      <section id="specials" class="specials section py-20 bg-gray-50 dark:bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Specials Title -->
          <div class="mb-12 text-center" data-aos="fade-up">
            <h2 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
              style="font-family: 'Cinzel', 'Georgia', serif;">
              <span class="text-yellow-600 dark:text-yellow-400">Specials</span>
            </h2>
            <div class="w-16 h-1 bg-yellow-500 mx-auto mb-4"></div>
            <p class="text-xl text-gray-600 dark:text-gray-300">Check Our Chef's Recommendations</p>
          </div>
          <div class="flex flex-col lg:flex-row gap-12">
            <!-- Tabs List -->
            <nav class="lg:w-1/4">
              <div
                class="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 overflow-x-auto lg:overflow-visible border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 pb-4 lg:pb-0 lg:pr-8">
                <button v-for="(tab, index) in specialsTabs" :key="tab.id" @click="activeSpecialTab = tab.id" :class="[
                  'py-3 px-6 font-medium text-left whitespace-nowrap transition-all duration-300 rounded-lg lg:rounded-none lg:rounded-l-lg',
                  activeSpecialTab === tab.id
                    ? 'bg-yellow-500 text-white shadow-lg lg:bg-transparent lg:text-yellow-600 dark:lg:text-yellow-400 lg:font-bold lg:border-l-4 lg:border-yellow-500 lg:shadow-none'
                    : 'text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                ]">
                  {{ tab.title }}
                </button>
              </div>
            </nav>
            <!-- Tabs Content -->
            <div class="lg:flex-1">
              <transition name="fade" mode="out-in" appear>
                <div v-if="selectedTab" :key="selectedTab.id"
                  class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
                  <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                    <div class="lg:flex-1 order-2 lg:order-1">
                      <h3 class="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                        {{ (selectedTab as any).name || selectedTab.title }}
                      </h3>
                      <p class="italic text-yellow-600 dark:text-yellow-400 mb-4 text-lg">{{ selectedTab.subtitle }}</p>
                      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ selectedTab.description }}</p>
                      <div v-if="selectedTab && 'price' in selectedTab && selectedTab.price" class="mt-4">
                        <span class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">${{ selectedTab.price
                          }}</span>
                      </div>
                    </div>
                    <div class="lg:w-80 order-1 lg:order-2 text-center">
                      <div class="relative overflow-hidden rounded-xl shadow-lg">
                        <NuxtImg :src="selectedTab.img" :alt="selectedTab.title"
                          class="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-500"
                          width="320" height="256" format="webp" quality="80" loading="lazy" />
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          
          <!-- Three Dots Navigation -->
          <div class="flex justify-center mt-8">
            <div class="flex space-x-2">
              <button v-for="(tab, index) in specialsTabs" :key="`dot-${tab.id}`" @click="activeSpecialTab = tab.id"
                :class="[
                  'w-3 h-3 rounded-full transition-all duration-300',
                  activeSpecialTab === tab.id
                    ? 'bg-yellow-500 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-yellow-400'
                ]" :aria-label="`Go to ${tab.title}`"></button>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-white dark:bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <div class="inline-block mb-4">
              <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase">What We
                Offer</span>
              <div class="w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              style="font-family: 'Cinzel', 'Georgia', serif;">
              Experience <span class="text-yellow-600 dark:text-yellow-400">Excellence</span>
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover what makes {{ siteInfo.name }} a beloved destination
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <template v-for="(feature, index) in features" :key="feature.id">
              <NuxtLink v-if="feature.link" :to="feature.link"
                class="feature-card group bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 text-center hover:bg-gradient-to-br hover:from-yellow-50 hover:to-orange-50 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-600">
                <div
                  :class="[feature.bgColor, 'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300']">
                  <UIcon :name="feature.icon" :class="[feature.color, 'w-10 h-10']" />
                </div>
                <h3
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                  {{ feature.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {{ feature.description }}
                </p>
                <UButton color="yellow" variant="outline"
                  class="group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300">
                  Learn More
                  <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2" />
                </UButton>
              </NuxtLink>
            </template>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section class="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
        :class="{ 'opacity-0 transform translate-y-8': !isVisible.about, 'animate-fade-in-up': isVisible.about }"
        ref="aboutRef">
        <!-- Decorative Background -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-yellow-500"></div>
          <div class="absolute bottom-10 right-10 w-48 h-48 rounded-full border border-yellow-300"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="space-y-8"
              :class="{ 'opacity-0 transform translate-x-8': !isVisible.about, 'animate-fade-in-left': isVisible.about }"
              style="animation-delay: 200ms">
              <div class="inline-block">
                <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase">Our
                  Story</span>
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
                <UButton to="/about" color="yellow" size="lg" class="flex-1 sm:flex-none">
                  Learn More
                  <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 ml-2" />
                </UButton>
                <UButton :to="`tel:${siteInfo.phone}`" variant="outline" color="gray" size="lg"
                  class="flex-1 sm:flex-none">
                  <UIcon name="i-heroicons-phone" class="w-5 h-5 mr-2" />
                  {{ siteInfo.phone }}
                </UButton>
              </div>
            </div>

            <div class="relative"
              :class="{ 'opacity-0 transform translate-x-8': !isVisible.about, 'animate-fade-in-right': isVisible.about }"
              style="animation-delay: 400ms">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-4">
                  <NuxtImg src="/images/about/interior-1.jpg" alt="Restaurant Interior"
                    class="w-full h-48 object-cover rounded-2xl shadow-lg" width="200" height="192" format="webp"
                    quality="80" loading="lazy" />
                  <NuxtImg src="/images/about/food-1.jpg" alt="Delicious Food"
                    class="w-full h-32 object-cover rounded-2xl shadow-lg" width="200" height="128" format="webp"
                    quality="80" loading="lazy" />
                </div>
                <div class="space-y-4 pt-8">
                  <NuxtImg src="/images/about/bar-1.jpg" alt="Bar Area"
                    class="w-full h-32 object-cover rounded-2xl shadow-lg" width="200" height="128" format="webp"
                    quality="80" loading="lazy" />
                  <NuxtImg src="/images/about/exterior-1.jpg" alt="Restaurant Exterior"
                    class="w-full h-48 object-cover rounded-2xl shadow-lg" width="200" height="192" format="webp"
                    quality="80" loading="lazy" />
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
import { onMounted, onUnmounted, ref, computed, shallowRef, watch, nextTick } from 'vue'
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
    // Fallback static content with new category names
    return [
      {
        id: 'seasonal-special',
        title: 'Seasonal Special',
        subtitle: 'Crispy battered fish served with golden fries and house tartar sauce.',
        description: 'A British pub staple! Fresh cod fillets, hand-battered and fried to perfection, served with thick-cut fries, mushy peas, and our signature tartar sauce.',
        img: '/images/food/fish_and_chips.jpg',
      },
      {
        id: 'daily-special',
        title: 'Daily Special',
        subtitle: 'Traditional comfort food with seasoned lamb and vegetables.',
        description: 'A hearty helping of seasoned ground lamb and vegetables, topped with creamy mashed potatoes and baked until golden brown.',
        img: '/images/food/shepherds_pie.jpg',
      },
      {
        id: 'late-night',
        title: 'Late Night Specials',
        subtitle: 'Traditional British sausages with creamy mashed potatoes.',
        description: 'Premium pork sausages served with fluffy mashed potatoes, caramelized onions, and rich gravy.',
        img: '/images/food/bangers_mash.jpg',
      },
    ];
  }

  // Dynamic content from backend - map to new categories
  const specials = landingContent.value.todaysSpecials;
  const seasonalSpecials = specials.filter((s: any) => s.special_type === 'seasonal');
  const dailySpecials = specials.filter((s: any) => s.special_type === 'daily');
  const lastNightSpecials = specials.filter((s: any) => s.special_type === 'latenight');

  const tabs = [];

  // Add Seasonal Special tab
  if (seasonalSpecials.length > 0) {
    tabs.push({
      id: 'seasonal-special',
      title: 'Seasonal Special',
      specials: seasonalSpecials, // Store all seasonal specials for auto-swapping
      subtitle: seasonalSpecials[0].description?.substring(0, 80) + '...' || 'Fresh seasonal offering',
      description: seasonalSpecials[0].description || 'A delicious seasonal special prepared by our chef.',
      img: seasonalSpecials[0].menuItem?.images?.[0] || '/images/food/fish_and_chips.jpg',
      price: seasonalSpecials[0].price,
      name: seasonalSpecials[0].name,
    });
  }

  // Add Daily Special tab
  if (dailySpecials.length > 0) {
    const daily = dailySpecials[0];
    tabs.push({
      id: 'daily-special',
      title: 'Daily Special',
      subtitle: daily.description?.substring(0, 80) + '...' || 'Today\'s featured dish',
      description: daily.description || 'A delicious daily special prepared by our chef.',
      img: daily.menuItem?.images?.[0] || '/images/food/shepherds_pie.jpg',
      price: daily.price,
      name: daily.name,
    });
  }

  // Add Last Night tab
  if (lastNightSpecials.length > 0) {
    const lastNight = lastNightSpecials[0];
    tabs.push({
      id: 'last-night',
      title: 'Late Night Special',
      subtitle: lastNight.description?.substring(0, 80) + '...' || 'Late Night Specials favorite',
      description: lastNight.description || 'A delicious Late Night Specials special.',
      img: lastNight.menuItem?.images?.[0] || '/images/food/bangers_mash.jpg',
      price: lastNight.price,
      name: lastNight.name,
    });
  }

  return tabs.length > 0 ? tabs : [
    // Fallback if no specials found
    {
      id: 'seasonal-special',
      title: 'Seasonal Special',
      subtitle: 'Check back soon for our seasonal offerings',
      description: 'Our chef is preparing something special for this season. Stay tuned!',
      img: '/images/food/fish_and_chips.jpg',
    }
  ];
});

const activeSpecialTab = ref('seasonal-special')
const seasonalSpecialIndex = ref(0) // For auto-swapping seasonal specials
let seasonalSwapInterval: NodeJS.Timeout | null = null

const selectedTab = computed(() => {
  const tab = specialsTabs.value.find((tab) => tab.id === activeSpecialTab.value)

  // If this is the seasonal special tab and it has multiple specials, swap through them
  if (tab?.id === 'seasonal-special' && (tab as any).specials?.length > 1) {
    const currentSpecial = (tab as any).specials[seasonalSpecialIndex.value]
    return {
      ...tab,
      subtitle: currentSpecial.description?.substring(0, 80) + '...' || 'Fresh seasonal offering',
      description: currentSpecial.description || 'A delicious seasonal special prepared by our chef.',
      img: currentSpecial.menuItem?.images?.[0] || '/images/food/fish_and_chips.jpg',
      price: currentSpecial.price,
      name: currentSpecial.name,
    }
  }

  return tab
})

// Auto-swap seasonal specials function
const startSeasonalSpecialRotation = () => {
  const seasonalTab = specialsTabs.value.find(tab => tab.id === 'seasonal-special')
  if (seasonalTab && (seasonalTab as any).specials?.length > 1) {
    seasonalSwapInterval = setInterval(() => {
      seasonalSpecialIndex.value = (seasonalSpecialIndex.value + 1) % (seasonalTab as any).specials.length
    }, 4000) // Swap every 4 seconds
  }
}

const stopSeasonalSpecialRotation = () => {
  if (seasonalSwapInterval) {
    clearInterval(seasonalSwapInterval)
    seasonalSwapInterval = null
  }
}

// Watch for changes in active tab to manage rotation
watch(activeSpecialTab, (newTab) => {
  if (newTab === 'seasonal-special') {
    startSeasonalSpecialRotation()
  } else {
    stopSeasonalSpecialRotation()
  }
})

// Watch for changes in specials data to restart rotation
watch(specialsTabs, () => {
  if (activeSpecialTab.value === 'seasonal-special') {
    stopSeasonalSpecialRotation()
    seasonalSpecialIndex.value = 0
    nextTick(() => {
      startSeasonalSpecialRotation()
    })
  }
}, { deep: true })
// Get current day's operation hours with open/close status
const currentDayHours = computed(() => {
  if (!operationHours.value?.length) return null;

  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todayHours = operationHours.value.find((hour: any) => hour.day === currentDay);
  
  if (!todayHours) return null;

  // Format time from HH:MM:SS to HH:MM AM/PM
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Check if currently open
  const now = new Date();
  const currentTime = now.getHours() * 100 + now.getMinutes();
  const openTime = parseInt(todayHours.open_time.replace(':', ''));
  const closeTime = parseInt(todayHours.close_time.replace(':', ''));
  
  let isOpen = false;
  if (closeTime < openTime) {
    // Spans midnight (e.g., 11 PM to 2 AM)
    isOpen = currentTime >= openTime || currentTime <= closeTime;
  } else {
    // Same day (e.g., 11 AM to 11 PM)
    isOpen = currentTime >= openTime && currentTime <= closeTime;
  }

  return {
    day: currentDay.charAt(0).toUpperCase() + currentDay.slice(1),
    openTime: formatTime(todayHours.open_time),
    closeTime: formatTime(todayHours.close_time),
    isOpen: isOpen && todayHours.status,
    status: todayHours.status
  };
});

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

  // Start seasonal special rotation if on seasonal special tab
  if (activeSpecialTab.value === 'seasonal-special') {
    startSeasonalSpecialRotation()
  }

  // Initialize 3D animations with more performance checks
  if (process.client && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const runAnimations = () => {
      // Only run animations if user has not disabled them
      if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('[data-aos], .feature-card, .special-card')
        animatedElements.forEach((el, i) => {
          if (el instanceof HTMLElement) {
            // Simple fade in animation without heavy 3D effects
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
  stopSeasonalSpecialRotation() // Clean up interval
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
