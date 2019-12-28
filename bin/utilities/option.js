'use strict';

const argumentative = require('argumentative');

const { stringUtilities } = argumentative,
      { toCamelCase } = stringUtilities;

function isOptionPresent(option, options) {
  option = toCamelCase(option); ///

  const optionPresent = options.hasOwnProperty(option);

  return optionPresent;
}

module.exports = {
  isOptionPresent
};
