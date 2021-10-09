"use strict";

const { configurationUtilities } = require("necessary");

const { PROPAGATE } = require("./constants"),
      { migrateConfigurationToVersion_1_0 } = require("./configuration/version_1_0"),
      { migrateConfigurationToVersion_1_3 } = require("./configuration/version_1_3"),
      { migrateConfigurationToVersion_1_7 } = require("./configuration/version_1_7"),
      { CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE } = require("./messages"),
      { createConfiguration, migrateConfigurationToVersion_1_9 } = require("./configuration/version_1_9"),
      { VERSION_1_0, VERSION_1_3, VERSION_1_7, CURRENT_VERSION, UNDEFINED_VERSION } = require("./versions");

const { rc } = configurationUtilities,
      { setRCBaseExtension, checkRCFileExists, updateRCFile, writeRCFile, readRCFile } = rc;

setRCBaseExtension(PROPAGATE);

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
  let json = readRCFile();

  let configuration = json; ///

  let { version = UNDEFINED_VERSION } = configuration;

  while (version !== CURRENT_VERSION) {
    switch (version) {
      case UNDEFINED_VERSION :
        configuration = migrateConfigurationToVersion_1_0(configuration);

        break;

      case VERSION_1_0 :
        configuration = migrateConfigurationToVersion_1_3(configuration);

        break;

      case VERSION_1_3 :
        configuration = migrateConfigurationToVersion_1_7(configuration);

        break;

      case VERSION_1_7 :
        configuration = migrateConfigurationToVersion_1_9(configuration);

        break;
    }

    ({ version } = configuration);
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
