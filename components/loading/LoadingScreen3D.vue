<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center select-none"
    role="alert"
    aria-live="assertive"
    aria-busy="true"
  >
    <!-- 3D Background Canvas -->
    <div ref="threeContainer" class="absolute inset-0"></div>

    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95 backdrop-blur-sm"
      aria-hidden="true"
    ></div>

    <!-- Loading Content -->
    <div class="relative z-10 text-center text-white max-w-lg mx-auto px-6">
      <!-- Animated Logo + Orbiting Particles -->
      <div class="mb-12">
        <div class="relative w-32 h-32 mx-auto mb-6">
          <!-- Outer rotating ring -->
          <div
            class="absolute inset-0 rounded-full border-4 border-yellow-500/30 animate-spin"
            aria-hidden="true"
          ></div>
          <!-- Middle counter-rotating ring -->
          <div
            class="absolute inset-3 rounded-full border-3 border-yellow-400/50 animate-spin-reverse"
            aria-hidden="true"
          ></div>
          <!-- Inner pulsing core -->
          <div
            class="absolute inset-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 animate-pulse-glow flex items-center justify-center"
          >
            <UIcon
              :name="iconName"
              class="w-12 h-12 text-white animate-float"
              aria-hidden="true"
            />
          </div>

          <!-- Floating orbiting particles -->
          <div
            v-for="i in 8"
            :key="i"
            class="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60"
            :style="{
              animation: `orbit 3s linear infinite`,
              animationDelay: i * 0.375 + 's',
              transformOrigin: '64px 64px',
            }"
            aria-hidden="true"
          ></div>
        </div>

        <h1
          class="text-3xl font-bold text-yellow-400 mb-2 animate-text-glow"
          aria-label="Loading Title"
        >
          {{ title }}
        </h1>
        <p class="text-gray-300 text-lg" aria-live="polite" aria-atomic="true">
          {{ currentText || subtitle }}
        </p>
      </div>

      <!-- Loading Progress -->
      <div
        class="mb-8"
        role="progressbar"
        :aria-valuenow="Math.round(easedProgress)"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Loading progress"
      >
        <div class="relative mb-4">
          <div
            class="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm"
          >
            <div
              class="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full transition-all duration-700 ease-out relative"
              :style="{ width: easedProgress + '%' }"
            >
              <!-- Glowing shimmer -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
              ></div>
            </div>
          </div>

          <!-- Progress percentage -->
          <div class="flex justify-between items-center mt-3 text-sm">
            <span class="text-gray-400">Loading...</span>
            <span class="font-bold text-yellow-400"
              >{{ Math.round(easedProgress) }}%</span
            >
          </div>
        </div>
      </div>

      <!-- Error state -->
      <div
        v-if="error"
        class="mt-8 p-4 bg-red-900/70 border border-red-500/70 rounded-lg backdrop-blur-sm"
        role="alert"
        aria-live="assertive"
      >
        <UIcon
          name="i-heroicons-exclamation-triangle"
          class="w-6 h-6 text-red-400 mx-auto mb-2"
          aria-hidden="true"
        />
        <p class="text-red-200 mb-3">{{ error }}</p>
        <UButton
          @click="$emit('retry')"
          color="red"
          variant="outline"
          size="sm"
          class="hover:scale-105 transition-transform"
        >
          Try Again
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import * as THREE from "three";

interface Props {
  progress?: number;
  texts: string[];
  title?: string;
  subtitle?: string;
  iconName?: string;
  error?: string | null;
}

// Default props values with withDefaults
const props = withDefaults(defineProps<Props>(), {
  progress: 0,
  title: "The Pearson Pub",
  subtitle: "Preparing your experience",
  iconName: "i-heroicons-home",
  error: null,
});

defineEmits<{
  retry: [];
}>();

const threeContainer = ref<HTMLElement | null>(null);
const currentText = ref("");
const currentTextIndex = ref(0);
const textFadeTimeout = ref<number | null>(null);

let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let animationId: number | null = null;
let particles: THREE.Points | null = null;
let donut: THREE.Mesh | null = null;

// Smooth easing for progress bar (lerp)
const easedProgress = ref(props.progress || 0);
let easingAnimationId: number | null = null;
const easeProgressTo = (target: number) => {
  if (typeof window === "undefined") return;
  const step = () => {
    easedProgress.value += (target - easedProgress.value) * 0.1;
    if (Math.abs(target - easedProgress.value) > 0.1) {
      easingAnimationId = requestAnimationFrame(step);
    } else {
      easedProgress.value = target;
      if (easingAnimationId) cancelAnimationFrame(easingAnimationId);
      easingAnimationId = null;
    }
  };
  if (!easingAnimationId) easingAnimationId = requestAnimationFrame(step);
};

