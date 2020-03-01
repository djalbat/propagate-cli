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
 
 Propagate automates the process, allowing you to update the `version`, `dependencies` and `devDependencies` fields of all the requisite package JSON files in a project whenever a package is updated, effectively propagating the original update through the dependency graph. It will also optionally build; add, commit and push with Git; and publish by way of sequences of configurable shell commands. 
 
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
  "dependencies": {
    "check": "^1.0.4" -> "^1.0.5"
  },
  "devDependencies": {
    "bernard": "^1.3.2" -> "^1.3.3",
  }
```
The following points are worth noting:

1. If Propagate cannot find both `name` and `version` fields in a package JSON file, it considers the contents of the subdirectory to be a binary, not a package. Nothing is expected to depend on binaries since, without a name, there is no way to reference them. The `alice` binary does not have a version number or a name associated with it, for example.

2. Packages and binaries that are left unchanged after a package is propagated are unaffected. For example, the `dylan` package would be unaffected because it does not depend on the `freddie` package, directly or otherwise.

3. Only core [semver](https://semver.org/) versions are supported, that is, versions of the form `major.minor.patch` where `major`, `minor` and `patch` are natural numbers. As yet Propagate does not support version ranges or multiple sets. Additionally, it will leave intact but otherwise ignore modifiers such as `^` and `~`. If you are not using either just these modifiers or no modifiers at all, Propagate is unlikely to work for you.

4. If Propagate finds a cyclic dependency, it will tell you and exit whether any of the packages or binaries in the cycle would be affected by the propagation or not.

## Installation

You can install Propagate via [npm](https://www.npmjs.com/):
 
    npm install --global propagate-cli

You may need to prepend [`sudo`](https://en.wikipedia.org/wiki/Sudo), depending on your setup.

If you would like to contribute or would simply like to have a look at the code, you can clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/propagate-cli.git

...then install the necessary modules with npm from within the project's root directory:

    npm install
    
## Usage

In the directory that contains the sub-directories holding your project's packages and binaries, run the following command:

    propagate initialise
    
To propagate the `freddie` package, for example, run the following command:

    propagate freddie
    
You can also execute a lone `propagate` command from within a package's subdirectory.

Provided there are no cyclic dependencies, the updates to the packages and binaries affected by the propagation will be presented in topological order, meaning that a dependency will always appear before any of its dependents. Unless you use the `force` option, you will always be prompted before any changes are made to package JSON files or any shell commands are executed. 

Bear in mind that in choosing not to save or publish a package, you are also choosing not to propagate it. In which case its dependents will be adjusted accordingly and consequently may not need propagating themselves. For example, if, while propagating the `bernard` package, you chose not to propagate the `erica` package by not saving or publishing it in turn, the `bernard` package would not be propagated either because the `erica` package is its only propagated dependency. That would result in the unpropagated `bernard` package still being a dependency of the topmomst `alice` binary, albeit an indirect one, eessentially defeating the purpose of propagation in the first place. As a rule of thumb, therefore, you should only chose not to propagate a package if the dependency paths are not confluent.

It is recommended that you initially use the `dry-run` option, which will list the updates without making any changes. And you should always use the `force` and `quietly` options with caution.


## Contact

- james.smith@djalbat.com
- http://djalbat.com
