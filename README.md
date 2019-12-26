# Propagate-CLI

Propagate upgraded packages throughout a project.

Upgrading a

This tool is under development. Please come back in a bit.

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
