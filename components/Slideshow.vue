<template>
  <div class="offer-slideshow">
    <Swiper
      :modules="[Navigation, Pagination, Autoplay]"
      :navigation="true"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :loop="true"
      class="swiper-container"
    >
      <SwiperSlide v-for="offer in offers" :key="offer.id">
        <div :class="['offer-slide', `offer-slide-${offer.id}`]">
          <div class="offer-content">
            <img :src="offer.image" :alt="offer.title" />
            <h3>{{ offer.title }}</h3>
            <p>{{ offer.description }}</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
  
  <script>
// import { Swiper, SwiperSlide } from "swiper/vue";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const offers = [
      {
        id: 1,        image: "/images/food/wings-special.jpg",
        title: "Wing Wednesdays",
        description: "Half-price wings all day Wednesday!",
      },
      {
        id: 2,
        image: "/images/drinks/happy-hour.jpg",
        title: "Happy Hour Special",
        description: "$5 Draft Beers from 3PM-6PM Daily",
      },
      {
        id: 3,
        image: "/images/food/fish-and-chips.jpg",
        title: "Fish & Chips Friday",
        description: "Order two main courses and get a free dessert!",
      },
    ];

    return { offers, Navigation, Pagination, Autoplay };
  },
};
</script>
  
  <style>
.offer-slideshow {
  margin: auto;
  width: 80%;
  height: 500px;

  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-out forwards;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.offer-slide-1 {
  text-align: center;
  height: 300px;
  position: relative;
}

.offer-slide {
  text-align: center;
  height: 500px;
  position: relative;
}

.offer-slide img {
  width: 300px;
  height: 300px;
  object-fit: cover;
}

.offer-slide-1 .offer-content img {
  position: absolute;
  left: 10%;
  top: 0;
}

.offer-slide-2 .offer-content img {
  position: absolute;
  right: 10%;
  bottom: 0;
}

.offer-slide-3 .offer-content img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1.2);
  border-radius: 50%;
}

.offer-slide h3,
.offer-slide p {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
  margin: 0;
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;
}

.offer-slide h3 {
  bottom: 60px;
  font-size: 1.5rem;
  font-weight: bold;
}

.offer-slide p {
  bottom: 30px;
  font-size: 1rem;
}

.swiper-button-next,
.swiper-button-prev {
  color: #ff6347; 
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 20px;
}

</style>
  