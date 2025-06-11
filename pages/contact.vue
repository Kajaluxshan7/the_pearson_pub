<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Information Section -->
        <div class="space-y-8">
          <div class="text-center lg:text-left">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Visit The Pearson Pub</h1>
            <p class="text-lg text-gray-600 mb-8">
              Join us for great food, drinks, and entertainment in our traditional pub atmosphere. We're here to make your visit memorable!
            </p>
          </div>

          <div class="space-y-6">
            <div class="flex items-center space-x-4">
              <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-primary-500" />
              <div>
                <h3 class="font-semibold text-gray-900">Location</h3>
                <p class="text-gray-600">101 MARY ST W</p>
                <p class="text-gray-600">WHITBY, ON, L1N 2R4</p>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <UIcon name="i-heroicons-phone" class="w-6 h-6 text-primary-500" />
              <div>
                <h3 class="font-semibold text-gray-900">Phone</h3>
                <p class="text-gray-600">905-430-5699</p>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-primary-500" />
              <div>
                <h3 class="font-semibold text-gray-900">Email</h3>
                <p class="text-gray-600">thepearsonpub@rogers.com</p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <UIcon name="i-heroicons-clock" class="w-6 h-6 text-primary-500 mt-1" />
              <div>
                <h3 class="font-semibold text-gray-900">Hours of Operation</h3>
                <div class="grid grid-cols-2 gap-x-4 text-gray-600">
                  <p>Monday:</p><p>11:00am - 12:00am</p>
                  <p>Tuesday:</p><p>11:00am - 12:00am</p>
                  <p>Wednesday:</p><p>11:00am - 2:00am</p>
                  <p>Thursday:</p><p>11:00am - 2:00am</p>
                  <p>Friday:</p><p>11:00am - 2:00am</p>
                  <p>Saturday:</p><p>11:00am - 2:00am</p>
                  <p>Sunday:</p><p>11:00am - 12:00am</p>
                </div>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <UIcon name="i-heroicons-musical-note" class="w-6 h-6 text-primary-500 mt-1" />
              <div>
                <h3 class="font-semibold text-gray-900">Live Entertainment</h3>
                <div class="text-gray-600 space-y-2">
                  <p>Fridays: Live Bands 9:30pm - 1:30am</p>
                  <p>Saturdays: Live Bands 9:30pm - 1:30am</p>
                  <p>Sundays: Karaoke 10:00pm - 2:00am</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form Section -->
        <UCard class="backdrop-blur-sm bg-white/80">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <UFormGroup label="Name" name="name">
              <UInput
                v-model="form.name"
                placeholder="Your name"
                icon="i-heroicons-user"
                required
              />
            </UFormGroup>

            <UFormGroup label="Email" name="email">
              <UInput
                v-model="form.email"
                type="email"
                placeholder="your.email@example.com"
                icon="i-heroicons-envelope"
                required
              />
            </UFormGroup>

            <UFormGroup label="Message" name="message">
              <UTextarea
                v-model="form.message"
                placeholder="Your message..."
                :rows="5"
                required
              />
            </UFormGroup>

            <UButton
              type="submit"
              color="primary"
              variant="solid"
              :loading="loading"
              :disabled="loading"
              class="w-full"
            >
              {{ loading ? 'Sending...' : 'Send Message' }}
            </UButton>
          </form>

          <UNotification
            v-if="responseMessage"
            :text="responseMessage"
            :type="responseSuccess ? 'success' : 'error'"
            class="mt-4"
          />
        </UCard>
      </div>

      <!-- Map Section -->
      <div class="mt-16">
        <UCard class="h-[400px] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.0123456789!2d-78.12345678901234!3d43.87654321098765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d51b3a8b1a1a1d%3A0x2a1a1a1a1a1a1a1a!2s101%20Mary%20St%20W%2C%20Whitby%2C%20ON%20L1N%202R4%2C%20Canada!5e0!3m2!1sen!2s!4v1625641225687!5m2!1sen!2s"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = reactive({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)
const responseMessage = ref('')
const responseSuccess = ref(false)

async function handleSubmit() {
  loading.value = true
  responseMessage.value = ''
  responseSuccess.value = false

  try {
    const res = await $fetch('/api/contact', {
      method: 'POST',
      body: form
    })

    if (res.success) {
      responseSuccess.value = true
      responseMessage.value = res.message || 'Thank you! Your message has been sent successfully.'
      // Reset form
      form.name = ''
      form.email = ''
      form.message = ''
    } else {
      responseMessage.value = res.error || 'Failed to send message. Please try again.'
    }
  } catch (err) {
    console.error(err)
    responseMessage.value = 'An error occurred. Please try again later.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
