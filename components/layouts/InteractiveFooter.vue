<template>
  <footer
    ref="footerRef"
    class="interactive-footer relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mt-20"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 z-0">
      <!-- Floating Orbs -->
      <div
        v-for="i in 6"
        :key="`orb-${i}`"
        class="floating-orb absolute rounded-full opacity-10"
        :class="`orb-${i}`"
        :style="{
          width: `${20 + i * 15}px`,
          height: `${20 + i * 15}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `radial-gradient(circle, ${
            orbColors[i % orbColors.length]
          }, transparent)`,
          animationDelay: `${i * 0.8}s`,
        }"
      ></div>

      <!-- Particle System -->
      <div class="particles-container absolute inset-0">
        <div
          v-for="i in particleCount"
          :key="`particle-${i}`"
          class="particle absolute w-1 h-1 bg-yellow-400 rounded-full opacity-70"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }"
        ></div>
      </div>

      <!-- Wave Animation -->
      <svg
        class="absolute bottom-0 left-0 w-full h-32 opacity-20"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          class="wave-path"
          d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
          fill="url(#waveGradient)"
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: #fbbf24; stop-opacity: 0.3" />
            <stop offset="50%" style="stop-color: #f59e0b; stop-opacity: 0.6" />
            <stop
              offset="100%"
              style="stop-color: #d97706; stop-opacity: 0.3"
            />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Main Footer Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Footer Top Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <!-- Brand Section -->
        <div class="footer-section col-span-1 lg:col-span-2">
          <div class="footer-brand mb-8">
            <!-- Interactive Logo -->
            <div
              ref="logoRef"
              class="logo-container group cursor-pointer mb-6 w-fit"
              @mouseenter="animateLogo"
              @mouseleave="resetLogo"
            >
              <h3
                class="text-3xl lg:text-4xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-all duration-300"
                style="font-family: 'Cinzel', 'Georgia', serif"
              >
                The Pearson Pub
              </h3>
              <div
                class="logo-underline h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mt-2 transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:to-yellow-500"
              ></div>
            </div>

            <p class="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              Where tradition meets taste. Experience authentic British pub
              culture with exceptional cuisine, craft beverages, and
              unforgettable entertainment.
            </p>

            <!-- Interactive Stats -->
            <div class="stats-grid grid grid-cols-3 gap-4 mb-8">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="stat-item text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                @mouseenter="animateStat"
              >
                <div
                  class="text-2xl font-bold text-yellow-400 group-hover:scale-110 transition-transform duration-300"
                >
                  {{ stat.value }}
                </div>
                <div
                  class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                >
                  {{ stat.label }}
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="social-links flex gap-4">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                :aria-label="social.name"
                class="social-link group relative w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/25"
                @mouseenter="animateSocialIcon"
              >
                <UIcon
                  :name="social.icon"
                  class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300"
                />
                <div
                  class="social-ripple absolute inset-0 rounded-full bg-yellow-400 opacity-0 scale-0 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300"
                ></div>
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h4 class="footer-title text-xl font-semibold mb-6 text-yellow-400">
            Quick Links
          </h4>
          <ul class="footer-links space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink
                :to="link.path"
                class="footer-link group relative inline-block text-gray-300 hover:text-yellow-400 transition-colors duration-300 py-1"
              >
                <span class="relative z-10">{{ link.name }}</span>
                <div
                  class="link-underline absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"
                ></div>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer-section">
          <h4 class="footer-title text-xl font-semibold mb-6 text-yellow-400">
            Contact
          </h4>
          <div class="contact-info space-y-4">
            <div
              v-for="contact in contactInfo"
              :key="contact.type"
              class="contact-item group flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 cursor-pointer"
              @click="handleContactClick(contact)"
            >
              <div
                class="contact-icon w-6 h-6 text-yellow-400 group-hover:text-yellow-300 group-hover:scale-110 transition-all duration-300 mt-0.5"
              >
                <UIcon :name="contact.icon" class="w-full h-full" />
              </div>
              <div class="contact-details flex-1">
                <div
                  class="text-gray-300 group-hover:text-white transition-colors duration-300"
                >
                  {{ contact.value }}
                </div>
                <div
                  v-if="contact.subtitle"
                  class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                >
                  {{ contact.subtitle }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter Signup -->
      <div
        class="newsletter-section bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-2xl p-8 mb-12 backdrop-blur-sm border border-yellow-500/20"
      >
        <div class="text-center max-w-2xl mx-auto">
          <h4 class="text-2xl font-bold mb-4 text-yellow-400">Stay Updated</h4>
          <p class="text-gray-300 mb-6">
            Get the latest news about events, specials, and exclusive offers.
          </p>

          <form
            @submit.prevent="handleNewsletterSubmit"
            class="newsletter-form flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              v-model="newsletterEmail"
              type="email"
              placeholder="Enter your email"
              class="newsletter-input flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
              required
            />
            <button
              type="submit"
              class="newsletter-btn px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Subscribe</span>
              <div v-else class="flex items-center gap-2">
                <div
                  class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                ></div>
                Joining...
              </div>
            </button>
          </form>

          <div
            v-if="newsletterMessage"
            class="newsletter-message mt-4 p-3 rounded-lg"
            :class="
              newsletterMessageType === 'success'
                ? 'bg-green-500/20 text-green-300'
                : 'bg-red-500/20 text-red-300'
            "
          >
            {{ newsletterMessage }}
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom border-t border-gray-700 pt-8">
        <div
          class="flex flex-col lg:flex-row justify-between items-center gap-6"
        >
          <div class="footer-legal text-gray-400 text-center lg:text-left">
            <p>
              &copy; {{ currentYear }} The Pearson Pub. All rights reserved.
            </p>
            <div class="legal-links flex flex-wrap gap-6 mt-2">
              <a
                href="/privacy"
                class="hover:text-yellow-400 transition-colors duration-300"
                >Privacy Policy</a
              >
              <span class="text-gray-600">•</span>
              <a
                href="/terms"
                class="hover:text-yellow-400 transition-colors duration-300"
                >Terms of Service</a
              >
              <span class="text-gray-600">•</span>
              <a
                href="/accessibility"
                class="hover:text-yellow-400 transition-colors duration-300"
                >Accessibility</a
              >
            </div>
          </div>

          <div class="footer-actions flex items-center gap-4">
            <!-- Back to Top Button -->
            <button
              @click="scrollToTop"
              class="back-to-top group relative w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-all duration-300 hover:scale-110"
              aria-label="Back to top"
            >
              <UIcon
                name="i-heroicons-arrow-up"
                class="w-5 h-5 text-yellow-400 group-hover:text-white transition-colors duration-300"
              />
              <div
                class="absolute inset-0 rounded-full border-2 border-yellow-400 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              ></div>
            </button>

            <!-- Theme Toggle -->
            <button
              @click="toggleTheme"
              class="theme-toggle group relative w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-gray-600 transition-all duration-300 hover:scale-110"
              aria-label="Toggle theme"
            >
              <UIcon
                :name="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { use3DAnimations } from "~/composables/use3DAnimations";

// Refs
const footerRef = ref<HTMLElement>();
const logoRef = ref<HTMLElement>();
const newsletterEmail = ref("");
const isSubmitting = ref(false);
const newsletterMessage = ref("");
const newsletterMessageType = ref<"success" | "error">("success");
const isDark = ref(true);

// 3D Animations
const { addFloatingElement, createGSAPAnimation, addParallaxElement } =
  use3DAnimations({
    enableParallax: true,
    intensity: 0.6,
  });

// Data
const orbColors = [
  "#fbbf24",
  "#f59e0b",
  "#d97706",
  "#92400e",
  "#78350f",
  "#451a03",
];

const particleCount = 30;

const stats = [
  { value: "25+", label: "Years" },
  { value: "500+", label: "Events" },
  { value: "10k+", label: "Happy Guests" },
];

const socialLinks = [
  { name: "Facebook", icon: "i-simple-icons-facebook", url: "#" },
  { name: "Instagram", icon: "i-simple-icons-instagram", url: "#" },
  { name: "Twitter", icon: "i-simple-icons-twitter", url: "#" },
  { name: "TikTok", icon: "i-simple-icons-tiktok", url: "#" },
];

const quickLinks = [
  { name: "Menu", path: "/menu" },
  { name: "Events", path: "/events" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Reservations", path: "/reservations" },
  { name: "Gift Cards", path: "/gift-cards" },
];

const contactInfo = [
  {
    type: "address",
    icon: "i-heroicons-map-pin",
    value: "123 High Street, London",
    subtitle: "City Centre Location",
  },
  {
    type: "phone",
    icon: "i-heroicons-phone",
    value: "+44 20 1234 5678",
    subtitle: "Call for reservations",
  },
  {
    type: "email",
    icon: "i-heroicons-envelope",
    value: "info@pearsonpub.co.uk",
    subtitle: "General inquiries",
  },
  {
    type: "hours",
    icon: "i-heroicons-clock",
    value: "Mon-Sun: 11AM-11PM",
    subtitle: "Kitchen closes at 10PM",
  },
];

// Computed
const currentYear = computed(() => new Date().getFullYear());

// Methods
const animateLogo = () => {
  if (logoRef.value) {
    createGSAPAnimation(logoRef.value, {
      animation: "bounce",
      duration: 0.6,
    });
  }
};

const resetLogo = () => {
  // Logo animation reset handled by CSS transitions
};

const animateStat = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  createGSAPAnimation(target, {
    animation: "pulse",
    duration: 0.4,
  });
};

const animateSocialIcon = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  createGSAPAnimation(target, {
    animation: "shake",
    duration: 0.5,
  });
};

const handleContactClick = (contact: any) => {
  switch (contact.type) {
    case "phone":
      window.open(`tel:${contact.value}`);
      break;
    case "email":
      window.open(`mailto:${contact.value}`);
      break;
    case "address":
      window.open(
        `https://maps.google.com/?q=${encodeURIComponent(contact.value)}`
      );
      break;
  }
};

