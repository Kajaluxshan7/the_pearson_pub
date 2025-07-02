<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 3D Background -->
    <Background3D 
      :intensity="0.6" 
      :enable-particles="true" 
      :enable-rays="false" 
      :enable-morphing="true"
      :particle-count="30"
      color-scheme="blue"
    />
    
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
        <p class="text-gray-600 dark:text-gray-400">Loading event...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center space-y-4 max-w-md mx-auto p-6">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-16 h-16 text-red-500 mx-auto" />
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Event Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400">{{ error }}</p>
        <NuxtLink to="/events">
          <UButton color="yellow" variant="solid" class="mt-4">
            <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
            Back to Events
          </UButton>
        </NuxtLink>
      </div>
    </div>

    <!-- Event Content -->
    <div v-else-if="event" class="relative z-10">
      <!-- Enhanced layout for landscape orientation -->
      <div class="container mx-auto px-4 py-8 lg:py-12">
        <!-- Breadcrumb Navigation -->
        <nav class="mb-6 text-sm">
          <ol class="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <li>
              <NuxtLink to="/" class="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                Home
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 mx-2" />
              <NuxtLink to="/events" class="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                Events
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 mx-2" />
              <span class="text-gray-900 dark:text-white font-medium">{{ event.title }}</span>
            </li>
          </ol>
        </nav>

        <!-- Responsive layout: stack on mobile, side-by-side on desktop -->
        <div class="lg:grid lg:grid-cols-12 lg:gap-8 space-y-8 lg:space-y-0">          <!-- Main Event Content -->
          <div class="lg:col-span-8">
            <EventCard :event="event" :is-detail-view="true" class="h-fit" />
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-4 space-y-6">
            <!-- Quick Actions -->
            <UCard class="bg-white dark:bg-gray-800">
              <template #header>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
              </template>
              <div class="space-y-3">
                <UButton 
                  v-if="event.ctaLink" 
                  :to="event.ctaLink" 
                  color="yellow" 
                  variant="solid" 
                  class="w-full justify-center"
                  size="lg"
                >
                  <UIcon name="i-heroicons-ticket" class="w-5 h-5 mr-2" />
                  {{ event.ctaText || 'Book Now' }}
                </UButton>
                <UButton color="gray" variant="outline" class="w-full justify-center" @click="shareEvent">
                  <UIcon name="i-heroicons-share" class="w-5 h-5 mr-2" />
                  Share Event
                </UButton>
                <UButton color="gray" variant="outline" class="w-full justify-center" @click="addToCalendar">
                  <UIcon name="i-heroicons-calendar-plus" class="w-5 h-5 mr-2" />
                  Add to Calendar
                </UButton>
              </div>
            </UCard>

            <!-- Related Events -->
            <UCard v-if="relatedEvents.length > 0" class="bg-white dark:bg-gray-800">
              <template #header>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Related Events</h3>
              </template>
              <div class="space-y-4">
                <div 
                  v-for="relatedEvent in relatedEvents.slice(0, 3)" 
                  :key="relatedEvent.id"
                  class="group cursor-pointer"
                  @click="navigateToEvent(relatedEvent.id)"
                >
                  <div class="flex space-x-3">
                    <div class="flex-shrink-0">
                      <NuxtImg
                        :src="relatedEvent.image || '/images/entertainment/music.jpg'"
                        :alt="relatedEvent.title"
                        class="w-16 h-16 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                        format="webp"
                        quality="60"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors truncate">
                        {{ relatedEvent.title }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        {{ formatDate(relatedEvent.date) }}
                      </p>
                      <div class="flex items-center mt-1">                        <UBadge 
                          :color="getCategoryColor(relatedEvent.category) as any" 
                          variant="subtle" 
                          class="text-xs"
                        >
                          {{ relatedEvent.category }}
                        </UBadge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Contact Information -->
            <UCard class="bg-white dark:bg-gray-800">
              <template #header>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Need Help?</h3>
              </template>
              <div class="space-y-3 text-sm">
                <div class="flex items-center text-gray-600 dark:text-gray-300">
                  <UIcon name="i-heroicons-phone" class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400" />
                  <span>(555) 123-4567</span>
                </div>
                <div class="flex items-center text-gray-600 dark:text-gray-300">
                  <UIcon name="i-heroicons-envelope" class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400" />
                  <span>events@pearsonpub.com</span>
                </div>
                <NuxtLink to="/contact" class="inline-flex items-center text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors">
                  <UIcon name="i-heroicons-map-pin" class="w-4 h-4 mr-2" />
                  Get Directions
                </NuxtLink>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Navigation -->
        <div class="mt-12 flex justify-between items-center">
          <NuxtLink to="/events">
            <UButton color="gray" variant="outline" size="lg">
              <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 mr-2" />
              Back to Events
            </UButton>
          </NuxtLink>
          
          <div class="flex space-x-4">
            <UButton 
              v-if="previousEvent" 
              :to="`/events/${previousEvent.id}`" 
              color="gray" 
              variant="outline"
              class="hidden sm:flex"
            >
              <UIcon name="i-heroicons-chevron-left" class="w-4 h-4 mr-1" />
              Previous
            </UButton>
            <UButton 
              v-if="nextEvent" 
              :to="`/events/${nextEvent.id}`" 
              color="gray" 
              variant="outline"
              class="hidden sm:flex"
            >
              Next
              <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 ml-1" />
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import EventCard from "~/components/events/EventCard.vue";
import Background3D from "~/components/Background3D.vue";
import { eventsApi } from "~/composables/useApi";

const route = useRoute();
const router = useRouter();

// Backend integration
const loading = ref(true);
const error = ref<string | null>(null);
const event = ref<any>(null);
const allEvents = ref<any[]>([]);

// Fetch event data
onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;    // Get all events to find the specific one and related events
    const response = await eventsApi.getAll(1, 100);
    allEvents.value = response.data;

    // Find the specific event
    const eventId = route.params.id as string;
    const foundEvent = allEvents.value.find(e => 
      e.id === eventId || 
      e.id === parseInt(eventId) ||
      e.slug === eventId
    );

    if (foundEvent) {
      // Transform backend event to UI format
      event.value = {
        ...foundEvent,
        image: foundEvent.images?.[0] || foundEvent.image || '/images/entertainment/music.jpg',
        images: foundEvent.images || [foundEvent.image || '/images/entertainment/music.jpg'],
        date: foundEvent.startDate ? new Date(foundEvent.startDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : foundEvent.date,
        endDate: foundEvent.endDate ? new Date(foundEvent.endDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : undefined,
        time: foundEvent.startTime || foundEvent.time,
        endTime: foundEvent.endTime,
        featured: foundEvent.featured || false,
        performers: foundEvent.performers || [],
        tags: foundEvent.tags || [],
        ctaText: foundEvent.ctaText || 'Book a Table',
        ctaLink: foundEvent.ctaLink || '/contact'
      };
    } else {
      // Fallback to static events for backward compatibility
      const staticEvents = [
        {
          id: "1",
          title: "Live Music Night",
          description: "Join us for a night of live acoustic music featuring local artists.",
          date: "June 20, 2025",
          time: "8:00 PM - 11:00 PM",
          image: "/images/entertainment/music.jpg",
          images: ["/images/entertainment/music.jpg", "/images/entertainment/music2.jpg"],
          location: "Main Hall",
          tags: ["Music", "Live", "Acoustic"],
          performers: ["The Local Band", "Jane Doe"],
          featured: true,
          category: "music",
          status: "upcoming",
          ctaText: "Book a Table",
          ctaLink: "/contact",
        },
        {
          id: "2",
          title: "Pub Quiz Night",
          description: "Test your knowledge and win prizes at our weekly pub quiz!",
          date: "June 22, 2025",
          time: "7:30 PM - 10:00 PM",
          image: "/images/pub/interior-main.jpg",
          images: ["/images/pub/interior-main.jpg"],
          location: "Quiz Room",
          tags: ["Quiz", "Fun", "Prizes"],
          performers: ["Quizmaster John"],
          featured: false,
          category: "entertainment",
          status: "upcoming",
        },
        {
          id: "3",
          title: "Summer BBQ",
          description: "Celebrate summer with our special BBQ event featuring live music and games.",
          date: "June 25, 2025",
          time: "2:00 PM - 8:00 PM",
          image: "/images/food/foods.jpg",
          images: ["/images/food/foods.jpg", "/images/food/foods2.jpg"],
          location: "Garden Area",
          tags: ["BBQ", "Summer", "Outdoor"],
          performers: ["DJ Sunny"],
          featured: true,
          category: "food",
          status: "upcoming",
          ctaText: "See Menu",
          ctaLink: "/menu",
        },
      ];
      
      event.value = staticEvents.find((e) => e.id === eventId);
      
      if (!event.value) {
        error.value = "The event you're looking for could not be found.";
      }
    }
  } catch (err) {
    console.error('Error fetching event:', err);
    error.value = "Failed to load event details. Please try again later.";
  } finally {
    loading.value = false;
  }
});

