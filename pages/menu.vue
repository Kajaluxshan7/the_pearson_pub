<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Menu Hero Section -->
    <section
      class="hero-section relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">

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
    <!-- Modern Filter Section -->
    <section class="filter-section py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-6">
          <!-- Top Row: Search, Sort, and View Toggle -->
          <div class="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <!-- Search Bar with Enhanced Design -->
            <div class="flex-1 max-w-lg">
              <div class="relative group">
                <UIcon name="i-heroicons-magnifying-glass" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 w-5 h-5 transition-colors" />
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Search delicious menu items..." 
                  class="w-full pl-8 pr-8 py-2 rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                />
                <button 
                  v-if="searchQuery" 
                  @click="searchQuery = ''"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Sort and Availability Toggle -->
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <!-- Availability Filter -->
              <div class="flex items-center gap-2 w-full sm:w-auto">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</label>
                <USelectMenu 
                  v-model="availabilityFilter"
                  :options="availabilityOptions"
                  value-attribute="value"
                  option-attribute="label"
                  class="w-full sm:min-w-[140px]"
                />
              </div>

              <!-- Sort Options -->
              <div class="flex items-center gap-2 w-full sm:w-auto">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">Sort:</label>
                <USelectMenu 
                  v-model="sortBy"
                  :options="sortOptions"
                  value-attribute="value"
                  option-attribute="label"
                  class="w-full sm:min-w-[160px]"
                />
              </div>

              <!-- View Mode Toggle -->
              <div class="flex flex-row items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button
                  @click="viewMode = 'grid'"
                  :class="[
                    'px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2',
                    viewMode === 'grid'
                      ? 'bg-yellow-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600'
                  ]"
                >
                  <UIcon name="i-heroicons-squares-2x2" class="w-4 h-4" />
                  <span class="hidden sm:inline text-sm">Grid</span>
                </button>
                <button
                  @click="viewMode = 'list'"
                  :class="[
                    'px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2',
                    viewMode === 'list'
                      ? 'bg-yellow-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600'
                  ]"
                >
                  <UIcon name="i-heroicons-list-bullet" class="w-4 h-4" />
                  <span class="hidden sm:inline text-sm">List</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Category Navigation with Alphabetical Order -->
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Browse Categories</h3>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ filteredItemsCount }} items</span>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              <!-- All Items Tile -->
              <button 
                key="all"
                :class="[
                  'group relative px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 text-center border-2',
                  activeCategory === 'all'
                    ? 'bg-yellow-500 text-white border-yellow-500 shadow-lg shadow-yellow-500/25 scale-105'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:scale-102'
                ]" 
                @click="selectCategory('all')"
              >
                <div class="flex flex-col items-center gap-1">
                  <UIcon name="i-heroicons-squares-plus" class="w-5 h-5" />
                  <span>All Items</span>
                  <span class="text-xs opacity-75">({{ totalItemsCount }})</span>
                </div>
              </button>

              <!-- More Tile -->
              <button 
                key="more"
                :class="[
                  'group relative px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 text-center border-2',
                  'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:scale-102'
                ]" 
                @click="isCategoryModalOpen = true"
              >
                <div class="flex flex-col items-center gap-1">
                  <UIcon name="i-heroicons-ellipsis-horizontal" class="w-5 h-5" />
                  <span>More</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Active Filters Display -->
          <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-funnel" class="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span class="text-sm font-medium text-yellow-800 dark:text-yellow-200">Active Filters:</span>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <UBadge v-if="searchQuery" color="yellow" variant="soft" class="cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors" @click="searchQuery = ''">
                <UIcon name="i-heroicons-magnifying-glass" class="w-3 h-3 mr-1" />
                "{{ searchQuery }}"
                <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
              </UBadge>
              
              <UBadge v-if="availabilityFilter !== 'all'" color="yellow" variant="soft" class="cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors" @click="availabilityFilter = 'all'">
                <UIcon name="i-heroicons-eye" class="w-3 h-3 mr-1" />
                {{ availabilityOptions.find(opt => opt.value === availabilityFilter)?.label }}
                <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
              </UBadge>
              
              <UBadge v-if="sortBy !== 'name'" color="yellow" variant="soft" class="cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors" @click="sortBy = 'name'">
                <UIcon name="i-heroicons-bars-arrow-up" class="w-3 h-3 mr-1" />
                {{ sortOptions.find(opt => opt.value === sortBy)?.label }}
                <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
              </UBadge>
            </div>
            
            <UButton color="yellow" variant="ghost" size="sm" @click="clearAllFilters" class="ml-auto">
              <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-1" />
              Reset All
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
                class="menu-card transition-all duration-500 transform hover:scale-105 cursor-pointer"
                :style="{ animationDelay: `${index * 100}ms` }" @click="() => showItemDetails(item)">
                <!-- Square Menu Item Card -->
                <UCard
                  class="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-0 h-full flex flex-col"
                  :class="{ 'opacity-50 pointer-events-none': !item.isAvailable }">
                  <template #header>
                    <div class="relative overflow-hidden aspect-square">
                      <NuxtImg 
                        :src="getImageUrl(item) || '/images/default-placeholder.jpg'" 
                        class="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110" 
                        :alt="item.name" 
                        format="webp" 
                        quality="75" 
                        loading="lazy" 
                        :placeholder="[400, 400, 75]" />

                      <!-- Badges -->
                      <div class="absolute top-3 left-3 flex flex-col gap-2">
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
                      <!-- Price Badge -->
                      <div v-if="item.price && item.price > 0" class="absolute top-3 right-3">
                        <UBadge color="yellow" variant="solid" class="font-bold text-sm">
                          ${{ item.price }}
                        </UBadge>
                      </div>
                    </div>
                  </template>

                  <div class="p-0 flex flex-col flex-grow">
                    <h3 class="text-lg font-semibold mb-2 line-clamp-2 flex-grow" 
                        :class="item.isAvailable ? 'text-gray-900 dark:text-white' : 'text-red-600 dark:text-red-400'">
                      {{ item.name }}
                    </h3>
                  </div>
                  
                </UCard>
              </div>
            </div>

            <!-- List View -->
            <div v-else class="space-y-4">
              <div v-for="(item, index) in paginatedItems(category).items" :key="item.id"
                class="menu-card transition-all duration-500 cursor-pointer"
                :style="{ animationDelay: `${index * 100}ms` }" @click="() => showItemDetails(item)">
                <UCard class="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-0"
                  :class="{ 'opacity-50 pointer-events-none': !item.isAvailable }">
                  <div class="flex flex-col sm:flex-row">
                    <!-- Image -->
                    <div class="sm:w-48 relative overflow-hidden">
                      <NuxtImg 
                        :src="getImageUrl(item) || '/images/menu/menuItemDefault.jpg'" 
                        class="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110" 
                        :alt="item.name" 
                        format="webp" 
                        quality="75" 
                        loading="lazy" 
                        :placeholder="[400, 200, 75]" />

                      <!-- Badges -->
                      <div class="absolute top-3 left-3 flex flex-col gap-2">
                        <UBadge v-if="!item.isAvailable" color="gray" variant="solid" class="font-semibold text-xs">
                          Sold Out
                        </UBadge>
                      </div>
                    </div>

                    <!-- Content -->
                    <div class="flex-1 p-6">
                      <div class="flex justify-between items-start mb-4">
                        <div class="flex-1">
                          <h3 class="text-xl font-bold mb-2" 
                              :class="item.isAvailable ? 'text-gray-900 dark:text-white' : 'text-red-600 dark:text-red-400'">
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
                          <p v-if="item.price && item.price > 0" class="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
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
            <!-- Modern Pagination with Icons -->
            <div v-if="category.items?.length > itemsPerPage" class="flex flex-col items-center mt-12 space-y-4">
              <div class="flex items-center justify-center space-x-1 mx-4">
                <!-- Previous Button -->
                <button 
                  @click="updateCategoryPage(category.id, paginatedItems(category).currentPage - 1)"
                  :disabled="!paginatedItems(category).hasPrevPage"
                  :class="[
                    'flex items-center justify-center w-10 h-10 rounded-xl border-2 transition-all duration-200',
                    paginatedItems(category).hasPrevPage
                      ? 'border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-600 hover:border-yellow-600 shadow-md hover:shadow-lg'
                      : 'border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  ]"
                >
                  <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
                </button>

                <!-- Page Numbers -->
                <div class="flex items-center space-x-1 mx-4">
                  <template v-for="page in getPageNumbers(paginatedItems(category))" :key="page">
                    <button
                      v-if="page !== '...'"
                      @click="updateCategoryPage(category.id, page)"
                      :class="[
                        'flex items-center justify-center w-10 h-10 rounded-xl border-2 transition-all duration-200 font-semibold',
                        page === paginatedItems(category).currentPage
                          ? 'border-yellow-500 bg-yellow-500 text-white shadow-md'
                          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                      ]"
                    >
                      {{ page }}
                    </button>
                    <span v-else class="px-2 text-gray-400">...</span>
                  </template>
                </div>

                <!-- Next Button -->
                <button 
                  @click="updateCategoryPage(category.id, paginatedItems(category).currentPage + 1)"
                  :disabled="!paginatedItems(category).hasNextPage"
                  :class="[
                    'flex items-center justify-center w-10 h-10 rounded-xl border-2 transition-all duration-200',
                    paginatedItems(category).hasNextPage
                      ? 'border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-600 hover:border-yellow-600 shadow-md hover:shadow-lg'
                      : 'border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  ]"
                >
                  <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
                </button>
              </div>

              <!-- Page Info -->
              <div class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <UIcon name="i-heroicons-document-text" class="w-4 h-4" />
                <span>
                  Showing {{ ((paginatedItems(category).currentPage - 1) * itemsPerPage) + 1 }}-{{ Math.min(paginatedItems(category).currentPage * itemsPerPage, paginatedItems(category).totalItems) }} 
                  of {{ paginatedItems(category).totalItems }} items
                </span>
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
                <NuxtImg
                  :src="selectedItem?.images?.[0] || '/images/menu/menuItemDefault.jpg'"
                  class="w-full h-48 lg:h-64 object-cover"
                  :alt="selectedItem?.name || 'Default Menu Item'"
                />
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
                  <UBadge :color="selectedItem.isAvailable ? 'green' : 'red'" variant="subtle">
                    {{ selectedItem.isAvailable ? "Available" : "Not Available" }}
                  </UBadge>
                </div>
              </div>

              <!-- Price and View Details -->
              <div class="lg:text-right">
                <div v-if="selectedItem.price && selectedItem.price > 0" class="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
                  ${{ selectedItem.price }}
                </div>
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

    <!-- Category Modal -->
    <UModal v-model="isCategoryModalOpen" class="z-50">
      <div class="max-w-4xl w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Categories</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button 
            v-for="category in sortedCategories" 
            :key="category.id"
            :class="[
              'group relative px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 text-left border-2',
              activeCategory === category.id
                ? 'bg-yellow-500 text-white border-yellow-500 shadow-lg shadow-yellow-500/25 scale-105'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:scale-102'
            ]" 
            @click="() => { selectCategory(category.id); isCategoryModalOpen = false; }"
          >
            <div class="flex items-center gap-3">
              <UIcon :name="getCategoryIcon(category.id)" class="w-5 h-5 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <span class="font-medium text-base">{{ category.name }}</span>
                <div class="text-xs opacity-75 mt-1">({{ category.items?.length || 0 }} items)</div>
              </div>
            </div>
          </button>
        </div>
        <div class="text-right mt-6">
          <UButton color="yellow" variant="outline" @click="isCategoryModalOpen = false">Close</UButton>
        </div>
      </div>
    </UModal>
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
const activeCategory = ref("all");
const searchQuery = ref("");
const sortBy = ref("name");
const availabilityFilter = ref("all");
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

