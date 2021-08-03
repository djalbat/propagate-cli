"use strict";

const { configurationUtilities } = require("necessary");

const { CURRENT_VERSION } = require("./versions"),
      { RC_BASE_EXTENSION } = require("./constants"),
      { CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE } = require("./messages"),
      { createConfiguration, migrateConfigurationToVersion_1_7 } = require("./configuration/version_1_7");

const { rc } = configurationUtilities,
      { setRCBaseExtension, checkRCFileExists, updateRCFile, writeRCFile, readRCFile } = rc;

setRCBaseExtension(RC_BASE_EXTENSION);

function retrieveDirectories() {
  const configuration = readConfigurationFile(),
        { directories } = configuration;

  return directories;
}

function retrieveShellCommands() {
  const configuration = readConfigurationFile(),
        { shellCommands } = configuration;

  return shellCommands;
}

function retrieveIgnoredDependencies() {
  const configuration = readConfigurationFile(),
        { ignoredDependencies } = configuration;

  return ignoredDependencies;
}

function retrieveForcedDependencyRelations() {
  const configuration = readConfigurationFile(),
        { forcedDependencyRelations } = configuration;

  return forcedDependencyRelations;
}

function updateDirectories(directories) {
  updateConfigurationFile({
    directories
  });
}

function updateShellCommands(shellCommands) {
  updateConfigurationFile({
    shellCommands
  });
}

function updateIgnoredDependencies(ignoredDependencies) {
  updateConfigurationFile({
    ignoredDependencies
  });
}

function updateForcedDependencyRelations(forcedDependencyRelations) {
  updateConfigurationFile({
    forcedDependencyRelations
  });
}

function createConfigurationFile() {
  const configuration = createConfiguration(),
        json = configuration; ///

  writeRCFile(json);
}

function migrateConfigurationFile() {
  let version;

  let json = readRCFile();

  let configuration = json; ///

  version = configuration.version || VERSION_0_0; ///

  while (version !== CURRENT_VERSION) {
    switch (version) {
      default :
        configuration = migrateConfigurationToVersion_1_7(configuration);

        break;
    }

    version = configuration.version || VERSION_0_0; ///
  }

  json = configuration; ///

  writeRCFile(json);
}

function checkConfigurationFileExists() {
  const rcFileExists = checkRCFileExists(),
        configurationFileExists = rcFileExists; ///

  return configurationFileExists;
}

module.exports = {
  retrieveDirectories,
  retrieveShellCommands,
  retrieveIgnoredDependencies,
  retrieveForcedDependencyRelations,
  updateDirectories,
  updateShellCommands,
  updateIgnoredDependencies,
  updateForcedDependencyRelations,
  createConfigurationFile,
  migrateConfigurationFile,
  checkConfigurationFileExists
};

function readConfigurationFile() {
  assertConfigurationFileExists();

  const json = readRCFile(),
        configuration = json; ///

  return configuration;
}

function writeConfigurationFile(configuration) {
  assertConfigurationFileExists();

  const json = configuration; ///

  writeRCFile(json);
}

function updateConfigurationFile(addedConfiguration, ...deleteConfigurationNames) {
  assertConfigurationFileExists();

  const addedProperties = addedConfiguration, ///
        deletedPropertyNames = deleteConfigurationNames;  ///

  updateRCFile(addedProperties, ...deletedPropertyNames);
}

function assertConfigurationFileExists() {
  const configurationFileExists = checkConfigurationFileExists();

  if (!configurationFileExists) {
    console.log(CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE);

    process.exit(1);
  }
}
