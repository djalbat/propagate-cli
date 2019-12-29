'use strict';

const INVALID_ANSWER_MESSAGE = 'You must answer (y)es or (n)o.',
      INVALID_DIRECTORY_PATH_MESSAGE = 'The directory path should be a relative path, starting with a period or more likely a double period.',
      INVALID_DIRECTORY_NUMBER_MESSAGE = 'The directory number should match one of the numbers given above.',
      FAILED_PROPAGATE_MESSAGE = 'Failed to propagate the package.',
      FAILED_INITIALISE_MESSAGE = 'Failed to create a configuration file because one is already present.',
      FAILED_ADD_DIRECTORY_MESSAGE = 'Failed to add a directory.',
      FAILED_REMOVE_DIRECTORY_MESSAGE = 'Failed to remove a directory.',
      FAILED_SET_SHELL_COMMANDS_MESSAGE = 'Failed to set the shell commandS.',
      SUCCESSFUL_PROPAGATE_MESSAGE = "Propagated the package successfully.",
      SUCCESSFUL_INITIALISE_MESSAGE = 'The configuration file has been created successfully.',
      SUCCESSFUL_ADD_DIRECTORY_MESSAGE = 'The directory has been added successfully.',
      SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE = 'The directory has been removed successfully.',
      SUCCESSFUL_SET_SHELL_COMMANDS_MESSAGE = 'The shell commands have been set successfully.',
      NO_RELEASE_MESSAGE = 'Either the sub-directory is missing or it does not contain a package.json file.',
      AT_LEAST_ONE_CYCLE_MESSAGE = 'There is at least one cycle.',
      RELEASE_NOT_PUBLISHABLE_MESSAGE = 'The package.json file must contain both name and version fields in order to be publishable.',
      NO_SUB_DIRECTORY_SPECIFIED_MESSAGE = 'No sub-directory has been specified.',
      DIRECTORIES_INCLUDES_DIRECTORY_MESSAGE = 'The directory has already been added.',
      CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE = 'The action cannot be performed because the configuration file is missing. Run \'propagate initialise\' to create one.';

module.exports = {
  INVALID_ANSWER_MESSAGE,
  INVALID_DIRECTORY_PATH_MESSAGE,
  INVALID_DIRECTORY_NUMBER_MESSAGE,
  FAILED_PROPAGATE_MESSAGE,
  FAILED_INITIALISE_MESSAGE,
  FAILED_ADD_DIRECTORY_MESSAGE,
  FAILED_REMOVE_DIRECTORY_MESSAGE,
  FAILED_SET_SHELL_COMMANDS_MESSAGE,
  SUCCESSFUL_PROPAGATE_MESSAGE,
  SUCCESSFUL_INITIALISE_MESSAGE,
  SUCCESSFUL_ADD_DIRECTORY_MESSAGE,
  SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE,
  SUCCESSFUL_SET_SHELL_COMMANDS_MESSAGE,
  NO_RELEASE_MESSAGE,
  AT_LEAST_ONE_CYCLE_MESSAGE,
  RELEASE_NOT_PUBLISHABLE_MESSAGE,
  NO_SUB_DIRECTORY_SPECIFIED_MESSAGE,
  DIRECTORIES_INCLUDES_DIRECTORY_MESSAGE,
  CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE
};
