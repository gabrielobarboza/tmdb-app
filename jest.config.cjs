/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest', 
  testEnvironment: 'jest-environment-jsdom', 
  roots: ['<rootDir>/src'], 
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?', 
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.tsx?': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
      },
    ],
  },
};