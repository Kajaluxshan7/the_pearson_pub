<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Advanced 3D Loading Screen -->
    <!-- Menu Hero Section -->
    <section
      class="hero-section relative py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">

      <div class="absolute inset-0">
        <NuxtImg src="/images/food/foods.jpg" alt="Our Menu" class="w-full h-full object-cover opacity-30" format="webp"
          quality="80" />
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
      </div>

      <div class="hero-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div class="inline-block mb-4">
          <span class="text-yellow-400 font-semibold text-sm lg:text-lg tracking-wide uppercase">Culinary
            Excellence</span>
          <div class="w-12 lg:w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          style="font-family: 'Cinzel', 'Georgia', serif">
          Our <span class="text-yellow-400">Menu</span>
        </h1>
        <p class="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
          Discover our delicious selection of
          <span class="text-yellow-300">pub favorites</span> and
          <span class="text-yellow-300">craft beverages</span>
        </p>
      </div>
    </section>
    <!-- Enhanced Filters and Search Section -->
    <section
      class="filter-section py-6 lg:py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col space-y-4">
          <!-- Top Row: Search and View Toggle -->
          <div class="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <!-- Search Bar -->
            <div class="flex-1 max-w-md">
              <div class="relative">
                <UIcon name="i-heroicons-magnifying-glass"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input v-model="searchQuery" type="text" placeholder="Search menu items..."
                  class="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
                <button v-if="searchQuery" @click="searchQuery = ''"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Sort Options -->
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600 dark:text-gray-300 hidden lg:block">Sort by:</span>
              <select v-model="sortBy"
                class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="featured">Featured First</option>
              </select>
            </div>
          </div>

          <!-- Category Navigation -->
          <div class="flex flex-col gap-4">
            <!-- Categories - Now displays all categories in a responsive grid -->
            <div class="flex flex-wrap items-center gap-2 lg:gap-3">
              <button v-for="category in primaryCategories" :key="category.id" :class="[
                'flex-shrink-0 px-3 lg:px-4 py-2 rounded-full font-semibold text-sm lg:text-base transition-all duration-300 min-w-fit',
                activeCategory === category.id
                  ? 'bg-yellow-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-yellow-100 dark:hover:bg-yellow-900 hover:shadow-lg',
              ]" @click="
                  () => {
                    activeCategory = category.id;
                    showDropdown = false;
                    // Reset pagination for the new category
                    categoryPages.value[category.id] = 1;
                  }
                ">
                {{ category.name }}
              </button>
            </div>
          </div>

          <!-- Active Filters Display -->
          <div v-if="hasActiveFilters" class="flex flex-wrap gap-2">
            <span class="text-sm text-gray-600 dark:text-gray-300 mr-2">Active filters:</span>
            <UBadge v-if="searchQuery" color="blue" variant="subtle" class="cursor-pointer" @click="searchQuery = ''">
              "{{ searchQuery }}"
              <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
            </UBadge>
            <UButton color="gray" variant="ghost" size="sm" @click="clearAllFilters">
              Clear All
            </UButton>
          </div>
        </div>
      </div>
    </section>
    <!-- Menu Items Section -->
    <section class="py-10 lg:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State with Skeleton Cards -->
        <div v-if="backendLoading">
          <div v-for="category in ['Starters', 'Mains', 'Desserts']" :key="`skeleton-category-${category}`"
            class="mb-16">
            <!-- Skeleton Category Header -->
            <div class="text-center mb-12">
              <div class="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto mb-4"></div>
              <div class="w-24 h-1 bg-gray-200 dark:bg-gray-700 mx-auto mb-4"></div>
              <div class="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto mb-2"></div>
              <div class="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
            </div>

            <!-- Skeleton Cards Grid -->
            <div :class="gridClasses">
              <SkeletonCard v-for="i in 6" :key="`skeleton-${category}-${i}`" type="menu" :delay="i * 0.1" />
            </div>
          </div>
        </div>

        <!-- Actual Content -->
        <div v-else-if="filteredCategories.length > 0">
          <div v-for="category in filteredCategories" :key="category.id" class="mb-16">
            <!-- Category Header -->
            <div class="text-center mb-12">
              <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                style="font-family: 'Cinzel', 'Georgia', serif">
                {{ category.name }}
              </h2>
              <div class="w-24 h-1 bg-yellow-500 mx-auto mb-4"></div>
              <p v-if="category.description" class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {{ category.description }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {{ paginatedItems(category).totalItems }} item{{
                  paginatedItems(category).totalItems !== 1 ? "s" : ""
                }}
              </p>
            </div>

            <!-- Grid View -->
            <div v-if="viewMode === 'grid'" :class="gridClasses">
              <div v-for="(item, index) in paginatedItems(category).items" :key="item.id"
                class="menu-card menu-card-3d transition-all duration-500 transform hover:scale-105 cursor-pointer"
                :style="{ animationDelay: `${index * 100}ms` }" @click="() => showItemDetails(item)">
                <!-- Square Menu Item Card -->
                <UCard
                  class="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-0 h-full flex flex-col"
                  :class="{ 'opacity-50 pointer-events-none': !item.isAvailable }">
                  <template #header>
                    <div class="relative overflow-hidden aspect-square">
                      <NuxtImg :src="getImageUrl(item)"
                        class="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                        :alt="item.name" format="webp" quality="75" loading="lazy" :placeholder="[400, 400, 75]" />

                      <!-- Badges -->
                      <div class="absolute top-3 left-3 flex flex-col gap-2">
                        <UBadge v-if="item.isFeatured" color="yellow" variant="solid" class="font-semibold text-xs">
                          Featured
                        </UBadge>
                        <UBadge v-if="item.isPearsonFamous" color="red" variant="solid" class="font-semibold text-xs">
                          Pub Famous
                        </UBadge>
                        <UBadge v-if="!item.isAvailable" color="gray" variant="solid" class="font-semibold text-xs">
                          Sold Out
                        </UBadge>
                      </div>
                      <!-- Dietary Icons -->
                      <div class="absolute bottom-3 left-3 flex gap-1">
                        <UBadge v-if="item.dietaryInfo?.isVegetarian" color="green" variant="subtle"
                          class="text-xs flex items-center">
                          <UIcon name="i-heroicons-sparkles" class="w-3 h-3 mr-1" />
                          V
                        </UBadge>
                        <UBadge v-if="item.dietaryInfo?.isVegan" color="emerald" variant="subtle" class="text-xs">
                          VG
                        </UBadge>
                        <UBadge v-if="item.dietaryInfo?.isGlutenFree" color="blue" variant="subtle" class="text-xs">
                          GF
                        </UBadge>
                      </div>

                      <!-- Availability Status -->
                      <div class="absolute top-3 right-3">
                        <UBadge :color="item.isAvailable ? 'green' : 'red'" variant="solid" class="text-xs">
                          {{ item.isAvailable ? 'Available' : 'Not Available' }}
                        </UBadge>
                      </div>

                      <!-- Price Badge -->
                      <div class="absolute bottom-3 right-3">
                        <UBadge color="yellow" variant="solid" class="font-bold text-sm">
                          ${{ item.price }}
                        </UBadge>
                      </div>
                    </div>
                  </template>

                  <div class="p-4 flex flex-col flex-grow">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 flex-grow">
                      {{ item.name }}
                    </h3>

                    <UButton color="yellow" variant="outline" size="sm" class="w-full mt-auto"
                      :disabled="!item.isAvailable">
                      View Details
                    </UButton>
                  </div>
                </UCard>
              </div>
            </div>

            <!-- List View -->
            <div v-else class="space-y-4">
              <div v-for="(item, index) in paginatedItems(category).items" :key="item.id"
                class="menu-card menu-card-3d transition-all duration-500 cursor-pointer"
                :style="{ animationDelay: `${index * 100}ms` }" @click="() => showItemDetails(item)">
                <UCard class="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-0"
                  :class="{ 'opacity-50 pointer-events-none': !item.isAvailable }">
                  <div class="flex flex-col sm:flex-row">
                    <!-- Image -->
                    <div class="sm:w-48 relative overflow-hidden">
                      <NuxtImg :src="getImageUrl(item)"
                        class="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                        :alt="item.name" format="webp" quality="75" loading="lazy" :placeholder="[400, 200, 75]" />

                      <!-- Badges -->
                      <div class="absolute top-3 left-3 flex flex-col gap-2">
                        <UBadge v-if="item.isFeatured" color="yellow" variant="solid" class="font-semibold text-xs">
                          Featured
                        </UBadge>
                        <UBadge v-if="!item.isAvailable" color="gray" variant="solid" class="font-semibold text-xs">
                          Sold Out
                        </UBadge>
                      </div>
                    </div>

                    <!-- Content -->
                    <div class="flex-1 p-6">
                      <div class="flex justify-between items-start mb-4">
                        <div class="flex-1">
                          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ item.name }}
                          </h3>
                          <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            {{ item.description }}
                          </p>

                          <!-- Dietary Info -->
                          <div class="flex flex-wrap gap-2 mb-4">
                            <UBadge v-if="item.dietaryInfo?.isVegetarian" color="green" variant="subtle"
                              class="text-xs flex items-center">
                              <UIcon name="i-heroicons-sparkles" class="w-3 h-3 mr-1" />
                              Vegetarian
                            </UBadge>
                            <UBadge v-if="item.dietaryInfo?.isVegan" color="emerald" variant="subtle" class="text-xs">
                              Vegan
                            </UBadge>
                            <UBadge v-if="item.dietaryInfo?.isGlutenFree" color="blue" variant="subtle" class="text-xs">
                              Gluten Free
                            </UBadge>
                          </div>

                          <!-- Availability Status -->
                          <div class="mb-4">
                            <UBadge :color="item.isAvailable ? 'green' : 'red'" variant="solid" class="text-sm">
                              {{ item.isAvailable ? 'Available' : 'Not Available' }}
                            </UBadge>
                          </div>
                        </div>

                        <!-- Price and Action -->
                        <div class="text-right ml-4">
                          <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
                            ${{ item.price }}
                          </p>
                          <UButton color="yellow" variant="solid" size="md" :disabled="!item.isAvailable">
                            View Details
                          </UButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </UCard>
              </div>
            </div>
            <!-- Pagination -->
            <div v-if="category.items?.length > itemsPerPage" class="flex flex-col items-center mt-8">
              

              
              <!-- Fallback Manual Pagination Controls -->
              <div class="flex items-center justify-center mt-4 space-x-2">
                <button 
                  @click="updateCategoryPage(category.id, paginatedItems(category).currentPage - 1)"
                  :disabled="!paginatedItems(category).hasPrevPage"
                  class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <span class="text-gray-800 dark:text-gray-200">
                  Page {{ paginatedItems(category).currentPage }} of {{ paginatedItems(category).totalPages }}
                </span>
                <button 
                  @click="updateCategoryPage(category.id, paginatedItems(category).currentPage + 1)"
                  :disabled="!paginatedItems(category).hasNextPage"
                  class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed">
                  Next
                </button>
              </div>
            </div>

            <!-- Pagination navigation now handles this instead of Load More button -->
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-16">
          <UIcon name="i-heroicons-face-frown" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No menu items found
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
          <UButton color="yellow" variant="outline" @click="clearAllFilters">
            Clear All Filters
          </UButton>
        </div>
      </div>
    </section>

    <!-- Enhanced Item Details Modal -->
    <UModal v-model="isModalOpen" class="z-50">
      <div class="max-w-4xl w-full mx-auto">
        <UCard v-if="selectedItem">
          <template #header>
            <div class="relative overflow-hidden rounded-t-lg">
              <template v-if="
                selectedItem &&
                selectedItem.images &&
                selectedItem.images.length > 1
              ">
                <div class="relative w-full h-48 lg:h-64">
                  <NuxtImg v-for="(img, idx) in selectedItem.images" :key="img" v-show="carouselIndex === idx"
                    :src="img"
                    class="w-full h-48 lg:h-64 object-cover absolute top-0 left-0 transition-opacity duration-500"
                    :alt="selectedItem.name + ' image ' + (idx + 1)" format="webp" quality="80" loading="lazy"
                    :placeholder="[400, 300, 75]" />

                  <!-- Carousel Controls -->
                  <button @click="previousImage"
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all">
                    <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
                  </button>
                  <button @click="nextImage"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all">
                    <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
                  </button>

                  <!-- Carousel Indicators -->
                  <div class="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <span v-for="(img, idx) in selectedItem.images" :key="idx"
                      class="w-2 h-2 rounded-full cursor-pointer transition-all" :class="carouselIndex === idx
                          ? 'bg-yellow-500'
                          : 'bg-gray-300 hover:bg-gray-400'
                        " @click="carouselIndex = idx" />
                  </div>
                </div>
              </template>
              <template v-else>
                <NuxtImg v-if="selectedItem?.image" :src="selectedItem?.image" class="w-full h-48 lg:h-64 object-cover"
                  :alt="selectedItem?.name" format="webp" quality="80" loading="lazy" :placeholder="[400, 300, 75]" />
                <div v-else
                  class="w-full h-48 lg:h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400">
                  <UIcon name="i-heroicons-photo" class="w-16 h-16" />
                </div>
              </template>
            </div>
          </template>

          <div class="p-6 lg:p-8 space-y-6">
            <!-- Item Header -->
            <div class="flex flex-col lg:flex-row justify-between lg:items-start gap-4">
              <div class="flex-1">
                <div class="flex items-start justify-between mb-4">
                  <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    {{ selectedItem.name }}
                  </h2>
                </div>

                <!-- Badges -->
                <div class="flex flex-wrap gap-2 mb-4">
                  <UBadge v-if="selectedItem.isFeatured" color="yellow" variant="solid">
                    Featured
                  </UBadge>
                  <UBadge v-if="selectedItem.isPearsonFamous" color="red" variant="solid">
                    Pub Famous
                  </UBadge>
                  <UBadge :color="selectedItem.isAvailable ? 'green' : 'red'" variant="subtle">
                    {{ selectedItem.isAvailable ? "Available" : "Not Available" }}
                  </UBadge>
                </div>
              </div>

              <!-- Price and View Details -->
              <div class="lg:text-right">
                <div class="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
                  ${{ selectedItem.price }}
                </div>
                <UButton color="yellow" variant="solid" size="lg" :disabled="!selectedItem.isAvailable"
                  class="w-full lg:w-auto" @click="navigateToItemDetails">
                  View Full Details
                </UButton>
              </div>
            </div>

            <!-- Description -->
            <div>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ selectedItem.description }}
              </p>
            </div>
          </div>

          <template #footer>
            <div class="flex justify-end gap-3">
              <UButton color="gray" variant="outline" @click="closeModal">
                Close
              </UButton>
              <UButton color="yellow" variant="solid" :disabled="!selectedItem.isAvailable" @click="navigateToItemDetails">
                View Full Details
              </UButton>
            </div>
          </template>
        </UCard>
      </div>
    </UModal>

    <!-- Dietary Information Section -->
    <section class="py-16 bg-white dark:bg-gray-800 relative overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-10 left-10 w-32 h-32 lg:w-40 lg:h-40 rounded-full border-2 border-yellow-500"></div>
        <div class="absolute bottom-10 right-10 w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-yellow-300"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 class="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          Dietary Information
        </h2>
        <div class="w-16 h-1 bg-yellow-500 mx-auto mb-8"></div>
        <p class="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          We cater to various dietary requirements. Please ask our staff for
          detailed allergen information.
        </p>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div v-for="(info, index) in dietaryInfo" :key="index"
            class="flex flex-col items-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <UIcon :name="info.icon" class="w-8 h-8 lg:w-10 lg:h-10 text-yellow-600 dark:text-yellow-400 mb-3" />
            <span class="text-sm lg:text-base font-medium text-gray-800 dark:text-gray-200 text-center">{{ info.label
              }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useLandingPageData } from "~/composables/useLandingPageData";
