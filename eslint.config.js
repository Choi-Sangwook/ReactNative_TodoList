// https://docs.expo.dev/guides/using-eslint/
const expoConfig = require('eslint-config-expo/flat');

module.exports = [
  ...expoConfig,
  {
    ignores: ['dist/*', 'node_modules/*'],
  },
  {
    rules: {
      // styled-components' default export is conventionally imported as `styled`.
      'import/no-named-as-default': 'off',
    },
  },
];
