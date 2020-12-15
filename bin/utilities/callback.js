"use strict";

const necessary = require("necessary");

const { asynchronousUtilities } = necessary,
      { forEach, whilst } = asynchronousUtilities;

function executeCallback(array, callback, proceed, abort, context) {
  let completed = true;

  forEach(array, (element, next, done, context) => {
    const proceed = next, ///
          abort = () => {
            completed = false;

            done();
          }

    callback(element, proceed, abort, context);
  }, done, context);

  function done() {
    completed ?
      proceed() :
        abort();
  }
}

function executeCallbacks(callbacks, callback, context) {
  let completed = true;

  const callbacksLength = callbacks.length,
        lastIndex = callbacksLength - 1;

  whilst((next, done, context, index) => {
    if (index > lastIndex) {
      done();

      return;
    }

    const callback = callbacks[index],
          proceed = next, ///
          abort = () => {
            completed = false;

            done();
          };

    callback(proceed, abort, context);
  }, done, context);

  function done() {
    callback(completed);
  }
}

module.exports = {
  executeCallback,
	executeCallbacks
};
