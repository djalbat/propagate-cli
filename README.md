# Propagate-CLI

Propagate updated packages throughout a project.

Managing dependencies in a project can be irksome if your project relies on more than a few frequently updated packages. Consider the following dependency graph. Here the solid lines represent dependencies, dotted lines dev-dependencies:

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
                                            |          .
                                            |          .
                                            |_____ .....
                                                 | .
                                                 | .
                                               freddie
---
 Here `alice` depends on `bernard` and `chuck`, `bernard` depends on `dylan` and `erica`, etc. 
 
 If we fix a bug in the `freddie` package and bump the patch number, we must update the package JSON files of both the `erica` and `chuck` packages in order to make sure that they both make use of the updated `freddie` package. However, that is not the end of the task. We must also bump their package numbers and update the package JSON files of any packages that depend on them and so on, ad nauseam. 
 
 Propagate automates this process, updating the `version`, `dependencies` and `devDependencies` fields of all packages and binaries in a project when a single package is updated, propagating the change right through the dependency tree. It will also optionally build, publish and push the updates to Git. 
 
 Here are the actual changes to the aforementioned packages and binaries that Propagate would apply, assuming that the `freddie` package is initially the one that is updated:
 
```
{
  "name": "freddie",
  "version": "^1.0.4" -> "^1.0.5"
} 

{
  "name": "erica",
  "version": "^2.1.3" -> "^2.1.4",
  "dependencies": {
    "freddie": "^1.0.4" -> "^1.0.5"
  }
} 

{
  "name": "check",
  "version": "^1.7.12" -> "^1.7.13",
  "devDependencies": {
    "freddie": "^1.0.4" -> "^1.0.5"
  }
} 

{
  "name": "bernard",
  "version": "^1.3.2" -> "^1.3.3",
  "dependencies": {
    "erica": "^2.1.3" -> "^2.1.4",
  }
} 

{
  "name": "alice",
  "dependencies": {
    "check": "^1.0.4" -> "^1.0.5"
  },
  "devDependencies": {
    "bernard": "^1.3.2" -> "^1.3.3",
  }
} 
```

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
