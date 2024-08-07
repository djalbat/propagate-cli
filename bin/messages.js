"use strict";

const NO_RELEASE_MESSAGE = "Either the sub-directory is missing or it does not contain a package.json file.",
      NO_ARGUMENT_GIVEN_MESSAGE = "No argument has been given.",
      NO_IGNORED_DEPENDENCIES_MESSAGE = "There are no ignored dependencies.",
      NO_FORCED_DEPENDENCY_RELATIONS_MESSAGE = "There are no forced dependency relations.",
      INVALID_ANSWER_MESSAGE = "You must answer (y)es or (n)o.",
      INVALID_DIRECTORY_PATH_MESSAGE = "The directory path should be a relative path, starting with a period or more likely a double period.",
      INVALID_DIRECTORY_NUMBER_MESSAGE = "The directory number should match one of the numbers given above.",
      INVALID_FORCED_DEPENDENT_NAME_MESSAGE = "The dependent name must be non-empty.",
      INVALID_FORCED_DEPENDENCY_NAME_MESSAGE = "The dependency name must be non-empty.",
      INVALID_IGNORED_DEPENDENCY_NAME_MESSAGE = "The dependency name must be non-empty.",
      INVALID_IGNORED_DEPENDENCY_NUMBER_MESSAGE = "The ignored dependency number should match one of the numbers given above.",
      INVALID_FORCED_DEPENDENCY_RELATION_NUMBER_MESSAGE = "The forced dependency relation number should match one of the numbers given above.",
      FAILED_GIT_MESSAGE = "The Git script failed.",
      FAILED_SAVE_MESSAGE = "The 'package.json' file could not be saved.",
      FAILED_BUILD_MESSAGE = "The build script failed.",
      FAILED_INSTALL_MESSAGE = "The install script failed.",
      FAILED_PUBLISH_MESSAGE = "The publish script failed.",
      FAILED_PROPAGATE_MESSAGE = "Failed to propagate the package.",
      FAILED_INITIALISE_MESSAGE = "Failed to create a configuration file because one is already present.",
      FAILED_ADD_DIRECTORY_MESSAGE = "Failed to add a directory.",
      FAILED_REMOVE_DIRECTORY_MESSAGE = "Failed to remove a directory.",
      FAILED_SET_SHELL_COMMANDS_MESSAGE = "Failed to set the shell commands.",
      FAILED_ADD_IGNORED_DEPENDENCY_MESSAGE = "Failed to add an ignored dependency.",
      FAILED_REMOVE_IGNORED_DEPENDENCY_MESSAGE = "Failed to remove an ignored dependency.",
      FAILED_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE = "Failed to add a forced dependency relation.",
      FAILED_REMOVE_FORCED_DEPENDENCY_RELATION_MESSAGE = "Failed to remove a forced dependency relation.",
      SUCCESSFUL_PROPAGATE_MESSAGE = "Propagated the package successfully.",
      SUCCESSFUL_INITIALISE_MESSAGE = "The configuration file has been created successfully.",
      SUCCESSFUL_ADD_DIRECTORY_MESSAGE = "The directory has been added successfully.",
      SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE = "The directory has been removed successfully.",
      SUCCESSFUL_SET_SHELL_COMMANDS_MESSAGE = "The shell commands have been set successfully.",
      SUCCESSFUL_ADD_IGNORED_DEPENDENCY_MESSAGE = "The ignored dependency was added successfully.",
      SUCCESSFUL_REMOVE_IGNORED_DEPENDENCY_MESSAGE = "The ignored dependency was added successfully.",
      SUCCESSFUL_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE = "The forced dependency relation was added successfully.",
      SUCCESSFUL_REMOVE_FORCED_DEPENDENCY_RELATION_MESSAGE = "The forced dependency relation was added successfully.",
      COMMAND_NOT_RECOGNISED_MESSAGE = "The command is not recognised.",
      RELEASE_NOT_PUBLISHABLE_MESSAGE = "The package.json file must contain both name and version fields in order to be publishable.",
      DIRECTORIES_INCLUDES_DIRECTORY_MESSAGE = "The directory has already been added.",
      CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE = "The action cannot be performed because the configuration file is missing. Run 'propagate initialise' to create one.",
      AT_LEAST_ONE_CYCLIC_DEPENDENCY_MESSAGE = "There is at least one cyclic dependency.",
      AT_LEAST_ONE_CYCLIC_DEV_DEPENDENCY_MESSAGE = "There is at least one cyclic developer dependency.",
      IGNORED_DEPENDENCIES_INCLUDE_SUB_DIRECTORY_MESSAGE = "You cannot propagate an ignored dependency.",
      IGNORED_DEPENDENCIES_INCLUDE_IGNORED_DEPENDENCY_MESSAGE = "The ignored dependency has already been added.",
      FORCED_DEPENDENCY_RELATIONS_INCLUDE_FORCED_DEPENDENCY_RELATION_MESSAGE = "The forced dependency relation has already been added.";

