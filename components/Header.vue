<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <NuxtLink to="/">The Pearson Pub</NuxtLink>
      </div>
      <nav class="nav">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/menu">Menu</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
  // No extra logic needed for now
</script>

<style scoped>
.header {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo a {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}
.nav a {
  color: #fff;
  margin-left: 1.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}
.nav a:hover {
  color: #ff5722;
}
</style>
