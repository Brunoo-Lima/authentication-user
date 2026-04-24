/** @type {import('jest').Config} */
const config = {
    clearMocks: true,
    coverageProvider: 'v8',
    collectCoverageFrom: ['src/**/*.ts'],
    silent: true,
    modulePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
};

export default config;
