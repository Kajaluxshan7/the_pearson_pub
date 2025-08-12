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
        <div class="absolute inset-0 bg-gradient-to-r from-black/85 to-black/65"></div>
      </div>
      
      <div class="hero-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div class="inline-block mb-4">
          <span class="text-yellow-400 font-semibold text-sm lg:text-lg tracking-wide uppercase">
            Live Entertainment
          </span>
          <div class="w-12 lg:w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
        </div>
        <h1
          class="text-3xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          style="font-family: 'Cinzel', 'Georgia', serif"
        >
          Events &amp; <span class="text-yellow-400">Entertainment</span>
        </h1>
        <p class="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
          Join us for <span class="text-yellow-300">live music</span>,
          <span class="text-yellow-300">pub quizzes</span>, and
          <span class="text-yellow-300">special events</span>
        </p>
      </div>
    </section>

    <!-- Search and Filter Section -->
    <section class="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <!-- Search -->
          <div class="flex-1 max-w-md w-full">
            <div class="relative">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search events..." 
                class="w-full pl-8 pr-2 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
              />
              <UIcon name="i-heroicons-magnifying-glass" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <!-- Filters -->
          <div class="flex flex-row gap-4 items-center w-full sm:w-auto">
            <!-- Status Filter -->
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</label>
              <USelectMenu 
                v-model="selectedStatus" 
                :options="statusOptions" 
                value-attribute="value" 
                option-attribute="label" 
                class="w-full sm:min-w-[140px]"
              />
            </div>

            <!-- View Mode Toggle -->
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <button
                @click="viewMode = 'grid'"
                :class="[
                  'px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2',
                  viewMode === 'grid'
                    ? 'bg-yellow-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                ]"
              >
                <UIcon name="i-heroicons-squares-2x2" class="w-4 h-4" />
                <span class="hidden sm:inline text-sm">Grid</span>
              </button>
              <button
                @click="viewMode = 'list'"
                :class="[
                  'px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2',
                  viewMode === 'list'
                    ? 'bg-yellow-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                ]"
              >
                <UIcon name="i-heroicons-list-bullet" class="w-4 h-4" />
                <span class="hidden sm:inline text-sm">List</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Active Filters -->
        <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
          <UBadge 
            v-if="searchQuery" 
            color="yellow" 
            variant="soft" 
            class="cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors" 
            @click="searchQuery = ''"
          >
            <UIcon name="i-heroicons-magnifying-glass" class="w-3 h-3 mr-1" />
            "{{ searchQuery }}"
            <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
          </UBadge>

          <UBadge 
            v-if="selectedStatus !== 'all'" 
            color="yellow" 
            variant="soft" 
            class="cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors" 
            @click="selectedStatus = 'all'"
          >
            Status: {{ statusOptions.find(s => s.value === selectedStatus)?.label }}
            <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
          </UBadge>

          <UButton 
            v-if="hasActiveFilters" 
            size="xs" 
            color="gray" 
            variant="ghost" 
            @click="clearAllFilters"
          >
            Clear All
          </UButton>
        </div>
      </div>
    </section>

    <!-- Events Section -->
    <section class="py-12 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Results Header -->
        <div class="text-center mb-12">
          <div>
            <h2
              class="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3"
              style="font-family: 'Cinzel', 'Georgia', serif"
            >
              {{ getResultsTitle() }}
            </h2>
            <div class="flex items-center justify-center gap-2">
              <div class="w-12 h-1 bg-yellow-500"></div>
              <p class="text-lg text-gray-600 dark:text-gray-300 font-medium">
                {{ filteredEvents.length }} event{{ filteredEvents.length !== 1 ? "s" : "" }} found
              </p>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading || backendLoading" class="text-center py-20">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mb-6">
            <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-yellow-600 dark:text-yellow-400 animate-spin" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Events</h3>
          <p class="text-gray-600 dark:text-gray-400">Fetching the latest entertainment lineup...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error || backendError" class="text-center py-20">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-red-500" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Unable to Load Events
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            {{ error || backendError }}
          </p>
          <UButton color="yellow" size="lg" @click="refreshEvents">
            <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
            Try Again
          </UButton>
        </div>

        <!-- Events Grid/List -->
        <div v-else-if="filteredEvents.length > 0">
          <!-- Grid View -->
          <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <div
              v-for="(event, index) in filteredEvents"
              :key="event.id"
              class="event-card group transform transition-all duration-500 hover:scale-[1.02] cursor-pointer"
              @click="showEventDetails(event)"
              @keydown.enter="showEventDetails(event)"
              @keydown.space.prevent="showEventDetails(event)"
              tabindex="0"
              role="button"
              :aria-label="`View details for ${event.title}`"
            >
              <div class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                <!-- Image Container - Made taller for better visibility -->
                <div class="relative overflow-hidden h-100">
                  <NuxtImg
                    :src="getCurrentEventImage(event)"
                    :alt="event.title"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    format="webp"
                    quality="85"
                    loading="lazy"
                    @error="handleImageError"
                  />                  
                  <!-- Status Badge -->
                  <div class="absolute top-4 right-4">
                    <div :class="[
                      'px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-md',
                      getStatusColor(event.status) === 'green' ? 'bg-green-500/90 text-white' :
                      getStatusColor(event.status) === 'blue' ? 'bg-blue-500/90 text-white' :
                      'bg-gray-500/90 text-white'
                    ]">
                      {{ getStatusLabel(event.status) }}
                    </div>
                  </div>
                </div>
                
                <!-- Content - flexible to take remaining space -->
                <div class="p-6 flex-1 flex flex-col">
                  <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors line-clamp-2 leading-tight">
                    {{ event.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3 text-sm flex-1">
                    {{ event.description }}
                  </p>
                  <!-- Event Info -->
                  <div class="space-y-3">
                    <!-- Event Date Range -->
                    <div v-if="event.date && event.endDate" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <div class="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3 mt-0.5">
                        <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div class="flex">
                        <div class="font-medium text-gray-900 dark:text-white">{{ formatEventDateRange(event.date, event.endDate) }}</div>
                      </div>
                    </div>
                    <!-- Single Date (fallback) -->
                    <div v-else-if="event.date" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <div class="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3">
                        <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <span class="font-medium">{{ formatEventDateRange(event.date, '') }}</span>
                    </div>
                    <div v-if="event.time" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <div class="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3">
                        <UIcon name="i-heroicons-clock" class="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <span class="font-medium">{{ event.time.replace(/\s*\/?\s*\b(EST|EDT)\b\s*/g, '').trim() }}</span>
                    </div>
                  </div>

                  <!-- CTA -->
                  <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-medium text-yellow-600 dark:text-yellow-400">Learn More</span>
                      <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 text-yellow-600 dark:text-yellow-400 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- List View -->
          <div v-else class="space-y-8">
            <div
              v-for="(event, index) in filteredEvents"
              :key="event.id"
              class="event-card group cursor-pointer"
              @click="showEventDetails(event)"
              @keydown.enter="showEventDetails(event)"
              @keydown.space.prevent="showEventDetails(event)"
              tabindex="0"
              role="button"
              :aria-label="`View details for ${event.title}`"
            >
              <div class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
                <div class="flex flex-col lg:flex-row">
                  <!-- Image - Improved aspect ratio -->
                  <div class="lg:w-96 relative overflow-hidden">
                    <NuxtImg
                      :src="getCurrentEventImage(event)"
                      :alt="event.title"
                      class="w-full h-80 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      format="webp"
                      quality="85"
                      loading="lazy"
                      @error="handleImageError"
                    />
                    
                    <!-- Status Badge -->
                    <div class="absolute top-6 left-6">
                      <div :class="[
                        'px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide backdrop-blur-md',
                        getStatusColor(event.status) === 'green' ? 'bg-green-500/90 text-white' :
                        getStatusColor(event.status) === 'blue' ? 'bg-blue-500/90 text-white' :
                        'bg-gray-500/90 text-white'
                      ]">
                        {{ getStatusLabel(event.status) }}
                      </div>
                    </div>
                  </div>
                  
                  <!-- Content -->
                  <div class="flex-1 p-8">
                    <div class="flex flex-col justify-between h-full">
                      <div>
                        <h3 class="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors mb-4 leading-tight">
                          {{ event.title }}
                        </h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-lg">
                          {{ event.description }}
                        </p>
                        
                        <!-- Event Details -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                          <div v-if="event.date" class="flex items-center">
                            <div class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-4">
                              <UIcon name="i-heroicons-calendar" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                              <div class="text-sm text-gray-500 dark:text-gray-400 font-medium">Date</div>
                              <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ formatEventDateRange(event.date, event.endDate || '') }}</div>
                            </div>
                          </div>
                          <div v-if="event.time" class="flex items-center">
                            <div class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-4">
                              <UIcon name="i-heroicons-clock" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                              <div class="text-sm text-gray-500 dark:text-gray-400 font-medium">Time</div>
                              <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ event.time }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div class="flex justify-end">
                        <UButton color="yellow" variant="solid" size="lg" class="px-8">
                          View Details
                          <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 ml-2" />
                        </UButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
            <UIcon name="i-heroicons-calendar-x" class="w-10 h-10 text-gray-400" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {{ hasActiveFilters ? 'No Matching Events Found' : 'No Events Available' }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
            <span v-if="hasActiveFilters">
              Try adjusting your search criteria or filters to discover more exciting events.
            </span>
            <span v-else>
              Stay tuned for upcoming entertainment and special events at The Pearson Pub!
            </span>
          </p>
          <UButton 
            v-if="hasActiveFilters" 
            color="yellow" 
            variant="solid"
            size="lg"
            @click="clearAllFilters"
          >
            <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
            Clear All Filters
          </UButton>
        </div>
      </div>
    </section>
    <!-- Weekly Schedule Section -->
    <WeeklyEntertainment />
  </div>
</template>

<script setup lang="ts">
import { useSEO } from '@/composables/useSEO';
import { onMounted } from 'vue';
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "The Pearson Pub",
  "url": "https://thepearsonpub.ca/events",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://thepearsonpub.ca/events?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};
onMounted(() => {
  useSEO().setSEO({
    title: 'Events & Entertainment',
    description: 'Live music, pub quizzes, and special events at The Pearson Pub.',
    canonical: 'https://thepearsonpub.ca/events',
    ogImage: '/images/entertainment/music.jpg',
    structuredData: [{ type: 'application/ld+json', innerHTML: JSON.stringify(structuredData) }],
  });
});

onMounted(() => {
  console.log('All Events:', allEvents.value);
  console.log('Filtered Events:', filteredEvents.value);
});

import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useLandingPageData } from "~/composables/useLandingPageData";
import { TimezoneUtil } from '~/utils/timezone';
import { DateTime } from 'luxon';

