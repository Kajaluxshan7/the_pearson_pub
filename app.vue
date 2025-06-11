<template>
  <div class="app-container">
    <Header />
    <main> <!-- Removed pt-20 class -->
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding-top: 5rem; /* Single padding definition */
  min-height: calc(100vh - 5rem);
}

html {
  scroll-padding-top: 5rem;
  scroll-behavior: smooth;
}

@media (max-width: 768px) {
  main {
    padding-top: 4rem;
  }
}
</style>