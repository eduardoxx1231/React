module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'react-app',
    'prettier',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    JSX: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/no-unresolved': [
      2, 
      { "caseSensitive": false }
   ],
   'no-unused-vars': 'off'
  },
};
