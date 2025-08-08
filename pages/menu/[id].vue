<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { itemsApi } from "~/composables/useApi";

interface MenuItemType {
  id: string | number;
  name: string;
  description?: string;
  image?: string;
  images?: string[];
  category?: { id: string | number; name: string };
  dietaryInfo?: Record<string, any>;
  [key: string]: any;
}

const loading = ref(true);
const error = ref<string | null>(null);
const menuItem = ref<MenuItemType | null>(null);
const allMenuItems = ref<MenuItemType[]>([]);
const currentImageIndex = ref(0);
const route = useRoute();
const router = useRouter();

// Navigation between items
const currentItemIndex = computed(() => {
  if (!menuItem.value || !allMenuItems.value.length) return -1;
  return allMenuItems.value.findIndex((item) => menuItem.value && item.id === menuItem.value.id);
});

const previousItem = computed(() => {
  const index = currentItemIndex.value;
  if (index <= 0) return null;
  return allMenuItems.value[index - 1];
});

const nextItem = computed(() => {
  const index = currentItemIndex.value;
  if (index === -1 || index >= allMenuItems.value.length - 1) return null;
  return allMenuItems.value[index + 1];
});

// Image carousel
const previousImage = () => {
  if (!menuItem.value?.images) return;
  currentImageIndex.value =
    currentImageIndex.value === 0
      ? menuItem.value.images.length - 1
      : currentImageIndex.value - 1;
};

const nextImage = () => {
  if (!menuItem.value?.images) return;
  currentImageIndex.value =
    (currentImageIndex.value + 1) % menuItem.value.images.length;
};


// SEO
useHead({
  title: () =>
    menuItem.value
      ? `${menuItem.value.name} - Menu - The Pearson Pub`
      : "Menu Item - The Pearson Pub",
  meta: [
    {
      name: "description",
      content: () =>
        menuItem.value?.description || "Menu item at The Pearson Pub",
    },
    {
      property: "og:title",
      content: () =>
        menuItem.value
          ? `${menuItem.value.name} - The Pearson Pub`
          : "Menu Item - The Pearson Pub",
    },
    {
      property: "og:description",
      content: () =>
        menuItem.value?.description || "Menu item at The Pearson Pub",
    },
    {
      property: "og:image",
      content: () => menuItem.value?.image || "/images/food/foods.jpg",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
        <p class="text-gray-600 dark:text-gray-400">Loading menu item...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center space-y-4 max-w-md mx-auto p-6">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-16 h-16 text-red-500 mx-auto" />
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Item Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400">{{ error }}</p>
        <NuxtLink to="/menu">
          <UButton color="yellow" variant="solid" class="mt-4">
            <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
            Back to Menu
          </UButton>
        </NuxtLink>
      </div>
    </div>

    <!-- Menu Item Content -->
    <div v-if="menuItem" class="relative z-10">
      <!-- Place your menu item content here -->
    </div>
  </div>
</template>
