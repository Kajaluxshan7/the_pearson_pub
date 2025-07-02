<template>
  <div
    ref="containerRef"
    class="absolute inset-0 overflow-hidden pointer-events-none"
  >
    <!-- 3D Canvas Container -->
    <div ref="threeContainer" class="w-full h-full opacity-20"></div>

    <!-- Floating Particles Overlay -->
    <div class="absolute inset-0">
      <div
        v-for="particle in floatingParticles"
        :key="particle.id"
        :ref="(el) => addFloatingRef(el, particle.id)"
        class="absolute w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-60"
        :style="{
          left: particle.x + '%',
          top: particle.y + '%',
          animationDelay: particle.delay + 's',
        }"
      ></div>
    </div>

    <!-- Interactive Light Rays -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        v-for="ray in lightRays"
        :key="ray.id"
        class="absolute bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"
        :style="{
          width: ray.width + 'px',
          height: ray.height + 'px',
          left: ray.x + '%',
          top: ray.y + '%',
          transform: `rotate(${ray.rotation}deg)`,
          animationDuration: ray.duration + 's',
          opacity: ray.opacity,
        }"
      ></div>
    </div>

    <!-- Morphing Geometry -->
    <div class="absolute inset-0">
      <svg
        class="w-full h-full"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="morphGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" style="stop-color: #ffd700; stop-opacity: 0.1" />
            <stop offset="50%" style="stop-color: #ffa500; stop-opacity: 0.2" />
            <stop
              offset="100%"
              style="stop-color: #ff6b35; stop-opacity: 0.1"
            />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          ref="morphPath"
          :d="safeMorphPath"
          fill="url(#morphGradient)"
          filter="url(#glow)"
          class="transition-all duration-1000 ease-in-out"
        />

        <!-- Additional geometric shapes -->
        <circle
          v-for="circle in morphingCircles"
          :key="circle.id"
          :cx="circle.x"
          :cy="circle.y"
          :r="circle.r"
          fill="url(#morphGradient)"
          filter="url(#glow)"
          class="animate-pulse"
          :style="{ animationDelay: circle.delay + 's' }"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import { use3DAnimations } from "~/composables/use3DAnimations";

interface FloatingParticle {
  id: string;
  x: number;
  y: number;
  delay: number;
  speed: number;
}

interface LightRay {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  duration: number;
  opacity: number;
}

interface MorphingCircle {
  id: string;
  x: number;
  y: number;
  r: number;
  delay: number;
}

const props = withDefaults(
  defineProps<{
    intensity?: number;
    enableParticles?: boolean;
    enableRays?: boolean;
    enableMorphing?: boolean;
    particleCount?: number;
    colorScheme?: "golden" | "blue" | "emerald" | "rose";
  }>(),
  {
    intensity: 1,
    enableParticles: true,
    enableRays: true,
    enableMorphing: true,
    particleCount: 50,
    colorScheme: "golden",
  }
);

const containerRef = ref<HTMLElement | null>(null);
const threeContainer = ref<HTMLElement | null>(null);
const morphPath = ref("");

const floatingParticles = ref<FloatingParticle[]>([]);
const lightRays = ref<LightRay[]>([]);
const morphingCircles = ref<MorphingCircle[]>([]);
const floatingRefs = ref<Map<string, HTMLElement>>(new Map());

const { initThreeScene, addFloatingElement, createMorphingEffect } =
  use3DAnimations({
    intensity: props.intensity,
    enableParallax: true,
    enableFloating: true,
    enableMorphing: props.enableMorphing,
  });

let animationFrame: number | null = null;
let mouseX = 0;
let mouseY = 0;

// Generate floating particles
const generateFloatingParticles = () => {
  if (!props.enableParticles) return;

  floatingParticles.value = Array.from(
    { length: props.particleCount },
    (_, i) => ({
      id: `particle-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      speed: 0.5 + Math.random() * 1.5,
    })
  );
};

// Generate light rays
const generateLightRays = () => {
  if (!props.enableRays) return;

  lightRays.value = Array.from({ length: 8 }, (_, i) => ({
    id: `ray-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    width: 200 + Math.random() * 400,
    height: 2 + Math.random() * 4,
    rotation: Math.random() * 360,
    duration: 10 + Math.random() * 20,
    opacity: 0.1 + Math.random() * 0.3,
  }));
};

