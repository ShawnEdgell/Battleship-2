module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    jest: true, // Add Jest environment
    node: true  // Add this line
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended' // Add Jest plugin recommendations
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react-refresh',
    'jest' // Add Jest plugin
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Add any Jest-specific rules if needed
  },
}
