<template>
    <div class="menu-container">
      <h2 class="menu-title">Our Menu</h2>
      <div class="category-buttons">
        <button @click="filterCategory('All')" :class="{ active: selectedCategory === 'All' }">All</button>
        <button @click="filterCategory('Food')" :class="{ active: selectedCategory === 'Food' }">Food</button>
        <button @click="filterCategory('Drink')" :class="{ active: selectedCategory === 'Drink' }">Drinks</button>
      </div>
      <div class="menu-card">
        <div class="menu-grid">
          <ul class="menu-list" v-for="(column, index) in splitMenu" :key="index">
            <li v-for="item in column" :key="item.id" class="menu-item">
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
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedCategory: 'All',
        currentPage: 1,
        itemsPerPage: 10,
        menu: [
          { id: 1, name: 'Margherita Pizza', category: 'Food', price: 12.99, image: '/menu/pizza.jpg' },
          { id: 2, name: 'Cheeseburger', category: 'Food', price: 10.99, image: '/menu/burger.jpg' },
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
          { id: 14, name: 'Pancakes', category: 'Food', price: 8.99, image: '/menu/pancakes.jpg' }
        ]
      };
    },
    computed: {
      filteredMenu() {
        let menuItems = this.selectedCategory === 'All' ? this.menu : this.menu.filter(item => item.category === this.selectedCategory);
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return menuItems.slice(start, start + this.itemsPerPage);
      },
      totalPages() {
        return Math.ceil(this.menu.length / this.itemsPerPage);
      },
      splitMenu() {
        const mid = Math.ceil(this.filteredMenu.length / 2);
        return [this.filteredMenu.slice(0, mid), this.filteredMenu.slice(mid)];
      }
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
      }
    }
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
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: left;
    /* max-width: 600px; */
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
  }
  .menu-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
  .menu-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 15px;
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
    margin-top: 20px;
  }
  .pagination button {
    margin: 5px;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    background: #e67e22;
    color: white;
    border-radius: 5px;
  }
  .pagination button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  </style>
  