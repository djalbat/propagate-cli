"use strict";

const { pathUtilities } = require("necessary");

const { DOUBLE_DOTS } = require("./constants"),
      { DEFAULT_HELP, DEFAULT_VERSION } = require("./defaults"),
      { migrateConfigurationFile, checkConfigurationFileExists } = require("./configuration"),
      { HELP_COMMAND, VERSION_COMMAND, PROPAGATE_COMMAND, INITIALISE_COMMAND } = require("./commands");

const { bottommostNameFromPath } = pathUtilities;

function configure(command, argument, options, main) {
  let configurationFileExists;

  const { help = DEFAULT_HELP, version = DEFAULT_VERSION } = options;

  if (false) {
    ///
  } else if (help) {
    command = HELP_COMMAND;
  } else if (version) {
    command = VERSION_COMMAND;
  }

  if ((command === HELP_COMMAND) || (command === VERSION_COMMAND)) {
    main(command, argument, options);

    return;
  }

  configurationFileExists = checkConfigurationFileExists();

  if (command === null) {
    if (!configurationFileExists) {
      const currentWorkingDirectoryPath = process.cwd(); ///

      process.chdir(DOUBLE_DOTS);

      const oldCurrentWorkingDirectoryPath = currentWorkingDirectoryPath; ///

      configurationFileExists = checkConfigurationFileExists();

      if (configurationFileExists) {
        const bottommostOldCurrentWorkingDirectoryName = bottommostNameFromPath(oldCurrentWorkingDirectoryPath);

        argument = bottommostOldCurrentWorkingDirectoryName; ///

        command = PROPAGATE_COMMAND;  ///
      }
    }
  }

  if (command !== INITIALISE_COMMAND) {
    migrateConfigurationFile();
  }

  main(command, argument, options);
}

module.exports = configure;
