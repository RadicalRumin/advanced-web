module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/lib/firebase.ts'],
  coverageDirectory: 'coverage',
};
