<template>
  <UCard
    class="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 border-0"
  >
    <!-- Event Image Carousel -->
    <template #header>
      <div class="relative overflow-hidden">
        <template v-if="event.images && event.images.length > 1">
          <div class="relative w-full h-64 lg:h-80">
            <NuxtImg
              v-for="(img, idx) in event.images"
              :key="img"
              v-show="carouselIndex === idx"
              :src="img"
              class="w-full h-64 lg:h-80 object-cover absolute top-0 left-0 transition-opacity duration-500"
              :alt="event.title + ' image ' + (idx + 1)"
              format="webp"
              quality="80"
            />
            <!-- Carousel Controls -->
            <button
              v-if="event.images.length > 1"
              @click="previousImage"
              class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
            >
              <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
            </button>
            <button
              v-if="event.images.length > 1"
              @click="nextImage"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
            >
              <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
            </button>
            <!-- Carousel Indicators -->
            <div
              class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2"
            >
              <span
                v-for="(img, idx) in event.images"
                :key="idx"
                class="w-2 h-2 rounded-full cursor-pointer transition-all"
                :class="
                  carouselIndex === idx
                    ? 'bg-yellow-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                "
                @click="carouselIndex = idx"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <NuxtImg
            :src="event.image || '/images/entertainment/music.jpg'"
            :alt="event.title"
            class="w-full h-64 lg:h-80 object-cover"
            format="webp"
            quality="80"
          />
        </template>

        <!-- Event Badges -->
        <div class="absolute top-4 left-4 flex flex-col gap-2">
          <UBadge
            v-if="event.featured"
            color="yellow"
            variant="solid"
            class="font-semibold"
          >
            Featured
          </UBadge>
          <UBadge
            :color="getStatusColor(event.status)"
            variant="solid"
            class="font-semibold"
          >
            {{ event.status.charAt(0).toUpperCase() + event.status.slice(1) }}
          </UBadge>
        </div>

        <!-- Category Badge -->
        <div class="absolute top-4 right-4">
          <UBadge
            :color="getCategoryColor(event.category)"
            variant="subtle"
            class="font-semibold"
          >
            {{
              event.category.charAt(0).toUpperCase() + event.category.slice(1)
            }}
          </UBadge>
        </div>

        <!-- Price Badge (if available) -->
        <div
          v-if="event.price"
          class="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full"
        >
          <span class="text-sm font-semibold">
            From ${{
              Math.min(
                ...Object.values(event.price).filter((p) => p !== undefined)
              )
            }}
          </span>
        </div>
      </div>
    </template>

    <div class="p-6 space-y-6">
      <!-- Event Header -->
      <div class="space-y-4">
        <h1
          class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white"
        >
          {{ event.title }}
        </h1>

        <!-- Event Meta Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="flex items-center text-gray-600 dark:text-gray-300">
            <UIcon
              name="i-heroicons-calendar"
              class="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400"
            />
            <span class="font-medium">{{ event.date }}</span>
            <span v-if="event.endDate" class="ml-2">- {{ event.endDate }}</span>
          </div>
          <div class="flex items-center text-gray-600 dark:text-gray-300">
            <UIcon
              name="i-heroicons-clock"
              class="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400"
            />
            <span class="font-medium">{{ event.time }}</span>
            <span v-if="event.endTime" class="ml-2">- {{ event.endTime }}</span>
          </div>
          <div
            v-if="event.location"
            class="flex items-center text-gray-600 dark:text-gray-300"
          >
            <UIcon
              name="i-heroicons-map-pin"
              class="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400"
            />
            <span class="font-medium">{{ event.location }}</span>
          </div>
          <div
            v-if="event.ageRestriction"
            class="flex items-center text-gray-600 dark:text-gray-300"
          >
            <UIcon
              name="i-heroicons-identification"
              class="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400"
            />
            <span class="font-medium">{{ event.ageRestriction }}</span>
          </div>
        </div>

        <!-- Rating (if available) -->
        <div v-if="event.averageRating" class="flex items-center gap-2">
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
              class="w-5 h-5"
            />
          </div>
          <span class="text-sm text-gray-600 dark:text-gray-300">
            {{ event.averageRating.toFixed(1) }} ({{
              event.totalReviews
            }}
            reviews)
          </span>
        </div>
      </div>

      <!-- Event Description -->
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ event.description }}
        </p>

        <!-- Full Description (if available) -->
        <div v-if="event.fullDescription && showFullDescription">
          <div
            class="prose prose-sm max-w-none text-gray-600 dark:text-gray-300"
          >
            <div v-html="formatDescription(event.fullDescription)"></div>
          </div>
        </div>

        <button
          v-if="event.fullDescription"
          @click="showFullDescription = !showFullDescription"
          class="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-medium text-sm transition-colors"
        >
          {{ showFullDescription ? "Show Less" : "Read More" }}
        </button>
      </div>

      <!-- Venue Information -->
      <div
        v-if="event.venue"
        class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white">
          Venue Information
        </h3>
        <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <p><span class="font-medium">Venue:</span> {{ event.venue.name }}</p>
          <p>
            <span class="font-medium">Capacity:</span>
            {{ event.venue.capacity }} people
          </p>
          <p v-if="event.venue.layout">
            <span class="font-medium">Layout:</span> {{ event.venue.layout }}
          </p>
        </div>
      </div>

      <!-- Performers -->
      <div
        v-if="event.performers && event.performers.length > 0"
        class="space-y-3"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white">Performers</h3>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="performer in event.performers"
            :key="performer"
            color="blue"
            variant="subtle"
            class="text-sm"
          >
            {{ performer }}
          </UBadge>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="event.tags && event.tags.length > 0" class="space-y-3">
        <h3 class="font-semibold text-gray-900 dark:text-white">Tags</h3>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in event.tags"
            :key="tag"
            color="gray"
            variant="subtle"
            class="text-sm"
          >
            {{ tag }}
          </UBadge>
        </div>
      </div>

      <!-- Pricing Information -->
      <div
        v-if="event.price"
        class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 space-y-3"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white">Pricing</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div v-if="event.price.general" class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-300">General</p>
            <p class="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              ${{ event.price.general }}
            </p>
          </div>
          <div v-if="event.price.vip" class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-300">VIP</p>
            <p class="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              ${{ event.price.vip }}
            </p>
          </div>
          <div v-if="event.price.student" class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-300">Student</p>
            <p class="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              ${{ event.price.student }}
            </p>
          </div>
        </div>
        <div v-if="event.ticketsAvailable" class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ event.ticketsAvailable }} tickets remaining
          </p>
        </div>
      </div>

      <!-- Special Requirements -->
      <div
        v-if="event.specialRequirements && event.specialRequirements.length > 0"
        class="space-y-3"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white">
          Important Information
        </h3>
        <ul
          class="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1"
        >
          <li
            v-for="requirement in event.specialRequirements"
            :key="requirement"
          >
            {{ requirement }}
          </li>
        </ul>
      </div>

      <!-- Organizer Information -->
      <div
        v-if="event.organizer"
        class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white">
          Organized by
        </h3>
        <div class="flex items-start gap-3">
          <NuxtImg
            v-if="event.organizer.image"
            :src="event.organizer.image"
            :alt="event.organizer.name"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ event.organizer.name }}
            </p>
            <p
              v-if="event.organizer.description"
              class="text-sm text-gray-600 dark:text-gray-300"
            >
              {{ event.organizer.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div v-if="event.contactInfo" class="space-y-3">
        <h3 class="font-semibold text-gray-900 dark:text-white">
          Contact Information
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div
            v-if="event.contactInfo.phone"
            class="flex items-center text-gray-600 dark:text-gray-300"
          >
            <UIcon
              name="i-heroicons-phone"
              class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400"
            />
            <a
              :href="'tel:' + event.contactInfo.phone"
              class="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
            >
              {{ event.contactInfo.phone }}
            </a>
          </div>
          <div
            v-if="event.contactInfo.email"
            class="flex items-center text-gray-600 dark:text-gray-300"
          >
            <UIcon
              name="i-heroicons-envelope"
              class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400"
            />
            <a
              :href="'mailto:' + event.contactInfo.email"
              class="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
            >
              {{ event.contactInfo.email }}
            </a>
          </div>
        </div>
      </div>

      <!-- Social Media -->
      <div v-if="event.socialMedia" class="space-y-3">
        <h3 class="font-semibold text-gray-900 dark:text-white">
          Follow this Event
        </h3>
        <div class="flex gap-3">
          <a
            v-if="event.socialMedia.facebook"
            :href="event.socialMedia.facebook"
            target="_blank"
            class="text-blue-600 hover:text-blue-700 transition-colors"
          >
            <UIcon name="i-simple-icons-facebook" class="w-6 h-6" />
          </a>
          <a
            v-if="event.socialMedia.instagram"
            :href="event.socialMedia.instagram"
            target="_blank"
            class="text-pink-600 hover:text-pink-700 transition-colors"
          >
            <UIcon name="i-simple-icons-instagram" class="w-6 h-6" />
          </a>
          <a
            v-if="event.socialMedia.twitter"
            :href="event.socialMedia.twitter"
            target="_blank"
            class="text-blue-400 hover:text-blue-500 transition-colors"
          >
            <UIcon name="i-simple-icons-twitter" class="w-6 h-6" />
          </a>
        </div>
      </div>

      <!-- Reviews Section -->
      <div v-if="event.reviews && event.reviews.length > 0" class="space-y-4">
        <h3 class="font-semibold text-gray-900 dark:text-white">
          Recent Reviews
        </h3>
        <div class="space-y-4">
          <div
            v-for="review in event.reviews.slice(
              0,
              showAllReviews ? event.reviews.length : 3
            )"
            :key="review.id"
            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
          >
            <div class="flex items-start justify-between mb-2">
              <div>
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ review.userName }}
                </p>
                <div class="flex items-center gap-1">
                  <UIcon
                    v-for="star in 5"
                    :key="star"
                    name="i-heroicons-star-solid"
                    :class="
                      star <= review.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    "
                    class="w-4 h-4"
                  />
                </div>
              </div>
              <span class="text-xs text-gray-500">{{ review.date }}</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ review.comment }}
            </p>
          </div>

          <button
            v-if="event.reviews.length > 3"
            @click="showAllReviews = !showAllReviews"
            class="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-medium text-sm transition-colors"
          >
            {{
              showAllReviews
                ? "Show Less Reviews"
                : `Show All ${event.reviews.length} Reviews`
            }}
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-600"
      >
        <UButton
          v-if="event.ctaText && event.ctaLink"
          :to="event.ctaLink"
          color="yellow"
          variant="solid"
          size="lg"
          class="flex-1 justify-center"
        >
          {{ event.ctaText }}
        </UButton>

        <UButton
          v-else-if="event.status === 'upcoming'"
          color="yellow"
          variant="solid"
          size="lg"
          class="flex-1 justify-center"
          @click="handleBooking"
        >
          Book Now
        </UButton>

        <UButton
          color="gray"
          variant="outline"
          size="lg"
          class="sm:w-auto"
          @click="handleShare"
        >
          <UIcon name="i-heroicons-share" class="w-4 h-4 mr-2" />
          Share
        </UButton>

        <UButton
          :color="isFavorite ? 'red' : 'gray'"
          variant="outline"
          size="lg"
          class="sm:w-auto"
          @click="toggleFavorite"
        >
          <UIcon
            :name="isFavorite ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
            class="w-4 h-4 mr-2"
          />
          {{ isFavorite ? "Favorited" : "Favorite" }}
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import type { Event } from "~/types/events";