const handleNewsletterSubmit = async () => {
  if (!newsletterEmail.value) return;

  isSubmitting.value = true;
  newsletterMessage.value = "";

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    newsletterMessage.value =
      "Thank you for subscribing! Check your email for confirmation.";
    newsletterMessageType.value = "success";
    newsletterEmail.value = "";
  } catch (error) {
    newsletterMessage.value = "Something went wrong. Please try again.";
    newsletterMessageType.value = "error";
  } finally {
    isSubmitting.value = false;

    // Clear message after 5 seconds
    setTimeout(() => {
      newsletterMessage.value = "";
    }, 5000);
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  // Implement theme toggle logic here
  document.documentElement.classList.toggle("dark");
};

// Lifecycle
onMounted(() => {
  nextTick(() => {
    // Add parallax effect to footer
    if (footerRef.value) {
      addParallaxElement(footerRef.value, {
        speed: 0.5,
        direction: "y",
      });
    }

    // Add floating animations to footer sections
    const footerSections = document.querySelectorAll(".footer-section");
    footerSections.forEach((section, index) => {
      addFloatingElement(section as HTMLElement, {
        amplitude: 3,
        speed: 0.01 + index * 0.005,
        direction: "y",
        delay: index * 0.2,
      });
    });
  });
});
</script>

