<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Menu Hero Section -->
    <section class="relative py-20 bg-gray-900 text-white">
      <div class="absolute inset-0 overflow-hidden">
        <NuxtImg
          src="/images/food/foods.jpg"
          alt="Our Menu"
          class="w-full h-full object-cover opacity-30"
          format="webp"
          quality="80"
        />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Our Menu</h1>
        <p class="text-xl max-w-3xl mx-auto">
          Discover our delicious selection of pub favorites and craft beverages
        </p>
      </div>
    </section>

    <!-- Menu Categories Navigation -->
    <section class="py-8 bg-white sticky top-0 z-10 shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-center space-x-4 overflow-x-auto pb-2">
          <UButton
            v-for="category in categories"
            :key="category.id"
            :color="activeCategory === category.id ? 'yellow' : 'gray'"
            variant="ghost"
            @click="activeCategory = category.id"
          >
            {{ category.name }}
          </UButton>
        </div>
      </div>
    </section>

    <!-- Menu Items Section -->
    <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-for="category in filteredCategories"
        :key="category.id"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="item in category.items"
          :key="item.id"
          class="transition-all duration-300"
          :class="{
            'opacity-0 translate-y-8': !isVisible[item.id],
            'opacity-100 translate-y-0': isVisible[item.id],
          }"
          :data-item-id="item.id"
        >
          <MenuCard :item="item" />
        </div>
      </div>
    </section>

    <!-- Dietary Info -->
    <section class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl font-bold mb-4">Dietary Information</h2>
        <p class="text-gray-600 mb-8">
          We cater to various dietary requirements. Please ask our staff for allergen information.
        </p>
        <div class="flex justify-center space-x-4 flex-wrap">
          <span
            v-for="(info, index) in dietaryInfo"
            :key="index"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 m-2"
          >
            <UIcon :name="info.icon" class="w-4 h-4 mr-2 text-yellow-500" />
            {{ info.label }}
          </span>
        </div>
      </div>
    </section>

    <!-- Specials Section -->
    <section id="specials" class="specials section py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Specials Title -->
        <div class="mb-8 text-center" data-aos="fade-up">
          <h2 class="text-3xl font-bold mb-2">Specials</h2>
          <p class="text-gray-700">Check Our Specials</p>
        </div>

        <div class="flex flex-col md:flex-row gap-8">

          <!-- Tabs List -->
          <nav
            class="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 overflow-x-auto md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200"
          >
            <button
              v-for="(tab, index) in specialsTabs"
              :key="tab.id"
              @click="activeSpecialTab = tab.id"
              :class="[
                'py-3 px-6 font-medium text-left whitespace-nowrap transition-colors rounded-t md:rounded-none md:rounded-l',
                activeSpecialTab === tab.id
                  ? 'bg-yellow-400 text-white md:bg-transparent md:text-yellow-600 md:font-bold border-b-0 md:border-l-4 md:border-yellow-500'
                  : 'text-gray-600 hover:text-yellow-500'
              ]"
            >
              {{ tab.title }}
            </button>
          </nav>

          <!-- Tabs Content -->
          <div class="md:flex-1">
            <transition name="fade" mode="out-in" appear>
              <div
                v-if="selectedTab"
                :key="selectedTab.id"
                class="space-y-6"
              >
                <div class="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                  <div class="lg:flex-1 order-2 lg:order-1">
                    <h3 class="text-2xl font-semibold mb-2">{{ selectedTab.title }}</h3>
                    <p class="italic text-gray-600 mb-3">{{ selectedTab.subtitle }}</p>
                    <p class="text-gray-800">{{ selectedTab.description }}</p>
                  </div>
                  <div class="lg:w-64 order-1 lg:order-2 text-center">
                    <NuxtImg
                      :src="selectedTab.img"
                      alt="Special Image"
                      class="rounded shadow-lg mx-auto"
                      width="256"
                      height="256"
                      format="webp"
                      quality="80"
                    />
                  </div>
                </div>
              </div>
            </transition>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useMenu } from '~/composables/useMenu'
import type { MenuItem, MenuCategory } from '~/types/menu'

useHead({
  title: 'Menu - The Pearson Pub',
  meta: [
    {
      name: 'description',
      content: 'Explore our delicious menu of pub favorites and craft beverages at The Pearson Pub.',
    },
  ],
})

const { menuCategories } = useMenu()

// Menu categories & filter
const activeCategory = ref<string>('')
const isVisible = ref<Record<string, boolean>>({})
const observer = ref<IntersectionObserver | null>(null)

