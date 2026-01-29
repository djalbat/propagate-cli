"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Release;
    }
});
var _necessary = require("necessary");
var _version = /*#__PURE__*/ _interop_require_default(require("./version"));
var _packageJSON = require("./utilities/packageJSON");
var _terminal = require("./utilities/terminal");
var _shell = require("./utilities/shell");
var _configuration = require("./configuration");
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var prune = _necessary.arrayUtilities.prune, eventually = _necessary.asynchronousUtilities.eventually, parseContent = _necessary.templateUtilities.parseContent;
var Release = /*#__PURE__*/ function() {
    function Release(name, version, dependencyMap, devDependencyMap, subDirectoryPath) {
        _class_call_check(this, Release);
        this.name = name;
        this.version = version;
        this.dependencyMap = dependencyMap;
        this.devDependencyMap = devDependencyMap;
        this.subDirectoryPath = subDirectoryPath;
    }
    _create_class(Release, [
        {
            key: "getName",
            value: function getName() {
                return this.name;
            }
        },
        {
            key: "getVersion",
            value: function getVersion() {
                return this.version;
            }
        },
        {
            key: "getDependencyMap",
            value: function getDependencyMap() {
                return this.dependencyMap;
            }
        },
        {
            key: "getDevDependencyMap",
            value: function getDevDependencyMap() {
                return this.devDependencyMap;
            }
        },
        {
            key: "getSubDirectoryPath",
            value: function getSubDirectoryPath() {
                return this.subDirectoryPath;
            }
        },
        {
            key: "isPublishable",
            value: function isPublishable() {
                var publishable = this.name !== null && this.version !== null;
                return publishable;
            }
        },
        {
            key: "getVersionString",
            value: function getVersionString() {
                var versionString = this.version.asString();
                return versionString; ///
            }
        },
        {
            key: "getDependencyNames",
            value: function getDependencyNames() {
                var dependencyNames = Object.keys(this.dependencyMap);
                return dependencyNames;
            }
        },
        {
            key: "getDevDependencyNames",
            value: function getDevDependencyNames() {
                var devDependencyNames = Object.keys(this.devDependencyMap);
                return devDependencyNames;
            }
        },
        {
            key: "git",
            value: function git(quietly, callback) {
                var shellCommands = (0, _configuration.retrieveShellCommands)();
                var git = shellCommands.git, gitShellCommands = git;
                shellCommands = gitShellCommands; ///
                this.executeShellCommands(shellCommands, quietly, callback);
            }
        },
        {
            key: "poll",
            value: function poll(specifiers, quietly, callback) {
                var specifiersLength = specifiers.length;
                if (specifiersLength === 0) {
                    var success = true;
                    callback(success);
                    return;
                }
                specifiersLength === 1 ? console.log("Polling for the dependency:") : console.log("Polling for the dependenies:");
                (0, _terminal.hideCursor)();
                specifiers.forEach(function(specifier) {
                    console.log(" - ".concat(specifier));
                });
                var length = specifiersLength, operations = specifiers.map(function(specifier, index) {
                    return function(next, done, context) {
                        var shellCommands = shellCommandsFromSpecifier(specifier);
                        (0, _shell.executeRepeatedly)(shellCommands, specifier, index, length, quietly, function(success) {
                            if (success) {
                                var polledSpecifier = specifier; ///
                                prune(specifiers, function(specifier) {
                                    if (specifier !== polledSpecifier) {
                                        return true;
                                    }
                                });
                            }
                            next();
                        });
                    };
                });
                eventually(operations, function() {
                    var specifiersLength = specifiers.length, success = specifiersLength === 0;
                    (0, _terminal.showCursor)();
                    callback(success);
                });
            }
        },
        {
            key: "install",
            value: function install(quietly, callback) {
                var shellCommands = (0, _configuration.retrieveShellCommands)();
                var install = shellCommands.install, installShellCommands = install;
                shellCommands = installShellCommands; ///
                this.executeShellCommands(shellCommands, quietly, callback);
            }
        },
        {
            key: "build",
            value: function build(quietly, callback) {
                var ignoredBuilds = (0, _configuration.retrieveIgnoredBuilds)(), subDirectoryPaths = ignoredBuilds, subDirectoryPathsIncludesSubDirectoryPath = subDirectoryPaths.includes(this.subDirectoryPath), buildIgnored = subDirectoryPathsIncludesSubDirectoryPath; ///
                if (buildIgnored) {
                    console.log("Ignoring the '".concat(this.subDirectoryPath, "' build."));
                    var success = true;
                    callback(success);
                    return;
                }
                var shellCommands = (0, _configuration.retrieveShellCommands)();
                var build = shellCommands.build, buildShellCommands = build;
                shellCommands = buildShellCommands; ///
                this.executeShellCommands(shellCommands, quietly, callback);
            }
        },
        {
            key: "publish",
            value: function publish(quietly, callback) {
                var ignoredPublishes = (0, _configuration.retrieveIgnoredPublishes)(), names = ignoredPublishes, namesIncludesName = names.includes(this.name), publishIgnored = namesIncludesName; ///
                if (publishIgnored) {
                    console.log("Ignoring the '".concat(this.name, "' publish."));
                    var success = true;
                    callback(success);
                    return;
                }
                var shellCommands = (0, _configuration.retrieveShellCommands)();
                var publish = shellCommands.publish, publishShellCommands = publish;
                shellCommands = publishShellCommands; ///
                this.executeShellCommands(shellCommands, quietly, callback);
            }
        },
        {
            key: "bumpPatchNumber",
            value: function bumpPatchNumber() {
                this.version.bumpPatchNumber();
            }
        },
        {
            key: "executeShellCommands",
            value: function executeShellCommands(shellCommands, quietly, callback) {
                var currentWorkingDirectoryPath = process.cwd();
                process.chdir(this.subDirectoryPath);
                (0, _shell.executePromptly)(shellCommands, quietly, function(success) {
                    process.chdir(currentWorkingDirectoryPath);
                    callback(success);
                });
            }
        },
        {
            key: "updateDependencyVersion",
            value: function updateDependencyVersion(name, versionString) {
                var success = updateSemver(name, versionString, this.dependencyMap);
                if (!success) {
                    console.log("Either the version of the '".concat(this.subDirectoryPath, "' release's '").concat(name, "' dependency is greater than or equal to the propagated '").concat(versionString, "' version or it cannot be parsed."));
                }
                return success;
            }
        },
        {
            key: "updateDevDependencyVersion",
            value: function updateDevDependencyVersion(name, versionString) {
                var success = updateSemver(name, versionString, this.devDependencyMap);
                if (!success) {
                    console.log("Either the version of the '".concat(this.subDirectoryPath, "' release's '").concat(name, "' developer dependency is greater than or equal to the propagated '").concat(versionString, "' version or it cannot be parsed."));
                }
                return success;
            }
        }
    ], [
        {
            key: "fromSubDirectoryPath",
            value: function fromSubDirectoryPath(subDirectoryPath) {
                var release = null;
                var packageJSON = (0, _packageJSON.readPackageJSONFile)(subDirectoryPath);
                if (packageJSON !== null) {
                    var _packageJSON_version = packageJSON.version, version = _packageJSON_version === void 0 ? null : _packageJSON_version;
                    var _packageJSON_name = packageJSON.name, name = _packageJSON_name === void 0 ? null : _packageJSON_name, _packageJSON_dependencies = packageJSON.dependencies, dependencies = _packageJSON_dependencies === void 0 ? {} : _packageJSON_dependencies, _packageJSON_devDependencies = packageJSON.devDependencies, devDependencies = _packageJSON_devDependencies === void 0 ? {} : _packageJSON_devDependencies, versionString = version; ///
                    version = _version.default.fromVersionString(versionString);
                    var dependencyMap = dependencies, devDependencyMap = devDependencies; ///
                    release = new Release(name, version, dependencyMap, devDependencyMap, subDirectoryPath);
                }
                return release;
            }
        }
    ]);
    return Release;
}();
function updateSemver(name, versionString, map) {
    var success = false;
    var semver = map[name] || null;
    var version = _version.default.fromVersionString(versionString), existingSemver = semver, existingVersion = _version.default.fromString(existingSemver);
    if (existingVersion !== null) {
        var versionGreaterThanExistingVersion = version.isGreaterThan(existingVersion);
        success = versionGreaterThanExistingVersion; ///
        if (success) {
            semver = version.updateSemver(semver);
            map[name] = semver;
        }
    }
    return success;
}
function shellCommandsFromSpecifier(specifier) {
    var shellCommands = (0, _configuration.retrieveShellCommands)();
    var poll = shellCommands.poll, pollShellCommands = poll, args = {
        specifier: specifier
    };
    shellCommands = parseContent(pollShellCommands, args);
    return shellCommands;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWxlYXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcywgdGVtcGxhdGVVdGlsaXRpZXMsIGFzeW5jaHJvbm91c1V0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIlxuXG5pbXBvcnQgVmVyc2lvbiBmcm9tIFwiLi92ZXJzaW9uXCI7XG5cbmltcG9ydCB7IHJlYWRQYWNrYWdlSlNPTkZpbGUgfSBmcm9tIFwiLi91dGlsaXRpZXMvcGFja2FnZUpTT05cIjtcbmltcG9ydCB7IHNob3dDdXJzb3IsIGhpZGVDdXJzb3IgfSBmcm9tIFwiLi91dGlsaXRpZXMvdGVybWluYWxcIjtcbmltcG9ydCB7IGV4ZWN1dGVQcm9tcHRseSwgZXhlY3V0ZVJlcGVhdGVkbHkgfSBmcm9tIFwiLi91dGlsaXRpZXMvc2hlbGxcIjtcbmltcG9ydCB7IHJldHJpZXZlU2hlbGxDb21tYW5kcywgcmV0cmlldmVJZ25vcmVkQnVpbGRzLCByZXRyaWV2ZUlnbm9yZWRQdWJsaXNoZXMgfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uXCI7XG5cbmNvbnN0IHsgcHJ1bmUgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBldmVudHVhbGx5IH0gPSBhc3luY2hyb25vdXNVdGlsaXRpZXMsXG4gICAgICB7IHBhcnNlQ29udGVudCB9ID0gdGVtcGxhdGVVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbGVhc2Uge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB2ZXJzaW9uLCBkZXBlbmRlbmN5TWFwLCBkZXZEZXBlbmRlbmN5TWFwLCBzdWJEaXJlY3RvcnlQYXRoKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIHRoaXMuZGVwZW5kZW5jeU1hcCA9IGRlcGVuZGVuY3lNYXA7XG4gICAgdGhpcy5kZXZEZXBlbmRlbmN5TWFwID0gZGV2RGVwZW5kZW5jeU1hcDtcbiAgICB0aGlzLnN1YkRpcmVjdG9yeVBhdGggPSBzdWJEaXJlY3RvcnlQYXRoO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0VmVyc2lvbigpIHtcbiAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICB9XG5cbiAgZ2V0RGVwZW5kZW5jeU1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZXBlbmRlbmN5TWFwO1xuICB9XG5cbiAgZ2V0RGV2RGVwZW5kZW5jeU1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZXZEZXBlbmRlbmN5TWFwO1xuICB9XG5cbiAgZ2V0U3ViRGlyZWN0b3J5UGF0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJEaXJlY3RvcnlQYXRoO1xuICB9XG5cbiAgaXNQdWJsaXNoYWJsZSgpIHtcbiAgICBjb25zdCBwdWJsaXNoYWJsZSA9ICh0aGlzLm5hbWUgIT09IG51bGwpICYmICh0aGlzLnZlcnNpb24gIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHB1Ymxpc2hhYmxlO1xuICB9XG5cbiAgZ2V0VmVyc2lvblN0cmluZygpIHtcbiAgICBjb25zdCB2ZXJzaW9uU3RyaW5nID0gdGhpcy52ZXJzaW9uLmFzU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdmVyc2lvblN0cmluZzsgLy8vXG4gIH1cblxuICBnZXREZXBlbmRlbmN5TmFtZXMoKSB7XG4gICAgY29uc3QgZGVwZW5kZW5jeU5hbWVzID0gT2JqZWN0LmtleXModGhpcy5kZXBlbmRlbmN5TWFwKTtcblxuICAgIHJldHVybiBkZXBlbmRlbmN5TmFtZXM7XG4gIH1cblxuICBnZXREZXZEZXBlbmRlbmN5TmFtZXMoKSB7XG4gICAgY29uc3QgZGV2RGVwZW5kZW5jeU5hbWVzID0gT2JqZWN0LmtleXModGhpcy5kZXZEZXBlbmRlbmN5TWFwKTtcblxuICAgIHJldHVybiBkZXZEZXBlbmRlbmN5TmFtZXM7XG4gIH1cblxuICBnaXQocXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBsZXQgc2hlbGxDb21tYW5kcyA9IHJldHJpZXZlU2hlbGxDb21tYW5kcygpO1xuXG4gICAgY29uc3QgeyBnaXQgfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICBnaXRTaGVsbENvbW1hbmRzID0gZ2l0O1xuXG4gICAgc2hlbGxDb21tYW5kcyA9IGdpdFNoZWxsQ29tbWFuZHM7IC8vL1xuXG4gICAgdGhpcy5leGVjdXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjayk7XG4gIH1cblxuICBwb2xsKHNwZWNpZmllcnMsIHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gICAgY29uc3Qgc3BlY2lmaWVyc0xlbmd0aCA9IHNwZWNpZmllcnMubGVuZ3RoO1xuXG4gICAgaWYgKHNwZWNpZmllcnNMZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICBjYWxsYmFjayhzdWNjZXNzKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIChzcGVjaWZpZXJzTGVuZ3RoID09PSAxKSA/XG4gICAgICBjb25zb2xlLmxvZyhgUG9sbGluZyBmb3IgdGhlIGRlcGVuZGVuY3k6YCkgOlxuICAgICAgICBjb25zb2xlLmxvZyhgUG9sbGluZyBmb3IgdGhlIGRlcGVuZGVuaWVzOmApO1xuXG4gICAgaGlkZUN1cnNvcigpO1xuXG4gICAgc3BlY2lmaWVycy5mb3JFYWNoKChzcGVjaWZpZXIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGAgLSAke3NwZWNpZmllcn1gKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHNwZWNpZmllcnNMZW5ndGgsICAvLy9cbiAgICAgICAgICBvcGVyYXRpb25zID0gc3BlY2lmaWVycy5tYXAoKHNwZWNpZmllciwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAobmV4dCwgZG9uZSwgY29udGV4dCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzaGVsbENvbW1hbmRzID0gc2hlbGxDb21tYW5kc0Zyb21TcGVjaWZpZXIoc3BlY2lmaWVyKTtcblxuICAgICAgICAgICAgICBleGVjdXRlUmVwZWF0ZWRseShzaGVsbENvbW1hbmRzLCBzcGVjaWZpZXIsIGluZGV4LCBsZW5ndGgsIHF1aWV0bHksIChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbGxlZFNwZWNpZmllciA9IHNwZWNpZmllcjsgLy8vXG5cbiAgICAgICAgICAgICAgICAgIHBydW5lKHNwZWNpZmllcnMsIChzcGVjaWZpZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWNpZmllciAhPT0gcG9sbGVkU3BlY2lmaWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuXG4gICAgZXZlbnR1YWxseShvcGVyYXRpb25zLCAoKSA9PiB7XG4gICAgICBjb25zdCBzcGVjaWZpZXJzTGVuZ3RoID0gc3BlY2lmaWVycy5sZW5ndGgsXG4gICAgICAgICAgICBzdWNjZXNzID0gKHNwZWNpZmllcnNMZW5ndGggPT09IDApO1xuXG4gICAgICBzaG93Q3Vyc29yKCk7XG5cbiAgICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5zdGFsbChxdWlldGx5LCBjYWxsYmFjaykge1xuICAgIGxldCBzaGVsbENvbW1hbmRzID0gcmV0cmlldmVTaGVsbENvbW1hbmRzKCk7XG5cbiAgICBjb25zdCB7IGluc3RhbGwgfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICAgICAgaW5zdGFsbFNoZWxsQ29tbWFuZHMgPSBpbnN0YWxsO1xuXG4gICAgc2hlbGxDb21tYW5kcyA9IGluc3RhbGxTaGVsbENvbW1hbmRzOyAvLy9cblxuICAgIHRoaXMuZXhlY3V0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgY2FsbGJhY2spO1xuICB9XG5cbiAgYnVpbGQocXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBpZ25vcmVkQnVpbGRzID0gcmV0cmlldmVJZ25vcmVkQnVpbGRzKCksXG4gICAgICAgICAgc3ViRGlyZWN0b3J5UGF0aHMgPSBpZ25vcmVkQnVpbGRzLCAgLy8vXG4gICAgICAgICAgc3ViRGlyZWN0b3J5UGF0aHNJbmNsdWRlc1N1YkRpcmVjdG9yeVBhdGggPSBzdWJEaXJlY3RvcnlQYXRocy5pbmNsdWRlcyh0aGlzLnN1YkRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgIGJ1aWxkSWdub3JlZCA9IHN1YkRpcmVjdG9yeVBhdGhzSW5jbHVkZXNTdWJEaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgIGlmIChidWlsZElnbm9yZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBJZ25vcmluZyB0aGUgJyR7dGhpcy5zdWJEaXJlY3RvcnlQYXRofScgYnVpbGQuYCk7XG5cbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICBjYWxsYmFjayhzdWNjZXNzKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzaGVsbENvbW1hbmRzID0gcmV0cmlldmVTaGVsbENvbW1hbmRzKCk7XG5cbiAgICBjb25zdCB7IGJ1aWxkIH0gPSBzaGVsbENvbW1hbmRzLFxuICAgICAgICAgIGJ1aWxkU2hlbGxDb21tYW5kcyA9IGJ1aWxkO1xuXG4gICAgc2hlbGxDb21tYW5kcyA9IGJ1aWxkU2hlbGxDb21tYW5kczsgLy8vXG5cbiAgICB0aGlzLmV4ZWN1dGVTaGVsbENvbW1hbmRzKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1Ymxpc2gocXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBpZ25vcmVkUHVibGlzaGVzID0gcmV0cmlldmVJZ25vcmVkUHVibGlzaGVzKCksXG4gICAgICAgICAgbmFtZXMgPSBpZ25vcmVkUHVibGlzaGVzLFxuICAgICAgICAgIG5hbWVzSW5jbHVkZXNOYW1lID0gbmFtZXMuaW5jbHVkZXModGhpcy5uYW1lKSxcbiAgICAgICAgICBwdWJsaXNoSWdub3JlZCA9IG5hbWVzSW5jbHVkZXNOYW1lOyAvLy9cblxuICAgIGlmIChwdWJsaXNoSWdub3JlZCkge1xuICAgICAgY29uc29sZS5sb2coYElnbm9yaW5nIHRoZSAnJHt0aGlzLm5hbWV9JyBwdWJsaXNoLmApO1xuXG4gICAgICBjb25zdCBzdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgY2FsbGJhY2soc3VjY2Vzcyk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc2hlbGxDb21tYW5kcyA9IHJldHJpZXZlU2hlbGxDb21tYW5kcygpO1xuXG4gICAgY29uc3QgeyBwdWJsaXNoIH0gPSBzaGVsbENvbW1hbmRzLFxuICAgICAgICAgIHB1Ymxpc2hTaGVsbENvbW1hbmRzID0gcHVibGlzaDtcblxuICAgIHNoZWxsQ29tbWFuZHMgPSBwdWJsaXNoU2hlbGxDb21tYW5kczsgLy8vXG5cbiAgICB0aGlzLmV4ZWN1dGVTaGVsbENvbW1hbmRzKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGJ1bXBQYXRjaE51bWJlcigpIHsgdGhpcy52ZXJzaW9uLmJ1bXBQYXRjaE51bWJlcigpOyB9XG5cbiAgZXhlY3V0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBjdXJyZW50V29ya2luZ0RpcmVjdG9yeVBhdGggPSBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgcHJvY2Vzcy5jaGRpcih0aGlzLnN1YkRpcmVjdG9yeVBhdGgpO1xuXG4gICAgZXhlY3V0ZVByb21wdGx5KHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIChzdWNjZXNzKSA9PiB7XG4gICAgICBwcm9jZXNzLmNoZGlyKGN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRGVwZW5kZW5jeVZlcnNpb24obmFtZSwgdmVyc2lvblN0cmluZykge1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSB1cGRhdGVTZW12ZXIobmFtZSwgdmVyc2lvblN0cmluZywgdGhpcy5kZXBlbmRlbmN5TWFwKTtcblxuICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgY29uc29sZS5sb2coYEVpdGhlciB0aGUgdmVyc2lvbiBvZiB0aGUgJyR7dGhpcy5zdWJEaXJlY3RvcnlQYXRofScgcmVsZWFzZSdzICcke25hbWV9JyBkZXBlbmRlbmN5IGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgcHJvcGFnYXRlZCAnJHt2ZXJzaW9uU3RyaW5nfScgdmVyc2lvbiBvciBpdCBjYW5ub3QgYmUgcGFyc2VkLmApO1xuICAgIH1cblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgdXBkYXRlRGV2RGVwZW5kZW5jeVZlcnNpb24obmFtZSwgdmVyc2lvblN0cmluZykge1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSB1cGRhdGVTZW12ZXIobmFtZSwgdmVyc2lvblN0cmluZywgdGhpcy5kZXZEZXBlbmRlbmN5TWFwKTtcblxuICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgY29uc29sZS5sb2coYEVpdGhlciB0aGUgdmVyc2lvbiBvZiB0aGUgJyR7dGhpcy5zdWJEaXJlY3RvcnlQYXRofScgcmVsZWFzZSdzICcke25hbWV9JyBkZXZlbG9wZXIgZGVwZW5kZW5jeSBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHByb3BhZ2F0ZWQgJyR7dmVyc2lvblN0cmluZ30nIHZlcnNpb24gb3IgaXQgY2Fubm90IGJlIHBhcnNlZC5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tU3ViRGlyZWN0b3J5UGF0aChzdWJEaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IHJlbGVhc2UgPSBudWxsO1xuXG4gICAgY29uc3QgcGFja2FnZUpTT04gPSByZWFkUGFja2FnZUpTT05GaWxlKHN1YkRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHBhY2thZ2VKU09OICE9PSBudWxsKSB7XG4gICAgICBsZXQgeyB2ZXJzaW9uID0gbnVsbCB9ID0gcGFja2FnZUpTT047XG5cbiAgICAgIGNvbnN0IHsgbmFtZSA9IG51bGwsIGRlcGVuZGVuY2llcyA9IHt9LCBkZXZEZXBlbmRlbmNpZXMgPSB7fSB9ID0gcGFja2FnZUpTT04sXG4gICAgICAgICAgICB2ZXJzaW9uU3RyaW5nID0gdmVyc2lvbjsgIC8vL1xuXG4gICAgICB2ZXJzaW9uID0gVmVyc2lvbi5mcm9tVmVyc2lvblN0cmluZyh2ZXJzaW9uU3RyaW5nKTtcblxuICAgICAgY29uc3QgZGVwZW5kZW5jeU1hcCA9IGRlcGVuZGVuY2llcywgLy8vXG4gICAgICAgICAgICBkZXZEZXBlbmRlbmN5TWFwID0gZGV2RGVwZW5kZW5jaWVzOyAvLy9cblxuICAgICAgcmVsZWFzZSA9IG5ldyBSZWxlYXNlKG5hbWUsIHZlcnNpb24sIGRlcGVuZGVuY3lNYXAsIGRldkRlcGVuZGVuY3lNYXAsIHN1YkRpcmVjdG9yeVBhdGgpO1xuICAgIH1cblxuICAgIHJldHVybiByZWxlYXNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNlbXZlcihuYW1lLCB2ZXJzaW9uU3RyaW5nLCBtYXApIHtcbiAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICBsZXQgc2VtdmVyID0gbWFwW25hbWVdIHx8IG51bGw7XG5cbiAgY29uc3QgdmVyc2lvbiA9IFZlcnNpb24uZnJvbVZlcnNpb25TdHJpbmcodmVyc2lvblN0cmluZyksXG4gICAgICAgIGV4aXN0aW5nU2VtdmVyID0gc2VtdmVyLCAvLy9cbiAgICAgICAgZXhpc3RpbmdWZXJzaW9uID0gVmVyc2lvbi5mcm9tU3RyaW5nKGV4aXN0aW5nU2VtdmVyKTtcblxuICBpZiAoZXhpc3RpbmdWZXJzaW9uICE9PSBudWxsKSB7XG4gICAgY29uc3QgdmVyc2lvbkdyZWF0ZXJUaGFuRXhpc3RpbmdWZXJzaW9uID0gdmVyc2lvbi5pc0dyZWF0ZXJUaGFuKGV4aXN0aW5nVmVyc2lvbik7XG5cbiAgICBzdWNjZXNzID0gdmVyc2lvbkdyZWF0ZXJUaGFuRXhpc3RpbmdWZXJzaW9uOyAgLy8vXG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgc2VtdmVyID0gdmVyc2lvbi51cGRhdGVTZW12ZXIoc2VtdmVyKTtcblxuICAgICAgbWFwW25hbWVdID0gc2VtdmVyO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdWNjZXNzO1xufVxuXG5mdW5jdGlvbiBzaGVsbENvbW1hbmRzRnJvbVNwZWNpZmllcihzcGVjaWZpZXIpIHtcbiAgbGV0IHNoZWxsQ29tbWFuZHMgPSByZXRyaWV2ZVNoZWxsQ29tbWFuZHMoKTtcblxuICBjb25zdCB7IHBvbGwgfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICAgIHBvbGxTaGVsbENvbW1hbmRzID0gcG9sbCwgLy8vXG4gICAgICAgIGFyZ3MgPSB7XG4gICAgICAgICAgc3BlY2lmaWVyXG4gICAgICAgIH07XG5cbiAgc2hlbGxDb21tYW5kcyA9IHBhcnNlQ29udGVudChwb2xsU2hlbGxDb21tYW5kcywgYXJncyk7XG5cbiAgcmV0dXJuIHNoZWxsQ29tbWFuZHM7XG59XG4iXSwibmFtZXMiOlsiUmVsZWFzZSIsInBydW5lIiwiYXJyYXlVdGlsaXRpZXMiLCJldmVudHVhbGx5IiwiYXN5bmNocm9ub3VzVXRpbGl0aWVzIiwicGFyc2VDb250ZW50IiwidGVtcGxhdGVVdGlsaXRpZXMiLCJuYW1lIiwidmVyc2lvbiIsImRlcGVuZGVuY3lNYXAiLCJkZXZEZXBlbmRlbmN5TWFwIiwic3ViRGlyZWN0b3J5UGF0aCIsImdldE5hbWUiLCJnZXRWZXJzaW9uIiwiZ2V0RGVwZW5kZW5jeU1hcCIsImdldERldkRlcGVuZGVuY3lNYXAiLCJnZXRTdWJEaXJlY3RvcnlQYXRoIiwiaXNQdWJsaXNoYWJsZSIsInB1Ymxpc2hhYmxlIiwiZ2V0VmVyc2lvblN0cmluZyIsInZlcnNpb25TdHJpbmciLCJhc1N0cmluZyIsImdldERlcGVuZGVuY3lOYW1lcyIsImRlcGVuZGVuY3lOYW1lcyIsIk9iamVjdCIsImtleXMiLCJnZXREZXZEZXBlbmRlbmN5TmFtZXMiLCJkZXZEZXBlbmRlbmN5TmFtZXMiLCJnaXQiLCJxdWlldGx5IiwiY2FsbGJhY2siLCJzaGVsbENvbW1hbmRzIiwicmV0cmlldmVTaGVsbENvbW1hbmRzIiwiZ2l0U2hlbGxDb21tYW5kcyIsImV4ZWN1dGVTaGVsbENvbW1hbmRzIiwicG9sbCIsInNwZWNpZmllcnMiLCJzcGVjaWZpZXJzTGVuZ3RoIiwibGVuZ3RoIiwic3VjY2VzcyIsImNvbnNvbGUiLCJsb2ciLCJoaWRlQ3Vyc29yIiwiZm9yRWFjaCIsInNwZWNpZmllciIsIm9wZXJhdGlvbnMiLCJtYXAiLCJpbmRleCIsIm5leHQiLCJkb25lIiwiY29udGV4dCIsInNoZWxsQ29tbWFuZHNGcm9tU3BlY2lmaWVyIiwiZXhlY3V0ZVJlcGVhdGVkbHkiLCJwb2xsZWRTcGVjaWZpZXIiLCJzaG93Q3Vyc29yIiwiaW5zdGFsbCIsImluc3RhbGxTaGVsbENvbW1hbmRzIiwiYnVpbGQiLCJpZ25vcmVkQnVpbGRzIiwicmV0cmlldmVJZ25vcmVkQnVpbGRzIiwic3ViRGlyZWN0b3J5UGF0aHMiLCJzdWJEaXJlY3RvcnlQYXRoc0luY2x1ZGVzU3ViRGlyZWN0b3J5UGF0aCIsImluY2x1ZGVzIiwiYnVpbGRJZ25vcmVkIiwiYnVpbGRTaGVsbENvbW1hbmRzIiwicHVibGlzaCIsImlnbm9yZWRQdWJsaXNoZXMiLCJyZXRyaWV2ZUlnbm9yZWRQdWJsaXNoZXMiLCJuYW1lcyIsIm5hbWVzSW5jbHVkZXNOYW1lIiwicHVibGlzaElnbm9yZWQiLCJwdWJsaXNoU2hlbGxDb21tYW5kcyIsImJ1bXBQYXRjaE51bWJlciIsImN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aCIsInByb2Nlc3MiLCJjd2QiLCJjaGRpciIsImV4ZWN1dGVQcm9tcHRseSIsInVwZGF0ZURlcGVuZGVuY3lWZXJzaW9uIiwidXBkYXRlU2VtdmVyIiwidXBkYXRlRGV2RGVwZW5kZW5jeVZlcnNpb24iLCJmcm9tU3ViRGlyZWN0b3J5UGF0aCIsInJlbGVhc2UiLCJwYWNrYWdlSlNPTiIsInJlYWRQYWNrYWdlSlNPTkZpbGUiLCJkZXBlbmRlbmNpZXMiLCJkZXZEZXBlbmRlbmNpZXMiLCJWZXJzaW9uIiwiZnJvbVZlcnNpb25TdHJpbmciLCJzZW12ZXIiLCJleGlzdGluZ1NlbXZlciIsImV4aXN0aW5nVmVyc2lvbiIsImZyb21TdHJpbmciLCJ2ZXJzaW9uR3JlYXRlclRoYW5FeGlzdGluZ1ZlcnNpb24iLCJpc0dyZWF0ZXJUaGFuIiwicG9sbFNoZWxsQ29tbWFuZHMiLCJhcmdzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztlQWVxQkE7Ozt5QkFib0Q7OERBRXJEOzJCQUVnQjt3QkFDRztxQkFDWTs2QkFDb0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFdkYsSUFBTSxBQUFFQyxRQUFVQyx5QkFBYyxDQUF4QkQsT0FDRixBQUFFRSxhQUFlQyxnQ0FBcUIsQ0FBcENELFlBQ0YsQUFBRUUsZUFBaUJDLDRCQUFpQixDQUFsQ0Q7QUFFTyxJQUFBLEFBQU1MLHdCQUFOO2FBQU1BLFFBQ1BPLElBQUksRUFBRUMsT0FBTyxFQUFFQyxhQUFhLEVBQUVDLGdCQUFnQixFQUFFQyxnQkFBZ0I7Z0NBRHpEWDtRQUVqQixJQUFJLENBQUNPLElBQUksR0FBR0E7UUFDWixJQUFJLENBQUNDLE9BQU8sR0FBR0E7UUFDZixJQUFJLENBQUNDLGFBQWEsR0FBR0E7UUFDckIsSUFBSSxDQUFDQyxnQkFBZ0IsR0FBR0E7UUFDeEIsSUFBSSxDQUFDQyxnQkFBZ0IsR0FBR0E7O2tCQU5QWDs7WUFTbkJZLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0wsSUFBSTtZQUNsQjs7O1lBRUFNLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0wsT0FBTztZQUNyQjs7O1lBRUFNLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0wsYUFBYTtZQUMzQjs7O1lBRUFNLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0wsZ0JBQWdCO1lBQzlCOzs7WUFFQU0sS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDTCxnQkFBZ0I7WUFDOUI7OztZQUVBTSxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBTUMsY0FBYyxBQUFDLElBQUksQ0FBQ1gsSUFBSSxLQUFLLFFBQVUsSUFBSSxDQUFDQyxPQUFPLEtBQUs7Z0JBRTlELE9BQU9VO1lBQ1Q7OztZQUVBQyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBTUMsZ0JBQWdCLElBQUksQ0FBQ1osT0FBTyxDQUFDYSxRQUFRO2dCQUUzQyxPQUFPRCxlQUFlLEdBQUc7WUFDM0I7OztZQUVBRSxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBTUMsa0JBQWtCQyxPQUFPQyxJQUFJLENBQUMsSUFBSSxDQUFDaEIsYUFBYTtnQkFFdEQsT0FBT2M7WUFDVDs7O1lBRUFHLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxJQUFNQyxxQkFBcUJILE9BQU9DLElBQUksQ0FBQyxJQUFJLENBQUNmLGdCQUFnQjtnQkFFNUQsT0FBT2lCO1lBQ1Q7OztZQUVBQyxLQUFBQTttQkFBQUEsU0FBQUEsSUFBSUMsT0FBTyxFQUFFQyxRQUFRO2dCQUNuQixJQUFJQyxnQkFBZ0JDLElBQUFBLG9DQUFxQjtnQkFFekMsSUFBTSxBQUFFSixNQUFRRyxjQUFSSCxLQUNOSyxtQkFBbUJMO2dCQUVyQkcsZ0JBQWdCRSxrQkFBa0IsR0FBRztnQkFFckMsSUFBSSxDQUFDQyxvQkFBb0IsQ0FBQ0gsZUFBZUYsU0FBU0M7WUFDcEQ7OztZQUVBSyxLQUFBQTttQkFBQUEsU0FBQUEsS0FBS0MsVUFBVSxFQUFFUCxPQUFPLEVBQUVDLFFBQVE7Z0JBQ2hDLElBQU1PLG1CQUFtQkQsV0FBV0UsTUFBTTtnQkFFMUMsSUFBSUQscUJBQXFCLEdBQUc7b0JBQzFCLElBQU1FLFVBQVU7b0JBRWhCVCxTQUFTUztvQkFFVDtnQkFDRjtnQkFFQ0YscUJBQXFCLElBQ3BCRyxRQUFRQyxHQUFHLENBQUMsaUNBQ1ZELFFBQVFDLEdBQUcsQ0FBQztnQkFFaEJDLElBQUFBLG9CQUFVO2dCQUVWTixXQUFXTyxPQUFPLENBQUMsU0FBQ0M7b0JBQ2xCSixRQUFRQyxHQUFHLENBQUMsQUFBQyxNQUFlLE9BQVZHO2dCQUNwQjtnQkFFQSxJQUFNTixTQUFTRCxrQkFDVFEsYUFBYVQsV0FBV1UsR0FBRyxDQUFDLFNBQUNGLFdBQVdHO29CQUN0QyxPQUFPLFNBQUNDLE1BQU1DLE1BQU1DO3dCQUNsQixJQUFNbkIsZ0JBQWdCb0IsMkJBQTJCUDt3QkFFakRRLElBQUFBLHdCQUFpQixFQUFDckIsZUFBZWEsV0FBV0csT0FBT1QsUUFBUVQsU0FBUyxTQUFDVTs0QkFDbkUsSUFBSUEsU0FBUztnQ0FDWCxJQUFNYyxrQkFBa0JULFdBQVcsR0FBRztnQ0FFdEMzQyxNQUFNbUMsWUFBWSxTQUFDUTtvQ0FDakIsSUFBSUEsY0FBY1MsaUJBQWlCO3dDQUNqQyxPQUFPO29DQUNUO2dDQUNGOzRCQUNGOzRCQUVBTDt3QkFDRjtvQkFDRjtnQkFDRjtnQkFFTjdDLFdBQVcwQyxZQUFZO29CQUNyQixJQUFNUixtQkFBbUJELFdBQVdFLE1BQU0sRUFDcENDLFVBQVdGLHFCQUFxQjtvQkFFdENpQixJQUFBQSxvQkFBVTtvQkFFVnhCLFNBQVNTO2dCQUNYO1lBQ0Y7OztZQUVBZ0IsS0FBQUE7bUJBQUFBLFNBQUFBLFFBQVExQixPQUFPLEVBQUVDLFFBQVE7Z0JBQ3ZCLElBQUlDLGdCQUFnQkMsSUFBQUEsb0NBQXFCO2dCQUV6QyxJQUFNLEFBQUV1QixVQUFZeEIsY0FBWndCLFNBQ0ZDLHVCQUF1QkQ7Z0JBRTdCeEIsZ0JBQWdCeUIsc0JBQXNCLEdBQUc7Z0JBRXpDLElBQUksQ0FBQ3RCLG9CQUFvQixDQUFDSCxlQUFlRixTQUFTQztZQUNwRDs7O1lBRUEyQixLQUFBQTttQkFBQUEsU0FBQUEsTUFBTTVCLE9BQU8sRUFBRUMsUUFBUTtnQkFDckIsSUFBTTRCLGdCQUFnQkMsSUFBQUEsb0NBQXFCLEtBQ3JDQyxvQkFBb0JGLGVBQ3BCRyw0Q0FBNENELGtCQUFrQkUsUUFBUSxDQUFDLElBQUksQ0FBQ25ELGdCQUFnQixHQUM1Rm9ELGVBQWVGLDJDQUEyQyxHQUFHO2dCQUVuRSxJQUFJRSxjQUFjO29CQUNoQnZCLFFBQVFDLEdBQUcsQ0FBQyxBQUFDLGlCQUFzQyxPQUF0QixJQUFJLENBQUM5QixnQkFBZ0IsRUFBQztvQkFFbkQsSUFBTTRCLFVBQVU7b0JBRWhCVCxTQUFTUztvQkFFVDtnQkFDRjtnQkFFQSxJQUFJUixnQkFBZ0JDLElBQUFBLG9DQUFxQjtnQkFFekMsSUFBTSxBQUFFeUIsUUFBVTFCLGNBQVYwQixPQUNGTyxxQkFBcUJQO2dCQUUzQjFCLGdCQUFnQmlDLG9CQUFvQixHQUFHO2dCQUV2QyxJQUFJLENBQUM5QixvQkFBb0IsQ0FBQ0gsZUFBZUYsU0FBU0M7WUFDcEQ7OztZQUVBbUMsS0FBQUE7bUJBQUFBLFNBQUFBLFFBQVFwQyxPQUFPLEVBQUVDLFFBQVE7Z0JBQ3ZCLElBQU1vQyxtQkFBbUJDLElBQUFBLHVDQUF3QixLQUMzQ0MsUUFBUUYsa0JBQ1JHLG9CQUFvQkQsTUFBTU4sUUFBUSxDQUFDLElBQUksQ0FBQ3ZELElBQUksR0FDNUMrRCxpQkFBaUJELG1CQUFtQixHQUFHO2dCQUU3QyxJQUFJQyxnQkFBZ0I7b0JBQ2xCOUIsUUFBUUMsR0FBRyxDQUFDLEFBQUMsaUJBQTBCLE9BQVYsSUFBSSxDQUFDbEMsSUFBSSxFQUFDO29CQUV2QyxJQUFNZ0MsVUFBVTtvQkFFaEJULFNBQVNTO29CQUVUO2dCQUNGO2dCQUVBLElBQUlSLGdCQUFnQkMsSUFBQUEsb0NBQXFCO2dCQUV6QyxJQUFNLEFBQUVpQyxVQUFZbEMsY0FBWmtDLFNBQ0ZNLHVCQUF1Qk47Z0JBRTdCbEMsZ0JBQWdCd0Msc0JBQXNCLEdBQUc7Z0JBRXpDLElBQUksQ0FBQ3JDLG9CQUFvQixDQUFDSCxlQUFlRixTQUFTQztZQUNwRDs7O1lBRUEwQyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQW9CLElBQUksQ0FBQ2hFLE9BQU8sQ0FBQ2dFLGVBQWU7WUFBSTs7O1lBRXBEdEMsS0FBQUE7bUJBQUFBLFNBQUFBLHFCQUFxQkgsYUFBYSxFQUFFRixPQUFPLEVBQUVDLFFBQVE7Z0JBQ25ELElBQU0yQyw4QkFBOEJDLFFBQVFDLEdBQUc7Z0JBRS9DRCxRQUFRRSxLQUFLLENBQUMsSUFBSSxDQUFDakUsZ0JBQWdCO2dCQUVuQ2tFLElBQUFBLHNCQUFlLEVBQUM5QyxlQUFlRixTQUFTLFNBQUNVO29CQUN2Q21DLFFBQVFFLEtBQUssQ0FBQ0g7b0JBRWQzQyxTQUFTUztnQkFDWDtZQUNGOzs7WUFFQXVDLEtBQUFBO21CQUFBQSxTQUFBQSx3QkFBd0J2RSxJQUFJLEVBQUVhLGFBQWE7Z0JBQ3pDLElBQU1tQixVQUFVd0MsYUFBYXhFLE1BQU1hLGVBQWUsSUFBSSxDQUFDWCxhQUFhO2dCQUVwRSxJQUFJLENBQUM4QixTQUFTO29CQUNaQyxRQUFRQyxHQUFHLENBQUMsQUFBQyw4QkFBa0VsQyxPQUFyQyxJQUFJLENBQUNJLGdCQUFnQixFQUFDLGlCQUErRVMsT0FBaEViLE1BQUssNkRBQXlFLE9BQWRhLGVBQWM7Z0JBQy9KO2dCQUVBLE9BQU9tQjtZQUNUOzs7WUFFQXlDLEtBQUFBO21CQUFBQSxTQUFBQSwyQkFBMkJ6RSxJQUFJLEVBQUVhLGFBQWE7Z0JBQzVDLElBQU1tQixVQUFVd0MsYUFBYXhFLE1BQU1hLGVBQWUsSUFBSSxDQUFDVixnQkFBZ0I7Z0JBRXZFLElBQUksQ0FBQzZCLFNBQVM7b0JBQ1pDLFFBQVFDLEdBQUcsQ0FBQyxBQUFDLDhCQUFrRWxDLE9BQXJDLElBQUksQ0FBQ0ksZ0JBQWdCLEVBQUMsaUJBQXlGUyxPQUExRWIsTUFBSyx1RUFBbUYsT0FBZGEsZUFBYztnQkFDeks7Z0JBRUEsT0FBT21CO1lBQ1Q7Ozs7WUFFTzBDLEtBQUFBO21CQUFQLFNBQU9BLHFCQUFxQnRFLGdCQUFnQjtnQkFDMUMsSUFBSXVFLFVBQVU7Z0JBRWQsSUFBTUMsY0FBY0MsSUFBQUEsZ0NBQW1CLEVBQUN6RTtnQkFFeEMsSUFBSXdFLGdCQUFnQixNQUFNO29CQUN4QiwyQkFBeUJBLFlBQW5CM0UsU0FBQUEsNENBQVU7b0JBRWhCLHdCQUFpRTJFLFlBQXpENUUsTUFBQUEsc0NBQU8sc0RBQWtENEUsWUFBNUNFLGNBQUFBLHNEQUFlLENBQUMsOERBQTRCRixZQUF6QkcsaUJBQUFBLDREQUFrQixDQUFDLGtDQUNyRGxFLGdCQUFnQlosU0FBVSxHQUFHO29CQUVuQ0EsVUFBVStFLGdCQUFPLENBQUNDLGlCQUFpQixDQUFDcEU7b0JBRXBDLElBQU1YLGdCQUFnQjRFLGNBQ2hCM0UsbUJBQW1CNEUsaUJBQWlCLEdBQUc7b0JBRTdDSixVQUFVLElBck9LbEYsUUFxT09PLE1BQU1DLFNBQVNDLGVBQWVDLGtCQUFrQkM7Z0JBQ3hFO2dCQUVBLE9BQU91RTtZQUNUOzs7V0F6T21CbEY7O0FBNE9yQixTQUFTK0UsYUFBYXhFLElBQUksRUFBRWEsYUFBYSxFQUFFMEIsR0FBRztJQUM1QyxJQUFJUCxVQUFVO0lBRWQsSUFBSWtELFNBQVMzQyxHQUFHLENBQUN2QyxLQUFLLElBQUk7SUFFMUIsSUFBTUMsVUFBVStFLGdCQUFPLENBQUNDLGlCQUFpQixDQUFDcEUsZ0JBQ3BDc0UsaUJBQWlCRCxRQUNqQkUsa0JBQWtCSixnQkFBTyxDQUFDSyxVQUFVLENBQUNGO0lBRTNDLElBQUlDLG9CQUFvQixNQUFNO1FBQzVCLElBQU1FLG9DQUFvQ3JGLFFBQVFzRixhQUFhLENBQUNIO1FBRWhFcEQsVUFBVXNELG1DQUFvQyxHQUFHO1FBRWpELElBQUl0RCxTQUFTO1lBQ1hrRCxTQUFTakYsUUFBUXVFLFlBQVksQ0FBQ1U7WUFFOUIzQyxHQUFHLENBQUN2QyxLQUFLLEdBQUdrRjtRQUNkO0lBQ0Y7SUFFQSxPQUFPbEQ7QUFDVDtBQUVBLFNBQVNZLDJCQUEyQlAsU0FBUztJQUMzQyxJQUFJYixnQkFBZ0JDLElBQUFBLG9DQUFxQjtJQUV6QyxJQUFNLEFBQUVHLE9BQVNKLGNBQVRJLE1BQ0Y0RCxvQkFBb0I1RCxNQUNwQjZELE9BQU87UUFDTHBELFdBQUFBO0lBQ0Y7SUFFTmIsZ0JBQWdCMUIsYUFBYTBGLG1CQUFtQkM7SUFFaEQsT0FBT2pFO0FBQ1QifQ==