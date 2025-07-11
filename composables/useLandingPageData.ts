import { ref, computed } from "vue";
import { publicApi } from "./useApi";
import type { MenuItem, MenuCategory } from "~/types/menu";
import type { Event } from "~/types/events";

// Landing page content interface
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
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
}

export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  description?: string;
  operationHours: any[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  mapCoordinates: {
    lat: number;
    lng: number;
  };
}

export const useLandingPageData = () => {
  // State
  const landingContent = ref<LandingPageContent | null>(null);
  const menuData = ref<any>(null);
  const eventsData = ref<any>(null);
  const contactInfo = ref<ContactInfo | null>(null);

  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Transform API data to frontend format
  const transformItemToMenuItem = (apiItem: any): MenuItem => ({
    id: apiItem.id,
    name: apiItem.name,
    description: apiItem.description || "",
    price: apiItem.price,
    category: apiItem.category?.name || "",
    subCategory: "mains", // Default fallback
    image: apiItem.images?.[0] || "",
    images: apiItem.images || [],
    ingredients: apiItem.ingredients || [],
    isAvailable: apiItem.availability,
    isVisible: apiItem.visibility,
    isFeatured: apiItem.is_favourite,
    isPearsonFamous: apiItem.is_favourite,
    allergens: [],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
    },
  });

  const transformEventToFrontend = (apiEvent: any): Event => ({
    id: apiEvent.id,
    title: apiEvent.name,
    description: apiEvent.description || "",
    fullDescription: apiEvent.description || "",
    date: new Date(apiEvent.start_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: `${new Date(apiEvent.start_date).toLocaleTimeString()} - ${new Date(
      apiEvent.end_date
    ).toLocaleTimeString()}`,
    image: apiEvent.images?.[0] || "/images/events/default.jpg",
    images:
      apiEvent.images?.length > 0
        ? apiEvent.images
        : ["/images/events/default.jpg"],
    location: "The Pearson Pub",
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
    category: "entertainment",
    ageRestriction: "19+",
    specialRequirements: [],
    contactInfo: {
      phone: "905-430-5699",
      email: "events@thepearsonpub.com",
    },
    organizer: {
      name: "The Pearson Pub",
      description: "Your local neighborhood pub",
    },
  });

  // Computed values
  const featuredMenuItems = computed<MenuItem[]>(() => {
    if (!landingContent.value) return [];
    return landingContent.value.featuredItems.map(transformItemToMenuItem);
  });

  const menuCategories = computed<MenuCategory[]>(() => {
    if (!menuData.value) return [];
    return menuData.value.categories.map((category: any) => ({
      id: category.id,
      name: category.name,
      description: category.description || "",
      items: category.items.map(transformItemToMenuItem),
    }));
  });

  const upcomingEvents = computed<Event[]>(() => {
    if (!landingContent.value) return [];
    return landingContent.value.upcomingEvents.map(transformEventToFrontend);
  });

  const allEvents = computed<Event[]>(() => {
    if (!eventsData.value) return [];
    return eventsData.value.events.map(transformEventToFrontend);
  });

  const operationHours = computed(() => {
    if (!landingContent.value) return [];
    return landingContent.value.operationHours;
  });

  const siteInfo = computed(() => {
    return (
      landingContent.value?.siteInfo ||
      contactInfo.value || {
        name: "The Pearson Pub",
        phone: "905-430-5699",
        email: "info@thepearsonpub.com",
        address: "5179 Dundas Street W, Etobicoke, ON M9A 1C2",
        description:
          "A cozy neighborhood pub offering great food, drinks, and entertainment.",
        socialMedia: {},
      }
    );
  });

  // API methods
  const fetchLandingContent = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const data = await publicApi.getLandingContent();
      landingContent.value = data;
    } catch (err) {
      error.value = "Failed to fetch landing page content";
      console.error("Error fetching landing content:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchMenuData = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const data = await publicApi.getMenuData();
      menuData.value = data;
    } catch (err) {
      error.value = "Failed to fetch menu data";
      console.error("Error fetching menu data:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchEventsData = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const data = await publicApi.getEventsData();
      eventsData.value = data;
    } catch (err) {
      error.value = "Failed to fetch events data";
      console.error("Error fetching events data:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchContactInfo = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const data = await publicApi.getContactInfo();
      contactInfo.value = data;
    } catch (err) {
      error.value = "Failed to fetch contact info";
      console.error("Error fetching contact info:", err);
    } finally {
      isLoading.value = false;
    }
  };

  // Initialize all data
  const initializeAllData = async () => {
    await Promise.all([
      fetchLandingContent(),
      fetchMenuData(),
      fetchEventsData(),
      fetchContactInfo(),
    ]);
  };

  return {
    // State
    landingContent,
    menuData,
    eventsData,
    contactInfo,
    isLoading,
    error,

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
    initializeAllData,
  };
};
