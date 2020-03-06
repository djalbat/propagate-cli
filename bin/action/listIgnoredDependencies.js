'use strict';

const configuration = require('../configuration');

const { retrieveIgnoredDependencies } = configuration;

function listIgnoredDependencies() {
  const ignoredDependencyNumbers = [],
        ignoredDependencies = retrieveIgnoredDependencies(),
        ignoredDependencyNames = [
          ...ignoredDependencies
        ];

  console.log('');

  ignoredDependencyNames.forEach((ignoredDependencyName, index) => {
    const ignoredDependencyNumber = index + 1;  ///

    console.log(` ${ignoredDependencyNumber}: '${ignoredDependencyName}'`);

    ignoredDependencyNumbers.push(ignoredDependencyNumber);
  });

  console.log('');

  return ignoredDependencyNumbers;
}

module.exports = listIgnoredDependencies;
