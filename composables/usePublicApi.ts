import { $fetch } from 'ofetch'

const getApiBaseUrl = () => {
  try {
    const config = useRuntimeConfig()
    const apiBaseUrl = config.public.apiBaseUrl as string
    if (!apiBaseUrl) {
      if (process.dev) {
        console.warn(
          'NUXT_PUBLIC_API_BASE_URL is not set in runtime config. Falling back to default.'
        )
      }
      return 'http://localhost:5000'
    }
    return apiBaseUrl
  } catch (error) {
    if (process.dev) {
      console.error('Error accessing runtime config:', error)
    }
    // Fallback for SSR or when runtime config is not available
    return 'http://localhost:5000'
  }
}

// Create fetch instance with base configuration (lazy initialization)
const createApiClient = () => {
  const baseURL = getApiBaseUrl()
  return $fetch.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// Lazy getter for API client
const getApi = () => createApiClient()

// Client-side in-memory cache to reduce redundant requests and improve perceived performance
const clientCache = new Map<string, { ts: number; data: any }>()
const CACHE_TTL = 2 * 60 * 1000 // 2 minutes

const getCached = (key: string) => {
  try {
    const entry = clientCache.get(key)
    if (entry && Date.now() - entry.ts < CACHE_TTL) {
      return entry.data
    }
    clientCache.delete(key)
    return null
  } catch (e) {
    return null
  }
}

const setCached = (key: string, data: any) => {
  try {
    clientCache.set(key, { ts: Date.now(), data })
  } catch (e) {
    // Ignore cache failures
  }
}

export interface PublicMenuData {
  categories: Array<{
    id: string
    name: string
    description?: string
    items: Array<{
      id: string
      name: string
      description?: string
      original_price: number
      price: number
      ingredients: string[]
      sizes: string[]
      images: string[]
      availability: boolean
      visibility: boolean
      is_favourite: boolean
      categoryId: string
      created_at: string
      updated_at: string
      dietaryInfo?: {
        isVegetarian?: boolean
        isVegan?: boolean
        isGlutenFree?: boolean
      }
    }>
    created_at: string
    updated_at: string
  }>
  totalItems: number
}

export interface PublicEventsData {
  events: Array<{
    id: string
    name: string
    title: string
    description?: string
    images: string[]
    image?: string // Main image (first from images array)
    start_date: string
    end_date: string
    startDate: string // Frontend compatibility
    endDate: string // Frontend compatibility
    status: 'upcoming' | 'current' | 'ended'
    category: string
    featured: boolean
    price: any
    location: string
    created_at: string
    updated_at: string
  }>
  total: number
}

export interface PublicContactData {
  name: string
  phone: string
  email: string
  address: string
  operationHours: Array<{
    id: string
    day: string
    open_time: string
    close_time: string
    status: boolean
    created_at: string
    updated_at: string
  }>
  socialMedia: {
    facebook: string
    instagram: string
    tiktok: string
  }
  mapCoordinates: {
    lat: number
    lng: number
  }
}

export interface ApiStory {
  id: string
  title: string
  description?: string
  images: string[]
  image?: string // Main image (first from images array)
  created_at: string
  updated_at: string
  // Mapped fields for UI compatibility
  category?: string
  icon?: string
  date?: string
  createdAt?: string // Alternative name for created_at
}

export interface LandingPageContent {
  categories: any[]
  featuredItems: any[]
  allItems: any[]
  upcomingEvents: any[]
  todaysSpecials: any[]
  operationHours: any[]
  siteInfo: {
    name: string
    phone: string
    email: string
    address: string
    description: string
    socialMedia: {
      facebook: string
      instagram: string
      tiktok: string
    }
  }
}

// Public API endpoints
export const publicApi = {
  // Landing page content with all data
  getLandingContent: async (): Promise<LandingPageContent> => {
    const cacheKey = '/api/public/landing-content'
    const cached = getCached(cacheKey)
    if (process.client && cached) {
      return cached
    }
    const data = await getApi()(cacheKey)
    if (process.client) {
      setCached(cacheKey, data)
    }
    return data
  },

  // Menu data (categories with items)
  getMenuData: async (): Promise<PublicMenuData> => {
    const cacheKey = '/api/public/menu'
    const cached = getCached(cacheKey)
    if (process.client && cached) {
      return cached
    }
    const data = await getApi()(cacheKey)
    if (process.client) {
      setCached(cacheKey, data)
    }
    return data
  },

  // Events data
  getEventsData: async (): Promise<PublicEventsData> => {
    const cacheKey = '/api/public/events'
    const cached = getCached(cacheKey)
    if (process.client && cached) {
      return cached
    }
    const data = await getApi()(cacheKey)
    if (process.client) {
      setCached(cacheKey, data)
    }
    return data
  },

  // Contact info with operation hours
  getContactInfo: async (): Promise<PublicContactData> => {
    const cacheKey = '/api/public/contact'
    const cached = getCached(cacheKey)
    if (process.client && cached) {
      return cached
    }
    const data = await getApi()(cacheKey)
    if (process.client) {
      setCached(cacheKey, data)
    }
    return data
  },

  // Stories data
  getStoriesData: async (): Promise<ApiStory[]> => {
    const cacheKey = '/api/public/stories'
    const cached = getCached(cacheKey)
    if (process.client && cached) {
      return cached
    }
    const response = await getApi()(cacheKey)
    const stories = Array.isArray(response) ? response : response.stories || []
    if (process.client) {
      setCached(cacheKey, stories)
    }
    return stories
  },

  // Get single story by ID
  getStoryById: async (id: string): Promise<ApiStory> => {
    const cacheKey = `/api/public/stories/${id}`
    const cached = getCached(cacheKey)
    if (process.client && cached) {
      return cached
    }
    const story = await getApi()(`/api/public/stories/${id}`)
    if (process.client) {
      setCached(cacheKey, story)
    }
    return story
  }
}

export default publicApi

// Main composable function for public API
export const usePublicApi = () => {
  return {
    // Public endpoints
    getLandingContent: publicApi.getLandingContent,
    getMenuData: publicApi.getMenuData,
    getEventsData: publicApi.getEventsData,
    getContactInfo: publicApi.getContactInfo,
    getStoriesData: publicApi.getStoriesData,
    getStoryById: publicApi.getStoryById,

    // Direct API access
    api: getApi,
    publicApi
  }
}
