import js from '@eslint/js'
import globals from 'globals'
import storybook from 'eslint-plugin-storybook'
import react from 'eslint-plugin-react'

export default [
  js.configs.recommended,
  ...storybook.configs['flat/recommended'],
  {
    plugins: {
      react,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Formatting rules
      'quotes': [
        'error', 'single', { avoidEscape: true },
      ],
      'semi': ['error', 'never'],
      'max-len': [
        'warn',
        {
          code: 85,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignorePattern: '^\\s*import\\s',
        },
      ],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'no-tabs': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'arrow-parens': ['error', 'as-needed'],

      // React rules
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'off',
      'react/no-deprecated': 'off',

      // Project rules
      'no-console': 'off',
      'no-useless-assignment': 'off',
      'no-unsafe-optional-chaining': 'off',
      'no-constant-binary-expression': 'off',
      'space-after-function-name': 0,
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^React$',
          argsIgnorePattern: '^_|^React$',
        },
      ],
    },
  },
  {
    files: [
      '**/*.test.{js,jsx}',
      '**/__tests__/**/*.{js,jsx}',
    ],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
      },
    },
  },
]
