import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import nextPlugin from '@next/eslint-plugin-next';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
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
        version: 'detect', // React 버전 자동 감지
      },
    },
  },
  // TypeScript 및 React 기본 규칙 먼저 적용
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      js,
      '@next/next': nextPlugin,
      react: pluginReact,
    },
    extends: ['js/recommended'],
    ignores: [
      // Next.js 특화 디렉토리
      '**/.next/**',
      '**/out/**',

      // 빌드 결과물
      '**/build/**',
      '**/dist/**',

      // 패키지 관련
      '**/node_modules/**',
      '**/package-lock.json',
      '**/yarn.lock',
      '**/pnpm-lock.yaml',

      // 캐시 파일
      '**/.eslintcache',
      '**/.tsbuildinfo',
      '**/*.tsbuildinfo',

      // 환경 변수
      '**/.env*',

      // 기타
      '**/.git/**',
      '**/.DS_Store',
      '**/public/**',
    ],
    rules: {
      // 기본 규칙
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-undef': 'warn',

      // React 규칙 - 기본 설정을 덮어쓰기
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off', // React 17+ 에서는 불필요

      // Next.js 규칙
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-unwanted-polyfillio': 'warn',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-page-custom-font': 'warn',
    },
  },
  // App Router 특화 규칙
  {
    files: ['**/app/**/page.{js,jsx,ts,tsx}'],
    rules: {
      'require-await': 'error',
      'no-unused-expressions': 'error',
    },
  },
  {
    files: ['**/app/**/layout.{js,jsx,ts,tsx}'],
    rules: {
      'require-await': 'error',
    },
  },
]);
