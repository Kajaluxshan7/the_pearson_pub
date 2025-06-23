<template>
  <section
    class="py-16 lg:py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
  >
    <div class="absolute inset-0 opacity-5">
      <div
        class="absolute top-10 left-10 w-32 h-32 lg:w-40 lg:h-40 rounded-full border-2 border-yellow-500"
      ></div>
      <div
        class="absolute bottom-10 right-10 w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-yellow-300"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-12 lg:mb-16">
        <h2
          class="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          style="font-family: 'Cinzel', 'Georgia', serif"
        >
          Weekly
          <span class="text-yellow-600 dark:text-yellow-400">Schedule</span>
        </h2>
        <div class="w-16 lg:w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
        <p
          class="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Don't miss our regular entertainment lineup throughout the week
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <div
          v-for="(schedule, index) in weeklySchedule"
          :key="index"
          class="group bg-gray-50 dark:bg-gray-700 rounded-xl p-6 lg:p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-600 hover:border-yellow-400 dark:hover:border-yellow-500"
        >
          <div class="mb-6">
            <UIcon
              :name="schedule.icon"
              class="w-12 h-12 lg:w-16 lg:h-16 text-yellow-600 dark:text-yellow-400 mx-auto group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <h3
            class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors"
          >
            {{ schedule.day }}
          </h3>

          <p
            class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg mb-3"
          >
            {{ schedule.event }}
          </p>

          <div
            class="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 mb-4"
          >
            <UIcon name="i-heroicons-clock" class="w-4 h-4" />
            <span class="text-sm font-medium">{{ schedule.time }}</span>
          </div>

          <p
            v-if="schedule.description"
            class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4"
          >
            {{ schedule.description }}
          </p>

          <!-- Additional Details -->
          <div v-if="schedule.price || schedule.specialNote" class="space-y-2">
            <div v-if="schedule.price" class="text-sm">
              <span class="text-gray-500 dark:text-gray-400">Entry:</span>
              <span
                class="font-semibold text-yellow-600 dark:text-yellow-400 ml-1"
                >${{ schedule.price }}</span
              >
            </div>

            <div
              v-if="schedule.specialNote"
              class="text-xs text-gray-500 dark:text-gray-400 italic"
            >
              {{ schedule.specialNote }}
            </div>
          </div>

          <!-- Call to Action -->
          <div class="mt-6">
            <UButton
              :to="schedule.link || '/contact'"
              color="yellow"
              variant="outline"
              size="sm"
              class="group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300"
            >
              {{ schedule.ctaText || "Learn More" }}
            </UButton>
          </div>
        </div>
      </div>

      <!-- Special Events Notice -->
      <div class="mt-12 lg:mt-16 text-center">
        <div
          class="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 lg:p-8 max-w-4xl mx-auto border border-yellow-200 dark:border-yellow-800"
        >
          <UIcon
            name="i-heroicons-megaphone"
            class="w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-4"
          />
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Special Events & Private Bookings
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Planning a private event, birthday party, or corporate gathering?
            We'd love to host you!
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <UButton to="/contact" color="yellow" variant="solid" size="md">
              <UIcon name="i-heroicons-phone" class="w-4 h-4 mr-2" />
              Contact Us
            </UButton>
            <UButton to="/events" color="gray" variant="outline" size="md">
              <UIcon name="i-heroicons-calendar" class="w-4 h-4 mr-2" />
              View All Events
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useEvents } from "~/composables/useEvents";

// Use the events composable to get weekly schedule data
const { weeklySchedule } = useEvents();
</script>
