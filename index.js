const { resolve } = require('node:path');
require('@rushstack/eslint-patch/modern-module-resolution');

const project = resolve(process.cwd(), 'tsconfig.json');

const commonExtends = [
  'eslint:recommended',
  'plugin:prettier/recommended' // Prettier recommended rules
];

const commonRules = {
  'prefer-spread': 'off',
  eqeqeq: 'off',
  'no-unused-vars': 'off',
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [
    'warn',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_'
    }
  ],
  'no-constant-condition': ['warn'],
  'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Includes .prettierrc.js rules
  'simple-import-sort/imports': [
    'error',
    {
      groups: [
        // Packages `react` related packages come first.
        ['^react', '^@?\\w'],
        // Internal packages.
        ['^(@|components)(/.*|$)'],
        // Side effect imports.
        ['^\\u0000'],
        // Parent imports. Put `..` last.
        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
        // Other relative imports. Put same-folder imports and `.` last.
        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        // Style imports.
        ['^.+\\.?(css)$']
      ]
    }
  ],
  'simple-import-sort/exports': 'error'
};

module.exports = {
  extends: [
    ...commonExtends
    // turborepo custom eslint configuration configures the following rules:
    //  - https://github.com/vercel/turbo/blob/main/packages/eslint-plugin-turbo/docs/rules/no-undeclared-env-vars.md
    // 'eslint-config-turbo',
  ],
  parserOptions: {
    project
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    },
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 2020
    }
  },
  ignorePatterns: [
    'node_modules/*',
    'build/*',
    'dist/*',
    '.eslintrc.js',
    '.prettierrc.js',
    '*.json'
  ],
  // add rules configurations here
  plugins: ['unused-imports', 'simple-import-sort'],
  rules: { ...commonRules },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      env: {
        browser: true,
        node: true,
        es6: true
      },
      extends: [
        ...commonExtends,
        'plugin:@typescript-eslint/recommended' // TypeScript rules
      ],
      rules: {
        ...commonRules,
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      }
    },
    {
      files: ['**/__tests__/**/*'],
      env: {
        jest: true
      }
    }
  ]
};