// Filter and sort options
const availabilityOptions = [
  { label: "All Items", value: "all" },
  { label: "Available Only", value: "available" },
  { label: "Sold Out Only", value: "sold-out" }
];

const sortOptions = [
  { label: "Name (A-Z)", value: "name" },
  { label: "Name (Z-A)", value: "name-desc" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
];


// Modal
// Modal
const isModalOpen = ref(false);
const selectedItem = ref<MenuItem | null>(null);
const carouselIndex = ref(0);
let carouselInterval: NodeJS.Timeout | null = null;

// Category Modal
const isCategoryModalOpen = ref(false);

// Computed properties
const categories = computed<MenuCategory[]>(() =>
  Array.isArray(menuCategories.value) ? menuCategories.value : []
);

// Sort categories by display_order (admin-defined order) with fallback to alphabetical
const sortedCategories = computed(() => {
  const regularCategories: MenuCategory[] = [];
  const dailySpecials: MenuCategory[] = [];
  
  // Define day order for daily specials
  const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Separate regular categories from daily specials
  categories.value.forEach(category => {
    const categoryName = category.name.toLowerCase();
    const isDailySpecial = categoryName.includes('special') && 
                          dayOrder.some(day => categoryName.includes(day));
    
    if (isDailySpecial) {
      dailySpecials.push(category);
    } else {
      regularCategories.push(category);
    }
  });
  
  // Sort regular categories by display_order (ascending), fallback to alphabetical
  regularCategories.sort((a, b) => {
    const orderA = a.display_order ?? 999999;
    const orderB = b.display_order ?? 999999;
    
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    
    // If display_order is the same, sort alphabetically
    return a.name.localeCompare(b.name, 'en', { 
      numeric: true, 
      sensitivity: 'base',
      ignorePunctuation: true,
      caseFirst: 'lower'
    });
  });
  
  // Sort daily specials by day order
  dailySpecials.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    
    const aDayIndex = dayOrder.findIndex(day => aName.includes(day));
    const bDayIndex = dayOrder.findIndex(day => bName.includes(day));
    
    // If both have day names, sort by day order
    if (aDayIndex !== -1 && bDayIndex !== -1) {
      return aDayIndex - bDayIndex;
    }
    
    // If only one has a day name, put it first
    if (aDayIndex !== -1) return -1;
    if (bDayIndex !== -1) return 1;
    
    // If neither has a day name, sort alphabetically
    return a.name.localeCompare(b.name, 'en', { 
      numeric: true, 
      sensitivity: 'base',
      ignorePunctuation: true,
      caseFirst: 'lower'
    });
  });
  
  // Return regular categories first, then daily specials
  return [...regularCategories, ...dailySpecials];
});

