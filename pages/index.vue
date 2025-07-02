<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Lazy loaded Hero -->
    <component :is="Hero" v-if="Hero" />

    <!-- Specials Section (moved from menu.vue) -->
    <section id="specials" class="specials section py-20 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Specials Title -->
        <div class="mb-12 text-center" data-aos="fade-up">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white" style="font-family: 'Cinzel', 'Georgia', serif;">
            Daily <span class="text-yellow-600 dark:text-yellow-400">Specials</span>
          </h2>
          <div class="w-16 h-1 bg-yellow-500 mx-auto mb-4"></div>
          <p class="text-xl text-gray-600 dark:text-gray-300">Check Our Chef's Recommendations</p>
        </div>
        <div class="flex flex-col lg:flex-row gap-12">
          <!-- Tabs List -->
          <nav class="lg:w-1/4">
            <div class="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 overflow-x-auto lg:overflow-visible border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 pb-4 lg:pb-0 lg:pr-8">
              <button
                v-for="(tab, index) in specialsTabs"
                :key="tab.id"
                @click="activeSpecialTab = tab.id"
                :class="[
                  'py-3 px-6 font-medium text-left whitespace-nowrap transition-all duration-300 rounded-lg lg:rounded-none lg:rounded-l-lg transform hover:scale-105',
                  activeSpecialTab === tab.id
                    ? 'bg-yellow-500 text-white shadow-lg lg:bg-transparent lg:text-yellow-600 dark:lg:text-yellow-400 lg:font-bold lg:border-l-4 lg:border-yellow-500 lg:shadow-none'
                    : 'text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                ]"
              >
                {{ tab.title }}
              </button>
            </div>
          </nav>
          <!-- Tabs Content -->
          <div class="lg:flex-1">
            <transition name="fade" mode="out-in" appear>
              <div
                v-if="selectedTab"
                :key="selectedTab.id"
                class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8"
              >
                <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  <div class="lg:flex-1 order-2 lg:order-1">
                    <h3 class="text-3xl font-bold mb-3 text-gray-900 dark:text-white">{{ selectedTab.title }}</h3>
                    <p class="italic text-yellow-600 dark:text-yellow-400 mb-4 text-lg">{{ selectedTab.subtitle }}</p>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ selectedTab.description }}</p>
                  </div>
                  <div class="lg:w-80 order-1 lg:order-2 text-center">
                    <div class="relative overflow-hidden rounded-xl shadow-lg">
                      <NuxtImg
                        :src="selectedTab.img"
                        alt="Special Dish"
                        class="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-500"
                        width="320"
                        height="256"
                        format="webp"
                        quality="80"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>            </transition>
          </div>
        </div>
      </div>
    </section>


    <!-- Features Section -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase">What We Offer</span>
            <div class="w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6" style="font-family: 'Cinzel', 'Georgia', serif;">
            Experience <span class="text-yellow-600 dark:text-yellow-400">Excellence</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover what makes The Pearson Pub a beloved destination in Whitby
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <template v-for="(feature, index) in features" :key="feature.id">
            <NuxtLink
              v-if="feature.link"
              :to="feature.link"
              class="feature-card group bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 text-center hover:bg-gradient-to-br hover:from-yellow-50 hover:to-orange-50 dark:hover:from-gray-600 dark:hover:to-gray-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-600"
            >
              <div :class="[feature.bgColor, 'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300']">
                <UIcon :name="feature.icon" :class="[feature.color, 'w-10 h-10']" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {{ feature.description }}
              </p>
              <UButton
                color="yellow"
                variant="outline"
                class="group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300"
              >
                Learn More
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2" />
              </UButton>
            </NuxtLink>
          </template>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section 
      class="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
      :class="{ 'opacity-0 transform translate-y-8': !isVisible.about, 'animate-fade-in-up': isVisible.about }"
      ref="aboutRef"
    >
      <!-- Decorative Background -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-yellow-500"></div>
        <div class="absolute bottom-10 right-10 w-48 h-48 rounded-full border border-yellow-300"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div 
            class="space-y-8"
            :class="{ 'opacity-0 transform translate-x-8': !isVisible.about, 'animate-fade-in-left': isVisible.about }"
            style="animation-delay: 200ms"
          >
            <div class="inline-block">
              <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-lg tracking-wide uppercase">Our Story</span>
              <div class="w-16 h-1 bg-yellow-500 mt-2"></div>
            </div>
            
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              A Whitby Landmark <span class="text-yellow-600 dark:text-yellow-400">Since Day One</span>
            </h2>
            
            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              The Pearson Pub has been serving the Whitby community with great food, drinks, and live music - seamlessly 
              blending timeless charm with modern amenities, as a home for any occasion.
            </p>
            
            <div class="flex items-center space-x-6">
              <UButton
                to="/about"
                color="yellow"
                size="lg"
                class="transform transition hover:scale-105"
              >
                Learn More
              </UButton>
              
              <div class="flex items-center space-x-2">
                <UIcon name="i-heroicons-phone" class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <a href="tel:+19054305699" class="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 font-medium">
                  905-430-5699
                </a>
              </div>
            </div>
          </div>
          
          <div 
            class="relative"
            :class="{ 'opacity-0 transform translate-x-8': !isVisible.about, 'animate-fade-in-right': isVisible.about }"
            style="animation-delay: 400ms"
          >
            <div class="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
              <!-- About Section image: optimize for LCP -->
              <img
                src="/images/pub/interior-main.jpg"
                alt="Pub Interior"
                class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                decoding="async"
                fetchpriority="high"
                loading="eager"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            <!-- Floating Stats Card -->
            <div class="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div class="text-center">
                <div class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">25+</div>
                <div class="text-sm text-gray-600 dark:text-gray-300 font-medium">Years Serving</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, shallowRef, nextTick } from 'vue'
