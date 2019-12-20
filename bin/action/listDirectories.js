'use strict';

const messages = require('../messages'),
      configuration = require('../configuration');

const { retrieveDirectories } = configuration,
      { NO_DIRECTORIES_MESSAGE } = messages;

function listDirectories() {
  let directoryNumbers;

  const directories = retrieveDirectories(),
        directoriesLength = directories.length;

  if (directoriesLength === 0) {
    directoryNumbers = [];

    console.log(NO_DIRECTORIES_MESSAGE);
  } else {
    console.log('');

    directoryNumbers = directories.map((directory, index) => {
      const directoryNumber = index + 1;

      console.log(` ${directoryNumber}: '${directory}'`);

      return directoryNumber;
    });

    console.log('');
  }

  return directoryNumbers;
}

module.exports = listDirectories;
