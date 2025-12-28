"use strict";

export default function helpAction() {
  console.log(`Usage: 
  
  propagate [<options>] [<command>] [<argument>]

Commands:

  help                                     Show this help
 
  version                                  Show the version

  initialise                               Create a configuration file

  add-directory                            Add an additional directory
  
  remove-directory                         Remove an additional directory
  
  list-directories                         List directories, including the default directory
  
  set-shell-commands                       Set the Git, poll, build, install and publish shell commands
  
  add-ignored-dependency                   Add an ignored dependency
  
  list-ignored-dependencies                List the ignored dependencies
  
  remove-ignored-dependency                Remove an ignored dependency
  
  add-forced-dependency-relation           Add a forced dependency relation
  
  list-forced-dependency-relations         List the forced dependency relations
  
  remove-forced-dependency-relation        Remove a forced dependency relation
  
Options:

  --help|-h                                Show this help

  --version|-v                             Show the version

  --dry-run|-d                             Show updates but do not apply them

  --quietly|-q                             Execute shell commands without printing to the console
  
  --yes|-y                                 Initially answer yes to prompts

Further information:

Please see the readme file on GitHub:

  https://github.com/djalbat/propagate-cli
`);
}
