module.exports = {
    transform: {
      '\\.(ts|tsx)?$': 'ts-jest',
    },
    testRegex: ".\\**\\.*?.tests.(ts|tsx)$",   // looks for your test
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    coverageDirectory: "./tests/coverage",
    moduleNameMapper: {
        "@src/(.*)$": "<rootDir>/src/$1",
        "@testing/(.*)$": "<rootDir>/testing/$1",
      },
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/tests/",
        "/wwwroot/"
    ],
    testPathIgnorePatterns: ['/node_modules/'],
    setupFilesAfterEnv: [
        "./tests/setup.ts"
    ]
  };