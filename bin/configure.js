"use strict";

const { pathUtilities } = require("necessary");

const { TWO_DOTS } = require("./constants"),
      { PROPAGATE_COMMAND } = require("./commands"),
      { DEFAULT_HELP, DEFAULT_VERSION } = require("./defaults"),
      { checkConfigurationFileExists, migrateConfigurationFile } = require("./configuration");

const { bottommostNameFromPath } = pathUtilities;

function configure(command, argument, options, main) {
  let configurationFileExists = checkConfigurationFileExists();

  if (!configurationFileExists) {
    const { help = DEFAULT_HELP, version = DEFAULT_VERSION } = options;

    if ((help === false) && (version === false) && (command === null)) {
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

  main(command, argument, options);
}

module.exports = configure;
