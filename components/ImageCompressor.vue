<template>
  <div class="p-6 space-y-6 max-w-5xl mx-auto">
    <NuxtCard title="Image Compress & Preview">
      <input
        type="file"
        accept="image/*"
        @change="onFileChange"
        class="block w-full mb-6 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      <div
        v-if="originalUrl || compressedUrl"
        class="w-full flex flex-col gap-8 mt-8 justify-center items-start"
      >
        <!-- Original Preview -->
        <div class="w-full flex flex-col items-center space-y-3 mx-auto">
          <h3 class="font-semibold">Original</h3>
          <img
            v-if="originalUrl"
            :src="originalUrl"
            class="w-full h-auto rounded border shadow"
            alt="Original Image Preview"
          />
          <div class="text-sm text-gray-600 w-full">
            <p><strong>Name:</strong> {{ name }}</p>
            <p>
              <strong>Dimensions:</strong> {{ oriWidth }} × {{ oriHeight }} px
            </p>
            <p><strong>Size:</strong> {{ formatBytes(oriSize) }}</p>
          </div>
        </div>
        <!-- Compressed Preview -->
        <div class="w-full flex flex-col items-center space-y-3 mx-auto">
          <h3 class="font-semibold">Compressed (WebP)</h3>
          <img
            v-if="compressedUrl"
            :src="compressedUrl"
            class="w-full h-auto rounded border shadow"
            alt="Compressed Image Preview"
          />
          <div class="text-sm text-gray-600 w-full">
            <p><strong>Name:</strong> {{ name }}.webp</p>
            <p>
              <strong>Dimensions:</strong> {{ compWidth }} × {{ compHeight }} px
            </p>
            <p><strong>Size:</strong> {{ formatBytes(compSize) }}</p>
          </div>
        </div>
      </div>
    </NuxtCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const originalUrl = ref<string | null>(null);
const compressedUrl = ref<string | null>(null);
const name = ref("");
const oriWidth = ref(0);
const oriHeight = ref(0);
const oriSize = ref(0);
const compWidth = ref(0);
const compHeight = ref(0);
const compSize = ref(0);

async function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  name.value = file.name.replace(/\.[^/.]+$/, ""); // Remove extension for new name
  oriSize.value = file.size;

  originalUrl.value = URL.createObjectURL(file);
  const img = await loadImage(originalUrl.value);
  oriWidth.value = img.width;
  oriHeight.value = img.height;

  const scale = 0.7; // Keep original size
  const quality = 0.7; // Max quality

  // Compress to WebP format, high quality
  const blob = await compressWithCanvas(img, scale, quality, "image/webp");

  compSize.value = blob.size;

  compressedUrl.value = URL.createObjectURL(blob);
  const compImg = await loadImage(compressedUrl.value);
  compWidth.value = compImg.width;
  compHeight.value = compImg.height;
}

function compressWithCanvas(
  img: HTMLImageElement,
  scale: number,
  quality: number,
  mimeType: string = "image/jpeg"
): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
      },
      mimeType,
      quality
    );
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Can't load image"));
    img.src = src;
  });
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  const k = 1024;
  const sizes = ["KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i - 1];
}
</script>

<style scoped>
/* Just some spacing and basic styles, you can customize */
</style>
