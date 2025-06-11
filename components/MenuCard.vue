<template>
  <div>
    <!-- Single Item Display (if needed) -->
    <div
      class="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      @click="() => showItemDetails(item)"
      v-if="item"
    >
      <div
        class="relative flex flex-col items-center p-6 rounded-xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
      >
        <UAvatar
          :src="item.image"
          size="lg"
          class="w-24 h-24 mb-4 transform transition-transform duration-300 group-hover:scale-110"
        />
        <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ item.name }}</h3>
        <p class="text-amber-600 font-medium">${{ item.price }}</p>
      </div>
    </div>

    <!-- Menu Grid -->
    <UCard class="bg-white/50 backdrop-blur-sm mt-8 p-6 rounded-2xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(pair, idx) in paginatedMenuPairs"
          :key="idx"
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div
            v-for="(menuItem, colIdx) in pair"
            :key="colIdx"
            v-if="menuItem"
            @click="() => showItemDetails(menuItem)"
            class="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div
              class="relative flex flex-col items-center p-6 rounded-xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <UAvatar
                :src="menuItem.image"
                size="lg"
                class="w-24 h-24 mb-4 transform transition-transform duration-300 group-hover:scale-110"
              />
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ menuItem.name }}</h3>
              <p class="text-amber-600 font-medium">${{ menuItem.price }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-center space-x-4 mt-8">
        <UButton
          icon="i-heroicons-chevron-left"
          @click="prevPage"
          :disabled="currentPage === 1"
          color="amber"
          variant="ghost"
          class="transition-transform duration-300 hover:-translate-x-1"
        />

        <div class="flex items-center space-x-2">
          <UButton
            v-for="page in totalPages"
            :key="page"
            :variant="currentPage === page ? 'solid' : 'ghost'"
            :color="currentPage === page ? 'amber' : 'gray'"
            size="sm"
            class="min-w-[2.5rem]"
            @click="() => goToPage(page)"
          >
            {{ page }}
          </UButton>
        </div>

        <UButton
          icon="i-heroicons-chevron-right"
          @click="nextPage"
          :disabled="currentPage === totalPages"
          color="amber"
          variant="ghost"
          class="transition-transform duration-300 hover:translate-x-1"
        />
      </div>
    </UCard>

    <!-- Item Details Modal -->
    <UModal v-model="showModal" v-if="selectedItem">
      <UCard class="max-w-md mx-auto p-6">
        <div class="flex flex-col items-center space-y-6">
          <UAvatar
            :src="selectedItem?.image"
            size="2xl"
            class="w-32 h-32"
          />
          <div class="text-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              {{ selectedItem?.name }}
            </h2>
            <p class="text-lg font-semibold text-amber-600 mb-4">
              ${{ selectedItem?.price }}
            </p>
            <p class="text-gray-600">
              This is a delicious {{ selectedItem?.name }} served fresh and perfect for your cravings!
            </p>
          </div>
          <div class="flex justify-end w-full">
            <UButton
              color="gray"
              variant="ghost"
              @click="closeModal"
              icon="i-heroicons-x-mark"
            >
              Close
            </UButton>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface MenuItem {
  id: string | number
  name: string
  category: string
  price: number
  image: string
  description?: string
}

// Receive the single item prop if needed
defineProps<{
  item?: MenuItem
}>()

// Sample menu data - replace or pass via props as needed
const menu = ref<MenuItem[]>([
  { id: 1, name: 'Margherita Pizza', category: 'Food', price: 12.99, image: '/images/menu/pizza.png' },
  { id: 2, name: 'Cheeseburger', category: 'Food', price: 10.99, image: '/images/menu/cheeseburger.png' },
  { id: 3, name: 'Pasta Alfredo', category: 'Food', price: 14.99, image: '/images/menu/pasta.png' },
  { id: 4, name: 'Mojito', category: 'Drink', price: 6.99, image: '/images/menu/mojito.png' },
  { id: 5, name: 'Espresso', category: 'Drink', price: 4.99, image: '/images/menu/espresso.png' },
  { id: 6, name: 'Tacos', category: 'Food', price: 9.99, image: '/images/menu/tacos.png' },
  // Add more items as needed
])

const selectedCategory = ref('All')
const currentPage = ref(1)
const itemsPerPage = 6
const showModal = ref(false)
const selectedItem = ref<MenuItem | null>(null)

const filteredMenu = computed(() => {
  return selectedCategory.value === 'All'
    ? menu.value
    : menu.value.filter(item => item.category === selectedCategory.value)
})

const paginatedMenuPairs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  const slicedMenu = filteredMenu.value.slice(start, end)
  const pairs = []
  for (let i = 0; i < slicedMenu.length; i += 2) {
    pairs.push(slicedMenu.slice(i, i + 2))
  }
  return pairs
})

const totalPages = computed(() => Math.ceil(filteredMenu.value.length / itemsPerPage))

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function goToPage(page: number) {
  currentPage.value = page
}

function showItemDetails(item: MenuItem) {
  selectedItem.value = item
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedItem.value = null
}
</script>
