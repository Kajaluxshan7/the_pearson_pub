<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <section
      class="hero-section relative py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden"
    >
      
      <div class="absolute inset-0">
        <NuxtImg
          src="/images/entertainment/music.jpg"
          alt="Events & Entertainment"
          class="w-full h-full object-cover opacity-30"
          format="webp"
          quality="80"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/85 to-black/65"
        ></div>
      </div>
      
      <div
        class="hero-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
      >
        <div class="inline-block mb-4">
          <span
            class="text-yellow-400 font-semibold text-sm lg:text-lg tracking-wide uppercase"
            >Live Entertainment</span
          >
          <div class="w-12 lg:w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
        </div>
        <h1
          class="text-3xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          style="font-family: 'Cinzel', 'Georgia', serif"
        >
          Events &amp; <span class="text-yellow-400">Entertainment</span>
        </h1>
        <p
          class="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
        >
          Join us for <span class="text-yellow-300">live music</span>,
          <span class="text-yellow-300">pub quizzes</span>, and
          <span class="text-yellow-300">special events</span>
        </p>
      </div>
    </section>    <!-- Filters and Search Section -->
    <section
      class="filter-section py-6 lg:py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between"
        >
          <!-- Search Bar -->
          <div class="flex-1 max-w-md">
            <div class="relative">
              <UIcon
                name="i-heroicons-magnifying-glass"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search events..."
                class="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Category Filters -->
          <div class="flex flex-wrap gap-2 lg:gap-3">            <button
              v-for="category in categories"
              :key="category.id"
              :class="[
                'category-btn px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap',
                selectedCategory === category.id
                  ? 'bg-yellow-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-yellow-100 dark:hover:bg-yellow-900 hover:shadow-lg',
              ]"
              @click="
                selectedCategory =
                  selectedCategory === category.id ? 'all' : category.id
              "
            >
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- Active Filters Display -->
        <div
          v-if="selectedCategory !== 'all' || searchQuery"
          class="flex flex-wrap gap-2 mt-4"
        >
          <span class="text-sm text-gray-600 dark:text-gray-300 mr-2"
            >Active filters:</span
          >
          <UBadge
            v-if="selectedCategory !== 'all'"
            color="yellow"
            variant="subtle"
            class="cursor-pointer"
            @click="selectedCategory = 'all'"
          >
            {{ categories.find((c: Category) => c.id === selectedCategory)?.name }}
            <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
          </UBadge>
          <UBadge
            v-if="searchQuery"
            color="blue"
            variant="subtle"
            class="cursor-pointer"
            @click="searchQuery = ''"
          >
            "{{ searchQuery }}"
            <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
          </UBadge>
        </div>
      </div>
    </section>

    <!-- Events Section -->
    <section class="py-12 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Unified Events & Parties Heading -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2
              class="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2"
              style="font-family: 'Cinzel', 'Georgia', serif"
            >
              Events & Parties
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              {{ filteredEvents.length }} event{{ filteredEvents.length !== 1 ? "s" : "" }} found
            </p>
          </div>
          <div class="hidden sm:flex items-center gap-2">
            <span class="text-sm text-gray-500 dark:text-gray-400">Layout:</span>
            <UBadge 
              :color="viewMode === 'grid' ? 'yellow' : 'gray'" 
              variant="subtle"
              class="cursor-pointer"
              @click="viewMode = 'grid'"
            >
              Grid
            </UBadge>
            <UBadge 
              :color="viewMode === 'list' ? 'yellow' : 'gray'" 
              variant="subtle"
              class="cursor-pointer"
              @click="viewMode = 'list'"
            >
              List
            </UBadge>
          </div>
        </div>
        <!-- Error State -->
        <div v-if="error || backendError" class="text-center py-16">
          <UIcon
            name="i-heroicons-exclamation-triangle"
            class="w-16 h-16 text-red-400 mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            {{ error || backendError }}
          </p>
          <UButton
            color="red"
            variant="outline"
            @click="error = null; fetchEvents()"
          >
            Try Again
          </UButton>
        </div>

        <!-- Simple Loading State -->

        <!-- Unified Events Section -->
        <div v-if="filteredEvents.length > 0">
          <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            <div
              v-for="(event, index) in filteredEvents"
              :key="event.id"
              class="event-card group transform transition-all duration-500 hover:scale-105 cursor-pointer"
              :style="{ animationDelay: `${index * 100}ms` }"
              @click="showEventDetails(event)"
              @keydown.enter="showEventDetails(event)"
              @keydown.space.prevent="showEventDetails(event)"
              tabindex="0"
              role="button"
              :aria-label="`View details for ${event.title}`"
            >
              <UCard
                class="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-0 h-full"
              >
                <template #header>
                  <div class="relative overflow-hidden">
                    <NuxtImg
                      :key="`event-${event.id}-${index}-${currentImageIndexes[`${event.id}-${index}`] || 0}`"
                      :src="getCurrentImage(event, index)"
                      :alt="event.title"
                      class="w-full h-48 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      format="webp"
                      quality="75"
                      loading="lazy"
                      :placeholder="[400, 240, 75]"
                      @error="(e: any) => e.target.src = '/images/entertainment/music.jpg'"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <!-- Image Indicators for Multiple Images -->
                    <div v-if="event.images && event.images.length > 1" class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      <div
                        v-for="(img, imgIndex) in event.images"
                        :key="imgIndex"
                        :class="[
                          'w-2 h-2 rounded-full transition-all duration-300',
                          (currentImageIndexes[`${event.id}-${index}`] || 0) === imgIndex
                            ? 'bg-yellow-400'
                            : 'bg-white/50'
                        ]"
                      ></div>
                    </div>
                    <!-- Image Counter -->
                    <div v-if="event.images && event.images.length > 1" class="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                      {{ (currentImageIndexes[`${event.id}-${index}`] || 0) + 1 }}/{{ event.images.length }}
                    </div>
                    <!-- Badges -->
                    <div class="absolute top-4 left-4 flex flex-col gap-2">
                      <UBadge v-if="event.featured" color="yellow" variant="solid" class="font-semibold text-xs">Featured</UBadge>
                      <UBadge :color="getStatusColor(event.status)" variant="solid" class="font-semibold text-xs">
                        {{ event.status.charAt(0).toUpperCase() + event.status.slice(1) }}
                      </UBadge>
                    </div>
                    <div class="absolute top-4 right-4">
                      <UBadge :color="getCategoryColor(event.category)" variant="subtle" class="font-semibold text-xs">
                        {{ event.category.charAt(0).toUpperCase() + event.category.slice(1) }}
                      </UBadge>
                    </div>
                  </div>
                </template>
                <div class="p-4 lg:p-6 flex flex-col h-full">
                  <h3 class="text-xl lg:text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {{ event.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3 flex-grow">
                    {{ event.description }}
                  </p>
                  <div class="space-y-2 mb-4">
                    <div v-if="event.date" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <UIcon name="i-heroicons-calendar" class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400" />
                      <span class="font-medium">{{ event.date }}</span>
                    </div>
                    <div v-if="event.time && event.time !== event.date" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <UIcon name="i-heroicons-clock" class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400" />
                      <span class="font-medium">{{ event.time }}</span>
                    </div>
                  </div>
                  <UButton color="yellow" variant="solid" class="w-full transform transition-all hover:scale-105 mt-auto" size="md">
                    View Details
                  </UButton>
                </div>
              </UCard>
            </div>
          </div>
          <div v-else class="space-y-6">
            <div
              v-for="(event, index) in filteredEvents"
              :key="event.id"
              class="event-card group cursor-pointer"
              :style="{ animationDelay: `${index * 100}ms` }"
              @click="showEventDetails(event)"
              @keydown.enter="showEventDetails(event)"
              @keydown.space.prevent="showEventDetails(event)"
              tabindex="0"
              role="button"
              :aria-label="`View details for ${event.title}`"
            >
              <UCard class="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-0">
                <div class="flex flex-col lg:flex-row">
                  <!-- Image -->
                  <div class="lg:w-80 relative overflow-hidden">
                    <NuxtImg
                      :key="`event-list-${event.id}-${index}-${currentImageIndexes[`${event.id}-${index}`] || 0}`"
                      :src="getCurrentImage(event, index)"
                      :alt="event.title"
                      class="w-full h-48 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      format="webp"
                      quality="75"
                      loading="lazy"
                      :placeholder="[400, 240, 75]"
                      @error="(e: any) => e.target.src = '/images/entertainment/music.jpg'"
                    />
                    <!-- Image Indicators for Multiple Images -->
                    <div v-if="event.images && event.images.length > 1" class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      <div
                        v-for="(img, imgIndex) in event.images"
                        :key="imgIndex"
                        :class="[
                          'w-2 h-2 rounded-full transition-all duration-300',
                          (currentImageIndexes[`${event.id}-${index}`] || 0) === imgIndex
                            ? 'bg-yellow-400'
                            : 'bg-white/50'
                        ]"
                      ></div>
                    </div>
                    <!-- Image Counter -->
                    <div v-if="event.images && event.images.length > 1" class="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                      {{ (currentImageIndexes[`${event.id}-${index}`] || 0) + 1 }}/{{ event.images.length }}
                    </div>
                    <!-- Badges -->
                    <div class="absolute top-4 left-4 flex flex-col gap-2">
                      <UBadge v-if="event.featured" color="yellow" variant="solid" class="font-semibold text-xs">Featured</UBadge>
                      <UBadge :color="getStatusColor(event.status)" variant="solid" class="font-semibold text-xs">
                        {{ event.status.charAt(0).toUpperCase() + event.status.slice(1) }}
                      </UBadge>
                    </div>
                  </div>
                  <!-- Content -->
                  <div class="flex-1 p-6 lg:p-8">
                    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                      <div class="flex-1">
                        <div class="flex items-start justify-between mb-4">
                          <div>
                            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors mb-2">
                              {{ event.title }}
                            </h3>
                            <UBadge :color="getCategoryColor(event.category)" variant="subtle" class="font-semibold text-sm">
                              {{ event.category.charAt(0).toUpperCase() + event.category.slice(1) }}
                            </UBadge>
                          </div>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                          {{ event.description }}
                        </p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div v-if="event.date" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <UIcon name="i-heroicons-calendar" class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400" />
                            <span class="font-medium">{{ event.date }}</span>
                          </div>
                          <div v-if="event.time && event.time !== event.date" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <UIcon name="i-heroicons-clock" class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400" />
                            <span class="font-medium">{{ event.time }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="lg:ml-6">
                        <UButton color="yellow" variant="solid" size="lg" class="w-full lg:w-auto">
                          View Details
                        </UButton>
                      </div>
                    </div>
                  </div>
                </div>
              </UCard>
            </div>
          </div>
        </div>
        <!-- No Results -->
        <div v-else class="text-center py-16">
          <UIcon name="i-heroicons-calendar-x" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No events found</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            <span v-if="searchQuery || selectedCategory !== 'all'">Try adjusting your search or filters to find more events.</span>
            <span v-else>Check back soon for upcoming events!</span>
          </p>
          <UButton v-if="searchQuery || selectedCategory !== 'all'" color="yellow" variant="outline" @click="clearFilters">Clear Filters</UButton>
        </div>
      </div>
    </section>

    <!-- Event Details Modal -->
    <template v-if="isEventModalOpen">
      <EventDetailsModal
        v-if="modalLayout === 'portrait'"
        :event="selectedEvent"
        :is-open="isEventModalOpen"
        @close="closeEventModal"
      ></EventDetailsModal>
      <EventDetailsModalLandscape
        v-else
        :event="selectedEvent"
        :is-open="isEventModalOpen"
        @close="closeEventModal"
      ></EventDetailsModalLandscape>
    </template>

    <!-- Modal Layout Toggle (when modal is open) -->
    <div
      v-if="isEventModalOpen"
      class="fixed bottom-6 right-6 z-[60] flex gap-2"
    >
      <UButton
        @click="toggleModalLayout"
        color="gray"
        variant="solid"
        size="sm"
        class="shadow-lg backdrop-blur-sm"
      >
        <UIcon :name="modalLayout === 'portrait' ? 'i-heroicons-arrows-pointing-out' : 'i-heroicons-arrows-pointing-in'" class="w-4 h-4 mr-1" />
        {{ modalLayout === 'portrait' ? 'Landscape' : 'Portrait' }}
      </UButton>
    </div>    <!-- Weekly Schedule Section -->
    <WeeklyEntertainment />    <!-- Floating Action Button -->
    <!-- Removed Floating Action Button component usage -->

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useEvents } from "~/composables/useEvents";
import { useLandingPageData } from "~/composables/useLandingPageData";
import { usePerformance } from "~/composables/usePerformance";
import EventDetailsModal from "~/components/events/EventDetailsModal.vue";
import EventDetailsModalLandscape from "~/components/events/EventDetailsModalLandscape.vue";  // SSR/SSG: useAsyncData for events data
const { data: eventsData } = await useAsyncData('events-data', async () => {
  const { fetchEventsData } = useLandingPageData();
  await fetchEventsData();
  return true;
});

