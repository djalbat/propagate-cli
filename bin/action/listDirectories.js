'use strict';

const configuration = require('../configuration');

const { retrieveDirectories } = configuration;

function listDirectories() {
  const directories = retrieveDirectories(),
        directoriesLength = directories.length;

  if (directoriesLength === 0) {
    console.log("There are no additional directories.");
  } else {
    directories.forEach((directory, index) => {
      const number = index + 1;

      console.log(`{${number}. ${directory}`);
    })
  }
}

module.exports = listDirectories;
