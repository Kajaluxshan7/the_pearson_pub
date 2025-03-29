<template>
  <div class="menu-page">
    <!-- Page Header -->
    <section class="menu-header">
      <h1>Our Menu & Entertainment</h1>
      <p>
        Discover our delicious dishes, daily specials, and weekly entertainment events.
      </p>
    </section>

    <!-- Dish Categories Section -->
    <section class="dish-categories">
      <h2>Dish Categories</h2>
      <div class="categories-container">
        <div
          v-for="category in dishCategories"
          :key="category.id"
          class="category-card"
        >
          <img :src="category.image" :alt="category.name" />
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
        </div>
      </div>
    </section>

    <!-- Daily Offers Section -->
    <section class="daily-offers">
      <h2>Daily Offers</h2>
      <div class="offers-container">
        <div
          v-for="offer in dailyOffers"
          :key="offer.id"
          class="offer-card"
        >
          <img :src="offer.image" :alt="offer.name" />
          <div class="offer-details">
            <h3>{{ offer.name }}</h3>
            <p>{{ offer.description }}</p>
            <span class="price">{{ offer.price }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Weekly Entertainment Section -->
    <section class="weekly-entertainment">
      <h2>Weekly Entertainment</h2>
      <div class="entertainment-container">
        <div class="entertainment-item">
          <img src="https://img.icons8.com/ios-filled/100/ff5722/live-music.png" alt="Fridays Live Bands" />
          <div class="entertainment-info">
            <h3>Fridays Live Bands</h3>
            <p>9:30 pm to 1:30 am</p>
          </div>
        </div>
        <div class="entertainment-item">
          <img src="https://img.icons8.com/ios-filled/100/ff5722/live-music.png" alt="Saturdays Live Bands" />
          <div class="entertainment-info">
            <h3>Saturdays Live Bands</h3>
            <p>9:30 pm to 1:30 am</p>
          </div>
        </div>
        <div class="entertainment-item">
          <img src="https://img.icons8.com/ios-filled/100/ff5722/microphone.png" alt="Sundays Karaoke" />
          <div class="entertainment-info">
            <h3>Sundays Karaoke</h3>
            <p>10 pm to 2 am</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Full Menu Section -->
    <section class="full-menu">
      <h2>Full Menu</h2>
      <div class="menu-items">
        <div
          v-for="dish in menuItems"
          :key="dish.id"
          class="menu-item"
        >
          <img :src="dish.image" :alt="dish.name" />
          <div class="dish-info">
            <h3>{{ dish.name }}</h3>
            <p>{{ dish.description }}</p>
            <span class="price">{{ dish.price }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const dishCategories = [
  {
    id: 1,
    name: "Starters",
    description: "Kick off your meal with our delicious starters.",
    image: "https://img.icons8.com/color/96/000000/salad.png",
  },
  {
    id: 2,
    name: "Main Courses",
    description: "Enjoy our wide range of main courses.",
    image: "https://img.icons8.com/color/96/000000/steak.png",
  },
  {
    id: 3,
    name: "Desserts",
    description: "Indulge in our decadent desserts.",
    image: "https://img.icons8.com/color/96/000000/cupcake.png",
  },
  {
    id: 4,
    name: "Beverages",
    description: "Refresh yourself with our selection of drinks.",
    image: "https://img.icons8.com/color/96/000000/cocktail.png",
  },
];

const dailyOffers = [
  {
    id: 1,
    name: "Lunch Special",
    description: "Combo meal at a discounted price.",
    price: "$12.99",
    image: "https://img.icons8.com/color/96/000000/lunch.png",
  },
  {
    id: 2,
    name: "Happy Hour",
    description: "Discounted drinks and appetizers.",
    price: "Special Price",
    image: "https://img.icons8.com/color/96/000000/beer.png",
  },
];

const menuItems = [
  {
    id: 1,
    name: "Grilled Chicken Salad",
    description:
      "Fresh salad with grilled chicken, mixed greens, and a light dressing.",
    price: "$10.99",
    image: "https://img.icons8.com/color/96/000000/salad.png",
  },
  {
    id: 2,
    name: "Pasta Carbonara",
    description:
      "Classic Italian pasta in a creamy carbonara sauce.",
    price: "$14.99",
    image: "https://img.icons8.com/color/96/000000/spaghetti.png",
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a gooey center, served with vanilla ice cream.",
    price: "$6.99",
    image: "https://img.icons8.com/color/96/000000/cake.png",
  },
  // Add additional menu items as needed.
];
</script>

<style scoped>
.menu-page {
  padding: 2rem 0;
}

/* Header Section */
.menu-header {
  text-align: center;
  padding: 2rem 0;
  background: #f9f9f9;
}

.menu-header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.menu-header p {
  font-size: 1.2rem;
  color: #555;
}

/* Section Headings */
section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
  position: relative;
  text-align: center;
}

section h2::after {
  content: "";
  width: 60px;
  height: 4px;
  background-color: #ff5722;
  display: block;
  margin: 0.5rem auto;
}

/* Dish Categories Section */
.categories-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.category-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  width: 280px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  padding-bottom: 1rem;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-card img {
  width: 100%;
  height: 160px;
  object-fit: contain;
  background: #f9f9f9;
  padding: 1rem;
}

.category-card h3 {
  margin: 1rem 0 0.5rem;
  font-size: 1.5rem;
  color: #333;
}

.category-card p {
  padding: 0 1rem 1rem;
  font-size: 1rem;
  color: #777;
}

/* Daily Offers Section */
.offers-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.offer-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  width: 280px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.offer-card:hover {
  transform: translateY(-5px);
}

.offer-card img {
  width: 100%;
  height: 160px;
  object-fit: contain;
  background: #f9f9f9;
  padding: 1rem;
}

.offer-details {
  padding: 1rem;
  text-align: left;
}

.offer-details h3 {
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  color: #333;
}

.offer-details p {
  font-size: 1rem;
  color: #777;
}

.price {
  display: block;
  margin-top: 0.5rem;
  font-size: 1.2rem;
  color: #ff5722;
  font-weight: bold;
}

/* Weekly Entertainment Section */
.weekly-entertainment {
  padding: 2rem 0;
  background: #fafafa;
  text-align: center;
}

.entertainment-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.entertainment-item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  width: 280px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  padding-bottom: 1rem;
}

.entertainment-item:hover {
  transform: translateY(-5px);
}

.entertainment-item img {
  width: 100%;
  height: 160px;
  object-fit: contain;
  background: #f9f9f9;
  padding: 1rem;
}

.entertainment-info {
  padding: 1rem;
  text-align: left;
}

.entertainment-info h3 {
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  color: #333;
}

.entertainment-info p {
  font-size: 1rem;
  color: #777;
}

/* Full Menu Section */
.menu-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.menu-item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  width: 280px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.menu-item:hover {
  transform: translateY(-5px);
}

.menu-item img {
  width: 100%;
  height: 160px;
  object-fit: contain;
  background: #f9f9f9;
  padding: 1rem;
}

.dish-info {
  padding: 1rem;
  text-align: left;
}

.dish-info h3 {
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  color: #333;
}

.dish-info p {
  font-size: 1rem;
  color: #777;
}

@media (max-width: 768px) {
  .categories-container,
  .offers-container,
  .entertainment-container,
  .menu-items {
    flex-direction: column;
    align-items: center;
  }
}
</style>
