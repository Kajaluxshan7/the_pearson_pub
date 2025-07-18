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

// Create fetch instance with base configuration
const createApiClient = () => {
  const API_BASE_URL = getApiBaseUrl();

  return $fetch.create({
    baseURL: API_BASE_URL,
    credentials: "include", // Include cookies
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Create the API client
const api = createApiClient();

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

// Categories API
export const categoriesApi = {
  getAll: (
    page = 1,
    limit = 50,
    search?: string
  ): Promise<PaginatedResponse<ApiCategory>> =>
    api("/categories", {
      query: { page, limit, search },
    }),

  getById: (id: string): Promise<ApiCategory> => api(`/categories/${id}`),
};

// Items API
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

  getById: (id: string): Promise<ApiItem> => api(`/items/${id}`),
};

// Events API
export const eventsApi = {
  getAll: (
    page = 1,
    limit = 50,
    search?: string,
    startDate?: string,
    endDate?: string
  ): Promise<PaginatedResponse<ApiEvent>> =>
    api("/events", {
      query: { page, limit, search, startDate, endDate },
    }),

  getById: (id: string): Promise<ApiEvent> => api(`/events/${id}`),
};

// Operation Hours API
export const operationHoursApi = {
  getAll: (
    page = 1,
    limit = 20,
    day?: string
  ): Promise<PaginatedResponse<ApiOperationHour>> =>
    api("/operation-hours", {
      query: { page, limit, day },
    }),

  getById: (id: string): Promise<ApiOperationHour> =>
    api(`/operation-hours/${id}`),
};

// Public API for landing page content
export const publicApi = {
  getLandingContent: () => api("/api/public/landing-content"),
  getMenuData: () => api("/api/public/menu"),
  getEventsData: () => api("/api/public/events"),
  getContactInfo: () => api("/api/public/contact"),
};

// Specials API for public use
export const specialsApi = {
  getAll: (
    page = 1,
    limit = 50,
    search?: string,
    specialType?: string
  ): Promise<PaginatedResponse<any>> =>
    api("/specials", {
      query: { page, limit, search, specialType },
    }),

  getByType: (
    specialType: "daily" | "seasonal" | "latenight"
  ): Promise<any[]> =>
    api("/specials", {
      query: { specialType, limit: 50 },
    }).then((response) => response.data),

  getCurrentDaySpecials: (): Promise<any[]> => {
    const currentDay = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
    return api("/specials", {
      query: { specialType: "daily", limit: 50 },
    }).then((response) => response.data);
  },

  getSeasonalSpecials: (): Promise<any[]> =>
    api("/specials", {
      query: { specialType: "seasonal", limit: 50 },
    }).then((response) => response.data),

  getLastNightSpecials: (): Promise<any[]> =>
    api("/specials", {
      query: { specialType: "latenight", limit: 50 },
    }).then((response) => response.data),
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
