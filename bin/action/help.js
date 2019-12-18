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

  --quietly|-q                 Propogate quietly
  
Lastly:

  You can propagate more than one package by supplying a 
  comma separated list of package names, in which case 
  there must be no spaces between the names and commas.
  
  You can propagate a package quickly by running the 
  'propagate' command directly from inside the package's 
  directory, provided there is a configuration file in 
  the directory directly above.
`);
}

module.exports = help;
