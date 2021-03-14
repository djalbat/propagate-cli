"use strict";

const { stringUtilities } = require("argumentative");

const { toCamelCase } = stringUtilities;

function isOptionPresent(option, options) {
  option = toCamelCase(option); ///

  const optionPresent = options.hasOwnProperty(option);

  return optionPresent;
}

module.exports = {
  isOptionPresent
};