const props = defineProps<{
  event: Event;
}>();

// Carousel functionality
const carouselIndex = ref(0);
const showFullDescription = ref(false);
const showAllReviews = ref(false);
const isFavorite = ref(false);
let carouselInterval: NodeJS.Timeout | null = null;

const nextImage = () => {
  if (props.event.images && props.event.images.length > 1) {
    carouselIndex.value = (carouselIndex.value + 1) % props.event.images.length;
  }
};

const previousImage = () => {
  if (props.event.images && props.event.images.length > 1) {
    carouselIndex.value =
      carouselIndex.value === 0
        ? props.event.images.length - 1
        : carouselIndex.value - 1;
  }
};

// Auto-play carousel
const startCarousel = () => {
  if (props.event.images && props.event.images.length > 1) {
    carouselInterval = setInterval(nextImage, 4000);
  }
};

const stopCarousel = () => {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
};

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

const formatDescription = (description: string) => {
  return description.replace(/\n/g, "<br>");
};

const handleBooking = () => {
  // TODO: Implement booking functionality
  alert("Booking functionality coming soon!");
};

const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: props.event.title,
      text: props.event.description,
      url: window.location.href,
    });
  } else {
    // Fallback: copy URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert("Event URL copied to clipboard!");
  }
};

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  // TODO: Implement favorites functionality
};

onMounted(() => {
  startCarousel();
});

onUnmounted(() => {
  stopCarousel();
});
</script>

<style scoped>
.prose {
  color: inherit;
}
</style>
