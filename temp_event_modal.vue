<!-- Event Detail Modal -->
<UModal v-model="isEventModalOpen" :ui="{ width: 'max-w-full sm:max-w-6xl' }">
      <div class="relative">
        <!-- Event Content -->
        <div v-if="selectedEvent" class="max-h-[80vh] overflow-y-auto">
          <!-- Cinematic Hero Section with 16:9 aspect ratio -->
          <div
            class="relative aspect-video bg-black overflow-hidden flex items-center justify-center"
          >
            <!-- Blurred/Gradient background using current image -->
            <div class="absolute inset-0 z-0">
              <NuxtImg
                :src="getCurrentEventImage(selectedEvent)"
                :alt="selectedEvent.title"
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
                :src="getCurrentEventImage(selectedEvent)"
                :alt="selectedEvent.title"
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
              @click="closeEventModal"
              class="absolute top-3 right-3 sm:top-6 sm:right-6 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md z-30"
            >
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>

            <!-- Image Navigation for Multiple Images -->
            <div
              v-if="selectedEvent.images && selectedEvent.images.length > 1"
              class="absolute top-1/2 left-2 right-2 sm:left-8 sm:right-8 flex justify-between items-center transform -translate-y-1/2 z-20"
            >
              <button
                @click="previousEventImage"
                class="bg-black/60 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md"
              >
                <UIcon name="i-heroicons-chevron-left" class="w-6 h-6" />
              </button>
              <button
                @click="nextEventImage"
                class="bg-black/60 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md"
              >
                <UIcon name="i-heroicons-chevron-right" class="w-6 h-6" />
              </button>
            </div>

            <!-- Thumbnails Carousel -->
            <div
              v-if="selectedEvent.images && selectedEvent.images.length > 1"
              class="absolute bottom-2 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20"
            >
              <button
                v-for="(img, index) in selectedEvent.images"
                :key="index"
                @click="setCurrentEventImage(index)"
                class="w-8 h-10 sm:w-12 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-lg"
                :class="
                  index === getCurrentImageIndex(selectedEvent.id)
                    ? 'border-yellow-500 scale-105'
                    : 'border-transparent opacity-70 hover:opacity-100'
                "
              >
                <NuxtImg
                  :src="img"
                  :alt="selectedEvent.title"
                  class="object-cover w-full h-full"
                  format="webp"
                  quality="60"
                />
              </button>
            </div>

            <!-- Status Badge -->
            <div class="absolute top-3 left-3 sm:top-6 sm:left-6 z-30">
              <div 
                :class="[
                  'px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg backdrop-blur-md',
                  getStatusColor(selectedEvent.status) === 'green' ? 'bg-green-500/90 text-white' :
                  getStatusColor(selectedEvent.status) === 'blue' ? 'bg-blue-500/90 text-white' :
                  'bg-gray-500/90 text-white'
                ]"
              >
                {{ getStatusLabel(selectedEvent.status) }}
              </div>
            </div>
          </div>

          <!-- Event Content Section -->
          <div
            class="p-4 sm:p-8 bg-white dark:bg-gray-900 rounded-b-3xl shadow-2xl mt-[-2px]"
          >
            <!-- Event Title -->
            <div class="mb-6">
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {{ selectedEvent.title }}
              </h1>
              <p v-if="selectedEvent.date" class="text-lg text-yellow-600 dark:text-yellow-400 font-medium">
                {{ formatEventDateRange(selectedEvent.date, selectedEvent.endDate || '') }}
              </p>
            </div>

            <!-- Event Description -->
            <div
              v-if="selectedEvent.description || selectedEvent.fullDescription"
              class="prose prose-lg dark:prose-invert max-w-none mb-6 sm:mb-8"
            >
              <div
                v-html="formatEventContent(selectedEvent.fullDescription || selectedEvent.description)"
              ></div>
            </div>

            <!-- Event Details Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <!-- Date -->
              <div v-if="selectedEvent.date" class="flex items-start space-x-4">
                <div class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-heroicons-calendar" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-gray-900 dark:text-white text-lg">Event Date</p>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ formatEventDateRange(selectedEvent.date, selectedEvent.endDate || '') }}
                  </p>
                </div>
              </div>
              
              <!-- Time -->
              <div v-if="selectedEvent.time" class="flex items-start space-x-4">
                <div class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-heroicons-clock" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-gray-900 dark:text-white text-lg">Time</p>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ selectedEvent.time.replace(/\s*\/?\s*\b(EST|EDT)\b\s*/g, '').trim() }}
                  </p>
                </div>
              </div>

              <!-- Location -->
              <div v-if="selectedEvent.location" class="flex items-start space-x-4">
                <div class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-gray-900 dark:text-white text-lg">Location</p>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ selectedEvent.location }}
                  </p>
                </div>
              </div>

              <!-- Price -->
              <div v-if="selectedEvent.price" class="flex items-start space-x-4">
                <div class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-gray-900 dark:text-white text-lg">Price</p>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ selectedEvent.price }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700 gap-4"
            >
              <div
                class="flex items-center space-x-4 text-gray-600 dark:text-gray-400"
              >
                <div class="flex items-center">
                  <UIcon
                    name="i-heroicons-calendar"
                    class="w-5 h-5 mr-2 text-yellow-500"
                  />
                  <span>{{ formatEventDate(selectedEvent.date) }}</span>
                </div>
                <div class="flex items-center">
                  <UIcon
                    name="i-heroicons-clock"
                    class="w-5 h-5 mr-2 text-yellow-500"
                  />
                  <span>{{ selectedEvent.time || 'TBA' }}</span>
                </div>
              </div>

              <div class="flex space-x-3">
                <UButton
                  color="yellow"
                  variant="solid"
                  size="lg"
                  @click="shareEvent"
                  class="shadow-lg"
                >
                  <UIcon name="i-heroicons-share" class="w-5 h-5 mr-2" />
                  Share Event
                </UButton>
                <UButton
                  color="gray"
                  variant="outline"
                  size="lg"
                  @click="addToCalendar"
                  class="shadow-lg"
                >
                  <UIcon name="i-heroicons-calendar-plus" class="w-5 h-5 mr-2" />
                  Add to Calendar
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UModal>
