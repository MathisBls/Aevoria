import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

const isMain = process.env.GITHUB_REF === 'refs/heads/main';
const isDev = process.env.GITHUB_REF === 'refs/heads/dev';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js', 'eslint.config.js'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': isMain ? 'error' : isDev ? 'warn' : 'off',
      '@typescript-eslint/explicit-function-return-type': isMain ? 'error' : 'off',
      '@typescript-eslint/explicit-module-boundary-types': isMain ? 'error' : 'off',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-non-null-assertion': isMain ? 'error' : 'warn',
      '@typescript-eslint/ban-ts-comment': isMain ? 'error' : 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      'no-unsafe-assignment': 'off',
      'no-unsafe-member-access': 'off',
      'no-unsafe-call': 'off',
      'no-unsafe-argument': 'off',
    },
  }
);

