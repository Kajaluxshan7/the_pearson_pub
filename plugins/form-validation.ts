import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("validateForm", (form: Record<string, any>) => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!form.name || form.name.trim().length < 2) {
      errors.name = "Name is required and must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Subject validation
    if (!form.subject || form.subject.trim().length < 3) {
      errors.subject = "Subject is required and must be at least 3 characters";
    }

    // Message validation
    if (!form.message || form.message.trim().length < 10) {
      errors.message = "Message is required and must be at least 10 characters";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  });
});
