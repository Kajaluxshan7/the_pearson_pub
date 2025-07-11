<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <section
      class="hero-section relative py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden"
    >
      <!-- 3D Background -->
      <Background3D 
        :intensity="1.5" 
        :enable-particles="true" 
        :enable-rays="true" 
        :enable-morphing="true"
        :particle-count="80"
        color-scheme="blue"
      />
      
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
      </div>      <div
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
    </section>    <!-- Events Section -->
    <section class="py-12 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        <!-- Results Summary -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2
              class="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2"
              style="font-family: 'Cinzel', 'Georgia', serif"
            >
              <span v-if="searchQuery">Search Results</span>
              <span v-else-if="selectedCategory !== 'all'"
                >{{
                  categories.find((c: Category) => c.id === selectedCategory)?.name
                }}
                Events</span
              >
              <span v-else>Upcoming Events</span>
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              {{ filteredEvents.length }} event{{
                filteredEvents.length !== 1 ? "s" : ""
              }}
              found
            </p>
          </div>
          <!-- View Mode Indicators -->
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
        </div>        <!-- Error State -->
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
        </div>        <!-- Loading State with Skeleton Cards -->
        <div v-else-if="isLoading || loadingState.isLoading || backendLoading">
          <!-- Skeleton Results Summary -->
          <div class="flex justify-between items-center mb-8">
            <div>
              <div class="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
              <div class="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div class="hidden sm:flex items-center gap-2">
              <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div class="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div class="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
          
          <!-- Skeleton Events Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            <SkeletonCard 
              v-for="i in 9" 
              :key="`skeleton-event-${i}`"
              type="event"
              :delay="i * 0.1"
            />
          </div>
        </div>

        <!-- Events Grid/List -->
        <div v-if="filteredEvents.length > 0">
          <!-- Grid View -->
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          >            <div
              v-for="(event, index) in paginatedEvents"
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
                  <div class="relative overflow-hidden">                    <NuxtImg
                      :src="event.image || '/images/entertainment/music.jpg'"
                      :alt="event.title"
                      class="w-full h-48 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      format="webp"
                      quality="75"
                      loading="lazy"
                      :placeholder="[400, 240, 75]"
                    />
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                    ></div>

                    <!-- Badges -->
                    <div class="absolute top-4 left-4 flex flex-col gap-2">
                      <UBadge
                        v-if="event.featured"
                        color="yellow"
                        variant="solid"
                        class="font-semibold text-xs"
                      >
                        Featured
                      </UBadge>
                      <UBadge
                        :color="getStatusColor(event.status)"
                        variant="solid"
                        class="font-semibold text-xs"
                      >
                        {{
                          event.status.charAt(0).toUpperCase() +
                          event.status.slice(1)
                        }}
                      </UBadge>
                    </div>

                    <div class="absolute top-4 right-4">
                      <UBadge
                        :color="getCategoryColor(event.category)"
                        variant="subtle"
                        class="font-semibold text-xs"
                      >
                        {{
                          event.category.charAt(0).toUpperCase() +
                          event.category.slice(1)
                        }}
                      </UBadge>
                    </div>

                    <!-- Price -->
                    <div
                      v-if="event.price && Object.keys(event.price).length > 0"
                      class="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full"
                    >
                      <span class="text-xs font-semibold">
                        From ${{ minPrice(event.price) }}
                      </span>
                    </div>
                  </div>
                </template>

                <div class="p-4 lg:p-6 flex flex-col h-full">
                  <h3
                    class="text-xl lg:text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors line-clamp-2"
                  >
                    {{ event.title }}
                  </h3>

                  <p
                    class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3 flex-grow"
                  >
                    {{ event.description }}
                  </p>

                  <div class="space-y-2 mb-4">
                    <div
                      class="flex items-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      <UIcon
                        name="i-heroicons-calendar"
                        class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400"
                      />
                      <span class="font-medium">{{ event.date }}</span>
                    </div>
                    <div
                      class="flex items-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      <UIcon
                        name="i-heroicons-clock"
                        class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400"
                      />
                      <span class="font-medium">{{ event.time }}</span>
                    </div>
                    <div
                      v-if="event.location"
                      class="flex items-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      <UIcon
                        name="i-heroicons-map-pin"
                        class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400"
                      />
                      <span class="font-medium">{{ event.location }}</span>
                    </div>
                  </div>

                  <!-- Rating -->
                  <div
                    v-if="event.averageRating"
                    class="flex items-center gap-2 mb-4"
                  >
                    <div class="flex items-center">
                      <UIcon
                        v-for="star in 5"
                        :key="star"
                        name="i-heroicons-star-solid"
                        :class="
                          star <= Math.floor(event.averageRating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        "
                        class="w-4 h-4"
                      />
                    </div>
                    <span class="text-xs text-gray-600 dark:text-gray-300">
                      {{ event.averageRating.toFixed(1) }} ({{
                        event.totalReviews
                      }})
                    </span>
                  </div>

                  <UButton
                    color="yellow"
                    variant="solid"
                    class="w-full transform transition-all hover:scale-105 mt-auto"
                    size="md"
                  >
                    View Details
                  </UButton>
                </div>
              </UCard>
            </div>
          </div>

          <!-- List View -->
          <div v-else class="space-y-6">            <div
              v-for="(event, index) in paginatedEvents"
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
              <UCard
                class="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-0"
              >
                <div class="flex flex-col lg:flex-row">
                  <!-- Image -->
                  <div class="lg:w-80 relative overflow-hidden">                    <NuxtImg
                      :src="event.image || '/images/entertainment/music.jpg'"
                      :alt="event.title"
                      class="w-full h-48 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      format="webp"
                      quality="75"
                      loading="lazy"
                      :placeholder="[400, 240, 75]"
                    />

                    <!-- Badges -->
                    <div class="absolute top-4 left-4 flex flex-col gap-2">
                      <UBadge
                        v-if="event.featured"
                        color="yellow"
                        variant="solid"
                        class="font-semibold text-xs"
                      >
                        Featured
                      </UBadge>
                      <UBadge
                        :color="getStatusColor(event.status)"
                        variant="solid"
                        class="font-semibold text-xs"
                      >
                        {{
                          event.status.charAt(0).toUpperCase() +
                          event.status.slice(1)
                        }}
                      </UBadge>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 p-6 lg:p-8">
                    <div
                      class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4"
                    >
                      <div class="flex-1">
                        <div class="flex items-start justify-between mb-4">
                          <div>
                            <h3
                              class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors mb-2"
                            >
                              {{ event.title }}
                            </h3>
                            <UBadge
                              :color="getCategoryColor(event.category)"
                              variant="subtle"
                              class="font-semibold text-sm"
                            >
                              {{
                                event.category.charAt(0).toUpperCase() +
                                event.category.slice(1)
                              }}
                            </UBadge>
                          </div>
                          <div v-if="event.price && Object.keys(event.price).length > 0" class="text-right">
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              From
                            </p>
                            <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                              ${{ minPrice(event.price) }}
                            </p>
                          </div>
                        </div>

                        <p
                          class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
                        >
                          {{ event.description }}
                        </p>

                        <div
                          class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4"
                        >
                          <div
                            class="flex items-center text-sm text-gray-500 dark:text-gray-400"
                          >
                            <UIcon
                              name="i-heroicons-calendar"
                              class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400"
                            />
                            <span class="font-medium">{{ event.date }}</span>
                          </div>
                          <div
                            class="flex items-center text-sm text-gray-500 dark:text-gray-400"
                          >
                            <UIcon
                              name="i-heroicons-clock"
                              class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400"
                            />
                            <span class="font-medium">{{ event.time }}</span>
                          </div>
                          <div
                            v-if="event.location"
                            class="flex items-center text-sm text-gray-500 dark:text-gray-400"
                          >
                            <UIcon
                              name="i-heroicons-map-pin"
                              class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400"
                            />
                            <span class="font-medium">{{
                              event.location
                            }}</span>
                          </div>
                        </div>

                        <!-- Tags and Performers -->
                        <div class="flex flex-wrap gap-2 mb-4">
                          <UBadge
                            v-for="tag in event.tags?.slice(0, 3)"
                            :key="tag"
                            color="gray"
                            variant="subtle"
                            class="text-xs"
                          >
                            {{ tag }}
                          </UBadge>
                        </div>

                        <!-- Rating -->
                        <div
                          v-if="event.averageRating"
                          class="flex items-center gap-2"
                        >
                          <div class="flex items-center">
                            <UIcon
                              v-for="star in 5"
                              :key="star"
                              name="i-heroicons-star-solid"
                              :class="
                                star <= Math.floor(event.averageRating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              "
                              class="w-4 h-4"
                            />
                          </div>
                          <span
                            class="text-sm text-gray-600 dark:text-gray-300"
                          >
                            {{ event.averageRating.toFixed(1) }} ({{
                              event.totalReviews
                            }}
                            reviews)
                          </span>
                        </div>
                      </div>

                      <div class="lg:ml-6">
                        <UButton
                          color="yellow"
                          variant="solid"
                          size="lg"
                          class="w-full lg:w-auto"
                        >
                          View Details
                        </UButton>
                      </div>
                    </div>
                  </div>
                </div>
              </UCard>
            </div>
          </div>          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center mt-12">
            <UPagination
              v-model="currentPage"
              :total="totalPages"
              :ui="{
                wrapper: 'flex items-center gap-1',
                base: 'flex items-center justify-center min-w-[32px] h-8 px-3 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                default: {
                  active: 'bg-yellow-500 text-white hover:bg-yellow-600',
                  inactive:
                    'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
                },
              }"
            />
          </div>

          <!-- Load More Button for Backend Events -->
          <div v-if="eventPagination.events.page < eventPagination.events.totalPages" class="flex justify-center mt-8">
            <UButton
              color="yellow"
              variant="outline"
              size="lg"
              @click="loadMoreEvents"
              :loading="backendLoading"
            >
              Load More Events ({{ eventPagination.events.total - eventPagination.events.page * 50 }} remaining)
            </UButton>
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-16">
          <UIcon
            name="i-heroicons-calendar-x"
            class="w-16 h-16 text-gray-400 mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No events found
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            <span v-if="searchQuery || selectedCategory !== 'all'">
              Try adjusting your search or filters to find more events.
            </span>
            <span v-else> Check back soon for upcoming events! </span>
          </p>
          <UButton
            v-if="searchQuery || selectedCategory !== 'all'"
            color="yellow"
            variant="outline"
            @click="clearFilters"
          >
            Clear Filters
          </UButton>
        </div>
      </div>
    </section>    <!-- Event Details Modal - Portrait -->
    <EventDetailsModal
      v-if="modalLayout === 'portrait'"
      :event="selectedEvent"
      :is-open="isEventModalOpen"
      @close="closeEventModal"
    />

    <!-- Event Details Modal - Landscape -->
    <EventDetailsModalLandscape
      v-else
      :event="selectedEvent"
      :is-open="isEventModalOpen"
      @close="closeEventModal"
    />

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
    <FloatingActionButton
      :actions="fabActions"
      main-icon="i-heroicons-calendar-days"
      @action="handleFABAction"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useEvents } from "~/composables/useEvents";
