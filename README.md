# Propagate-CLI

Propagate updated packages throughout a project.

Managing dependencies in a project can be irksome if your project relies on more than a few frequently updated packages. Consider the following dependency graph:

---
                          Alf
                           |
                           |
                   ________|________
                   ^               ^
                   |               |
                Bernie             |
                   ^               |
                   |               |
              _____|_____        Chuck
              ^         ^          |
              |         |          |
            Dylan     Erica        |
                        |          |
                        |          |
                        |__________|
                              ^
                              |
                           Freddie
---
Here `Alf` depends on `Bernie` and `Chuck`, `Bernie` depends on `Dylan` and `Erica`, etc. If we fix a bug in the `Freddie` package and bump the patch number, we must update the package JSON files of both the `Erica` and `Chuck` packages to be sure that they make use of the updated `Freddie` package whenever they are installed. However, that is not the end of the task. We must also bump their package numbers and update the package JSON file of any packages that depend on them, and so on, ad nauseam. Propagate automates this process, updating the `version`, `dependencies` and `devDependencies` fields of all packages and binaries in a project as required. It will also optionally build, publish and push changes to Git.

Currently it only supports core [semver](https://semver.org/) versions, that is, versions of the form `major.minor.patch` where `major`, `minor` and `patch` are natural numbers. It does not support version ranges or multiple sets. Additionally, it will leave intact but otherwise ignore leading modifiers such as `^`, `~`, etc. If you are not using either these modifiers or no modifiers at all, this tool is unlikely to work for you.

## Installation

With [npm](https://www.npmjs.com/):

    npm install --global propagate-cli

You may need to prepend [`sudo`](https://en.wikipedia.org/wiki/Sudo), depending on your setup.

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/propagate-cli.git

...then install the necessary modules with npm from within the project's root directory:

    npm install

You will need to do this if you want to look at the examples.

## Contact

- james.smith@djalbat.com
- http://djalbat.com
