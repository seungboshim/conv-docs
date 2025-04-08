/** @type {import('eslint').Linter.Config} */
import { defineConfig } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

export default defineConfig({
  ignores: ["**/node_modules/**", "**/build/**", "**/dist/**", ".git"],
  plugins: {
    "@next/next": nextPlugin,
  },
  extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
  languageOptions: {
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  rules: {
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
  },
});
