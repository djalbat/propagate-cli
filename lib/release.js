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
                var operations = specifiers.map(function(specifier) {
                    return function(next, done, context, index) {
                        var shellCommands = shellCommandsFromSpecifier(specifier);
                        console.log(" - ".concat(specifier, " "));
                        (0, _shell.executeRepeatedly)(shellCommands, quietly, function(success) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWxlYXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcywgdGVtcGxhdGVVdGlsaXRpZXMsIGFzeW5jaHJvbm91c1V0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIlxuXG5pbXBvcnQgVmVyc2lvbiBmcm9tIFwiLi92ZXJzaW9uXCI7XG5cbmltcG9ydCB7IHJlYWRQYWNrYWdlSlNPTkZpbGUgfSBmcm9tIFwiLi91dGlsaXRpZXMvcGFja2FnZUpTT05cIjtcbmltcG9ydCB7IGV4ZWN1dGVQcm9tcHRseSwgZXhlY3V0ZVJlcGVhdGVkbHkgfSBmcm9tIFwiLi91dGlsaXRpZXMvc2hlbGxcIjtcbmltcG9ydCB7IHJldHJpZXZlU2hlbGxDb21tYW5kcywgcmV0cmlldmVJZ25vcmVkQnVpbGRzLCByZXRyaWV2ZUlnbm9yZWRQdWJsaXNoZXMgfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uXCI7XG5cbmNvbnN0IHsgcHJ1bmUgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBldmVudHVhbGx5IH0gPSBhc3luY2hyb25vdXNVdGlsaXRpZXMsXG4gICAgICB7IHBhcnNlQ29udGVudCB9ID0gdGVtcGxhdGVVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbGVhc2Uge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB2ZXJzaW9uLCBkZXBlbmRlbmN5TWFwLCBkZXZEZXBlbmRlbmN5TWFwLCBzdWJEaXJlY3RvcnlQYXRoKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIHRoaXMuZGVwZW5kZW5jeU1hcCA9IGRlcGVuZGVuY3lNYXA7XG4gICAgdGhpcy5kZXZEZXBlbmRlbmN5TWFwID0gZGV2RGVwZW5kZW5jeU1hcDtcbiAgICB0aGlzLnN1YkRpcmVjdG9yeVBhdGggPSBzdWJEaXJlY3RvcnlQYXRoO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0VmVyc2lvbigpIHtcbiAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICB9XG5cbiAgZ2V0RGVwZW5kZW5jeU1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZXBlbmRlbmN5TWFwO1xuICB9XG5cbiAgZ2V0RGV2RGVwZW5kZW5jeU1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZXZEZXBlbmRlbmN5TWFwO1xuICB9XG5cbiAgZ2V0U3ViRGlyZWN0b3J5UGF0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJEaXJlY3RvcnlQYXRoO1xuICB9XG5cbiAgaXNQdWJsaXNoYWJsZSgpIHtcbiAgICBjb25zdCBwdWJsaXNoYWJsZSA9ICh0aGlzLm5hbWUgIT09IG51bGwpICYmICh0aGlzLnZlcnNpb24gIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHB1Ymxpc2hhYmxlO1xuICB9XG5cbiAgZ2V0VmVyc2lvblN0cmluZygpIHtcbiAgICBjb25zdCB2ZXJzaW9uU3RyaW5nID0gdGhpcy52ZXJzaW9uLmFzU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdmVyc2lvblN0cmluZzsgLy8vXG4gIH1cblxuICBnZXREZXBlbmRlbmN5TmFtZXMoKSB7XG4gICAgY29uc3QgZGVwZW5kZW5jeU5hbWVzID0gT2JqZWN0LmtleXModGhpcy5kZXBlbmRlbmN5TWFwKTtcblxuICAgIHJldHVybiBkZXBlbmRlbmN5TmFtZXM7XG4gIH1cblxuICBnZXREZXZEZXBlbmRlbmN5TmFtZXMoKSB7XG4gICAgY29uc3QgZGV2RGVwZW5kZW5jeU5hbWVzID0gT2JqZWN0LmtleXModGhpcy5kZXZEZXBlbmRlbmN5TWFwKTtcblxuICAgIHJldHVybiBkZXZEZXBlbmRlbmN5TmFtZXM7XG4gIH1cblxuICBnaXQocXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBsZXQgc2hlbGxDb21tYW5kcyA9IHJldHJpZXZlU2hlbGxDb21tYW5kcygpO1xuXG4gICAgY29uc3QgeyBnaXQgfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICBnaXRTaGVsbENvbW1hbmRzID0gZ2l0O1xuXG4gICAgc2hlbGxDb21tYW5kcyA9IGdpdFNoZWxsQ29tbWFuZHM7IC8vL1xuXG4gICAgdGhpcy5leGVjdXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjayk7XG4gIH1cblxuICBwb2xsKHNwZWNpZmllcnMsIHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gICAgY29uc3Qgc3BlY2lmaWVyc0xlbmd0aCA9IHNwZWNpZmllcnMubGVuZ3RoO1xuXG4gICAgaWYgKHNwZWNpZmllcnNMZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICBjYWxsYmFjayhzdWNjZXNzKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIChzcGVjaWZpZXJzTGVuZ3RoID09PSAxKSA/XG4gICAgICBjb25zb2xlLmxvZyhgUG9sbGluZyBmb3IgdGhlIGRlcGVuZGVuY3k6YCkgOlxuICAgICAgICBjb25zb2xlLmxvZyhgUG9sbGluZyBmb3IgdGhlIGRlcGVuZGVuaWVzOmApO1xuXG4gICAgY29uc3Qgb3BlcmF0aW9ucyA9IHNwZWNpZmllcnMubWFwKChzcGVjaWZpZXIpID0+IHtcbiAgICAgIHJldHVybiAobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3Qgc2hlbGxDb21tYW5kcyA9IHNoZWxsQ29tbWFuZHNGcm9tU3BlY2lmaWVyKHNwZWNpZmllcik7XG5cbiAgICAgICAgY29uc29sZS5sb2coYCAtICR7c3BlY2lmaWVyfSBgKTtcblxuICAgICAgICBleGVjdXRlUmVwZWF0ZWRseShzaGVsbENvbW1hbmRzLCBxdWlldGx5LCAoc3VjY2VzcykgPT4ge1xuICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICBjb25zdCBwb2xsZWRTcGVjaWZpZXIgPSBzcGVjaWZpZXI7IC8vL1xuXG4gICAgICAgICAgICBwcnVuZShzcGVjaWZpZXJzLCAoc3BlY2lmaWVyKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChzcGVjaWZpZXIgIT09IHBvbGxlZFNwZWNpZmllcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGV2ZW50dWFsbHkob3BlcmF0aW9ucywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3BlY2lmaWVyc0xlbmd0aCA9IHNwZWNpZmllcnMubGVuZ3RoLFxuICAgICAgICAgICAgc3VjY2VzcyA9IChzcGVjaWZpZXJzTGVuZ3RoID09PSAwKTtcblxuICAgICAgY2FsbGJhY2soc3VjY2Vzcyk7XG4gICAgfSk7XG4gIH1cblxuICBpbnN0YWxsKHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gICAgbGV0IHNoZWxsQ29tbWFuZHMgPSByZXRyaWV2ZVNoZWxsQ29tbWFuZHMoKTtcblxuICAgIGNvbnN0IHsgaW5zdGFsbCB9ID0gc2hlbGxDb21tYW5kcyxcbiAgICAgICAgICBpbnN0YWxsU2hlbGxDb21tYW5kcyA9IGluc3RhbGw7XG5cbiAgICBzaGVsbENvbW1hbmRzID0gaW5zdGFsbFNoZWxsQ29tbWFuZHM7IC8vL1xuXG4gICAgdGhpcy5leGVjdXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjayk7XG4gIH1cblxuICBidWlsZChxdWlldGx5LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGlnbm9yZWRCdWlsZHMgPSByZXRyaWV2ZUlnbm9yZWRCdWlsZHMoKSxcbiAgICAgICAgICBzdWJEaXJlY3RvcnlQYXRocyA9IGlnbm9yZWRCdWlsZHMsICAvLy9cbiAgICAgICAgICBzdWJEaXJlY3RvcnlQYXRoc0luY2x1ZGVzU3ViRGlyZWN0b3J5UGF0aCA9IHN1YkRpcmVjdG9yeVBhdGhzLmluY2x1ZGVzKHRoaXMuc3ViRGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgYnVpbGRJZ25vcmVkID0gc3ViRGlyZWN0b3J5UGF0aHNJbmNsdWRlc1N1YkRpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgaWYgKGJ1aWxkSWdub3JlZCkge1xuICAgICAgY29uc29sZS5sb2coYElnbm9yaW5nIHRoZSAnJHt0aGlzLnN1YkRpcmVjdG9yeVBhdGh9JyBidWlsZC5gKTtcblxuICAgICAgY29uc3Qgc3VjY2VzcyA9IHRydWU7XG5cbiAgICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHNoZWxsQ29tbWFuZHMgPSByZXRyaWV2ZVNoZWxsQ29tbWFuZHMoKTtcblxuICAgIGNvbnN0IHsgYnVpbGQgfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICAgICAgYnVpbGRTaGVsbENvbW1hbmRzID0gYnVpbGQ7XG5cbiAgICBzaGVsbENvbW1hbmRzID0gYnVpbGRTaGVsbENvbW1hbmRzOyAvLy9cblxuICAgIHRoaXMuZXhlY3V0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGlzaChxdWlldGx5LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGlnbm9yZWRQdWJsaXNoZXMgPSByZXRyaWV2ZUlnbm9yZWRQdWJsaXNoZXMoKSxcbiAgICAgICAgICBuYW1lcyA9IGlnbm9yZWRQdWJsaXNoZXMsXG4gICAgICAgICAgbmFtZXNJbmNsdWRlc05hbWUgPSBuYW1lcy5pbmNsdWRlcyh0aGlzLm5hbWUpLFxuICAgICAgICAgIHB1Ymxpc2hJZ25vcmVkID0gbmFtZXNJbmNsdWRlc05hbWU7IC8vL1xuXG4gICAgaWYgKHB1Ymxpc2hJZ25vcmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhgSWdub3JpbmcgdGhlICcke3RoaXMubmFtZX0nIHB1Ymxpc2guYCk7XG5cbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICBjYWxsYmFjayhzdWNjZXNzKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzaGVsbENvbW1hbmRzID0gcmV0cmlldmVTaGVsbENvbW1hbmRzKCk7XG5cbiAgICBjb25zdCB7IHB1Ymxpc2ggfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICAgICAgcHVibGlzaFNoZWxsQ29tbWFuZHMgPSBwdWJsaXNoO1xuXG4gICAgc2hlbGxDb21tYW5kcyA9IHB1Ymxpc2hTaGVsbENvbW1hbmRzOyAvLy9cblxuICAgIHRoaXMuZXhlY3V0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgY2FsbGJhY2spO1xuICB9XG5cbiAgYnVtcFBhdGNoTnVtYmVyKCkgeyB0aGlzLnZlcnNpb24uYnVtcFBhdGNoTnVtYmVyKCk7IH1cblxuICBleGVjdXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aCA9IHByb2Nlc3MuY3dkKCk7XG5cbiAgICBwcm9jZXNzLmNoZGlyKHRoaXMuc3ViRGlyZWN0b3J5UGF0aCk7XG5cbiAgICBleGVjdXRlUHJvbXB0bHkoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgKHN1Y2Nlc3MpID0+IHtcbiAgICAgIHByb2Nlc3MuY2hkaXIoY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoKTtcblxuICAgICAgY2FsbGJhY2soc3VjY2Vzcyk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVEZXBlbmRlbmN5VmVyc2lvbihuYW1lLCB2ZXJzaW9uU3RyaW5nKSB7XG4gICAgY29uc3Qgc3VjY2VzcyA9IHVwZGF0ZVNlbXZlcihuYW1lLCB2ZXJzaW9uU3RyaW5nLCB0aGlzLmRlcGVuZGVuY3lNYXApO1xuXG4gICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICBjb25zb2xlLmxvZyhgRWl0aGVyIHRoZSB2ZXJzaW9uIG9mIHRoZSAnJHt0aGlzLnN1YkRpcmVjdG9yeVBhdGh9JyByZWxlYXNlJ3MgJyR7bmFtZX0nIGRlcGVuZGVuY3kgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBwcm9wYWdhdGVkICcke3ZlcnNpb25TdHJpbmd9JyB2ZXJzaW9uIG9yIGl0IGNhbm5vdCBiZSBwYXJzZWQuYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICB1cGRhdGVEZXZEZXBlbmRlbmN5VmVyc2lvbihuYW1lLCB2ZXJzaW9uU3RyaW5nKSB7XG4gICAgY29uc3Qgc3VjY2VzcyA9IHVwZGF0ZVNlbXZlcihuYW1lLCB2ZXJzaW9uU3RyaW5nLCB0aGlzLmRldkRlcGVuZGVuY3lNYXApO1xuXG4gICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICBjb25zb2xlLmxvZyhgRWl0aGVyIHRoZSB2ZXJzaW9uIG9mIHRoZSAnJHt0aGlzLnN1YkRpcmVjdG9yeVBhdGh9JyByZWxlYXNlJ3MgJyR7bmFtZX0nIGRldmVsb3BlciBkZXBlbmRlbmN5IGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgcHJvcGFnYXRlZCAnJHt2ZXJzaW9uU3RyaW5nfScgdmVyc2lvbiBvciBpdCBjYW5ub3QgYmUgcGFyc2VkLmApO1xuICAgIH1cblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgc3RhdGljIGZyb21TdWJEaXJlY3RvcnlQYXRoKHN1YkRpcmVjdG9yeVBhdGgpIHtcbiAgICBsZXQgcmVsZWFzZSA9IG51bGw7XG5cbiAgICBjb25zdCBwYWNrYWdlSlNPTiA9IHJlYWRQYWNrYWdlSlNPTkZpbGUoc3ViRGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAocGFja2FnZUpTT04gIT09IG51bGwpIHtcbiAgICAgIGxldCB7IHZlcnNpb24gPSBudWxsIH0gPSBwYWNrYWdlSlNPTjtcblxuICAgICAgY29uc3QgeyBuYW1lID0gbnVsbCwgZGVwZW5kZW5jaWVzID0ge30sIGRldkRlcGVuZGVuY2llcyA9IHt9IH0gPSBwYWNrYWdlSlNPTixcbiAgICAgICAgICAgIHZlcnNpb25TdHJpbmcgPSB2ZXJzaW9uOyAgLy8vXG5cbiAgICAgIHZlcnNpb24gPSBWZXJzaW9uLmZyb21WZXJzaW9uU3RyaW5nKHZlcnNpb25TdHJpbmcpO1xuXG4gICAgICBjb25zdCBkZXBlbmRlbmN5TWFwID0gZGVwZW5kZW5jaWVzLCAvLy9cbiAgICAgICAgICAgIGRldkRlcGVuZGVuY3lNYXAgPSBkZXZEZXBlbmRlbmNpZXM7IC8vL1xuXG4gICAgICByZWxlYXNlID0gbmV3IFJlbGVhc2UobmFtZSwgdmVyc2lvbiwgZGVwZW5kZW5jeU1hcCwgZGV2RGVwZW5kZW5jeU1hcCwgc3ViRGlyZWN0b3J5UGF0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbGVhc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlU2VtdmVyKG5hbWUsIHZlcnNpb25TdHJpbmcsIG1hcCkge1xuICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuXG4gIGxldCBzZW12ZXIgPSBtYXBbbmFtZV0gfHwgbnVsbDtcblxuICBjb25zdCB2ZXJzaW9uID0gVmVyc2lvbi5mcm9tVmVyc2lvblN0cmluZyh2ZXJzaW9uU3RyaW5nKSxcbiAgICAgICAgZXhpc3RpbmdTZW12ZXIgPSBzZW12ZXIsIC8vL1xuICAgICAgICBleGlzdGluZ1ZlcnNpb24gPSBWZXJzaW9uLmZyb21TdHJpbmcoZXhpc3RpbmdTZW12ZXIpO1xuXG4gIGlmIChleGlzdGluZ1ZlcnNpb24gIT09IG51bGwpIHtcbiAgICBjb25zdCB2ZXJzaW9uR3JlYXRlclRoYW5FeGlzdGluZ1ZlcnNpb24gPSB2ZXJzaW9uLmlzR3JlYXRlclRoYW4oZXhpc3RpbmdWZXJzaW9uKTtcblxuICAgIHN1Y2Nlc3MgPSB2ZXJzaW9uR3JlYXRlclRoYW5FeGlzdGluZ1ZlcnNpb247ICAvLy9cblxuICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICBzZW12ZXIgPSB2ZXJzaW9uLnVwZGF0ZVNlbXZlcihzZW12ZXIpO1xuXG4gICAgICBtYXBbbmFtZV0gPSBzZW12ZXI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN1Y2Nlc3M7XG59XG5cbmZ1bmN0aW9uIHNoZWxsQ29tbWFuZHNGcm9tU3BlY2lmaWVyKHNwZWNpZmllcikge1xuICBsZXQgc2hlbGxDb21tYW5kcyA9IHJldHJpZXZlU2hlbGxDb21tYW5kcygpO1xuXG4gIGNvbnN0IHsgcG9sbCB9ID0gc2hlbGxDb21tYW5kcyxcbiAgICAgICAgcG9sbFNoZWxsQ29tbWFuZHMgPSBwb2xsLCAvLy9cbiAgICAgICAgYXJncyA9IHtcbiAgICAgICAgICBzcGVjaWZpZXJcbiAgICAgICAgfTtcblxuICBzaGVsbENvbW1hbmRzID0gcGFyc2VDb250ZW50KHBvbGxTaGVsbENvbW1hbmRzLCBhcmdzKTtcblxuICByZXR1cm4gc2hlbGxDb21tYW5kcztcbn1cbiJdLCJuYW1lcyI6WyJSZWxlYXNlIiwicHJ1bmUiLCJhcnJheVV0aWxpdGllcyIsImV2ZW50dWFsbHkiLCJhc3luY2hyb25vdXNVdGlsaXRpZXMiLCJwYXJzZUNvbnRlbnQiLCJ0ZW1wbGF0ZVV0aWxpdGllcyIsIm5hbWUiLCJ2ZXJzaW9uIiwiZGVwZW5kZW5jeU1hcCIsImRldkRlcGVuZGVuY3lNYXAiLCJzdWJEaXJlY3RvcnlQYXRoIiwiZ2V0TmFtZSIsImdldFZlcnNpb24iLCJnZXREZXBlbmRlbmN5TWFwIiwiZ2V0RGV2RGVwZW5kZW5jeU1hcCIsImdldFN1YkRpcmVjdG9yeVBhdGgiLCJpc1B1Ymxpc2hhYmxlIiwicHVibGlzaGFibGUiLCJnZXRWZXJzaW9uU3RyaW5nIiwidmVyc2lvblN0cmluZyIsImFzU3RyaW5nIiwiZ2V0RGVwZW5kZW5jeU5hbWVzIiwiZGVwZW5kZW5jeU5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImdldERldkRlcGVuZGVuY3lOYW1lcyIsImRldkRlcGVuZGVuY3lOYW1lcyIsImdpdCIsInF1aWV0bHkiLCJjYWxsYmFjayIsInNoZWxsQ29tbWFuZHMiLCJyZXRyaWV2ZVNoZWxsQ29tbWFuZHMiLCJnaXRTaGVsbENvbW1hbmRzIiwiZXhlY3V0ZVNoZWxsQ29tbWFuZHMiLCJwb2xsIiwic3BlY2lmaWVycyIsInNwZWNpZmllcnNMZW5ndGgiLCJsZW5ndGgiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsIm9wZXJhdGlvbnMiLCJtYXAiLCJzcGVjaWZpZXIiLCJuZXh0IiwiZG9uZSIsImNvbnRleHQiLCJpbmRleCIsInNoZWxsQ29tbWFuZHNGcm9tU3BlY2lmaWVyIiwiZXhlY3V0ZVJlcGVhdGVkbHkiLCJwb2xsZWRTcGVjaWZpZXIiLCJpbnN0YWxsIiwiaW5zdGFsbFNoZWxsQ29tbWFuZHMiLCJidWlsZCIsImlnbm9yZWRCdWlsZHMiLCJyZXRyaWV2ZUlnbm9yZWRCdWlsZHMiLCJzdWJEaXJlY3RvcnlQYXRocyIsInN1YkRpcmVjdG9yeVBhdGhzSW5jbHVkZXNTdWJEaXJlY3RvcnlQYXRoIiwiaW5jbHVkZXMiLCJidWlsZElnbm9yZWQiLCJidWlsZFNoZWxsQ29tbWFuZHMiLCJwdWJsaXNoIiwiaWdub3JlZFB1Ymxpc2hlcyIsInJldHJpZXZlSWdub3JlZFB1Ymxpc2hlcyIsIm5hbWVzIiwibmFtZXNJbmNsdWRlc05hbWUiLCJwdWJsaXNoSWdub3JlZCIsInB1Ymxpc2hTaGVsbENvbW1hbmRzIiwiYnVtcFBhdGNoTnVtYmVyIiwiY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoIiwicHJvY2VzcyIsImN3ZCIsImNoZGlyIiwiZXhlY3V0ZVByb21wdGx5IiwidXBkYXRlRGVwZW5kZW5jeVZlcnNpb24iLCJ1cGRhdGVTZW12ZXIiLCJ1cGRhdGVEZXZEZXBlbmRlbmN5VmVyc2lvbiIsImZyb21TdWJEaXJlY3RvcnlQYXRoIiwicmVsZWFzZSIsInBhY2thZ2VKU09OIiwicmVhZFBhY2thZ2VKU09ORmlsZSIsImRlcGVuZGVuY2llcyIsImRldkRlcGVuZGVuY2llcyIsIlZlcnNpb24iLCJmcm9tVmVyc2lvblN0cmluZyIsInNlbXZlciIsImV4aXN0aW5nU2VtdmVyIiwiZXhpc3RpbmdWZXJzaW9uIiwiZnJvbVN0cmluZyIsInZlcnNpb25HcmVhdGVyVGhhbkV4aXN0aW5nVmVyc2lvbiIs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