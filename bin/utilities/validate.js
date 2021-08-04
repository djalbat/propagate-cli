"use strict";

function validateAnswer(answer) { return  /^(:?yes|no|y|n)$/i.test(answer); }

function validateDirectoryPath(directoryPath) { return  /^\.\.?(?:\/[a-zA-Z0-9\-_]+)+\/?$/.test(directoryPath); }

function validateShellCommands(shellCommands) { return  /^.*$/.test(shellCommands); }

function validateDirectoryNumber(directoryNumber, directoryNumbers) { return directoryNumbers.includes(directoryNumber); }

function validateForcedDependentName(forcedDependentName) { return  /^.+$/.test(forcedDependentName); }

function validateForcedDependencyName(forcedDependencyName) { return  /^.+$/.test(forcedDependencyName); }

function validateIgnoredDependencyName(ignoredDependencyName) { return  /^.+$/.test(ignoredDependencyName); }

function validateIgnoredDependencyNumber(ignoredDependencyNumber, ignoredDependencyNumbers) { return ignoredDependencyNumbers.includes(ignoredDependencyNumber); }

function validateForcedDependencyRelationNumber(forcedDependencyRelationNumber, forcedDependencyRelationNumbers) { return forcedDependencyRelationNumbers.includes(forcedDependencyRelationNumber); }

module.exports = {
  validateAnswer,
  validateDirectoryPath,
  validateShellCommands,
  validateDirectoryNumber,
  validateForcedDependentName,
  validateForcedDependencyName,
  validateIgnoredDependencyName,
  validateIgnoredDependencyNumber,
  validateForcedDependencyRelationNumber
};
