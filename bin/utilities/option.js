"use strict";

const { toCamelCase } = require("../utilities/case");

function isOptionPresent(option, options) {
  option = toCamelCase(option); ///

  const optionPresent = options.hasOwnProperty(option);

  return optionPresent;
}

module.exports = {
  isOptionPresent
};
