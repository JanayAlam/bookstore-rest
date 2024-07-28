import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/node_modules/", "**/dist/", "**/data/"],
  },
  ...compat
    .extends(
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    )
    .map((config) => ({
      ...config,
      files: ["src/**/*.ts"],
    })),
  {
    files: ["src/**/*.ts"],

    plugins: {
      prettier,
      "@typescript-eslint": typescriptEslint,
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.node,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },

      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: "commonjs",
    },

    rules: {
      "no-console": 1,
      "require-atomic-updates": 0,
      "linebreak-style": 0,
      "@typescript-eslint/no-unused-vars": [
        1,
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/no-explicit-any": 1,
      "@typescript-eslint/explicit-module-boundary-types": 0,
    },
  },
];