module.exports = {
  NO_RELEASE_MESSAGE,
  NO_ARGUMENT_GIVEN_MESSAGE,
  NO_IGNORED_DEPENDENCIES_MESSAGE,
  NO_FORCED_DEPENDENCY_RELATIONS_MESSAGE,
  INVALID_ANSWER_MESSAGE,
  INVALID_DIRECTORY_PATH_MESSAGE,
  INVALID_DIRECTORY_NUMBER_MESSAGE,
  INVALID_FORCED_DEPENDENT_NAME_MESSAGE,
  INVALID_FORCED_DEPENDENCY_NAME_MESSAGE,
  INVALID_IGNORED_DEPENDENCY_NAME_MESSAGE,
  INVALID_IGNORED_DEPENDENCY_NUMBER_MESSAGE,
  INVALID_FORCED_DEPENDENCY_RELATION_NUMBER_MESSAGE,
  FAILED_GIT_MESSAGE,
  FAILED_SAVE_MESSAGE,
  FAILED_BUILD_MESSAGE,
  FAILED_INSTALL_MESSAGE,
  FAILED_PUBLISH_MESSAGE,
  FAILED_PROPAGATE_MESSAGE,
  FAILED_INITIALISE_MESSAGE,
  FAILED_ADD_DIRECTORY_MESSAGE,
  FAILED_REMOVE_DIRECTORY_MESSAGE,
  FAILED_SET_SHELL_COMMANDS_MESSAGE,
  FAILED_ADD_IGNORED_DEPENDENCY_MESSAGE,
  FAILED_REMOVE_IGNORED_DEPENDENCY_MESSAGE,
  FAILED_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE,
  FAILED_REMOVE_FORCED_DEPENDENCY_RELATION_MESSAGE,
  SUCCESSFUL_PROPAGATE_MESSAGE,
  SUCCESSFUL_INITIALISE_MESSAGE,
  SUCCESSFUL_ADD_DIRECTORY_MESSAGE,
  SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE,
  SUCCESSFUL_SET_SHELL_COMMANDS_MESSAGE,
  SUCCESSFUL_ADD_IGNORED_DEPENDENCY_MESSAGE,
  SUCCESSFUL_REMOVE_IGNORED_DEPENDENCY_MESSAGE,
  SUCCESSFUL_ADD_FORCED_DEPENDENCY_RELATION_MESSAGE,
  SUCCESSFUL_REMOVE_FORCED_DEPENDENCY_RELATION_MESSAGE,
  COMMAND_NOT_RECOGNISED_MESSAGE,
  RELEASE_NOT_PUBLISHABLE_MESSAGE,
  DIRECTORIES_INCLUDES_DIRECTORY_MESSAGE,
  CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE,
  AT_LEAST_ONE_CYCLIC_DEPENDENCY_MESSAGE,
  AT_LEAST_ONE_CYCLIC_DEV_DEPENDENCY_MESSAGE,
  IGNORED_DEPENDENCIES_INCLUDE_SUB_DIRECTORY_MESSAGE,
  IGNORED_DEPENDENCIES_INCLUDE_IGNORED_DEPENDENCY_MESSAGE,
  FORCED_DEPENDENCY_RELATIONS_INCLUDE_FORCED_DEPENDENCY_RELATION_MESSAGE
};
