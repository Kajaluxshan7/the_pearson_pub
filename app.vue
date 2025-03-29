<template>
  <div class="app-container">
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0; /* Remove any default margins */
  padding: 0; /* Remove any default padding */
}
main {
  flex: 1;
  margin: 0;
  padding: 0;
}
</style>
