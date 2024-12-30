const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: true, //Ativa a gravação de videos
    videosFolder: "cypress/videos", //local onde os videos vãos ser armazenados
  },
});
