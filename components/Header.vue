<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isOpen = ref(false)

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

// Close mobile menu when route changes
const route = useRoute()
watch(() => route.path, () => {
  isOpen.value = false
})
</script>

<template>
  <header
    class="bg-gradient-to-b from-gray-900 to-gray-800/95 backdrop-blur-sm fixed w-full z-50 border-b border-amber-600/20 shadow-md"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">

        <!-- Logo + site name -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <img
            src="../public/images/pub/logo.png"
            alt="The Pearson Pub Logo"
            class="h-14 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
          />
          <div class="hidden sm:flex flex-col">
            <span
              class="text-amber-400 text-xl font-bold font-serif select-none"
            >
              The Pearson Pub
            </span>
            <span class="text-gray-400 text-xs tracking-wider select-none">
              EST. 1984
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav
          class="hidden md:flex items-center space-x-10"
          aria-label="Primary navigation"
        >
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-300 hover:text-amber-400 transition-all duration-300 px-3 py-2 text-base font-medium relative group uppercase tracking-wide"
            active-class="text-amber-400"
          >
            {{ item.name }}
            <span
              class="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 opacity-70"
            ></span>
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <UButton
            color="amber"
            variant="ghost"
            @click="isOpen = !isOpen"
            aria-label="Toggle mobile menu"
            class="inline-flex items-center justify-center p-2 rounded-md text-amber-400 hover:text-amber-300 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <UIcon
              :name="isOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
              class="h-6 w-6"
            />
          </UButton>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="md:hidden bg-gray-800 shadow-lg border-t border-gray-700"
        role="menu"
        aria-orientation="vertical"
        aria-label="Mobile navigation"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-300 hover:text-amber-400 hover:bg-gray-700/50 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
            active-class="text-amber-400 bg-gray-700"
            @click="isOpen = false"
            role="menuitem"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <div
          class="px-4 py-3 border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm flex justify-between items-center"
        >
          <div class="text-sm text-gray-400 select-none">
            <p class="font-medium">Call us: 905-430-5699</p>
          </div>
          <div class="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener"
              class="text-gray-400 hover:text-amber-400 transition-colors duration-200"
              aria-label="Facebook"
            >
              <UIcon name="i-heroicons-facebook" class="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              class="text-gray-400 hover:text-amber-400 transition-colors duration-200"
              aria-label="Instagram"
            >
              <UIcon name="i-heroicons-instagram" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
/* Nav link underline animation */
nav a::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

nav a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
</style>
