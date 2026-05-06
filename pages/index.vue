<template>
  <!-- Always render main content to prevent blank screen on hydration -->
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Full Screen Loading Overlay - positioned absolutely to overlay content -->
    <FullScreenLoading
      v-show="initialLoading"
      :title="loadingConfig.title"
      :subtitle="loadingConfig.subtitle"
      :progress="loadingProgress"
      :current-step="currentLoadingStep"
      :texts="loadingConfig.texts"
      :steps="loadingConfig.steps"
      :sub-text="loadingConfig.subText"
      :error="loadingError"
      :retrying="retryingConnection"
      @retry="handleRetry"
      @fallback="showFallbackMode"
    />

    <!-- Static Fallback (Offline Mode) -->
    <StaticFallback v-if="showFallback && !initialLoading" />

    <!-- Main Content - Always present but may be overlaid by loader -->
    <div v-show="!initialLoading && !showFallback" class="min-h-screen">
      <!-- Hero Section -->
      <Hero />

      <!-- Operation Hours Banner -->
      <OperationHoursBanner
        :loading="operationHoursLoading"
        :error="operationHoursError"
        :today-status="todayOperationStatus"
      />

      <!-- Specials Section -->
      <SpecialsSection :tabs="specialsTabs" :menu-categories="menuCategories" />

      <!-- Features Section -->
      <FeaturesSection :features="features" :site-name="siteInfo.name" />

      <!-- About Section -->
      <AboutSection
        ref="aboutSectionRef"
        :statistics="statistics"
        :site-info="siteInfo"
        :is-visible="isVisible.about"
      />
    </div>
    <!-- End main content wrapper -->
  </div>
  <!-- End outer container -->
</template>

<!-- pages/index.vue - Enhanced with SEO -->
<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, shallowRef, watch, nextTick } from 'vue'
import Hero from '../components/home/Hero.vue'
import OperationHoursBanner from '../components/home/OperationHoursBanner.vue'
import SpecialsSection from '../components/home/SpecialsSection.vue'
import FeaturesSection from '../components/home/FeaturesSection.vue'
import AboutSection from '../components/home/AboutSection.vue'
import { useLandingPageData } from '~/composables/useLandingPageData'
import { useConnectivity } from '~/composables/useConnectivity'
import { useSEO } from '~/composables/useSEO'
import FullScreenLoading from '~/components/loading/FullScreenLoading.vue'
import StaticFallback from '~/components/feedback/StaticFallback.vue'
import { operationHoursApi } from '@/composables/useApi'
import { useFirstVisit } from '~/composables/useFirstVisit'

// SEO Configuration
const { setSEO, getLocalBusinessSchema } = useSEO()

definePageMeta({
  title: 'The Pearson Pub | Traditional Pub in Whitby, ON',
  description:
    'Experience authentic pub dining in Whitby. Live music, daily specials, craft beverages and traditional fare in a warm, welcoming atmosphere.',
  layout: 'default',
  prerender: true,
  middleware: 'connectivity-client',
  key: 'home',
  keepalive: false // Disable keep-alive to ensure fresh loads
})

// SEO/SSG: Non-blocking data loading for better performance
const { data: landingData } = await useAsyncData(
  'landing-content',
  async () => {
    // Don't block page load for data initialization
    return true
  },
  {
    server: false, // Skip server-side rendering for this data
    default: () => true
  }
)

// Set comprehensive SEO
setSEO({
  title: 'The Pearson Pub | Traditional Pub in Whitby, ON',
  description:
    'Experience authentic pub dining in Whitby. Live music, daily specials, craft beverages and traditional fare in a warm, welcoming atmosphere. Located at 101 Mary St.',
  ogImage: `${useRuntimeConfig().public.siteUrl}/images/pub/interior-main.jpg`,
  ogType: 'website',
  structuredData: {
    ...getLocalBusinessSchema(),
    hasMenu: `${useRuntimeConfig().public.siteUrl}/menu`,
    acceptsReservations: true
  }
})

// Landing page data integration
const {
  landingContent,
  menuData,
  eventsData,
  contactInfo,
  dailySpecials,
  seasonalSpecials,
  lateNightSpecials,
  featuredMenuItems,
  menuCategories,
  upcomingEvents,
  allEvents,
  operationHours,
  siteInfo,
  isLoading: backendLoading,
  error: backendError,
  initializeAllData,
  todayOperationStatus,
  operationHoursLoading,
  operationHoursError,
  fetchTodayOperationStatus
} = useLandingPageData()

