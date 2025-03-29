<template>
  <div class="contact-page">
    <h1>Contact Us</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name</label>
        <input v-model="form.name" type="text" id="name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input v-model="form.email" type="email" id="email" required />
      </div>
      <div>
        <label for="message">Message</label>
        <textarea
          v-model="form.message"
          id="message"
          rows="5"
          required
        ></textarea>
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? "Sending..." : "Send Message" }}
      </button>
    </form>
    <p v-if="responseMessage">{{ responseMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  name: "",
  email: "",
  message: "",
});

const loading = ref(false);
const responseMessage = ref("");

async function handleSubmit() {
  loading.value = true;
  try {
    const res = await $fetch("/api/contact", {
      method: "POST",
      body: form.value,
    });
    responseMessage.value = res.success
      ? "Your message has been sent!"
      : "Something went wrong, please try again.";
  } catch (error) {
    console.error(error);
    responseMessage.value = "An error occurred. Please try again later.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.contact-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 20px;
}
form > div {
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
}
button {
  padding: 0.7rem 1.5rem;
  background-color: #ff5722;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
