<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header
      class="relative py-12 px-4 text-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white border-b border-gray-200 dark:border-gray-700"
    >
      <!-- Background overlay for light mode -->
      <div class="absolute inset-0 bg-white dark:bg-transparent"></div>
      <div class="relative max-w-4xl mx-auto z-10">
        <!-- Logo -->
        <div class="mb-6">
          <img
            src="/pearson-pub-logo.png"
            alt="The Pearson Pub Logo"
            class="w-24 h-24 mx-auto rounded-full shadow-lg object-cover"
            @error="logoError = true"
          />
          <UIcon
            v-if="logoError"
            name="i-heroicons-building-storefront"
            class="w-24 h-24 mx-auto text-yellow-500"
          />
        </div>

        <!-- Title -->
        <h1
          class="text-5xl md:text-6xl font-bold mb-4 font-serif text-gray-900 dark:text-white"
          style="font-family: 'Cinzel', 'Georgia', serif"
        >
          The
          <span class="text-yellow-600 dark:text-yellow-400">Pearson Pub</span>
        </h1>
        <p
          class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light"
        >
          A traditional pub atmosphere with modern amenities in Whitby
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-16">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <div class="inline-block mb-4">
          <span
            class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase"
            >Get in Touch</span
          >
          <div class="w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
        </div>
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          style="font-family: 'Cinzel', 'Georgia', serif"
        >
          Visit Our
          <span class="text-yellow-600 dark:text-yellow-400">Pub</span>
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We're here to serve you with great food, drinks, and hospitality.
          Here's how to reach us and visit our location.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Contact Information -->
        <div
          class="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-yellow-600/20 rounded-lg">
              <UIcon name="i-heroicons-phone" class="w-6 h-6 text-yellow-400" />
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Contact Us
            </h2>
          </div>
          <div class="space-y-3 text-gray-700 dark:text-gray-300">
            <div class="flex items-center gap-3">
              <UIcon
                name="i-heroicons-phone"
                class="w-4 h-4 text-yellow-600 dark:text-yellow-400"
              />
              <span>(905) 430-5699</span>
            </div>
            <div class="flex items-center gap-3">
              <UIcon
                name="i-heroicons-envelope"
                class="w-4 h-4 text-yellow-600 dark:text-yellow-400"
              />
              <span>thepearsonpub@rogers.com</span>
            </div>
            <div class="flex items-start gap-3">
              <UIcon
                name="i-heroicons-map-pin"
                class="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5"
              />
              <span>101 Mary Street<br />Whitby, ON L1N 2R4</span>
            </div>
          </div>
        </div>

        <!-- Operating Hours -->
        <div
          class="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-yellow-600/20 rounded-lg">
              <UIcon name="i-heroicons-clock" class="w-6 h-6 text-yellow-400" />
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Hours
            </h2>
          </div>
          <div class="space-y-2 text-gray-700 dark:text-gray-300">
            <div class="flex justify-between">
              <span>Monday - Thursday</span>
              <span>11:00 AM - 11:00 PM</span>
            </div>
            <div class="flex justify-between">
              <span>Friday - Saturday</span>
              <span>11:00 AM - 12:00 AM</span>
            </div>
            <div class="flex justify-between">
              <span>Sunday</span>
              <span>11:00 AM - 10:00 PM</span>
            </div>
          </div>
        </div>

        <!-- About -->
        <div
          class="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1"
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-yellow-600/20 rounded-lg">
              <UIcon
                name="i-heroicons-information-circle"
                class="w-6 h-6 text-yellow-400"
              />
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              About
            </h2>
          </div>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            A traditional pub atmosphere with modern amenities, offering great
            food, drinks, and entertainment in the heart of Whitby.
          </p>
        </div>
      </div>

      <!-- Call to Action -->
      <div
        class="mt-12 text-center bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-8 shadow-lg"
      >
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Visit Us Today!
        </h2>
        <p class="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Experience the perfect blend of traditional pub atmosphere and modern
          dining. Join us for great food, drinks, and memorable moments.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <UButton
            color="yellow"
            size="lg"
            @click="makeCall"
            class="font-semibold"
          >
            <UIcon name="i-heroicons-phone" class="w-5 h-5 mr-2" />
            Call for Reservations
          </UButton>
          <UButton
            color="gray"
            variant="outline"
            size="lg"
            @click="getDirections"
            class="font-semibold"
          >
            <UIcon name="i-heroicons-map-pin" class="w-5 h-5 mr-2" />
            Get Directions
          </UButton>
        </div>
      </div>
    </main>

    <!-- Maps Section -->
    <section class="max-w-7xl mx-auto px-4 pb-16">
      <div class="text-center mb-8">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Find Us
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          Located in the heart of Whitby
        </p>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700"
      >
        <div
          class="aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center"
        >
          <iframe
            src="https://www.google.com/maps?q=101+MARY+ST+WHITBY,+ON,+L1N+2R4&output=embed"
            width="100%"
            height="100%"
            style="border: 0; border-radius: 0.75rem; min-height: 220px"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="The Pearson Pub Location"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useConnectivity } from "@/composables/useConnectivity";

const logoError = ref(false);
const isRetrying = ref(false);
const router = useRouter();
const { checkConnectivity } = useConnectivity();

const makeCall = () => {
  window.location.href = "tel:+19054305699";
};

const getDirections = () => {
  const address = "101 Mary Street, Whitby, ON L1N 2R4";
  const encodedAddress = encodeURIComponent(address);
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    "_blank"
  );
};

const retryConnection = async () => {
  isRetrying.value = true;

  try {
    const isConnected = await checkConnectivity();
    if (isConnected) {
      router.push("/");
    } else {
      // Show a toast or notification that connection is still unavailable
      console.log("Connection still unavailable");
    }
  } catch (error) {
    console.error("Error checking connectivity:", error);
  } finally {
    isRetrying.value = false;
  }
};
</script>
