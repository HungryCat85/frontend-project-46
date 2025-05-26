import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'
import pluginJest from 'eslint-plugin-jest'

export default defineConfig([
  stylistic.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Apply Jest globals and rules only to test files in __tests__ folder
  {
    files: ['**/__tests__/**/*.js'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      ...pluginJest.configs.recommended.rules,
    },
  },
])
