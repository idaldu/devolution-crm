import baseConfig from '@devolution/config/eslint/base.js';

export default [
  ...baseConfig,
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.next/**',
      'packages/api-client/src/generated/**',
      '**/*.js',
    ],
  },
];