import { usePerformance } from "~/composables/usePerformance";
import SkeletonCard from "~/components/loading/SkeletonCard.vue";
import type { MenuItem, MenuCategory } from "~/types/menu";

// SSR/SSG: useAsyncData for menu data
const { data: menuData } = await useAsyncData('menu-data', async () => {
  const { fetchMenuData } = useLandingPageData();
  await fetchMenuData();
  return true;
});

// Composables
const {
  menuData: backendMenuData,
  menuCategories,
  isLoading: backendLoading,
  error: backendError,
  fetchMenuData,
} = useLandingPageData();

// Performance monitoring
const {
  preloadImage,
  isVisible,
  metrics
} = usePerformance();

// Reactive data
const activeCategory = ref("");
const searchQuery = ref("");
const sortBy = ref("name");
const showDropdown = ref(false);
const selectedPriceRange = ref("all");
// Initialize category pages with default page 1
const categoryPages = ref<Record<string, number>>({});
const viewMode = ref<"grid" | "list">("grid");
const dietaryFilters = ref({
  vegetarian: false,
  vegan: false,
  glutenFree: false,
});

// Pagination settings
const itemsPerPage = 8; // Set fixed items per page to 8


// Modal
// Modal
const isModalOpen = ref(false);
const selectedItem = ref<MenuItem | null>(null);
const carouselIndex = ref(0);
let carouselInterval: NodeJS.Timeout | null = null;

