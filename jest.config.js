module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: '__tests__/coverage',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/bin',
    '<rootDir>/src/dao',
    '<rootDir>/src/config',
    '<rootDir>/src/app.js',
  ],
};
