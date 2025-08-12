<template>
  <StaticFallback />
</template>

<script setup lang="ts">
import StaticFallback from "~/components/StaticFallback.vue";
import { useRouter } from "vue-router";
import { useConnectivity } from "@/composables/useConnectivity";
import { watchEffect, onMounted } from "vue";
import { useSEO } from '@/composables/useSEO';

const router = useRouter();
const { status, checkConnectivity } = useConnectivity();

onMounted(async () => {
  const isConnected = await checkConnectivity();
  if (isConnected) {
    router.push("/");
    return;
  }
  useSEO().setSEO({
    title: 'Offline | The Pearson Pub',
    description: 'Basic restaurant information when offline.',
    canonical: 'https://thepearsonpub.ca/offline',
    ogImage: '/images/pub/interior-main.jpg',
    structuredData: [{ type: 'application/ld+json', innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "The Pearson Pub",
      "url": "https://thepearsonpub.ca/offline"
    }) }],
    noIndex: true
  });
});

watchEffect(() => {
  if (status.value.backendReachable && status.value.lastChecked) {
    router.push("/");
  }
});
</script>
