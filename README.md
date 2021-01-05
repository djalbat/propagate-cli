# Propagate-CLI

Propagate updated packages throughout a project.

Managing dependencies can be irksome if your project relies on more than a few frequently updated packages. Consider the following dependency graph. Here the solid lines represent dependencies, the dotted lines developer dependencies:

---
                                             alice
                                              ^ ^
                                              . |
                                       ........ |_______
                                       .               |
                                       .               |
                                    bernard            |
                                       ^               |
                                       |               |
                                  _____|_____        chuck
                                  |         |          ^
                                  |         |          .
                                dylan     erica        .
                                            ^          .
                                            |          .
                                            |_____ .....
                                                 | .
                                                 | .
                                               freddie
---
 If we fix a bug in the `freddie` package and bump its patch number, we must update the package JSON files of both the `erica` and `chuck` packages in order to make sure that they both make use of the updated `freddie` package. However, that is not the end of the task. We must also bump their package numbers and update the package JSON files of packages or binaries that depend on them, too. And so on, ad nauseam. 
 
 Propagate automates the process, allowing you to update the `version`, `dependencies` and `devDependencies` fields of all the requisite package JSON files in a project whenever a package is updated, effectively propagating the original update through the dependency graph. It will also optionally save; build; add, commit and push with Git; and publish by way of configurable shell commands.
 
 Here are the actual updates that Propagate would make:
 
```
'./freddie' ("freddie"):
  "version": "^1.0.4" -> "^1.0.5"

'./erica' ("erica"):
  "version": "^2.1.3" -> "^2.1.4",
  "dependencies": {
    "freddie": "^1.0.4" -> "^1.0.5"
  }

'./chuck' ("chuck"):
  "version": "^1.7.12" -> "^1.7.13",
  "devDependencies": {
    "freddie": "^1.0.4" -> "^1.0.5"
  }

'./bernard' ("bernard"):
  "version": "^1.3.2" -> "^1.3.3",
  "dependencies": {
    "erica": "^2.1.3" -> "^2.1.4",
  }

'./alice':
  "dependencies": {},
  "devDependencies": {
    "bernard": "^1.3.2" -> "^1.3.3",
  }
```
Note that only core [semver](https://semver.org/) versions are supported, that is, versions of the form `major.minor.patch` where `major`, `minor` and `patch` are natural numbers. As yet Propagate does not support version ranges or multiple sets. Additionally, it will leave intact but otherwise ignore modifiers such as `^` and `~`. If you are not using either just these modifiers or no modifiers at all, Propagate is unlikely to work for you.

## Installation

You can install Propagate via [npm](https://www.npmjs.com/):
 
    npm install --global propagate-cli

You may need to prepend [`sudo`](https://en.wikipedia.org/wiki/Sudo), depending on your setup.

If you would like to contribute or would simply like to have a look at the code, you can clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/propagate-cli.git

...then install the dependencies with npm from within the project's root directory:

    npm install
    
## Usage

Propagate has the following commands and options:

```
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
```

In the directory that contains the sub-directories holding your project's packages and binaries, run the following command:

    propagate initialise
    
To propagate the `freddie` package, for example, run the following command:

    propagate freddie
    
You can also execute a lone `propagate` command from within a package's subdirectory and it will propagate that package.

Here are some things to bear in mind:

1. It is recommended that you initially use the `dry-run` option, which will list the updates without making any changes. Also, you should always use the `yes` and `quietly` options with caution.

2. Propagate creates separate directed graphs for the dependencies and the developer dependencies. If there are cycles present in either graph, it will terminate and report one of the cycles. If there are cycles present in the combined graph, however, these are tolerated because they are justifiable in practice.

3. Updates are applied in a topological order of the dependencies with the initially propagated package updated first. What this means in practice is that dependencies are guaranteed to be updated before their dependents. Therefore, if you chose not to update a particular dependency or chose to terminate the update process altogether, usually no problems will result. However, bear in mind the following point.

4. It is possible, because of the aforementioned tolerance of cycles in the combined graph, that cases may arise where updates are applied that reference developer dependencies that have themselves yet to be updated. If the update process is allowed to continue right to the end then this presents no problems. However, if you choose not to apply a certain update or chose to terminate the updates entirely then this problem could arise. In these situations, Propagate will warn you of the specific problem. For this reason, if you chose to terminate the update process early, do so by answering 'no' at a prompt three times rather than a hard exit with `ctrl-c` or the like. This will give propagate the chance to warn you of any problems.

## Contact

- james.smith@djalbat.com
- http://djalbat.com
