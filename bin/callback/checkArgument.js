'use strict';

const messages = require('../messages');

const { NO_SUB_DIRECTORY_SPECIFIED_MESSAGE } = messages;

function checkArgumentCallback(proceed, abort, context) {
  const { argument } = context;

  if (argument === null) {
    console.log(NO_SUB_DIRECTORY_SPECIFIED_MESSAGE);

    abort();
  }

  const subDirectoryName = argument,  ////
        subDirectoryRPath = `./${subDirectoryName}`;

  Object.assign(context, {
    subDirectoryRPath
  });

  proceed();
}

module.exports = checkArgumentCallback;