// Get all items for counting
const allItems = computed(() => {
  return categories.value.reduce((acc, category) => {
    return acc.concat(category.items || []);
  }, [] as MenuItem[]);
});

// Total items count
const totalItemsCount = computed(() => {
  return allItems.value.filter(item => item.isVisible === true).length;
});

// Filtered items count
const filteredItemsCount = computed(() => {
  if (activeCategory.value === 'all') {
    return allItems.value.filter(item => {
      let passesFilter = item.isVisible === true;
      
      // Apply availability filter
      if (availabilityFilter.value === 'available') {
        passesFilter = passesFilter && item.isAvailable;
      } else if (availabilityFilter.value === 'sold-out') {
        passesFilter = passesFilter && !item.isAvailable;
      }
      
      // Apply search filter
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        passesFilter = passesFilter && item.name.toLowerCase().includes(query);
      }
      
      return passesFilter;
    }).length;
  } else {
    const category = categories.value.find(cat => cat.id === activeCategory.value);
    if (!category) return 0;
    
    return category.items.filter(item => {
      let passesFilter = item.isVisible === true;
      
      // Apply availability filter
      if (availabilityFilter.value === 'available') {
        passesFilter = passesFilter && item.isAvailable;
      } else if (availabilityFilter.value === 'sold-out') {
        passesFilter = passesFilter && !item.isAvailable;
      }
      
      // Apply search filter
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        passesFilter = passesFilter && item.name.toLowerCase().includes(query);
      }
      
      return passesFilter;
    }).length;
  }
});

