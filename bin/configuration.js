'use strict';

const necessary = require('necessary');

const versions = require('./versions'),
      messages = require('./messages'),
      constants = require('./constants'),
      configurationVersion_0_0 = require('./configuration/version_0_0');

const { miscellaneousUtilities } = necessary,
      { rc } = miscellaneousUtilities,
      { exit } = process,
      { RC_BASE_EXTENSION } = constants,
      { createConfiguration } = configurationVersion_0_0,
      { VERSION_0_0, CURRENT_VERSION } = versions,
      { CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE } = messages,
      { setRCBaseExtension, checkRCFileExists, updateRCFile, writeRCFile, readRCFile } = rc;

setRCBaseExtension(RC_BASE_EXTENSION);

function retrieveOptions() {
  const configuration = readConfigurationFile(),
        { options } = configuration;

  return options;
}

function updateOptions(options) {
  updateConfigurationFile({
    options
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
      ///
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
