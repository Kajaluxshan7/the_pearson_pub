import { $fetch } from "ofetch";

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
const safeApiCall = async <T>(apiCall: () => Promise<T>, fallback: T): Promise<T> => {
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
    safeApiCall(
      () => api("/categories", { query: { page, limit, search } }),
      { data: [], total: 0, page: 1, totalPages: 0 }
    ),

  getById: (id: string): Promise<ApiCategory | null> =>
    safeApiCall(
      () => api(`/categories/${id}`),
      null
    ),
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
      () => api("/items", {
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
    safeApiCall(
      () => api(`/items/${id}`),
      null
    ),
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
      () => api("/events", {
        query: { page, limit, search, startDate, endDate },
      }),
      { data: [], total: 0, page: 1, totalPages: 0 }
    ),

  getById: (id: string): Promise<ApiEvent | null> =>
    safeApiCall(
      () => api(`/events/${id}`),
      null
    ),
};

// Operation Hours API with fallbacks
export const operationHoursApi = {
  getAll: (
    page = 1,
    limit = 20,
    day?: string
  ): Promise<PaginatedResponse<ApiOperationHour>> =>
    safeApiCall(
      () => api("/operation-hours", {
        query: { page, limit, day },
      }),
      { data: [], total: 0, page: 1, totalPages: 0 }
    ),

  getById: (id: string): Promise<ApiOperationHour | null> =>
    safeApiCall(
      () => api(`/operation-hours/${id}`),
      null
    ),
};

// Public API for landing page content - these endpoints are optional
export const publicApi = {
  getLandingContent: () => 
    safeApiCall(
      () => api("/api/public/landing-content"),
      null
    ),
  getMenuData: () => 
    safeApiCall(
      () => api("/api/public/menu"),
      null
    ),
  getEventsData: () => 
    safeApiCall(
      () => api("/api/public/events"),
      null
    ),
  getContactInfo: () => 
    safeApiCall(
      () => api("/api/public/contact"),
      null
    ),
};

// Specials API for public use with fallbacks
export const specialsApi = {
  getAll: (
    page = 1,
    limit = 50,
    search?: string,
    specialType?: string
  ): Promise<PaginatedResponse<any>> =>
    safeApiCall(
      () => api("/specials", {
        query: { page, limit, search, specialType },
      }),
      { data: [], total: 0, page: 1, totalPages: 0 }
    ),

  getByType: (
    specialType: "daily" | "seasonal" | "latenight"
  ): Promise<any[]> =>
    safeApiCall(
      () => api("/specials", {
        query: { specialType, limit: 50 },
      }).then((response) => response.data),
      []
    ),

  getCurrentDaySpecials: (): Promise<any[]> => {
    const currentDay = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
    return safeApiCall(
      () => api("/specials", {
        query: { specialType: "daily", limit: 50 },
      }).then((response) => response.data),
      []
    );
  },

  getSeasonalSpecials: (): Promise<any[]> =>
    safeApiCall(
      () => api("/specials", {
        query: { specialType: "seasonal", limit: 50 },
      }).then((response) => response.data),
      []
    ),

  getLastNightSpecials: (): Promise<any[]> =>
    safeApiCall(
      () => api("/specials", {
        query: { specialType: "latenight", limit: 50 },
      }).then((response) => response.data),
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

    // Specials
    getSpecials: specialsApi.getAll,
    getSpecialsByType: specialsApi.getByType,
    getCurrentDaySpecials: specialsApi.getCurrentDaySpecials,
    getSeasonalSpecials: specialsApi.getSeasonalSpecials,
    getLastNightSpecials: specialsApi.getLastNightSpecials,

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