<style scoped>
.interactive-footer {
  position: relative;
  background-attachment: fixed;
}

/* Floating Orbs Animation */
.floating-orb {
  animation: floatOrb 8s ease-in-out infinite;
}

@keyframes floatOrb {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.1;
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
    opacity: 0.15;
  }
  75% {
    transform: translateY(-30px) rotate(270deg);
    opacity: 0.25;
  }
}

/* Particle Animation */
.particle {
  animation: particleFloat 4s linear infinite;
}

@keyframes particleFloat {
  0% {
    transform: translateY(0px) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-100vh) scale(0);
    opacity: 0;
  }
}

/* Wave Animation */
.wave-path {
  animation: waveMove 6s ease-in-out infinite;
  transform-origin: center;
}

@keyframes waveMove {
  0%,
  100% {
    transform: translateX(0) scaleY(1);
  }
  50% {
    transform: translateX(-50px) scaleY(1.1);
  }
}

/* Footer Sections Animation */
.footer-section {
  animation: slideInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.footer-section:nth-child(1) {
  animation-delay: 0.1s;
}
.footer-section:nth-child(2) {
  animation-delay: 0.2s;
}
.footer-section:nth-child(3) {
  animation-delay: 0.3s;
}
.footer-section:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Interactive Elements */
.footer-link:hover .link-underline {
  transform-origin: left;
}

.contact-item:hover .contact-icon {
  animation: iconBounce 0.6s ease-in-out;
}

@keyframes iconBounce {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

/* Newsletter Form */
.newsletter-input:focus {
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
}

.newsletter-btn:hover {
  box-shadow: 0 10px 25px rgba(251, 191, 36, 0.3);
}

/* Social Links Hover Effects */
.social-link::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-link:hover::before {
  opacity: 1;
}

/* Stats Grid Animations */
.stat-item:hover {
  animation: statGlow 0.6s ease-in-out;
}

@keyframes statGlow {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(251, 191, 36, 0);
  }
  50% {
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .social-links {
    justify-content: center;
  }

  .newsletter-form {
    flex-direction: column;
  }
}

/* Dark Mode Enhancements */
.dark .interactive-footer {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .floating-orb,
  .particle,
  .wave-path {
    animation: none;
  }
}

/* Print Styles */
@media print {
  .interactive-footer {
    background: white !important;
    color: black !important;
  }

  .floating-orb,
  .particle,
  .particles-container {
    display: none;
  }
}
</style>
