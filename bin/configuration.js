"use strict";

const { versionUtilities, configurationUtilities } = require("necessary");

const { PROPAGATE } = require("./constants"),
      { createConfiguration } = require("./configuration/version_1_10"),
      { migrateConfigurationToVersion_1_3 } = require("./configuration/version_1_3"),
      { migrateConfigurationToVersion_1_7 } = require("./configuration/version_1_7"),
      { migrateConfigurationToVersion_1_9 } = require("./configuration/version_1_9"),
      { migrateConfigurationToVersion_1_10 } = require("./configuration/version_1_10"),
      { CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE } = require("./messages"),
      { VERSION_1_0, VERSION_1_3, VERSION_1_7, VERSION_1_9, VERSION_1_10 } = require("./versions");

const { rc } = configurationUtilities,
      { migrate } = versionUtilities,
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

function retrieveIgnoredBuilds() {
  const configuration = readConfigurationFile(),
        { ignoredBuilds } = configuration;

  return ignoredBuilds;
}

function retrieveIgnoredPublishes() {
  const configuration = readConfigurationFile(),
        { ignoredPublishes } = configuration;

  return ignoredPublishes;
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
  assertConfigurationFileExists();

  let json = readRCFile();

  const migrationMap = {
          [ VERSION_1_0 ]: migrateConfigurationToVersion_1_3,
          [ VERSION_1_3 ]: migrateConfigurationToVersion_1_7,
          [ VERSION_1_7 ] :migrateConfigurationToVersion_1_9,
          [ VERSION_1_9 ] :migrateConfigurationToVersion_1_10
        },
        latestVersion = VERSION_1_10;

  json = migrate(json, migrationMap, latestVersion);

  writeRCFile(json);
}

function checkConfigurationFileExists() {
  const rcFileExists = checkRCFileExists(),
        configurationFileExists = rcFileExists; ///

  return configurationFileExists;
}

function assertConfigurationFileExists() {
  const configurationFileExists = checkConfigurationFileExists();

  if (!configurationFileExists) {
    console.log(CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE);

    process.exit(1);
  }
}

module.exports = {
  retrieveDirectories,
  retrieveShellCommands,
  retrieveIgnoredBuilds,
  retrieveIgnoredPublishes,
  retrieveIgnoredDependencies,
  retrieveForcedDependencyRelations,
  updateDirectories,
  updateShellCommands,
  updateIgnoredDependencies,
  updateForcedDependencyRelations,
  createConfigurationFile,
  migrateConfigurationFile,
  checkConfigurationFileExists,
  assertConfigurationFileExists
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
