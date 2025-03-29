<template>
  <div>
    <!-- Include the fixed navigation -->
    <Navbar />
    
    <!-- Hero section -->
    <Hero />

    <!-- About Section -->
    <section class="about">
      <div class="container">
        <h2>About Us</h2>
        <p>
          At The Pearson Pub, we offer an unparalleled cafe experience with a warm ambiance, innovative menu, and exceptional service.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import Hero from '~/components/Hero.vue'
</script>

<style scoped>
.about {
  padding: 4rem 0;
  background: #f9f9f9;
  text-align: center;
}
.about .container {
  max-width: 800px;
  margin: auto;
  padding: 0 20px;
}
.about h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.about p {
  font-size: 1rem;
  color: #555;
}
</style>