// Backend events data
const {
  eventsData: backendEventsData,
  allEvents: dynamicEvents,
  isLoading: backendLoading,
  error: backendError,
  fetchEventsData,
} = useLandingPageData();

// Alias for compatibility
const fetchEvents = fetchEventsData;
import type { Event } from "~/types/events";
import type { Category } from "~/types/events-ui";

// Composables
const { events: staticEvents } = useEvents(); // Keep for weekly schedule

// Performance monitoring
const { 
  preloadImage,
  isVisible,
  metrics
} = usePerformance();

// Reactive data
const searchQuery = ref("");
const selectedCategory = ref("all");
const viewMode = ref<"grid" | "list">("grid");
const currentPage = ref(1);
const itemsPerPage = 8; // Changed to 8 as requested

// Pagination for backend events
const eventPagination = ref({
  events: {
    page: 1,
    totalPages: 1,
    total: 0
  }
});

// Modal state
const selectedEvent = ref<Event | null>(null);
const isEventModalOpen = ref(false);
const modalLayout = ref<'portrait' | 'landscape'>('portrait');

// Image rotation for events with multiple images
const currentImageIndexes = ref<{ [key: string]: number }>({});

// Categories with proper typing
const categories = ref<Category[]>([
  { id: "all", name: "All Events" },
  { id: "music", name: "Music" },
  { id: "quiz", name: "Quiz Night" },
  { id: "food", name: "Food & Drink" },
  { id: "special", name: "Special Events" },
  { id: "entertainment", name: "Entertainment" },
]);

