const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: true, //Ativa a gravação de videos
    videosFolder: "cypress/videos", //local onde os videos vãos ser armazenados
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "mochawesome-report", // Pasta onde os arquivos JSON/HTML são salvos
    overwrite: false,
    html: true,
    json: true
  }
});
