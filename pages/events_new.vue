<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <section
      class="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden"
    >
      <div class="absolute inset-0">
        <img
          src="/images/entertainment/music.jpg"
          alt="Events & Entertainment"
          class="w-full h-full object-cover opacity-40"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"
        ></div>
      </div>

      <!-- Decorative Elements -->
      <div
        class="absolute top-10 left-10 w-24 h-24 rounded-full border border-yellow-500/30 animate-pulse"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-yellow-500/20"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
      >
        <div class="inline-block mb-4">
          <span
            class="text-yellow-400 font-semibold text-lg tracking-wide uppercase"
            >Live Entertainment</span
          >
          <div class="w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
        </div>
        <h1
          class="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          style="font-family: 'Cinzel', 'Georgia', serif"
        >
          Events &amp; <span class="text-yellow-400">Entertainment</span>
        </h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          Join us for <span class="text-yellow-300">live music</span>,
          <span class="text-yellow-300">pub quizzes</span>, and
          <span class="text-yellow-300">special events</span>
        </p>
      </div>
    </section>

    <!-- Event Categories & Search -->
    <section
      class="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col lg:flex-row items-center justify-between gap-4"
        >
          <!-- Event Categories -->
          <div class="flex flex-wrap gap-3">
            <button
              @click="selectedCategory = 'all'"
              :class="[
                'px-4 py-2 rounded-full font-medium transition-all duration-300',
                selectedCategory === 'all'
                  ? 'bg-yellow-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900',
              ]"
            >
              All Events
            </button>
            <button
              v-for="category in eventCategories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-4 py-2 rounded-full font-medium transition-all duration-300 capitalize',
                selectedCategory === category
                  ? 'bg-yellow-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900',
              ]"
            >
              {{ category }}
            </button>
          </div>

          <!-- Search -->
          <div class="relative w-full lg:w-auto">
            <UInput
              v-model="searchQuery"
              placeholder="Search events..."
              icon="i-heroicons-magnifying-glass"
              class="w-full lg:w-80"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Events Grid -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2
            class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            style="font-family: 'Cinzel', 'Georgia', serif"
          >
            Upcoming
            <span class="text-yellow-600 dark:text-yellow-400">Events</span>
          </h2>
          <div class="w-24 h-1 bg-yellow-500 mx-auto"></div>
          <p
            v-if="filteredEvents.length"
            class="text-lg text-gray-600 dark:text-gray-300 mt-4"
          >
            {{ filteredEvents.length }}
            {{ filteredEvents.length === 1 ? "event" : "events" }} found
          </p>
        </div>

        <!-- No Events Message -->
        <div v-if="!filteredEvents.length" class="text-center py-16">
          <UIcon
            name="i-heroicons-calendar-x-mark"
            class="w-16 h-16 text-gray-400 mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No events found
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{
              searchQuery
                ? "Try adjusting your search terms"
                : "Check back soon for upcoming events"
            }}
          </p>
        </div>

        <!-- Events Grid -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <NuxtLink
            v-for="(event, index) in filteredEvents"
            :key="event.id"
            :to="`/events/${event.id}`"
            class="block group transform transition-all duration-500 hover:scale-105"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <UCard
              class="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-0 h-full"
            >
              <template #header>
                <div class="relative overflow-hidden">
                  <img
                    :src="event.image"
                    :alt="event.title"
                    class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  ></div>

                  <!-- Badges -->
                  <div class="absolute top-4 left-4 flex gap-2">
                    <UBadge
                      v-if="event.featured"
                      color="yellow"
                      variant="solid"
                      class="text-sm font-semibold"
                    >
                      Featured
                    </UBadge>
                    <UBadge
                      :color="getCategoryColor(event.category)"
                      variant="soft"
                      class="text-sm"
                    >
                      <UIcon
                        :name="getCategoryIcon(event.category)"
                        class="w-3 h-3 mr-1"
                      />
                      {{ event.category }}
                    </UBadge>
                  </div>

                  <!-- Price -->
                  <div v-if="event.price" class="absolute top-4 right-4">
                    <UBadge
                      color="green"
                      variant="solid"
                      class="text-lg font-bold"
                    >
                      ${{ event.price.general }}
                    </UBadge>
                  </div>

                  <!-- Status -->
                  <div class="absolute bottom-4 right-4">
                    <UBadge
                      :color="getStatusColor(event.status)"
                      variant="solid"
                      class="text-sm capitalize"
                    >
                      {{ event.status }}
                    </UBadge>
                  </div>
                </div>
              </template>

              <div class="p-6 flex flex-col h-full">
                <h3
                  class="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors"
                >
                  {{ event.title }}
                </h3>

                <p
                  class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3 flex-grow"
                >
                  {{ event.description }}
                </p>

                <div class="space-y-3 mb-6">
                  <div
                    class="flex items-center text-gray-500 dark:text-gray-400"
                  >
                    <UIcon
                      name="i-heroicons-calendar"
                      class="w-5 h-5 mr-3 text-yellow-600 dark:text-yellow-400"
                    />
                    <span class="font-medium">{{ event.date }}</span>
                  </div>
                  <div
                    class="flex items-center text-gray-500 dark:text-gray-400"
                  >
                    <UIcon
                      name="i-heroicons-clock"
                      class="w-5 h-5 mr-3 text-yellow-600 dark:text-yellow-400"
                    />
                    <span class="font-medium">{{ event.time }}</span>
                  </div>
                  <div
                    v-if="event.location"
                    class="flex items-center text-gray-500 dark:text-gray-400"
                  >
                    <UIcon
                      name="i-heroicons-map-pin"
                      class="w-5 h-5 mr-3 text-yellow-600 dark:text-yellow-400"
                    />
                    <span class="font-medium">{{ event.location }}</span>
                  </div>
                  <div
                    v-if="event.ticketsAvailable !== undefined"
                    class="flex items-center"
                  >
                    <UIcon
                      name="i-heroicons-ticket"
                      class="w-5 h-5 mr-3 text-yellow-600 dark:text-yellow-400"
                    />
                    <span
                      class="font-medium text-sm"
                      :class="
                        event.ticketsAvailable > 20
                          ? 'text-green-600'
                          : event.ticketsAvailable > 5
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      "
                    >
                      {{ event.ticketsAvailable }} tickets left
                    </span>
                  </div>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-4">
                  <UBadge
                    v-for="tag in event.tags?.slice(0, 3)"
                    :key="tag"
                    color="gray"
                    variant="soft"
                    class="text-xs"
                  >
                    {{ tag }}
                  </UBadge>
                </div>

                <!-- Reviews if available -->
                <div v-if="event.averageRating" class="flex items-center mb-4">
                  <div class="flex items-center mr-2">
                    <UIcon
                      v-for="i in 5"
                      :key="i"
                      name="i-heroicons-star-solid"
                      :class="
                        i <= Math.round(event.averageRating)
                          ? 'text-yellow-500'
                          : 'text-gray-300'
                      "
                      class="w-4 h-4"
                    />
                  </div>
                  <span class="text-sm text-gray-600 dark:text-gray-300">
                    {{ event.averageRating.toFixed(1) }} ({{
                      event.totalReviews
                    }}
                    reviews)
                  </span>
                </div>

                <UButton
                  color="yellow"
                  variant="solid"
                  class="w-full transform transition-all hover:scale-105 mt-auto"
                  size="lg"
                >
                  <UIcon name="i-heroicons-eye" class="w-5 h-5 mr-2" />
                  View Details
                </UButton>
              </div>
            </UCard>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Regular Entertainment Schedule -->
    <section class="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
      <!-- Background decorations -->
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute top-10 left-10 w-40 h-40 rounded-full border-2 border-yellow-500"
        ></div>
        <div
          class="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-yellow-300"
        ></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <h2
            class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            style="font-family: 'Cinzel', 'Georgia', serif"
          >
            Weekly
            <span class="text-yellow-600 dark:text-yellow-400">Schedule</span>
          </h2>
          <div class="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't miss our regular entertainment lineup throughout the week
          </p>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div
            v-for="(schedule, index) in weeklySchedule"
            :key="index"
            class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-600 group"
          >
            <UIcon
              :name="schedule.icon"
              class="w-12 h-12 text-yellow-600 dark:text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform"
            />
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ schedule.day }}
            </h3>
            <p class="text-yellow-600 dark:text-yellow-400 font-semibold mb-2">
              {{ schedule.event }}
            </p>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">
              {{ schedule.time }}
            </p>
            <p
              v-if="schedule.description"
              class="text-gray-500 dark:text-gray-400 text-xs leading-relaxed"
            >
              {{ schedule.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useEvents } from "~/composables/useEvents";

useHead({
  title: "Events & Entertainment - The Pearson Pub",
  meta: [
    {
      name: "description",
      content:
        "Join us for live music, pub quizzes, and special events at The Pearson Pub. Check out our weekly entertainment schedule and upcoming events.",
    },
  ],
});

const { events, weeklySchedule } = useEvents();

const selectedCategory = ref("all");
const searchQuery = ref("");

// Get unique categories from events
const eventCategories = computed(() => {
  const categories = new Set(events.value.map((event) => event.category));
  return Array.from(categories).sort();
});

// Filter events based on category and search
const filteredEvents = computed(() => {
  let filtered = events.value;

  // Filter by category
  if (selectedCategory.value !== "all") {
    filtered = filtered.filter(
      (event) => event.category === selectedCategory.value
    );
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
        event.performers?.some((performer) =>
          performer.toLowerCase().includes(query)
        )
    );
  }

  // Sort by date (upcoming first)
  return filtered.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
});

const getCategoryColor = (category: string) => {
  switch (category) {
    case "music":
      return "purple";
    case "quiz":
      return "blue";
    case "food":
      return "orange";
    case "special":
      return "yellow";
    case "entertainment":
      return "pink";
    default:
      return "gray";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "music":
      return "i-heroicons-musical-note";
    case "quiz":
      return "i-heroicons-academic-cap";
    case "food":
      return "i-heroicons-cake";
    case "special":
      return "i-heroicons-star";
    case "entertainment":
      return "i-heroicons-face-smile";
    default:
      return "i-heroicons-calendar";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "blue";
    case "ongoing":
      return "green";
    case "completed":
      return "gray";
    case "cancelled":
      return "red";
    default:
      return "gray";
  }
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
