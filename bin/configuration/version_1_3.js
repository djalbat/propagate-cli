"use strict";

const { VERSION_1_3 } = require("../versions");

function migrateConfigurationToVersion_1_3(configuration) {
  const version = VERSION_1_3,
        ignoredDependencies = [];

  configuration = Object.assign(configuration, {
    version,
    ignoredDependencies
  });

  return configuration;
}

module.exports = {
  migrateConfigurationToVersion_1_3
};
