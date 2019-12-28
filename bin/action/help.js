'use strict';

function help() {
  console.log(`Usage: 
  
  propagate help|--help|-h     Show this help
  
  propagate --version|-v       Show the version

  propagate                    Propagate the current package

  propagate <sub-directory>    Propagate a package in the given sub-directory

  propagate <command>

Commands:

  initialise                   Create a configuration file

  add-directory                Add an additional directory
  
  remove-directory             Remove an additional directory
  
  list-directories             List additional directories
  
  set-shell-commands           Set the build, Git and publish shell commands
  
Options:

  --quietly|-q                 Execute the shell commands wihtout printing to the console
  
  --forced|-f                  Suppress the prompts

Further information:

Please see the readme file on GitHub:

  https://github.com/djalbat/propagate-cli
`);
}

module.exports = help;