// Types
interface Event {
  id: string | number;
  title: string;
  description: string;
  fullDescription?: string;
  date: string;
  startDate?: string;
  endDate?: string;
  startDateTime?: string;
  endDateTime?: string;
  time?: string;
  image?: string;
  images?: string[];
  location?: string;
  status: 'upcoming' | 'current' | 'ended';
  featured?: boolean;
  venue?: {
    name: string;
    capacity?: number;
    layout?: string;
  };
  price?: {
    general?: number;
    vip?: number;
    student?: number;
  };
  tags?: string[];
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  ctaLink?: string;
  ctaText?: string;
}

// SSR/SSG: useAsyncData for events data
const { data: eventsData } = await useAsyncData('events-data', async () => {
  const { fetchEventsData } = useLandingPageData();
  await fetchEventsData();
  return true;
});
// Backend events data
const {
  allEvents: dynamicEvents,
  isLoading: backendLoading,
  error: backendError,
  fetchEventsData,
} = useLandingPageData();

// Reactive data
const searchQuery = ref("");
const selectedStatus = ref("all");
const viewMode = ref<"grid" | "list">("grid");
const isLoading = ref(false);
const error = ref<string | null>(null);

// Modal state
const selectedEvent = ref<Event | null>(null);
const isEventModalOpen = ref(false);

