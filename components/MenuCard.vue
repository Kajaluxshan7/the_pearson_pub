<template>
  <div class="menu-container">
    <h2 class="menu-title">Our Menu</h2>
    <div class="category-buttons">
      <UButton
        v-for="category in categories"
        :key="category"
        @click="filterCategory(category)"
        :color="selectedCategory === category ? 'primary' : 'gray'"
        :variant="selectedCategory === category ? 'solid' : 'outline'"
        :class="['capitalize', { active: selectedCategory === category }]"
      >
        {{ category }}
      </UButton>
    </div>

<UCard class="menu-card">
  <table class="menu-table w-full border-collapse">
    <tbody>
      <tr v-for="(pair, idx) in paginatedMenuPairs" :key="idx">
        <td
          v-for="(item, colIdx) in pair"
          :key="colIdx"
          class="menu-table-cell align-middle"
          @click="item && showItemDetails(item)"
          style="cursor:pointer; width: 50%;"
        >
          <div v-if="item" class="flex flex-col items-center justify-center gap-2 py-4">
            <UAvatar :src="item.image" size="xl" class="menu-image" />
            <div class="font-bold text-lg text-center">{{ item.name }}</div>
            <div class="text-[#f9b234] font-semibold text-base text-center">${{ item.price }}</div>
          </div>
        </td>
        <td v-if="pair.length === 1" class="menu-table-cell"></td>
      </tr>
    </tbody>
  </table>
  <div class="pagination">
    <UButton icon="i-heroicons-chevron-left" @click="prevPage" :disabled="currentPage === 1" color="primary" variant="soft" />
    <span
      v-for="page in totalPages"
      :key="page"
      class="dot"
      :class="{ active: currentPage === page }"
      @click="goToPage(page)"
    >•</span>
    <UButton icon="i-heroicons-chevron-right" @click="nextPage" :disabled="currentPage === totalPages" color="primary" variant="soft" />
  </div>
</UCard>

<UModal v-model="showModal" v-if="selectedItem">
  <UCard class="flex flex-col items-center gap-4">
    <UAvatar :src="selectedItem?.image" size="2xl" />
    <h2 class="text-xl font-bold">{{ selectedItem?.name }}</h2>
    <p class="model-price">Price: ${{ selectedItem?.price }}</p>
    <p class="modal-description">
      This is a delicious {{ selectedItem?.name }} served fresh and perfect for your cravings!
    </p>
    <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" class="self-end" @click="closeModal">
      Close
    </UButton>
  </UCard>
</UModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const menu = ref([
  { id: 1, name: 'Margherita Pizza', category: 'rgwer', price: 12.99, image: '/images/menu/76b52f7a-dec8-4ca5-bd44-ca6c53200ae6-removebg-preview.png' },
  { id: 2, name: 'Cheeseburger', category: 'Food', price: 10.99, image: '/images/menu/76b52f7a-dec8-4ca5-bd44-ca6c53200ae6.jpeg' },
  { id: 3, name: 'Pasta Alfredo', category: 'Food', price: 14.99, image: '/menu/pasta.jpg' },
  { id: 4, name: 'Mojito', category: 'Drink', price: 6.99, image: '/menu/mojito.jpg' },
  { id: 5, name: 'Espresso', category: 'Drink', price: 4.99, image: '/menu/espresso.jpg' },
  { id: 6, name: 'Tacos', category: 'Food', price: 9.99, image: '/menu/tacos.jpg' },
  { id: 7, name: 'Sushi', category: 'Food', price: 16.99, image: '/menu/sushi.jpg' },
  { id: 8, name: 'Lemonade', category: 'Drink', price: 3.99, image: '/menu/lemonade.jpg' },
  { id: 9, name: 'Steak', category: 'Food', price: 22.99, image: '/menu/steak.jpg' },
  { id: 10, name: 'Cappuccino', category: 'Drink', price: 5.99, image: '/menu/cappuccino.jpg' },
  { id: 11, name: 'Salad', category: 'Food', price: 7.99, image: '/menu/salad.jpg' },
  { id: 12, name: 'Chicken Wings', category: 'Food', price: 11.99, image: '/menu/wings.jpg' },
  { id: 13, name: 'Wine', category: 'Drink', price: 12.99, image: '/menu/wine.jpg' },
  { id: 14, name: 'Pancakes', category: 'Food', price: 8.99, image: '/menu/pancakes.jpg' },
])

