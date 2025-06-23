import { ref, nextTick, onMounted } from 'vue'

export const usePerformance = () => {
  const isVisible = ref(false)
  const observer = ref<IntersectionObserver>()

  const createLazyLoader = (element: HTMLElement, callback: () => void) => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback()
            obs.unobserve(entry.target)
          }
        })
      },
      { 
        rootMargin: '50px',
        threshold: 0.1 
      }
    )
    
    obs.observe(element)
    return obs
  }

  const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(null, args), wait)
    }
  }

  const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(null, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = src
    })
  }

  const preloadImages = async (urls: string[]): Promise<void> => {
    try {
      await Promise.all(urls.map(url => preloadImage(url)))
    } catch (error) {
      console.warn('Some images failed to preload:', error)
    }
  }

  const measurePerformance = (name: string, fn: () => void) => {
    const start = performance.now()
    fn()
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
  }

  const optimizeForMobile = () => {
    return typeof window !== 'undefined' && window.innerWidth <= 768
  }

  return {
    createLazyLoader,
    debounce,
    throttle,
    preloadImage,
    preloadImages,
    measurePerformance,
    optimizeForMobile,
    isVisible
  }
}
