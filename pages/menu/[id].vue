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

// Utility functions
const getMenuItemImage = (item: any) => {
  // If item has images array, use the first one
  if (item.images && item.images.length > 0) {
    return item.images[0];
  }
  // If item has a single image, use it
  if (item.image) {
    return item.image;
  }
  // Category-based fallback images
  const fallbackImages = {
    "daily-specials": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=600&q=80",
    "all-day-menu": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80",
    "starters": "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80",
    "salads": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    "burgers": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    "mains": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    "desserts": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80",
    "beverages": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80",
    "default": "/images/food/foods.jpg"
  };
  return fallbackImages[item.category as keyof typeof fallbackImages] || fallbackImages.default;
};

const navigateToItem = (itemId: string | number) => {
  router.push(`/menu/${itemId}`);
};

const shareItem = async () => {
  if (navigator.share && menuItem.value) {
    try {
      await navigator.share({
        title: menuItem.value.name,
        text: menuItem.value.description,
        url: window.location.href,
      });
    } catch (err) {
      await navigator.clipboard.writeText(window.location.href);
    }
  } else {
    await navigator.clipboard.writeText(window.location.href);
  }
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
