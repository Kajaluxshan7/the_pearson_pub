import { $fetch } from 'ofetch'
import { publicApi } from './usePublicApi'

// Cached base URL — resolved once and reused to avoid useRuntimeConfig() context loss in async callbacks
let _cachedBaseUrl: string | null = null

// Function to get API base URL from runtime config (with persistent cache)
const getApiBaseUrl = () => {
  if (_cachedBaseUrl) {
    return _cachedBaseUrl
  }
  try {
    const config = useRuntimeConfig()
    const apiBaseUrl = config.public.apiBaseUrl as string
    if (apiBaseUrl) {
      _cachedBaseUrl = apiBaseUrl
      return apiBaseUrl
    }
  } catch {
    // useRuntimeConfig() not available — use cached or fallback
  }
  return _cachedBaseUrl || 'http://localhost:5000'
}

// Cached $fetch client — reuse the same instance for connection efficiency
let _cachedClient: ReturnType<typeof $fetch.create> | null = null

// Create or return cached fetch instance with base configuration and error handling
const createApiClient = () => {
  const baseURL = getApiBaseUrl()
  // Return cached client if base URL hasn't changed
  if (_cachedClient && _cachedBaseUrl === baseURL) {
    return _cachedClient
  }
  _cachedClient = $fetch.create({
    baseURL,
    credentials: 'include', // Include cookies
    headers: {
      'Content-Type': 'application/json'
    },
    onRequestError({ error }) {
      if (process.dev) {
        console.warn('API Request Error:', error)
      }
    },
    onResponseError({ response }) {
      if (process.dev) {
        console.warn('API Response Error:', response.status, response.statusText)
      }
    }
  })
  return _cachedClient
}

// Lazy getter for API client
const getApi = () => createApiClient()

// Helper function to handle API calls with fallback
const safeApiCall = async <T>(apiCall: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await apiCall()
  } catch (error) {
    if (process.dev) {
      console.warn('API call failed, using fallback data:', error)
    }
    return fallback
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
}

