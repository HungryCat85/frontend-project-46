// eslint.config.js for ESLint v9+
import js from '@eslint/js';
import globals from 'globals';
// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'eslint/config';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJest from 'eslint-plugin-jest';

export default defineConfig([
  // Base ESLint recommended rules
  js.configs.recommended,

  // Your custom project rules
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
    },
    plugins: {
      import: eslintPluginImport,
      jest: eslintPluginJest,
    },
    rules: {
      // Manually configure relevant rules instead of importing airbnb-base
      'no-console': 'off',
      'no-underscore-dangle': 'off',

      // Import plugin rules
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',

      // Jest plugin rules
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',

      // Example of extending other ESLint rules if needed
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'eqeqeq': 'error', // Enforce strict equality
    },
  },

  // Specific settings for test files
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/expect-expect': 'error',
    },
  },
]);