// Connectivity and Loading Management
const {
  status: connectivityStatus,
  canUseBackend,
  shouldShowFallback,
  connectionQuality,
  checkConnectivity,
  setupEventListeners,
  cleanup: cleanupConnectivity
} = useConnectivity()

// First visit tracking
const { shouldShowLoading, markLoadingShown, isFirstVisit, getVisitCount } = useFirstVisit()

// Simplified loading states
// Start with loader visible for both server and client to keep SSR and client render consistent.
// onMounted will decide whether to keep the full-screen loader (hard reload / first visit)
// or hide it immediately for SPA navigations and run background initialization.
const initialLoading = ref(true)
const retryingConnection = ref(false)
const forceFallback = ref(false)
const pageReady = ref(false)
const canShowFallbackAfterTimeout = ref(false)

// Loading configuration
const loadingConfig = ref({
  title: 'The Pearson Pub',
  subtitle: 'A traditional pub atmosphere with modern amenities in Whitby',
  texts: [
    'Preparing your experience...',
    'Loading menu items...',
    'Fetching latest events...',
    "Getting today's specials...",
    'Almost ready...'
  ],
  steps: ['Connect', 'Menu', 'Events', 'Hours', 'Specials'],
  subText: ''
})

// Loading progress and step tracking
const loadingProgress = ref(0)
const currentLoadingStep = ref(0)
const loadingError = ref<string | null>(null)

const showFallback = computed(() => {
  // Only show fallback if explicitly forced OR if backend is unreachable AND not loading
  // Wait for a short timeout before showing fallback to avoid flicker on hard reloads
  return (
    forceFallback.value ||
    (canShowFallbackAfterTimeout.value &&
      !initialLoading.value &&
      !canUseBackend.value &&
      !pageReady.value)
  )
})

// Handle retry functionality
const handleRetry = async () => {
  retryingConnection.value = true
  loadingError.value = null

  try {
    const isConnected = await checkConnectivity(true)
    if (isConnected) {
      pageReady.value = false
      await initializeDataWithProgress()
    } else {
      loadingError.value = 'Unable to connect to server. Please check your internet connection.'
    }
  } catch (error) {
    loadingError.value = 'Connection failed. Please try again.'
  } finally {
    retryingConnection.value = false
  }
}

// Show fallback mode
const showFallbackMode = () => {
  forceFallback.value = true
  initialLoading.value = false
  pageReady.value = true
  markLoadingShown() // Mark loading as shown
}

// Initialize data with progress tracking and smooth progress animation
const initializeDataWithProgress = async () => {
  let progressTimer: ReturnType<typeof setInterval> | null = null
  try {
    if (process.dev) console.log('Initializing page data with progress...')

    // Reset progress
    loadingProgress.value = 0
    currentLoadingStep.value = 0
    loadingConfig.value.subText = ''
    loadingError.value = null

    // Start a smooth fake-progress timer to give visual feedback while work runs
    progressTimer = setInterval(() => {
      // Increment slowly but never reach 95% so we can complete to 100% when real work finishes
      if (loadingProgress.value < 90) {
        const bump = Math.random() * 6 + 2 // 2-8%
        loadingProgress.value = Math.min(90, Math.round(loadingProgress.value + bump))
      }
    }, 250)

    // Step 1: quick connectivity check
    currentLoadingStep.value = 0
    loadingProgress.value = Math.max(5, loadingProgress.value)
    loadingConfig.value.subText = 'Checking connectivity...'
    const isConnected = await checkConnectivity()

    if (!isConnected) {
      console.warn('Backend not available, using static content')
      // fast-forward progress to indicate completion of offline path
      loadingProgress.value = 100
      loadingConfig.value.subText = 'Offline mode'
      pageReady.value = true
      return
    }

    // Step 2: start real initialization
    currentLoadingStep.value = 1
    loadingConfig.value.subText = 'Loading restaurant data...'
    loadingProgress.value = Math.max(20, loadingProgress.value)

    // Run the heavy initializer
    await initializeAllData()

    // Simulate a few named steps to give users clearer progress
    const progressSteps = [40, 60, 80, 95]
    const stepNames = ['Menu loaded', 'Events loaded', 'Hours loaded', 'Specials loaded']

    for (let i = 0; i < progressSteps.length; i++) {
      // small delay to allow the UI to show progress changes
      // but don't stall if things finished quickly
      await new Promise(resolve => setTimeout(resolve, 220))
      loadingProgress.value = progressSteps[i]
      currentLoadingStep.value = i + 2
      loadingConfig.value.subText = stepNames[i]
    }

    // Finalize
    loadingConfig.value.subText = 'Finalizing...'
    loadingProgress.value = 100
    await new Promise(resolve => setTimeout(resolve, 300))

    pageReady.value = true
  } catch (error: any) {
    console.error('Failed to initialize data:', error)
    loadingError.value = null // don't show raw error
    pageReady.value = true
  } finally {
    // Clear progress timer
    if (progressTimer) {
      clearInterval(progressTimer)
    }
    // Ensure final progress is 100 when finishing normally
    if (loadingProgress.value < 100) {
      loadingProgress.value = 100
    }
    initialLoading.value = false
    markLoadingShown()
  }
}

