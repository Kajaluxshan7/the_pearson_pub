import { ref, onMounted, onUnmounted, nextTick, type Ref } from "vue";
import * as THREE from "three";

interface Animation3DConfig {
  enableParallax?: boolean;
  enableFloating?: boolean;
  enableRotation?: boolean;
  enableMorphing?: boolean;
  intensity?: number;
  speed?: number;
}

interface FloatingElement {
  id: string;
  element: HTMLElement;
  originalY: number;
  amplitude: number;
  frequency: number;
  phase: number;
}

interface RotatingElement {
  id: string;
  element: HTMLElement;
  rotationSpeed: number;
  axis: "x" | "y" | "z";
}

export const use3DAnimations = (config: Animation3DConfig = {}) => {
  const {
    enableParallax = true,
    enableFloating = true,
    enableRotation = true,
    enableMorphing = false,
    intensity = 1,
    speed = 1,
  } = config;

  const scene = ref<THREE.Scene | null>(null);
  const camera = ref<THREE.PerspectiveCamera | null>(null);
  const renderer = ref<THREE.WebGLRenderer | null>(null);
  const animationId = ref<number | null>(null);
  const mousePosition = ref({ x: 0, y: 0 });
  const scrollPosition = ref(0);

  const floatingElements = ref<FloatingElement[]>([]);
  const rotatingElements = ref<RotatingElement[]>([]);
  const parallaxElements = ref<HTMLElement[]>([]);

  // Mouse tracking for parallax and 3D effects
  const updateMousePosition = (event: MouseEvent) => {
    mousePosition.value.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.value.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  // Scroll tracking
  const updateScrollPosition = () => {
    scrollPosition.value = window.scrollY;
  };

  // Initialize Three.js scene for background 3D effects
  const initThreeScene = (container: HTMLElement) => {
    if (!container) return;

    // --- CLEANUP: Remove any previous renderer DOM element ---
    if (renderer.value && renderer.value.domElement && renderer.value.domElement.parentNode) {
      renderer.value.domElement.parentNode.removeChild(renderer.value.domElement);
      renderer.value.dispose();
      renderer.value = null;
    }
    scene.value = null;
    camera.value = null;

    // Scene
    scene.value = new THREE.Scene();
    scene.value.fog = new THREE.FogExp2(0x000000, 0.002);

    // Camera
    camera.value = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    camera.value.position.z = 5;

    // Renderer
    renderer.value = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.value.setSize(container.offsetWidth, container.offsetHeight);
    renderer.value.setClearColor(0x000000, 0);
    renderer.value.shadowMap.enabled = true;
    renderer.value.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.value.domElement);

    // Add ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    scene.value.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.value.add(directionalLight);

    // Create floating particles
    createFloatingParticles();

    // Start animation loop
    animate();
  };

  // Create floating particles for background
  const createFloatingParticles = () => {
    if (!scene.value) return;

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0xffd700,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.value.add(particlesMesh);
  };

  // Animation loop
  const animate = () => {
    if (!scene.value || !camera.value || !renderer.value) return;

    // Defensive: Ensure no Vue proxy is passed to Three.js
    // If any of these are proxies, skip rendering to avoid error
    const isProxy = (obj: any) => obj && obj.__v_isReactive;
    if (isProxy(scene.value) || isProxy(camera.value) || isProxy(renderer.value)) {
      // Optionally, log a warning here
      return;
    }

    animationId.value = requestAnimationFrame(animate);

    // Rotate camera based on mouse position
    if (enableParallax) {
      camera.value.position.x +=
        (mousePosition.value.x * 2 - camera.value.position.x) * 0.05;
      camera.value.position.y +=
        (-mousePosition.value.y * 2 - camera.value.position.y) * 0.05;
      camera.value.lookAt(scene.value.position);
    }

    // Update floating elements
    updateFloatingElements();

    // Update rotating elements
    updateRotatingElements();

    // Update parallax elements
    updateParallaxElements();

    // Ensure we always use .value for Three.js objects
    renderer.value.render(scene.value, camera.value);
  };

  // Add floating animation to element
  const addFloatingElement = (
    element: HTMLElement,
    amplitude = 20,
    frequency = 0.002,
    phase = 0
  ) => {
    if (!enableFloating) return;

    const rect = element.getBoundingClientRect();
    floatingElements.value.push({
      id: Math.random().toString(36),
      element,
      originalY: rect.top + window.scrollY,
      amplitude: amplitude * intensity,
      frequency: frequency * speed,
      phase,
    });
  };

  // Add rotation animation to element
  const addRotatingElement = (
    element: HTMLElement,
    rotationSpeed = 0.01,
    axis: "x" | "y" | "z" = "y"
  ) => {
    if (!enableRotation) return;

    rotatingElements.value.push({
      id: Math.random().toString(36),
      element,
      rotationSpeed: rotationSpeed * speed,
      axis,
    });
  };

  // Add parallax effect to element
  const addParallaxElement = (element: HTMLElement) => {
    if (!enableParallax) return;

    parallaxElements.value.push(element);
  };

  // Update floating elements
  const updateFloatingElements = () => {
    const time = Date.now();

    floatingElements.value.forEach((item) => {
      const offset =
        Math.sin(time * item.frequency + item.phase) * item.amplitude;
      item.element.style.transform = `translateY(${offset}px) translateZ(0)`;
    });
  };

  // Update rotating elements
  const updateRotatingElements = () => {
    const time = Date.now();

    rotatingElements.value.forEach((item) => {
      const rotation = time * item.rotationSpeed;
      const transform = item.element.style.transform || "";

      let newTransform = "";
      if (item.axis === "x") {
        newTransform = `rotateX(${rotation}rad)`;
      } else if (item.axis === "y") {
        newTransform = `rotateY(${rotation}rad)`;
      } else {
        newTransform = `rotateZ(${rotation}rad)`;
      }

      item.element.style.transform = transform.includes("rotate")
        ? transform.replace(/rotate[XYZ]\([^)]*\)/, newTransform)
        : `${transform} ${newTransform}`;
    });
  };

  // Update parallax elements
  const updateParallaxElements = () => {
    parallaxElements.value.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const scrollPercent =
        scrollPosition.value /
        (document.body.scrollHeight - window.innerHeight);
      const parallaxY = scrollPercent * 100 * intensity;

      element.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
    });
  };

  // GSAP-enhanced animations
  const createGSAPAnimation = (element: HTMLElement, options: any = {}) => {
    if (typeof window !== "undefined") {
      const nuxtApp = useNuxtApp();
      const gsap = (nuxtApp as any)?.$gsap;

      if (gsap) {
        return gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
            rotationX: -15,
            transformPerspective: 1000,
            ...options.from,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
            ...options.to,
          }
        );
      }
    }
    return null;
  };

  // Morphing animation for cards and elements
  const createMorphingEffect = (element: HTMLElement) => {
    if (!enableMorphing) return;

    const handleMouseEnter = () => {
      element.style.transform = `
        perspective(1000px) 
        rotateY(${mousePosition.value.x * 10}deg) 
        rotateX(${mousePosition.value.y * 10}deg) 
        scale(1.05)
        translateZ(20px)
      `;
      element.style.transition = "transform 0.3s ease-out";
    };

    const handleMouseLeave = () => {
      element.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1) translateZ(0px)";
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  };

  // Loading animation
  const createLoadingAnimation = (elements: HTMLElement[]) => {
    elements.forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px) scale(0.9)";

      setTimeout(() => {
        element.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        element.style.opacity = "1";
        element.style.transform = "translateY(0) scale(1)";
      }, index * 100);
    });
  };

  // Cleanup function
  const cleanup = () => {
    if (animationId.value) {
      cancelAnimationFrame(animationId.value);
    }

    if (renderer.value) {
      // Remove renderer DOM element from parent if present
      if (renderer.value.domElement && renderer.value.domElement.parentNode) {
        renderer.value.domElement.parentNode.removeChild(renderer.value.domElement);
      }
      renderer.value.dispose();
      renderer.value = null;
    }
    scene.value = null;
    camera.value = null;

    floatingElements.value = [];
    rotatingElements.value = [];
    parallaxElements.value = [];
  };

  // Initialize
  onMounted(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", updateMousePosition);
      window.addEventListener("scroll", updateScrollPosition);
    }
  });

  onUnmounted(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("scroll", updateScrollPosition);
    }
    cleanup();
  });

  return {
    scene,
    camera,
    renderer,
    mousePosition,
    scrollPosition,
    initThreeScene,
    addFloatingElement,
    addRotatingElement,
    addParallaxElement,
    createGSAPAnimation,
    createMorphingEffect,
    createLoadingAnimation,
    cleanup,
  };
};