// Computed properties
const categories = computed<MenuCategory[]>(() =>
  Array.isArray(menuCategories.value) ? menuCategories.value : []
);

// Debug watch for categories
watch(categories, (newCategories) => {
  console.log('📊 Categories data changed:', newCategories.length);
  newCategories.forEach((cat, index) => {
    console.log(`  Category ${index}: ${cat.name}, Items: ${cat.items?.length || 0}`);
  });
}, { immediate: true });

const primaryCategories = computed(() => {
  // Show all categories as primary, remove the arbitrary 4-category limit
  return categories.value;
});

const secondaryCategories = computed(() => {
  // No secondary categories needed since we show all categories directly
  return [];
});

const activeDietaryFilters = computed(() => {
  const filters: Record<string, boolean> = {};
  Object.entries(dietaryFilters.value).forEach(([key, value]) => {
    if (value) filters[key] = value;
  });
  return filters;
});

const hasActiveFilters = computed(() => {
  return (
    searchQuery.value ||
    selectedPriceRange.value !== "all" ||
    Object.values(dietaryFilters.value).some((filter) => filter)
  );
});

const filteredCategories = computed(() => {
  const category = categories.value.find(
    (cat) => cat.id === activeCategory.value
  );
  if (!category) return [];

  let items = category.items;

  // Only filter by visibility - show all items regardless of availability
  // Availability will be shown as a status indicator in the UI
  items = items.filter((item) => item.isVisible === true);

  // Apply search filter (name only)
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter(
      (item) => item.name.toLowerCase().includes(query)
    );
  }

  // Apply price filter
  if (selectedPriceRange.value !== "all") {
    items = items.filter((item) => {
      switch (selectedPriceRange.value) {
        case "under-15":
          return item.price < 15;
        case "15-25":
          return item.price >= 15 && item.price <= 25;
        case "over-25":
          return item.price > 25;
        default:
          return true;
      }
    });
  }

  // Apply dietary filters
  if (dietaryFilters.value.vegetarian) {
    items = items.filter((item) => item.dietaryInfo?.isVegetarian);
  }
  if (dietaryFilters.value.vegan) {
    items = items.filter((item) => item.dietaryInfo?.isVegan);
  }
  if (dietaryFilters.value.glutenFree) {
    items = items.filter((item) => item.dietaryInfo?.isGlutenFree);
  }

  // Apply sorting
  switch (sortBy.value) {
    case "price-low":
      items = items.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      items = items.sort((a, b) => b.price - a.price);
      break;
    case "featured":
      items = items.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return a.name.localeCompare(b.name);
      });
      break;
    default:
      items = items.sort((a, b) => a.name.localeCompare(b.name));
  }

  return [{ ...category, items }];
});

