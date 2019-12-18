'use strict';

function help() {
  console.log(`Usage: 
  
  propagate help|--help|-h     Show this help
  
  propagate --version|-v       Show the version

  propagate                    Propagate the current package

  propagate <package_names>    Propagate a package or packages

  propagate <command>

Commands:

  initialise                   Create a configuration file

  options                      Set options
  
Options:

  --quietly|-q                 Run quietly
`);
}

module.exports = help;
