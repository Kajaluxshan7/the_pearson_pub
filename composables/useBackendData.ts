import { ref, computed } from "vue";
import {
  categoriesApi,
  itemsApi,
  eventsApi,
  operationHoursApi,
} from "./useApi";
import type {
  ApiCategory,
  ApiItem,
  ApiEvent,
  ApiOperationHour,
} from "./useApi";
import type { MenuItem, MenuCategory } from "~/types/menu";
import type { Event } from "~/types/events";

export const useBackendData = () => {
  // State
  const categories = ref<ApiCategory[]>([]);
  const items = ref<ApiItem[]>([]);
  const events = ref<ApiEvent[]>([]);
  const operationHours = ref<ApiOperationHour[]>([]);

  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Pagination state
  const pagination = ref({
    categories: { page: 1, totalPages: 1, total: 0 },
    items: { page: 1, totalPages: 1, total: 0 },
    events: { page: 1, totalPages: 1, total: 0 },
    operationHours: { page: 1, totalPages: 1, total: 0 },
  });

  // Transform API data to frontend format
  const transformItemToMenuItem = (apiItem: ApiItem): MenuItem => ({
    id: apiItem.id,
    name: apiItem.name,
    description: apiItem.description || "",
    price: apiItem.price,
    category: apiItem.category?.name || "",
    subCategory: "mains", // Default fallback
    image: apiItem.images?.[0] || "",
    images: apiItem.images,
    ingredients: apiItem.ingredients,
    isAvailable: apiItem.availability,
    isVisible: apiItem.visibility,
    isFeatured: apiItem.is_favourite,
    isPearsonFamous: apiItem.is_favourite, // Using is_favourite as famous
    allergens: [], // Would need to be added to backend
    dietaryInfo: {
      // These would need to be added to backend
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
    },
  });

  const transformEventToFrontend = (apiEvent: ApiEvent): Event => ({
    id: apiEvent.id,
    title: apiEvent.name,
    description: apiEvent.description || "",
    fullDescription: apiEvent.description || "",
    date: new Date(apiEvent.start_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: `${new Date(apiEvent.start_date).toLocaleDateString()} - ${new Date(
      apiEvent.end_date
    ).toLocaleDateString()}`,
    image: apiEvent.images?.[0] || "/images/events/default.jpg",
    images:
      apiEvent.images.length > 0
        ? apiEvent.images
        : ["/images/events/default.jpg"],
    location: "The Pearson Pub", // Default
    venue: {
      name: "The Pearson Pub",
      capacity: 100,
      layout: "Standard seating",
    },
    tags: ["Event"],
    performers: [],
    featured: true,
    ctaText: "Learn More",
    ctaLink: "/contact",
    price: { general: 0 },
    ticketsAvailable: 100,
    status: "upcoming",
    category: "general",
    ageRestriction: "19+",
    specialRequirements: [],
    contactInfo: {
      phone: "905-430-5699",
      email: "events@thepearsonpub.com",
    },
    organizer: {
      name: "The Pearson Pub",
      contact: "events@thepearsonpub.com",
    },
  });

  // Computed values
  const menuCategories = computed<MenuCategory[]>(() => {
    return categories.value.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description || "",
      items: items.value
        .filter((item) => item.categoryId === category.id)
        .map(transformItemToMenuItem),
    }));
  });

  const transformedEvents = computed<Event[]>(() => {
    return events.value.map(transformEventToFrontend);
  });

  // API methods
  const fetchCategories = async (page = 1, search?: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await categoriesApi.getAll(page, 50, search);

      if (page === 1) {
        categories.value = response.data;
      } else {
        categories.value.push(...response.data);
      }

      pagination.value.categories = {
        page: response.page,
        totalPages: response.totalPages,
        total: response.total,
      };
    } catch (err) {
      error.value = "Failed to fetch categories";
      console.error("Error fetching categories:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchItems = async (
    page = 1,
    filters: {
      search?: string;
      categoryId?: string;
      availability?: boolean;
      visibility?: boolean;
      is_favourite?: boolean;
    } = {}
  ) => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await itemsApi.getAll(
        page,
        50,
        filters.search,
        filters.categoryId,
        filters.availability,
        filters.visibility,
        filters.is_favourite
      );

      if (page === 1) {
        items.value = response.data;
      } else {
        items.value.push(...response.data);
      }

      pagination.value.items = {
        page: response.page,
        totalPages: response.totalPages,
        total: response.total,
      };
    } catch (err) {
      error.value = "Failed to fetch items";
      console.error("Error fetching items:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchEvents = async (
    page = 1,
    filters: {
      search?: string;
      startDate?: string;
      endDate?: string;
    } = {}
  ) => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await eventsApi.getAll(
        page,
        50,
        filters.search,
        filters.startDate,
        filters.endDate
      );

      if (page === 1) {
        events.value = response.data;
      } else {
        events.value.push(...response.data);
      }

      pagination.value.events = {
        page: response.page,
        totalPages: response.totalPages,
        total: response.total,
      };
    } catch (err) {
      error.value = "Failed to fetch events";
      console.error("Error fetching events:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchOperationHours = async (page = 1, day?: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await operationHoursApi.getAll(page, 20, day);

      if (page === 1) {
        operationHours.value = response.data;
      } else {
        operationHours.value.push(...response.data);
      }

      pagination.value.operationHours = {
        page: response.page,
        totalPages: response.totalPages,
        total: response.total,
      };
    } catch (err) {
      error.value = "Failed to fetch operation hours";
      console.error("Error fetching operation hours:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchItemById = async (id: string): Promise<MenuItem | null> => {
    try {
      const item = await itemsApi.getById(id);
      return transformItemToMenuItem(item);
    } catch (err) {
      console.error("Error fetching item:", err);
      return null;
    }
  };

  const fetchEventById = async (id: string): Promise<Event | null> => {
    try {
      const event = await eventsApi.getById(id);
      return transformEventToFrontend(event);
    } catch (err) {
      console.error("Error fetching event:", err);
      return null;
    }
  };

  // Initialize data
  const initializeData = async () => {
    await Promise.all([
      fetchCategories(),
      fetchItems(),
      fetchEvents(),
      fetchOperationHours(),
    ]);
  };

  // Pagination helpers
  const loadMoreItems = async () => {
    if (pagination.value.items.page < pagination.value.items.totalPages) {
      await fetchItems(pagination.value.items.page + 1);
    }
  };

  const loadMoreEvents = async () => {
    if (pagination.value.events.page < pagination.value.events.totalPages) {
      await fetchEvents(pagination.value.events.page + 1);
    }
  };

  return {
    // State
    categories,
    items,
    events,
    operationHours,
    isLoading,
    error,
    pagination,

    // Computed
    menuCategories,
    transformedEvents,

    // Methods
    fetchCategories,
    fetchItems,
    fetchEvents,
    fetchOperationHours,
    fetchItemById,
    fetchEventById,
    initializeData,
    loadMoreItems,
    loadMoreEvents,
  };
};
