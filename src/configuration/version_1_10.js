"use strict";

import { VERSION_1_10 } from "../versions";

export function migrateConfigurationToVersion_1_10(configuration) {
  const version = VERSION_1_10,
        ignoredBuilds = [],
        ignoredPublishes = [];

  configuration = Object.assign(configuration, {
    version,
    ignoredBuilds,
    ignoredPublishes
  });

  return configuration;
}
