'use strict';

const necessary = require('necessary');

const { fileSystemUtilities } = necessary,
      { readDirectory, isEntryDirectory } = fileSystemUtilities;

const { cwd } = process;

function propagate(argument, quietly) {
  const currentWorkingDirectoryPath = cwd(), ///
        entryNames = readDirectory(currentWorkingDirectoryPath),
        directoryNames = entryNames.reduce((directoryNames, entryName) => {
          const entryDirectory = isEntryDirectory(entryName);

          if (entryDirectory) {
            const directoryName = entryName;  ///

            directoryNames.push(directoryName);
          }

          return directoryNames;
        }, []);

  console.log(directoryNames)
}

module.exports = propagate;

function retrieveDirectoryNames(quietly) {
  const currentWorkingDirectoryPath = cwd(), ///
        entryNames = readDirectory(currentWorkingDirectoryPath),
        directoryNames = entryNames.reduce((directoryNames, entryName) => {
          const entryDirectory = isEntryDirectory(entryName);

          if (entryDirectory) {
            const directoryName = entryName;  ///

            directoryNames.push(directoryName);
          }

          return directoryNames;
        }, []);

  console.log(directoryNames)

}
