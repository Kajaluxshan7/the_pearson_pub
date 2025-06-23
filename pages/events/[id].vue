<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-3xl mx-auto">
      <template v-if="event">
        <EventCard :event="event" />
        <div class="mt-8 flex justify-center">
          <NuxtLink to="/events">
            <UButton color="gray" variant="solid">Back to Events</UButton>
          </NuxtLink>
        </div>
      </template>
      <template v-else>
        <div class="text-center text-gray-500 py-24 text-xl">
          Event not found.
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import EventCard from "~/components/events/EventCard.vue";

// Dummy event data (replace with API or store in real app)
const allEvents = [
  {
    id: "1",
    title: "Live Music Night",
    description:
      "Join us for a night of live acoustic music featuring local artists.",
    date: "June 20, 2025",
    time: "8:00 PM - 11:00 PM",
    image: "/images/entertainment/music.jpg",
    images: [
      "/images/entertainment/music.jpg",
      "/images/entertainment/music2.jpg",
    ],
    location: "Main Hall",
    tags: ["Music", "Live", "Acoustic"],
    performers: ["The Local Band", "Jane Doe"],
    featured: true,
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
  },
  {
    id: "3",
    title: "Summer BBQ",
    description:
      "Celebrate summer with our special BBQ event featuring live music and games.",
    date: "June 25, 2025",
    time: "2:00 PM - 8:00 PM",
    image: "/images/food/foods.jpg",
    images: ["/images/food/foods.jpg", "/images/food/foods2.jpg"],
    location: "Garden Area",
    tags: ["BBQ", "Summer", "Outdoor"],
    performers: ["DJ Sunny"],
    featured: true,
    ctaText: "See Menu",
    ctaLink: "/menu",
  },
];

const route = useRoute();
const event = ref<any>(null);

watch(
  () => route.params.id,
  (id) => {
    event.value = allEvents.find((e) => e.id === id);
  },
  { immediate: true }
);
</script>