const categories = computed(() => {
  const allCategories = menu.value.map(item => item.category)
  return ['All', ...new Set(allCategories)]
})
const selectedCategory = ref('All')
const currentPage = ref(1)
const itemsPerPage = 6
const showModal = ref(false)
const selectedItem = ref(null)

const filteredMenu = computed(() => {
  return selectedCategory.value === 'All'
    ? menu.value
    : menu.value.filter(item => item.category === selectedCategory.value)
})

const paginatedMenu = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredMenu.value.slice(start, start + itemsPerPage)
})

const paginatedMenuPairs = computed(() => {
  const pairs = []
  for (let i = 0; i < paginatedMenu.value.length; i += 2) {
    pairs.push([
      paginatedMenu.value[i],
      paginatedMenu.value[i + 1] || null
    ])
  }
  return pairs
})

const totalPages = computed(() => Math.ceil(filteredMenu.value.length / itemsPerPage))

function filterCategory(category) {
  selectedCategory.value = category
  currentPage.value = 1
}

function showItemDetails(item) {
  selectedItem.value = item
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedItem.value = null
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function goToPage(page) {
  currentPage.value = page
}
</script>

<style>

.menu-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}
.menu-table-cell {
  height: 150px;
  vertical-align: middle;
  border-bottom: 1px solid #eee;
  min-width: 350px;
  width: 50%;
  text-align: center;
  padding: 0;
}
.menu-table tr:last-child td {
  border-bottom: none;
}
.menu-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0 auto;
}
.menu-container {
  text-align: center;
  padding: 20px;
}
.menu-title {
  font-size: 2em;
  margin-bottom: 20px;
}
.category-buttons {
  margin-bottom: 20px;
}
.category-buttons button {
  padding: 10px 15px;
  margin: 5px;
  border: none;
  cursor: pointer;
  background: #ddd;
  border-radius: 5px;
  font-size: 1em;
}
.category-buttons button.active {
  background: #f9b234;
  color: white;
  font-weight: 550;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.menu-card {
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  max-width: 900px;
  margin: auto;
}
.menu-grid {
  display: flex;
  justify-content: space-between;
}
.menu-list {
  list-style: none;
  padding: 0;
  width: 48%;
  height: 600px;
}
.menu-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}
.menu-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50px;
  margin-right: 15px;
  cursor: pointer;
}
.menu-details {
  flex-grow: 1;
}
.menu-name {
  font-size: 1.2em;
  margin: 5px 0;
}
.menu-category {
  color: gray;
  font-size: 0.9em;
}
.menu-price {
  font-size: 1.1em;
  font-weight: bold;
  color: #f9b234;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.pagination button {
  margin: 0 10px;
  padding: 5px 12px 8px 12px;
  border: none;
  cursor: pointer;
  background: #f9b234;
  color: white;
  font-size: 20px;
  border-radius: 5px;
}
.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.dot {
  margin: 0 5px;
  font-size: 1.5em;
  color: gray;
  cursor: pointer;
  user-select: none;
}
.dot.active {
  color: #e67e22;
  font-size: 1.8em;
  margin-top: -1px;
}
/* .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
} */
/* .modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  max-width: 500px;
  width: 90%;
} */
/* .modal-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 10px;
  cursor: pointer;
} */
/* .close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
} */
.modal-description {
  margin-top: 15px;
  color: #444;
}
/* .image-preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
} */
/* .full-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
  box-shadow: 0 0 20px #000;
  transition: transform 0.3s ease;
} */
/* .close-preview-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  background: transparent;
  border: none;
  color: white;
  font-size: 2em;
  cursor: pointer;
  z-index: 1200;
} */
.model-category,
.model-price {
  color: black;
}
.fade-in-up-enter-active {
  transition: all 0.4s ease;
  height: 600px;
}
.fade-in-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-in-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.menu-item {
  animation: fade-in-scale 0.3s ease forwards;
}
.menu-item:nth-child(1) { animation-delay: 0.05s; }
.menu-item:nth-child(2) { animation-delay: 0.1s; }
.menu-item:nth-child(3) { animation-delay: 0.15s; }
.menu-item:nth-child(4) { animation-delay: 0.2s; }
.menu-item:nth-child(5) { animation-delay: 0.25s; }
@keyframes fade-in-scale {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
/* Force Nuxt UI modal overlay and centering */
.nui-modal-container {
  align-items: center !important;
  justify-content: center !important;
  display: flex !important;
}
.menu-table th, .menu-table td {
  border-bottom: 1px solid #eee;
}
.menu-table th {
  background: #f9f9f9;
  font-weight: 600;
}
.menu-table tr:last-child td {
  border-bottom: none;
}
</style>