// Debug watch for categories
watch(categories, (newCategories) => {
  newCategories.forEach((cat, index) => {
  });
}, { immediate: true });



const hasActiveFilters = computed(() => {
  return (
    searchQuery.value ||
    availabilityFilter.value !== "all" ||
    sortBy.value !== "name"
  );
});

const filteredCategories = computed(() => {
  if (activeCategory.value === 'all') {
    // Use sortedCategories to ensure daily specials are at the bottom in weekday order
    const regularCategories: MenuCategory[] = [];
    const dailySpecials: MenuCategory[] = [];
    const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    sortedCategories.value.forEach(category => {
      const categoryName = category.name.toLowerCase();
      const isDailySpecial = categoryName.includes('special') && dayOrder.some(day => categoryName.includes(day));
      let items = category.items.filter(item => item.isVisible === true);

      // Apply availability filter
      if (availabilityFilter.value === 'available') {
        items = items.filter(item => item.isAvailable);
      } else if (availabilityFilter.value === 'sold-out') {
        items = items.filter(item => !item.isAvailable);
      }

      // Apply search filter
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        items = items.filter(item => item.name.toLowerCase().includes(query));
      }

      // Apply sorting
      items = sortItems(items);

      if (items.length > 0) {
        if (isDailySpecial) {
          dailySpecials.push({ ...category, items });
        } else {
          regularCategories.push({ ...category, items });
        }
      }
    });

    // Return regular categories first, then daily specials
    return [...regularCategories, ...dailySpecials];
  } else {
    // Show specific category
    const category = categories.value.find(cat => cat.id === activeCategory.value);
    if (!category) return [];

    let items = category.items.filter(item => item.isVisible === true);

    // Apply availability filter
    if (availabilityFilter.value === 'available') {
      items = items.filter(item => item.isAvailable);
    } else if (availabilityFilter.value === 'sold-out') {
      items = items.filter(item => !item.isAvailable);
    }

    // Apply search filter
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase();
      items = items.filter(item => item.name.toLowerCase().includes(query));
    }

    // Apply sorting
    items = sortItems(items);

    return [{ ...category, items }];
  }
});

