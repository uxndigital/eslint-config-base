import eslint from '@eslint/js';
import type { ESLint, Linter } from 'eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const globalIgnores: Linter.Config = {
  ignores: [
    '**/node_modules/**',
    '.git/**',
    '**/.next/**',
    '**/.turbo/**',
    '**/build/**',
    '**/coverage/**',
    '**/dist/**',
    '**/out/**'
  ]
};

const commonjsConfig: Linter.Config = {
  files: ['**/*.{cjs,cts}'],
  languageOptions: {
    sourceType: 'commonjs'
  }
};

const unusedVariablesOptions = {
  vars: 'all' as const,
  varsIgnorePattern: '^_',
  args: 'after-used' as const,
  argsIgnorePattern: '^_',
  caughtErrors: 'all' as const,
  caughtErrorsIgnorePattern: '^_',
  destructuredArrayIgnorePattern: '^_'
};

const typescriptConfig: Linter.Config = {
  files: ['**/*.{ts,tsx,mts,cts}'],
  rules: {
    // TypeScript ESLint's recommended preset disables the core rule for TS.
    // Use its parser-aware rule once, with `_`-prefixed variables ignored.
    '@typescript-eslint/no-unused-vars': ['warn', unusedVariablesOptions],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false
        }
      }
    ]
  }
};

const javascriptConfig: Linter.Config = {
  files: ['**/*.{js,jsx,mjs,cjs}'],
  rules: {
    // Keep the same unused-variable policy for JavaScript.
    'no-unused-vars': ['warn', unusedVariablesOptions]
  }
};

const sharedRules: Linter.Config = {
  rules: {
    'prefer-spread': 'off',
    eqeqeq: 'off',
    'no-constant-condition': 'warn'
  }
};

const simpleImportSortConfig: Linter.Config = {
  plugins: {
    'simple-import-sort': simpleImportSort
  },
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^@?\\w'],
          ['^(@|components)(/.*|$)'],
          ['^\\u0000'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.?(css)$']
        ]
      }
    ],
    'simple-import-sort/exports': 'error'
  }
};

const unusedImportsConfig: Linter.Config = {
  plugins: {
    'unused-imports': unusedImports as unknown as ESLint.Plugin
  },
  rules: {
    // Only use this plugin for import removal. Variable checks belong to the
    // language-specific rules above, so each variable is reported once.
    'unused-imports/no-unused-imports': 'error'
  }
};

const sharedConfigs: Linter.Config[] = [
  globalIgnores,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  commonjsConfig,
  typescriptConfig,
  javascriptConfig,
  sharedRules,
  simpleImportSortConfig,
  unusedImportsConfig,
  eslintPluginPrettierRecommended
];

const nodeEnvironmentConfig: Linter.Config = {
  languageOptions: {
    globals: {
      ...globals.node
    }
  }
};

const browserEnvironmentConfig: Linter.Config = {
  languageOptions: {
    globals: {
      ...globals.browser
    }
  }
};

/** Runtime-neutral JavaScript and TypeScript rules. */
export const baseConfigs: Linter.Config[] = sharedConfigs;

/** Shared rules plus Node.js globals. */
export const nodeConfigs: Linter.Config[] = [
  ...sharedConfigs,
  nodeEnvironmentConfig
];

/** Shared rules plus browser globals. */
export const browserConfigs: Linter.Config[] = [
  ...sharedConfigs,
  browserEnvironmentConfig
];

// Keep the default runtime-neutral for cross-project reuse.
export default baseConfigs;
