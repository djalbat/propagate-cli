"use strict";

const constants = require("../constants"),
      configuration = require("../configuration");

const { retrieveDirectories } = configuration,
      { DEFAULT_DIRECTORY_NAME } = constants;

function listDirectories() {
  const directoryNumbers = [],
        directories = retrieveDirectories(),
        defaultDirectoryName = DEFAULT_DIRECTORY_NAME,
        directoryNames = [
          defaultDirectoryName,
          ...directories
        ];

  console.log("");

  directoryNames.forEach((directoryName, index) => {
    if (index === 0) {
      console.log(`    "${directoryName}"`);
    } else {
      const directoryNumber = index;  ///

      console.log(` ${directoryNumber}: "${directoryName}"`);

      directoryNumbers.push(directoryNumber);
    }
  });

  console.log("");

  return directoryNumbers;
}

module.exports = listDirectories;
