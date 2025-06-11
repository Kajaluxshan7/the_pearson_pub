<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">About The Pearson Pub</h1>
        <div class="w-24 h-1 bg-primary-500 mx-auto"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            The vintage appearance of our home-style pub on the corner of Brock and
            Mary St. has become a well-known landmark to local residents and travelers
            alike.
          </p>
          <p>
            Come inside and enjoy our traditional pub atmosphere that many call home to
            gatherings of family, friends, and coworkers for all occasions. We pride
            ourselves on our friendly service and adaptability to our customers'
            needs.
          </p>
          <p>
            Grab a seat along our wall of TVs and enjoy your favorite sports event with
            your preferred beer from our selection of 14 different taps, while enjoying our
            trademark wings and other cravings from our menu, offering a wide variety of
            quality flavorful foods.
          </p>
          <p>
            We offer live entertainment 4 nights a week and daily specials to suit your
            taste and budget.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UCard class="col-span-2">
            <div class="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
              <img src="../public/images/pub/interior-main.jpg" alt="Pub Interior" class="object-cover">
            </div>
          </UCard>
          
          <UCard>
            <div class="text-center p-6 space-y-4">
              <UIcon name="i-heroicons-beer-mug" class="w-12 h-12 text-primary-500 mx-auto"/>
              <h3 class="text-xl font-semibold">14 Beers on Tap</h3>
              <p class="text-gray-600">Extensive selection of craft and traditional beers</p>
            </div>
          </UCard>

          <UCard>
            <div class="text-center p-6 space-y-4">
              <UIcon name="i-heroicons-musical-note" class="w-12 h-12 text-primary-500 mx-auto"/>
              <h3 class="text-xl font-semibold">Live Entertainment</h3>
              <p class="text-gray-600">4 nights of live music and karaoke weekly</p>
            </div>
          </UCard>
        </div>
      </div>

      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <UCard>
          <div class="text-center p-6 space-y-4">
            <UIcon name="i-heroicons-tv" class="w-12 h-12 text-primary-500 mx-auto"/>
            <h3 class="text-xl font-semibold">Sports Bar</h3>
            <p class="text-gray-600">Multiple TVs showing your favorite sports events</p>
          </div>
        </UCard>

        <UCard>
          <div class="text-center p-6 space-y-4">
            <UIcon name="i-heroicons-ticket" class="w-12 h-12 text-primary-500 mx-auto"/>
            <h3 class="text-xl font-semibold">Daily Specials</h3>
            <p class="text-gray-600">Great deals on food and drinks every day</p>
          </div>
        </UCard>

        <UCard>
          <div class="text-center p-6 space-y-4">
            <UIcon name="i-heroicons-users" class="w-12 h-12 text-primary-500 mx-auto"/>
            <h3 class="text-xl font-semibold">Private Events</h3>
            <p class="text-gray-600">Perfect venue for gatherings and celebrations</p>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic here if needed
</script>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16 img {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
}
</style>

