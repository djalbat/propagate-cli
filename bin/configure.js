"use strict";

const { pathUtilities } = require("necessary");

const { DOUBLE_DOTS } = require("./constants"),
      { DEFAULT_HELP, DEFAULT_VERSION } = require("./defaults"),
      { migrateConfigurationFile, checkConfigurationFileExists } = require("./configuration"),
      { HELP_COMMAND, VERSION_COMMAND, INITIALISE_COMMAND, PROPAGATE_COMMAND } = require("./commands");

const { bottommostNameFromPath } = pathUtilities;

function configure(command, argument, options, main) {
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

  const directoryName = changeDirectory(command);

  if (directoryName !== null) {
    if (command !== null) {
      command = PROPAGATE_COMMAND;
    }

    argument = directoryName; ///
  }

  if (argument === null) {
    argument = command; ///

    command = PROPAGATE_COMMAND;
  }

  main(command, argument, options);
}

module.exports = configure;

function changeDirectory(command) {
  let directoryName = null,
      configurationFileExists = checkConfigurationFileExists();

  if (!configurationFileExists) {
    const currentWorkingDirectoryPath = process.cwd(); ///

    process.chdir(DOUBLE_DOTS);

    const oldCurrentWorkingDirectoryPath = currentWorkingDirectoryPath; ///

    configurationFileExists = checkConfigurationFileExists();

    if (configurationFileExists) {
      const bottommostOldCurrentWorkingDirectoryName = bottommostNameFromPath(oldCurrentWorkingDirectoryPath);

      directoryName = bottommostOldCurrentWorkingDirectoryName; ///
    } else {
      process.chdir(oldCurrentWorkingDirectoryPath);
    }
  }

  if (command !== INITIALISE_COMMAND) {
    migrateConfigurationFile();
  }

  return directoryName;
}
