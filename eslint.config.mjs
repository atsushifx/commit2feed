import globals from 'globals'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: latest,
      globals: globals.browser
    },
    rules: {
      semi: 'error'
    }
  }
]
