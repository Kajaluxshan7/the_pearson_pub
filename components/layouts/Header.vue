<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const colorMode = useColorMode();
const isOpen = ref(false);

const navigationItems = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Events", path: "/events" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const route = useRoute();
const activeIndex = computed(() =>
  navigationItems.findIndex((item) => item.path === route.path)
);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

// Close menu on route change
watch(route, () => {
  if (isOpen.value) {
    isOpen.value = false;
    document.body.style.overflow = "";
  }
});

// Add scroll-based header visibility
const isHeaderVisible = ref(true);
const lastScrollPosition = ref(0);
const scrollThreshold = 50;

const handleScroll = () => {
  if (process.client) {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition < 0) return;

    // Show header when:
    // 1. Scrolling up
    // 2. At top of page
    // 3. Menu is open
    // 4. Scrolled less than threshold
    isHeaderVisible.value =
      currentScrollPosition < lastScrollPosition.value ||
      currentScrollPosition < scrollThreshold ||
      isOpen.value;

    lastScrollPosition.value = currentScrollPosition;
  }
};

onMounted(() => {
  if (process.client) {
    window.addEventListener("scroll", handleScroll);
    lastScrollPosition.value = window.scrollY;
  }
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener("scroll", handleScroll);
    document.body.style.overflow = "";
  }
});

const whatsappLink = "https://wa.me/1234567890"; // Replace with your WhatsApp number
</script>

<template>
  <!-- Header Spacer -->
  <div class="h-16"></div>

  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      {
        '-translate-y-full': !isHeaderVisible && !isOpen,
        'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md': true,
      },
    ]"
  >
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <img
            src="/images/pub/logo.png"
            alt="The Pearson Pub"
            class="h-10 w-auto"
          />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink
            v-for="(item, index) in navigationItems"
            :key="index"
            :to="item.path"
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
            :class="[
              index === activeIndex
                ? 'text-yellow-600 dark:text-yellow-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400',
            ]"
          >
            {{ item.name }}
            <div
              v-if="index === activeIndex"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform origin-left transition-transform duration-200"
            ></div>
          </NuxtLink>

          <!-- Dark Mode Toggle -->
          <button
            class="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            @click="
              colorMode.preference =
                colorMode.value === 'dark' ? 'light' : 'dark'
            "
          >
            <UIcon
              :name="
                colorMode.value === 'dark'
                  ? 'i-heroicons-moon'
                  : 'i-heroicons-sun'
              "
              class="w-5 h-5"
            />
          </button>
        </div>

        <div class="md:hidden flex items-center space-x-4">
          <!-- Dark Mode Toggle Mobile -->
          <button
            class="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            @click="
              colorMode.preference =
                colorMode.value === 'dark' ? 'light' : 'dark'
            "
          >
            <UIcon
              :name="
                colorMode.value === 'dark'
                  ? 'i-heroicons-moon'
                  : 'i-heroicons-sun'
              "
              class="w-5 h-5"
            />
          </button>

          <!-- Mobile Menu Button -->
          <button
            class="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            @click="toggleMenu"
          >
            <UIcon
              :name="isOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="isOpen"
          class="md:hidden absolute top-16 inset-x-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg rounded-b-lg"
        >
          <div class="px-2 pt-2 pb-3 space-y-1">
            <NuxtLink
              v-for="(item, index) in navigationItems"
              :key="index"
              :to="item.path"
              class="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              :class="[
                index === activeIndex
                  ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                  : 'text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
              ]"
              @click="toggleMenu"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </transition>
    </nav>
  </header>

  <!-- WhatsApp Button -->
  <a
    :href="whatsappLink"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition-colors duration-200"
    aria-label="Chat on WhatsApp"
  >
    <UIcon name="i-simple-icons-whatsapp" class="w-6 h-6" />
  </a>
</template>

<style scoped>
.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>
