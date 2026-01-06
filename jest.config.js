module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: [
      'service/**/*.js',
      '!service/**/index.js'
  ],
  setupFilesAfterEnv: [],
  testTimeout: 10000,
  verbose: true
};