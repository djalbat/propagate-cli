"use strict";

import { versionUtilities, configurationUtilities } from "necessary";

import { PROPAGATE } from "./constants";
import { createConfiguration } from "./configuration/version_1_11";
import { migrateConfigurationToVersion_1_3 } from "./configuration/version_1_3";
import { migrateConfigurationToVersion_1_7 } from "./configuration/version_1_7";
import { migrateConfigurationToVersion_1_9 } from "./configuration/version_1_9";
import { migrateConfigurationToVersion_1_10 } from "./configuration/version_1_10";
import { migrateConfigurationToVersion_1_11 } from "./configuration/version_1_11";
import { CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE } from "./messages";
import { VERSION_1_0, VERSION_1_3, VERSION_1_7, VERSION_1_9, VERSION_1_10, VERSION_1_11 } from "./versions";

const { rc } = configurationUtilities,
      { migrate } = versionUtilities,
      { setRCBaseExtension, checkRCFileExists, updateRCFile, writeRCFile, readRCFile } = rc;

setRCBaseExtension(PROPAGATE);

export function retrieveDirectories() {
  const configuration = readConfigurationFile(),
        { directories } = configuration;

  return directories;
}

export function retrieveShellCommands() {
  const configuration = readConfigurationFile(),
        { shellCommands } = configuration;

  return shellCommands;
}

export function retrieveIgnoredBuilds() {
  const configuration = readConfigurationFile(),
        { ignoredBuilds } = configuration;

  return ignoredBuilds;
}

export function retrieveIgnoredPublishes() {
  const configuration = readConfigurationFile(),
        { ignoredPublishes } = configuration;

  return ignoredPublishes;
}

export function retrieveIgnoredDependencies() {
  const configuration = readConfigurationFile(),
        { ignoredDependencies } = configuration;

  return ignoredDependencies;
}

export function retrieveForcedDependencyRelations() {
  const configuration = readConfigurationFile(),
        { forcedDependencyRelations } = configuration;

  return forcedDependencyRelations;
}

export function updateDirectories(directories) {
  updateConfigurationFile({
    directories
  });
}

export function updateShellCommands(shellCommands) {
  updateConfigurationFile({
    shellCommands
  });
}

export function updateIgnoredDependencies(ignoredDependencies) {
  updateConfigurationFile({
    ignoredDependencies
  });
}

export function updateForcedDependencyRelations(forcedDependencyRelations) {
  updateConfigurationFile({
    forcedDependencyRelations
  });
}

export function createConfigurationFile() {
  const configuration = createConfiguration(),
        json = configuration; ///

  writeRCFile(json);
}

export function migrateConfigurationFile() {
  assertConfigurationFileExists();

  let json = readRCFile();

  const migrationMap = {
          [ VERSION_1_0 ]: migrateConfigurationToVersion_1_3,
          [ VERSION_1_3 ]: migrateConfigurationToVersion_1_7,
          [ VERSION_1_7 ] :migrateConfigurationToVersion_1_9,
          [ VERSION_1_9 ] :migrateConfigurationToVersion_1_10,
          [ VERSION_1_10 ] :migrateConfigurationToVersion_1_11
        },
        latestVersion = VERSION_1_11;

  json = migrate(json, migrationMap, latestVersion);

  writeRCFile(json);
}

export function checkConfigurationFileExists() {
  const rcFileExists = checkRCFileExists(),
        configurationFileExists = rcFileExists; ///

  return configurationFileExists;
}

export function assertConfigurationFileExists() {
  const configurationFileExists = checkConfigurationFileExists();

  if (!configurationFileExists) {
    console.log(CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE);

    process.exit(1);
  }
}

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
