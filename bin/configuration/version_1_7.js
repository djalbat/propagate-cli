"use strict";

const { VERSION_1_7 } = require("../versions");

function migrateConfigurationToVersion_1_7(configuration) {
  const version = VERSION_1_7,
        forcedDependencyRelations = [];

  configuration = Object.assign(configuration, {
    version,
    forcedDependencyRelations
  });

  return configuration;
}

module.exports = {
  createConfiguration,
  migrateConfigurationToVersion_1_7
};
