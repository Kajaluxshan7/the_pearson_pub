<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Contact Hero Section -->
    <section class="relative py-20 bg-gray-900 text-white">
      <div class="absolute inset-0 overflow-hidden">
        <NuxtImg 
          src="/images/pub/interior-main.jpg" 
          alt="Contact Us" 
          class="w-full h-full object-cover opacity-30"
          format="webp"
          quality="80"
        />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p class="text-xl max-w-3xl mx-auto">
          Get in touch with us for reservations, inquiries, or feedback
        </p>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div 
            class="transition-all duration-500"
            :class="{ 
              'opacity-0 translate-x-8': !isVisible.info, 
              'opacity-100 translate-x-0': isVisible.info 
            }"
            ref="infoRef"
          >
            <h2 class="text-3xl font-bold mb-8">Get in Touch</h2>
            <div class="space-y-6">
              <div v-for="(item, index) in contactInfo" :key="index" class="flex items-start space-x-4">
                <UIcon :name="item.icon" class="w-6 h-6 text-yellow-500 mt-1" />
                <div>
                  <h3 class="font-semibold">{{ item.title }}</h3>
                  <p class="text-gray-600">{{ item.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div 
            class="transition-all duration-500"
            :class="{ 
              'opacity-0 -translate-x-8': !isVisible.form, 
              'opacity-100 translate-x-0': isVisible.form 
            }"
            ref="formRef"
          >
            <form @submit.prevent="submitForm">
              <div class="space-y-6">                <UFormGroup
                  label="Name"
                  required
                  :error="formErrors.name"
                >
                  <UInput 
                    v-model="form.name"
                    placeholder="Your name"
                    :error="!!formErrors.name"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Email"
                  required
                  :error="formErrors.email"
                >
                  <UInput 
                    v-model="form.email"
                    type="email"
                    placeholder="Your email"
                    :error="!!formErrors.email"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Subject"
                  required
                  :error="formErrors.subject"
                >
                  <UInput 
                    v-model="form.subject"
                    placeholder="Subject"
                    :error="!!formErrors.subject"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Message"
                  required
                  :error="formErrors.message"
                >
                  <UTextarea
                    v-model="form.message"
                    placeholder="Your message"
                    :rows="6"
                    :error="!!formErrors.message"
                  />
                </UFormGroup>

                <UButton
                  type="submit"
                  color="yellow"
                  :loading="loading"
                  :disabled="loading"
                  block
                >
                  {{ loading ? 'Sending...' : 'Send Message' }}
                </UButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
// Page meta
useHead({
  title: 'Contact Us - The Pearson Pub',
  meta: [
    { name: 'description', content: 'Get in touch with The Pearson Pub. Contact us for reservations, inquiries, or feedback.' }
  ]
})

// Form state
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Validation rules
const formErrors = ref<Record<string, string>>({})
const { $validateForm } = useNuxtApp()

// UI state
const loading = ref(false)
const isVisible = ref({
  info: false,
  form: false
})

// Contact information
const contactInfo = [
  {
    icon: 'i-heroicons-map-pin',
    title: 'Address',
    value: '123 Pub Street, Cityville, ST 12345'
  },
  {
    icon: 'i-heroicons-phone',
    title: 'Phone',
    value: '(555) 123-4567'
  },
  {
    icon: 'i-heroicons-envelope',
    title: 'Email',
    value: 'info@pearsonpub.com'
  },
  {
    icon: 'i-heroicons-clock',
    title: 'Opening Hours',
    value: 'Mon-Sun: 11:00 AM - 12:00 AM'
  }
]

// Intersection Observer setup
const infoRef = ref(null)
const formRef = ref(null)

const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target === infoRef.value ? 'info' : 'form'
        if (entry.isIntersecting) {
          isVisible.value[target] = true
        }
      })
    },
    { threshold: 0.1 }
  )

  if (infoRef.value) observer.observe(infoRef.value)
  if (formRef.value) observer.observe(formRef.value)

  return observer
}

// Form submission
const submitForm = async () => {
  try {    const { isValid, errors } = $validateForm(form.value)
    if (!isValid) {
      formErrors.value = errors
      return
    }

    loading.value = true
    
    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })

    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''      };
      
      formErrors.value = {};

      // Show success message
    const toast = useToast()
    toast.add({
      title: 'Success!',
      description: 'Your message has been sent successfully.',
      color: 'green'
    })
  } catch (error) {
    // Show error message
    const toast = useToast()
    toast.add({
      title: 'Error',
      description: 'Failed to send message. Please try again.',
      color: 'red'
    })
    console.error('Failed to send message:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = setupIntersectionObserver()
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
