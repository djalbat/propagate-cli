'use strict';

const versions = require('../versions');

const { VERSION_0_0 } = versions;

function createConfiguration() {
  const version = VERSION_0_0,  ///
        options = {},
        configuration = {
          version,
          options
        } ;

  return configuration;
}

module.exports = {
  createConfiguration
};
