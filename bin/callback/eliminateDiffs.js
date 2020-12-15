"use strict";

function eliminateDiffsCallback(proceed, abort, context) {
  const { diffs } = context;


  proceed();
}

module.exports = eliminateDiffsCallback;