// Generate morphing circles
const generateMorphingCircles = () => {
  if (!props.enableMorphing) return;

  morphingCircles.value = Array.from({ length: 12 }, (_, i) => ({
    id: `circle-${i}`,
    x: Math.random() * 1200,
    y: Math.random() * 800,
    r: 20 + Math.random() * 80,
    delay: Math.random() * 3,
  }));
};

// Computed property to ensure morphPath is always a string
const safeMorphPath = computed(() =>
  typeof morphPath.value === "string" ? morphPath.value : ""
);

// Generate morphing path based on mouse position
const updateMorphPath = () => {
  const controlPoint1X = 300 + mouseX * 0.5;
  const controlPoint1Y = 200 + mouseY * 0.3;
  const controlPoint2X = 900 + mouseX * 0.3;
  const controlPoint2Y = 600 + mouseY * 0.5;

  const pathString = `
    M 0,400 
    Q ${controlPoint1X},${controlPoint1Y} 600,400 
    Q ${controlPoint2X},${controlPoint2Y} 1200,400 
    L 1200,800 
    L 0,800 
    Z
  `;
  morphPath.value = typeof pathString === "string" ? pathString : "";
};

// Mouse tracking for interactive effects
const handleMouseMove = (event: MouseEvent) => {
  const rect = containerRef.value?.getBoundingClientRect();
  if (!rect) return;

  mouseX = ((event.clientX - rect.left) / rect.width) * 100;
  mouseY = ((event.clientY - rect.top) / rect.height) * 100;

  updateMorphPath();
};

// Add floating element reference
const addFloatingRef = (el: HTMLElement | null, id: string) => {
  if (el) {
    floatingRefs.value.set(id, el);
  }
};

// Animation loop for continuous effects
const animateElements = () => {
  // Animate particles based on mouse position
  floatingRefs.value.forEach((element, id) => {
    const particle = floatingParticles.value.find((p) => p.id === id);
    if (particle) {
      const offset = Math.sin(Date.now() * 0.001 * particle.speed) * 20;
      const mouseInfluence = {
        x: (mouseX - particle.x) * 0.02,
        y: (mouseY - particle.y) * 0.02,
      };

      element.style.transform = `
        translate(${offset + mouseInfluence.x}px, ${
        offset + mouseInfluence.y
      }px) 
        scale(${0.8 + Math.sin(Date.now() * 0.002) * 0.2})
      `;
    }
  });

  animationFrame = requestAnimationFrame(animateElements);
};

// Initialize 3D background
const init3DBackground = async () => {
  await nextTick();

  if (threeContainer.value) {
    initThreeScene(threeContainer.value);
  }

  // Add floating animation to particles
  setTimeout(() => {
    floatingRefs.value.forEach((element) => {
      addFloatingElement(element, 15, 0.002);
      createMorphingEffect(element);
    });
  }, 100);
};

// Cleanup
const cleanup = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

  if (typeof window !== "undefined") {
    window.removeEventListener("mousemove", handleMouseMove);
  }
};

onMounted(async () => {
  generateFloatingParticles();
  generateLightRays();
  generateMorphingCircles();
  updateMorphPath();

  await init3DBackground();
  animateElements();

  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", handleMouseMove);
  }
});

onUnmounted(() => {
  cleanup();
});
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

@keyframes ray-drift {
  0% {
    transform: translateX(-100px) rotate(0deg);
  }
  50% {
    transform: translateX(100px) rotate(180deg);
  }
  100% {
    transform: translateX(-100px) rotate(360deg);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.6));
  }
}

.floating-particle {
  animation: float 6s ease-in-out infinite;
}

.light-ray {
  animation: ray-drift 15s linear infinite;
}

.morphing-circle {
  animation: pulse-glow 4s ease-in-out infinite;
}

/* Color scheme variations */
.golden {
  --primary: #ffd700;
  --secondary: #ffa500;
  --accent: #ff6b35;
}

.blue {
  --primary: #60a5fa;
  --secondary: #3b82f6;
  --accent: #1d4ed8;
}

.emerald {
  --primary: #34d399;
  --secondary: #10b981;
  --accent: #059669;
}

.rose {
  --primary: #f472b6;
  --secondary: #ec4899;
  --accent: #db2777;
}
</style>
