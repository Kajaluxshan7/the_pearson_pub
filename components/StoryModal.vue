<template>
  <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-6xl' }">
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
        <!-- Hero Section with 16:9 aspect ratio -->
        <div class="relative aspect-video bg-black">
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

          <!-- Story Title Overlay -->
          <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div class="flex items-center mb-2">
              <UIcon
                :name="story.icon || 'i-heroicons-heart'"
                class="w-5 h-5 text-yellow-400 mr-2"
              />
              <span
                class="text-yellow-400 text-sm font-semibold uppercase tracking-wide"
              >
                {{ story.category || "Story" }}
              </span>
            </div>
            <h1
              class="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-tight"
            >
              {{ story.title }}
            </h1>
            <p class="text-base md:text-lg text-gray-200">
              {{ story.description }}
            </p>
            <div class="flex items-center mt-3 text-sm text-gray-300">
              <UIcon name="i-heroicons-calendar" class="w-4 h-4 mr-2" />
              <span>{{ story.date || "Recently" }}</span>
            </div>
          </div>

          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
          >
            <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
          </button>

          <!-- Image Navigation for Multiple Images -->
          <div
            v-if="story.images && story.images.length > 1"
            class="absolute top-1/2 left-4 right-4 flex justify-between items-center transform -translate-y-1/2 z-10"
          >
            <button
              @click="previousImage"
              class="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
            </button>
            <button
              @click="nextImage"
              class="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
            </button>
          </div>

          <!-- Image Indicators -->
          <div
            v-if="story.images && story.images.length > 1"
            class="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2"
          >
            <button
              v-for="(_, index) in story.images"
              :key="index"
              @click="setCurrentImage(index)"
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="
                index === currentImageIndex
                  ? 'bg-yellow-400'
                  : 'bg-white/50 hover:bg-white/70'
              "
            ></button>
          </div>
        </div>

        <!-- Story Content Section -->
        <div class="p-6 bg-white dark:bg-gray-800">
          <!-- Full Description -->
          <div
            v-if="story.fullDescription || story.content"
            class="prose prose-sm dark:prose-invert max-w-none mb-6"
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
          <div v-else class="mb-6">
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ story.description }}
            </p>
          </div>

          <!-- Share Options -->
          <div
            class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div
              class="flex items-center space-x-3 text-gray-600 dark:text-gray-400 text-sm"
            >
              <div class="flex items-center">
                <UIcon
                  name="i-heroicons-calendar"
                  class="w-4 h-4 mr-1 text-yellow-500"
                />
                <span>{{ story.date || "Recently" }}</span>
              </div>
              <div class="flex items-center">
                <UIcon
                  :name="story.icon || 'i-heroicons-heart'"
                  class="w-4 h-4 mr-1 text-yellow-500"
                />
                <span>{{ story.category || "Story" }}</span>
              </div>
            </div>

            <div class="flex space-x-2">
              <button
                @click="shareStory"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1 text-sm"
              >
                <UIcon name="i-heroicons-share" class="w-4 h-4" />
                <span>Share</span>
              </button>
              <button
                @click="copyLink"
                class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1 text-sm"
              >
                <UIcon name="i-heroicons-link" class="w-4 h-4" />
                <span>Copy</span>
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
