/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@components/(.*)$': '<rootDir>/_components/$1',
    '^@fonts': '<rootDir>/_fonts/index.ts',
    '^@utils': '<rootDir>/_utils/index.ts',
    '^@types': '<rootDir>/_types/index.ts',
    '^@enums': '<rootDir>/_types/enums/index.ts',
    '^@contexts/(.*)$': '<rootDir>/_contexts/$1',
  },
};

export default createJestConfig(config);
