import { $fetch } from "ofetch";

const API_BASE_URL = "http://localhost:5000";

// Create fetch instance with base configuration
const api = $fetch.create({
  baseURL: API_BASE_URL,
  credentials: "include", // Include cookies
  headers: {
    "Content-Type": "application/json",
  },
});

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

    // Direct API access
    api,
    categoriesApi,
    itemsApi,
    eventsApi,
    operationHoursApi,
  };
};
