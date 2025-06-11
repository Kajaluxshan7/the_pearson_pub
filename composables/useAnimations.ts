import type { Ref } from "vue";
import { ref, onMounted, onUnmounted } from "vue";

interface AnimationState {
  quickInfo: boolean;
  about: boolean;
  entertainment: boolean;
  cta: boolean;
}

interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  threshold?: number;
  rootMargin?: string;
}

interface AnimationStyle {
  animationDuration: string;
  animationDelay: string;
  animationTimingFunction: string;
}

export const useAnimations = (config: AnimationConfig = {}) => {
  const animationState = ref<AnimationState>({
    quickInfo: false,
    about: false,
    entertainment: false,
    cta: false,
  });

  const defaultConfig = {
    duration: 800,
    delay: 150,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    threshold: 0.2,
    rootMargin: "-50px 0px",
    ...config,
  };

  const getStaggeredDelay = (index: number): string => {
    return `${index * defaultConfig.delay}ms`;
  };

  const getAnimationStyle = (index: number): AnimationStyle => {
    return {
      animationDuration: `${defaultConfig.duration}ms`,
      animationDelay: getStaggeredDelay(index),
      animationTimingFunction: defaultConfig.easing,
    };
  };

  const createIntersectionObserver = (
    refs: Record<keyof AnimationState, Ref>,
    isVisible: Ref<AnimationState>
  ) => {
    const options: IntersectionObserverInit = {
      threshold: defaultConfig.threshold,
      rootMargin: defaultConfig.rootMargin,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        Object.entries(refs).forEach(([key, ref]) => {
          if (ref.value === target) {
            isVisible.value[key as keyof AnimationState] = entry.isIntersecting;
          }
        });
      });
    }, options);

    return {
      observe: () => {
        Object.values(refs).forEach((ref) => {
          if (ref.value) observer.observe(ref.value);
        });
      },
      cleanup: () => {
        Object.values(refs).forEach((ref) => {
          if (ref.value) observer.unobserve(ref.value);
        });
      },
    };
  };

  const useElementAnimation = (elementRef: Ref<HTMLElement | null>) => {
    const isInView = ref(false);
    let observer: IntersectionObserver | undefined;

    onMounted(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          isInView.value = entry.isIntersecting;
        },
        {
          threshold: defaultConfig.threshold,
          rootMargin: defaultConfig.rootMargin,
        }
      );

      if (elementRef.value) {
        observer.observe(elementRef.value);
      }
    });

    onUnmounted(() => {
      if (observer) {
        observer.disconnect();
      }
    });

    return {
      isInView,
      style: getAnimationStyle,
    };
  };

  return {
    animationState,
    getStaggeredDelay,
    getAnimationStyle,
    createIntersectionObserver,
    useElementAnimation,
  };
};
