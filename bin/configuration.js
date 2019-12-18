'use strict';

const necessary = require('necessary');

const versions = require('./versions'),
      messages = require('./messages'),
      constants = require('./constants'),
      configurationVersion_0_1 = require('./configuration/version_0_1');

const { miscellaneousUtilities } = necessary,
      { rc } = miscellaneousUtilities,
      { exit } = process,
      { RC_BASE_EXTENSION } = constants,
      { VERSION_0_0, CURRENT_VERSION } = versions,
      { CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE } = messages,
      { createConfiguration, upgradeConfigurationToVersion_0_1 } = configurationVersion_0_1,
      { setRCBaseExtension, checkRCFileExists, updateRCFile, writeRCFile, readRCFile } = rc;

setRCBaseExtension(RC_BASE_EXTENSION);

function retrieveOptions() {
  const configuration = readConfigurationFile(),
        { options } = configuration;

  return options;
}

function retrieveDirectories() {
  const configuration = readConfigurationFile(),
        { directories } = configuration;

  return directories;
}

function updateOptions(options) {
  updateConfigurationFile({
    options
  });
}

function updateDirectories(directories) {
  updateConfigurationFile({
    directories
  });
}

function createConfigurationFile() {
  const configuration = createConfiguration(),
        json = configuration; ///

  writeRCFile(json);
}

function upgradeConfigurationFile() {
  let version;

  let json = readRCFile();

  let configuration = json; ///

  version = configuration.version || VERSION_0_0; ///

  while (version !== CURRENT_VERSION) {
    switch (version) {
      case VERSION_0_0:
        configuration = upgradeConfigurationToVersion_0_1(configuration);
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
  retrieveOptions,
  updateOptions,
  createConfigurationFile,
  upgradeConfigurationFile,
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
