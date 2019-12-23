'use strict';

const necessary = require('necessary');

const versions = require('./versions'),
      messages = require('./messages'),
      constants = require('./constants'),
      configurationVersion_0_1 = require('./configuration/version_0_1'),
      configurationVersion_0_2 = require('./configuration/version_0_2'),
      configurationVersion_0_3 = require('./configuration/version_0_3'),
      configurationVersion_0_4 = require('./configuration/version_0_4');

const { miscellaneousUtilities } = necessary,
      { rc } = miscellaneousUtilities,
      { exit } = process,
      { RC_BASE_EXTENSION } = constants,
      { migrateConfigurationToVersion_0_1 } = configurationVersion_0_1,
      { migrateConfigurationToVersion_0_2 } = configurationVersion_0_2,
      { migrateConfigurationToVersion_0_3 } = configurationVersion_0_3,
      { CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE } = messages,
      { createConfiguration, migrateConfigurationToVersion_0_4 } = configurationVersion_0_4,
      { VERSION_0_0, VERSION_0_1, VERSION_0_2, VERSION_0_3, CURRENT_VERSION } = versions,
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
      case VERSION_0_0:
        configuration = migrateConfigurationToVersion_0_1(configuration);
        break;

      case VERSION_0_1:
        configuration = migrateConfigurationToVersion_0_2(configuration);
        break;

      case VERSION_0_2:
        configuration = migrateConfigurationToVersion_0_3(configuration);
        break;

      case VERSION_0_3:
        configuration = migrateConfigurationToVersion_0_4(configuration);
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
  updateDirectories,
  updateShellCommands,
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

    exit(1);
  }
}