// Error handling
const error = ref<string | null>(null);
const isLoading = ref(false);

// Combine static events with backend events for display
const allEvents = computed(() => {
  const dynamic = dynamicEvents.value || [];
  
  // Helper function to calculate real-time event status
  const calculateRealTimeStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) {
      return 'upcoming';
    } else if (now >= start && now <= end) {
      return 'ongoing';
    } else {
      return 'ended';
    }
  };

  // Log the raw backend events data
  console.log('Backend dynamic events:', dynamic);
  console.log('Current date for comparison:', new Date());

  // Transform backend events to match frontend interface
  const transformedDynamic = dynamic.map((event: any) => {
    // Log each event's dates and status from the backend
    console.log('Event from backend:', {
      name: event.name,
      start_date: event.start_date,
      end_date: event.end_date,
      startDate: event.startDate,
      endDate: event.endDate,
      status: event.status
    });

    // Use the formatted dates from backend
    const startDateFormatted = event.startDate || ''; // "Jul 10, 2025"
    const endDateFormatted = event.endDate || '';     // "Jul 18, 2025"
    
    // Create date and time display
    let dateDisplay = startDateFormatted;
    let timeDisplay = '';
    
    // If we have both start and end dates and they're different, show as time range
    if (startDateFormatted && endDateFormatted && startDateFormatted !== endDateFormatted) {
      timeDisplay = `Until ${endDateFormatted}`;
    }    

    // Use the status from backend (already calculated correctly)
    const eventStatus = event.status;

    return {
      id: event.id,
      title: event.title || event.name,
      description: event.description || '',
      date: dateDisplay,
      time: timeDisplay,
      image: (event.images && event.images.length > 0) ? event.images[0] : '/images/entertainment/music.jpg',
      images: event.images || [],
      featured: event.featured || false,
      category: (event.category || 'event') as 'music' | 'quiz' | 'food' | 'special' | 'entertainment' | 'event',
      status: eventStatus as 'upcoming' | 'ongoing' | 'current' | 'completed' | 'cancelled' | 'ended',
      ctaText: "View Details",
      ctaLink: "#"
    };
  });
  
  // Log the transformed events
  console.log('Transformed events:', transformedDynamic);

  // Sort by date (newest first) - handle both formatted dates and ISO strings
  return transformedDynamic.sort((a, b) => {
    // Try to parse the date from various formats
    const parseDate = (dateStr: string) => {
      if (!dateStr) return new Date('1970-01-01');
      
      // If it's already a valid date format, use it
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) return parsed;
      
      // Try parsing formatted date like "Jul 10, 2025"
      try {
        return new Date(dateStr);
      } catch {
        return new Date('1970-01-01');
      }
    };
    
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });
});

