<template>
  <Teleport to="body">
    <div
      v-show="isVisible"
      class="fab-container fixed bottom-6 right-6 z-50"
      :class="{ 'fab-expanded': isExpanded }"
    >
      <!-- Main FAB Button -->
      <button
        ref="fabButton"
        class="fab-main group relative w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
        :class="{ 'rotate-45': isExpanded }"
        @click="toggleExpanded"
        :aria-label="isExpanded ? 'Close menu' : 'Open menu'"
        :aria-expanded="isExpanded"
      >
        <div
          class="fab-icon absolute inset-0 flex items-center justify-center transition-transform duration-300"
        >
          <UIcon
            :name="isExpanded ? 'i-heroicons-x-mark' : mainIcon"
            class="w-6 h-6 text-white transition-all duration-300"
          />
        </div>

        <!-- Ripple Effect -->
        <div
          class="fab-ripple absolute inset-0 rounded-full opacity-0 group-active:opacity-30 group-active:scale-110 bg-white transition-all duration-200"
        ></div>

        <!-- Floating Particles -->
        <div class="fab-particles absolute inset-0">
          <div
            v-for="i in 6"
            :key="`particle-${i}`"
            class="fab-particle absolute w-1 h-1 bg-yellow-200 rounded-full opacity-70"
            :style="{
              animationDelay: `${i * 0.2}s`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }"
          ></div>
        </div>
      </button>

      <!-- Action Buttons -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 scale-0"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-0"
      >
        <div
          v-show="isExpanded"
          class="fab-actions absolute bottom-20 right-0 flex flex-col-reverse gap-3"
        >
          <button
            v-for="(action, index) in actions"
            :key="action.id"
            class="fab-action group relative w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 border border-gray-200 dark:border-gray-600"
            :style="{ animationDelay: `${index * 50}ms` }"
            :title="action.label"
            :aria-label="action.label"
            @click="handleActionClick(action)"
          >
            <div class="absolute inset-0 flex items-center justify-center">
              <UIcon
                :name="action.icon"
                class="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-yellow-600 transition-colors duration-200"
              />
            </div>

            <!-- Tooltip -->
            <div
              class="fab-tooltip absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-gray-700 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
            >
              {{ action.label }}
              <div
                class="tooltip-arrow absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-gray-700"
              ></div>
            </div>
          </button>
        </div>
      </Transition>

      <!-- Background Overlay -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="isExpanded"
          class="fab-overlay fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          @click="closeExpanded"
        ></div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { use3DAnimations } from "~/composables/use3DAnimations";

export interface FABAction {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  disabled?: boolean;
}

interface Props {
  actions: FABAction[];
  mainIcon?: string;
  autoHide?: boolean;
  hideOnScroll?: boolean;
  scrollThreshold?: number;
}

const props = withDefaults(defineProps<Props>(), {
  mainIcon: "i-heroicons-plus",
  autoHide: true,
  hideOnScroll: true,
  scrollThreshold: 100,
});

const emit = defineEmits<{
  action: [actionId: string];
}>();

// Refs
const fabButton = ref<HTMLElement>();
const isExpanded = ref(false);
const isVisible = ref(true);
const lastScrollY = ref(0);

// 3D Animations
const { addFloatingElement, createGSAPAnimation } = use3DAnimations({
  enableParallax: true,
  intensity: 0.8,
});

// Methods
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;

  if (isExpanded.value) {
    // Add floating animation to main button
    nextTick(() => {
      if (fabButton.value) {
        createGSAPAnimation(fabButton.value, {
          animation: "pulse",
          duration: 0.6,
          repeat: -1,
          yoyo: true,
        });
      }
    });
  }
};

const closeExpanded = () => {
  isExpanded.value = false;
};

const handleActionClick = (action: FABAction) => {
  if (!action.disabled) {
    action.action();
    emit("action", action.id);
    closeExpanded();
  }
};

const handleScroll = () => {
  if (!props.hideOnScroll) return;

  const currentScrollY = window.scrollY;

  if (currentScrollY > props.scrollThreshold) {
    // Hide when scrolling down, show when scrolling up
    isVisible.value =
      currentScrollY < lastScrollY.value ||
      currentScrollY < props.scrollThreshold;
  } else {
    isVisible.value = true;
  }

  lastScrollY.value = currentScrollY;
};

// Keyboard handling
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isExpanded.value) {
    closeExpanded();
  }
};

// Lifecycle
onMounted(() => {
  // Add floating animation to the FAB
  nextTick(() => {
    if (fabButton.value) {
      addFloatingElement(fabButton.value, {
        amplitude: 5,
        speed: 0.02,
        direction: "y",
      });
    }
  });

  // Add event listeners
  if (props.hideOnScroll) {
    window.addEventListener("scroll", handleScroll, { passive: true });
  }
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("keydown", handleKeydown);
});

// Close on click outside
const handleClickOutside = (event: Event) => {
  if (isExpanded.value && !fabButton.value?.contains(event.target as Node)) {
    closeExpanded();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.fab-container {
  user-select: none;
}

.fab-main {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.fab-main:before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(45deg, #fbbf24, #f59e0b, #d97706);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: subtract;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fab-main:hover:before {
  opacity: 1;
}

.fab-expanded .fab-main {
  transform: rotate(45deg);
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.fab-action {
  animation: slideInUp 0.3s ease-out forwards;
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.fab-particle {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
    opacity: 1;
  }
}

.fab-tooltip {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.fab-ripple {
  border-radius: inherit;
}

/* Hover effects */
.fab-main:hover {
  box-shadow: 0 20px 40px rgba(251, 191, 36, 0.4);
}

.fab-action:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Dark mode adjustments */
.dark .fab-action {
  background: #374151;
  border-color: #4b5563;
}

.dark .fab-action:hover {
  background: #4b5563;
}

/* Responsive design */
@media (max-width: 640px) {
  .fab-container {
    bottom: 1rem;
    right: 1rem;
  }

  .fab-main {
    width: 3.5rem;
    height: 3.5rem;
  }

  .fab-action {
    width: 2.75rem;
    height: 2.75rem;
  }
}

/* Accessibility */
.fab-main:focus,
.fab-action:focus {
  outline: 2px solid #fbbf24;
  outline-offset: 2px;
}

/* Animation for entrance */
.fab-container {
  animation: fabEntrance 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

@keyframes fabEntrance {
  0% {
    opacity: 0;
    transform: scale(0) rotate(180deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
</style>
