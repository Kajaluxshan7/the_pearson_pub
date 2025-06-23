declare module "#app" {
  interface NuxtApp {
    $validateForm: (form: Record<string, any>) => {
      isValid: boolean;
      errors: Record<string, string>;
    };
  }
}

// Export types
export * from './events'
export * from './menu'

export {};
