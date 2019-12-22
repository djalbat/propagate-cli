'use strict';

const messages = require('../messages');

const { NO_SUB_DIRECTORY_SPECIFIED_MESSAGE } = messages;

function checkArgumentCallback(proceed, abort, context) {
  const { argument } = context;

  if (argument === null) {
    console.log(NO_SUB_DIRECTORY_SPECIFIED_MESSAGE);

    abort();
  }

  proceed();
}

module.exports = checkArgumentCallback;
