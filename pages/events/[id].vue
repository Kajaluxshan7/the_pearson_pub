<template>
  <!-- Corrected structure -->
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center items-center min-h-[400px]">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p class="text-gray-600">Loading event details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <h1 class="text-2xl font-bold text-red-600 mb-4">Event Not Found</h1>
      <p class="text-gray-600 mb-6">Sorry, we couldn't find the event you're looking for.</p>
      <NuxtLink to="/events" class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
        <UIcon name="i-heroicons-arrow-left" class="mr-2" />
        Back to Events
      </NuxtLink>
    </div>

    <!-- Event Content -->
    <div v-else-if="event" class="max-w-4xl mx-auto">
      <!-- Breadcrumb -->
      <nav class="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
        <UIcon name="i-heroicons-chevron-right" class="h-4 w-4" />
        <NuxtLink to="/events" class="hover:text-primary">Events</NuxtLink>
        <UIcon name="i-heroicons-chevron-right" class="h-4 w-4" />
        <span class="text-gray-900">{{ event.title }}</span>
      </nav>

      <!-- Event Header -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="flex flex-col lg:flex-row gap-6">
          <!-- Event Image -->
          <div class="lg:w-2/3">
            <div class="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
              <img 
                v-if="event.images && event.images.length > 0"
                :src="event.images[0]" 
                :alt="event.title"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
                <UIcon name="i-heroicons-photo" class="h-16 w-16 text-gray-400" />
              </div>
            </div>
          </div>

          <!-- Event Info -->
          <div class="lg:w-1/3 space-y-4">
            <div>
              <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{{ event.title }}</h1>
              <div class="flex items-center space-x-2">
                <span 
                  class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="getBadgeClass(event.category)"
                >
                  {{ event.category }}
                </span>
                <span v-if="event.is_featured" class="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Featured
                </span>
              </div>
            </div>

            <!-- Event Details -->
            <div class="space-y-3">
              <!-- Date -->
              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-calendar-days" class="h-5 w-5 text-gray-400" />
                <div>
                  <p class="font-medium text-gray-900">{{ formatEventDate(event.event_date) }}</p>
                  <p class="text-sm text-gray-600">{{ formatEventDay(event.event_date) }}</p>
                </div>
              </div>

              <!-- Time -->
              <div v-if="event.event_time" class="flex items-center space-x-3">
                <UIcon name="i-heroicons-clock" class="h-5 w-5 text-gray-400" />
                <span class="text-gray-900">{{ event.event_time }}</span>
              </div>

              <!-- Price -->
              <div v-if="event.price !== null" class="flex items-center space-x-3">
                <UIcon name="i-heroicons-currency-dollar" class="h-5 w-5 text-gray-400" />
                <span class="text-gray-900">
                  {{ event.price === 0 ? 'Free' : `$${event.price}` }}
                </span>
              </div>

              <!-- Location -->
              <div v-if="event.location" class="flex items-center space-x-3">
                <UIcon name="i-heroicons-map-pin" class="h-5 w-5 text-gray-400" />
                <span class="text-gray-900">{{ event.location }}</span>
              </div>
            </div>

            <!-- Share Button -->
            <div class="pt-4">
              <button 
                @click="shareEvent"
                class="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <UIcon name="i-heroicons-share" class="h-4 w-4" />
                <span>Share Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Description -->
      <div v-if="event.description" class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 class="text-xl font-bold text-gray-900 mb-4">About This Event</h2>
        <div class="prose prose-gray max-w-none">
          <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ event.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLandingPageData } from '~/composables/useLandingPageData';

const route = useRoute();
const router = useRouter();
const { allEvents, pending, error } = useLandingPageData();

const event = computed(() => {
  if (!allEvents.value) return null;
  const id = route.params.id;
  return allEvents.value.find(e => e.id === id || e.id === parseInt(id) || e.slug === id);
});

const getBadgeClass = (category: string) => {
  const classes: Record<string, string> = {
    'Live Music': 'bg-purple-100 text-purple-800',
    'Special Event': 'bg-blue-100 text-blue-800',
    'Sports': 'bg-green-100 text-green-800',
    'Trivia': 'bg-orange-100 text-orange-800',
    'Karaoke': 'bg-pink-100 text-pink-800',
    'Food Special': 'bg-red-100 text-red-800',
    'music': 'bg-purple-100 text-purple-800',
    'entertainment': 'bg-blue-100 text-blue-800',
    'food': 'bg-red-100 text-red-800',
  };
  return classes[category] || 'bg-gray-100 text-gray-800';
};

const formatEventDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return dateString;
  }
};

const formatEventDay = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return '';
  } catch (error) {
    return '';
  }
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  if (target) target.style.display = 'none';
};

const shareEvent = async () => {
  if (!event.value) return;
  const shareData = {
    title: event.value.title,
    text: event.value.description,
    url: window.location.href,
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  } catch (error) {
    console.error('Error sharing:', error);
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose h1,
.prose h2,
.prose h3 {
  color: #1a202c;
}

.prose p {
  color: #4b5563;
  line-height: 1.6;
}

.prose strong {
  color: #1a202c;
}
</style>
