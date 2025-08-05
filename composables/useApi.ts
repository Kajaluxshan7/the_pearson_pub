import { $fetch } from "ofetch";
import { publicApi, type ApiStory } from "./usePublicApi";

// Function to get API base URL from runtime config
const getApiBaseUrl = () => {
  try {
    const config = useRuntimeConfig();
    return (config.public.apiBaseUrl as string) || "http://localhost:5000";
  } catch {
    // Fallback for SSR or when runtime config is not available
    return "http://localhost:5000";
  }
};

// Create fetch instance with base configuration and error handling
const createApiClient = () => {
  const API_BASE_URL = getApiBaseUrl();

  return $fetch.create({
    baseURL: API_BASE_URL,
    credentials: "include", // Include cookies
    headers: {
      "Content-Type": "application/json",
    },
    onRequestError({ error }) {
      console.warn("API Request Error:", error);
      // Don't throw error, let components handle gracefully
    },
    onResponseError({ response }) {
      console.warn("API Response Error:", response.status, response.statusText);
      // Don't throw error, let components handle gracefully
    },
  });
};

// Create the API client
const api = createApiClient();

// Helper function to handle API calls with fallback
const safeApiCall = async <T>(
  apiCall: () => Promise<T>,
  fallback: T
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    console.warn("API call failed, using fallback data:", error);
    return fallback;
  }
};

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ApiCategory {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiItem {
  id: string;
  name: string;
  description?: string;
  original_price: number;
  price: number;
  ingredients: string[];
  sizes: string[];
  images: string[];
  availability: boolean;
  visibility: boolean;
  is_favourite: boolean;
  category: ApiCategory;
  categoryId: string;
  created_at: string;
  updated_at: string;
}

export interface ApiEvent {
  id: string;
  name: string;
  description?: string;
  images: string[];
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface ApiSpecial {
  id: string;
  special_type: "daily" | "seasonal" | "latenight";
  season_name?: string;
  description?: string;
  image_url?: string;
  image_urls?: string[];
  seasonal_start_datetime?: string;
  seasonal_end_datetime?: string;
  specialsDay?: {
    id: string;
    day_name: string;
    created_at: string;
    updated_at: string;
  };
  heading?: string; // Dynamic heading based on special type
  created_at: string;
  updated_at: string;
}

export interface ApiOperationHour {
  id: string;
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  open_time: string;
  close_time: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

// Categories API with fallbacks
export const categoriesApi = {
  getAll: (
    page = 1,
    limit = 50,
    search?: string
  ): Promise<PaginatedResponse<ApiCategory>> =>
    safeApiCall(() => api("/categories", { query: { page, limit, search } }), {
      data: [],
      total: 0,
      page: 1,
      totalPages: 0,
    }),

  getById: (id: string): Promise<ApiCategory | null> =>
    safeApiCall(() => api(`/categories/${id}`), null),
};

// Items API with fallbacks
export const itemsApi = {
  getAll: (
    page = 1,
    limit = 50,
    search?: string,
    categoryId?: string,
    availability?: boolean,
    visibility?: boolean,
    is_favourite?: boolean
  ): Promise<PaginatedResponse<ApiItem>> =>
    safeApiCall(
      () =>
        api("/items", {
          query: {
            page,
            limit,
            search,
            categoryId,
            availability,
            visibility,
            is_favourite,
          },
        }),
      { data: [], total: 0, page: 1, totalPages: 0 }
    ),

  getById: (id: string): Promise<ApiItem | null> =>
    safeApiCall(() => api(`/items/${id}`), null),
};

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
        api("/events", {
          query: { page, limit, search, startDate, endDate },
        }),
      { data: [], total: 0, page: 1, totalPages: 0 }
    ),

  getById: (id: string): Promise<ApiEvent | null> =>
    safeApiCall(() => api(`/events/${id}`), null),
};

// Operation Hours API with fallbacks
export const operationHoursApi = {
  getAll: (
    page = 1,
    limit = 20,
    day?: string
  ): Promise<PaginatedResponse<ApiOperationHour>> =>
    safeApiCall(
      () =>
        api("/operation-hours", {
          query: { page, limit, day },
        }),
      { data: [], total: 0, page: 1, totalPages: 0 }
    ),

  getById: (id: string): Promise<ApiOperationHour | null> =>
    safeApiCall(() => api(`/operation-hours/${id}`), null),
};

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
        api("/api/public/specials", {
          query: { page, limit, search, specialType },
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
        api("/specials/public", {
          query: { page, limit, search, specialType },
        }),
      { data: [], total: 0, page: 1, totalPages: 0 }
    ),

  getByType: (specialType: "daily" | "seasonal" | "latenight"): Promise<any> =>
    safeApiCall(() => api(`/api/public/specials/${specialType}`), {
      specials: [],
      total: 0,
      heading: "",
    }),

  getDailySpecials: (): Promise<any> =>
    safeApiCall(() => api("/api/public/specials/daily"), {
      specials: [],
      total: 0,
      dayName: "",
      heading: "Daily Special",
    }),

  getSeasonalSpecials: (): Promise<any> =>
    safeApiCall(() => api("/api/public/specials/seasonal"), {
      specials: [],
      total: 0,
    }),

  getLateNightSpecials: (): Promise<any> =>
    safeApiCall(() => api("/api/public/specials/latenight"), {
      specials: [],
      total: 0,
      heading: "Latenight Special",
    }),

  // Helper method to get current day specials with proper heading
  getCurrentDaySpecials: (): Promise<any> => {
    return specialsApi.getDailySpecials();
  },

  // Legacy methods for backward compatibility
  getCurrentDaySpecialsLegacy: (): Promise<ApiSpecial[]> => {
    return safeApiCall(
      () =>
        specialsApi
          .getDailySpecials()
          .then((response) => response.specials || []),
      []
    );
  },

  getSeasonalSpecialsLegacy: (): Promise<ApiSpecial[]> =>
    safeApiCall(
      () =>
        specialsApi
          .getSeasonalSpecials()
          .then((response) => response.specials || []),
      []
    ),

  getLastNightSpecials: (): Promise<ApiSpecial[]> =>
    safeApiCall(
      () =>
        specialsApi
          .getLateNightSpecials()
          .then((response) => response.specials || []),
      []
    ),
};

export default api;

// Main composable function
export const useApi = () => {
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

    // Specials - New improved methods
    getSpecials: specialsApi.getAll,
    getSpecialsPublic: specialsApi.getAllPublic,
    getSpecialsByType: specialsApi.getByType,
    getDailySpecials: specialsApi.getDailySpecials,
    getSeasonalSpecials: specialsApi.getSeasonalSpecials,
    getLateNightSpecials: specialsApi.getLateNightSpecials,
    getCurrentDaySpecials: specialsApi.getCurrentDaySpecials,

    // Legacy methods for backward compatibility
    getCurrentDaySpecialsLegacy: specialsApi.getCurrentDaySpecialsLegacy,
    getSeasonalSpecialsLegacy: specialsApi.getSeasonalSpecialsLegacy,
    getLastNightSpecials: specialsApi.getLastNightSpecials,

    // Public API methods
    getPublicLandingContent: publicApi.getLandingContent,
    getPublicMenuData: publicApi.getMenuData,
    getPublicEventsData: publicApi.getEventsData,
    getPublicContactInfo: publicApi.getContactInfo,
    getPublicStoriesData: publicApi.getStoriesData,

    // Direct API access
    api,
    categoriesApi,
    itemsApi,
    eventsApi,
    operationHoursApi,
    specialsApi,
    publicApi,
  };
};
