const path = require("path");

module.exports = {
    name: "Org Chart - React",
    verbose: true,
    setupFiles: [
      path.resolve(__dirname, "src/tests/testSetup.js")
    ],
    testMatch: [
        "**/tests/**/*.test.js"
    ]
}