// Methods
const sortItems = (items: MenuItem[]) => {
  // First, separate available and sold out items
  const availableItems = items.filter(item => item.isAvailable);
  const soldOutItems = items.filter(item => !item.isAvailable);

  // Enhanced sort function with admin-defined order support
  const sortFunction = (a: MenuItem, b: MenuItem) => {
    let primaryComparison = 0;
    
    switch (sortBy.value) {
      case "name-desc":
        primaryComparison = b.name.localeCompare(a.name, 'en', { 
          numeric: true, 
          sensitivity: 'base',
          ignorePunctuation: true,
          caseFirst: 'lower'
        });
        break;
      case "price-low":
        primaryComparison = a.price - b.price;
        break;
      case "price-high":
        primaryComparison = b.price - a.price;
        break;
      default: // "name" - use display_order first, then alphabetical
        // Sort by display_order (ascending) if both items have it
        const orderA = a.display_order ?? 999999;
        const orderB = b.display_order ?? 999999;
        
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        
        // If display_order is the same (or both undefined), sort alphabetically
        return a.name.localeCompare(b.name, 'en', { 
          numeric: true, 
          sensitivity: 'base',
          ignorePunctuation: true,
          caseFirst: 'lower'
        });
    }
    
    // If primary sort criteria are equal, use display_order as tie-breaker
    if (primaryComparison === 0) {
      const orderA = a.display_order ?? 999999;
      const orderB = b.display_order ?? 999999;
      return orderA - orderB;
    }
    
    return primaryComparison;
  };

  availableItems.sort(sortFunction);
  soldOutItems.sort(sortFunction);

  // Return available items first, then sold out items (unless filtering for sold out only)
  return availabilityFilter.value === 'sold-out' ? soldOutItems : [...availableItems, ...soldOutItems];
};

