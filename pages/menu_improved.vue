<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Menu Hero Section -->
    <section
      class="relative py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden"
    >
      <div class="absolute inset-0">
        <NuxtImg
          src="/images/food/foods.jpg"
          alt="Our Menu"
          class="w-full h-full object-cover opacity-40"
          format="webp"
          quality="80"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"
        ></div>
      </div>

      <!-- Decorative Elements -->
      <div
        class="absolute top-10 right-10 w-20 h-20 lg:w-32 lg:h-32 rounded-full border border-yellow-500/30 animate-pulse"
      ></div>
      <div
        class="absolute bottom-20 left-10 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-yellow-500/20"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
      >
        <div class="inline-block mb-4">
          <span
            class="text-yellow-400 font-semibold text-sm lg:text-lg tracking-wide uppercase"
            >Culinary Excellence</span
          >
          <div class="w-12 lg:w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
        </div>
        <h1
          class="text-3xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          style="font-family: 'Cinzel', 'Georgia', serif"
        >
          Our <span class="text-yellow-400">Menu</span>
        </h1>
        <p
          class="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
        >
          Discover our delicious selection of
          <span class="text-yellow-300">pub favorites</span> and
          <span class="text-yellow-300">craft beverages</span>
        </p>
      </div>
    </section>

    <!-- Enhanced Filters and Search Section -->
    <section
      class="py-6 lg:py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col space-y-4">
          <!-- Top Row: Search and Favorites -->
          <div
            class="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between"
          >
            <!-- Search Bar with Filters -->
            <div class="flex-1 max-w-md">
              <div class="relative">
                <UIcon
                  name="i-heroicons-magnifying-glass"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search menu items..."
                  class="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                />
                <button
                  v-if="searchQuery"
                  @click="searchQuery = ''"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="flex items-center gap-3">
              <!-- View Favorites -->
              <UButton
                :color="showFavoritesOnly ? 'yellow' : 'gray'"
                :variant="showFavoritesOnly ? 'solid' : 'outline'"
                size="sm"
                @click="toggleFavoritesOnly"
              >
                <UIcon name="i-heroicons-heart" class="w-4 h-4 mr-2" />
                Favorites ({{ favoriteItems.size }})
              </UButton>

              <!-- Dietary Filters -->
              <div class="relative">
                <UButton
                  color="gray"
                  variant="outline"
                  size="sm"
                  @click="showDietaryFilter = !showDietaryFilter"
                >
                  <UIcon
                    name="i-heroicons-adjustments-horizontal"
                    class="w-4 h-4 mr-2"
                  />
                  Dietary
                  <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 ml-2" />
                </UButton>

                <!-- Dietary Dropdown -->
                <div
                  v-if="showDietaryFilter"
                  class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
                  @click.stop
                >
                  <div class="p-4 space-y-3">
                    <h4
                      class="font-semibold text-gray-900 dark:text-white text-sm"
                    >
                      Dietary Preferences
                    </h4>
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input
                        v-model="dietaryFilters.vegetarian"
                        type="checkbox"
                        class="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span class="text-sm text-gray-700 dark:text-gray-300"
                        >Vegetarian</span
                      >
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input
                        v-model="dietaryFilters.vegan"
                        type="checkbox"
                        class="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span class="text-sm text-gray-700 dark:text-gray-300"
                        >Vegan</span
                      >
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input
                        v-model="dietaryFilters.glutenFree"
                        type="checkbox"
                        class="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span class="text-sm text-gray-700 dark:text-gray-300"
                        >Gluten Free</span
                      >
                    </label>
                  </div>
                </div>
              </div>

              <!-- Price Range Filter -->
              <div class="relative">
                <UButton
                  color="gray"
                  variant="outline"
                  size="sm"
                  @click="showPriceFilter = !showPriceFilter"
                >
                  <UIcon
                    name="i-heroicons-currency-dollar"
                    class="w-4 h-4 mr-2"
                  />
                  Price
                  <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 ml-2" />
                </UButton>

                <!-- Price Dropdown -->
                <div
                  v-if="showPriceFilter"
                  class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
                  @click.stop
                >
                  <div class="p-4 space-y-3">
                    <h4
                      class="font-semibold text-gray-900 dark:text-white text-sm"
                    >
                      Price Range
                    </h4>
                    <div class="space-y-2">
                      <label class="flex items-center space-x-2 cursor-pointer">
                        <input
                          v-model="selectedPriceRange"
                          type="radio"
                          value="all"
                          class="text-yellow-600 focus:ring-yellow-500"
                        />
                        <span class="text-sm text-gray-700 dark:text-gray-300"
                          >All Prices</span
                        >
                      </label>
                      <label class="flex items-center space-x-2 cursor-pointer">
                        <input
                          v-model="selectedPriceRange"
                          type="radio"
                          value="under-15"
                          class="text-yellow-600 focus:ring-yellow-500"
                        />
                        <span class="text-sm text-gray-700 dark:text-gray-300"
                          >Under $15</span
                        >
                      </label>
                      <label class="flex items-center space-x-2 cursor-pointer">
                        <input
                          v-model="selectedPriceRange"
                          type="radio"
                          value="15-25"
                          class="text-yellow-600 focus:ring-yellow-500"
                        />
                        <span class="text-sm text-gray-700 dark:text-gray-300"
                          >$15 - $25</span
                        >
                      </label>
                      <label class="flex items-center space-x-2 cursor-pointer">
                        <input
                          v-model="selectedPriceRange"
                          type="radio"
                          value="over-25"
                          class="text-yellow-600 focus:ring-yellow-500"
                        />
                        <span class="text-sm text-gray-700 dark:text-gray-300"
                          >Over $25</span
                        >
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Category Navigation -->
          <div class="flex items-center justify-between gap-4">
            <!-- Categories -->
            <div
              class="flex items-center space-x-2 overflow-x-auto pb-2 flex-1"
            >
              <button
                v-for="category in primaryCategories"
                :key="category.id"
                :class="[
                  'whitespace-nowrap px-4 lg:px-6 py-2 rounded-full font-semibold text-sm lg:text-base transition-all duration-300',
                  activeCategory === category.id
                    ? 'bg-yellow-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-yellow-100 dark:hover:bg-yellow-900 hover:shadow-lg',
                ]"
                @click="
                  () => {
                    activeCategory = category.id;
                    showDropdown = false;
                  }
                "
              >
                {{ category.name }}
              </button>

              <!-- More Dropdown -->
              <div
                v-if="secondaryCategories.length > 0"
                class="relative"
                @mouseleave="showDropdown = false"
              >
                <button
                  @click="showDropdown = !showDropdown"
                  class="whitespace-nowrap px-4 lg:px-6 py-2 rounded-full font-semibold text-sm lg:text-base bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-yellow-100 dark:hover:bg-yellow-900 hover:shadow-lg"
                  aria-haspopup="true"
                  :aria-expanded="showDropdown"
                >
                  More
                  <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 ml-1" />
                </button>
                <div
                  v-if="showDropdown"
                  class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10"
                >
                  <button
                    v-for="category in secondaryCategories"
                    :key="category.id"
                    class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                    @click="
                      () => {
                        activeCategory = category.id;
                        showDropdown = false;
                      }
                    "
                  >
                    {{ category.name }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Sort Options -->
            <div class="flex items-center gap-2">
              <span
                class="text-sm text-gray-600 dark:text-gray-300 hidden lg:block"
                >Sort by:</span
              >
              <select
                v-model="sortBy"
                class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="featured">Featured First</option>
              </select>
            </div>
          </div>

          <!-- Active Filters Display -->
          <div v-if="hasActiveFilters" class="flex flex-wrap gap-2">
            <span class="text-sm text-gray-600 dark:text-gray-300 mr-2"
              >Active filters:</span
            >
            <UBadge
              v-if="showFavoritesOnly"
              color="red"
              variant="subtle"
              class="cursor-pointer"
              @click="showFavoritesOnly = false"
            >
              Favorites Only
              <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
            </UBadge>
            <UBadge
              v-if="searchQuery"
              color="blue"
              variant="subtle"
              class="cursor-pointer"
              @click="searchQuery = ''"
            >
              "{{ searchQuery }}"
              <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
            </UBadge>
            <UBadge
              v-if="selectedPriceRange !== 'all'"
              color="green"
              variant="subtle"
              class="cursor-pointer"
              @click="selectedPriceRange = 'all'"
            >
              {{ getPriceRangeLabel(selectedPriceRange) }}
              <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
            </UBadge>
            <UBadge
              v-for="(active, key) in activeDietaryFilters"
              :key="key"
              color="purple"
              variant="subtle"
              class="cursor-pointer"
              @click="(dietaryFilters as any)[key] = false"
            >
              {{ key.charAt(0).toUpperCase() + key.slice(1) }}
              <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
            </UBadge>
            <UButton
              color="gray"
              variant="ghost"
              size="sm"
              @click="clearAllFilters"
            >
              Clear All
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Menu Items Section -->
    <section class="py-10 lg:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="filteredCategories.length > 0">
          <div
            v-for="category in filteredCategories"
            :key="category.id"
            class="mb-16"
          >
            <!-- Category Header -->
            <div class="text-center mb-12">
              <h2
                class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                style="font-family: 'Cinzel', 'Georgia', serif"
              >
                {{ category.name }}
              </h2>
              <div class="w-24 h-1 bg-yellow-500 mx-auto mb-4"></div>
              <p
                v-if="category.description"
                class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              >
                {{ category.description }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {{ category.items.length }} item{{
                  category.items.length !== 1 ? "s" : ""
                }}
              </p>
            </div>

            <!-- Menu Items Grid -->
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            >
              <div
                v-for="(item, index) in category.items"
                :key="item.id"
                class="menu-card transition-all duration-500 transform hover:scale-105"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <!-- Enhanced Menu Item Card -->
                <UCard
                  class="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-0 h-full flex flex-col"
                  @click="() => showItemDetails(item)"
                >
                  <template #header>
                    <div class="relative overflow-hidden">
                      <NuxtImg
                        :src="item.image || '/images/food/default.jpg'"
                        class="w-full h-48 lg:h-56 object-cover transform transition-transform duration-300 group-hover:scale-110"
                        :alt="item.name"
                        format="webp"
                        quality="80"
                      />

                      <!-- Badges -->
                      <div class="absolute top-3 left-3 flex flex-col gap-2">
                        <UBadge
                          v-if="item.isFeatured"
                          color="yellow"
                          variant="solid"
                          class="font-semibold text-xs"
                        >
                          Featured
                        </UBadge>
                        <UBadge
                          v-if="item.isPearsonFamous"
                          color="red"
                          variant="solid"
                          class="font-semibold text-xs"
                        >
                          Pub Famous
                        </UBadge>
                        <UBadge
                          v-if="!item.isAvailable"
                          color="gray"
                          variant="solid"
                          class="font-semibold text-xs"
                        >
                          Sold Out
                        </UBadge>
                      </div>

                      <!-- Favorite Button -->
                      <button
                        class="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 group"
                        @click.stop="toggleFavorite(item.id)"
                      >
                        <UIcon
                          :name="
                            favoriteItems.has(item.id)
                              ? 'i-heroicons-heart-solid'
                              : 'i-heroicons-heart'
                          "
                          :class="
                            favoriteItems.has(item.id)
                              ? 'text-red-500'
                              : 'text-gray-600 group-hover:text-red-500'
                          "
                          class="w-5 h-5 transition-colors"
                        />
                      </button>

                      <!-- Dietary Icons -->
                      <div class="absolute bottom-3 left-3 flex gap-1">
                        <UBadge
                          v-if="item.dietaryInfo?.isVegetarian"
                          color="green"
                          variant="subtle"
                          class="text-xs"
                        >
                          V
                        </UBadge>
                        <UBadge
                          v-if="item.dietaryInfo?.isVegan"
                          color="emerald"
                          variant="subtle"
                          class="text-xs"
                        >
                          VG
                        </UBadge>
                        <UBadge
                          v-if="item.dietaryInfo?.isGlutenFree"
                          color="blue"
                          variant="subtle"
                          class="text-xs"
                        >
                          GF
                        </UBadge>
                      </div>

                      <!-- Price Badge -->
                      <div
                        class="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full"
                      >
                        <span class="text-sm font-semibold"
                          >${{ item.price }}</span
                        >
                      </div>
                    </div>
                  </template>

                  <div class="p-4 lg:p-6 flex flex-col flex-grow">
                    <h3
                      class="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors"
                    >
                      {{ item.name }}
                    </h3>

                    <p
                      class="text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow"
                    >
                      {{ item.description }}
                    </p>

                    <!-- Allergens (if any) -->
                    <div
                      v-if="item.allergens && item.allergens.length > 0"
                      class="mb-4"
                    >
                      <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Contains:
                      </p>
                      <div class="flex flex-wrap gap-1">
                        <UBadge
                          v-for="allergen in item.allergens.slice(0, 3)"
                          :key="allergen"
                          color="orange"
                          variant="subtle"
                          class="text-xs"
                        >
                          {{ allergen }}
                        </UBadge>
                        <span
                          v-if="item.allergens.length > 3"
                          class="text-xs text-gray-500"
                        >
                          +{{ item.allergens.length - 3 }} more
                        </span>
                      </div>
                    </div>

                    <div
                      class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700"
                    >
                      <UBadge
                        :color="item.isAvailable ? 'green' : 'red'"
                        variant="subtle"
                        class="text-xs"
                      >
                        {{ item.isAvailable ? "Available" : "Not Available" }}
                      </UBadge>

                      <UButton
                        color="yellow"
                        variant="solid"
                        size="sm"
                        :disabled="!item.isAvailable"
                      >
                        View Details
                      </UButton>
                    </div>
                  </div>
                </UCard>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-16">
          <UIcon
            name="i-heroicons-face-frown"
            class="w-16 h-16 text-gray-400 mx-auto mb-4"
          />
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
      <UCard v-if="selectedItem" class="max-w-4xl mx-auto">
        <template #header>
          <div class="relative overflow-hidden rounded-t-lg">
            <template
              v-if="
                selectedItem &&
                selectedItem.images &&
                selectedItem.images.length > 1
              "
            >
              <div class="relative w-full h-64 lg:h-80">
                <NuxtImg
                  v-for="(img, idx) in selectedItem.images"
                  :key="img"
                  v-show="carouselIndex === idx"
                  :src="img"
                  class="w-full h-64 lg:h-80 object-cover absolute top-0 left-0 transition-opacity duration-500"
                  :alt="selectedItem.name + ' image ' + (idx + 1)"
                  format="webp"
                  quality="80"
                />

                <!-- Carousel Controls -->
                <button
                  @click="previousImage"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                >
                  <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
                </button>
                <button
                  @click="nextImage"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                >
                  <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
                </button>

                <!-- Carousel Indicators -->
                <div
                  class="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2"
                >
                  <span
                    v-for="(img, idx) in selectedItem.images"
                    :key="idx"
                    class="w-2 h-2 rounded-full cursor-pointer transition-all"
                    :class="
                      carouselIndex === idx
                        ? 'bg-yellow-500'
                        : 'bg-gray-300 hover:bg-gray-400'
                    "
                    @click="carouselIndex = idx"
                  />
                </div>
              </div>
            </template>
            <template v-else>
              <NuxtImg
                v-if="selectedItem?.image"
                :src="selectedItem?.image"
                class="w-full h-64 lg:h-80 object-cover"
                :alt="selectedItem?.name"
                format="webp"
                quality="80"
              />
              <div
                v-else
                class="w-full h-64 lg:h-80 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400"
              >
                <UIcon name="i-heroicons-photo" class="w-16 h-16" />
              </div>
            </template>
          </div>
        </template>

        <div class="p-6 lg:p-8 space-y-6">
          <!-- Item Header -->
          <div
            class="flex flex-col lg:flex-row justify-between lg:items-start gap-4"
          >
            <div class="flex-1">
              <div class="flex items-start justify-between mb-4">
                <h2
                  class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white"
                >
                  {{ selectedItem.name }}
                </h2>
                <button
                  class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  @click="toggleFavorite(selectedItem.id)"
                >
                  <UIcon
                    :name="
                      favoriteItems.has(selectedItem.id)
                        ? 'i-heroicons-heart-solid'
                        : 'i-heroicons-heart'
                    "
                    :class="
                      favoriteItems.has(selectedItem.id)
                        ? 'text-red-500'
                        : 'text-gray-600'
                    "
                    class="w-6 h-6"
                  />
                </button>
              </div>

              <!-- Badges -->
              <div class="flex flex-wrap gap-2 mb-4">
                <UBadge
                  v-if="selectedItem.isFeatured"
                  color="yellow"
                  variant="solid"
                >
                  Featured
                </UBadge>
                <UBadge
                  v-if="selectedItem.isPearsonFamous"
                  color="red"
                  variant="solid"
                >
                  Pub Famous
                </UBadge>
                <UBadge
                  :color="selectedItem.isAvailable ? 'green' : 'red'"
                  variant="subtle"
                >
                  {{ selectedItem.isAvailable ? "Available" : "Not Available" }}
                </UBadge>
              </div>
            </div>

            <!-- Price and Order -->
            <div class="lg:text-right">
              <div
                class="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-4"
              >
                ${{ selectedItem.price }}
              </div>
              <UButton
                color="yellow"
                variant="solid"
                size="lg"
                :disabled="!selectedItem.isAvailable"
                class="w-full lg:w-auto"
              >
                Add to Order
              </UButton>
            </div>
          </div>

          <!-- Description -->
          <div>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {{ selectedItem.description }}
            </p>
          </div>

          <!-- Ingredients -->
          <div
            v-if="
              selectedItem.ingredients && selectedItem.ingredients.length > 0
            "
            class="space-y-3"
          >
            <h3 class="font-semibold text-gray-900 dark:text-white text-lg">
              Ingredients
            </h3>
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-2">
              <div
                v-for="ingredient in selectedItem.ingredients"
                :key="ingredient"
                class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <UIcon
                  name="i-heroicons-check"
                  class="w-4 h-4 text-green-500"
                />
                <span>{{ ingredient }}</span>
              </div>
            </div>
          </div>

          <!-- Allergens -->
          <div
            v-if="selectedItem.allergens && selectedItem.allergens.length > 0"
            class="space-y-3"
          >
            <h3 class="font-semibold text-gray-900 dark:text-white text-lg">
              Allergen Information
            </h3>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="allergen in selectedItem.allergens"
                :key="allergen"
                color="orange"
                variant="subtle"
              >
                {{ allergen }}
              </UBadge>
            </div>
          </div>

          <!-- Dietary Information -->
          <div v-if="selectedItem.dietaryInfo" class="space-y-3">
            <h3 class="font-semibold text-gray-900 dark:text-white text-lg">
              Dietary Information
            </h3>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-if="selectedItem.dietaryInfo.isVegetarian"
                color="green"
                variant="subtle"
              >
                <UIcon name="i-heroicons-leaf" class="w-4 h-4 mr-1" />
                Vegetarian
              </UBadge>
              <UBadge
                v-if="selectedItem.dietaryInfo.isVegan"
                color="emerald"
                variant="subtle"
              >
                <UIcon name="i-heroicons-heart" class="w-4 h-4 mr-1" />
                Vegan
              </UBadge>
              <UBadge
                v-if="selectedItem.dietaryInfo.isGlutenFree"
                color="blue"
                variant="subtle"
              >
                <UIcon name="i-heroicons-shield-check" class="w-4 h-4 mr-1" />
                Gluten Free
              </UBadge>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton color="gray" variant="outline" @click="closeModal">
              Close
            </UButton>
            <UButton
              color="yellow"
              variant="solid"
              :disabled="!selectedItem.isAvailable"
            >
              Add to Order
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Dietary Information Section -->
    <section class="py-16 bg-white dark:bg-gray-800 relative overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute top-10 left-10 w-32 h-32 lg:w-40 lg:h-40 rounded-full border-2 border-yellow-500"
        ></div>
        <div
          class="absolute bottom-10 right-10 w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-yellow-300"
        ></div>
      </div>

      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <h2
          class="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
        >
          Dietary Information
        </h2>
        <div class="w-16 h-1 bg-yellow-500 mx-auto mb-8"></div>
        <p
          class="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          We cater to various dietary requirements. Please ask our staff for
          detailed allergen information.
        </p>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div
            v-for="(info, index) in dietaryInfo"
            :key="index"
            class="flex flex-col items-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <UIcon
              :name="info.icon"
              class="w-8 h-8 lg:w-10 lg:h-10 text-yellow-600 dark:text-yellow-400 mb-3"
            />
            <span
              class="text-sm lg:text-base font-medium text-gray-800 dark:text-gray-200 text-center"
              >{{ info.label }}</span
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useMenu } from "~/composables/useMenu";
import type { MenuItem, MenuCategory } from "~/types/menu";

// Composable
const { menuCategories, getPrimaryCategories, getSecondaryCategories } =
  useMenu();

// Reactive data
const activeCategory = ref("");
const searchQuery = ref("");
const sortBy = ref("name");
const showDropdown = ref(false);
const showDietaryFilter = ref(false);
const showPriceFilter = ref(false);
const showFavoritesOnly = ref(false);
const selectedPriceRange = ref("all");
const dietaryFilters = ref({
  vegetarian: false,
  vegan: false,
  glutenFree: false,
});

// Favorites
const favoriteItems = ref(new Set<string>());

// Modal
const isModalOpen = ref(false);
const selectedItem = ref<MenuItem | null>(null);
const carouselIndex = ref(0);
let carouselInterval: NodeJS.Timeout | null = null;

// Computed properties
const categories = computed<MenuCategory[]>(() =>
  Array.isArray(menuCategories.value) ? menuCategories.value : []
);
const primaryCategories = computed(() => getPrimaryCategories.value);
const secondaryCategories = computed(() => getSecondaryCategories.value);

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
    showFavoritesOnly.value ||
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

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.ingredients &&
          item.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(query)
          ))
    );
  }

  // Apply favorites filter
  if (showFavoritesOnly.value) {
    items = items.filter((item) => favoriteItems.value.has(item.id));
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
const toggleFavorite = (itemId: string) => {
  if (favoriteItems.value.has(itemId)) {
    favoriteItems.value.delete(itemId);
  } else {
    favoriteItems.value.add(itemId);
  }
  // Save to localStorage
  localStorage.setItem(
    "favoriteItems",
    JSON.stringify([...favoriteItems.value])
  );
};

const toggleFavoritesOnly = () => {
  showFavoritesOnly.value = !showFavoritesOnly.value;
};

const showItemDetails = (item: MenuItem) => {
  selectedItem.value = item;
  isModalOpen.value = true;
  carouselIndex.value = 0;
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
  showFavoritesOnly.value = false;
  selectedPriceRange.value = "all";
  dietaryFilters.value = {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  };
};

// Dietary info
const dietaryInfo = [
  { icon: "i-heroicons-leaf", label: "Vegetarian Options" },
  { icon: "i-heroicons-shield-check", label: "Gluten-Free Options" },
  { icon: "i-heroicons-heart", label: "Vegan Options" },
  {
    icon: "i-heroicons-information-circle",
    label: "Allergen Information Available",
  },
];

// Auto-close dropdowns when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as Element;
  if (!target.closest(".relative")) {
    showDropdown.value = false;
    showDietaryFilter.value = false;
    showPriceFilter.value = false;
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

onMounted(() => {
  // Set default category
  const allDayMenu = categories.value.find((c) => c.id === "all-day-menu");
  if (allDayMenu) {
    activeCategory.value = "all-day-menu";
  } else if (categories.value.length > 0) {
    activeCategory.value = categories.value[0].id;
  }

  // Load favorites from localStorage
  const savedFavorites = localStorage.getItem("favoriteItems");
  if (savedFavorites) {
    try {
      const favArray = JSON.parse(savedFavorites);
      favoriteItems.value = new Set(favArray);
    } catch (e) {
      console.error("Error loading favorites:", e);
    }
  }

  // Add click outside listener
  document.addEventListener("click", handleClickOutside);

  // GSAP animations (if available)
  if (process.client) {
    nextTick(() => {
      const nuxtApp = useNuxtApp();
      const $gsap = (nuxtApp as any)?.$gsap;
      if ($gsap && $gsap.utils && typeof $gsap.from === "function") {
        $gsap.utils.toArray(".menu-card").forEach((el: any, i: number) => {
          $gsap.from(el, {
            opacity: 0,
            y: 40,
            duration: 0.7,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          });
        });
      }
    });
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
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
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
