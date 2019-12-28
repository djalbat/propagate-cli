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
 
 The `propagate` tool automates the process, allowing you to update the `version`, `dependencies` and `devDependencies` fields of all the requisite package JSON files in a project whenever a package is updated, effectively propagating the original update through the dependency graph. It will also optionally build, publish and then add, commit and push the updates with Git. 
 
 Here are the actual updates that `propagate` would make:
 
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

1. If `propagate` cannot find both `name` and `version` fields in a package JSON file, it considers the contents of the subdirectory to be a binary, not a package. Nothing is expected to depend on binaries since, without a name, there is no way to reference them. The `alice` binary does not have a version number or a name associated with it, for example.

2. Packages and binaries that are left unchanged after a package is propagated are left untouched. For example, the `dylan` package would be left unaffected because it does not depend on the `freddie` package, directly or otherwise.

3. Only core [semver](https://semver.org/) versions are supported, that is, versions of the form `major.minor.patch` where `major`, `minor` and `patch` are natural numbers. As yet `propagate` does not support version ranges or multiple sets. Additionally, it will leave intact but otherwise ignore leading modifiers such as `^`, `~`, etc. If you are not using either just these modifiers or no modifiers at all, `propagate` is unlikely to work for you.

4. If `propagate` finds a circular dependency amongst the dependencies, it will tell you and exit whether any of the packages or binaries in question would be affected by a propagation or not.

One other thing to bear in mind is the way `propagate` decides whether or not a package or binary needs to be built. The following only really matters when suppressing prompts with the `force` option, otherwise whether or not `propagate` decides if a package or binary can be built only affects the initial value of the corresponding prompt. So... 

If it is the case that only a package's or binary's dependencies have changed, `propagate` will decided that it does not need to be built. If, on the other hand, the developer dependencies have changed, `propagate` will decide that it does. The reasoning behind this is that the dependencies that are used in order to create a bundle need only to be included as developer dependencies. Typically a package does not supply bundled code, only transpiled code, and transpilation only acts on a package's own source code, not the source code of its dependencies. Binaries, if they are required to be built when their dependencies change, should therefore include those as developer dependencies. Packages, on the other hand, should only include dependencies as developer dependencies if the package needs to be built. This typically happens when the package provides an example or examples that run in a browser. 

It is recommended that you initially set the Git, build and publish shell commands that `propagate` executes to be benign commands such as `echo`. This gives you a chance to see the updates before saving and apply them. And you should always use the `force` and `quietly` options will caution. This tool gives surety and confidence if used carefully. Used carelessly, on the other hand, it is a blunt instrument!                           

## Installation

If you are an end user, you can install `propagate` via [npm](https://www.npmjs.com/):
 
    npm install --global propagate-cli

You may need to prepend [`sudo`](https://en.wikipedia.org/wiki/Sudo), depending on your setup.

If you would like to contribute or would simply like to have a look at the code, you can clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/propagate-cli.git

...then install the necessary modules with npm from within the project's root directory:

    npm install
    
## Usage

In the directory that contains the sub-directories holding your project's packages and binaries, run the following command:

    propagate initialise
    
This will create a hidden `.propagaterc` file. Run the following command to get an idea of the commands and options:

    propagate help

Remember to set the shell commands to empty spaces, echo commands such like, at least to start with:

    propagate set-shell-commands
    
To propagate the `freddie` package, say:


    propagate freddie
    
You can also execute a lone `propagate` command from within a package's subdirectory.

## Contact

- james.smith@djalbat.com
- http://djalbat.com
