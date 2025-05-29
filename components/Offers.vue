<template>
  <div class="offer-container">
    <h2 class="offer-title">Today's Offers</h2>
<div class="offers-list">
  <transition-group name="list" tag="div" class="offers-list-inner">
    <div
      v-for="(offer, index) in offers"
      :key="offer.id"
      class="offer-card"
      :style="{ backgroundImage: 'url(' + offer.image + ')', animationDelay: (index * 0.3) + 's' }"
    >
      <div class="overlay"></div>
      <div class="price-tag">${{ offer.price }}</div>
      <img :src="offer.image" alt="Offer" class="offer-image" />
      <div class="offer-details">
        <h3 class="offer-name">{{ offer.name }}</h3>
      </div>
    </div>
  </transition-group>
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
          description: "A delicious grilled salmon served with fresh vegetables.",
          image: "/images/menu/76b52f7a-dec8-4ca5-bd44-ca6c53200ae6.jpeg",
        },
        {
          id: 2,
          name: "Vegetable Pizza",
          price: 12.99,
          description: "A healthy and tasty vegetable pizza with a crisp crust.",
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
  background-size: cover;
  background-position: center;
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px 20px;
  color: #fff;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(18, 18, 18, 0.6); 
  z-index: 1;
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
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.offer-image {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 170px;
  height: 170px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid white;
  z-index: 2;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
}

.offer-details {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-top: 190px;
}

.offer-name {
  font-size: 1.6em;
  font-weight: bold;
  color: #fff;
  margin: 0;
}

.offer-card:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}
.offers-list-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.list-enter-active {
  animation: fadeSlideIn 0.6s forwards;
}
.list-leave-active {
  animation: fadeSlideOut 0.3s forwards;
}

@keyframes fadeSlideIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeSlideOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(30px);
  }
}

.offer-card {
  animation-fill-mode: both;
}

.offer-card:hover {
  animation: fadeInUp 0.6s ease-out forwards;
}

.offer-card {
  animation: fadeInUp 0.6s ease-out forwards;
}


</style>
