<template>
  <section class="hero">
    <div class="overlay"></div>
    <div class="hero-content">
      <h1>Experience the Best Cafe Delights</h1>
      <p>Discover a cozy place with great food and ambiance</p>
      <button class="cta-button">Explore Now</button>
    </div>
  </section>
</template>

<script setup>
  // No additional script logic needed for now.
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  background-image: url('../assets/images/home_background.jpg'); /* Place your hero background image in assets/images */
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.hero-content {
  position: relative;
  text-align: center;
  color: #fff;
  z-index: 1;
  max-width: 800px;
  padding: 0 20px;
}
.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.hero-content p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
.cta-button {
  padding: 1rem 2rem;
  border: none;
  background-color: #ff5722;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.cta-button:hover {
  background-color: #e64a19;
}
</style>