import { useBackendData } from "~/composables/useBackendData";
import { useAdvancedLoading } from "~/composables/useAdvancedLoading";
import { use3DAnimations } from "~/composables/use3DAnimations";
// Lazy load Hero for better LCP
const Hero = shallowRef<any>(null)
if (process.client) {
  import('../components/home/Hero.vue').then(mod => Hero.value = mod.default)
}

definePageMeta({
  title: 'The Pearson Pub | Whitby',
  description: 'Live menu, events, and more. Experience The Pearson Pub in Whitby.',
  layout: 'default',
  // Nuxt 3 SSG/SSR hint
  prerender: true
})

// SSR/SSG: useAsyncData for backend data
const { data: categoriesData } = await useAsyncData('categories', () => useBackendData().fetchCategories())
const { data: itemsData } = await useAsyncData('items', () => useBackendData().fetchItems())
const { data: eventsData } = await useAsyncData('events', () => useBackendData().fetchEvents())
const { data: hoursData } = await useAsyncData('operationHours', () => useBackendData().fetchOperationHours())



// Simple in-memory cache for backend data
const backendCache: Record<string, any> = {}

// Backend integration
const {
  menuCategories,
  events: backendEvents,
  operationHours,
  isLoading: backendLoading,
  error: backendError,
  fetchCategories,
  fetchItems,
  fetchEvents,
  fetchOperationHours,
  pagination
} = useBackendData();

// Advanced loading
const { loadingState, startLoading, finishLoading } = useAdvancedLoading({
  duration: 100,
  showProgress: true,
  customTexts: [
    'Loading restaurant data...',
    'Preparing menu categories...',
    'Setting up events...',
    'Almost ready...',
    'Welcome to The Pearson Pub!'
  ]
});

// 3D Animations
const {
  addFloatingElement,
  addParallaxElement,
  createMorphingEffect,
  createLoadingAnimation,
  createGSAPAnimation
} = use3DAnimations({
  enableParallax: true,
  enableFloating: true,
  enableRotation: true,
  intensity: 1.1,
  speed: 0.9
});