// Image rotation state
const currentImageIndexes = ref<Record<string, number>>({});

// Status options for filter
const statusOptions = [
  { label: "All Events", value: "all" },
  { label: "Current", value: "current" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Past", value: "ended" }
];

// Transform backend events to match frontend interface
const allEvents = computed(() => {
  const dynamic = dynamicEvents.value || [];
  
  return dynamic.map((event: any) => ({
    id: event.id,
    title: event.title || event.name,
    description: event.description || '',
    fullDescription: event.fullDescription || event.description || '',
    date: event.startDate || event.date || '',
    startDate: event.startDate,
    endDate: event.endDate,
    startDateTime: event.startDateTime,
    endDateTime: event.endDateTime,
    time: event.time || (event.endDate && event.endDate !== event.startDate ? `Until ${event.endDate}` : ''),
    image: (event.images && event.images.length > 0) ? event.images[0] : '/images/entertainment/music.jpg',
    images: event.images || [],
    location: event.location || 'The Pearson Pub',
    status: event.status as 'upcoming' | 'current' | 'ended',
    featured: event.featured || false,
    venue: event.venue || null,
    price: event.price || null,
    tags: event.tags || [],
    contactInfo: event.contactInfo || null,
    ctaLink: event.ctaLink || null,
    ctaText: event.ctaText || 'Book Now'
  })).sort((a, b) => {
    // Sort by status priority (current > upcoming > ended), then by date
    const statusPriority = { current: 0, upcoming: 1, ended: 2 };
    const aPriority = statusPriority[a.status];
    const bPriority = statusPriority[b.status];
    
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }
    
    // If same status, sort by date
    const dateA = new Date(a.startDateTime || a.date);
    const dateB = new Date(b.startDateTime || b.date);
    return a.status === 'ended' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });
});

