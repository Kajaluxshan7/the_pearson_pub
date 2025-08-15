import { ref, computed } from "vue";
import { useApi } from "./useApi";
import type { MenuItem, MenuCategory } from "~/types/menu";
import type { Event } from "~/types/events";
import type { ApiSpecial } from "./useApi";
import type { LandingPageContent } from "./usePublicApi";

// Access publicApi and specialsApi from useApi
const { publicApi, specialsApi } = useApi();

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

  // New specials state
  const dailySpecials = ref<any>(null);
  const seasonalSpecials = ref<any>(null);
  const lateNightSpecials = ref<any>(null);

  // Today's operation status state
  const todayOperationStatus = ref<{
    isOpen: boolean;
    todayHours: any;
    status: string;
  } | null>(null);
  const operationHoursLoading = ref(true);
  const operationHoursError = ref<string | null>(null);

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

  const transformEventToFrontend = (apiEvent: any): Event => {
    // Use TimezoneUtil for proper Toronto timezone handling
    const startDateUtc = new Date(apiEvent.start_date);
    const endDateUtc = new Date(apiEvent.end_date);

    // Get current time in Toronto timezone
    const nowInToronto = new Date();

    // Calculate status based on Canadian time
    let status: "upcoming" | "current" | "ended" = "upcoming";
    if (nowInToronto >= startDateUtc && nowInToronto <= endDateUtc) {
      status = "current";
    } else if (nowInToronto > endDateUtc) {
      status = "ended";
    }

    // Format in Toronto timezone for display
    const startDateFormatted = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Toronto",
    }).format(startDateUtc);

    const endDateFormatted = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Toronto",
    }).format(endDateUtc);

    // Format times in Toronto timezone
    const startTimeFormatted = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Toronto",
    }).format(startDateUtc);

    const endTimeFormatted = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Toronto",
    }).format(endDateUtc);

    return {
      id: apiEvent.id,
      title: apiEvent.name,
      description: apiEvent.description || "",
      fullDescription: apiEvent.description || "",
      date: startDateFormatted, // Use formatted Toronto timezone date
      time: `${startTimeFormatted} - ${endTimeFormatted} EST/EDT`,
      endDate: endDateFormatted, // Use formatted Toronto timezone end date
      startDate: startDateFormatted, // Use formatted date instead of UTC string
      startDateTime: apiEvent.start_date,
      endDateTime: apiEvent.end_date,
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
      status: status, // Use calculated status
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
    };
  };

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
        email: "thepearsonpub@rogers.com",
        address: "101 MARY ST WHITBY, ON, L1N 2R4",
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
      //console.error("Error fetching landing content:", err);
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
      //console.error("Error fetching menu data:", err);
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
      //console.error("Error fetching events data:", err);
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
      //console.error("Error fetching contact info:", err);
    } finally {
      isLoading.value = false;
    }
  };

  // New specials data fetching functions
  const fetchSpecialsData = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      // Fetch all three types of specials in parallel
      const [dailyResponse, seasonalResponse, lateNightResponse] =
        await Promise.all([
          specialsApi.getDailySpecials(),
          specialsApi.getSeasonalSpecials(),
          specialsApi.getLateNightSpecials(),
        ]);

      dailySpecials.value = dailyResponse;
      seasonalSpecials.value = seasonalResponse;
      lateNightSpecials.value = lateNightResponse;
    } catch (err) {
      error.value = "Failed to fetch specials data";
      //console.error("Error fetching specials data:", err);

      // Set fallback data
      dailySpecials.value = {
        specials: [],
        heading: "Daily Special",
        total: 0,
      };
      seasonalSpecials.value = { specials: [], total: 0 };
      lateNightSpecials.value = {
        specials: [],
        heading: "Latenight Special",
        total: 0,
      };
    } finally {
      isLoading.value = false;
    }
  };

  // Today's operation status fetching function
  const fetchTodayOperationStatus = async () => {
    operationHoursLoading.value = true;
    operationHoursError.value = null;
    try {
      const result = await useApi().getTodayOperationStatus();
      //console.log("🕐 Frontend received operation status:", result);
      todayOperationStatus.value = result;
    } catch (err: any) {
      //console.error("🕐 Frontend error fetching operation status:", err);
      operationHoursError.value =
        err.message || "Error fetching operation status";
      todayOperationStatus.value = null;
    } finally {
      operationHoursLoading.value = false;
    }
  };

  // Initialize all data
  const initializeAllData = async () => {
    await Promise.all([
      fetchLandingContent(),
      fetchMenuData(),
      fetchEventsData(),
      fetchContactInfo(),
      fetchSpecialsData(), // Add specials data fetching
      fetchTodayOperationStatus(), // Add today's operation status fetching
    ]);
  };

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
    initializeAllData,
  };
};
