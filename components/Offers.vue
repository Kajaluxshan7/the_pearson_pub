<template>
  <div class="offer-container">
    <h2 class="offer-title">Today's Offers</h2>
    <div class="offers-list">
      <div
        v-for="offer in offers"
        :key="offer.id"
        class="offer-card"
        :style="{ backgroundImage: 'url(' + offer.image + ')' }"
      >
      <div class="price-tag">\${{ offer.price }}</div>

        <img :src="offer.image" alt="Offer" class="hover-image" />

        <div class="offer-details">
          <h3 class="offer-name">{{ offer.name }}</h3>
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
          name: "Grilled Salmon",
          price: 15.99,
          description:
            "A delicious grilled salmon served with fresh vegetables.",
          image: "/images/menu/76b52f7a-dec8-4ca5-bd44-ca6c53200ae6.jpeg",
        },
        {
          id: 2,
          name: "Vegetable Pizza",
          price: 12.99,
          description:
            "A healthy and tasty vegetable pizza with a crisp crust.",
          image: "/menu/veg-pizza.jpg",
        },
        {
          id: 3,
          name: "Spaghetti Bolognese",
          price: 13.99,
          description: "Classic Italian pasta with a rich meat sauce.",
          image: "/menu/spaghetti.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
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
  width: 300px;
  height: 400px;
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  background-color: #121212;
  color: #fff;
  padding: 30px 20px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: transform 0.3s ease;
  z-index: 1;
}

.offer-card::before {
  content: "";
  position: absolute;
  top: -35px;
  right: -35px;
  width: 128px;
  height: 128px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  transition: transform 0.5s ease;
  z-index: 0;
}

.offer-card:hover {
  transform: translateY(-5px);
}


.offer-card:hover::before {
  transform: scale(10);
  background-color: rgba(255, 255, 255, 0.1); 
}

.offer-details {
  position: relative;
  z-index: 2;
}

.offer-name {
  font-size: 1.6em;
  font-weight: bold;
  color: #fff;
  margin: 0 0 10px;
}

.offer-price {
  font-size: 1.2em;
  color: #f9b234;
  font-weight: bold;
}

.offer-description {
  font-size: 0.95em;
  color: #ddd;
  margin-top: 8px;
}

.hover-image {
  position: absolute;
  top: 55px;
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
  width: 170px;
  height: 170px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid white;
  opacity: 0;
  transition: all 0.4s ease;
  z-index: 3;
}

.offer-card:hover .hover-image {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
}

.offers-list .offer-card:nth-child(2n)::before,
.offers-list .offer-card:nth-child(3n)::before,
.offers-list .offer-card:nth-child(4n)::before,
.offers-list .offer-card:nth-child(5n)::before,
.offers-list .offer-card:nth-child(6n)::before {
  background-color: transparent; 
}

.price-tag {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #f9b234;
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1em;
  z-index: 3;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

</style>
