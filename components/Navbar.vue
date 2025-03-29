<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">
        <NuxtLink to="/">The Pearson Pub</NuxtLink>
      </div>
      <ul class="nav-links">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/menu">Menu</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/contact">Contact</NuxtLink></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// No additional logic is required for basic linking
</script>

<style scoped>
.navbar {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem 0;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
}
.logo a {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}
.nav-links li a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}
.nav-links li a:hover {
  text-decoration: underline;
}
</style>
