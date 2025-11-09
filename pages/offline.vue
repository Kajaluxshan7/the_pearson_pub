<template>
  <StaticFallback />
</template>

<script setup lang="ts">
// Updated path after moving StaticFallback into components/feedback (auto-import handles it, manual import optional)
import StaticFallback from "~/components/feedback/StaticFallback.vue";
import { useRouter } from "vue-router";
import { useConnectivity } from "@/composables/useConnectivity";
import { onMounted } from "vue";
import { useSEO } from '@/composables/useSEO';

const router = useRouter();
const { status, checkConnectivity } = useConnectivity();

const attemptReconnection = async () => {
  console.log("Attempting to reconnect (forced check)...");
  try {
    // Force a fresh network check (bypass any cached status)
    const isConnected = await checkConnectivity(true);
    if (isConnected) {
      console.log("Connection restored, navigating to home");
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem("pearson-pub-visited");
      }
      // Navigate to home and reload to ensure fresh content
      await router.push("/");
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
  
  // Check immediately (force a fresh connectivity probe) and redirect on success.
  const isConnected = await checkConnectivity(true);
  if (isConnected) {
    await router.push("/");
    window.location.reload();
    return;
  }

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

// No periodic checks or automatic reconnection watchers by design —
// reloading this page will run a fresh connectivity probe and redirect to home
// when the backend is reachable.
</script>