const categories = computed<MenuCategory[]>(() =>
  Array.isArray(menuCategories.value) ? menuCategories.value : []
)
const filteredCategories = computed(() =>
  categories.value.filter((category) => category.id === activeCategory.value)
)

// Dietary info data
const dietaryInfo = [
  { icon: 'i-heroicons-leaf', label: 'Vegetarian Options' },
  { icon: 'i-heroicons-no-symbol', label: 'Gluten-Free Options' },
  { icon: 'i-heroicons-heart', label: 'Vegan Options' },
  { icon: 'i-heroicons-exclamation-circle', label: 'Allergen Information Available' },
]

// Intersection Observer for fade-in animations
const setupIntersectionObserver = () => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const itemId = entry.target.getAttribute('data-item-id')
        if (itemId) {
          isVisible.value[itemId] = entry.isIntersecting
        }
      })
    },
    { threshold: 0.1 }
  )
}

const observeMenuItems = () => {
  if (!observer.value) return
  observer.value.disconnect()
  nextTick(() => {
    const menuItems = document.querySelectorAll('[data-item-id]')
    menuItems.forEach((item) => observer.value?.observe(item))
  })
}

// Specials tab data
const specialsTabs = ref([
  {
    id: 'specials-tab-1',
    title: 'Modi sit est',
    subtitle:
      'Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka',
    description:
      'Et nobis maiores eius. Voluptatibus ut enim blanditiis atque harum sint. Laborum eos ipsum ipsa odit magni. Incidunt hic ut molestiae aut qui. Est repellat minima eveniet eius et quis magni nihil. Consequatur dolorem quaerat quos qui similique accusamus nostrum rem vero',
    img: '/assets/img/specials-1.png',
  },
  {
    id: 'specials-tab-2',
    title: 'Unde praesentium sed',
    subtitle:
      'Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka',
    description:
      'Ea ipsum voluptatem consequatur quis est. Illum error ullam omnis quia et reiciendis sunt sunt est. Non aliquid repellendus itaque accusamus eius et velit ipsa voluptates. Optio nesciunt eaque beatae accusamus lerode pakto madirna desera vafle de nideran pal',
    img: '/assets/img/specials-2.png',
  },
  {
    id: 'specials-tab-3',
    title: 'Pariatur explicabo vel',
    subtitle: 'Eos voluptatibus quo. Odio similique illum id quidem non enim fuga. Qui natus non sunt dicta dolor et. In asperiores velit quaerat perferendis aut',
    description:
      'Iure officiis odit rerum. Harum sequi eum illum corrupti culpa veritatis quisquam. Neque necessitatibus illo rerum eum ut. Commodi ipsam minima molestiae sed laboriosam a iste odio. Earum odit nesciunt fugiat sit ullam. Soluta et harum voluptatem optio quae',
    img: '/assets/img/specials-3.png',
  },
  {
    id: 'specials-tab-4',
    title: 'Nostrum qui quasi',
    subtitle: 'Totam aperiam accusamus. Repellat consequuntur iure voluptas iure porro quis delectus',
    description:
      'Eaque consequuntur consequuntur libero expedita in voluptas. Nostrum ipsam necessitatibus aliquam fugiat debitis quis velit. Eum ex maxime error in consequatur corporis atque. Eligendi asperiores sed qui veritatis aperiam quia a laborum inventore',
    img: '/assets/img/specials-4.png',
  },
  {
    id: 'specials-tab-5',
    title: 'Iusto ut expedita aut',
    subtitle: 'Omnis blanditiis saepe eos autem qui sunt debitis porro quia.',
    description:
      'Exercitationem nostrum omnis. Ut reiciendis repudiandae minus. Omnis recusandae ut non quam ut quod eius qui. Ipsum quia odit vero atque qui quibusdam amet. Occaecati sed est sint aut vitae molestiae voluptate vel',
    img: '/assets/img/specials-5.png',
  },
])

const activeSpecialTab = ref<string>('specials-tab-1')

const selectedTab = computed(() =>
  specialsTabs.value.find((tab) => tab.id === activeSpecialTab.value)
)

onMounted(() => {
  if (categories.value.length > 0) {
    activeCategory.value = categories.value[0].id
  }
  setupIntersectionObserver()
  observeMenuItems()

  categories.value.forEach((category) => {
    category.items.forEach((item) => {
      isVisible.value[item.id] = false
    })
  })
})

onUnmounted(() => {
  observer.value?.disconnect()
})

watch(activeCategory, () => {
  nextTick(observeMenuItems)
})
</script>

<style>
/* Fade transition for tabs */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
