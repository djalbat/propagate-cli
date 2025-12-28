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
var _constants = require("./constants");
var _packageJSON = require("./utilities/packageJSON");
var _shell = require("./utilities/shell");
var _configuration = require("./configuration");
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
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
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var eventually = _necessary.asynchronousUtilities.eventually, parseContent = _necessary.templateUtilities.parseContent, prune = _necessary.arrayUtilities.prune, filter = _necessary.arrayUtilities.filter;
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
            key: "getDependencies",
            value: function getDependencies(names) {
                var _this = this;
                var dependencyNames = this.getDependencyNames(), devDependencyNames = this.getDevDependencyNames();
                filter(dependencyNames, function(dependencyName) {
                    var namesIncludeDependencyName = names.includes(dependencyName);
                    if (namesIncludeDependencyName) {
                        return true;
                    }
                });
                filter(devDependencyNames, function(devDependencyName) {
                    var namesIncludeDevDependencyName = names.includes(devDependencyName);
                    if (namesIncludeDevDependencyName) {
                        return true;
                    }
                });
                names = _to_consumable_array(dependencyNames).concat(_to_consumable_array(devDependencyNames));
                var dependencies = names.map(function(name) {
                    var version = _this.dependencyMap[name] || _this.devDependencyMap[name];
                    version = version.replace(/[\^~]/g, _constants.EMPTY_STRING);
                    var propagatedDependency = "".concat(name, "@").concat(version);
                    return propagatedDependency;
                });
                return dependencies;
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
            value: function poll(names, quietly, callback) {
                var dependencies = this.getDependencies(names), dependenciesLength = dependencies.length;
                if (dependenciesLength === 0) {
                    var success = true;
                    callback(success);
                    return;
                }
                dependenciesLength === 1 ? console.log("Polling for the dependency:") : console.log("Polling for the dependenies:");
                var operations = dependencies.map(function(dependency) {
                    return function(next, done, context, index) {
                        var shellCommands = shellCommandsFromDependency(dependency);
                        console.log(" - ".concat(dependency, " "));
                        (0, _shell.executeRepeatedly)(shellCommands, quietly, function(success) {
                            if (success) {
                                var polledDependency = dependency; ///
                                prune(dependencies, function(dependency) {
                                    if (dependency !== polledDependency) {
                                        return true;
                                    }
                                });
                            }
                            next();
                        });
                    };
                });
                eventually(operations, function() {
                    var dependenciesLength = dependencies.length, success = dependenciesLength === 0;
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
                    var _packageJSON_name = packageJSON.name, name = _packageJSON_name === void 0 ? null : _packageJSON_name, _packageJSON_dependencies = packageJSON.dependencies, dependencies = _packageJSON_dependencies === void 0 ? {} : _packageJSON_dependencies, _packageJSON_devDependencies = packageJSON.devDependencies, devDependencies = _packageJSON_devDependencies === void 0 ? {} : _packageJSON_devDependencies, versionString = version, dependencyMap = dependencies, devDependencyMap = devDependencies; ///
                    version = _version.default.fromVersionString(versionString);
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
function shellCommandsFromDependency(dependency) {
    var shellCommands = (0, _configuration.retrieveShellCommands)();
    var poll = shellCommands.poll, pollShellCommands = poll, args = {
        dependency: dependency
    };
    shellCommands = parseContent(pollShellCommands, args);
    return shellCommands;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWxlYXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcywgdGVtcGxhdGVVdGlsaXRpZXMsIGFzeW5jaHJvbm91c1V0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIlxuXG5pbXBvcnQgVmVyc2lvbiBmcm9tIFwiLi92ZXJzaW9uXCI7XG5cbmltcG9ydCB7IEVNUFRZX1NUUklORyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgcmVhZFBhY2thZ2VKU09ORmlsZSB9IGZyb20gXCIuL3V0aWxpdGllcy9wYWNrYWdlSlNPTlwiO1xuaW1wb3J0IHsgZXhlY3V0ZVByb21wdGx5LCBleGVjdXRlUmVwZWF0ZWRseSB9IGZyb20gXCIuL3V0aWxpdGllcy9zaGVsbFwiO1xuaW1wb3J0IHsgcmV0cmlldmVTaGVsbENvbW1hbmRzLCByZXRyaWV2ZUlnbm9yZWRCdWlsZHMsIHJldHJpZXZlSWdub3JlZFB1Ymxpc2hlcyB9IGZyb20gXCIuL2NvbmZpZ3VyYXRpb25cIjtcblxuY29uc3QgeyBldmVudHVhbGx5IH0gPSBhc3luY2hyb25vdXNVdGlsaXRpZXMsXG4gICAgICB7IHBhcnNlQ29udGVudCB9ID0gdGVtcGxhdGVVdGlsaXRpZXMsXG4gICAgICB7IHBydW5lLCBmaWx0ZXIgfSA9IGFycmF5VXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWxlYXNlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgdmVyc2lvbiwgZGVwZW5kZW5jeU1hcCwgZGV2RGVwZW5kZW5jeU1hcCwgc3ViRGlyZWN0b3J5UGF0aCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB0aGlzLmRlcGVuZGVuY3lNYXAgPSBkZXBlbmRlbmN5TWFwO1xuICAgIHRoaXMuZGV2RGVwZW5kZW5jeU1hcCA9IGRldkRlcGVuZGVuY3lNYXA7XG4gICAgdGhpcy5zdWJEaXJlY3RvcnlQYXRoID0gc3ViRGlyZWN0b3J5UGF0aDtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldFZlcnNpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbiAgfVxuXG4gIGdldERlcGVuZGVuY3lNYXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVwZW5kZW5jeU1hcDtcbiAgfVxuXG4gIGdldERldkRlcGVuZGVuY3lNYXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGV2RGVwZW5kZW5jeU1hcDtcbiAgfVxuXG4gIGdldFN1YkRpcmVjdG9yeVBhdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3ViRGlyZWN0b3J5UGF0aDtcbiAgfVxuXG4gIGlzUHVibGlzaGFibGUoKSB7XG4gICAgY29uc3QgcHVibGlzaGFibGUgPSAodGhpcy5uYW1lICE9PSBudWxsKSAmJiAodGhpcy52ZXJzaW9uICE9PSBudWxsKTtcblxuICAgIHJldHVybiBwdWJsaXNoYWJsZTtcbiAgfVxuXG4gIGdldFZlcnNpb25TdHJpbmcoKSB7XG4gICAgY29uc3QgdmVyc2lvblN0cmluZyA9IHRoaXMudmVyc2lvbi5hc1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHZlcnNpb25TdHJpbmc7IC8vL1xuICB9XG5cbiAgZ2V0RGVwZW5kZW5jeU5hbWVzKCkge1xuICAgIGNvbnN0IGRlcGVuZGVuY3lOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuZGVwZW5kZW5jeU1hcCk7XG5cbiAgICByZXR1cm4gZGVwZW5kZW5jeU5hbWVzO1xuICB9XG5cbiAgZ2V0RGV2RGVwZW5kZW5jeU5hbWVzKCkge1xuICAgIGNvbnN0IGRldkRlcGVuZGVuY3lOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuZGV2RGVwZW5kZW5jeU1hcCk7XG5cbiAgICByZXR1cm4gZGV2RGVwZW5kZW5jeU5hbWVzO1xuICB9XG5cbiAgZ2V0RGVwZW5kZW5jaWVzKG5hbWVzKSB7XG4gICAgY29uc3QgZGVwZW5kZW5jeU5hbWVzID0gdGhpcy5nZXREZXBlbmRlbmN5TmFtZXMoKSxcbiAgICAgICAgICBkZXZEZXBlbmRlbmN5TmFtZXMgPSB0aGlzLmdldERldkRlcGVuZGVuY3lOYW1lcygpO1xuXG4gICAgZmlsdGVyKGRlcGVuZGVuY3lOYW1lcywgKGRlcGVuZGVuY3lOYW1lKSA9PiB7XG4gICAgICBjb25zdCBuYW1lc0luY2x1ZGVEZXBlbmRlbmN5TmFtZSA9IG5hbWVzLmluY2x1ZGVzKGRlcGVuZGVuY3lOYW1lKTtcblxuICAgICAgaWYgKG5hbWVzSW5jbHVkZURlcGVuZGVuY3lOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZmlsdGVyKGRldkRlcGVuZGVuY3lOYW1lcywgKGRldkRlcGVuZGVuY3lOYW1lKSA9PiB7XG4gICAgICBjb25zdCBuYW1lc0luY2x1ZGVEZXZEZXBlbmRlbmN5TmFtZSA9IG5hbWVzLmluY2x1ZGVzKGRldkRlcGVuZGVuY3lOYW1lKTtcblxuICAgICAgaWYgKG5hbWVzSW5jbHVkZURldkRlcGVuZGVuY3lOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbmFtZXMgPSBbXG4gICAgICAuLi5kZXBlbmRlbmN5TmFtZXMsXG4gICAgICAuLi5kZXZEZXBlbmRlbmN5TmFtZXNcbiAgICBdO1xuXG4gICAgY29uc3QgZGVwZW5kZW5jaWVzID0gbmFtZXMubWFwKChuYW1lKSA9PiB7XG4gICAgICBsZXQgdmVyc2lvbiA9IHRoaXMuZGVwZW5kZW5jeU1hcFtuYW1lXSB8fCB0aGlzLmRldkRlcGVuZGVuY3lNYXBbbmFtZV07XG5cbiAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnJlcGxhY2UoL1tcXF5+XS9nLCBFTVBUWV9TVFJJTkcpO1xuXG4gICAgICBjb25zdCBwcm9wYWdhdGVkRGVwZW5kZW5jeSA9IGAke25hbWV9QCR7dmVyc2lvbn1gO1xuXG4gICAgICByZXR1cm4gcHJvcGFnYXRlZERlcGVuZGVuY3k7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGVwZW5kZW5jaWVzO1xuICB9XG5cbiAgZ2l0KHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gICAgbGV0IHNoZWxsQ29tbWFuZHMgPSByZXRyaWV2ZVNoZWxsQ29tbWFuZHMoKTtcblxuICAgIGNvbnN0IHsgZ2l0IH0gPSBzaGVsbENvbW1hbmRzLFxuICAgICAgZ2l0U2hlbGxDb21tYW5kcyA9IGdpdDtcblxuICAgIHNoZWxsQ29tbWFuZHMgPSBnaXRTaGVsbENvbW1hbmRzOyAvLy9cblxuICAgIHRoaXMuZXhlY3V0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcG9sbChuYW1lcywgcXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSB0aGlzLmdldERlcGVuZGVuY2llcyhuYW1lcyksXG4gICAgICAgICAgZGVwZW5kZW5jaWVzTGVuZ3RoID0gZGVwZW5kZW5jaWVzLmxlbmd0aDtcblxuICAgIGlmIChkZXBlbmRlbmNpZXNMZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICBjYWxsYmFjayhzdWNjZXNzKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIChkZXBlbmRlbmNpZXNMZW5ndGggPT09IDEpID9cbiAgICAgIGNvbnNvbGUubG9nKGBQb2xsaW5nIGZvciB0aGUgZGVwZW5kZW5jeTpgKSA6XG4gICAgICAgIGNvbnNvbGUubG9nKGBQb2xsaW5nIGZvciB0aGUgZGVwZW5kZW5pZXM6YCk7XG5cbiAgICBjb25zdCBvcGVyYXRpb25zID0gZGVwZW5kZW5jaWVzLm1hcCgoZGVwZW5kZW5jeSkgPT4ge1xuICAgICAgcmV0dXJuIChuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBzaGVsbENvbW1hbmRzID0gc2hlbGxDb21tYW5kc0Zyb21EZXBlbmRlbmN5KGRlcGVuZGVuY3kpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGAgLSAke2RlcGVuZGVuY3l9IGApO1xuXG4gICAgICAgIGV4ZWN1dGVSZXBlYXRlZGx5KHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvbGxlZERlcGVuZGVuY3kgPSBkZXBlbmRlbmN5OyAvLy9cblxuICAgICAgICAgICAgcHJ1bmUoZGVwZW5kZW5jaWVzLCAoZGVwZW5kZW5jeSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGVwZW5kZW5jeSAhPT0gcG9sbGVkRGVwZW5kZW5jeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGV2ZW50dWFsbHkob3BlcmF0aW9ucywgKCkgPT4ge1xuICAgICAgY29uc3QgZGVwZW5kZW5jaWVzTGVuZ3RoID0gZGVwZW5kZW5jaWVzLmxlbmd0aCxcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSAoZGVwZW5kZW5jaWVzTGVuZ3RoID09PSAwKTtcblxuICAgICAgY2FsbGJhY2soc3VjY2Vzcyk7XG4gICAgfSk7XG4gIH1cblxuICBpbnN0YWxsKHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gICAgbGV0IHNoZWxsQ29tbWFuZHMgPSByZXRyaWV2ZVNoZWxsQ29tbWFuZHMoKTtcblxuICAgIGNvbnN0IHsgaW5zdGFsbCB9ID0gc2hlbGxDb21tYW5kcyxcbiAgICAgICAgICBpbnN0YWxsU2hlbGxDb21tYW5kcyA9IGluc3RhbGw7XG5cbiAgICBzaGVsbENvbW1hbmRzID0gaW5zdGFsbFNoZWxsQ29tbWFuZHM7IC8vL1xuXG4gICAgdGhpcy5leGVjdXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjayk7XG4gIH1cblxuICBidWlsZChxdWlldGx5LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGlnbm9yZWRCdWlsZHMgPSByZXRyaWV2ZUlnbm9yZWRCdWlsZHMoKSxcbiAgICAgICAgICBzdWJEaXJlY3RvcnlQYXRocyA9IGlnbm9yZWRCdWlsZHMsXG4gICAgICAgICAgc3ViRGlyZWN0b3J5UGF0aHNJbmNsdWRlc1N1YkRpcmVjdG9yeVBhdGggPSBzdWJEaXJlY3RvcnlQYXRocy5pbmNsdWRlcyh0aGlzLnN1YkRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgIGJ1aWxkSWdub3JlZCA9IHN1YkRpcmVjdG9yeVBhdGhzSW5jbHVkZXNTdWJEaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgIGlmIChidWlsZElnbm9yZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBJZ25vcmluZyB0aGUgJyR7dGhpcy5zdWJEaXJlY3RvcnlQYXRofScgYnVpbGQuYCk7XG5cbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICBjYWxsYmFjayhzdWNjZXNzKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzaGVsbENvbW1hbmRzID0gcmV0cmlldmVTaGVsbENvbW1hbmRzKCk7XG5cbiAgICBjb25zdCB7IGJ1aWxkIH0gPSBzaGVsbENvbW1hbmRzLFxuICAgICAgICAgIGJ1aWxkU2hlbGxDb21tYW5kcyA9IGJ1aWxkO1xuXG4gICAgc2hlbGxDb21tYW5kcyA9IGJ1aWxkU2hlbGxDb21tYW5kczsgLy8vXG5cbiAgICB0aGlzLmV4ZWN1dGVTaGVsbENvbW1hbmRzKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1Ymxpc2gocXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBpZ25vcmVkUHVibGlzaGVzID0gcmV0cmlldmVJZ25vcmVkUHVibGlzaGVzKCksXG4gICAgICAgICAgbmFtZXMgPSBpZ25vcmVkUHVibGlzaGVzLFxuICAgICAgICAgIG5hbWVzSW5jbHVkZXNOYW1lID0gbmFtZXMuaW5jbHVkZXModGhpcy5uYW1lKSxcbiAgICAgICAgICBwdWJsaXNoSWdub3JlZCA9IG5hbWVzSW5jbHVkZXNOYW1lOyAvLy9cblxuICAgIGlmIChwdWJsaXNoSWdub3JlZCkge1xuICAgICAgY29uc29sZS5sb2coYElnbm9yaW5nIHRoZSAnJHt0aGlzLm5hbWV9JyBwdWJsaXNoLmApO1xuXG4gICAgICBjb25zdCBzdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgY2FsbGJhY2soc3VjY2Vzcyk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc2hlbGxDb21tYW5kcyA9IHJldHJpZXZlU2hlbGxDb21tYW5kcygpO1xuXG4gICAgY29uc3QgeyBwdWJsaXNoIH0gPSBzaGVsbENvbW1hbmRzLFxuICAgICAgICAgIHB1Ymxpc2hTaGVsbENvbW1hbmRzID0gcHVibGlzaDtcblxuICAgIHNoZWxsQ29tbWFuZHMgPSBwdWJsaXNoU2hlbGxDb21tYW5kczsgLy8vXG5cbiAgICB0aGlzLmV4ZWN1dGVTaGVsbENvbW1hbmRzKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGJ1bXBQYXRjaE51bWJlcigpIHsgdGhpcy52ZXJzaW9uLmJ1bXBQYXRjaE51bWJlcigpOyB9XG5cbiAgZXhlY3V0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBjdXJyZW50V29ya2luZ0RpcmVjdG9yeVBhdGggPSBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgcHJvY2Vzcy5jaGRpcih0aGlzLnN1YkRpcmVjdG9yeVBhdGgpO1xuXG4gICAgZXhlY3V0ZVByb21wdGx5KHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIChzdWNjZXNzKSA9PiB7XG4gICAgICBwcm9jZXNzLmNoZGlyKGN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRGVwZW5kZW5jeVZlcnNpb24obmFtZSwgdmVyc2lvblN0cmluZykge1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSB1cGRhdGVTZW12ZXIobmFtZSwgdmVyc2lvblN0cmluZywgdGhpcy5kZXBlbmRlbmN5TWFwKTtcblxuICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgY29uc29sZS5sb2coYEVpdGhlciB0aGUgdmVyc2lvbiBvZiB0aGUgJyR7dGhpcy5zdWJEaXJlY3RvcnlQYXRofScgcmVsZWFzZSdzICcke25hbWV9JyBkZXBlbmRlbmN5IGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgcHJvcGFnYXRlZCAnJHt2ZXJzaW9uU3RyaW5nfScgdmVyc2lvbiBvciBpdCBjYW5ub3QgYmUgcGFyc2VkLmApO1xuICAgIH1cblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgdXBkYXRlRGV2RGVwZW5kZW5jeVZlcnNpb24obmFtZSwgdmVyc2lvblN0cmluZykge1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSB1cGRhdGVTZW12ZXIobmFtZSwgdmVyc2lvblN0cmluZywgdGhpcy5kZXZEZXBlbmRlbmN5TWFwKTtcblxuICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgY29uc29sZS5sb2coYEVpdGhlciB0aGUgdmVyc2lvbiBvZiB0aGUgJyR7dGhpcy5zdWJEaXJlY3RvcnlQYXRofScgcmVsZWFzZSdzICcke25hbWV9JyBkZXZlbG9wZXIgZGVwZW5kZW5jeSBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHByb3BhZ2F0ZWQgJyR7dmVyc2lvblN0cmluZ30nIHZlcnNpb24gb3IgaXQgY2Fubm90IGJlIHBhcnNlZC5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tU3ViRGlyZWN0b3J5UGF0aChzdWJEaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IHJlbGVhc2UgPSBudWxsO1xuXG4gICAgY29uc3QgcGFja2FnZUpTT04gPSByZWFkUGFja2FnZUpTT05GaWxlKHN1YkRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHBhY2thZ2VKU09OICE9PSBudWxsKSB7XG4gICAgICBsZXQgeyB2ZXJzaW9uID0gbnVsbCB9ID0gcGFja2FnZUpTT047XG5cbiAgICAgIGNvbnN0IHsgbmFtZSA9IG51bGwsIGRlcGVuZGVuY2llcyA9IHt9LCBkZXZEZXBlbmRlbmNpZXMgPSB7fSB9ID0gcGFja2FnZUpTT04sXG4gICAgICAgICAgICB2ZXJzaW9uU3RyaW5nID0gdmVyc2lvbiwgIC8vL1xuICAgICAgICAgICAgZGVwZW5kZW5jeU1hcCA9IGRlcGVuZGVuY2llcywgLy8vXG4gICAgICAgICAgICBkZXZEZXBlbmRlbmN5TWFwID0gZGV2RGVwZW5kZW5jaWVzOyAvLy9cblxuICAgICAgdmVyc2lvbiA9IFZlcnNpb24uZnJvbVZlcnNpb25TdHJpbmcodmVyc2lvblN0cmluZyk7XG5cbiAgICAgIHJlbGVhc2UgPSBuZXcgUmVsZWFzZShuYW1lLCB2ZXJzaW9uLCBkZXBlbmRlbmN5TWFwLCBkZXZEZXBlbmRlbmN5TWFwLCBzdWJEaXJlY3RvcnlQYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVsZWFzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVTZW12ZXIobmFtZSwgdmVyc2lvblN0cmluZywgbWFwKSB7XG4gIGxldCBzdWNjZXNzID0gZmFsc2U7XG5cbiAgbGV0IHNlbXZlciA9IG1hcFtuYW1lXSB8fCBudWxsO1xuXG4gIGNvbnN0IHZlcnNpb24gPSBWZXJzaW9uLmZyb21WZXJzaW9uU3RyaW5nKHZlcnNpb25TdHJpbmcpLFxuICAgICAgICBleGlzdGluZ1NlbXZlciA9IHNlbXZlciwgLy8vXG4gICAgICAgIGV4aXN0aW5nVmVyc2lvbiA9IFZlcnNpb24uZnJvbVN0cmluZyhleGlzdGluZ1NlbXZlcik7XG5cbiAgaWYgKGV4aXN0aW5nVmVyc2lvbiAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHZlcnNpb25HcmVhdGVyVGhhbkV4aXN0aW5nVmVyc2lvbiA9IHZlcnNpb24uaXNHcmVhdGVyVGhhbihleGlzdGluZ1ZlcnNpb24pO1xuXG4gICAgc3VjY2VzcyA9IHZlcnNpb25HcmVhdGVyVGhhbkV4aXN0aW5nVmVyc2lvbjsgIC8vL1xuXG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIHNlbXZlciA9IHZlcnNpb24udXBkYXRlU2VtdmVyKHNlbXZlcik7XG5cbiAgICAgIG1hcFtuYW1lXSA9IHNlbXZlcjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VjY2Vzcztcbn1cblxuZnVuY3Rpb24gc2hlbGxDb21tYW5kc0Zyb21EZXBlbmRlbmN5KGRlcGVuZGVuY3kpIHtcbiAgbGV0IHNoZWxsQ29tbWFuZHMgPSByZXRyaWV2ZVNoZWxsQ29tbWFuZHMoKTtcblxuICBjb25zdCB7IHBvbGwgfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICAgIHBvbGxTaGVsbENvbW1hbmRzID0gcG9sbCwgLy8vXG4gICAgICAgIGFyZ3MgPSB7XG4gICAgICAgICAgZGVwZW5kZW5jeVxuICAgICAgICB9O1xuXG4gIHNoZWxsQ29tbWFuZHMgPSBwYXJzZUNvbnRlbnQocG9sbFNoZWxsQ29tbWFuZHMsIGFyZ3MpO1xuXG4gIHJldHVybiBzaGVsbENvbW1hbmRzO1xufVxuIl0sIm5hbWVzIjpbIlJlbGVhc2UiLCJldmVudHVhbGx5IiwiYXN5bmNocm9ub3VzVXRpbGl0aWVzIiwicGFyc2VDb250ZW50IiwidGVtcGxhdGVVdGlsaXRpZXMiLCJwcnVuZSIsImFycmF5VXRpbGl0aWVzIiwiZmlsdGVyIiwibmFtZSIsInZlcnNpb24iLCJkZXBlbmRlbmN5TWFwIiwiZGV2RGVwZW5kZW5jeU1hcCIsInN1YkRpcmVjdG9yeVBhdGgiLCJnZXROYW1lIiwiZ2V0VmVyc2lvbiIsImdldERlcGVuZGVuY3lNYXAiLCJnZXREZXZEZXBlbmRlbmN5TWFwIiwiZ2V0U3ViRGlyZWN0b3J5UGF0aCIsImlzUHVibGlzaGFibGUiLCJwdWJsaXNoYWJsZSIsImdldFZlcnNpb25TdHJpbmciLCJ2ZXJzaW9uU3RyaW5nIiwiYXNTdHJpbmciLCJnZXREZXBlbmRlbmN5TmFtZXMiLCJkZXBlbmRlbmN5TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwiZ2V0RGV2RGVwZW5kZW5jeU5hbWVzIiwiZGV2RGVwZW5kZW5jeU5hbWVzIiwiZ2V0RGVwZW5kZW5jaWVzIiwibmFtZXMiLCJkZXBlbmRlbmN5TmFtZSIsIm5hbWVzSW5jbHVkZURlcGVuZGVuY3lOYW1lIiwiaW5jbHVkZXMiLCJkZXZEZXBlbmRlbmN5TmFtZSIsIm5hbWVzSW5jbHVkZURldkRlcGVuZGVuY3lOYW1lIiwiZGVwZW5kZW5jaWVzIiwibWFwIiwicmVwbGFjZSIsIkVNUFRZX1NUUklORyIsInByb3BhZ2F0ZWREZXBlbmRlbmN5IiwiZ2l0IiwicXVpZXRseSIsImNhbGxiYWNrIiwic2hlbGxDb21tYW5kcyIsInJldHJpZXZlU2hlbGxDb21tYW5kcyIsImdpdFNoZWxsQ29tbWFuZHMiLCJleGVjdXRlU2hlbGxDb21tYW5kcyIsInBvbGwiLCJkZXBlbmRlbmNpZXNMZW5ndGgiLCJsZW5ndGgiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsIm9wZXJhdGlvbnMiLCJkZXBlbmRlbmN5IiwibmV4dCIsImRvbmUiLCJjb250ZXh0IiwiaW5kZXgiLCJzaGVsbENvbW1hbmRzRnJvbURlcGVuZGVuY3kiLCJleGVjdXRlUmVwZWF0ZWRseSIsInBvbGxlZERlcGVuZGVuY3kiLCJpbnN0YWxsIiwiaW5zdGFsbFNoZWxsQ29tbWFuZHMiLCJidWlsZCIsImlnbm9yZWRCdWlsZHMiLCJyZXRyaWV2ZUlnbm9yZWRCdWlsZHMiLCJzdWJEaXJlY3RvcnlQYXRocyIsInN1YkRpcmVjdG9yeVBhdGhzSW5jbHVkZXNTdWJEaXJlY3RvcnlQYXRoIiwiYnVpbGRJZ25vcmVkIiwiYnVpbGRTaGVsbENvbW1hbmRzIiwicHVibGlzaCIsImlnbm9yZWRQdWJsaXNoZXMiLCJyZXRyaWV2ZUlnbm9yZWRQdWJsaXNoZXMiLCJuYW1lc0luY2x1ZGVzTmFtZSIsInB1Ymxpc2hJZ25vcmVkIiwicHVibGlzaFNoZWxsQ29tbWFuZHMiLCJidW1wUGF0Y2hOdW1iZXIiLCJjdXJyZW50V29ya2luZ0RpcmVjdG9yeVBhdGgiLCJwcm9jZXNzIiwiY3dkIiwiY2hkaXIiLCJleGVjdXRlUHJvbXB0bHkiLCJ1cGRhdGVEZXBlbmRlbmN5VmVyc2lvbiIsInVwZGF0ZVNlbXZlciIsInVwZGF0ZURldkRlcGVuZGVuY3lWZXJzaW9uIiwiZnJvbVN1YkRpcmVjdG9yeVBhdGgiLCJyZWxlYXNlIiwicGFja2FnZUpTT04iLCJyZWFkUGFja2FnZUpTT05GaWxlIiwiZGV2RGVwZW5kZW5jaWVzIiwiVmVyc2lvbiIsImZyb21WZXJzaW9uU3RyaW5nIiwic2VtdmVyIiwiZXhpc3RpbmdTZW12ZXIiLCJleGlzdGluZ1ZlcnNpb24iLCJmcm9tU3RyaW5nIiwidmVyc2lvbkdyZWF0ZXJUaGFuRXhpc3RpbmdWZXJzaW9uIiwiaXNHcmVhdGVyVGhhbiIsInBvbGxTaGVsbENvbW1hbmRzIiwiYXJncyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7ZUFlcUJBOzs7eUJBYm9EOzhEQUVyRDt5QkFFUzsyQkFDTztxQkFDZTs2QkFDb0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXZGLElBQU0sQUFBRUMsYUFBZUMsZ0NBQXFCLENBQXBDRCxZQUNGLEFBQUVFLGVBQWlCQyw0QkFBaUIsQ0FBbENELGNBQ0FFLFFBQWtCQyx5QkFBYyxDQUFoQ0QsT0FBT0UsU0FBV0QseUJBQWMsQ0FBekJDO0FBRUEsSUFBQSxBQUFNUCx3QkFBTjthQUFNQSxRQUNQUSxJQUFJLEVBQUVDLE9BQU8sRUFBRUMsYUFBYSxFQUFFQyxnQkFBZ0IsRUFBRUMsZ0JBQWdCO2dDQUR6RFo7UUFFakIsSUFBSSxDQUFDUSxJQUFJLEdBQUdBO1FBQ1osSUFBSSxDQUFDQyxPQUFPLEdBQUdBO1FBQ2YsSUFBSSxDQUFDQyxhQUFhLEdBQUdBO1FBQ3JCLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUdBO1FBQ3hCLElBQUksQ0FBQ0MsZ0JBQWdC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