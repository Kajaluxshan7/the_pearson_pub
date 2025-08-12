<template>
  <UModal v-model="isOpen" :ui="{ width: 'max-w-full sm:max-w-6xl' }">
    <div class="relative">
      <!-- Loading State -->
      <div
        v-if="loading"
        class="aspect-video flex items-center justify-center bg-gray-100 dark:bg-gray-800"
      >
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"
        ></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="aspect-video flex items-center justify-center bg-gray-100 dark:bg-gray-800"
      >
        <div class="text-center p-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Story Not Found
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            {{ error.message || "The story could not be loaded." }}
          </p>
        </div>
      </div>

      <!-- Story Content -->
      <div v-else-if="story" class="max-h-[80vh] overflow-y-auto">
        <!-- Cinematic Hero Section with 16:9 aspect ratio -->
        <div
          class="relative aspect-video bg-black overflow-hidden flex items-center justify-center"
        >
          <!-- Blurred/Gradient background using current image -->
          <div class="absolute inset-0 z-0">
            <NuxtImg
              :src="getCurrentStoryImage(story)"
              :alt="story.title"
              class="w-full h-full object-cover blur-xl scale-110 opacity-60"
              format="webp"
              quality="60"
              @error="handleImageError"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            ></div>
          </div>

          <!-- Centered 4:5 image -->
          <div
            class="relative z-10 flex items-center justify-center h-full w-full"
          >
            <NuxtImg
              :src="getCurrentStoryImage(story)"
              :alt="story.title"
              class="shadow-2xl rounded-2xl object-cover bg-white/10"
              :style="{
                width: 'clamp(180px,60vw,360px)',
                height: 'clamp(220px,45vh,480px)',
                aspectRatio: '4/5',
                maxWidth: '90vw',
                maxHeight: '90vw',
              }"
              format="webp"
              quality="90"
              @error="handleImageError"
            />
          </div>

          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute top-3 right-3 sm:top-6 sm:right-6 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md z-30"
          >
            <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>

          <!-- Image Navigation for Multiple Images -->
          <div
            v-if="story.images && story.images.length > 1"
            class="absolute top-1/2 left-2 right-2 sm:left-8 sm:right-8 flex justify-between items-center transform -translate-y-1/2 z-20"
          >
            <button
              @click="previousImage"
              class="bg-black/60 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md"
            >
              <UIcon name="i-heroicons-chevron-left" class="w-6 h-6" />
            </button>
            <button
              @click="nextImage"
              class="bg-black/60 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md"
            >
              <UIcon name="i-heroicons-chevron-right" class="w-6 h-6" />
            </button>
          </div>

          <!-- Thumbnails Carousel -->
          <div
            v-if="story.images && story.images.length > 1"
            class="absolute bottom-2 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20"
          >
            <button
              v-for="(img, index) in story.images"
              :key="index"
              @click="setCurrentImage(index)"
              class="w-8 h-10 sm:w-12 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-lg"
              :class="
                index === currentImageIndex
                  ? 'border-yellow-500 scale-105'
                  : 'border-transparent opacity-70 hover:opacity-100'
              "
            >
              <NuxtImg
                :src="img"
                :alt="story.title"
                class="object-cover w-full h-full"
                format="webp"
                quality="60"
              />
            </button>
          </div>
        </div>

        <!-- Story Content Section -->
        <div
          class="p-4 sm:p-8 bg-white dark:bg-gray-900 rounded-b-3xl shadow-2xl mt-[-2px]"
        >
          <!-- Full Description -->
          <div
            v-if="story.fullDescription || story.content"
            class="prose prose-lg dark:prose-invert max-w-none mb-6 sm:mb-8"
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
          <div v-else class="mb-6 sm:mb-8">
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ story.description }}
            </p>
          </div>

          <!-- Share Options -->
          <div
            class="flex flex-col sm:flex-row sm:items-center justify-between pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700 gap-4"
          >
            <div
              class="flex items-center space-x-2 sm:space-x-4 text-gray-600 dark:text-gray-400 text-base"
            >
              <div class="flex items-center">
                <UIcon
                  name="i-heroicons-calendar"
                  class="w-5 h-5 mr-2 text-yellow-500"
                />
                <span>{{ story.date || "Recently" }}</span>
              </div>
              <div class="flex items-center">
                <UIcon
                  :name="story.icon || 'i-heroicons-heart'"
                  class="w-5 h-5 mr-2 text-yellow-500"
                />
                <span>{{ story.category || "Story" }}</span>
              </div>
            </div>

            <div class="flex space-x-2">
              <button
                @click="shareStory"
                class="bg-yellow-500 hover:bg-yellow-600 text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors flex items-center"
                title="Share"
              >
                <UIcon name="i-heroicons-share" class="w-5 h-5" />
              </button>
              <button
                @click="copyLink"
                class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors flex items-center"
                title="Copy Link"
              >
                <UIcon name="i-heroicons-link" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { usePublicApi } from "@/composables/usePublicApi";

interface Props {
  storyId?: string;
  modelValue: boolean;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { getStoryById } = usePublicApi();

// Reactive state
const currentImageIndex = ref(0);
const story = ref<any>(null);
const loading = ref(false);
const error = ref<any>(null);

// Modal state
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Fetch story data when modal opens and storyId changes
watch(
  [() => props.storyId, () => props.modelValue],
  async ([newStoryId, isModalOpen]) => {
    if (isModalOpen && newStoryId) {
      await fetchStory(newStoryId);
    }
  },
  { immediate: true }
);

// Fetch story function
const fetchStory = async (id: string) => {
  loading.value = true;
  error.value = null;
  story.value = null;
  currentImageIndex.value = 0;

  try {
    story.value = await getStoryById(id);
  } catch (err: any) {
    error.value = err;
    console.error("Error fetching story:", err);
  } finally {
    loading.value = false;
  }
};

// Image handling functions
const getCurrentStoryImage = (story: any) => {
  if (story.images && story.images.length > 0) {
    return story.images[currentImageIndex.value] || story.images[0];
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

// Modal actions
const closeModal = () => {
  isOpen.value = false;
};

// Sharing functions
const shareStory = async () => {
  if (!story.value) return;

  const shareData = {
    title: `${story.value.title} - The Pearson Pub`,
    text: story.value.description,
    url: `${window.location.origin}/stories/${props.storyId}`,
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
    await navigator.clipboard.writeText(
      `${window.location.origin}/stories/${props.storyId}`
    );
    // You could add a toast notification here
    console.log("Link copied to clipboard!");
  } catch (err) {
    console.log("Failed to copy link:", err);
  }
};

// Auto-rotate images if there are multiple
onMounted(() => {
  let interval: NodeJS.Timeout | null = null;

  watch(
    () => story.value?.images,
    (images) => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }

      if (images && images.length > 1) {
        interval = setInterval(() => {
          nextImage();
        }, 5000); // Change image every 5 seconds
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    if (interval) {
      clearInterval(interval);
    }
  });
});
</script>

<style scoped>
.prose h1,
.prose h2,
.prose h3 {
  color: rgb(17 24 39);
}

.prose p {
  color: rgb(75 85 99);
  line-height: 1.625;
}

.prose strong {
  color: rgb(17 24 39);
}

.dark .prose h1,
.dark .prose h2,
.dark .prose h3 {
  color: rgb(255 255 255);
}

.dark .prose p {
  color: rgb(156 163 175);
}

.dark .prose strong {
  color: rgb(255 255 255);
}
</style>
