"use strict";

import { pathUtilities } from "necessary";

import { DOUBLE_DOTS } from "./constants";
import { migrateConfigurationFile, checkConfigurationFileExists } from "./configuration";

const { bottommostNameFromPath } = pathUtilities;

export default function changeDirectory() {
  let directoryName = null,
      configurationFileExists = checkConfigurationFileExists();

  if (!configurationFileExists) {
    const currentWorkingDirectoryPath = process.cwd(); ///

    process.chdir(DOUBLE_DOTS);

    const oldCurrentWorkingDirectoryPath = currentWorkingDirectoryPath; ///

    configurationFileExists = checkConfigurationFileExists();

    if (configurationFileExists) {
      const bottommostOldCurrentWorkingDirectoryName = bottommostNameFromPath(oldCurrentWorkingDirectoryPath);

      directoryName = bottommostOldCurrentWorkingDirectoryName; ///
    } else {
      process.chdir(oldCurrentWorkingDirectoryPath);
    }
  }

  migrateConfigurationFile();

  return directoryName;
}
