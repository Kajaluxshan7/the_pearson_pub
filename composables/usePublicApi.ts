import { $fetch } from "ofetch";

const getApiBaseUrl = () => {
  try {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl as string;
    if (!apiBaseUrl) {
      console.warn("NUXT_PUBLIC_API_BASE_URL is not set in runtime config. Falling back to default.");
      return "http://localhost:5000";
    }
    return apiBaseUrl;
  } catch (error) {
    console.error("Error accessing runtime config:", error);
    // Fallback for SSR or when runtime config is not available
    return "http://localhost:5000";
  }
};

// Create fetch instance with base configuration (lazy initialization)
const createApiClient = () => {
  const baseURL = getApiBaseUrl();  
  return $fetch.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Lazy getter for API client
const getApi = () => createApiClient();

export interface PublicMenuData {
  categories: Array<{
    id: string;
    name: string;
    description?: string;
    items: Array<{
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
      categoryId: string;
      created_at: string;
      updated_at: string;
      dietaryInfo?: {
        isVegetarian?: boolean;
        isVegan?: boolean;
        isGlutenFree?: boolean;
      };
    }>;
    created_at: string;
    updated_at: string;
  }>;
  totalItems: number;
}

export interface PublicEventsData {
  events: Array<{
    id: string;
    name: string;
    title: string;
    description?: string;
    images: string[];
    image?: string; // Main image (first from images array)
    start_date: string;
    end_date: string;
    startDate: string; // Frontend compatibility
    endDate: string; // Frontend compatibility
    status: 'upcoming' | 'ongoing' | 'ended';
    category: string;
    featured: boolean;
    price: any;
    location: string;
    created_at: string;
    updated_at: string;
  }>;
  total: number;
}

export interface PublicContactData {
  name: string;
  phone: string;
  email: string;
  address: string;
  operationHours: Array<{
    id: string;
    day: string;
    open_time: string;
    close_time: string;
    status: boolean;
    created_at: string;
    updated_at: string;
  }>;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  mapCoordinates: {
    lat: number;
    lng: number;
  };
}

export interface ApiStory {
  id: string;
  title: string;
  description?: string;
  images: string[];
  image?: string; // Main image (first from images array)
  created_at: string;
  updated_at: string;
  // Mapped fields for UI compatibility
  category?: string;
  icon?: string;
  date?: string;
  createdAt?: string; // Alternative name for created_at
}

export interface LandingPageContent {
  categories: any[];
  featuredItems: any[];
  allItems: any[];
  upcomingEvents: any[];
  todaysSpecials: any[];
  operationHours: any[];
  siteInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
    description: string;
    socialMedia: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
  };
}

// Public API endpoints
export const publicApi = {
  // Landing page content with all data
  getLandingContent: (): Promise<LandingPageContent> =>
    getApi()("/api/public/landing-content"),

  // Menu data (categories with items)
  getMenuData: (): Promise<PublicMenuData> => getApi()("/api/public/menu"),

  // Events data
  getEventsData: (): Promise<PublicEventsData> => getApi()("/api/public/events"),

  // Contact info with operation hours
  getContactInfo: (): Promise<PublicContactData> => getApi()("/api/public/contact"),

  // Stories data
  getStoriesData: (): Promise<ApiStory[]> => getApi()("/api/public/stories").then((response: any) => {
    // Handle both direct array response and wrapped response
    if (Array.isArray(response)) {
      return response;
    }
    return response.stories || [];
  }),
};

export default publicApi;

// Main composable function for public API
export const usePublicApi = () => {
  return {
    // Public endpoints
    getLandingContent: publicApi.getLandingContent,
    getMenuData: publicApi.getMenuData,
    getEventsData: publicApi.getEventsData,
    getContactInfo: publicApi.getContactInfo,
    getStoriesData: publicApi.getStoriesData,

    // Direct API access
    api: getApi,
    publicApi,
  };
};
