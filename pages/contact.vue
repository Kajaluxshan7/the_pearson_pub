<template>
  <div class="contact-page">
    <h1>Contact Us</h1>
    <form @submit.prevent="handleSubmit" novalidate class="contact-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model.trim="form.name"
          type="text"
          id="name"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model.trim="form.email"
          type="email"
          id="email"
          required
        />
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea
          v-model.trim="form.message"
          id="message"
          rows="5"
          required
        ></textarea>
      </div>

      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? "Sending…" : "Send Message" }}
      </button>
    </form>

    <transition name="fade">
      <p
        v-if="responseMessage"
        :class="{'success': responseSuccess, 'error': !responseSuccess}"
        class="response-msg"
      >
        {{ responseMessage }}
      </p>
    </transition>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

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
    const res = await $fetch('/the_pearson_pub/api/contact', {
      method: 'POST',
      body: form
    })

    if (res.success) {
      responseSuccess.value = true
      responseMessage.value = res.message || 'Your message has been sent!'
      // reset form
      form.name = ''
      form.email = ''
      form.message = ''
    } else {
      responseMessage.value = res.error || 'Failed to send message.'
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
.contact-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
}

.contact-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit-btn {
  padding: 0.7rem 1.5rem;
  background-color: #ff5722;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.response-msg {
  margin-top: 1rem;
  padding: 0.8rem;
  border-radius: 4px;
  text-align: center;
}

.success {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.error {
  background-color: #ffebee;
  color: #c62828;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
