const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      
      // implement node event listeners here
    },
    watchForFileChanges: false,
    baseUrl:  process.env.CYPRESS_BASE_URL || 'http://localhost:3000',

  }
});

