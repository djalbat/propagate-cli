'use strict';

function help() {
  console.log(`Usage: 
  
  propagate [help]             Show this help
  
  propagate --version|-v       Show the version

  propagate                    Propagate the current package

  propagate <sub-directory>    Propagate a package in the given sub-directory

  propagate <command>

Commands:

  initialise                   Create a configuration file

  add-directory                Add an additional directory
  
  remove-directory             Remove an additional directory
  
  list-directories             List additional directories
  
  set-shell-commands           Set the Git, build and publish shell commands
  
Options:

  --dry-run|-d                 Show updates but do not apply them

  --quietly|-q                 Execute shell commands without printing to the console
  
  --force|-f                   Suppress prompts

  --help|-h                    Show this help

Further information:

Please see the readme file on GitHub:

  https://github.com/djalbat/propagate-cli
`);
}

module.exports = help;
