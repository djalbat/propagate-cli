'use strict';

const versions = require('../versions');

const { VERSION_0_2 } = versions;

function createConfiguration() {
  const version = VERSION_0_2,  ///
        directories = [],
        configuration = {
          version,
          directories
        } ;

  return configuration;
}

function migrateConfigurationToVersion_0_2(configuration) {
  const { directories } = configuration;

  const version = VERSION_0_2;  ///

  configuration = {
    version,
    directories
  };

  return configuration;
}


module.exports = {
  createConfiguration,
  migrateConfigurationToVersion_0_2
};
