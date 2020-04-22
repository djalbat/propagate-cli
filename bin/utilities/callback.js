"use strict";

const necessary = require("necessary");

const { asynchronousUtilities } = necessary,
      { forEach, whilst } = asynchronousUtilities;

function executeCallback(array, callback, proceed, context) {
  forEach(array, executeCallback, proceed);

  function executeCallback(element, next, done) {
    const proceed = next,
          abort = done;

    callback(element, proceed, abort, context);
  }
}

function executeCallbacks(callbacks, callback, context) {
  const callbacksLength = callbacks.length,
        lastIndex = callbacksLength - 1;

  let completed = true;

  whilst(executeCallback, () => callback(completed), context);

  function executeCallback(next, done, context, index) {
    if (index > lastIndex) {
      done();

      return;
    }

    const callback = callbacks[index],
          proceed = next; ///

    callback(proceed, () => {
      completed = false;

      done();
    }, context);
  }
}

module.exports = {
  executeCallback,
	executeCallbacks
};
