# @uxndigital/eslint-config-base

A shared flat ESLint configuration for JavaScript and TypeScript projects at
UXN Digital. It includes ESLint recommended rules, TypeScript support, import
sorting, unused-import detection, and Prettier integration.

## Installation

```bash
npm install --save-dev @uxndigital/eslint-config-base eslint prettier
```

## Usage

```js
import baseConfig from '@uxndigital/eslint-config-base';

export default baseConfig;
```

The default export is runtime-neutral. For a Node.js or browser project, use the
corresponding named export:

```js
import {
  baseConfigs,
  browserConfigs,
  nodeConfigs
} from '@uxndigital/eslint-config-base';

export default browserConfigs;
```

- `baseConfigs`: rules only, without runtime globals. This is the default.
- `nodeConfigs`: rules plus Node.js globals.
- `browserConfigs`: rules plus browser globals.

## TypeScript

TypeScript files use the TypeScript ESLint parser and recommended rules without
requiring type-aware project information. This keeps the config compatible with
Vite, Next.js, Node.js, and projects whose config files are outside `tsconfig.json`.

Unused-variable checks use the language-appropriate ESLint rule once per file:
JavaScript uses `no-unused-vars`, TypeScript uses
`@typescript-eslint/no-unused-vars`, and names beginning with `_` are ignored.

## Included Plugins

- `@eslint/js`
- `typescript-eslint`
- `eslint-plugin-prettier`
- `eslint-plugin-simple-import-sort`
- `eslint-plugin-unused-imports`
- `eslint-config-prettier`

## License

MIT © UXN Digital
