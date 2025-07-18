<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Contact Hero Section -->
    <section class="hero-section relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      <!-- 3D Background -->
      <Background3D 
        :intensity="1.2" 
        :enable-particles="true" 
        :enable-rays="true" 
        :enable-morphing="true"
        :particle-count="60"
        color-scheme="golden"
      />
      
      <div class="absolute inset-0">
        <NuxtImg
          src="/images/pub/interior-main.jpg"
          alt="Contact Us"
          class="w-full h-full object-cover opacity-30"
          format="webp"
          quality="80"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black/85 to-black/65"></div>
      </div>
      
      <!-- Decorative Elements -->
      <div class="absolute top-10 left-10 w-16 h-16 lg:w-24 lg:h-24 rounded-full border border-yellow-500/30 animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-20 h-20 lg:w-32 lg:h-32 rounded-full bg-yellow-500/20"></div>
      
      <div class="hero-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div class="inline-block mb-4">
          <span class="text-yellow-400 font-semibold text-sm lg:text-lg tracking-wide uppercase">Get In Touch</span>
          <div class="w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight" style="font-family: 'Cinzel', 'Georgia', serif;">
          Contact <span class="text-yellow-400">Us</span>
        </h1>
        <p class="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
          Get in touch with us for <span class="text-yellow-300">reservations</span>, <span class="text-yellow-300">inquiries</span>, or <span class="text-yellow-300">feedback</span>
        </p>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="py-20">
      <div class="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">          <!-- Contact Information -->
          <div
            class="contact-info transition-all duration-700 space-y-8"
            :class="{
              'opacity-0 translate-x-8': !isVisible.info,
              'opacity-100 translate-x-0': isVisible.info,
            }"
          >
            <div class="space-y-6">
              <div class="inline-block">
                <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase">Contact Information</span>
                <div class="w-16 h-1 bg-yellow-500 mt-2"></div>
              </div>
              
              <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight" style="font-family: 'Cinzel', 'Georgia', serif;">
                Get in <span class="text-yellow-600 dark:text-yellow-400">Touch</span>
              </h2>
              
              <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
            
            <div class="space-y-6">
              <div
                v-for="(item, index) in contactInfo"
                :key="index"
                class="group flex items-start space-x-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700"
              >
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors duration-300">
                    <UIcon :name="item.icon" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-lg text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{{ item.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-300 mt-1">{{ item.value }}</p>
                  <p v-if="item.extra" class="text-gray-500 dark:text-gray-400 text-sm mt-1">{{ item.extra }}</p>
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

                      <!-- Quick Links -->
            <div class="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-2xl p-6 mb-16 mt-10 border border-yellow-200 dark:border-yellow-800">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div class="flex flex-wrap gap-4">
                <UButton
                  to="/menu"
                  color="yellow"
                  variant="outline"
                  size="lg"
                  class="transform transition hover:scale-105"
                >
                  View Menu
                </UButton>
                <UButton
                  to="/events"
                  color="yellow"
                  variant="outline"
                  size="lg"
                  class="transform transition hover:scale-105"
                >
                  See Events
                </UButton>
              </div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div class="mb-8">
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Send us a Message</h2>
                <p class="text-gray-600 dark:text-gray-300">Fill out the form below and we'll get back to you soon.</p>
              </div>
              
              <form @submit.prevent="submitForm" novalidate class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <UFormGroup label="Name" required :error="formErrors.name">
                    <UInput
                      v-model="form.name"
                      placeholder="Your name"
                      :error="!!formErrors.name"
                      autocomplete="name"
                      size="lg"
                      class="transform transition focus:scale-105"
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
                      size="lg"
                      class="transform transition focus:scale-105"
                    />
                    <p v-if="formErrors.email" class="text-red-600 text-sm mt-1">{{ formErrors.email }}</p>
                  </UFormGroup>
                </div>

                <UFormGroup label="Subject" required :error="formErrors.subject">
                  <UInput
                    v-model="form.subject"
                    placeholder="Subject"
                    :error="!!formErrors.subject"
                    size="lg"
                    class="transform transition focus:scale-105"
                  />
                  <p v-if="formErrors.subject" class="text-red-600 text-sm mt-1">{{ formErrors.subject }}</p>
                </UFormGroup>

                <UFormGroup label="Message" required :error="formErrors.message">
                  <UTextarea
                    v-model="form.message"
                    placeholder="Your message"
                    :rows="6"
                    :error="!!formErrors.message"
                    size="lg"
                    class="transform transition focus:scale-105"
                  />
                  <p v-if="formErrors.message" class="text-red-600 text-sm mt-1">{{ formErrors.message }}</p>
                </UFormGroup>

                <UButton
                  type="submit"
                  color="yellow"
                  variant="solid"
                  size="xl"
                  :loading="isSubmitting"
                  class="w-auto mx-auto block transform transition hover:scale-105"
                  :disabled="isSubmitting"
                >
                  <UIcon name="i-heroicons-paper-airplane" class="w-5 h-5 mr-2" />
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </UButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-14 bg-white dark:bg-gray-800 relative overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-10 left-10 w-40 h-40 rounded-full border-2 border-yellow-500"></div>
        <div class="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-yellow-300"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-6">
          <div class="inline-block mb-4">
            <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase">Find Us</span>
            <div class="w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6" style="font-family: 'Cinzel', 'Georgia', serif;">
            Visit <span class="text-yellow-600 dark:text-yellow-400">Our Pub</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Located in the heart of Whitby, we're easy to find and always ready to welcome you
          </p>
        </div>
        
        <div class="bg-gray-100 dark:bg-gray-700 rounded-2xl p-3 shadow-xl">
          <div class="aspect-video bg-gray-200 dark:bg-gray-600 rounded-xl flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps?q=101+MARY+ST+WHITBY,+ON,+L1N+2R4&output=embed"
              width="100%"
              height="100%"
              style="border:0; border-radius: 0.75rem; min-height: 220px;"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="The Pearson Pub Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- Success/Error Messages -->
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useLandingPageData } from "~/composables/useLandingPageData";
import Background3D from "~/components/Background3D.vue";

interface ContactInfo {
  icon: string
  title: string
  value: string
  extra?: string
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

// SSR/SSG: useAsyncData for contact data
const { data: contactData } = await useAsyncData('contact-data', async () => {
  const { fetchContactInfo } = useLandingPageData();
  await fetchContactInfo();
  return true;
});

// Backend integration
const { 
  contactInfo: backendContactInfo, 
  operationHours, 
  fetchContactInfo 
} = useLandingPageData();

const form = ref<FormData>({
  name: "",
  email: "",
  subject: "",
  message: "",
})

const formErrors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const formRef = ref<HTMLElement>()

const isVisible = ref({
  info: false,
  form: false,
})

// Generate dynamic operation hours from backend
const formatOperationHours = (hours: any[]) => {
  if (!hours || hours.length === 0) return "";
  
  // Group by similar times
  const grouped = hours.reduce((acc: any, hour: any) => {
    const timeKey = `${hour.open_time}-${hour.close_time}`;
    if (!acc[timeKey]) acc[timeKey] = [];
    acc[timeKey].push(hour.day);
    return acc;
  }, {});
  
  return Object.entries(grouped)
    .map(([time, days]: [string, any]) => {
      const [open, close] = time.split('-');
      const daysList = days.join(', ');
      return `${daysList}: ${open} - ${close}`;
    })
    .join('\n');
}

const contactInfo = computed(() => {
  const info = backendContactInfo.value;
  if (!info) {
    return [
      {
        icon: "i-heroicons-map-pin",
        title: "Address",
        value: "5179 Dundas Street W",
        extra: "Etobicoke, ON M9A 1C2",
      },
      {
        icon: "i-heroicons-phone",
        title: "Phone",
        value: "905-430-5699",
        extra: "Call us anytime",
      },
      {
        icon: "i-heroicons-envelope",
        title: "Email",
        value: "info@thepearsonpub.com",
        extra: "We'll get back to you soon",
      },
    ];
  }

  return [
    {
      icon: "i-heroicons-map-pin",
      title: "Address",
      value: info.address.split(',')[0],
      extra: info.address.split(',').slice(1).join(','),
    },
    {
      icon: "i-heroicons-phone",
      title: "Phone",
      value: info.phone,
      extra: "Call us anytime",
    },
    {
      icon: "i-heroicons-envelope",
      title: "Email",
      value: info.email,
      extra: "We'll get back to you soon",
    },
    {
      icon: "i-heroicons-clock",
      title: "Hours",
      value: formatOperationHours(info.operationHours),
      extra: "Check our current hours",
    },
  ];
});

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
  const { isValid, errors } = validateForm(form.value)
  if (!isValid) {
    formErrors.value = errors
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Map form fields to match the API expected format
    const contactData = {
      firstName: form.value.name.split(' ')[0] || form.value.name,
      lastName: form.value.name.split(' ').slice(1).join(' ') || '',
      email: form.value.email,
      message: `Subject: ${form.value.subject}\n\nMessage: ${form.value.message}`
    }

    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: contactData
    })

    // Success
    form.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
    }
    formErrors.value = {}
    
    toast.add({
      title: "Success!",
      description: "Your message has been sent successfully. We'll get back to you soon!",
      color: "green",
    })
  } catch (error: any) {
    console.error('Contact form error:', error)
    
    toast.add({
      title: "Error",
      description: error.data?.message || "Failed to send message. Please try again or contact us directly.",
      color: "red",
    })
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  // Initialize contact data if not already loaded
  if (!backendContactInfo.value) {
    await fetchContactInfo();
  }
  
  setTimeout(() => { isVisible.value.info = true }, 300)
  setTimeout(() => { isVisible.value.form = true }, 600)
});

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
