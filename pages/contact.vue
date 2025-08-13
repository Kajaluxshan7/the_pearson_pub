<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Contact Hero Section -->
    <section class="hero-section relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      
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
            class="contact-info space-y-8"
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
                class="group flex items-start space-x-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors duration-300">
                    <UIcon :name="item.icon" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-lg text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{{ item.title }}</h3>
                  <!-- Special handling for hours to display multiple lines -->
                  <div v-if="item.title === 'Hours'" class="text-gray-600 dark:text-gray-300 mt-1">
                    <div 
                      v-for="(line, lineIndex) in item.value.split('\n')" 
                      :key="lineIndex"
                      class="py-1 font-medium"
                    >
                      {{ line }}
                    </div>
                  </div>
                  <p v-else class="text-gray-600 dark:text-gray-300 mt-1">{{ item.value }}</p>
                  <p v-if="item.extra" class="text-gray-500 dark:text-gray-400 text-sm mt-1">{{ item.extra }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div
            ref="formRef"
            class=""
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
                >
                  View Menu
                </UButton>
                <UButton
                  to="/events"
                  color="yellow"
                  variant="outline"
                  size="lg"
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
                  <UFormGroup label="First Name" required :error="formErrors.firstName">
                    <UInput
                      v-model="form.firstName"
                      placeholder="First name"
                      :error="!!formErrors.firstName"
                      autocomplete="given-name"
                      size="lg"
                    />
                    <p v-if="formErrors.firstName" class="text-red-600 text-sm mt-1">{{ formErrors.firstName }}</p>
                  </UFormGroup>

                  <UFormGroup label="Last Name" required :error="formErrors.lastName">
                    <UInput
                      v-model="form.lastName"
                      placeholder="Last name"
                      :error="!!formErrors.lastName"
                      autocomplete="family-name"
                      size="lg"
                    />
                    <p v-if="formErrors.lastName" class="text-red-600 text-sm mt-1">{{ formErrors.lastName }}</p>
                  </UFormGroup>
                </div>
                <UFormGroup label="Email" required :error="formErrors.email" class="mt-6">
                  <UInput
                    v-model="form.email"
                    type="email"
                    placeholder="Your email"
                    :error="!!formErrors.email"
                    autocomplete="email"
                    size="lg"
                    class="w-full"
                  />
                  <p v-if="formErrors.email" class="text-red-600 text-sm mt-1">{{ formErrors.email }}</p>
                </UFormGroup>

                <UFormGroup label="Subject" required :error="formErrors.subject">
                  <UInput
                    v-model="form.subject"
                    placeholder="Subject"
                    :error="!!formErrors.subject"
                    size="lg"
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
                  />
                  <p v-if="formErrors.message" class="text-red-600 text-sm mt-1">{{ formErrors.message }}</p>
                </UFormGroup>

                <UButton
                  type="submit"
                  color="yellow"
                  variant="solid"
                  size="xl"
                  :loading="isSubmitting"
                  class="flex items-center justify-center w-auto mx-auto"
                  :disabled="isSubmitting"
                >
                  <UIcon name="i-heroicons-paper-airplane" class="w-5 h-5 mr-0" />
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
import { useSEO } from '@/composables/useSEO';
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "The Pearson Pub",
  "image": "https://thepearsonpubwhitby.ca/images/pub/interior-main.jpg",
  "@id": "https://thepearsonpubwhitby.ca/contact",
  "url": "https://thepearsonpubwhitby.ca/contact",
  "telephone": "+1-905-668-2828",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "101 Brock St S",
    "addressLocality": "Whitby",
    "addressRegion": "ON",
    "postalCode": "L1N 4J9",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.8755,
    "longitude": -78.9439
  },
  "openingHours": "Mo-Su 11:00-02:00"
};
onMounted(() => {
  useSEO().setSEO({
    title: 'Contact Us',
    description: 'Contact The Pearson Pub for reservations, inquiries, or feedback.',
    canonical: 'https://thepearsonpubwhitby.ca/contact',
    ogImage: '/images/pub/interior-main.jpg',
    structuredData: [{ type: 'application/ld+json', innerHTML: JSON.stringify(structuredData) }],
  });
});
import { ref, computed, onMounted } from "vue"
import { useLandingPageData } from "~/composables/useLandingPageData";
import { TimezoneUtil } from "~/utils/timezone";

interface ContactInfo {
  icon: string
  title: string
  value: string
  extra?: string
}

interface FormData {
  firstName: string
  lastName: string
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
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
})

const formErrors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const formRef = ref<HTMLElement>()

// Enhanced operation hours formatting with categories using TimezoneUtil
const formatOperationHours = (hours: any[]) => {
  if (!hours || hours.length === 0) return "";
  
  // Helper function to capitalize day names
  const capitalizeDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  // Group by similar times
  const grouped = hours.reduce((acc: any, hour: any) => {
    const timeKey = `${hour.open_time}-${hour.close_time}`;
    if (!acc[timeKey]) acc[timeKey] = [];
    acc[timeKey].push(capitalizeDay(hour.day));
    return acc;
  }, {});
  
  // Format each group and join with line breaks
  return Object.entries(grouped)
    .map(([time, days]: [string, any]) => {
      const [open, close] = time.split('-');
      const formattedDays = days.join(', ');
      
      // Use TimezoneUtil for proper formatting
      const formattedOpen = TimezoneUtil.formatTime(open);
      const formattedClose = TimezoneUtil.formatTime(close);
      
      // Format without "(next day)" text
      return `${formattedDays}: ${formattedOpen} - ${formattedClose}`;
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
        value: "101 Mary St, Whitby, ON, L1N 2R4",
        extra: "Visit us in the heart of Whitby",
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
        value: "thepearsonpub@rogers.com",
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

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required"
  }
  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required"
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
  formErrors.value = {} // Clear previous errors
  
  try {
    // Map form fields to match the API expected format
    const contactData = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      subject: form.value.subject,
      message: form.value.message
    }
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: contactData,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Contact form response:', response)

    // Success
    form.value = {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    }
    
    toast.add({
      title: "Success!",
      description: "Your message has been sent successfully. We'll get back to you soon!",
      color: "green",
    })
  } catch (error: any) {
    console.error('Contact form error:', error)
    
    let errorMessage = "Failed to send message. Please try again or contact us directly."
    
    if (error.data?.message) {
      errorMessage = error.data.message
    } else if (error.message) {
      errorMessage = error.message
    }
    
    toast.add({
      title: "Error",
      description: errorMessage,
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
