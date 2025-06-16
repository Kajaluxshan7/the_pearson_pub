<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gray-900 text-white">
      <div class="absolute inset-0 overflow-hidden">
        <img
          src="/images/entertainment/music.jpg"
          alt="Events & Entertainment"
          class="w-full h-full object-cover opacity-30"
        />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          Events & Entertainment
        </h1>
        <p class="text-xl max-w-3xl mx-auto">
          Join us for live music, pub quizzes, and special events
        </p>
      </div>
    </section>

    <!-- Events Grid -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard v-for="event in events" :key="event.id">
            <template #header>
              <img
                :src="event.image"
                :alt="event.title"
                class="w-full h-48 object-cover"
              />
            </template>
            <h3 class="text-xl font-bold mb-2">{{ event.title }}</h3>
            <p class="text-gray-600 mb-4">{{ event.description }}</p>
            <div class="flex items-center text-sm text-gray-500">
              <NuxtIcon name="heroicons-calendar" class="w-5 h-5 mr-2" />
              <span>{{ event.date }}</span>
            </div>
            <div class="flex items-center text-sm text-gray-500 mt-2">
              <NuxtIcon name="heroicons-clock" class="w-5 h-5 mr-2" />
              <span>{{ event.time }}</span>
            </div>
            <template #footer>
              <UButton
                color="yellow"
                variant="solid"
                class="w-full"
                @click="showEventDetails(event)"
              >
                Learn More
              </UButton>
            </template>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <UModal v-model="isModalOpen" aria-label="Event Details">
      <UCard v-if="selectedEvent">
        <template #header>
          <img
            :src="selectedEvent.image"
            :alt="selectedEvent.title"
            class="w-full h-64 object-cover"
          />
        </template>
        <h2 class="text-2xl font-bold mb-4">{{ selectedEvent.title }}</h2>
        <p class="text-gray-600 mb-4">{{ selectedEvent.description }}</p>
        <div class="space-y-2">
          <div class="flex items-center text-gray-500">
            <NuxtIcon name="heroicons-calendar" class="w-5 h-5 mr-2" />
            <span>{{ selectedEvent.date }}</span>
          </div>
          <div class="flex items-center text-gray-500">
            <NuxtIcon name="heroicons-clock" class="w-5 h-5 mr-2" />
            <span>{{ selectedEvent.time }}</span>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UseHeadInput } from "@unhead/vue";

// ...rest of your existing code...
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
}

const isModalOpen = ref(false);
const selectedEvent = ref<Event | null>(null);

const events = ref<Event[]>([
  {
    id: "1",
    title: "Live Music Night",
    description:
      "Join us for a night of live acoustic music featuring local artists.",
    date: "June 20, 2025",
    time: "8:00 PM - 11:00 PM",
    image: "/images/entertainment/music.jpg",
  },
  {
    id: "2",
    title: "Pub Quiz Night",
    description: "Test your knowledge and win prizes at our weekly pub quiz!",
    date: "June 22, 2025",
    time: "7:30 PM - 10:00 PM",
    image: "/images/pub/interior-main.jpg",
  },
  {
    id: "3",
    title: "Summer BBQ",
    description:
      "Celebrate summer with our special BBQ event featuring live music and games.",
    date: "June 25, 2025",
    time: "2:00 PM - 8:00 PM",
    image: "/images/food/foods.jpg",
  },
]);

const showEventDetails = (event: Event) => {
  selectedEvent.value = event;
  isModalOpen.value = true;
};

// Page meta
useHead({
  title: "Events & Entertainment - The Pearson Pub",
  meta: [
    {
      name: "description",
      content:
        "Join us for live music, pub quizzes, and special events at The Pearson Pub.",
    },
  ],
});
</script>
