<template>
  <footer class="bg-gray-900 text-white">
    <UContainer class="py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-center md:text-left">
        <!-- Branding and Social Links -->
        <div class="space-y-6">
          <div class="flex flex-col items-center md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0">
            <img
              src="/images/pub/logo.png"
              alt="Pearson Pub Logo"
              class="h-12 w-auto mx-auto md:mx-0"
            />
            <h3 class="text-xl font-bold text-yellow-500 mt-2 md:mt-0">The Pearson Pub</h3>
          </div>

          <p class="text-gray-400 max-w-xs mx-auto md:mx-0">
            A traditional pub atmosphere in the heart of Whitby
          </p>
          <div class="flex justify-center md:justify-start items-center space-x-4">
            <UButton
              v-for="link in socialLinks"
              :key="link.name"
              :icon="link.icon"
              color=""
              variant="ghost"
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

        <!-- Hours and Entertainment -->
        <div class="space-y-6">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Hours of Operation</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li v-for="schedule in businessHours" :key="schedule.days">
                <p class="font-medium text-gray-300">{{ schedule.days }}</p>
                <p>{{ schedule.hours }}</p>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="space-y-6">
          <h3 class="text-lg font-semibold">Contact Us</h3>
          <div class="space-y-4 text-gray-400">
            <div class="flex flex-row items-start justify-center md:justify-start space-x-3">
              <UIcon
                name="i-heroicons-map-pin"
                class="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1"
              />
              <a
                href="https://maps.google.com/?q=101+MARY+ST+WHITBY,+ON,+L1N+2R4"
                target="_blank"
                rel="noopener"
                class="hover:text-yellow-500 underline"
                >101 MARY ST WHITBY, ON, L1N 2R4</a
              >
            </div>

            <div class="flex flex-row items-center justify-center md:justify-start space-x-3">
              <UIcon
                name="i-heroicons-phone"
                class="w-5 h-5 text-yellow-500 flex-shrink-0"
              />
              <a
                href="tel:9054305699"
                class="hover:text-yellow-500 underline"
                >905-430-5699</a
              >
            </div>

            <div class="flex flex-row items-center justify-center md:justify-start space-x-3">
              <UIcon
                name="i-heroicons-envelope"
                class="w-5 h-5 text-yellow-500 flex-shrink-0"
              />
              <a
                href="mailto:thepearsonpub@rogers.com"
                class="hover:text-yellow-500 underline"
                >thepearsonpub@rogers.com</a
              >
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
const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    name: "Facebook",
    icon: "i-simple-icons-facebook",
    url: "https://facebook.com",
  },
  {
    name: "Instagram",
    icon: "i-simple-icons-instagram",
    url: "https://instagram.com",
  },
  { name: "Twitter", icon: "i-simple-icons-x", url: "https://twitter.com" },
];

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const businessHours = [
  { days: "Monday - Tuesday", hours: "11:00 AM - 12:00 AM" },
  { days: "Wednesday - Saturday", hours: "11:00 AM - 2:00 AM" },
  { days: "Sunday", hours: "11:00 AM - 12:00 AM" },
];

const entertainmentSchedule = [
  { day: "Friday", event: "Live Bands", time: "9:30 PM - 1:30 AM" },
  { day: "Saturday", event: "Live Bands", time: "9:30 PM - 1:30 AM" },
  { day: "Sunday", event: "Karaoke Night", time: "10:00 PM - 2:00 AM" },
];
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: #fff;
  padding: 2rem 0;
  font-size: 0.9rem;
  margin-top: auto;
}
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}
@media (max-width: 768px) {
  .container {
    padding: 0 8px;
  }
  .grid {
    gap: 2rem 0.5rem !important;
  }
  .space-y-6 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 1.25rem !important;
  }
  .text-center.md\:text-left {
    text-align: center !important;
  }
  .flex.md\:flex-row {
    flex-direction: column !important;
    align-items: center !important;
  }
  .md\:items-center {
    align-items: center !important;
  }
  .md\:space-x-3 {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .max-w-xs {
    max-width: 90vw !important;
  }
}
.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
.logo a {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}
.footer-links a {
  color: #fff;
  text-decoration: none;
  margin-right: 1.5rem;
  transition: color 0.3s ease;
}
.footer-links a:hover {
  color: #ff5722;
}
.social a {
  margin-right: 1rem;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}
.social a:hover {
  color: #ff5722;
}
.footer-bottom {
  text-align: center;
}
</style>
