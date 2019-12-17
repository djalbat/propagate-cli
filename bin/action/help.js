'use strict';

function help() {
  console.log(`Usage: 
  
  propagate help|--help|-h     Show this help
  
  propagate --version|-v       Show the version

  propagate                    Propagate the current package

  propagate <package_names>    Propagate a package or packages

  propagate <command>

Commmands:

  initialise                   Create a configuration file

  options                      Set options 
`);
}

module.exports = help;
