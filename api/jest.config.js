/** @type {import('jest').Config} */
const config = {
    clearMocks: true,
    coverageProvider: 'v8',
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/index.ts',
        '!src/**/@types/**',
        '!src/**/interfaces/**',
    ],
    silent: true,
    modulePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
};

export default config;