// Computed properties with error handling
const filteredEvents = computed(() => {
  try {
    let filtered = allEvents.value || [];

    // Filter by category
    if (selectedCategory.value !== "all") {
      filtered = filtered.filter(
        (event: any) => event.category === selectedCategory.value
      );
    }

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(
        (event: any) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.tags?.some((tag: string) => tag.toLowerCase().includes(query)) ||
          event.performers?.some((performer: string) =>
            performer.toLowerCase().includes(query)
          ) ||
          event.location?.toLowerCase().includes(query)
      );
    }

    return filtered;
  } catch (err) {
    console.error('Error filtering events:', err);
    error.value = 'Failed to filter events';
    return [];
  }
});

// Separate upcoming and past events
const upcomingEvents = computed(() => {
  return filteredEvents.value.filter(event => 
    event.status === 'upcoming' || event.status === 'ongoing' || event.status === 'current'
  ).sort((a, b) => {
    // Sort upcoming events by date (earliest first)
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
});

const pastEvents = computed(() => {
  return filteredEvents.value.filter(event => 
    event.status === 'ended' || event.status === 'completed'
  ).sort((a, b) => {
    // Sort past events by date (most recent first)
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
});

const totalPages = computed(() => 1); // No pagination needed since we show all events

const paginatedEvents = computed(() => {
  // This is kept for backward compatibility but not used
  return filteredEvents.value;
});

// Helper functions with proper error handling
const getStatusColor = (status: string) => {
  const statusColors = {
    upcoming: "green",
    ongoing: "blue",
    current: "blue", 
    completed: "gray",
    cancelled: "red",
    ended: "gray"
  } as const;
  return statusColors[status as keyof typeof statusColors] || "gray";
};

const getCategoryColor = (category: string) => {
  const categoryColors = {
    music: "purple",
    quiz: "blue",
    food: "orange",
    special: "pink",
    entertainment: "indigo"
  } as const;
  return categoryColors[category as keyof typeof categoryColors] || "gray";
};

// Safe price calculation
const minPrice = (priceObj: Record<string, number | undefined | null>): string => {
  try {
    const prices = Object.values(priceObj).filter((p): p is number => 
      typeof p === 'number' && !isNaN(p) && p > 0
    );
    return prices.length > 0 ? Math.min(...prices).toFixed(2) : '0';
  } catch (err) {
    console.error('Error calculating minimum price:', err);
    return '0';
  }
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "all";
  currentPage.value = 1;
};

// Event modal functions with proper typing
const showEventDetails = (event: any, layout: 'portrait' | 'landscape' = 'portrait') => {
  selectedEvent.value = event as Event;
  modalLayout.value = layout;
  isEventModalOpen.value = true;
};

const closeEventModal = () => {
  isEventModalOpen.value = false;
  selectedEvent.value = null;
};

// Layout toggle for modal
const toggleModalLayout = () => {
  modalLayout.value = modalLayout.value === 'portrait' ? 'landscape' : 'portrait';
};

// Watch for filter changes to reset pagination
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1;
});

// Responsive view mode with performance optimization
const checkViewMode = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth < 768) {
      viewMode.value = "grid";
    }
  }
};

