"use strict";

const messages = require("../messages"),
      configuration = require("../configuration");

const { checkConfigurationFileExists, createConfigurationFile } = configuration,
      { FAILED_INITIALISE_MESSAGE, SUCCESSFUL_INITIALISE_MESSAGE } = messages;

function initialise() {
  const configurationFileExists = checkConfigurationFileExists();

  if (configurationFileExists) {
    console.log(FAILED_INITIALISE_MESSAGE);
  } else {
    createConfigurationFile();

    console.log(SUCCESSFUL_INITIALISE_MESSAGE);
  }
}

module.exports = initialise;
