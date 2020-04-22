"use strict";

const necessary = require("necessary");

const actions = require("./actions"),
      commands = require("./commands"),
      configuration = require("./configuration");

const { cwd, chdir } = process,
      { pathUtilities } = necessary,
      { PROPAGATE_COMMAND } = commands,
      { bottommostNameFromPath } = pathUtilities,
      { checkConfigurationFileExists, migrateConfigurationFile } = configuration;

function main(command, argument, options) {
  let configurationFileExists = checkConfigurationFileExists();

  if (command === null) {
    if (!configurationFileExists) {
      const currentWorkingDirectoryPath = cwd(); ///

      chdir("..");

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
