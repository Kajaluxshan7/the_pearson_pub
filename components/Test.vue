<template>
    <div>
        <h1>Test Component</h1>
        <p>{{ message }}</p>
        <button @click="increment">Count: {{ count }}</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello from Nuxt.js Test Component!')
const count = ref(0)

function increment() {
    count.value++
}
</script>

<style scoped>
h1 {
    color: #0070f3;
}
button {
    margin-top: 10px;
}
</style>