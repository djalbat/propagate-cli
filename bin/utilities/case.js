"use strict";

function toCamelCase(string) {
  return string.replace(/-(.)/g, (match, character) => character.toUpperCase());
}

module.exports = {
  toCamelCase
};