// Statistics computed from backend data (memoized)
const statistics = computed(() => [
  {
    id: 'categories',
    label: 'Menu Categories',
    value: menuCategories.value.length || 0,
    icon: 'i-heroicons-squares-2x2',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'items',
    label: 'Menu Items',
    value: pagination.value.items?.total || 0,
    icon: 'i-heroicons-fire',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: 'events',
    label: 'Upcoming Events',
    value: backendEvents.value.length || 0,
    icon: 'i-heroicons-calendar-days',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    id: 'hours',
    label: 'Operating Days',
    value: operationHours.value.length || 7,
    icon: 'i-heroicons-clock',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
]);

// Features showcase
const features = ref([
  {
    id: 'menu',
    title: 'Diverse Menu',
    description: 'Explore our extensive menu with categories ranging from traditional pub fare to modern cuisine.',
    icon: 'i-heroicons-book-open',
    link: '/menu',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    id: 'events',
    title: 'Live Events',
    description: 'Join us for live music, quiz nights, and special events throughout the week.',
    icon: 'i-heroicons-musical-note',
    link: '/events',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },

  //Contact us easily for reservations, inquiries, or special requests.
  {
    id: 'contact',
    title: 'Easy Booking',
    description: '',
    icon: 'i-heroicons-phone',
    link: '/contact',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
]);

// Specials Section State (moved from menu.vue)
const specialsTabs = ref([
  {
    id: 'specials-tab-1',
    title: 'Classic Fish & Chips',
    subtitle: 'Crispy battered fish served with golden fries and house tartar sauce.',
    description: 'A British pub staple! Fresh cod fillets, hand-battered and fried to perfection, served with thick-cut fries, mushy peas, and our signature tartar sauce.',
    img: '/images/food/fish_and_chips.jpg',
  },
  {
    id: 'specials-tab-2',
    title: 'Shepherd’s Pie',
    subtitle: 'Hearty ground beef and vegetables topped with creamy mashed potatoes.',
    description: 'A comforting classic! Savory ground beef and vegetables in a rich gravy, topped with buttery mashed potatoes and baked until golden.',
    img: '/images/food/shepherds_pie.jpg',
  },
  {
    id: 'specials-tab-3',
    title: 'Pub Burger',
    subtitle: 'Juicy beef patty, cheddar, lettuce, tomato, and house sauce on a brioche bun.',
    description: 'Our signature burger! 100% Angus beef patty grilled to order, topped with sharp cheddar, lettuce, tomato, onion, and our house-made burger sauce.',
    img: '/images/food/pub_burger.jpg',
  },
  {
    id: 'specials-tab-4',
    title: 'Chicken Tikka Masala',
    subtitle: 'Tender chicken in a creamy spiced tomato sauce, served with rice and naan.',
    description: 'A pub favorite with a twist! Marinated chicken simmered in a rich, spiced tomato cream sauce, served with fragrant basmati rice and warm naan bread.',
    img: '/images/food/chicken_tikka_masala.jpg',
  },
  {
    id: 'specials-tab-5',
    title: 'Vegetarian Curry',
    subtitle: 'Seasonal vegetables in a coconut curry sauce, served with rice.',
    description: 'A flavorful vegetarian option! Fresh seasonal vegetables cooked in a mild coconut curry sauce, served with steamed rice and a lime wedge.',
    img: '/images/food/vegetarian_curry.jpg',
  },
])

const activeSpecialTab = ref('specials-tab-1')
const selectedTab = computed(() =>
  specialsTabs.value.find((tab) => tab.id === activeSpecialTab.value)
)

// Visibility states
const isVisible = ref({
  about: false
})

// Refs for intersection observer
const aboutRef = ref(null)

// Intersection observer callback
const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target
      // Check which section is intersecting and update visibility
      if (target === aboutRef.value) isVisible.value.about = true
      // Stop observing after becoming visible
      observer.unobserve(target)
    }
  })
}

let observer: IntersectionObserver

onMounted(async () => {
  // Fetch only categories and items for above-the-fold content
  if (!backendCache.categories) backendCache.categories = await fetchCategories();
  if (!backendCache.items) backendCache.items = await fetchItems();

  // Defer fetching events and operation hours
  setTimeout(async () => {
    if (!backendCache.events) backendCache.events = await fetchEvents();
    if (!backendCache.operationHours) backendCache.operationHours = await fetchOperationHours();
  }, 0);

  // Initialize intersection observer
  observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
    rootMargin: '0px'
  })
  if (aboutRef.value) observer.observe(aboutRef.value)

  // Defer heavy animation setup to idle
  if (process.client) {
    const runAnimations = async () => {
      await finishLoading();
      const nuxtApp = useNuxtApp();
      const $gsap = (nuxtApp as any)?.$gsap;
      if ($gsap && $gsap.utils && typeof $gsap.from === "function") {
        $gsap.utils.toArray(".stat-card").forEach((el: any, i: number) => {
          addFloatingElement(el, 6, 0.0008, i * 0.2);
          createMorphingEffect(el);
          createGSAPAnimation(el, {
            from: { opacity: 0, y: 40, scale: 0.8, rotationY: -15 },
            to: {
              opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 1, delay: i * 0.1, ease: "back.out(1.3)",
              scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 15%", toggleActions: "play none none reverse" }
            }
          });
        });
        $gsap.utils.toArray(".feature-card").forEach((el: any, i: number) => {
          addFloatingElement(el, 8, 0.001, i * 0.3);
          createGSAPAnimation(el, {
            from: { opacity: 0, y: 60, rotationX: -10 },
            to: {
              opacity: 1, y: 0, rotationX: 0, duration: 1.2, delay: i * 0.15, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 15%", toggleActions: "play none none reverse" }
            }
          });
        });
      }
    }
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(runAnimations);
    } else {
      setTimeout(runAnimations, 200);
    }
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out forwards;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
