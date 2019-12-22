'use strict';

const versions = require('../versions'),
      constants = require('../constants');

const { VERSION_0_3 } = versions,
      { DEFAULT_GIT_COMMANDS, DEFAULT_BUILD_COMMANDS, DEFAULT_PUBLISH_COMMANDS } = constants,
      gitCommands = DEFAULT_GIT_COMMANDS,
      buildCommands = DEFAULT_BUILD_COMMANDS,
      publishCommands = DEFAULT_PUBLISH_COMMANDS,
      defaultCommands = {
        gitCommands,
        buildCommands,
        publishCommands
      };

function createConfiguration() {
  const version = VERSION_0_3,  ///
        commands = defaultCommands, ///
        directories = [],
        configuration = {
          version,
          commands,
          directories
        } ;

  return configuration;
}

function migrateConfigurationToVersion_0_3(configuration) {
  const { directories } = configuration;

  const version = VERSION_0_3,  ///
        commands = defaultCommands; ///

  configuration = {
    version,
    commands,
    directories
  };

  return configuration;
}


module.exports = {
  createConfiguration,
  migrateConfigurationToVersion_0_3
};
