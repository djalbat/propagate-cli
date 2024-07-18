"use strict";

const { pathUtilities } = require("necessary");

const { DOUBLE_DOTS } = require("./constants"),
      { migrateConfigurationFile, checkConfigurationFileExists } = require("./configuration");

const { bottommostNameFromPath } = pathUtilities;

function changeDirectory() {
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

  migrateConfigurationFile();

  return directoryName;
}

module.exports = changeDirectory;
