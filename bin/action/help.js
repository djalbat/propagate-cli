"use strict";

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
  
  list-directories             List directories, including the default directory
  
  set-shell-commands           Set the Git, build and publish shell commands
  
  add-ignored-dependency       Add an ignored dependency
  
  remove-ignored-dependency    Remove an ignored dependency
  
  list-ignored-dependencies    List the ignored dependencies
  
Options:

  --version|-v                 Show the version

  --dry-run|-d                 Show updates but do not apply them

  --quietly|-q                 Execute shell commands without printing to the console
  
  --yes|-y                     Initially answer yes to prompts

  --help|-h                    Show this help

Further information:

Please see the readme file on GitHub:

  https://github.com/djalbat/propagate-cli
`);
}

module.exports = help;
