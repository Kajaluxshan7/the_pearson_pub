<template>
  <div class="menu-container">
    <h2 class="menu-title">Our Menu</h2>
    <div class="category-buttons">
      <button
        v-for="category in categories"
        :key="category"
        @click="filterCategory(category)"
        :class="{ active: selectedCategory === category }"
      >
        {{ category }}
      </button>
    </div>

    <div class="menu-card">
      <div class="menu-grid">
        <ul class="menu-list" v-for="(column, index) in splitMenu" :key="index">
          <li
            v-for="item in column"
            :key="item.id"
            class="menu-item"
            @click="showItemDetails(item)"
          >
            <img :src="item.image" :alt="item.name" class="menu-image" />
            <div class="menu-details">
              <h3 class="menu-name">{{ item.name }}</h3>
              <p class="menu-category">{{ item.category }}</p>
              <p class="menu-price">${{ item.price }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          &#11144;
        </button>
        <span
          v-for="page in visibleDots"
          :key="page"
          class="dot"
          :class="{ active: currentPage === page }"
          >•</span
        >
        <button @click="nextPage" :disabled="currentPage === totalPages">
          &#11146;
        </button>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">×</button>
      <img
        :src="selectedItem.image"
        :alt="selectedItem.name"
        class="modal-image"
        @click="previewImage"
      />
      <h2>{{ selectedItem.name }}</h2>
      <p class="model-category">Category: {{ selectedItem.category }}</p>
      <p class="model-price">Price: ${{ selectedItem.price }}</p>
      <p class="modal-description">
        This is a delicious {{ selectedItem.name }} served fresh and perfect for
        your cravings!
      </p>
    </div>
    <div
      v-if="showImagePreview"
      class="image-preview-overlay"
      @click.self="closeImagePreview"
    >
      <button class="close-preview-btn" @click="closeImagePreview">×</button>
      <img :src="selectedItem.image" class="full-image" />
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      selectedCategory: "All",
      currentPage: 1,
      itemsPerPage: 10,
      selectedItem: null,
      showModal: false,
      showImagePreview: false,

      menu: [
        {
          id: 1,
          name: "Margherita Pizza",
          category: "Food",
          price: 12.99,
          image:
            "/images/menu/76b52f7a-dec8-4ca5-bd44-ca6c53200ae6-removebg-preview.png",
        },
        {
          id: 2,
          name: "Cheeseburger",
          category: "Food",
          price: 10.99,
          image: "/images/menu/76b52f7a-dec8-4ca5-bd44-ca6c53200ae6.jpeg",
        },
        {
          id: 3,
          name: "Pasta Alfredo",
          category: "Food",
          price: 14.99,
          image: "/menu/pasta.jpg",
        },
        {
          id: 4,
          name: "Mojito",
          category: "Drink",
          price: 6.99,
          image: "/menu/mojito.jpg",
        },
        {
          id: 5,
          name: "Espresso",
          category: "Drink",
          price: 4.99,
          image: "/menu/espresso.jpg",
        },
        {
          id: 6,
          name: "Tacos",
          category: "Food",
          price: 9.99,
          image: "/menu/tacos.jpg",
        },
        {
          id: 7,
          name: "Sushi",
          category: "Food",
          price: 16.99,
          image: "/menu/sushi.jpg",
        },
        {
          id: 8,
          name: "Lemonade",
          category: "Drink",
          price: 3.99,
          image: "/menu/lemonade.jpg",
        },
        {
          id: 9,
          name: "Steak",
          category: "Food",
          price: 22.99,
          image: "/menu/steak.jpg",
        },
        {
          id: 10,
          name: "Cappuccino",
          category: "Drink",
          price: 5.99,
          image: "/menu/cappuccino.jpg",
        },
        {
          id: 11,
          name: "Salad",
          category: "Food",
          price: 7.99,
          image: "/menu/salad.jpg",
        },
        {
          id: 12,
          name: "Chicken Wings",
          category: "Food",
          price: 11.99,
          image: "/menu/wings.jpg",
        },
        {
          id: 13,
          name: "Wine",
          category: "Drink",
          price: 12.99,
          image: "/menu/wine.jpg",
        },
        {
          id: 14,
          name: "Pancakes",
          category: "Food",
          price: 8.99,
          image: "/menu/pancakes.jpg",
        },
        {
          id: 15,
          name: "Margherita Pizza",
          category: "Food",
          price: 12.99,
          image: "/menu/pizza.jpg",
        },
        {
          id: 16,
          name: "Cheeseburger",
          category: "Food",
          price: 10.99,
          image: "/menu/burger.jpg",
        },
        {
          id: 17,
          name: "Pasta Alfredo",
          category: "Food",
          price: 14.99,
          image: "/menu/pasta.jpg",
        },
        {
          id: 18,
          name: "Mojito",
          category: "Drink",
          price: 6.99,
          image: "/menu/mojito.jpg",
        },
        {
          id: 19,
          name: "Espresso",
          category: "Drink",
          price: 4.99,
          image: "/menu/espresso.jpg",
        },
        {
          id: 20,
          name: "Tacos",
          category: "Food",
          price: 9.99,
          image: "/menu/tacos.jpg",
        },
        {
          id: 21,
          name: "Sushi",
          category: "Food",
          price: 16.99,
          image: "/menu/sushi.jpg",
        },
        {
          id: 22,
          name: "Lemonade",
          category: "Drink",
          price: 3.99,
          image: "/menu/lemonade.jpg",
        },
        {
          id: 23,
          name: "Steak",
          category: "Food",
          price: 22.99,
          image: "/menu/steak.jpg",
        },
        {
          id: 24,
          name: "Cappuccino",
          category: "Drink",
          price: 5.99,
          image: "/menu/cappuccino.jpg",
        },
        {
          id: 25,
          name: "Salad",
          category: "Food",
          price: 7.99,
          image: "/menu/salad.jpg",
        },
        {
          id: 26,
          name: "Chicken Wings",
          category: "mixed",
          price: 11.99,
          image: "/menu/wings.jpg",
        },
        {
          id: 27,
          name: "Wine",
          category: "Drink",
          price: 12.99,
          image: "/menu/wine.jpg",
        },
        {
          id: 28,
          name: "Pancakes",
          category: "Food",
          price: 8.99,
          image: "/menu/pancakes.jpg",
        },
      ],
    };
  },
  computed: {
    filteredMenu() {
      let menuItems =
        this.selectedCategory === "All"
          ? this.menu
          : this.menu.filter((item) => item.category === this.selectedCategory);
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return menuItems.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(
        (this.selectedCategory === "All"
          ? this.menu.length
          : this.menu.filter((item) => item.category === this.selectedCategory)
              .length) / this.itemsPerPage
      );
    },
    splitMenu() {
      const mid = Math.ceil(this.filteredMenu.length / 2);
      return [this.filteredMenu.slice(0, mid), this.filteredMenu.slice(mid)];
    },
    categories() {
      const allCategories = this.menu.map((item) => item.category);
      const uniqueCategories = ["All", ...new Set(allCategories)];
      return uniqueCategories;
    },
    visibleDots() {
      const dots = [];
      const maxVisible = 4;

      if (this.totalPages <= maxVisible) {
        for (let i = 1; i <= this.totalPages; i++) {
          dots.push(i);
        }
      } else {
        if (this.currentPage <= 2) {
          dots.push(1, 2, 3, 4);
        } else if (this.currentPage >= this.totalPages - 1) {
          dots.push(
            this.totalPages - 3,
            this.totalPages - 2,
            this.totalPages - 1,
            this.totalPages
          );
        } else {
          dots.push(
            this.currentPage - 1,
            this.currentPage,
            this.currentPage + 1,
            this.currentPage + 2
          );
        }
      }

      return dots.filter((page) => page > 0 && page <= this.totalPages);
    },
  },
  methods: {
    filterCategory(category) {
      this.selectedCategory = category;
      this.currentPage = 1;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    showItemDetails(item) {
      this.selectedItem = item;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedItem = null;
    },
    previewImage() {
      this.showImagePreview = true;
    },
    closeImagePreview() {
      this.showImagePreview = false;
    },
  },
};
</script>
  
  <style>
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
  background: #e67e22;
  color: white;
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
  height: 700px;
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
  color: #e67e22;
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
  background: #e67e22;
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
  /* font-weight: bold; */
}

.modal-overlay {
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
}
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  max-width: 500px;
  width: 90%;
}
.modal-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 10px;
  cursor: pointer;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}
.modal-description {
  margin-top: 15px;
  color: #444;
}
.image-preview-overlay {
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
}
.full-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
  box-shadow: 0 0 20px #000;
  transition: transform 0.3s ease;
}
.close-preview-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  background: transparent;
  border: none;
  color: white;
  font-size: 2em;
  cursor: pointer;
  z-index: 1200;
}
.model-category,
.model-price {
  color: black;
}

</style>
  