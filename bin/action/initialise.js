"use strict";

const { checkConfigurationFileExists, createConfigurationFile } = require("../configuration"),
      { FAILED_INITIALISE_MESSAGE, SUCCESSFUL_INITIALISE_MESSAGE } = require("../messages");

function initialiseAction() {
  const configurationFileExists = checkConfigurationFileExists();

  if (configurationFileExists) {
    console.log(FAILED_INITIALISE_MESSAGE);
  } else {
    createConfigurationFile();

    console.log(SUCCESSFUL_INITIALISE_MESSAGE);
  }
}

module.exports = initialiseAction;
