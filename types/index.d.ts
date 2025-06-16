declare module "#app" {
  interface NuxtApp {
    $validateForm: (form: Record<string, any>) => {
      isValid: boolean;
      errors: Record<string, string>;
    };
  }
}

export {};
