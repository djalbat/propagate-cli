"use strict";

import { createConfigurationFile, checkConfigurationFileExists } from "../configuration";
import { FAILED_INITIALISE_MESSAGE, SUCCESSFUL_INITIALISE_MESSAGE } from "../messages";

export default function initialiseAction() {
  const configurationFileExists = checkConfigurationFileExists();

  if (configurationFileExists) {
    console.log(FAILED_INITIALISE_MESSAGE);
  } else {
    createConfigurationFile();

    console.log(SUCCESSFUL_INITIALISE_MESSAGE);
  }
}
