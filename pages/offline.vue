<template>
  <StaticFallback />
</template>

<script setup lang="ts">
import StaticFallback from "~/components/StaticFallback.vue";
import { useRouter } from "vue-router";
import { useConnectivity } from "@/composables/useConnectivity";
import { watchEffect, onMounted, onUnmounted } from "vue";
import { useSEO } from '@/composables/useSEO';

const router = useRouter();
const { status, checkConnectivity } = useConnectivity();

let reconnectInterval: NodeJS.Timeout | null = null;

const attemptReconnection = async () => {
  console.log("Attempting to reconnect...");
  try {
    const isConnected = await checkConnectivity();
    if (isConnected) {
      console.log("Connection restored, navigating to home");
      // Clear any session storage that might interfere
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem("pearson-pub-visited");
      }
      // Navigate to home with force refresh
      await router.push("/");
      // Reload the page to ensure fresh content
      window.location.reload();
      return true;
    }
  } catch (error) {
    console.warn("Reconnection attempt failed:", error);
  }
  return false;
};

onMounted(async () => {
  console.log("Offline page mounted");
  
  // Check immediately if we're actually connected
  const isConnected = await checkConnectivity();
  if (isConnected) {
    await router.push("/");
    window.location.reload();
    return;
  }

  // Set up periodic reconnection attempts
  reconnectInterval = setInterval(async () => {
    const connected = await attemptReconnection();
    if (connected && reconnectInterval) {
      clearInterval(reconnectInterval);
      reconnectInterval = null;
    }
  }, 5000); // Check every 5 seconds

  useSEO().setSEO({
    title: 'Offline | The Pearson Pub',
    description: 'Basic restaurant information when offline.',
    canonical: 'https://thepearsonpubwhitby.ca/offline',
    ogImage: '/images/pub/interior-main.jpg',
    structuredData: [{ type: 'application/ld+json', innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "The Pearson Pub",
      "url": "https://thepearsonpubwhitby.ca/offline"
    }) }],
    noIndex: true
  });
});

onUnmounted(() => {
  if (reconnectInterval) {
    clearInterval(reconnectInterval);
    reconnectInterval = null;
  }
});

// Watch for connectivity changes
watchEffect(async () => {
  if (status.value.backendReachable && status.value.lastChecked) {
    console.log("Backend reachable detected, attempting navigation");
    await attemptReconnection();
  }
});
</script>