// Keyboard navigation support
const handleKeyNavigation = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowLeft':
      if (currentPage.value > 1) {
        currentPage.value--;
      }
      break;
    case 'ArrowRight':
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
      break;
    case 'Home':
      currentPage.value = 1;
      break;
    case 'End':
      currentPage.value = totalPages.value;
      break;
  }
};

// Load more events function for pagination
const loadMoreEvents = async () => {
  try {
    eventPagination.value.events.page += 1;
    // Since we're using static pagination, just update the counter
    // In a real implementation, this would fetch more data from the backend
  } catch (error) {
    console.error('Error loading more events:', error);
  }
};

// Image rotation functions for events with multiple images
const getCurrentImage = (event: any, index: number) => {
  if (!event.images || event.images.length === 0) {
    return event.image || '/images/entertainment/music.jpg';
  }
  if (event.images.length === 1) {
    return event.images[0] || '/images/entertainment/music.jpg';
  }
  
  const eventKey = `${event.id}-${index}`;
  const currentIndex = currentImageIndexes.value[eventKey] || 0;
  const imageUrl = event.images[currentIndex] || event.images[0] || '/images/entertainment/music.jpg';
  
  // Fallback for corrupted or invalid URLs
  try {
    new URL(imageUrl);
    return imageUrl;
  } catch {
    return '/images/entertainment/music.jpg';
  }
};

