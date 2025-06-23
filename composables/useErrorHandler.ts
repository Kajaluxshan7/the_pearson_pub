import { ref, onErrorCaptured } from 'vue'

export const useErrorHandler = () => {
  const error = ref<Error | null>(null)
  const isRetrying = ref(false)

  const captureError = (err: Error, info?: string) => {
    console.error('Error captured:', err, info)
    error.value = err
  }

  const clearError = () => {
    error.value = null
    isRetrying.value = false
  }

  const retry = async (fn: () => Promise<void> | void) => {
    isRetrying.value = true
    try {
      await fn()
      clearError()
    } catch (err) {
      captureError(err as Error, 'Retry failed')
    } finally {
      isRetrying.value = false
    }
  }

  // Set up error boundary
  onErrorCaptured((err, instance, info) => {
    captureError(err, `Component error: ${info}`)
    return false // Don't propagate the error
  })

  return {
    error: readonly(error),
    isRetrying: readonly(isRetrying),
    captureError,
    clearError,
    retry
  }
}
