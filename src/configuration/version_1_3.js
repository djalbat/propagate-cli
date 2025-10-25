"use strict";

import { VERSION_1_3 } from "../versions";

export function migrateConfigurationToVersion_1_3(configuration) {
  const version = VERSION_1_3,
        ignoredDependencies = [];

  configuration = Object.assign(configuration, {
    version,
    ignoredDependencies
  });

  return configuration;
}