// Methods
const getImageUrl = (item: MenuItem) => {
  // Return item image if it exists, otherwise return a fallback image based on category
  if (item.image) {
    return item.image;
  }

  // Category-based fallback images
  const fallbackImages = {
    "daily-specials":
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=600&q=80",
    "all-day-menu":
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80",
    appetizers:
      "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80",
    salads:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    burgers:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    mains:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    desserts:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80",
    beverages:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80",
    default:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80",
  };

  return fallbackImages[item.category as keyof typeof fallbackImages] || fallbackImages.default;
};

const showItemDetails = (item: MenuItem) => {
  selectedItem.value = item;
  isModalOpen.value = true;
  carouselIndex.value = 0;
};

const navigateToItemDetails = () => {
  if (selectedItem.value) {
    navigateTo(`/menu/${selectedItem.value.id}`);
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedItem.value = null;
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
};

const nextImage = () => {
  if (selectedItem.value?.images && selectedItem.value.images.length > 1) {
    carouselIndex.value =
      (carouselIndex.value + 1) % selectedItem.value.images.length;
  }
};

const previousImage = () => {
  if (selectedItem.value?.images && selectedItem.value.images.length > 1) {
    carouselIndex.value =
      carouselIndex.value === 0
        ? selectedItem.value.images.length - 1
        : carouselIndex.value - 1;
  }
};

const paginatedItems = (category: MenuCategory) => {
  // The category passed here is already the filtered category from filteredCategories
  // So we can directly use its items without searching for it again
  const filteredItems = category.items;
  
  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage)); // Ensure at least 1 page
  
  // Get current page for this specific category, default to 1
  const currentPage = categoryPages.value[category.id] || 1;
  
  // Ensure current page is within valid range
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  if (validCurrentPage !== currentPage) {
    // Correct the current page if needed
    categoryPages.value[category.id] = validCurrentPage;
  }
  
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = filteredItems.slice(startIndex, endIndex);

  // Debug logging for pagination issues
  console.log(`Pagination Debug - ${category.name}:`, {
    categoryId: category.id,
    totalItems,
    itemsPerPage,
    totalPages,
    currentPage: validCurrentPage,
    shouldShowPagination: totalPages > 1,
    startIndex,
    endIndex,
    itemsOnThisPage: items.length,
    hasNextPage: validCurrentPage < totalPages,
    hasPrevPage: validCurrentPage > 1
  });

  return {
    items,
    totalItems,
    totalPages,
    currentPage: validCurrentPage,
    hasNextPage: validCurrentPage < totalPages,
    hasPrevPage: validCurrentPage > 1
  };
};

