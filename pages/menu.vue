<template>
  <div class="menu-page">
    <transition name="fade-slide" appear>
      <section class="offer-card">
        <Offer />
      </section>
    </transition>

    <transition name="fade-slide" appear>
      <section class="daily-offer">
        <OfferSlideshow />
      </section>
    </transition>

    <transition name="fade-slide" appear>
      <section class="menu-card">
        <MenuCard />
      </section>
    </transition>
  </div>
</template>


<script setup>
import OfferSlideshow from "@/components/Slideshow.vue";
import MenuCard from "~/components/MenuCard.vue";
import Offer from "@/components/Offers.vue";
</script>


<style scoped>
.menu-page {
  padding: 2rem 0;
}

.menu-header {
  position: relative;
  background-image: url(../public/images/home_background.jpg); 
  background-size: cover;
  background-position: center;
  padding: 50px;
  text-align: center;
  color: white;
  margin-top: -2rem;
  height: 20rem;
}

.menu-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.menu-header h1,
.menu-header p {
  position: relative;
  z-index: 2;
  margin-top: 5rem;
}

.menu-header h1 {
  font-size: 3rem;
  color: white;
}

.menu-header p {
  font-size: 1.2rem;
  margin-top: -2rem;
  color: #f39c12;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

</style>
