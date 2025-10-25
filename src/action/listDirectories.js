"use strict";

import { EMPTY_STRING } from "../constants";
import { retrieveDirectories } from "../configuration";
import { DEFAULT_DIRECTORY_NAME } from "../defaults";

export default function listDirectoriesAction() {
  const directoryNumbers = [],
        directories = retrieveDirectories(),
        defaultDirectoryName = DEFAULT_DIRECTORY_NAME,
        directoryNames = [
          defaultDirectoryName,
          ...directories
        ];

  console.log(EMPTY_STRING);

  directoryNames.forEach((directoryName, index) => {
    if (index === 0) {
      console.log(`    "${directoryName}"`);
    } else {
      const directoryNumber = index;  ///

      console.log(` ${directoryNumber}: "${directoryName}"`);

      directoryNumbers.push(directoryNumber);
    }
  });

  console.log(EMPTY_STRING);

  return directoryNumbers;
}
