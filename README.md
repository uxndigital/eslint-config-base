# @uxndigital/eslint-config-base

A shareable, opinionated ESLint configuration for JavaScript and TypeScript projects, designed by UXN Digital. This config enforces code quality, consistent style, and best practices, with built-in support for Prettier, TypeScript, import sorting, and unused imports.

## Features

- **ESLint Recommended**: Extends the recommended ESLint rules.
- **TypeScript Support**: Integrates `@typescript-eslint` for advanced TypeScript linting.
- **TypeScript 7 Compatible**: Full support for TypeScript 5.x, 6.x, and 7.x (see [TYPESCRIPT_7.md](./TYPESCRIPT_7.md) for details).
- **Prettier Integration**: Enforces Prettier formatting via `eslint-plugin-prettier`.
- **Import Sorting**: Automatically sorts imports using `eslint-plugin-simple-import-sort`.
- **Unused Imports**: Detects and removes unused imports and variables with `eslint-plugin-unused-imports`.
- **Globals**: Pre-configured for browser, Node.js, React, and JSX environments.

## Installation

```bash
npm install --save-dev @uxndigital/eslint-config-base eslint prettier
# or
yarn add --dev @uxndigital/eslint-config-base eslint prettier
# or
pnpm add -D @uxndigital/eslint-config-base eslint prettier
```

### TypeScript 7 Users

For TypeScript 7 projects, you have two options:

**Option 1: Automatic (works out of the box)**
```bash
pnpm add -D @uxndigital/eslint-config-base typescript@^7.0.0
```

**Option 2: Explicit TS 6 for ESLint (better compatibility)**
```bash
pnpm add -D @uxndigital/eslint-config-base typescript@^7.0.0 typescript-6@npm:typescript@~6.0.3
```

The config automatically detects and handles TS 6/7 compatibility. See [TYPESCRIPT_7.md](./TYPESCRIPT_7.md) for details.

> **Note:** You may also need to install peer dependencies if not already present in your project.

## Usage

Add the config to your ESLint configuration file (e.g., `eslint.config.js`):

```js
import baseConfig from '@uxndigital/eslint-config-base';

export default baseConfig;
```

Or, for legacy `.eslintrc` files:

```json
{
  "extends": ["@uxndigital/eslint-config-base"]
}
```

## Override

```js
import baseConfig from '@uxndigital/eslint-config-base';

export default defineConfig([
  {
    extends: [baseConfig],

    // anything from here will override myconfig
    rules: {
      'no-unused-vars': 'warn'
    }
  }
]);
```

## Included Plugins & Configs

- `@eslint/js`
- `@typescript-eslint`
- `eslint-plugin-prettier`
- `eslint-plugin-simple-import-sort`
- `eslint-plugin-unused-imports`
- `eslint-config-prettier`
- `globals`
- `prettier`

## Customization

You can extend or override any rules in your own ESLint config as needed.

## License

MIT
