"use strict";

import { VERSION_1_7 } from "../versions";

export function migrateConfigurationToVersion_1_7(configuration) {
  const version = VERSION_1_7,
        forcedDependencyRelations = [];

  configuration = Object.assign(configuration, {
    version,
    forcedDependencyRelations
  });

  return configuration;
}
