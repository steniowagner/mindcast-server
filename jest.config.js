module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: '__tests__/coverage',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
};