import { useLandingPageData } from "~/composables/useLandingPageData";
import { useAdvancedLoading } from "~/composables/useAdvancedLoading";
import { use3DAnimations } from "~/composables/use3DAnimations";
import { usePerformance } from "~/composables/usePerformance";
import Background3D from "~/components/Background3D.vue";
import LoadingScreen3D from "~/components/loading/LoadingScreen3D.vue";
import SkeletonCard from "~/components/loading/SkeletonCard.vue";
import FloatingActionButton from "~/components/ui/FloatingActionButton.vue";
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
import type { FABAction } from "~/components/ui/FloatingActionButton.vue";

// Composables
const { events: staticEvents } = useEvents(); // Keep for weekly schedule

// Advanced loading with custom events texts
const { loadingState, startLoading, finishLoading } = useAdvancedLoading({
  duration: 2200,
  showProgress: true,
  customTexts: [
    'Loading exciting events...',
    'Preparing entertainment lineup...',
    'Setting up the party...',
    'Almost time to rock...',
    'Let the fun begin!'
  ]
});

// 3D Animations for events
const { 
  addFloatingElement, 
  addParallaxElement, 
  createMorphingEffect,
  createLoadingAnimation,
  createGSAPAnimation
} = use3DAnimations({
  enableParallax: true,
  enableFloating: true,
  enableRotation: true,
  intensity: 1.5,
  speed: 1.2
});

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