// Filtered events based on search and status
const filteredEvents = computed(() => {
  let filtered = allEvents.value || [];

  // Filter by status
  if (selectedStatus.value !== "all") {
    filtered = filtered.filter(event => event.status === selectedStatus.value);
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(event =>
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query)
    );
  }

  return filtered;
});

// Computed properties for UI state
const hasActiveFilters = computed(() => {
  return searchQuery.value !== "" || selectedStatus.value !== "all";
});

// Helper functions
const getStatusColor = (status: string) => {
  const colors = {
    upcoming: "green",
    current: "blue",
    ended: "gray"
  };
  return colors[status as keyof typeof colors] || "gray";
};

const getStatusLabel = (status: string) => {
  const labels = {
    upcoming: "Upcoming",
    current: "Now Live",
    ended: "Past Event"
  };
  return labels[status as keyof typeof labels] || status;
};

const getResultsTitle = () => {
  if (selectedStatus.value === "current") return "Current Events";
  if (selectedStatus.value === "upcoming") return "Upcoming Events";
  if (selectedStatus.value === "ended") return "Past Events";
  return "All Events";
};

const formatEventDate = (dateString: string) => {
  if (!dateString) return '';
  return TimezoneUtil.formatTorontoTime(dateString);
};

const formatEventDateShort = (dateString: string) => {
  if (!dateString) return '';
  return TimezoneUtil.formatTorontoDateShort(dateString);
};

const formatEventMonth = (dateString: string) => {
  if (!dateString) return '';
  try {
    const date = TimezoneUtil.parseTorontoDate(dateString);
    return TimezoneUtil.formatTorontoTime(date, { month: 'short' }).toUpperCase();
  } catch {
    return '';
  }
};

const formatEventDay = (dateString: string) => {
  if (!dateString) return '';
  try {
    const date = TimezoneUtil.parseTorontoDate(dateString);
    return date.getDate().toString();
  } catch {
    return '';
  }
};

const formatEventDateRange = (startDate: string, endDate: string) => {
  if (!startDate) return '';
  
  try {
    // Parse start date in Toronto timezone
    const start = DateTime.fromISO(startDate, { zone: 'America/Toronto' });
    
    if (!endDate || endDate === startDate) {
      // Single date: "2025-08-12 (Tuesday)"
      return start.toFormat('yyyy-MM-dd (cccc)');
    }
    
    // Parse end date in Toronto timezone
    const end = DateTime.fromISO(endDate, { zone: 'America/Toronto' });
    
    // Date range: "2025-08-12 (Tuesday) to 2025-08-13 (Wednesday)"
    return `${start.toFormat('yyyy-MM-dd (cccc)')} to ${end.toFormat('yyyy-MM-dd (cccc)')}`;
  } catch (error) {
    console.error('Date range formatting error:', error);
    return startDate + (endDate && endDate !== startDate ? ` to ${endDate}` : '');
  }
};

