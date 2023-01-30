const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 960,
  blockHosts: ['google-analytics.com', 'googletagmanager.com'],
  defaultCommandTimeout: 2000,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalSessionSupport: true,
  },

  env: {
    username: 'alexsmol.qa+test@gmail.com',
    password: '123456',
  },
});
