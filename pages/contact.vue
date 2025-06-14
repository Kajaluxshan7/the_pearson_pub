<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Contact Us
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-fade-in-up">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <UFormGroup
              label="First Name"
              required
              :error="form.errors.firstName"
            >
              <UInput
                v-model="form.firstName"
                placeholder="John"
                icon="i-heroicons-user"
                :ui="{
                  base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
                  form: 'form-input',
                  width: 'w-full',
                  input: 'block w-full ps-11',
                  icon: {
                    base: 'flex-shrink-0 text-gray-400 dark:text-gray-500',
                    padding: 'ps-3'
                  }
                }"
                :class="{'border-red-300 dark:border-red-500': form.errors.firstName}"
                @input="form.errors.firstName = ''"
              />
            </UFormGroup>

            <UFormGroup
              label="Last Name"
              required
              :error="form.errors.lastName"
            >
              <UInput
                v-model="form.lastName"
                placeholder="Doe"
                icon="i-heroicons-user"
                :ui="{
                  base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
                  form: 'form-input',
                  width: 'w-full',
                  input: 'block w-full ps-11',
                  icon: {
                    base: 'flex-shrink-0 text-gray-400 dark:text-gray-500',
                    padding: 'ps-3'
                  }
                }"
                :class="{'border-red-300 dark:border-red-500': form.errors.lastName}"
                @input="form.errors.lastName = ''"
              />
            </UFormGroup>
          </div>

          <UFormGroup
            label="Email"
            required
            :error="form.errors.email"
          >
            <UInput
              v-model="form.email"
              type="email"
              placeholder="john@example.com"
              icon="i-heroicons-envelope"
              :ui="{
                base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
                form: 'form-input',
                width: 'w-full',
                input: 'block w-full ps-11',
                icon: {
                  base: 'flex-shrink-0 text-gray-400 dark:text-gray-500',
                  padding: 'ps-3'
                }
              }"
              :class="{'border-red-300 dark:border-red-500': form.errors.email}"
              @input="form.errors.email = ''"
            />
          </UFormGroup>

          <UFormGroup
            label="Message"
            required
            :error="form.errors.message"
          >
            <UTextarea
              v-model="form.message"
              placeholder="Your message here..."
              rows="5"
              :ui="{
                base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
                form: 'form-textarea',
                width: 'w-full'
              }"
              :class="{'border-red-300 dark:border-red-500': form.errors.message}"
              @input="form.errors.message = ''"
            />
          </UFormGroup>

          <div class="flex justify-end">
            <UButton
              type="submit"
              color="yellow"
              variant="solid"
              :loading="isLoading"
              :disabled="isLoading"
              size="lg"
              class="w-full sm:w-auto"
            >
              <template #leading>
                <UIcon name="i-heroicons-paper-airplane" />
              </template>
              {{ isLoading ? 'Sending...' : 'Send Message' }}
            </UButton>
          </div>
        </form>
      </div>

      <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 animate-fade-in">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
          <div class="flex items-center mb-4">
            <UIcon
              name="i-heroicons-map-pin"
              class="w-6 h-6 text-yellow-500 mr-2"
            />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Visit Us
            </h3>
          </div>
          <p class="text-gray-600 dark:text-gray-300">
            123 Pub Street<br />
            Whitby<br />
            North Yorkshire<br />
            YO21 1AB
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
          <div class="flex items-center mb-4">
            <UIcon
              name="i-heroicons-phone"
              class="w-6 h-6 text-yellow-500 mr-2"
            />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Contact Info
            </h3>
          </div>
          <p class="text-gray-600 dark:text-gray-300">
            Phone: <a href="tel:01947123456" class="hover:text-yellow-500 transition-colors">01947 123 456</a><br />
            Email: <a href="mailto:info@pearsonpub.com" class="hover:text-yellow-500 transition-colors">info@pearsonpub.com</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Contact Us'
})

const toast = useToast()
const isLoading = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  errors: {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  }
})

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(form.errors).forEach(key => {
    form.errors[key as keyof typeof form.errors] = ''
  })

  // Validate First Name
  if (!form.firstName.trim()) {
    form.errors.firstName = 'First name is required'
    isValid = false
  }

  // Validate Last Name
  if (!form.lastName.trim()) {
    form.errors.lastName = 'Last name is required'
    isValid = false
  }

  // Validate Email
  if (!form.email.trim()) {
    form.errors.email = 'Email is required'
    isValid = false
  } else if (!validateEmail(form.email)) {
    form.errors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Validate Message
  if (!form.message.trim()) {
    form.errors.message = 'Message is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    toast.add({
      id: 'validation-error',
      title: 'Form Error',
      description: 'Please check the form for errors',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red'
    })
    return
  }

  try {
    isLoading.value = true
    
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        message: form.message
      }
    })

    toast.add({
      id: 'success',
      title: 'Message Sent',
      description: 'Thank you for your message. We\'ll get back to you soon!',
      icon: 'i-heroicons-check-circle',
      color: 'green'
    })

    // Reset form
    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.message = ''
    
  } catch (error: any) {
    toast.add({
      id: 'error',
      title: 'Error',
      description: error.message || 'Something went wrong. Please try again.',
      icon: 'i-heroicons-x-circle',
      color: 'red'
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