// Function to handle page change for a specific category
const updateCategoryPage = (categoryId: string, page: number) => {
  console.log(`Updating page for category ${categoryId} to page ${page}`);
  console.log('Before update:', JSON.stringify(categoryPages.value));
  
  // Find the category to determine max pages
  const category = categories.value.find(cat => cat.id === categoryId);
  let maxPage = 1;
  
  if (category) {
    const totalItems = category.items.length;
    maxPage = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }
  
  // Ensure page is within valid range
  const validPage = Math.min(Math.max(1, page), maxPage);
  
  // Update the page
  categoryPages.value = {
    ...categoryPages.value,
    [categoryId]: validPage
  };
  
  console.log('After update:', JSON.stringify(categoryPages.value));
  console.log(`Page set to ${validPage} (requested: ${page}, max: ${maxPage})`);
};

const gridClasses = computed(() => {
  return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6";
});

const getPriceRangeLabel = (range: string) => {
  switch (range) {
    case "under-15":
      return "Under $15";
    case "15-25":
      return "$15 - $25";
    case "over-25":
      return "Over $25";
    default:
      return "All Prices";
  }
};

const clearAllFilters = () => {
  searchQuery.value = "";
  selectedPriceRange.value = "all";
  dietaryFilters.value = {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  };
};

