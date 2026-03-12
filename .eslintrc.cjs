module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['@nuxtjs/eslint-config-typescript'],
  rules: {
    // Errors in production, warnings in dev
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'vue/comment-directive': 'off',
    // Allow v-html with eslint-disable-next-line when sanitized
    'vue/no-v-html': 'warn',
    // Disable multi-word component name for specific page components
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['Hero', 'Header', 'Footer', 'index', 'about', 'contact', 'events', 'menu', 'offline', '[id]'],
      },
    ],
    // Allow require-await with async for consistency
    'require-await': 'off',
    // Allow vue template unused index in v-for
    'vue/no-unused-vars': 'warn',
    // Relax some strict rules for flexibility
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-case-declarations': 'warn',
    'vue/no-template-shadow': 'warn',
    'vue/no-multiple-template-root': 'off', // Allow multiple roots in Vue 3
    'import/no-named-as-default-member': 'warn',
  },
}

