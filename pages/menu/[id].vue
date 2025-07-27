<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center space-y-4">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"
        ></div>
        <p class="text-gray-600 dark:text-gray-400">Loading menu item...</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-screen"
    >
      <div class="text-center space-y-4 max-w-md mx-auto p-6">
        <UIcon
          name="i-heroicons-exclamation-triangle"
          class="w-16 h-16 text-red-500 mx-auto"
        />
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Item Not Found
        </h2>
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
    <div v-else-if="menuItem" class="relative z-10">
      <div class="container mx-auto px-4 py-8 lg:py-12">
        <!-- Breadcrumb Navigation -->
        <nav class="mb-6 text-sm">
          <ol
            class="flex items-center space-x-2 text-gray-500 dark:text-gray-400"
          >
            <li>
              <NuxtLink
                to="/"
                class="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                Home
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 mx-2" />
              <NuxtLink
                to="/menu"
                class="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                Menu
              </NuxtLink>
            </li>
            <li v-if="menuItem.category" class="flex items-center">
              <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 mx-2" />
              <NuxtLink
                :to="`/menu?category=${menuItem.category.id}`"
                class="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                {{ menuItem.category.name }}
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 mx-2" />
              <span class="text-gray-900 dark:text-white font-medium">{{
                menuItem.name
              }}</span>
            </li>
          </ol>
        </nav>

        <!-- Responsive layout: stack on mobile, side-by-side on landscape -->
        <div class="lg:grid lg:grid-cols-12 lg:gap-8 space-y-8 lg:space-y-0">
          <!-- Main Item Content -->
          <div class="lg:col-span-8">
            <UCard class="bg-white dark:bg-gray-800 overflow-hidden">
              <!-- Image Gallery -->
              <template #header>
                <div class="relative">
                  <template
                    v-if="menuItem.images && menuItem.images.length > 1"
                  >
                    <div class="relative w-full h-96 lg:h-[500px]">
                      <NuxtImg
                        v-for="(img, idx) in menuItem.images"
                        :key="img"
                        v-show="currentImageIndex === idx"
                        :src="img"
                        class="w-full h-96 lg:h-[500px] object-cover absolute top-0 left-0 transition-opacity duration-500"
                        :alt="menuItem.name + ' image ' + (idx + 1)"
                        format="webp"
                        quality="80"
                      />

                      <!-- Navigation Arrows -->
                      <button
                        @click="previousImage"
                        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all z-10"
                      >
                        <UIcon
                          name="i-heroicons-chevron-left"
                          class="w-6 h-6"
                        />
                      </button>
                      <button
                        @click="nextImage"
                        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all z-10"
                      >
                        <UIcon
                          name="i-heroicons-chevron-right"
                          class="w-6 h-6"
                        />
                      </button>

                      <!-- Image Indicators -->
                      <div
                        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10"
                      >
                        <button
                          v-for="(img, idx) in menuItem.images"
                          :key="idx"
                          class="w-3 h-3 rounded-full transition-all"
                          :class="
                            currentImageIndex === idx
                              ? 'bg-yellow-500'
                              : 'bg-white/60 hover:bg-white/80'
                          "
                          @click="currentImageIndex = idx"
                        />
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <NuxtImg
                      :src="menuItem.image || '/images/food/foods.jpg'"
                      :alt="menuItem.name"
                      class="w-full h-96 lg:h-[500px] object-cover"
                      format="webp"
                      quality="80"
                    />
                  </template>

                  <!-- Badges -->
                  <div class="absolute top-4 left-4 flex flex-col gap-2">
                    <UBadge
                      v-if="menuItem.isPopular"
                      color="red"
                      variant="solid"
                      class="font-semibold"
                    >
                      Popular
                    </UBadge>
                    <UBadge
                      v-if="menuItem.isSpecial"
                      color="purple"
                      variant="solid"
                      class="font-semibold"
                    >
                      Chef's Special
                    </UBadge>
                    <UBadge
                      :color="menuItem.isAvailable ? 'green' : 'red'"
                      variant="solid"
                      class="font-semibold"
                    >
                      {{ menuItem.isAvailable ? "Available" : "Not Available" }}
                    </UBadge>
                  </div>

                  <!-- Price Badge -->
                  <div
                    class="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full"
                  >
                    <span class="text-lg font-bold">${{ menuItem.price }}</span>
                  </div>
                </div>
              </template>

              <!-- Item Details -->
              <div class="p-6 lg:p-8 space-y-6">
                <!-- Header -->
                <div class="space-y-4">
                  <div class="flex justify-between items-start">
                    <h1
                      class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white"
                    >
                      {{ menuItem.name }}
                    </h1>
                  </div>

                  <!-- Dietary Info -->
                  <div v-if="menuItem.dietaryInfo" class="flex flex-wrap gap-2">
                    <UBadge
                      v-if="menuItem.dietaryInfo.isVegetarian"
                      color="green"
                      variant="subtle"
                      class="flex items-center"
                    >
                      <UIcon name="i-heroicons-leaf" class="w-4 h-4 mr-1" />
                      Vegetarian
                    </UBadge>
                    <UBadge
                      v-if="menuItem.dietaryInfo.isVegan"
                      color="emerald"
                      variant="subtle"
                      class="flex items-center"
                    >
                      <UIcon name="i-heroicons-sparkles" class="w-4 h-4 mr-1" />
                      Vegan
                    </UBadge>
                    <UBadge
                      v-if="menuItem.dietaryInfo.isGlutenFree"
                      color="blue"
                      variant="subtle"
                      class="flex items-center"
                    >
                      <UIcon
                        name="i-heroicons-shield-check"
                        class="w-4 h-4 mr-1"
                      />
                      Gluten Free
                    </UBadge>
                    <UBadge
                      v-if="menuItem.dietaryInfo.isSpicy"
                      color="orange"
                      variant="subtle"
                      class="flex items-center"
                    >
                      <UIcon name="i-heroicons-fire" class="w-4 h-4 mr-1" />
                      Spicy
                    </UBadge>
                  </div>

                  <!-- Rating (if available) -->
                  <div
                    v-if="menuItem.averageRating"
                    class="flex items-center gap-2"
                  >
                    <div class="flex items-center">
                      <UIcon
                        v-for="star in 5"
                        :key="star"
                        name="i-heroicons-star-solid"
                        :class="
                          star <= Math.floor(menuItem.averageRating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        "
                        class="w-5 h-5"
                      />
                    </div>
                    <span class="text-sm text-gray-600 dark:text-gray-300">
                      {{ menuItem.averageRating.toFixed(1) }} ({{
                        menuItem.totalReviews
                      }}
                      reviews)
                    </span>
                  </div>
                </div>

                <!-- Description -->
                <div class="space-y-4">
                  <p
                    class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    {{ menuItem.description }}
                  </p>
                </div>

                <!-- Ingredients -->
                <div
                  v-if="menuItem.ingredients && menuItem.ingredients.length > 0"
                  class="space-y-3"
                >
                  <h3
                    class="text-xl font-semibold text-gray-900 dark:text-white"
                  >
                    Ingredients
                  </h3>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <ul
                      class="grid grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <li
                        v-for="ingredient in menuItem.ingredients"
                        :key="ingredient"
                        class="flex items-center"
                      >
                        <UIcon
                          name="i-heroicons-check"
                          class="w-4 h-4 mr-2 text-green-500"
                        />
                        {{ ingredient }}
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Allergens -->
                <div
                  v-if="menuItem.allergens && menuItem.allergens.length > 0"
                  class="space-y-3"
                >
                  <h3
                    class="text-xl font-semibold text-gray-900 dark:text-white"
                  >
                    Allergen Information
                  </h3>
                  <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <p class="text-sm text-red-600 dark:text-red-400 mb-3">
                      <UIcon
                        name="i-heroicons-exclamation-triangle"
                        class="w-4 h-4 mr-1 inline"
                      />
                      Contains:
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <UBadge
                        v-for="allergen in menuItem.allergens"
                        :key="allergen"
                        color="red"
                        variant="subtle"
                        class="text-sm"
                      >
                        {{ allergen }}
                      </UBadge>
                    </div>
                  </div>
                </div>

                <!-- Nutritional Info -->
                <div v-if="menuItem.nutritionalInfo" class="space-y-3">
                  <h3
                    class="text-xl font-semibold text-gray-900 dark:text-white"
                  >
                    Nutritional Information
                  </h3>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div
                        v-if="menuItem.nutritionalInfo.calories"
                        class="text-center"
                      >
                        <p class="font-semibold text-gray-900 dark:text-white">
                          {{ menuItem.nutritionalInfo.calories }}
                        </p>
                        <p class="text-gray-600 dark:text-gray-300">Calories</p>
                      </div>
                      <div
                        v-if="menuItem.nutritionalInfo.protein"
                        class="text-center"
                      >
                        <p class="font-semibold text-gray-900 dark:text-white">
                          {{ menuItem.nutritionalInfo.protein }}g
                        </p>
                        <p class="text-gray-600 dark:text-gray-300">Protein</p>
                      </div>
                      <div
                        v-if="menuItem.nutritionalInfo.carbs"
                        class="text-center"
                      >
                        <p class="font-semibold text-gray-900 dark:text-white">
                          {{ menuItem.nutritionalInfo.carbs }}g
                        </p>
                        <p class="text-gray-600 dark:text-gray-300">Carbs</p>
                      </div>
                      <div
                        v-if="menuItem.nutritionalInfo.fat"
                        class="text-center"
                      >
                        <p class="font-semibold text-gray-900 dark:text-white">
                          {{ menuItem.nutritionalInfo.fat }}g
                        </p>
                        <p class="text-gray-600 dark:text-gray-300">Fat</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-4 space-y-6">
            <!-- Order Actions -->
            <UCard class="bg-white dark:bg-gray-800">
              <template #header>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Order Information
                </h3>
              </template>
              <div class="space-y-4">
                <div class="text-center">
                  <p
                    class="text-3xl font-bold text-yellow-600 dark:text-yellow-400"
                  >
                    ${{ menuItem.price }}
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Price per serving
                  </p>
                </div>

                <div class="space-y-3">
                  <UButton
                    color="yellow"
                    variant="solid"
                    class="w-full justify-center"
                    size="lg"
                    :disabled="!menuItem.isAvailable"
                  >
                    <UIcon
                      name="i-heroicons-shopping-cart"
                      class="w-5 h-5 mr-2"
                    />
                    {{
                      menuItem.isAvailable
                        ? "Reserve Table"
                        : "Currently Unavailable"
                    }}
                  </UButton>

                  <UButton
                    color="gray"
                    variant="outline"
                    class="w-full justify-center"
                    @click="shareItem"
                  >
                    <UIcon name="i-heroicons-share" class="w-5 h-5 mr-2" />
                    Share Item
                  </UButton>
                </div>

                <div
                  v-if="menuItem.preparationTime"
                  class="text-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <UIcon name="i-heroicons-clock" class="w-4 h-4 mr-1 inline" />
                  Preparation time: {{ menuItem.preparationTime }} minutes
                </div>
              </div>
            </UCard>

            <!-- Similar Items -->
            <UCard
              v-if="similarItems.length > 0"
              class="bg-white dark:bg-gray-800"
            >
              <template #header>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Similar Items
                </h3>
              </template>
              <div class="space-y-4">
                <div
                  v-for="item in similarItems.slice(0, 3)"
                  :key="item.id"
                  class="group cursor-pointer"
                  @click="navigateToItem(item.id)"
                >
                  <div class="flex space-x-3">
                    <div class="flex-shrink-0">
                      <NuxtImg
                        :src="item.image || '/images/food/foods.jpg'"
                        :alt="item.name"
                        class="w-16 h-16 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                        format="webp"
                        quality="60"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p
                        class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors truncate"
                      >
                        {{ item.name }}
                      </p>
                      <p
                        class="text-sm text-yellow-600 dark:text-yellow-400 font-semibold"
                      >
                        ${{ item.price }}
                      </p>
                      <div class="flex items-center mt-1">
                        <UBadge
                          v-if="item.dietaryInfo?.isVegetarian"
                          color="green"
                          variant="subtle"
                          class="text-xs"
                        >
                          Vegetarian
                        </UBadge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Contact Information -->
            <UCard class="bg-white dark:bg-gray-800">
              <template #header>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Questions?
                </h3>
              </template>
              <div class="space-y-3 text-sm">
                <div class="flex items-center text-gray-600 dark:text-gray-300">
                  <UIcon
                    name="i-heroicons-phone"
                    class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400"
                  />
                  <span>(555) 123-4567</span>
                </div>
                <div class="flex items-center text-gray-600 dark:text-gray-300">
                  <UIcon
                    name="i-heroicons-envelope"
                    class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400"
                  />
                  <span>orders@pearsonpub.com</span>
                </div>
                <NuxtLink
                  to="/contact"
                  class="inline-flex items-center text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors"
                >
                  <UIcon name="i-heroicons-map-pin" class="w-4 h-4 mr-2" />
                  Visit Us
                </NuxtLink>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Navigation -->
        <div class="mt-12 flex justify-between items-center">
          <NuxtLink to="/menu">
            <UButton color="gray" variant="outline" size="lg">
              <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 mr-2" />
              Back to Menu
            </UButton>
          </NuxtLink>

          <div class="flex space-x-4">
            <UButton
              v-if="previousItem"
              :to="`/menu/${previousItem.id}`"
              color="gray"
              variant="outline"
              class="hidden sm:flex"
            >
              <UIcon name="i-heroicons-chevron-left" class="w-4 h-4 mr-1" />
              Previous
            </UButton>
            <UButton
              v-if="nextItem"
              :to="`/menu/${nextItem.id}`"
              color="gray"
              variant="outline"
              class="hidden sm:flex"
            >
              Next
              <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 ml-1" />
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { itemsApi } from "~/composables/useApi";

const route = useRoute();
const router = useRouter();

// Backend integration
const loading = ref(true);
const error = ref<string | null>(null);
const menuItem = ref<any>(null);
const allMenuItems = ref<any[]>([]);
const currentImageIndex = ref(0);

// Fetch menu item data
onMounted(async () => {
  try {
    loading.value = true;
    error.value = null; // Get all menu items to find the specific one and similar items
    const response = await itemsApi.getAll(1, 200);
    allMenuItems.value = response.data;

    // Find the specific menu item
    const itemId = route.params.id as string;
    const foundItem = allMenuItems.value.find(
      (item) =>
        item.id === itemId ||
        item.id === parseInt(itemId) ||
        item.slug === itemId
    );

    if (foundItem) {
      // Transform backend item to UI format
      menuItem.value = {
        ...foundItem,
        image:
          foundItem.images?.[0] || foundItem.image || "/images/food/foods.jpg",
        images: foundItem.images || [
          foundItem.image || "/images/food/foods.jpg",
        ],
        dietaryInfo: foundItem.dietaryInfo || {},
        ingredients: foundItem.ingredients || [],
        allergens: foundItem.allergens || [],
        nutritionalInfo: foundItem.nutritionalInfo || {},
        preparationTime: foundItem.preparationTime || foundItem.prepTime,
      };
    } else {
      error.value = "The menu item you're looking for could not be found.";
    }
  } catch (err) {
    console.error("Error fetching menu item:", err);
    error.value = "Failed to load menu item details. Please try again later.";
  } finally {
    loading.value = false;
  }
});

// Similar items (same category, exclude current item)
const similarItems = computed(() => {
  if (!menuItem.value || !allMenuItems.value.length) return [];

  return allMenuItems.value
    .filter(
      (item) =>
        item.id !== menuItem.value.id &&
        item.category?.id === menuItem.value.category?.id
    )
    .slice(0, 4);
});

// Navigation between items
const currentItemIndex = computed(() => {
  if (!menuItem.value || !allMenuItems.value.length) return -1;
  return allMenuItems.value.findIndex((item) => item.id === menuItem.value.id);
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
