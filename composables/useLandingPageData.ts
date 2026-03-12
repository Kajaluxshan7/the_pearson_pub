import { ref, computed } from 'vue'
import { useApi } from './useApi'
import type { LandingPageContent } from './usePublicApi'
import type { MenuItem, MenuCategory } from '~/types/menu'
import type { Event } from '~/types/events'

export interface ContactInfo {
  name: string
  phone: string
  email: string
  address: string
  description?: string
  operationHours: any[]
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  mapCoordinates: {
    lat: number
    lng: number
  }
}

export const useLandingPageData = () => {
  // Access publicApi and specialsApi inside the composable so useRuntimeConfig() is called in the correct context
  const { publicApi, specialsApi, getTodayOperationStatus: fetchOperationStatus } = useApi()

  // State
  const landingContent = ref<LandingPageContent | null>(null)
  const menuData = ref<any>(null)
  const eventsData = ref<any>(null)
  const contactInfo = ref<ContactInfo | null>(null)

  // New specials state
  const dailySpecials = ref<any>(null)
  const seasonalSpecials = ref<any>(null)
  const lateNightSpecials = ref<any>(null)

  // Today's operation status state
  const todayOperationStatus = ref<{
    isOpen: boolean
    todayHours: any
    status: string
  } | null>(null)
  const operationHoursLoading = ref(true)
  const operationHoursError = ref<string | null>(null)

  // Provide per-fetch loading and global loading state
  const loadingCount = ref(0)
  const isLoading = computed(() => loadingCount.value > 0)
  const error = ref<string | null>(null)

  // Per-api loading states
  const loading = {
    landingContent: ref(false),
    menuData: ref(false),
    eventsData: ref(false),
    contactInfo: ref(false),
    specialsData: ref(false),
    todayOperationStatus: ref(false)
  }

  // Transform API data to frontend format
  const transformItemToMenuItem = (apiItem: any): MenuItem => ({
    id: apiItem.id,
    name: apiItem.name,
    description: apiItem.description || '',
    price: apiItem.price,
    category: apiItem.category?.name || '',
    subCategory: 'mains', // Default fallback
    image: apiItem.images?.[0] || '',
    images: apiItem.images || [],
    ingredients: apiItem.ingredients || [],
    isAvailable: apiItem.availability,
    isVisible: apiItem.visibility,
    isFeatured: apiItem.is_favourite,
    isPearsonFamous: apiItem.is_favourite,
    display_order: apiItem.display_order,
    allergens: [],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false
    }
  })

  const transformEventToFrontend = (apiEvent: any): Event => {
    // Use TimezoneUtil for proper Toronto timezone handling
    const startDateUtc = new Date(apiEvent.start_date)
    const endDateUtc = new Date(apiEvent.end_date)

    // Get current time in Toronto timezone
    const nowInToronto = new Date()

    // Calculate status based on Canadian time
    let status: 'upcoming' | 'current' | 'ended' = 'upcoming'
    if (nowInToronto >= startDateUtc && nowInToronto <= endDateUtc) {
      status = 'current'
    } else if (nowInToronto > endDateUtc) {
      status = 'ended'
    }

    // Format in Toronto timezone for display
    const startDateFormatted = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'America/Toronto'
    }).format(startDateUtc)

    const endDateFormatted = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'America/Toronto'
    }).format(endDateUtc)

    // Format times in Toronto timezone
    const startTimeFormatted = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Toronto'
    }).format(startDateUtc)

    const endTimeFormatted = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Toronto'
    }).format(endDateUtc)

    return {
      id: apiEvent.id,
      title: apiEvent.name,
      description: apiEvent.description || '',
      fullDescription: apiEvent.description || '',
      date: startDateFormatted, // Use formatted Toronto timezone date
      time: `${startTimeFormatted} - ${endTimeFormatted} EST/EDT`,
      endDate: endDateFormatted, // Use formatted Toronto timezone end date
      startDate: startDateFormatted, // Use formatted date instead of UTC string
      startDateTime: apiEvent.start_date,
      endDateTime: apiEvent.end_date,
      image: apiEvent.images?.[0] || '/images/events/default.jpg',
      images: apiEvent.images?.length > 0 ? apiEvent.images : ['/images/events/default.jpg'],
      location: 'The Pearson Pub',
      venue: {
        name: 'The Pearson Pub',
        capacity: 100,
        layout: 'Standard seating'
      },
      tags: ['Event'],
      performers: [],
      featured: true,
      ctaText: 'Learn More',
      ctaLink: '/contact',
      price: { general: 0 },
      ticketsAvailable: 100,
      status, // Use calculated status
      category: 'entertainment',
      ageRestriction: '19+',
      specialRequirements: [],
      contactInfo: {
        phone: '905-430-5699',
        email: 'events@thepearsonpub.com'
      },
      organizer: {
        name: 'The Pearson Pub',
        description: 'Your local neighborhood pub'
      }
    }
  }

  // Computed values
  const featuredMenuItems = computed<MenuItem[]>(() => {
    if (!landingContent.value) {
      return []
    }
    return landingContent.value.featuredItems.map(transformItemToMenuItem)
  })

  const menuCategories = computed<MenuCategory[]>(() => {
    if (!menuData.value) {
      return []
    }
    return menuData.value.categories.map((category: any) => ({
      id: category.id,
      name: category.name,
      description: category.description || '',
      display_order: category.display_order,
      items: category.items.map(transformItemToMenuItem)
    }))
  })

  const upcomingEvents = computed<Event[]>(() => {
    if (!landingContent.value) {
      return []
    }
    return landingContent.value.upcomingEvents.map(transformEventToFrontend)
  })

  const allEvents = computed<Event[]>(() => {
    if (!eventsData.value) {
      return []
    }
    return eventsData.value.events.map(transformEventToFrontend)
  })

  const operationHours = computed(() => {
    if (!landingContent.value) {
      return []
    }
    return landingContent.value.operationHours
  })

  const siteInfo = computed(() => {
    return (
      landingContent.value?.siteInfo ||
      contactInfo.value || {
        name: 'The Pearson Pub',
        phone: '905-430-5699',
        email: 'thepearsonpub@rogers.com',
        address: '101 MARY ST WHITBY, ON, L1N 2R4',
        description: 'A cozy neighborhood pub offering great food, drinks, and entertainment.',
        socialMedia: {}
      }
    )
  })

  // API methods
  const fetchLandingContent = async () => {
    try {
      loading.landingContent.value = true
      loadingCount.value += 1
      error.value = null
      const data = await publicApi.getLandingContent()
      landingContent.value = data
    } catch (err) {
      error.value = 'Failed to fetch landing page content'
    } finally {
      loading.landingContent.value = false
      loadingCount.value = Math.max(0, loadingCount.value - 1)
    }
  }

  const fetchMenuData = async () => {
    try {
      loading.menuData.value = true
      loadingCount.value += 1
      error.value = null
      const data = await publicApi.getMenuData()
      menuData.value = data
    } catch (err) {
      error.value = 'Failed to fetch menu data'
    } finally {
      loading.menuData.value = false
      loadingCount.value = Math.max(0, loadingCount.value - 1)
    }
  }

  const fetchEventsData = async () => {
    try {
      loading.eventsData.value = true
      loadingCount.value += 1
      error.value = null
      const data = await publicApi.getEventsData()
      eventsData.value = data
    } catch (err) {
      error.value = 'Failed to fetch events data'
    } finally {
      loading.eventsData.value = false
      loadingCount.value = Math.max(0, loadingCount.value - 1)
    }
  }

  const fetchContactInfo = async () => {
    try {
      loading.contactInfo.value = true
      loadingCount.value += 1
      error.value = null
      const data = await publicApi.getContactInfo()
      contactInfo.value = data
    } catch (err) {
      error.value = 'Failed to fetch contact info'
    } finally {
      loading.contactInfo.value = false
      loadingCount.value = Math.max(0, loadingCount.value - 1)
    }
  }

  // New specials data fetching functions
  const fetchSpecialsData = async () => {
    try {
      loading.specialsData.value = true
      loadingCount.value += 1
      error.value = null

      // Fetch all three types of specials in parallel
      const [dailyResponse, seasonalResponse, lateNightResponse] = await Promise.all([
        specialsApi.getDailySpecials(),
        specialsApi.getSeasonalSpecials(),
        specialsApi.getLateNightSpecials()
      ])

      dailySpecials.value = dailyResponse
      seasonalSpecials.value = seasonalResponse
      lateNightSpecials.value = lateNightResponse
    } catch (err) {
      error.value = 'Failed to fetch specials data'

      // Set fallback data
      dailySpecials.value = {
        specials: [],
        heading: 'Daily Special',
        total: 0
      }
      seasonalSpecials.value = { specials: [], total: 0 }
      lateNightSpecials.value = {
        specials: [],
        heading: 'Latenight Special',
        total: 0
      }
    } finally {
      loading.specialsData.value = false
      loadingCount.value = Math.max(0, loadingCount.value - 1)
    }
  }

  // Today's operation status fetching function
  const fetchTodayOperationStatus = async () => {
    operationHoursLoading.value = true
    loading.todayOperationStatus.value = true
    loadingCount.value += 1
    operationHoursError.value = null
    try {
      const result = await fetchOperationStatus()
      todayOperationStatus.value = result
    } catch (err: any) {
      operationHoursError.value = err?.message || 'Error fetching operation status'
      todayOperationStatus.value = null
    } finally {
      operationHoursLoading.value = false
      loading.todayOperationStatus.value = false
      loadingCount.value = Math.max(0, loadingCount.value - 1)
    }
  }

  // Initialize all data - with individual error handling for resilience
  const initializeAllData = async () => {
    const results = await Promise.allSettled([
      fetchLandingContent(),
      fetchMenuData(),
      fetchEventsData(),
      fetchContactInfo(),
      fetchSpecialsData(),
      fetchTodayOperationStatus()
    ])

    // Log any failures for debugging, but don't throw
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const names = [
          'Landing Content',
          'Menu',
          'Events',
          'Contact',
          'Specials',
          'Operation Status'
        ]
        if (process.dev) {
          console.warn(`⚠️ Failed to load ${names[index]}:`, result.reason)
        }
      }
    })

    // Return summary of what succeeded/failed
    const succeeded = results.filter(r => r.status === 'fulfilled').length
    const failed = results.filter(r => r.status === 'rejected').length
    if (process.dev) {
      console.log(`✅ Data initialization: ${succeeded} succeeded, ${failed} failed`)
    }
  }

  return {
    // State
    landingContent,
    menuData,
    eventsData,
    contactInfo,
    dailySpecials,
    seasonalSpecials,
    lateNightSpecials,
    todayOperationStatus,
    isLoading,
    error,
    operationHoursLoading,
    operationHoursError,

    // Computed
    featuredMenuItems,
    menuCategories,
    upcomingEvents,
    allEvents,
    operationHours,
    siteInfo,

    // Methods
    fetchLandingContent,
    fetchMenuData,
    fetchEventsData,
    fetchContactInfo,
    fetchSpecialsData,
    fetchTodayOperationStatus,
    initializeAllData
  }
}
