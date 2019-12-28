'use strict';

const messages = require('../messages'),
      constants = require('../constants');

const { DEFAULT_DIRECTORY_NAME } = constants,
      { NO_SUB_DIRECTORY_SPECIFIED_MESSAGE } = messages;

function createSubDirectoryPathCallback(proceed, abort, context) {
  const { argument } = context;

  if (argument === null) {
    console.log(NO_SUB_DIRECTORY_SPECIFIED_MESSAGE);

    abort();

    return;
  }

  const subDirectoryName = argument,  ////
        directoryName = DEFAULT_DIRECTORY_NAME, ///
        subDirectoryRPath = `${directoryName}/${subDirectoryName}`;

  Object.assign(context, {
    subDirectoryRPath
  });

  proceed();
}

module.exports = createSubDirectoryPathCallback;
