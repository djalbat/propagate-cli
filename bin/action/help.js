'use strict';

function help() {
  console.log(`Usage: 
  
  propagate help|--help|-h       Show this help
  
  propagate --version|-v         Show the version

  propagate                      Propagate the current package

  propagate <sub-directories>    Propagate a package or packages in the given sub-directories

  propagate <command>

Commands:

  initialise                     Create a configuration file

  set-options                    Set options
  
  add-directory                  Add an additional directory
  
  remove-directory               Remove an additional directory
  
  list-directories               List additional directories
  
Options:

  --quietly|-q                   Run quietly
  
Further information:

Please see the readme file on GitHub:

  https://github.com/djalbat/propagate-cli
`);
}

module.exports = help;
