<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from '#imports'

// Use Nuxt's unified color mode system
const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value: boolean) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})

const isOpen = ref(false)

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Events', path: '/events' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

const route = useRoute()

const activeIndex = computed(() => {
  if (!route || !route.path) {
    return -1
  }
  return navigationItems.findIndex(item => item.path === route.path)
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
  document.body.style.overflow = isOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

// Close menu on route change
watch(
  () => route.path,
  () => {
    if (isOpen.value) {
      closeMenu()
    }
  }
)

// Header visibility on scroll
const isHeaderVisible = ref(true)
const lastScrollPosition = ref(0)
const scrollThreshold = 50

const handleScroll = () => {
  if (process.client) {
    const currentScrollPosition = window.scrollY

    if (currentScrollPosition < 0) {
      return
    }

    isHeaderVisible.value =
      currentScrollPosition < lastScrollPosition.value ||
      currentScrollPosition < scrollThreshold ||
      isOpen.value

    lastScrollPosition.value = currentScrollPosition
  }
}

onMounted(() => {
  if (process.client) {
    window.addEventListener('scroll', handleScroll)
    lastScrollPosition.value = window.scrollY
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener('keydown', handleEscape)
    document.removeEventListener('keydown', handleFocusTrap)
    document.body.style.overflow = ''
  }
})

const callLink = 'tel:+19054305699'

// Focus trap for mobile menu
const mobileMenuRef = ref<HTMLElement | null>(null)

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeMenu()
  }
}

const handleFocusTrap = (e: KeyboardEvent) => {
  if (e.key !== 'Tab' || !isOpen.value || !mobileMenuRef.value) return

  const focusableElements = mobileMenuRef.value.querySelectorAll<HTMLElement>(
    'a[href], button, [tabindex]:not([tabindex="-1"])'
  )
  if (focusableElements.length === 0) return

  const first = focusableElements[0]
  const last = focusableElements[focusableElements.length - 1]

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault()
      last.focus()
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

watch(isOpen, async (open) => {
  if (open) {
    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleFocusTrap)
    await nextTick()
    mobileMenuRef.value?.querySelector<HTMLElement>('a[href]')?.focus()
  } else {
    document.removeEventListener('keydown', handleEscape)
    document.removeEventListener('keydown', handleFocusTrap)
  }
})
</script>

<template>
  <!-- Skip to main content link -->
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-yellow-500 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
  >
    Skip to main content
  </a>

  <!-- Header Spacer -->
  <div class="h-20" />
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
      {
        '-translate-y-full': !isHeaderVisible && !isOpen,
        'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50': true
      }
    ]"
  >
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo and Brand Name Left -->
        <div class="flex items-center space-x-2">
          <NuxtLink to="/" class="flex items-center space-x-2 group">
            <span
              class="text-base sm:text-lg md:text-xl lg:text-xl xl:text-3xl font-extrabold text-yellow-600 dark:text-yellow-400 tracking-widest transition-all duration-300 group-hover:scale-105 font-serif"
              style="letter-spacing: 0.08em"
              >The Pearson Pub</span
            >
          </NuxtLink>
        </div>
        <!-- Desktop Navigation Center -->
        <div class="hidden md:flex items-center space-x-8 flex-1 justify-center">
          <NuxtLink
            v-for="(item, index) in navigationItems"
            :key="index"
            :to="item.path"
            class="relative px-4 py-2 text-sm lg:text-base font-semibold transition-all duration-300 group"
            :class="[
              index === activeIndex
                ? 'text-yellow-600 dark:text-yellow-400'
                : 'text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400'
            ]"
          >
            {{ item.name }}
            <div
              :class="[
                'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 transition-all duration-300 transform origin-center',
                index === activeIndex
                  ? 'w-full scale-x-100'
                  : 'w-0 scale-x-0 group-hover:w-full group-hover:scale-x-100'
              ]"
            />
            <!-- Hover effect background -->
            <div
              class="absolute inset-0 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
            />
          </NuxtLink>
        </div>
        <!-- Dark Mode Toggle Right -->
        <div class="hidden md:flex items-center space-x-4">
          <button
            class="p-3 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110 transition-all duration-300 hover:shadow-lg"
            aria-label="Toggle dark mode"
            @click="isDark = !isDark"
          >
            <UIcon :name="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'" class="w-5 h-5" />
          </button>
        </div>
        <div class="md:hidden flex items-center space-x-4">
          <!-- Dark Mode Toggle Mobile -->
          <button
            class="p-3 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110 transition-all duration-300"
            aria-label="Toggle dark mode"
            @click="isDark = !isDark"
          >
            <UIcon :name="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'" class="w-5 h-5" />
          </button>

          <!-- Mobile Menu Button -->
          <button
            class="p-3 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110 transition-all duration-300"
            :aria-expanded="isOpen"
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            @click="toggleMenu"
          >
            <UIcon
              :name="isOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
              class="w-6 h-6 transition-transform duration-300"
              :class="{ 'rotate-180': isOpen }"
            />
          </button>
        </div>
      </div>
      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-8 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-8 scale-95"
      >
        <div
          v-if="isOpen"
          id="mobile-menu"
          ref="mobileMenuRef"
          role="dialog"
          aria-label="Navigation menu"
          class="md:hidden fixed top-20 left-1/2 transform -translate-x-1/2 w-[75%] bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 z-50"
        >
          <!-- Mobile Menu Logo -->
          <div
            class="flex items-center justify-center py-4 border-b border-gray-200 dark:border-gray-700"
          >
            <NuxtLink to="/" class="flex items-center space-x-2 group" @click="closeMenu">
              <span
                class="text-lg font-extrabold text-yellow-600 dark:text-yellow-400 tracking-widest transition-all duration-300 group-hover:scale-105 font-serif"
                style="letter-spacing: 0.08em"
              >
                The Pearson Pub
              </span>
            </NuxtLink>
          </div>

          <!-- Menu Items -->
          <div class="px-4 pt-4 pb-6 space-y-2">
            <NuxtLink
              v-for="(item, index) in navigationItems"
              :key="index"
              :to="item.path"
              class="block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105 text-center"
              :class="[
                index === activeIndex
                  ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
              ]"
              @click="closeMenu"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </transition>
    </nav>
  </header>

  <a
    :href="callLink"
    class="fixed bottom-5 right-5 z-50 bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-colors duration-200"
    aria-label="Call Us"
  >
    <UIcon name="i-heroicons-phone" class="w-5 h-5" />
  </a>
</template>

<style scoped>
.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>
