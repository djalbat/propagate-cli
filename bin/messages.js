'use strict';

const INVALID_DIRECTORY_PATH_MESSAGE = 'The directory path should be a relative path, starting with a period or more likely a double period.',
      INVALID_DIRECTORY_NUMBER_MESSAGE = 'The directory number should match one of the numbers given above.',
      FAILED_INITIALISE_MESSAGE = 'Failed to create a configuration file because one is already present.',
      FAILED_SET_OPTIONS_MESSAGE = 'Failed to set the options.',
      FAILED_ADD_DIRECTORY_MESSAGE = 'Failed to add a directory.',
      FAILED_REMOVE_DIRECTORY_MESSAGE = 'Failed to remove a directory.',
      SUCCESSFUL_INITIALISE_MESSAGE = 'The configuration file has been created successfully.',
      SUCCESSFUL_SET_OPTIONS_MESSAGE = 'The options have been set successfully.',
      SUCCESSFUL_ADD_DIRECTORY_MESSAGE = 'The directory has been added successfully.',
      NO_DIRECTORIES_MESSAGE = 'There are no additional directories.',
      SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE = 'The directory has been removed successfully.',
      DIRECTORIES_INCLUDES_DIRECTORY_MESSAGE = 'The directory has already been added.',
      CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE = 'The action cannot be performed because the configuration file is missing. Run \'propagate initialise\' to create one.';

module.exports = {
  INVALID_DIRECTORY_PATH_MESSAGE,
  INVALID_DIRECTORY_NUMBER_MESSAGE,
  FAILED_INITIALISE_MESSAGE,
  FAILED_SET_OPTIONS_MESSAGE,
  FAILED_ADD_DIRECTORY_MESSAGE,
  FAILED_REMOVE_DIRECTORY_MESSAGE,
  SUCCESSFUL_INITIALISE_MESSAGE,
  SUCCESSFUL_SET_OPTIONS_MESSAGE,
  SUCCESSFUL_ADD_DIRECTORY_MESSAGE,
  NO_DIRECTORIES_MESSAGE,
  SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE,
  DIRECTORIES_INCLUDES_DIRECTORY_MESSAGE,
  CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE
};