// No longer needed as pagination is handled by the UPagination component

// Dietary info
const dietaryInfo = [
  { icon: "i-heroicons-check-badge", label: "Vegetarian Options" },
  { icon: "i-heroicons-shield-check", label: "Gluten-Free Options" },
  { icon: "i-heroicons-sparkles", label: "Vegan Options" },
  {
    icon: "i-heroicons-information-circle",
    label: "Allergen Information Available",
  },
];

// Auto-close dropdowns when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as Element;
  if (!target.closest(".relative") && !target.closest(".more-dropdown")) {
    showDropdown.value = false;
  }
};

// Modal carousel auto-play
watch(isModalOpen, (isOpen) => {
  if (
    isOpen &&
    selectedItem.value?.images &&
    selectedItem.value.images.length > 1
  ) {
    carouselInterval = setInterval(nextImage, 4000);
  } else if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
});

// Reset pagination when category, search, or filters change
watch([activeCategory, searchQuery, selectedPriceRange, dietaryFilters], () => {
  // Reset all category pages to 1 when filters change
  categoryPages.value = {};
}, { deep: true });

onMounted(async () => {
  // Initialize menu data
  try {
    if (!backendMenuData.value) {
      await fetchMenuData();
    }
  } catch (error) {
    console.error('Failed to load menu data:', error);
  }

  // Set default category
  const firstCategory = categories.value[0];
  if (firstCategory) {
    activeCategory.value = firstCategory.id;
    
    // Initialize pagination for all categories
    categories.value.forEach(category => {
      categoryPages.value[category.id] = 1;
    });
  }

  // Add click outside listener
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener('scroll', updateDropdownPosition);
  window.removeEventListener('resize', updateDropdownPosition);
  if (carouselInterval) {
    clearInterval(carouselInterval);
  }
});