const initializeImageRotation = () => {
  // Initialize rotation for all events with multiple images
  if (allEvents.value) {
    allEvents.value.forEach((event, index) => {
      if (event.images && event.images.length > 1) {
        const eventKey = `${event.id}-${index}`;
        if (!(eventKey in currentImageIndexes.value)) {
          currentImageIndexes.value[eventKey] = 0;
        }
        
        // Start rotation
        setInterval(() => {
          const currentIndex = currentImageIndexes.value[eventKey] || 0;
          const nextIndex = (currentIndex + 1) % event.images.length;
          currentImageIndexes.value[eventKey] = nextIndex;
        }, 3000); // Change image every 3 seconds
      }
    });
  }
};

onMounted(async () => {
  // Fetch backend data
  await fetchEvents();
  
  // Update pagination based on events data
  if (dynamicEvents.value) {
    eventPagination.value.events.total = dynamicEvents.value.length;
    eventPagination.value.events.totalPages = Math.ceil(dynamicEvents.value.length / 50);
  }
  
  // Initialize image rotation for events with multiple images
  await nextTick();
  initializeImageRotation();
  
  checkViewMode();
  window.addEventListener("resize", checkViewMode);
  document.addEventListener("keydown", handleKeyNavigation);
  
  // Initialize enhanced interactions
  if (process.client) {
    nextTick(async () => {
      // Enhanced GSAP animations
      const nuxtApp = useNuxtApp();
      const $gsap = (nuxtApp as any)?.$gsap;
      
      if ($gsap && $gsap.utils && typeof $gsap.from === "function") {
        // Simple event card animations
        $gsap.utils.toArray(".event-card").forEach((el: any, i: number) => {
          $gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          });
        });
        
        // Simple filter section animation
        $gsap.from(".filter-section", {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2
        });
        
        // Simple hero content animation
        $gsap.timeline()
          .from(".hero-content h1", {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
          })
          .from(".hero-content p", {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out"
          }, "-=0.4");
      }
    });
  }
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", checkViewMode);
    document.removeEventListener("keydown", handleKeyNavigation);
  }
});

// Page meta
useHead({
  title: "Events & Entertainment - The Pearson Pub",
  meta: [
    {
      name: "description",
      content:
        "Join us for live music, pub quizzes, and special events at The Pearson Pub. Discover upcoming entertainment and book your table today.",
    },
  ],
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