export interface ApiCategory {
  id: string
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export interface ApiItem {
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
  category: ApiCategory
  categoryId: string
  created_at: string
  updated_at: string
}

export interface ApiEvent {
  id: string
  name: string
  description?: string
  images: string[]
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export interface ApiSpecial {
  id: string
  special_type: 'daily' | 'seasonal' | 'latenight'
  season_name?: string
  description?: string
  image_url?: string
  image_urls?: string[]
  seasonal_start_datetime?: string
  seasonal_end_datetime?: string
  specialsDay?: {
    id: string
    day_name: string
    created_at: string
    updated_at: string
  }
  heading?: string // Dynamic heading based on special type
  created_at: string
  updated_at: string
}

export interface ApiOperationHour {
  id: string
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  open_time: string
  close_time: string
  status: boolean
  created_at: string
  updated_at: string
}

// Categories API with fallbacks
export const categoriesApi = {
  getAll: (page = 1, limit = 50, search?: string): Promise<PaginatedResponse<ApiCategory>> =>
    safeApiCall(() => getApi()('/categories', { query: { page, limit, search } }), {
      data: [],
      total: 0,
      page: 1,
      totalPages: 0
    }),

  getById: (id: string): Promise<ApiCategory | null> =>
    safeApiCall(() => getApi()(`/categories/${id}`), null)
}

// Items API with fallbacks
export const itemsApi = {
  getAll: (
    page = 1,
    limit = 50,
    search?: string,
    categoryId?: string,
    availability?: boolean,
    visibility?: boolean,
    isFavourite?: boolean
  ): Promise<PaginatedResponse<ApiItem>> =>
    safeApiCall(
      () =>
        getApi()('/items', {
          query: {
            page,
            limit,
            search,
            categoryId,
            availability,
            visibility,
            is_favourite: isFavourite
          }
        }),
      { data: [], total: 0, page: 1, totalPages: 0 }
    ),

  getById: (id: string): Promise<ApiItem | null> =>
    safeApiCall(() => getApi()(`/items/${id}`), null)
}

// Events API with fallbacks
export const eventsApi = {
  getAll: (
    page = 1,
    limit = 50,
    search?: string,
    startDate?: string,
    endDate?: string
  ): Promise<PaginatedResponse<ApiEvent>> =>
    safeApiCall(
      () =>
        getApi()('/events', {
          query: { page, limit, search, startDate, endDate }
        }),
      { data: [], total: 0, page: 1, totalPages: 0 }
    ),

  getById: (id: string): Promise<ApiEvent | null> =>
    safeApiCall(() => getApi()(`/events/${id}`), null)
}

// Operation Hours API with fallbacks
export const operationHoursApi = {
  getAll: (page = 1, limit = 20, day?: string): Promise<PaginatedResponse<ApiOperationHour>> =>
    safeApiCall(
      () =>
        getApi()('/api/public/operation-hours', {
          query: { page, limit, day }
        }),
      { data: [], total: 0, page: 1, totalPages: 0 }
    ),

  getById: (id: string): Promise<ApiOperationHour | null> =>
    safeApiCall(() => getApi()(`/api/public/operation-hours/${id}`), null),

  getTodayStatus: (): Promise<{
    isOpen: boolean
    todayHours: { open_time: string; close_time: string } | null
    status: string
    message: string
  } | null> => safeApiCall(() => getApi()('/api/public/operation-hours/status'), null)
}

// Specials API for public use with fallbacks
export const specialsApi = {
  getAll: (
    page = 1,
    limit = 50,
    search?: string,
    specialType?: string
  ): Promise<PaginatedResponse<ApiSpecial>> =>
    safeApiCall(
      () =>
        getApi()('/api/public/specials', {
          query: { page, limit, search, specialType }
        }),
      { data: [], total: 0, page: 1, totalPages: 0 }
    ),

  // Alternative public endpoint
  getAllPublic: (
    page = 1,
    limit = 50,
    search?: string,
    specialType?: string
  ): Promise<PaginatedResponse<ApiSpecial>> =>
    safeApiCall(
      () =>
        getApi()('/specials/public', {
          query: { page, limit, search, specialType }
        }),
      { data: [], total: 0, page: 1, totalPages: 0 }
    ),

  getByType: (specialType: 'daily' | 'seasonal' | 'latenight'): Promise<any> =>
    safeApiCall(() => getApi()(`/api/public/specials/${specialType}`), {
      specials: [],
      total: 0,
      heading: ''
    }),

  getDailySpecials: (): Promise<any> =>
    safeApiCall(() => getApi()('/api/public/specials/daily'), {
      specials: [],
      total: 0,
      dayName: '',
      heading: 'Daily Special'
    }),

  getSeasonalSpecials: (): Promise<any> =>
    safeApiCall(() => getApi()('/api/public/specials/seasonal'), {
      specials: [],
      total: 0
    }),

  getLateNightSpecials: (): Promise<any> =>
    safeApiCall(() => getApi()('/api/public/specials/latenight'), {
      specials: [],
      total: 0,
      heading: 'Latenight Special'
    }),

}

export default getApi

// Main composable function
export const useApi = () => {
  // Eagerly resolve and cache the API base URL while we're in the Nuxt setup context.
  // This ensures all subsequent async calls (after await) use the correct URL.
  getApiBaseUrl()

  return {
    // Categories
    getCategories: categoriesApi.getAll,
    getCategoryById: categoriesApi.getById,

    // Menu Items
    getMenuItems: itemsApi.getAll,
    getMenuItemById: itemsApi.getById,

    // Events
    getEvents: eventsApi.getAll,
    getEventById: eventsApi.getById,

    // Operation Hours
    getOperationHours: operationHoursApi.getAll,
    getOperationHourById: operationHoursApi.getById,
    getTodayOperationStatus: operationHoursApi.getTodayStatus,

    // Specials - New improved methods
    getSpecials: specialsApi.getAll,
    getSpecialsPublic: specialsApi.getAllPublic,
    getSpecialsByType: specialsApi.getByType,
    getDailySpecials: specialsApi.getDailySpecials,
    getSeasonalSpecials: specialsApi.getSeasonalSpecials,
    getLateNightSpecials: specialsApi.getLateNightSpecials,
    // Public API methods
    getPublicLandingContent: publicApi.getLandingContent,
    getPublicMenuData: publicApi.getMenuData,
    getPublicEventsData: publicApi.getEventsData,
    getPublicContactInfo: publicApi.getContactInfo,
    getPublicStoriesData: publicApi.getStoriesData,

    // Direct API access
    api: getApi,
    categoriesApi,
    itemsApi,
    eventsApi,
    operationHoursApi,
    specialsApi,
    publicApi
  }
}