// Page meta
useHead({
  title: "Menu - The Pearson Pub",
  meta: [
    {
      name: "description",
      content:
        "Explore our delicious menu of pub favorites and craft beverages at The Pearson Pub. Featuring vegetarian, vegan, and gluten-free options.",
    },
  ],
});

const moreButton = ref<HTMLElement | null>(null);
const moreDropdown = ref<HTMLElement | null>(null);
const moreDropdownStyle = ref({});

// Update dropdown position when dropdown visibility changes or on scroll
const updateDropdownPosition = () => {
  if (showDropdown.value && moreButton.value) {
    const rect = moreButton.value.getBoundingClientRect();
    const dropdownWidth = 192; // w-48 = 12rem = 192px
    const minWidth = rect.width;
    let left = rect.left;
    
    // Prevent overflow on the right
    if (left + dropdownWidth > window.innerWidth) {
      left = window.innerWidth - dropdownWidth - 8; // 8px margin
    }
    
    moreDropdownStyle.value = {
      top: `${rect.bottom + 4}px`, // 4px offset from the bottom of the button
      left: `${left}px`,
      minWidth: `${minWidth}px`,
      maxHeight: '300px',
      overflowY: 'auto'
    };
  }
};

// Update position when dropdown visibility changes
watch(showDropdown, (val) => {
  if (val) {
    nextTick(() => {
      updateDropdownPosition();
    });
  }
});

// Update position on scroll to follow the More button
onMounted(() => {
  window.addEventListener('scroll', () => {
    if (showDropdown.value) {
      updateDropdownPosition();
    }
  });
  window.addEventListener('resize', () => {
    if (showDropdown.value) {
      updateDropdownPosition();
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateDropdownPosition);
  window.removeEventListener('resize', updateDropdownPosition);
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Enhanced 3D Card Effects */
.menu-card-3d {
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-card-3d:hover {
  transform: translateY(-10px) rotateX(5deg) rotateY(5deg) scale(1.02);
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.menu-card-3d::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
      rgba(255, 215, 0, 0.1) 0%,
      transparent 50%,
      rgba(255, 215, 0, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: inherit;
}

.menu-card-3d:hover::before {
  opacity: 1;
}

/* Floating animation for cards */
@keyframes cardFloat {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-5px);
  }
}

.menu-card-3d.floating {
  animation: cardFloat 3s ease-in-out infinite;
}

/* Loading state animation */
.menu-card-3d.loading {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
  animation: cardAppear 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes cardAppear {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Shimmer effect for loading */
.card-shimmer {
  position: relative;
  overflow: hidden;
}

.card-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

/* Enhanced modal animations */
.modal-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(1.1) translateY(-20px);
}
</style>
