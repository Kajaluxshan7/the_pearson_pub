<!-- Global Connectivity Status -->
<template>
  <div>
    <!-- Main content with potential top padding -->
    <div :class="{ 'pt-0': showConnectionStatus }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConnectivity } from "@/composables/useConnectivity";

const { status } = useConnectivity();
const showConnectionStatus = ref(false);
const connectionStatus = ref<"online" | "offline">("online");
const hideTimeout = ref<NodeJS.Timeout | null>(null);

// Watch for connectivity changes
watchEffect(() => {
  const isOnline = status.value.isOnline && status.value.backendReachable;

  if (isOnline && connectionStatus.value === "offline") {
    // Connection restored
    connectionStatus.value = "online";
    showConnectionStatus.value = true;

    // Auto-hide after 3 seconds
    if (hideTimeout.value) clearTimeout(hideTimeout.value);
    hideTimeout.value = setTimeout(() => {
      showConnectionStatus.value = false;
    }, 3000);
  } else if (!isOnline && connectionStatus.value === "online") {
    // Connection lost
    connectionStatus.value = "offline";
    showConnectionStatus.value = true;

    // Don't auto-hide when offline
    if (hideTimeout.value) {
      clearTimeout(hideTimeout.value);
      hideTimeout.value = null;
    }
  }
});

const hideConnectionStatus = () => {
  showConnectionStatus.value = false;
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value);
    hideTimeout.value = null;
  }
};

onUnmounted(() => {
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value);
  }
});
</script>
