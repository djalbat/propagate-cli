'use strict';

const FAILED_INITIALISE_MESSAGE = 'Failed to create a configuration file because one is already present.',
      FAILED_SET_OPTIONS_MESSAGE = 'Failed to set the options.',
      FAILED_ADD_DIRECTORY_MESSAGE = 'Failed to add a directory.',
      SUCCESSFUL_INITIALISE_MESSAGE = 'The configuration file has been created successfully.',
      SUCCESSFUL_SET_OPTIONS_MESSAGE = 'The options have been set successfully.',
      FAILED_REMOVE_DIRECTORY_MESSAGE = 'Failed to remove a directory.',
      CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE = 'The action cannot be performed because the configuration file is missing. Run \'propagate initialise\' to create one.';

module.exports = {
  FAILED_INITIALISE_MESSAGE,
  FAILED_SET_OPTIONS_MESSAGE,
  FAILED_ADD_DIRECTORY_MESSAGE,
  SUCCESSFUL_INITIALISE_MESSAGE,
  SUCCESSFUL_SET_OPTIONS_MESSAGE,
  FAILED_REMOVE_DIRECTORY_MESSAGE,
  CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE
};