// Statistics computed from backend data
const statistics = computed(() => [
  {
    id: 'categories',
    label: 'Menu Categories',
    value: menuCategories.value.length || 0,
    icon: 'i-heroicons-squares-2x2',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'items',
    label: 'Menu Items',
    value: landingContent.value?.allItems?.length || 0,
    icon: 'i-heroicons-fire',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    id: 'events',
    label: 'Upcoming Events',
    value: upcomingEvents.value.length || 0,
    icon: 'i-heroicons-calendar-days',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'hours',
    label: 'Operating Days',
    value: operationHours.value.length || 7,
    icon: 'i-heroicons-clock',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  }
])

// Features showcase (dynamic content from backend)
const features = computed(() => [
  {
    id: 'menu',
    title: 'Diverse Menu',
    description: `Explore our extensive menu with ${menuCategories.value.length} categories ranging from traditional pub fare to modern cuisine.`,
    icon: 'i-heroicons-book-open',
    link: '/menu',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  {
    id: 'events',
    title: 'Live Events',
    description: `Join us for live music, quiz nights, and special events. ${upcomingEvents.value.length} upcoming events this month.`,
    icon: 'i-heroicons-musical-note',
    link: '/events',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'contact',
    title: 'Easy Booking',
    description: 'Contact us easily for reservations, inquiries, or special requests.',
    icon: 'i-heroicons-phone',
    link: '/contact',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  }
])

// Specials Section State (dynamic from new backend API)
const specialsTabs = computed(() => {
  const tabs = []

  // Add Daily Special tab if data exists
  if (dailySpecials.value?.specials?.length > 0) {
    tabs.push({
      id: 'daily-special',
      title: dailySpecials.value.heading || 'Daily Special',
      specialType: 'daily',
      specials: dailySpecials.value.specials,
      subtitle:
        dailySpecials.value.specials[0].description?.substring(0, 80) + '...' ||
        "Today's featured dish",
      description:
        dailySpecials.value.specials[0].description ||
        'A delicious daily special prepared by our chef.',
      images:
        dailySpecials.value.specials[0].image_urls ||
        [dailySpecials.value.specials[0].image_url].filter(Boolean),
      dayName: dailySpecials.value.dayName
    })
  }

  // Add Seasonal Special tab if data exists (backend already filters by display time window)
  if (seasonalSpecials.value?.specials?.length > 0) {
    const validSeasonalSpecials = seasonalSpecials.value.specials
    if (validSeasonalSpecials.length > 0) {
      tabs.push({
        id: 'seasonal-special',
        title: validSeasonalSpecials[0].season_name || 'Seasonal Specials',
        specialType: 'seasonal',
        specials: validSeasonalSpecials,
        subtitle:
          validSeasonalSpecials[0].description?.substring(0, 80) + '...' ||
          'Fresh seasonal offering',
        description:
          validSeasonalSpecials[0].description ||
          'A delicious seasonal special prepared by our chef.',
        images:
          validSeasonalSpecials[0].image_urls ||
          [validSeasonalSpecials[0].image_url].filter(Boolean),
        season_name: validSeasonalSpecials[0].season_name,
        start_date: validSeasonalSpecials[0].seasonal_start_datetime,
        end_date: validSeasonalSpecials[0].seasonal_end_datetime
      })
    }
  }

  // Add Late Night Special tab if data exists
  if (lateNightSpecials.value?.specials?.length > 0) {
    tabs.push({
      id: 'latenight-special',
      title: lateNightSpecials.value.heading || 'Latenight Special',
      specialType: 'latenight',
      specials: lateNightSpecials.value.specials,
      subtitle:
        lateNightSpecials.value.specials[0].description?.substring(0, 80) + '...' ||
        'Late night favorite',
      description:
        lateNightSpecials.value.specials[0].description || 'A delicious late night special.',
      images:
        lateNightSpecials.value.specials[0].image_urls ||
        [lateNightSpecials.value.specials[0].image_url].filter(Boolean)
    })
  }

  return tabs
})

// Specials, features, and about section logic is now in extracted components

// Visibility states
const isVisible = ref({
  about: false
})

// Refs for intersection observer
const aboutSectionRef = ref(null)

// Intersection observer callback
const handleIntersection = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target
      // Check which section is intersecting and update visibility
      if (target === aboutSectionRef.value) {
        isVisible.value.about = true
      }
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
  if (process.dev) console.log('Home page mounted, visit count:', getVisitCount())

  // Setup connectivity monitoring
  setupEventListeners()

  // Safety timeout: ensure loader clears even if initialization hangs
  const safetyTimeout = setTimeout(() => {
    console.warn('⚠️ Safety timeout triggered - forcing loader to clear')
    initialLoading.value = false
    pageReady.value = true
  }, 10000) // 10 second maximum loader time

  // Always initialize data on mount - no complex loading logic
  if (process.client) {
    // Decide whether to show full-screen loader or hide it immediately for SPA navigations.
    const showLoader = shouldShowLoading()

    if (showLoader) {
      // Hard reload / first visit: keep loader visible and await initialization
      pageReady.value = false // keep hidden until loader completes
      await initializeDataWithProgress()
      // initialization will set pageReady = true and clear initialLoading in finally
      initialLoading.value = false
      clearTimeout(safetyTimeout) // Clear safety timeout on successful load
    } else {
      // SPA navigation: hide loader immediately to avoid flash, then initialize in background
      initialLoading.value = false
      pageReady.value = true // Show content immediately - data will refresh in background
      clearTimeout(safetyTimeout) // Clear safety timeout for SPA nav

      initializeDataWithProgress().catch(error => {
        console.warn('Background data loading failed:', error)
        // Continue with static content if data loading fails
      })

      // Load operation status in background
      fetchTodayOperationStatus().catch(error => {
        console.warn('Operation status loading failed:', error)
      })
    }

    // Start a short grace period before showing offline fallback to avoid flicker on hard reloads
    canShowFallbackAfterTimeout.value = false
    setTimeout(() => {
      canShowFallbackAfterTimeout.value = true
      // Trigger a fresh connectivity check once timeout expires
      checkConnectivity().catch(() => {})
    }, 3000) // 3s grace period
  }

  // Initialize intersection observer for animations
  observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
    rootMargin: '50px'
  })

  // Observe sections
  const aboutEl = aboutSectionRef.value?.aboutRef || aboutSectionRef.value?.$el
  if (aboutEl) {
    observer.observe(aboutEl)
  }

  // Initialize animations with performance checks
  if (process.client && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const runAnimations = () => {
      // Only run animations if user has not disabled them
      if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll(
          '[data-aos], .feature-card, .special-card'
        )
        animatedElements.forEach((el, i) => {
          if (el instanceof HTMLElement) {
            // Simple fade in animation
            el.style.opacity = '0'
            el.style.transform = 'translateY(20px)'
            setTimeout(() => {
              el.style.transition = 'all 0.6s ease'
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, i * 100)
          }
        })
      }
    }
    if ('requestIdleCallback' in window) {
      ;(window as any).requestIdleCallback(runAnimations)
    } else {
      setTimeout(runAnimations, 200)
    }
  }

  // Fetch today's operation status
  try {
    const status = await operationHoursApi.getTodayStatus()
    todayOperationStatus.value = status
  } catch (error) {
    operationHoursError.value = 'Failed to load operation hours'
  } finally {
    operationHoursLoading.value = false
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  // Clean up connectivity listeners
  cleanupConnectivity()
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

/* Line clamp utility for text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Instagram aspect ratio */
.aspect-\[4\/5\] {
  aspect-ratio: 4 / 5;
}

/* Improved gradient overlays */
.gradient-overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
}

@keyframes slide-in-left {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in-left {
  animation: slide-in-left 0.5s ease-out;
}
</style>
