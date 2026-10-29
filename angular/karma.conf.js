// Karma configuration file: https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require("path");

module.exports = config => {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      clearContext: false,
    },
    coverageReporter: {
      dir: join(__dirname, "./coverage/berlin-vegan-map"),
      subdir: ".",
      reporters: [
        { type: "html" },
        { type: "lcovonly" },
        { type: "text-summary" },
      ],
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,
  });
};
