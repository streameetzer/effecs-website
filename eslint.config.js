import css from '@eslint/css'
import js from '@eslint/js'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import prettier from 'eslint-config-prettier/flat'
import oxlint from 'eslint-plugin-oxlint'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

// TODO: transform to eslint.config.ts when ESLint ext in VS Code gain support (https://github.com/microsoft/vscode-eslint/issues/1917)
export default defineConfig([
  globalIgnores(['build/**']),
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      // (...)
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  // fix (https://typescript-eslint.io/getting-started/typed-linting/)
  // Error: Error while loading rule '@typescript-eslint/await-thenable':
  // You have used a rule which requires type information, but don't have
  // parserOptions set to generate type information for this file.
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    //! temp: disabled
    // https://typescript-eslint.io/users/configs
    // extends: [
    //   tseslint.configs.strictTypeChecked,
    //   tseslint.configs.stylisticTypeChecked,
    // ],
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
    ignores: ['**/{tsconfig,.oxlintrc}.json'],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/commonmark',
    extends: ['markdown/recommended'],
  },
  prettier,
  ...oxlint.configs['flat/recommended'],

  // extra
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
])
