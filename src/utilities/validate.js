"use strict";

export function validateAnswer(answer) { return  /^(:?yes|no|y|n)$/i.test(answer); }

export function validateDirectoryPath(directoryPath) { return  /^\.\.?(?:\/[a-zA-Z0-9\-_]+)+\/?$/.test(directoryPath); }

export function validateShellCommands(shellCommands) { return  /^.*$/.test(shellCommands); }

export function validateDirectoryNumber(directoryNumber, directoryNumbers) { return directoryNumbers.includes(directoryNumber); }

export function validateForcedDependentName(forcedDependentName) { return  /^.+$/.test(forcedDependentName); }

export function validateForcedDependencyName(forcedDependencyName) { return  /^.+$/.test(forcedDependencyName); }

export function validateIgnoredDependencyName(ignoredDependencyName) { return  /^.+$/.test(ignoredDependencyName); }

export function validateIgnoredDependencyNumber(ignoredDependencyNumber, ignoredDependencyNumbers) { return ignoredDependencyNumbers.includes(ignoredDependencyNumber); }

export function validateForcedDependencyRelationNumber(forcedDependencyRelationNumber, forcedDependencyRelationNumbers) { return forcedDependencyRelationNumbers.includes(forcedDependencyRelationNumber); }
