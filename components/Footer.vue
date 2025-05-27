<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="logo">
          <NuxtLink to="/">The Pearson Pub</NuxtLink>
        </div>
        <div class="footer-links">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/menu">Menu</NuxtLink>
          <NuxtLink to="/about">About</NuxtLink>
          <NuxtLink to="/contact">Contact</NuxtLink>
        </div>
        <div class="social">
          <a href="https://facebook.com" target="_blank" rel="noopener">FB</a>
          <a href="https://instagram.com" target="_blank" rel="noopener">IG</a>
          <a href="https://twitter.com" target="_blank" rel="noopener">TW</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} The Pearson Pub. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: #fff;
  padding: 2rem 0;
  font-size: 0.9rem;
  margin-top: auto; /* ensures footer stays at the bottom when used in a flex layout */
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
.logo a {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}
.footer-links a {
  color: #fff;
  text-decoration: none;
  margin-right: 1.5rem;
  transition: color 0.3s ease;
}
.footer-links a:hover {
  color: #ff5722;
}
.social a {
  margin-right: 1rem;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}
.social a:hover {
  color: #ff5722;
}
.footer-bottom {
  text-align: center;
}
</style>