const getCategoryIcon = (categoryId: string) => {
  const icons = {
    'appetizers': 'i-heroicons-fire',
    'salads': 'i-heroicons-leaf',
    'burgers': 'i-heroicons-building-storefront',
    'mains': 'i-heroicons-star',
    'desserts': 'i-heroicons-cake',
    'beverages': 'i-heroicons-beaker',
    'daily-specials': 'i-heroicons-sparkles',
    'all-day-menu': 'i-heroicons-clock',
    'default': 'i-heroicons-squares-2x2'
  };
  return icons[categoryId as keyof typeof icons] || icons.default;
};

const getPageNumbers = (paginationData: any) => {
  const { currentPage, totalPages } = paginationData;
  const pages: (number | string)[] = [];
  
  if (totalPages <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);
    
    if (currentPage > 4) {
      pages.push('...');
    }
    
    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (currentPage < totalPages - 3) {
      pages.push('...');
    }
    
    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
  }
  
  return pages;
};

const getImageUrl = (item: MenuItem) => {
  // Check if item has valid images array with at least one image
  if (item.images && Array.isArray(item.images) && item.images.length > 0) {
    // Return the first valid image URL
    const firstImage = item.images[0];
    if (firstImage && typeof firstImage === 'string' && firstImage.trim()) {
      return firstImage;
    }
  }
  
  // Check if item has a single image property
  if (item.image && typeof item.image === 'string' && item.image.trim()) {
    return item.image;
  }
  
  // Return fallback image
  return "/images/menu/menuItemDefault.jpg";
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

  return {
    items,
    totalItems,
    totalPages,
    currentPage: validCurrentPage,
    hasNextPage: validCurrentPage < totalPages,
    hasPrevPage: validCurrentPage > 1
  };
};

// Function to select a category and reset pagination
const selectCategory = (categoryId: string) => {
  activeCategory.value = categoryId;
  showDropdown.value = false;
  // Reset pagination for the new category
  if (categoryPages.value) {
    categoryPages.value[categoryId] = 1;
  }
};

// Function to handle page change for a specific category
const updateCategoryPage = (categoryId: string, page: number | string) => {
  // Convert string to number for page numbers
  const pageNum = typeof page === 'string' ? parseInt(page) : page;
  
  console.log(`Updating page for category ${categoryId} to page ${pageNum}`);
  console.log('Before update:', JSON.stringify(categoryPages.value));
  
  // Find the category to determine max pages
  const category = categories.value.find(cat => cat.id === categoryId);
  let maxPage = 1;
  
  if (category) {
    const totalItems = category.items.length;
    maxPage = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }
  
  // Ensure page is within valid range
  const validPage = Math.min(Math.max(1, pageNum), maxPage);
  
  // Update the page
  categoryPages.value = {
    ...categoryPages.value,
    [categoryId]: validPage
  };
  
  console.log('After update:', JSON.stringify(categoryPages.value));
  console.log(`Page set to ${validPage} (requested: ${pageNum}, max: ${maxPage})`);
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
  availabilityFilter.value = "all";
  sortBy.value = "name";
  activeCategory.value = "all";
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
watch([activeCategory, searchQuery, availabilityFilter, sortBy], () => {
  // Reset all category pages to 1 when filters change
  categoryPages.value = {};
  // Also reset for "all" category
  categoryPages.value["all"] = 1;
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

  // Check for category parameter from URL
  const route = useRoute();
  const categoryParam = route.query.category as string;
  
  // Set category from URL parameter or default to "all"
  if (categoryParam && categories.value.some(cat => cat.id === categoryParam)) {
    activeCategory.value = categoryParam;
  } else {
    activeCategory.value = "all";
  }
  
  // Initialize pagination for all categories
  categories.value.forEach(category => {
    categoryPages.value[category.id] = 1;
  });
  
  // Also initialize pagination for "all" category
  categoryPages.value["all"] = 1;

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

/* Card Effects */
.menu-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Floating animation for cards */
@keyframes cardFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

.menu-card.floating {
  animation: cardFloat 3s ease-in-out infinite;
}

/* Loading state animation */
.menu-card.loading {
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
