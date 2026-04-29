/** @type {import('jest').Config} */
const config = {
    clearMocks: true,
    coverageProvider: 'v8',
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/index.ts',
        '!src/**/@types/**',
        '!src/**/interfaces/**',
        '!src/**/lib/prisma.ts',
    ],
    silent: true,
    modulePathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/dist/',
        '<rootDir>/generated/',
        '<rootDir>/prisma/',
        '<rootDir>/prisma.config.ts',
    ],
    setupFilesAfterEnv: ['<rootDir>/src/lib/singleton.ts'],
};

export default config;
