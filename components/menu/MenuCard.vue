<template>
  <div>
    <!-- Category Title -->
    <h2 v-if="category" class="text-2xl font-bold text-gray-800 mb-6">
      {{ category }}
    </h2>

    <!-- Single Item Display -->
    <UCard
      v-if="item"
      class="group cursor-pointer hover:shadow-xl transition-all duration-300"
      @click="() => showItemDetails(item)"
    >
      <template #header>
        <div class="relative overflow-hidden rounded-t-lg">
          <NuxtImg
            :src="item.image"
            class="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
            :alt="item.name"
            format="webp"
            quality="80"
          />
        </div>
      </template>

      <div class="text-center p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">
          {{ item.name }}
        </h3>
        <UBadge color="yellow" variant="solid" class="text-lg">
          ${{ item.price }}
        </UBadge>
      </div>
    </UCard>

    <!-- Menu Grid -->
    <div v-else-if="items" class="space-y-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="menuItem in paginatedItems"
          :key="menuItem.id"
          class="group cursor-pointer hover:shadow-xl transition-all duration-300"
          @click="() => showItemDetails(menuItem)"
        >
          <template #header>
            <div class="relative overflow-hidden rounded-t-lg">
              <UImage
                :src="menuItem.image"
                class="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                :alt="menuItem.name"
              />
            </div>
          </template>

          <div class="text-center p-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              {{ menuItem.name }}
            </h3>
            <UBadge color="yellow" variant="solid" class="text-lg">
              ${{ menuItem.price }}
            </UBadge>
          </div>
        </UCard>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <UPagination
          v-model="currentPage"
          :total="totalPages"
          :ui="{
            wrapper: 'flex items-center gap-1',
            base: 'flex items-center justify-center min-w-[32px] h-8 px-3 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
            default: {
              active: 'bg-yellow-500 text-white hover:bg-yellow-600',
              inactive: 'text-gray-600 hover:bg-gray-100',
            },
          }"
        />
      </div>
    </div>

    <!-- Item Details Modal -->
    <UModal v-model="isModalOpen">
      <UCard v-if="selectedItem">
        <template #header>
          <div class="relative overflow-hidden rounded-t-lg">
            <UImage
              :src="selectedItem.image"
              class="w-full h-64 object-cover"
              :alt="selectedItem.name"
            />
          </div>
        </template>

        <div class="p-6 space-y-4">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-800">
              {{ selectedItem.name }}
            </h2>
            <UBadge color="yellow" variant="solid" class="text-xl">
              ${{ selectedItem.price }}
            </UBadge>
          </div>

          <p class="text-gray-600">{{ selectedItem.description }}</p>

          <div v-if="selectedItem.ingredients" class="space-y-2">
            <h3 class="font-semibold text-gray-700">Ingredients:</h3>
            <ul class="list-disc list-inside text-gray-600">
              <li
                v-for="ingredient in selectedItem.ingredients"
                :key="ingredient"
              >
                {{ ingredient }}
              </li>
            </ul>
          </div>

          <div v-if="selectedItem.allergens" class="space-y-2">
            <h3 class="font-semibold text-gray-700">Allergens:</h3>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="allergen in selectedItem.allergens"
                :key="allergen"
                color="red"
                variant="subtle"
              >
                {{ allergen }}
              </UBadge>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end">
            <UButton color="gray" @click="closeModal">Close</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["item", "items", "category"]);

// Pagination
const itemsPerPage = 6;
const currentPage = ref(1);
const totalPages = computed(() =>
  Math.ceil((props.items?.length || 0) / itemsPerPage)
);

const paginatedItems = computed(() => {
  if (!props.items) return [];
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.items.slice(start, end);
});

// Modal
import type { MenuItem } from "~/types/menu";

const isModalOpen = ref(false);
const selectedItem = ref<MenuItem | null>(null);

const showItemDetails = (item: MenuItem) => {
  selectedItem.value = item;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedItem.value = null;
};
</script>
