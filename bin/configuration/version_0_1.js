'use strict';

const versions = require('../versions');

const { VERSION_0_1 } = versions;

function createConfiguration() {
  const version = VERSION_0_1,  ///
        options = {},
        directories = [],
        configuration = {
          version,
          options,
          directories
        } ;

  return configuration;
}

function migrateConfigurationToVersion_0_1(configuration) {
  const { options } = configuration;

  const version = VERSION_0_1,  ///
        directories = [];

  configuration = {
    version,
    options,
    directories
  };

  return configuration;
}


module.exports = {
  createConfiguration,
  migrateConfigurationToVersion_0_1
};