const getCurrentEventImage = (event: Event | null) => {
  if (!event) return '/images/entertainment/eventDefault.jpg';
  
  // Always return a valid image, fallback to /images/entertainment/eventDefault.jpg
  if (!event.images || event.images.length === 0) {
    return event.image && event.image !== '' ? event.image : '/images/entertainment/eventDefault.jpg';
  }
  if (event.images.length === 1) {
    return event.images[0] || '/images/entertainment/eventDefault.jpg';
  }
  const currentIndex = currentImageIndexes.value[event.id] || 0;
  return event.images[currentIndex] || '/images/entertainment/eventDefault.jpg';
};

const getCurrentImageIndex = (eventId: string | number) => {
  return currentImageIndexes.value[eventId] || 0;
};

const setCurrentImage = (eventId: string | number, index: number) => {
  currentImageIndexes.value[eventId] = index;
};

const handleImageError = (event: any) => {
  // Prevent infinite loop by only setting fallback if not already set
  if (event.target && event.target.src.indexOf('/images/entertainment/eventDefault.jpg') === -1) {
    event.target.src = '/images/entertainment/eventDefault.jpg'; // Fallback image
  }
};

// Function to convert UTC datetime to "Aug 9, 11 A.M" format in Toronto timezone
function formatDateTimeToFriendly(datetime: string) {
  return DateTime.fromISO(datetime, { zone: 'utc' })
    .setZone('America/Toronto')
    .toFormat("MMM d, h a");
}

// Function to format event date and time
function formatEventDateTime(date: string, time?: string) {
  if (!date) return '';
  
  try {
    // Create a proper datetime string
    let dateTime = date;
    if (time) {
      // Remove timezone suffixes and normalize the time
      const cleanTime = time.replace(/\s*\/?\s*\b(EST|EDT)\b\s*/g, '').trim();
      dateTime = `${date}T${convertTo24Hour(cleanTime)}`;
    }
    
    return DateTime.fromISO(dateTime, { zone: 'America/Toronto' })
      .toFormat("MMM d, yyyy 'at' h:mm a");
  } catch (error) {
    console.error('Date formatting error:', error);
    return date;
  }
}

// Function to convert time to 24-hour format
function convertTo24Hour(time: string) {
  if (!time) return '00:00';
  
  const match = time.match(/(\d{1,2}):?(\d{0,2})\s*(am|pm|a\.m\.|p\.m\.)?/i);
  if (!match) return '00:00';
  
  let hours = parseInt(match[1]);
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const period = match[3]?.toLowerCase();
  
  if (period && (period.includes('p') || period.includes('P')) && hours !== 12) {
    hours += 12;
  } else if (period && (period.includes('a') || period.includes('A')) && hours === 12) {
    hours = 0;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Function to calculate event duration
function getEventDuration(startDate: string, startTime: string, endDate: string, endTime: string) {
  if (!startDate || !endDate) return '';
  
  try {
    const startDateTime = DateTime.fromISO(`${startDate}T${convertTo24Hour(startTime)}`, { zone: 'America/Toronto' });
    const endDateTime = DateTime.fromISO(`${endDate}T${convertTo24Hour(endTime)}`, { zone: 'America/Toronto' });
    
    const diff = endDateTime.diff(startDateTime, ['days', 'hours', 'minutes']);
    
    const parts = [];
    if (diff.days > 0) parts.push(`${diff.days} day${diff.days > 1 ? 's' : ''}`);
    if (diff.hours > 0) parts.push(`${diff.hours} hour${diff.hours > 1 ? 's' : ''}`);
    if (diff.minutes > 0 && diff.days === 0) parts.push(`${Math.round(diff.minutes)} min${diff.minutes > 1 ? 's' : ''}`);
    
    return parts.join(', ');
  } catch (error) {
    console.error('Duration calculation error:', error);
    return '';
  }
}

// Action functions
const clearAllFilters = () => {
  searchQuery.value = "";
  selectedStatus.value = "all";
};

const showEventDetails = (event: Event) => {
  selectedEvent.value = event;
  isEventModalOpen.value = true;
};

const closeEventModal = () => {
  isEventModalOpen.value = false;
  selectedEvent.value = null;
};

const refreshEvents = async () => {
  error.value = null;
  await fetchEventsData();
};

const shareEvent = async () => {
  if (!selectedEvent.value) return;
  
  const shareData = {
    title: `${selectedEvent.value.title} - The Pearson Pub`,
    text: selectedEvent.value.description,
    url: window.location.origin + '/events'
  };

  try {
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      // You could add a toast notification here
    }
  } catch (err) {
    console.log('Error sharing:', err);
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
    } catch (clipboardErr) {
      console.log('Clipboard fallback failed:', clipboardErr);
    }
  }
};

