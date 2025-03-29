<template>
  <div>    
    <!-- Hero Section -->
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
import Hero from '~/components/Hero.vue'
</script>

<style scoped>
/* About section styling */
.about {
  padding: 5rem 0;
  background: #f9f9f9;
  text-align: center;
  animation: fadeIn 1s ease-in-out;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.about h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  position: relative;
}

.about h2::after {
  content: "";
  width: 60px;
  height: 4px;
  background-color: #ff5722;
  display: block;
  margin: 0.5rem auto;
}

.about p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin: 0 auto;
  max-width: 600px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .about h2 {
    font-size: 2rem;
  }
  .about p {
    font-size: 1rem;
  }
}

/* Fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
