/** @type {import('jest').Config} */
const config = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
  setupFiles: ['./setupJest.ts'],
  setupFilesAfterEnv: ['./setupJestAfterEnv.ts'],
  cacheDirectory: '.jest/cache',
  reporters: ['default', 'jest-image-snapshot/src/outdated-snapshot-reporter.js'],
};

module.exports = config;
