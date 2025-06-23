<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <section
      class="relative py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden"
    >
      <div class="absolute inset-0">
        <NuxtImg
          src="/images/entertainment/music.jpg"
          alt="Events & Entertainment"
          class="w-full h-full object-cover opacity-40"
          format="webp"
          quality="80"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"
        ></div>
      </div>

      <!-- Decorative Elements -->
      <div
        class="absolute top-10 left-10 w-16 h-16 lg:w-24 lg:h-24 rounded-full border border-yellow-500/30 animate-pulse"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-20 h-20 lg:w-32 lg:h-32 rounded-full bg-yellow-500/20"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
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
    </section>

    <!-- Filters and Search Section -->
    <section
      class="py-6 lg:py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
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
          <div class="flex flex-wrap gap-2 lg:gap-3">
            <button
              v-for="category in categories"
              :key="category.id"
              :class="[
                'px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap',
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

          <!-- View Toggle -->
          <div
            class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full p-1"
          >
            <button
              :class="[
                'px-3 py-2 rounded-full text-sm font-medium transition-all',
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
              ]"
              @click="viewMode = 'grid'"
            >
              <UIcon name="i-heroicons-squares-2x2" class="w-4 h-4" />
            </button>
            <button
              :class="[
                'px-3 py-2 rounded-full text-sm font-medium transition-all',
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
              ]"
              @click="viewMode = 'list'"
            >
              <UIcon name="i-heroicons-list-bullet" class="w-4 h-4" />
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
            {{ categories.find((c) => c.id === selectedCategory)?.name }}
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
        <!-- Results Summary -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2
              class="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2"
              style="font-family: 'Cinzel', 'Georgia', serif"
            >
              <span v-if="searchQuery">Search Results</span>
              <span v-else-if="selectedCategory !== 'all'"
                >{{
                  categories.find((c) => c.id === selectedCategory)?.name
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
        </div>

        <!-- Events Grid/List -->
        <div v-if="filteredEvents.length > 0">
          <!-- Grid View -->
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          >
            <div
              v-for="(event, index) in paginatedEvents"
              :key="event.id"
              class="group transform transition-all duration-500 hover:scale-105"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <NuxtLink :to="`/events/${event.id}`" class="block">
                <UCard
                  class="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-0 h-full"
                >
                  <template #header>
                    <div class="relative overflow-hidden">
                      <NuxtImg
                        :src="event.image || '/images/entertainment/music.jpg'"
                        :alt="event.title"
                        class="w-full h-48 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                        format="webp"
                        quality="80"
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
                        v-if="event.price"
                        class="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full"
                      >
                        <span class="text-xs font-semibold">
                          From ${{
                            Math.min(
                              ...Object.values(event.price).filter(
                                (p) => p !== undefined
                              )
                            )
                          }}
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
              </NuxtLink>
            </div>
          </div>

          <!-- List View -->
          <div v-else class="space-y-6">
            <div
              v-for="(event, index) in paginatedEvents"
              :key="event.id"
              class="group"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <NuxtLink :to="`/events/${event.id}`" class="block">
                <UCard
                  class="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-0"
                >
                  <div class="flex flex-col lg:flex-row">
                    <!-- Image -->
                    <div class="lg:w-80 relative overflow-hidden">
                      <NuxtImg
                        :src="event.image || '/images/entertainment/music.jpg'"
                        :alt="event.title"
                        class="w-full h-48 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        format="webp"
                        quality="80"
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
                            <div v-if="event.price" class="text-right">
                              <p
                                class="text-xs text-gray-500 dark:text-gray-400"
                              >
                                From
                              </p>
                              <p
                                class="text-2xl font-bold text-yellow-600 dark:text-yellow-400"
                              >
                                ${{
                                  Math.min(
                                    ...Object.values(event.price).filter(
                                      (p) => p !== undefined
                                    )
                                  )
                                }}
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
              </NuxtLink>
            </div>
          </div>

          <!-- Pagination -->
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
    </section>

    <!-- Weekly Schedule Section -->
    <WeeklyEntertainment />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useEvents } from "~/composables/useEvents";

// Use events composable
const { events, weeklySchedule } = useEvents();

// Reactive data
const searchQuery = ref("");
const selectedCategory = ref("all");
const viewMode = ref<"grid" | "list">("grid");
const currentPage = ref(1);
const itemsPerPage = 9;

// Categories
const categories = ref([
  { id: "all", name: "All Events" },
  { id: "music", name: "Music" },
  { id: "quiz", name: "Quiz Night" },
  { id: "food", name: "Food & Drink" },
  { id: "special", name: "Special Events" },
  { id: "entertainment", name: "Entertainment" },
]);

// Computed properties
const filteredEvents = computed(() => {
  let filtered = events.value;

  // Filter by category
  if (selectedCategory.value !== "all") {
    filtered = filtered.filter(
      (event) => event.category === selectedCategory.value
    );
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
        event.performers?.some((performer) =>
          performer.toLowerCase().includes(query)
        ) ||
        event.location?.toLowerCase().includes(query)
    );
  }

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredEvents.value.length / itemsPerPage)
);

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredEvents.value.slice(start, end);
});

// Helper functions
const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "green";
    case "ongoing":
      return "blue";
    case "completed":
      return "gray";
    case "cancelled":
      return "red";
    default:
      return "gray";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "music":
      return "purple";
    case "quiz":
      return "blue";
    case "food":
      return "orange";
    case "special":
      return "pink";
    case "entertainment":
      return "indigo";
    default:
      return "gray";
  }
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "all";
  currentPage.value = 1;
};

// Watch for filter changes to reset pagination
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1;
});

// Responsive view mode
const checkViewMode = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth < 768) {
      viewMode.value = "grid";
    }
  }
};

onMounted(() => {
  checkViewMode();
  window.addEventListener("resize", checkViewMode);
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", checkViewMode);
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

// CSS for line clamping
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
