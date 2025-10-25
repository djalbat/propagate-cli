"use strict";

import { pathUtilities, fileSystemUtilities } from "necessary";

import { retrieveDirectories } from "../configuration";
import { absolutePathFromName } from "../utilities/path";
import { DEFAULT_DIRECTORY_NAME } from "../defaults";

const { concatenatePaths } = pathUtilities,
      { readDirectory, isEntryDirectory } = fileSystemUtilities;

export default function createSubDirectoryMapOperation(proceed, abort, context) {
  const subDirectoryMap = {},
        directories = retrieveDirectories(),
        directoryNames = [
          DEFAULT_DIRECTORY_NAME,
          ...directories
        ];

  directoryNames.forEach((directoryName) => {
    try {
      const absoluteDirectoryPath = absolutePathFromName(directoryName),
            entryNames = readDirectory(absoluteDirectoryPath);

      entryNames.forEach((entryName) => {
        const entryPath = concatenatePaths(directoryName, entryName),
              entryDirectory = isEntryDirectory(entryPath);

        if (entryDirectory) {
          const subDirectoryName = entryName, ///
                subDirectoryPath = entryPath; ///

          subDirectoryMap[subDirectoryName] = subDirectoryPath;
        }
      });
    } catch (error) {
      console.log(`The '${directoryName}' directory cannot be read.`);
    }
  });

  Object.assign(context, {
    subDirectoryMap
  });

  proceed();
}