// Typewriter effect with fade transition and auto-cycle texts
const typewriterEffect = (text: string) => {
  currentText.value = "";
  let i = 0;
  let typing: ReturnType<typeof setInterval> | null = null;
  if (textFadeTimeout.value) clearTimeout(textFadeTimeout.value);

  typing = setInterval(() => {
    if (i < text.length) {
      currentText.value += text.charAt(i);
      i++;
    } else {
      if (typing) clearInterval(typing);
      textFadeTimeout.value = Number(
        setTimeout(() => {
          currentTextIndex.value =
            (currentTextIndex.value + 1) % props.texts.length;
        }, 2000)
      );
    }
  }, 50);

  onUnmounted(() => {
    if (typing) clearInterval(typing);
    if (textFadeTimeout.value) clearTimeout(textFadeTimeout.value);
  });
};

// Initialize 3D background with particles + donut torus
const init3D = () => {
  if (!threeContainer.value) return;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 6;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  threeContainer.value.appendChild(renderer.domElement);

  // Particles setup
  const particleCount = 200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

    velocities[i * 3] = (Math.random() - 0.5) * 0.002;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffd700,
    size: 0.07,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Donut torus ring behind particles for depth
  const torusGeometry = new THREE.TorusGeometry(2.5, 0.2, 16, 100);
  const torusMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd700,
    transparent: true,
    opacity: 0.15,
  });
  donut = new THREE.Mesh(torusGeometry, torusMaterial);
  scene.add(donut);

  animate3D();
};

// Animate particles & donut
const animate3D = () => {
  if (typeof window === "undefined") return;
  if (!scene || !camera || !renderer || !particles || !donut) return;

  animationId = requestAnimationFrame(animate3D);

  // Update particle positions based on velocity
  const positions = particles.geometry.attributes.position
    .array as Float32Array;
  const velocities = particles.geometry.attributes.velocity
    .array as Float32Array;

  for (let i = 0; i < positions.length; i += 3) {
    positions[i] += velocities[i];
    positions[i + 1] += velocities[i + 1];
    positions[i + 2] += velocities[i + 2];

    // Bounce back if out of bounds
    for (let j = 0; j < 3; j++) {
      if (positions[i + j] > 10 || positions[i + j] < -10) {
        velocities[i + j] = -velocities[i + j];
      }
    }
  }
  particles.geometry.attributes.position.needsUpdate = true;

  // Slowly rotate donut ring
  donut.rotation.x += 0.003;
  donut.rotation.y += 0.005;

  // Subtle camera bobbing for depth
  camera.position.x = Math.sin(Date.now() * 0.0004) * 0.4;
  camera.position.y = Math.cos(Date.now() * 0.0006) * 0.3;

  renderer.render(scene, camera);
};

// Cleanup 3D on unmount
const cleanup3D = () => {
  if (animationId) cancelAnimationFrame(animationId);
  if (renderer && threeContainer.value) {
    threeContainer.value.removeChild(renderer.domElement);
    renderer.dispose();
  }
};

// Debounced resize handler
let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, 200);
};

// Watch props.progress to smoothly ease progress bar
watch(
  () => props.progress,
  (newVal) => {
    if (typeof window !== "undefined" && typeof newVal === "number") {
      easeProgressTo(newVal);
    }
  },
  { immediate: true }
);

// Watch text changes, trigger typewriter
watch(
  () => props.texts[currentTextIndex.value],
  (newText) => {
    if (newText) typewriterEffect(newText);
  },
  { immediate: true }
);

onMounted(() => {
  if (typeof window !== "undefined") {
    // Initialize easedProgress to current progress
    easedProgress.value = props.progress || 0;
    init3D();
    window.addEventListener("resize", handleResize);
  }
});

onUnmounted(() => {
  cleanup3D();
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
@keyframes spin-reverse {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes orbit {
  0% {
    transform: rotate(0deg) translateX(64px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(64px) rotate(-360deg);
  }
}

@keyframes text-glow {
  0%,
  100% {
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes bounce-sequence {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

.animate-spin-reverse {
  animation: spin-reverse 3s linear infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-text-glow {
  animation: text-glow 2s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-bounce-sequence {
  animation: bounce-sequence 1.4s infinite;
}

/* Fade transition for typewriter text */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Typewriter cursor blink */
.typewriter {
  border-right: 2px solid #ffd700;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  50% {
    border-color: #ffd700;
  }
  51%,
  100% {
    border-color: transparent;
  }
}
</style>
