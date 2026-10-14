export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^index$': '<rootDir>/src/index',
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^exceptions/(.*)$': '<rootDir>/src/exceptions/$1',
    '^schemas/(.*)$': '<rootDir>/src/schemas/$1',
    '^constants/(.*)$': '<rootDir>/src/constants/$1',
    '^middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^error-handler$': '<rootDir>/src/error-handler',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/index.ts'
  ],
  coverageDirectory: 'coverage',
  verbose: true
};