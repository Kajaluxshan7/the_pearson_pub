<script setup lang="ts">
interface TodayStatus {
  todayHours?: {
    day: string
    open_time: string
    close_time: string
    status: boolean
  }
}

const props = defineProps<{
  loading: boolean
  error: string | null
  todayStatus: TodayStatus | null
}>()

function isCurrentlyOpen(day: string, openTime: string, closeTime: string): boolean {
  if (!openTime || !closeTime) return false

  const now = new Date()
  const torontoTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Toronto' }))
  const currentTime = torontoTime.toTimeString().slice(0, 5)

  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const todayDay = days[torontoTime.getDay()]

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const currentMinutes = timeToMinutes(currentTime)
  const openMinutes = timeToMinutes(openTime)
  const closeMinutes = timeToMinutes(closeTime)

  if (closeMinutes < openMinutes) {
    if (day.toLowerCase() === todayDay && currentMinutes >= openMinutes) return true
    const dayIndex = days.indexOf(day.toLowerCase())
    const nextDay = days[(dayIndex + 1) % 7]
    if (todayDay === nextDay && currentMinutes <= closeMinutes) return true
    return false
  }

  if (day.toLowerCase() !== todayDay) return false
  return currentMinutes >= openMinutes && currentMinutes <= closeMinutes
}

function formatOperationTime(time: string): string {
  if (!time) return 'Not set'
  try {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours, 10)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  } catch {
    return time
  }
}
</script>

<template>
  <section class="bg-yellow-600 dark:bg-yellow-700 py-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-4">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-white">Opening Hours</span>
        </div>
        <div v-if="loading" class="text-white text-sm md:text-base">
          <span>Loading...</span>
        </div>
        <div v-else-if="error" class="text-white text-sm md:text-base">
          <span class="px-2 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white">
            {{ error }}
          </span>
        </div>
        <div
          v-else-if="todayStatus && todayStatus.todayHours"
          class="text-white text-sm md:text-base"
        >
          <div class="flex items-center gap-3">
            <span>
              {{ formatOperationTime(todayStatus.todayHours.open_time) }} -
              {{ formatOperationTime(todayStatus.todayHours.close_time) }}
            </span>
            <span
              v-if="todayStatus.todayHours.status === false"
              class="px-2 py-1 rounded-full text-xs font-semibold bg-red-500 text-white"
            >
              CLOSED
            </span>
            <span
              v-else-if="isCurrentlyOpen(
                todayStatus.todayHours.day,
                todayStatus.todayHours.open_time,
                todayStatus.todayHours.close_time
              )"
              class="px-2 py-1 rounded-full text-xs font-semibold bg-green-500 text-white"
            >
              OPEN NOW
            </span>
            <span v-else class="px-2 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
              CLOSED
            </span>
          </div>
        </div>
        <div v-else class="text-white text-sm md:text-base">
          <span class="px-2 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white">
            Hours not available
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