// FAB Actions
const fabActions = ref<FABAction[]>([
  {
    id: 'scroll-top',
    label: 'Scroll to Top',
    icon: 'i-heroicons-arrow-up',
    action: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  {
    id: 'view-mode',
    label: `Switch to ${viewMode.value === 'grid' ? 'List' : 'Grid'} View`,
    icon: viewMode.value === 'grid' ? 'i-heroicons-list-bullet' : 'i-heroicons-squares-2x2',
    action: () => {
      viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid';
    }
  },
  {
    id: 'filter-music',
    label: 'Show Music Events',
    icon: 'i-heroicons-musical-note',
    action: () => {
      selectedCategory.value = selectedCategory.value === 'music' ? 'all' : 'music';
    }
  },
  {
    id: 'search',
    label: 'Focus Search',
    icon: 'i-heroicons-magnifying-glass',
    action: () => {
      const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
]);

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
  const static_ = staticEvents.value || [];
  
  // Transform backend events to match frontend interface
  const transformedDynamic = dynamic.map((event: any) => {
    const getEventStatus = () => {
      if (!event.start_date) return 'upcoming';
      const now = new Date();
      const start = new Date(event.start_date);
      const end = new Date(event.end_date || event.start_date);
      if (start > now) return 'upcoming';
      if (end > now) return 'ongoing';
      return 'completed';
    };

    return {
      id: event.id,
      title: event.name,
      description: event.description || '',
      date: event.start_date ? new Date(event.start_date).toLocaleDateString() : '',
      time: event.start_date && event.end_date ? 
        `${new Date(event.start_date).toLocaleTimeString()} - ${new Date(event.end_date).toLocaleTimeString()}` : '',
      image: (event.images && event.images.length > 0) ? event.images[0] : '/images/entertainment/music.jpg',
      images: event.images || [],
      location: 'The Pearson Pub', // Default location
      tags: ['Event'], // Default tag
      performers: [], // Default empty
      featured: false, // Default featured state
      category: 'special' as 'music' | 'quiz' | 'food' | 'special' | 'entertainment', // Default category
      status: getEventStatus() as 'upcoming' | 'ongoing' | 'completed' | 'cancelled',
      price: undefined,
      averageRating: null,
      totalReviews: 0,
      ctaText: "View Details",
      ctaLink: "#"
    };
  });
  
  // Combine and sort by date (upcoming first)
  return [...transformedDynamic, ...static_].sort((a, b) => {
    const dateA = new Date(a.date || '1970-01-01');
    const dateB = new Date(b.date || '1970-01-01');
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

const totalPages = computed(() =>
  Math.ceil(filteredEvents.value.length / itemsPerPage)
);

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredEvents.value.slice(start, end);
});

// Helper functions with proper error handling
const getStatusColor = (status: string) => {
  const statusColors = {
    upcoming: "green",
    ongoing: "blue", 
    completed: "gray",
    cancelled: "red"
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

const handleFABAction = (actionId: string) => {
  console.log(`FAB action triggered: ${actionId}`);
  
  // Update view mode label dynamically
  const viewModeAction = fabActions.value.find(action => action.id === 'view-mode');
  if (viewModeAction) {
    viewModeAction.label = `Switch to ${viewMode.value === 'grid' ? 'List' : 'Grid'} View`;
    viewModeAction.icon = viewMode.value === 'grid' ? 'i-heroicons-list-bullet' : 'i-heroicons-squares-2x2';
  }
  
  // Update filter action label dynamically
  const filterAction = fabActions.value.find(action => action.id === 'filter-music');
  if (filterAction) {
    filterAction.label = selectedCategory.value === 'music' ? 'Show All Events' : 'Show Music Events';
  }
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

onMounted(async () => {
  // Start loading animation
  startLoading();
  
  // Fetch backend data
  await fetchEvents();
  
  // Update pagination based on events data
  if (dynamicEvents.value) {
    eventPagination.value.events.total = dynamicEvents.value.length;
    eventPagination.value.events.totalPages = Math.ceil(dynamicEvents.value.length / 50);
  }
  
  // Simulate loading time for better UX
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  checkViewMode();
  window.addEventListener("resize", checkViewMode);
  document.addEventListener("keydown", handleKeyNavigation);
  
  // Initialize 3D animations and enhanced interactions
  if (process.client) {
    nextTick(async () => {
      // Finish loading
      await finishLoading();
      
      // Enhanced GSAP animations with 3D effects
      const nuxtApp = useNuxtApp();
      const $gsap = (nuxtApp as any)?.$gsap;
      
      if ($gsap && $gsap.utils && typeof $gsap.from === "function") {
        // Animate event cards with staggered 3D effects
        $gsap.utils.toArray(".event-card").forEach((el: any, i: number) => {
          // Add floating and morphing effects
          addFloatingElement(el, 12, 0.0015, i * 0.3);
          createMorphingEffect(el);
          
          // Enhanced GSAP animation with music-themed effects
          createGSAPAnimation(el, {
            from: {
              opacity: 0,
              y: 80,
              rotationY: -25,
              scale: 0.7,
              transformPerspective: 1200
            },
            to: {
              opacity: 1,
              y: 0,
              rotationY: 0,
              scale: 1,
              duration: 1.4,
              delay: i * 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          });
        });
        
        // Animate filter section with music pulse effect
        $gsap.from(".filter-section", {
          opacity: 0,
          y: -40,
          duration: 1,
          ease: "power3.out",
          delay: 0.4
        });
        
        // Animate hero content with rhythmic timing
        $gsap.timeline()
          .from(".hero-content h1", {
            opacity: 0,
            y: 60,
            rotationX: 15,
            duration: 1.2,
            ease: "power3.out"
          })
          .from(".hero-content p", {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power2.out"
          }, "-=0.6");
        
        // Add pulsing animation to category buttons
        $gsap.utils.toArray(".category-btn").forEach((el: any, i: number) => {
          $gsap.to(el, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
            paused: true,
            repeat: -1,
            yoyo: true
          });
        });
      }
      
      // Add parallax effect to hero section
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        addParallaxElement(heroSection as HTMLElement);
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
