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
          <div class="offer-slide">
            <img :src="offer.image" :alt="offer.title" />
            <h3>{{ offer.title }}</h3>
            <p>{{ offer.description }}</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </template>
  
  <script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import { Navigation, Pagination, Autoplay } from 'swiper/modules';
  
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const offers = [
        { id: 1, image: '/offers/offer1.jpg', title: 'Buy One Get One Free!', description: 'Enjoy our special pizza offer!' },
        { id: 2, image: '/offers/offer2.jpg', title: 'Weekend Special Discount', description: 'Get 20% off on all pasta dishes!' },
        { id: 3, image: '/offers/offer3.jpg', title: 'Free Dessert', description: 'Order two main courses and get a free dessert!' }
      ];
      return { offers, Navigation, Pagination, Autoplay };
    },
  };
  </script>
  
  <style>
  .offer-slideshow {
    max-width: 600px;
    margin: auto;
  }
  .offer-slide {
    text-align: center;
  }
  .offer-slide img {
    width: 100%;
    border-radius: 10px;
  }
  </style>
  