// Image rotation for events with multiple images
const initializeImageRotation = () => {
  allEvents.value.forEach((event) => {
    if (event.images && event.images.length > 1) {
      // Initialize index
      if (!(event.id in currentImageIndexes.value)) {
        currentImageIndexes.value[event.id] = 0;
      }
      
      // Start rotation
      setInterval(() => {
        const currentIndex = currentImageIndexes.value[event.id] || 0;
        const nextIndex = (currentIndex + 1) % event.images.length;
        currentImageIndexes.value[event.id] = nextIndex;
      }, 4000); // Change image every 4 seconds
    }
  });
};

// Responsive view mode
const checkViewMode = () => {
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    viewMode.value = "grid";
  }
};
onMounted(async () => {
  // Fetch backend data
  await fetchEventsData();
  
  // Initialize image rotation
  await nextTick();
  initializeImageRotation();
  
  // Setup responsive behavior
  checkViewMode();
  window.addEventListener("resize", checkViewMode);
  
  // Initialize animations if GSAP is available
  if (process.client) {
    nextTick(() => {
      const nuxtApp = useNuxtApp();
      const $gsap = (nuxtApp as any)?.$gsap;
      
      if ($gsap && typeof $gsap.from === "function") {
        // Animate hero content
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
        
        // Animate event cards - removed opacity animation to ensure all cards are fully visible
        $gsap.utils.toArray(".event-card").forEach((el: any, i: number) => {
          $gsap.from(el, {
            y: 20,
            duration: 0.6,
            ease: "power2.out",
            delay: i * 0.1
          });
        });
      }
    });
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", checkViewMode);
});
</script>

<style scoped>
/* Modern Event Modal Styles */
:deep(.event-modal-overlay) {
  backdrop-filter: blur(8px);
}

:deep(.event-modal-overlay .fixed) {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Custom scrollbar for modal content */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #fbbf24 #f3f4f6;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #fbbf24;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #f59e0b;
}

/* Responsive modal sizing */
@media (max-width: 1024px) {
  :deep(.event-modal-overlay) .grid-cols-5 {
    grid-template-columns: 1fr !important;
  }
  
  :deep(.event-modal-overlay) .lg\\:col-span-3,
  :deep(.event-modal-overlay) .lg\\:col-span-2 {
    grid-column: span 1 !important;
  }
  
  :deep(.event-modal-overlay) [style*="aspect-ratio"] {
    aspect-ratio: 4/3 !important;
    max-width: 95vw !important;
    max-height: 85vh !important;
  }
}

@media (max-width: 640px) {
  :deep(.event-modal-overlay) [style*="aspect-ratio"] {
    aspect-ratio: 1/1 !important;
    max-width: 95vw !important;
    max-height: 90vh !important;
  }
}

/* Animation for modal entrance */
@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

:deep(.event-modal-overlay) > div {
  animation: modalSlideIn 0.3s ease-out;
}

/* Enhanced status badge styles */
.status-badge-glow {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

.status-badge-glow.green {
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
}

.status-badge-glow.yellow {
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
}

/* Legacy styles for backward compatibility */
:deep(.modal-full-width) {
  max-width: none !important;
}

:deep(.modal-full-width .fixed) {
  max-width: none !important;
}

:deep(.modal-full-width [class*="max-w"]) {
  max-width: none !important;
}

:deep(.modal-full-width > div) {
  max-width: 80vw !important;
  width: 80vw !important;
  margin: 0px;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
}
</style>