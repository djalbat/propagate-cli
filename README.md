# Propagate-CLI

Propagate updated packages throughout a project.

Managing dependencies can be irksome if your project relies on more than a few frequently updated packages. Consider the following dependency graph. Here the solid lines represent dependencies, the dotted lines dev-dependencies:

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
 If we fix a bug in the `freddie` package and bump its patch number, we must update the package JSON files of both the `erica` and `chuck` packages in order to make sure that they both make use of the updated `freddie` package. However, that is not the end of the task. We must also bump their package numbers and update the package JSON files of packages or binaries that depend on them and so on, ad nauseam. 
 
 This tool automates the process, updating the `version`, `dependencies` and `devDependencies` fields of all the requisite package JSON files in a project whenever a single package is updated, effectively propagating the original update through the dependency graph. It will also optionally build, publish and push the updates with Git. 
 
 Here are the actual changes to the aforementioned packages and binaries that `propagate` would make, assuming that the `freddie` package is initially the one that is updated:
 
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
  "dependencies": {
    "check": "^1.0.4" -> "^1.0.5"
  },
  "devDependencies": {
    "bernard": "^1.3.2" -> "^1.3.3",
  }
```
The following points are worth noting:

1. There are no updates to `dylan` because it does not depend on the `freddie` package, directly or otherwise.

2. The `alice` update does not have a version number or a name associated with it. If `propagate` cannot find both `name` and `version` fields in a package JSON file, it considers the contents of the subdirectory to be a binary, not a package, and will not publish them. Nothing is expected to depend on binaries since, without a name, there is no way to reference them. 

3. Only core [semver](https://semver.org/) versions are supported, that is, versions of the form `major.minor.patch` where `major`, `minor` and `patch` are natural numbers. It does not support version ranges or multiple sets. Additionally, it will leave intact but otherwise ignore leading modifiers such as `^`, `~`, etc. If you are not using either just these modifiers or no modifiers at all, `propagate` is unlikely to work for you.

One other thing to bear in mind is the way `propagate` decides whether or not to build a package or binary. If it is the case that only a package's or binary's dependencies have changed, `propagate` will not build it. If, on the other hand, the dev-dependencies have changed, `propagate` will build it. The reasoning behind this is that the dependencies that are used in order to create a bundle need only to be included as dev-dependencies. Typically a package does not supply bundled code, only transpiled code, and transpilation only acts on a package's own source code, not the source code of its dependencies. Binaries, if they are required to be built when their dependencies change, should therefore include those dependencies as dev-dependencies. Packages, on the other hand, should only include dependencies as dev-dependencies if they need to be bundled. This typically happens when the package provides an example or examples that run in a browser. 

Packages that don't require to be built will be published first first, then `propagate` will attempt to build and publish one at a time those binaries and packages that require building. In order for a package or binary to be built, all its dependencies that require building must already have been built. If this cannot be accomplished because of a circular dependency, `propagate` will fail gracefully.

It is recommended that initially you set the Git, build and publish shell commands that `propagate` executes to be benign. This gives you a chance to see the updates before committing, so to speak. You will also be given a chance to abort the process before any updates are applied to packakge JSON files. 

## Installation

If you are an end user, you can install `propagate` via [npm](https://www.npmjs.com/):
 
    npm install --global propagate-cli

You may need to prepend [`sudo`](https://en.wikipedia.org/wiki/Sudo), depending on your setup.

If you would like to contribute or would simply like to have a look at the code, you can clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/propagate-cli.git

...then install the necessary modules with npm from within the project's root directory:

    npm install
    
# Usage

In the directory that contains the sub-directories holding your project's packages and binaries, run the following command:

    propagate initialise
    
This will create a hidden `.propagaterc` file. Run the following command to get an idea of the commands and options available:

    propagate help

Remember to set the shell commands to empty spaces, echo commands or some other benign commands, at least to start with:

    propagate set-shell-commands
    
To propagate the `freddie` package, say:


    propagate freddie
    
You can also execute a single `propagate` command from within a package's subdirectory.

## Contact

- james.smith@djalbat.com
- http://djalbat.com
