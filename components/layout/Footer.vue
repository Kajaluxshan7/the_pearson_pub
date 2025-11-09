<template>
  <footer
    ref="footerRef"
    class="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 z-0">
      <!-- Floating Orbs -->
      <div
        v-for="i in 6"
        :key="`orb-${i}`"
        class="floating-orb absolute rounded-full opacity-10"
        :style="{
          width: `${20 + i * 15}px`,
          height: `${20 + i * 15}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `radial-gradient(circle, ${
            orbColors[i % orbColors.length]
          }, transparent)`,
          animationDelay: `${i * 0.8}s`,
        }"
      ></div>

      <!-- Particle System -->
      <div class="particles-container absolute inset-0">
        <div
          v-for="i in particleCount"
          :key="`particle-${i}`"
          class="particle absolute w-1 h-1 bg-yellow-400 rounded-full opacity-70"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }"
        ></div>
      </div>

      <!-- Wave Animation -->
      <svg
        class="absolute bottom-0 left-0 w-full h-32 opacity-20"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
          fill="url(#waveGradient)"
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: #fbbf24; stop-opacity: 0.3" />
            <stop offset="50%" style="stop-color: #f59e0b; stop-opacity: 0.6" />
            <stop
              offset="100%"
              style="stop-color: #d97706; stop-opacity: 0.3"
            />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Main Content -->
    <UContainer class="relative z-10 py-12">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-center md:text-left"
      >
        <!-- Branding and Social Links -->
        <div class="space-y-6">
          <div
            class="flex flex-col items-center md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0"
          >
            <img
              src="../../public/images/pub/logo.png"
              alt="Pearson Pub Logo"
              class="h-12 w-auto mx-auto md:mx-0"
            />
            <h3 class="text-xl font-bold text-yellow-500 mt-2 md:mt-0">
              The Pearson Pub
            </h3>
          </div>

          <p class="text-gray-400 max-w-xs mx-auto md:mx-0">
            A traditional pub atmosphere in the heart of Whitby.
          </p>
          <div
            class="flex justify-center md:justify-start items-center space-x-4"
          >
            <UButton
              v-for="link in socialLinks"
              :key="link.name"
              :icon="link.icon"
              variant="ghost"
              color="black"
              :to="link.url"
              target="_blank"
              rel="noopener"
              square
            />
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-6">
          <h3 class="text-lg font-semibold">Quick Links</h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink
                :to="link.path"
                class="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Hours -->
        <div class="space-y-6">
          <h3 class="text-lg font-semibold">Hours of Operation</h3>
          <ul class="space-y-2 text-sm text-gray-400">
            <li v-for="schedule in formattedBusinessHours" :key="schedule.days">
              <p class="font-medium text-gray-300">{{ schedule.days }}</p>
              <p>{{ schedule.hours }}</p>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="space-y-6">
          <h3 class="text-lg font-semibold">Contact Us</h3>
          <div class="space-y-4 text-gray-400">
            <div
              class="flex items-start justify-center md:justify-start space-x-3"
            >
              <UIcon
                name="i-heroicons-map-pin"
                class="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1"
              />
              <a
                href="https://maps.google.com/?q=101+MARY+ST+WHITBY,+ON,+L1N+2R4"
                target="_blank"
                rel="noopener"
                class="hover:text-yellow-500 transition-colors duration-200 no-underline"
              >
                101 MARY ST WHITBY, ON, L1N 2R4
              </a>
            </div>
            <div
              class="flex items-center justify-center md:justify-start space-x-3"
            >
              <UIcon
                name="i-heroicons-phone"
                class="w-5 h-5 text-yellow-500 flex-shrink-0"
              />
              <a
                href="tel:9054305699"
                class="hover:text-yellow-500 transition-colors duration-200 no-underline"
                >905-430-5699</a
              >
            </div>
            <div
              class="flex items-center justify-center md:justify-start space-x-3"
            >
              <UIcon
                name="i-heroicons-envelope"
                class="w-5 h-5 text-yellow-500 flex-shrink-0"
              />
              <a
                href="mailto:thepearsonpub@rogers.com"
                class="hover:text-yellow-500 transition-colors duration-200 no-underline"
              >
                thepearsonpub@rogers.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Entertainment Schedule -->
      <div class="border-t border-gray-800 pt-8 pb-4">
        <h3 class="text-lg font-semibold mb-4 text-center">
          Weekly Entertainment
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UCard
            v-for="event in entertainmentSchedule"
            :key="event.day"
            class="bg-gray-800 border-0"
          >
            <div class="text-center">
              <h4 class="font-medium text-yellow-500">{{ event.day }}</h4>
              <p class="text-gray-300">{{ event.event }}</p>
              <p class="text-sm text-gray-400">{{ event.time }}</p>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400"
      >
        <p>© {{ currentYear }} The Pearson Pub. All rights reserved.</p>
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLandingPageData } from "~/composables/useLandingPageData";

const currentYear = new Date().getFullYear();

// Get operation hours from backend
const { operationHours } = useLandingPageData();

// Format operation hours with proper time format and capitalization
const formattedBusinessHours = computed(() => {
  if (!operationHours.value?.length) {
    // Fallback to static hours if backend data not available
    return [
      { days: "Monday - Wednesday", hours: "11:00 AM - 12:00 AM" },
      { days: "Wednesday - Sunday", hours: "11:00 AM - 2:00 AM" },
    ];
  }

  // Helper function to format time from HH:MM:SS to HH:MM AM/PM
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Helper function to capitalize day names
  const capitalizeDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  // Group by similar times
  const grouped = operationHours.value.reduce((acc: any, hour: any) => {
    const timeKey = `${hour.open_time}-${hour.close_time}`;
    if (!acc[timeKey]) acc[timeKey] = [];
    acc[timeKey].push(capitalizeDay(hour.day));
    return acc;
  }, {});

  // Format each group
  return Object.entries(grouped).map(([time, days]: [string, any]) => {
    const [open, close] = time.split("-");
    const formattedDays = days.join(" - ");
    const formattedOpen = formatTime(open);
    const formattedClose = formatTime(close);
    return {
      days: formattedDays,
      hours: `${formattedOpen} - ${formattedClose}`,
    };
  });
});

const socialLinks = [
  {
    name: "Facebook",
    icon: "i-simple-icons-facebook",
    url: "https://www.facebook.com/thepearsonpubwhitby/",
  },
  {
    name: "Instagram",
    icon: "i-simple-icons-instagram",
    url: "https://www.instagram.com/the_pearson_pub?igsh=eWcycDhyN2wxN3Zz&utm_source=qr",
  },
  {
    name: "TikTok",
    icon: "i-simple-icons-tiktok",
    url: "https://www.tiktok.com/@the.pearson.pub6?_t=ZS-8yYnQOZpxEf&_r=1",
  },
];

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const entertainmentSchedule = [
  { day: "Friday", event: "Live Bands", time: "9:30 PM - 1:30 AM" },
  { day: "Saturday", event: "Live Bands", time: "9:30 PM - 1:30 AM" },
  { day: "Sunday", event: "Karaoke Night", time: "10:00 PM - 2:00 AM" },
];

const orbColors = ["#fbbf24", "#f59e0b", "#d97706"];
const particleCount = 30;
</script>

<style scoped>
.no-underline {
  text-decoration: none !important;
}

.no-underline:hover {
  text-decoration: none !important;
}

.floating-orb {
  animation: floatOrb 12s infinite ease-in-out alternate;
}

@keyframes floatOrb {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(30px, -30px) scale(1.1);
  }
  100% {
    transform: translate(-30px, 30px) scale(1);
  }
}

.particle {
  animation: moveParticle linear infinite;
}

@keyframes moveParticle {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.7;
  }
  100% {
    transform: translateY(-150px) scale(0.5);
    opacity: 0;
  }
}
</style>
