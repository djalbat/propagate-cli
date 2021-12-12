"use strict";

const { asynchronousUtilities } = require("necessary");

const { forEach, whilst } = asynchronousUtilities;

function executeOperation(array, operation, proceed, abort, context) {
  let completed = true;

  forEach(array, (element, next, done, context) => {
    const proceed = next, ///
          abort = () => {
            completed = false;

            done();
          }

    operation(element, proceed, abort, context);
  }, done, context);

  function done() {
    completed ?
      proceed() :
        abort();
  }
}

function executeOperations(operations, callback, context) {
  let completed = true;

  const operationsLength = operations.length,
        lastIndex = operationsLength - 1;

  whilst((next, done, context, index) => {
    if (index > lastIndex) {
      done();

      return;
    }

    const operation = operations[index],
          proceed = next, ///
          abort = () => {
            completed = false;

            done();
          };

    operation(proceed, abort, context);
  }, done, context);

  function done() {
    callback(completed);
  }
}

module.exports = {
  executeOperation,
	executeOperations
};
