<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
      <div
        class="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"
      ></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="min-h-screen flex items-center justify-center"
    >
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Story Not Found
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          {{ error.message || "The story you are looking for does not exist." }}
        </p>
        <NuxtLink
          to="/about"
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Back to Stories
        </NuxtLink>
      </div>
    </div>

    <!-- Story Content -->
    <div v-else-if="story" class="min-h-screen">
      <!-- Hero Section with 16:9 Landscape Layout -->
      <section
        class="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden"
      >
        <!-- Image Container with 16:9 aspect ratio -->
        <div class="absolute inset-0 aspect-video bg-black">
          <NuxtImg
            :src="getCurrentStoryImage(story)"
            :alt="story.title"
            class="w-full h-full object-cover"
            format="webp"
            quality="90"
            @error="handleImageError"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          ></div>
        </div>

        <!-- Story Title Overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div class="max-w-7xl mx-auto">
            <div class="flex items-center mb-4">
              <UIcon
                :name="story.icon || 'i-heroicons-heart'"
                class="w-6 h-6 text-yellow-400 mr-3"
              />
              <span
                class="text-yellow-400 text-sm md:text-base font-semibold uppercase tracking-wide"
              >
                {{ story.category || "Story" }}
              </span>
            </div>
            <h1
              class="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              style="font-family: 'Cinzel', 'Georgia', serif"
            >
              {{ story.title }}
            </h1>
            <p class="text-lg md:text-xl text-gray-200 max-w-3xl">
              {{ story.description }}
            </p>
            <div class="flex items-center mt-6 text-sm text-gray-300">
              <UIcon name="i-heroicons-calendar" class="w-4 h-4 mr-2" />
              <span>{{ story.date || "Recently" }}</span>
            </div>
          </div>
        </div>

        <!-- Back Button -->
        <div class="absolute top-6 left-6 z-10">
          <NuxtLink
            to="/about"
            class="bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
          >
            <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
            <span class="hidden sm:inline">Back to Stories</span>
          </NuxtLink>
        </div>

        <!-- Image Navigation for Multiple Images -->
        <div
          v-if="story.images && story.images.length > 1"
          class="absolute top-1/2 left-6 right-6 flex justify-between items-center transform -translate-y-1/2 z-10"
        >
          <button
            @click="previousImage"
            class="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <UIcon name="i-heroicons-chevron-left" class="w-6 h-6" />
          </button>
          <button
            @click="nextImage"
            class="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <UIcon name="i-heroicons-chevron-right" class="w-6 h-6" />
          </button>
        </div>

        <!-- Image Indicators -->
        <div
          v-if="story.images && story.images.length > 1"
          class="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2"
        >
          <button
            v-for="(_, index) in story.images"
            :key="index"
            @click="setCurrentImage(index)"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="
              index === currentImageIndex
                ? 'bg-yellow-400'
                : 'bg-white/50 hover:bg-white/70'
            "
          ></button>
        </div>
      </section>

      <!-- Story Content Section -->
      <section class="py-16 bg-white dark:bg-gray-800">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Full Description -->
          <div
            v-if="story.fullDescription || story.content"
            class="prose prose-lg dark:prose-invert max-w-none"
          >
            <div
              v-html="
                formatStoryContent(
                  story.fullDescription || story.content || story.description
                )
              "
            ></div>
          </div>

          <!-- Fallback if no full content -->
          <div v-else class="text-center py-12">
            <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {{ story.description }}
            </p>
          </div>

          <!-- Additional Story Details -->
          <div class="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Story Meta -->
              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                >
                  Story Details
                </h3>
                <div class="space-y-3">
                  <div
                    class="flex items-center text-gray-600 dark:text-gray-400"
                  >
                    <UIcon
                      name="i-heroicons-calendar"
                      class="w-5 h-5 mr-3 text-yellow-500"
                    />
                    <span>{{ story.date || "Recently" }}</span>
                  </div>
                  <div
                    class="flex items-center text-gray-600 dark:text-gray-400"
                  >
                    <UIcon
                      :name="story.icon || 'i-heroicons-heart'"
                      class="w-5 h-5 mr-3 text-yellow-500"
                    />
                    <span>{{ story.category || "Story" }}</span>
                  </div>
                  <div
                    v-if="story.location"
                    class="flex items-center text-gray-600 dark:text-gray-400"
                  >
                    <UIcon
                      name="i-heroicons-map-pin"
                      class="w-5 h-5 mr-3 text-yellow-500"
                    />
                    <span>{{ story.location }}</span>
                  </div>
                </div>
              </div>

              <!-- Share Options -->
              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                >
                  Share This Story
                </h3>
                <div class="flex space-x-4">
                  <button
                    @click="shareStory"
                    class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <UIcon name="i-heroicons-share" class="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button
                    @click="copyLink"
                    class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <UIcon name="i-heroicons-link" class="w-4 h-4" />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Stories Section -->
      <section
        v-if="relatedStories && relatedStories.length > 0"
        class="py-16 bg-gray-50 dark:bg-gray-900"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
          >
            More Stories
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <NuxtLink
              v-for="relatedStory in relatedStories"
              :key="relatedStory.id"
              :to="`/stories/${relatedStory.id}`"
              class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105"
            >
              <div class="relative h-64 overflow-hidden">
                <NuxtImg
                  :src="getStoryImage(relatedStory)"
                  :alt="relatedStory.title"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                  format="webp"
                  quality="80"
                  @error="handleImageError"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"
                ></div>
              </div>

              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3
                  class="text-lg font-bold mb-2 group-hover:text-yellow-300 transition-colors line-clamp-2"
                >
                  {{ relatedStory.title }}
                </h3>
                <p class="text-gray-200 text-sm leading-relaxed line-clamp-2">
                  {{ relatedStory.description }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Meta tags
useHead({
  title: "Story - The Pearson Pub",
  meta: [{ name: "description", content: "Read our story at The Pearson Pub" }],
});

// Get route and story ID
const route = useRoute();
const storyId = route.params.id;

// Reactive state
const currentImageIndex = ref(0);

// Get the API instance
const { getStoryById } = usePublicApi();

// Fetch story data
const {
  data: story,
  pending,
  error,
} = await useFetch(`story-${storyId}`, () => getStoryById(storyId as string), {
  key: `story-${storyId}`,
});

// Fetch related stories
const { data: relatedStories } = await useFetch("/public-api/stories", {
  key: "related-stories",
  transform: (data: any[]) => data.filter((s) => s.id !== storyId).slice(0, 3),
});

// Update meta tags with story data
watch(story, (newStory) => {
  if (newStory) {
    useHead({
      title: `${newStory.title} - The Pearson Pub`,
      meta: [
        { name: "description", content: newStory.description },
        {
          property: "og:title",
          content: `${newStory.title} - The Pearson Pub`,
        },
        { property: "og:description", content: newStory.description },
        { property: "og:image", content: getStoryImage(newStory) },
      ],
    });
  }
});

// Image handling functions
const getCurrentStoryImage = (story: any) => {
  if (story.images && story.images.length > 0) {
    return story.images[currentImageIndex.value] || story.images[0];
  }
  return story.image || "/images/stories/default.jpg";
};

const getStoryImage = (story: any) => {
  if (story.images && story.images.length > 0) {
    return story.images[0];
  }
  return story.image || "/images/stories/default.jpg";
};

const handleImageError = (event: any) => {
  if (
    event.target &&
    event.target.src.indexOf("/images/stories/default.jpg") === -1
  ) {
    event.target.src = "/images/stories/default.jpg";
  }
};

// Image navigation
const nextImage = () => {
  if (story.value?.images && story.value.images.length > 1) {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % story.value.images.length;
  }
};

const previousImage = () => {
  if (story.value?.images && story.value.images.length > 1) {
    currentImageIndex.value =
      currentImageIndex.value === 0
        ? story.value.images.length - 1
        : currentImageIndex.value - 1;
  }
};

const setCurrentImage = (index: number) => {
  currentImageIndex.value = index;
};

// Content formatting
const formatStoryContent = (content: string) => {
  if (!content) return "";

  // Convert line breaks to paragraphs
  return content
    .split("\n\n")
    .map((paragraph) => `<p class="mb-4">${paragraph.trim()}</p>`)
    .join("");
};

// Sharing functions
const shareStory = async () => {
  if (!story.value) return;

  const shareData = {
    title: `${story.value.title} - The Pearson Pub`,
    text: story.value.description,
    url: window.location.href,
  };

  try {
    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare(shareData)
    ) {
      await navigator.share(shareData);
    } else {
      await copyLink();
    }
  } catch (err) {
    console.log("Error sharing:", err);
    await copyLink();
  }
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
    console.log("Link copied to clipboard!");
  } catch (err) {
    console.log("Failed to copy link:", err);
  }
};

// Auto-rotate images if there are multiple
onMounted(() => {
  if (story.value?.images && story.value.images.length > 1) {
    setInterval(() => {
      nextImage();
    }, 5000); // Change image every 5 seconds
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose h1,
.prose h2,
.prose h3 {
  @apply text-gray-900 dark:text-white;
}

.prose p {
  @apply text-gray-600 dark:text-gray-400 leading-relaxed;
}

.prose strong {
  @apply text-gray-900 dark:text-white;
}
</style>