// Related events (same category, exclude current event)
const relatedEvents = computed(() => {
  if (!event.value || !allEvents.value.length) return [];
  
  return allEvents.value
    .filter(e => 
      e.id !== event.value.id && 
      e.category === event.value.category
    )
    .slice(0, 4);
});

// Navigation between events
const currentEventIndex = computed(() => {
  if (!event.value || !allEvents.value.length) return -1;
  return allEvents.value.findIndex(e => e.id === event.value.id);
});

const previousEvent = computed(() => {
  const index = currentEventIndex.value;
  if (index <= 0) return null;
  return allEvents.value[index - 1];
});

const nextEvent = computed(() => {
  const index = currentEventIndex.value;
  if (index === -1 || index >= allEvents.value.length - 1) return null;
  return allEvents.value[index + 1];
});

// Utility functions
const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

const getCategoryColor = (category: string): string => {
  const colors = {
    music: 'purple',
    entertainment: 'blue',
    food: 'orange',
    sports: 'green',
    special: 'red',
    default: 'gray'
  };
  return colors[category as keyof typeof colors] || colors.default;
};

const navigateToEvent = (eventId: string | number) => {
  router.push(`/events/${eventId}`);
};

const shareEvent = async () => {
  if (navigator.share && event.value) {
    try {
      await navigator.share({
        title: event.value.title,
        text: event.value.description,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback to copying to clipboard
      await navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  } else {
    // Fallback for browsers that don't support Web Share API
    await navigator.clipboard.writeText(window.location.href);
    // You could show a toast notification here
  }
};

const addToCalendar = () => {
  if (!event.value) return;
  
  // Create a basic calendar event URL (Google Calendar format)
  const startDate = event.value.startDate ? new Date(event.value.startDate) : new Date();
  const endDate = event.value.endDate ? new Date(event.value.endDate) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
  
  const formatDateForCalendar = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.value.title)}&dates=${formatDateForCalendar(startDate)}/${formatDateForCalendar(endDate)}&details=${encodeURIComponent(event.value.description)}&location=${encodeURIComponent(event.value.location || 'The Pearson Pub')}`;
  
  window.open(calendarUrl, '_blank');
};

// SEO
useHead({
  title: () => event.value ? `${event.value.title} - The Pearson Pub` : 'Event - The Pearson Pub',
  meta: [
    {
      name: 'description',
      content: () => event.value?.description || 'Event at The Pearson Pub'
    },
    {
      property: 'og:title',
      content: () => event.value ? `${event.value.title} - The Pearson Pub` : 'Event - The Pearson Pub'
    },
    {
      property: 'og:description',
      content: () => event.value?.description || 'Event at The Pearson Pub'
    },
    {
      property: 'og:image',
      content: () => event.value?.image || '/images/entertainment/music.jpg'
    }
  ]
});
</script>
