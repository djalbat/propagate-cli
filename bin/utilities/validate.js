"use strict";

function validateAnswer(answer) { return  /^(:?yes|no|y|n)$/i.test(answer); }

function validateDirectoryPath(directoryPath) { return  /^\.\.?(?:\/[a-zA-Z0-9\-_]+)+\/?$/.test(directoryPath); }

function validateShellCommands(shellCommands) { return  /^.*$/.test(shellCommands); }

function validateDirectoryNumber(directoryNumber, directoryNumbers) { return directoryNumbers.includes(directoryNumber); }

function validateIgnoredDependencyName(ignoredDependencyName) { return  /^.+$/.test(ignoredDependencyName); }

function validateIgnoredDependencyNumber(ignoredDependencyNumber, ignoredDependencyNumbers) { return ignoredDependencyNumbers.includes(ignoredDependencyNumber); }

function validateForcedDependencyRelationName(forcedDependencyRelationName) { return  /^.+$/.test(forcedDependencyRelationName); }

function validateForcedDependencyRelationNumber(forcedDependencyRelationNumber, forcedDependencyRelationNumbers) { return forcedDependencyRelationNumbers.includes(forcedDependencyRelationNumber); }

module.exports = {
  validateAnswer,
  validateDirectoryPath,
  validateShellCommands,
  validateDirectoryNumber,
  validateIgnoredDependencyName,
  validateIgnoredDependencyNumber,
  validateForcedDependencyRelationName,
  validateForcedDependencyRelationNumber
};
