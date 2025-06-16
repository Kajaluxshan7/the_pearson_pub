<template>
    <section class="weekly-entertainment">
      <UCard class="bg-white rounded-xl shadow-lg p-8" elevation="lg">
        <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">Weekly Entertainment</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard
            v-for="event in events"
            :key="event.id"
            class="event-card hover:shadow-xl transition-shadow"
          >
            <div class="space-y-4">
              <h3 class="text-xl font-semibold text-gray-800">{{ event.title }}</h3>
              <p class="text-gray-600">{{ event.date }}</p>
              <p class="text-gray-700">{{ event.description }}</p>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <UIcon name="i-heroicons-clock" />
                <span>{{ event.time }}</span>
              </div>
            </div>
          </UCard>
        </div>
      </UCard>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { UCard, UIcon } from '@nuxt/ui'  // Import Nuxt UI components if needed
  
  const events = ref([
    {
      id: 1,
      title: "Live Music Night",
      date: "Every Friday",
      time: "7:00 PM - 10:00 PM",
      description: "Join us for an evening of live acoustic performances by local artists.",
    },
    {
      id: 2,
      title: "Quiz Night",
      date: "Every Wednesday",
      time: "8:00 PM - 10:00 PM",
      description: "Test your knowledge and win exciting prizes in our weekly pub quiz!",
    },
    {
      id: 3,
      title: "Open Mic Night",
      date: "Every Monday",
      time: "7:30 PM - 11:00 PM",
      description: "Show off your talent! Singers, comedians, and performers welcome.",
    },
  ])
  </script>
  
  <style scoped>
  .weekly-entertainment {
    padding: 2rem 0;
  }
  
  .event-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .event-card:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease-in-out;
  }
  </style>
  