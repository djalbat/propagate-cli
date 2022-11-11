"use strict";

const { pathUtilities } = require("necessary");

const actions = require("./actions");

const { TWO_DOTS } = require("./constants"),
      { PROPAGATE_COMMAND } = require("./commands");
const { DEFAULT_HELP, DEFAULT_VERSION } = require("./defaults"),
      { checkConfigurationFileExists, migrateConfigurationFile } = require("./configuration");

const { bottommostNameFromPath } = pathUtilities;

function main(command, argument, options) {
  const commandExists = (command !== null),
        { help = DEFAULT_HELP, version = DEFAULT_VERSION } = options;

  let configurationFileExists = checkConfigurationFileExists();

  if (!help && !version && !commandExists && !configurationFileExists) {  ///
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

  if (configurationFileExists) {
    migrateConfigurationFile();
  }

  actions(command, argument, options);
}

module.exports = main;
