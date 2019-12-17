'use strict';

const FAILED_INITIALISE_MESSAGE = 'Failed to create a configuration file because one is already present.',
      FAILED_SET_OPTIONS_MESSAGE = 'Failed to set the options.',
      SUCCESSFUL_INITIALISE_MESSAGE = 'The configuration file has been created successfully.',
      SUCCESSFUL_SET_OPTIONS_MESSAGE = 'The options have been set successfully.',
      CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE = 'The action cannot be performed because the configuration file is missing. Run \'propagate initialise\' to create one.';

module.exports = {
  FAILED_INITIALISE_MESSAGE,
  FAILED_SET_OPTIONS_MESSAGE,
  SUCCESSFUL_INITIALISE_MESSAGE,
  SUCCESSFUL_SET_OPTIONS_MESSAGE,
  CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE
};
