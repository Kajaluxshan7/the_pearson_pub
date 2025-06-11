<template>
  <footer class="bg-gray-900 text-white pt-12 pb-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-primary-500">The Pearson Pub</h3>
          <p class="text-gray-400">A traditional pub atmosphere in the heart of Whitby</p>
          <div class="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener" class="text-gray-400 hover:text-primary-500">
              <UIcon name="i-heroicons-facebook" class="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener" class="text-gray-400 hover:text-primary-500">
              <UIcon name="i-heroicons-instagram" class="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener" class="text-gray-400 hover:text-primary-500">
              <UIcon name="i-heroicons-twitter" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Hours of Operation</h3>
          <div class="text-sm text-gray-400 space-y-2">
            <p>Mon-Tue: 11:00am - 12:00am</p>
            <p>Wed-Sat: 11:00am - 2:00am</p>
            <p>Sunday: 11:00am - 12:00am</p>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Live Entertainment</h3>
          <div class="text-sm text-gray-400 space-y-2">
            <p>Fridays: Live Bands 9:30pm - 1:30am</p>
            <p>Saturdays: Live Bands 9:30pm - 1:30am</p>
            <p>Sundays: Karaoke 10:00pm - 2:00am</p>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Contact Us</h3>
          <div class="text-sm text-gray-400 space-y-2">
            <p>101 MARY ST W</p>
            <p>WHITBY, ON, L1N 2R4</p>
            <p>Phone: 905-430-5699</p>
            <p>Email: thepearsonpub@rogers.com</p>
          </div>
        </div>
      </div>

      <nav class="py-4 border-t border-gray-800">
        <div class="flex flex-wrap justify-center space-x-6 text-sm">
          <NuxtLink to="/" class="text-gray-400 hover:text-primary-500">Home</NuxtLink>
          <NuxtLink to="/menu" class="text-gray-400 hover:text-primary-500">Menu</NuxtLink>
          <NuxtLink to="/about" class="text-gray-400 hover:text-primary-500">About</NuxtLink>
          <NuxtLink to="/contact" class="text-gray-400 hover:text-primary-500">Contact</NuxtLink>
        </div>
      </nav>

      <div class="text-center text-sm text-gray-400 mt-8">
        <p>&copy; {{ currentYear }} The Pearson Pub. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
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
