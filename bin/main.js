"use strict";

const { pathUtilities } = require("necessary");

const actions = require("./actions");

const { TWO_DOTS } = require("./constants"),
      { PROPAGATE_COMMAND } = require("./commands"),
      { checkConfigurationFileExists, migrateConfigurationFile } = require("./configuration");

const { bottommostNameFromPath } = pathUtilities;

function main(command, argument, options) {
  let configurationFileExists = checkConfigurationFileExists();

  if (command === null) {
    if (!configurationFileExists) {
      const currentWorkingDirectoryPath = process.cwd(); ///

      process.chdir(TWO_DOTS);

      const oldCurrentWorkingDirectoryPath = currentWorkingDirectoryPath; ///

      configurationFileExists = checkConfigurationFileExists();

      if (configurationFileExists) {
        const bottommostOldCurrentWorkingDirectoryName = bottommostNameFromPath(oldCurrentWorkingDirectoryPath);

        command = PROPAGATE_COMMAND;  ///

        argument = bottommostOldCurrentWorkingDirectoryName; ///
      }
    }
  }

  if (configurationFileExists) {
    migrateConfigurationFile();
  }

  actions(command, argument, options);
}

module.exports = main;
