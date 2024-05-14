module.exports = {
    clearMocks: true,
    moduleDirectories: ["node_modules", "src", "src/app"],
    coverageDirectory: "<rootDir>/test/coverage",
    testEnvironment: "node",
    testMatch: ["**/*.test.ts"],
    preset: "ts-jest"
}
