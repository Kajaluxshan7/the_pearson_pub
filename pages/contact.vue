<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
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
            ref="infoRef"
            class="transition-all duration-700"
            :class="{
              'opacity-0 translate-x-8': !isVisible.info,
              'opacity-100 translate-x-0': isVisible.info,
            }"
          >
            <h2 class="text-3xl font-bold mb-8">Get in Touch</h2>
            <div class="space-y-6">
              <div
                v-for="(item, index) in contactInfo"
                :key="index"
                class="flex items-start space-x-4"
              >
                <UIcon :name="item.icon" class="w-6 h-6 text-yellow-500 mt-1" />
                <div>
                  <h3 class="font-semibold">{{ item.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-300">{{ item.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div
            ref="formRef"
            class="transition-all duration-700"
            :class="{
              'opacity-0 -translate-x-8': !isVisible.form,
              'opacity-100 translate-x-0': isVisible.form,
            }"
          >
            <form @submit.prevent="submitForm" novalidate>
              <div class="space-y-6">
                <UFormGroup label="Name" required :error="formErrors.name">
                  <UInput
                    v-model="form.name"
                    placeholder="Your name"
                    :error="!!formErrors.name"
                    autocomplete="name"
                  />
                  <p v-if="formErrors.name" class="text-red-600 text-sm mt-1">{{ formErrors.name }}</p>
                </UFormGroup>

                <UFormGroup label="Email" required :error="formErrors.email">
                  <UInput
                    v-model="form.email"
                    type="email"
                    placeholder="Your email"
                    :error="!!formErrors.email"
                    autocomplete="email"
                  />
                  <p v-if="formErrors.email" class="text-red-600 text-sm mt-1">{{ formErrors.email }}</p>
                </UFormGroup>

                <UFormGroup label="Subject" required :error="formErrors.subject">
                  <UInput
                    v-model="form.subject"
                    placeholder="Subject"
                    :error="!!formErrors.subject"
                  />
                  <p v-if="formErrors.subject" class="text-red-600 text-sm mt-1">{{ formErrors.subject }}</p>
                </UFormGroup>

                <UFormGroup label="Message" required :error="formErrors.message">
                  <UTextarea
                    v-model="form.message"
                    placeholder="Your message"
                    :rows="6"
                    :error="!!formErrors.message"
                  />
                  <p v-if="formErrors.message" class="text-red-600 text-sm mt-1">{{ formErrors.message }}</p>
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

    <section class="w-[99%] mx-auto mb-2" >
  <h2 class="text-center text-3xl font-bold mb-6">Our Location</h2>
  <div
    class="w-full h-80 rounded-lg shadow-md overflow-hidden"
    role="region"
    aria-label="The Pearson Pub Location Map"
  >
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.967236376831!2d-78.91105568450147!3d43.86634817911919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d66471f6656f%3A0xb4e3a2734f8a77bc!2s101%20Mary%20St%2C%20Whitby%2C%20ON%20L1N%202R4%2C%20Canada!5e0!3m2!1sen!2sin!4v1686900000000!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="The Pearson Pub Location"
    ></iframe>
  </div>
</section>
    

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import type { Ref } from "vue"

interface ContactInfo {
  icon: string
  title: string
  value: string
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const form = ref<FormData>({
  name: "",
  email: "",
  subject: "",
  message: "",
})

const formErrors = ref<Record<string, string>>({})

const loading = ref(false)

const isVisible = ref({
  info: false,
  form: false,
})

const contactInfo: ContactInfo[] = [
  {
    icon: "i-heroicons-map-pin",
    title: "Address",
    value: "123 Pub Street, Cityville, ST 12345",
  },
  {
    icon: "i-heroicons-phone",
    title: "Phone",
    value: "(555) 123-4567",
  },
  {
    icon: "i-heroicons-envelope",
    title: "Email",
    value: "info@pearsonpub.com",
  },
  {
    icon: "i-heroicons-clock",
    title: "Opening Hours",
    value: "Mon-Sun: 11:00 AM - 12:00 AM",
  },
]

// Intersection Observer setup
const infoRef = ref<HTMLElement | null>(null)
const formRef = ref<HTMLElement | null>(null)

const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target === infoRef.value ? "info" : "form"
        if (entry.isIntersecting) {
          isVisible.value[target as keyof typeof isVisible.value] = true
        }
      })
    },
    { threshold: 0.1 }
  )

  if (infoRef.value) observer.observe(infoRef.value)
  if (formRef.value) observer.observe(formRef.value)

  return observer
}

const validateForm = (data: FormData) => {
  const errors: Record<string, string> = {}

  if (!data.name.trim()) {
    errors.name = "Name is required"
  }

  if (!data.email.trim()) {
    errors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format"
  }

  if (!data.subject.trim()) {
    errors.subject = "Subject is required"
  }

  if (!data.message.trim()) {
    errors.message = "Message is required"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

const toast = useToast()

const submitForm = async () => {
  try {
    const { isValid, errors } = validateForm(form.value)
    if (!isValid) {
      formErrors.value = errors
      return
    }

    loading.value = true

    // Simulate API call delay (replace with actual send logic)
    await new Promise((r) => setTimeout(r, 1500))

    // Reset form
    form.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
    }
    formErrors.value = {}

    toast.add({
      title: "Success!",
      description: "Your message has been sent successfully.",
      color: "green",
    })
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Failed to send message. Please try again.",
      color: "red",
    })
    console.error("Failed to send message:", error)
  } finally {
    loading.value = false
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

// Page meta
useHead({
  title: "Contact Us - The Pearson Pub",
  meta: [
    {
      name: "description",
      content: "Get in touch with The Pearson Pub. Contact us for reservations, inquiries, or feedback.",
    },
  ],
})
</script>
