const packagesToTransform = [
    "react-native",
    "react-native-(.*)",
    "@react-native",
    "@react-native-community",
    "@react-navigation",
    "expo",
    "expo-(.*)",
];

const config = {
    preset: "jest-expo",
    // test environment setup
    clearMocks: true,
    // module resolution
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    modulePaths: ["<rootDir>"],
    testRegex: "\\.test\\.[jt]sx?$",
    // module transformation
    transformIgnorePatterns: [
      `node_modules/(?!(${packagesToTransform.join("|")})/)`,
    ],
    cacheDirectory: ".cache/jest",
    // tools
    watchPlugins: [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname",
    ],
    testTimeout: 30000,
  };
  
  module.exports = config;
  