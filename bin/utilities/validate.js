'use strict';

function validateAnswer(answer) { return  /^(:?yes|no|y|n)$/i.test(answer); }

function validateDirectoryPath(directoryPath) { return  /^\.\.?(?:\/[a-zA-Z0-9\-_]+)+\/?$/.test(directoryPath); }

function validateDirectoryNumber(directoryNumber, directoryNumbers) { return directoryNumbers.includes(directoryNumber); }

module.exports = {
  validateAnswer,
  validateDirectoryPath,
  validateDirectoryNumber
};
