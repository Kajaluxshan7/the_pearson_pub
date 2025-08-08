<template>
  <StaticFallback />
</template>

<script setup lang="ts">
import StaticFallback from "~/components/StaticFallback.vue";
import { useRouter } from "vue-router";
import { useConnectivity } from "@/composables/useConnectivity";
import { watchEffect, onMounted, onUnmounted } from "vue";

const router = useRouter();
const { status, checkConnectivity } = useConnectivity();

// Check connectivity immediately on page load
onMounted(async () => {
  const isConnected = await checkConnectivity();
  if (isConnected) {
    router.push("/");
    return;
  }
});

// Also watch for real-time connectivity changes
watchEffect(() => {
  if (status.value.backendReachable && status.value.lastChecked) {
    router.push("/");
  }
});

definePageMeta({
  title: "The Pearson Pub - Offline",
  description: "Basic restaurant information when offline",
  layout: false,
});
</script>
