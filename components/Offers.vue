<template>
    <div class="offer-container">
      <h2 class="offer-title">Today's Offers</h2>
      <div class="offers-list">
        <div class="offer-card" v-for="offer in offers" :key="offer.id">
          <img :src="offer.image" :alt="offer.name" class="offer-image" />
          <div class="offer-details">
            <h3 class="offer-name">{{ offer.name }}</h3>
            <p class="offer-price">Special Price: ${{ offer.price }}</p>
            <p class="offer-description">{{ offer.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        offers: [
          {
            id: 1,
            name: 'Grilled Salmon',
            price: 15.99,
            description: 'A delicious grilled salmon served with fresh vegetables.',
            image: '/menu/salmon.jpg'
          },
          {
            id: 2,
            name: 'Vegetable Pizza',
            price: 12.99,
            description: 'A healthy and tasty vegetable pizza with a crisp crust.',
            image: '/menu/veg-pizza.jpg'
          },
          {
            id: 3,
            name: 'Spaghetti Bolognese',
            price: 13.99,
            description: 'Classic Italian pasta with a rich meat sauce.',
            image: '/menu/spaghetti.jpg'
          }
        ]
      };
    }
  };
  </script>
  
  <style>
  .offer-container {
    text-align: center;
    padding: 30px;
  }
  
  .offer-title {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #333;
  }
  
  .offers-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .offer-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #fff;
    padding: 20px;
    margin: 15px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .offer-image {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 15px;
  }
  
  .offer-details {
    text-align: center;
  }
  
  .offer-name {
    font-size: 1.8em;
    margin: 5px 0;
    color: #e67e22;
  }
  
  .offer-price {
    font-size: 1.3em;
    font-weight: bold;
    color: #e67e22;
  }
  
  .offer-description {
    font-size: 1em;
    color: #666;
    margin-top: 10px;
  }
  </style>
  