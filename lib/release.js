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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWxlYXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcywgdGVtcGxhdGVVdGlsaXRpZXMsIGFzeW5jaHJvbm91c1V0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIlxuXG5pbXBvcnQgVmVyc2lvbiBmcm9tIFwiLi92ZXJzaW9uXCI7XG5cbmltcG9ydCB7IEVNUFRZX1NUUklORyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgcmVhZFBhY2thZ2VKU09ORmlsZSB9IGZyb20gXCIuL3V0aWxpdGllcy9wYWNrYWdlSlNPTlwiO1xuaW1wb3J0IHsgZXhlY3V0ZVByb21wdGx5LCBleGVjdXRlUmVwZWF0ZWRseSB9IGZyb20gXCIuL3V0aWxpdGllcy9zaGVsbFwiO1xuaW1wb3J0IHsgcmV0cmlldmVTaGVsbENvbW1hbmRzLCByZXRyaWV2ZUlnbm9yZWRCdWlsZHMsIHJldHJpZXZlSWdub3JlZFB1Ymxpc2hlcyB9IGZyb20gXCIuL2NvbmZpZ3VyYXRpb25cIjtcblxuY29uc3QgeyBldmVudHVhbGx5IH0gPSBhc3luY2hyb25vdXNVdGlsaXRpZXMsXG4gICAgICB7IHBhcnNlQ29udGVudCB9ID0gdGVtcGxhdGVVdGlsaXRpZXMsXG4gICAgICB7IHBydW5lLCBmaWx0ZXIgfSA9IGFycmF5VXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWxlYXNlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgdmVyc2lvbiwgZGVwZW5kZW5jeU1hcCwgZGV2RGVwZW5kZW5jeU1hcCwgc3ViRGlyZWN0b3J5UGF0aCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB0aGlzLmRlcGVuZGVuY3lNYXAgPSBkZXBlbmRlbmN5TWFwO1xuICAgIHRoaXMuZGV2RGVwZW5kZW5jeU1hcCA9IGRldkRlcGVuZGVuY3lNYXA7XG4gICAgdGhpcy5zdWJEaXJlY3RvcnlQYXRoID0gc3ViRGlyZWN0b3J5UGF0aDtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldFZlcnNpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbiAgfVxuXG4gIGdldERlcGVuZGVuY3lNYXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVwZW5kZW5jeU1hcDtcbiAgfVxuXG4gIGdldERldkRlcGVuZGVuY3lNYXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGV2RGVwZW5kZW5jeU1hcDtcbiAgfVxuXG4gIGdldFN1YkRpcmVjdG9yeVBhdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3ViRGlyZWN0b3J5UGF0aDtcbiAgfVxuXG4gIGlzUHVibGlzaGFibGUoKSB7XG4gICAgY29uc3QgcHVibGlzaGFibGUgPSAodGhpcy5uYW1lICE9PSBudWxsKSAmJiAodGhpcy52ZXJzaW9uICE9PSBudWxsKTtcblxuICAgIHJldHVybiBwdWJsaXNoYWJsZTtcbiAgfVxuXG4gIGdldFZlcnNpb25TdHJpbmcoKSB7XG4gICAgY29uc3QgdmVyc2lvblN0cmluZyA9IHRoaXMudmVyc2lvbi5hc1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHZlcnNpb25TdHJpbmc7IC8vL1xuICB9XG5cbiAgZ2V0RGVwZW5kZW5jeU5hbWVzKCkge1xuICAgIGNvbnN0IGRlcGVuZGVuY3lOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuZGVwZW5kZW5jeU1hcCk7XG5cbiAgICByZXR1cm4gZGVwZW5kZW5jeU5hbWVzO1xuICB9XG5cbiAgZ2V0RGV2RGVwZW5kZW5jeU5hbWVzKCkge1xuICAgIGNvbnN0IGRldkRlcGVuZGVuY3lOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuZGV2RGVwZW5kZW5jeU1hcCk7XG5cbiAgICByZXR1cm4gZGV2RGVwZW5kZW5jeU5hbWVzO1xuICB9XG5cbiAgZ2V0RGVwZW5kZW5jaWVzKG5hbWVzKSB7XG4gICAgY29uc3QgZGVwZW5kZW5jeU5hbWVzID0gdGhpcy5nZXREZXBlbmRlbmN5TmFtZXMoKSxcbiAgICAgICAgICBkZXZEZXBlbmRlbmN5TmFtZXMgPSB0aGlzLmdldERldkRlcGVuZGVuY3lOYW1lcygpO1xuXG4gICAgZmlsdGVyKGRlcGVuZGVuY3lOYW1lcywgKGRlcGVuZGVuY3lOYW1lKSA9PiB7XG4gICAgICBjb25zdCBuYW1lc0luY2x1ZGVEZXBlbmRlbmN5TmFtZSA9IG5hbWVzLmluY2x1ZGVzKGRlcGVuZGVuY3lOYW1lKTtcblxuICAgICAgaWYgKG5hbWVzSW5jbHVkZURlcGVuZGVuY3lOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZmlsdGVyKGRldkRlcGVuZGVuY3lOYW1lcywgKGRldkRlcGVuZGVuY3lOYW1lKSA9PiB7XG4gICAgICBjb25zdCBuYW1lc0luY2x1ZGVEZXZEZXBlbmRlbmN5TmFtZSA9IG5hbWVzLmluY2x1ZGVzKGRldkRlcGVuZGVuY3lOYW1lKTtcblxuICAgICAgaWYgKG5hbWVzSW5jbHVkZURldkRlcGVuZGVuY3lOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbmFtZXMgPSBbXG4gICAgICAuLi5kZXBlbmRlbmN5TmFtZXMsXG4gICAgICAuLi5kZXZEZXBlbmRlbmN5TmFtZXNcbiAgICBdO1xuXG4gICAgY29uc3QgZGVwZW5kZW5jaWVzID0gbmFtZXMubWFwKChuYW1lKSA9PiB7XG4gICAgICBsZXQgdmVyc2lvbiA9IHRoaXMuZGVwZW5kZW5jeU1hcFtuYW1lXSB8fCB0aGlzLmRldkRlcGVuZGVuY3lNYXBbbmFtZV07XG5cbiAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnJlcGxhY2UoL1tcXF5+XS9nLCBFTVBUWV9TVFJJTkcpO1xuXG4gICAgICBjb25zdCBwcm9wYWdhdGVkRGVwZW5kZW5jeSA9IGAke25hbWV9QCR7dmVyc2lvbn1gO1xuXG4gICAgICByZXR1cm4gcHJvcGFnYXRlZERlcGVuZGVuY3k7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGVwZW5kZW5jaWVzO1xuICB9XG5cbiAgZ2l0KHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gICAgbGV0IHNoZWxsQ29tbWFuZHMgPSByZXRyaWV2ZVNoZWxsQ29tbWFuZHMoKTtcblxuICAgIGNvbnN0IHsgZ2l0IH0gPSBzaGVsbENvbW1hbmRzLFxuICAgICAgZ2l0U2hlbGxDb21tYW5kcyA9IGdpdDtcblxuICAgIHNoZWxsQ29tbWFuZHMgPSBnaXRTaGVsbENvbW1hbmRzOyAvLy9cblxuICAgIHRoaXMuZXhlY3V0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcG9sbChuYW1lcywgcXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSB0aGlzLmdldERlcGVuZGVuY2llcyhuYW1lcyksXG4gICAgICAgICAgZGVwZW5kZW5jaWVzTGVuZ3RoID0gZGVwZW5kZW5jaWVzLmxlbmd0aDtcblxuICAgIGlmIChkZXBlbmRlbmNpZXNMZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICBjYWxsYmFjayhzdWNjZXNzKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIChkZXBlbmRlbmNpZXNMZW5ndGggPT09IDEpID9cbiAgICAgIGNvbnNvbGUubG9nKGBQb2xsaW5nIGZvciB0aGUgZGVwZW5kZW5jeTpgKSA6XG4gICAgICAgIGNvbnNvbGUubG9nKGBQb2xsaW5nIGZvciB0aGUgZGVwZW5kZW5pZXM6YCk7XG5cbiAgICBjb25zdCBvcGVyYXRpb25zID0gZGVwZW5kZW5jaWVzLm1hcCgoZGVwZW5kZW5jeSkgPT4ge1xuICAgICAgcmV0dXJuIChuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBzaGVsbENvbW1hbmRzID0gc2hlbGxDb21tYW5kc0Zyb21EZXBlbmRlbmN5KGRlcGVuZGVuY3kpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGAgLSAke2RlcGVuZGVuY3l9IGApO1xuXG4gICAgICAgIGV4ZWN1dGVSZXBlYXRlZGx5KHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvbGxlZERlcGVuZGVuY3kgPSBkZXBlbmRlbmN5OyAvLy9cblxuICAgICAgICAgICAgcHJ1bmUoZGVwZW5kZW5jaWVzLCAoZGVwZW5kZW5jeSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGVwZW5kZW5jeSAhPT0gcG9sbGVkRGVwZW5kZW5jeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGV2ZW50dWFsbHkob3BlcmF0aW9ucywgKCkgPT4ge1xuICAgICAgY29uc3QgZGVwZW5kZW5jaWVzTGVuZ3RoID0gZGVwZW5kZW5jaWVzLmxlbmd0aCxcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSAoZGVwZW5kZW5jaWVzTGVuZ3RoID09PSAwKTtcblxuICAgICAgY2FsbGJhY2soc3VjY2Vzcyk7XG4gICAgfSk7XG4gIH1cblxuICBpbnN0YWxsKHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gICAgbGV0IHNoZWxsQ29tbWFuZHMgPSByZXRyaWV2ZVNoZWxsQ29tbWFuZHMoKTtcblxuICAgIGNvbnN0IHsgaW5zdGFsbCB9ID0gc2hlbGxDb21tYW5kcyxcbiAgICAgICAgICBpbnN0YWxsU2hlbGxDb21tYW5kcyA9IGluc3RhbGw7XG5cbiAgICBzaGVsbENvbW1hbmRzID0gaW5zdGFsbFNoZWxsQ29tbWFuZHM7IC8vL1xuXG4gICAgdGhpcy5leGVjdXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjayk7XG4gIH1cblxuICBidWlsZChxdWlldGx5LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGlnbm9yZWRCdWlsZHMgPSByZXRyaWV2ZUlnbm9yZWRCdWlsZHMoKSxcbiAgICAgICAgICBzdWJEaXJlY3RvcnlQYXRocyA9IGlnbm9yZWRCdWlsZHMsICAvLy9cbiAgICAgICAgICBzdWJEaXJlY3RvcnlQYXRoc0luY2x1ZGVzU3ViRGlyZWN0b3J5UGF0aCA9IHN1YkRpcmVjdG9yeVBhdGhzLmluY2x1ZGVzKHRoaXMuc3ViRGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgYnVpbGRJZ25vcmVkID0gc3ViRGlyZWN0b3J5UGF0aHNJbmNsdWRlc1N1YkRpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgaWYgKGJ1aWxkSWdub3JlZCkge1xuICAgICAgY29uc29sZS5sb2coYElnbm9yaW5nIHRoZSAnJHt0aGlzLnN1YkRpcmVjdG9yeVBhdGh9JyBidWlsZC5gKTtcblxuICAgICAgY29uc3Qgc3VjY2VzcyA9IHRydWU7XG5cbiAgICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHNoZWxsQ29tbWFuZHMgPSByZXRyaWV2ZVNoZWxsQ29tbWFuZHMoKTtcblxuICAgIGNvbnN0IHsgYnVpbGQgfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICAgICAgYnVpbGRTaGVsbENvbW1hbmRzID0gYnVpbGQ7XG5cbiAgICBzaGVsbENvbW1hbmRzID0gYnVpbGRTaGVsbENvbW1hbmRzOyAvLy9cblxuICAgIHRoaXMuZXhlY3V0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGlzaChxdWlldGx5LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGlnbm9yZWRQdWJsaXNoZXMgPSByZXRyaWV2ZUlnbm9yZWRQdWJsaXNoZXMoKSxcbiAgICAgICAgICBuYW1lcyA9IGlnbm9yZWRQdWJsaXNoZXMsXG4gICAgICAgICAgbmFtZXNJbmNsdWRlc05hbWUgPSBuYW1lcy5pbmNsdWRlcyh0aGlzLm5hbWUpLFxuICAgICAgICAgIHB1Ymxpc2hJZ25vcmVkID0gbmFtZXNJbmNsdWRlc05hbWU7IC8vL1xuXG4gICAgaWYgKHB1Ymxpc2hJZ25vcmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhgSWdub3JpbmcgdGhlICcke3RoaXMubmFtZX0nIHB1Ymxpc2guYCk7XG5cbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICBjYWxsYmFjayhzdWNjZXNzKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzaGVsbENvbW1hbmRzID0gcmV0cmlldmVTaGVsbENvbW1hbmRzKCk7XG5cbiAgICBjb25zdCB7IHB1Ymxpc2ggfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICAgICAgcHVibGlzaFNoZWxsQ29tbWFuZHMgPSBwdWJsaXNoO1xuXG4gICAgc2hlbGxDb21tYW5kcyA9IHB1Ymxpc2hTaGVsbENvbW1hbmRzOyAvLy9cblxuICAgIHRoaXMuZXhlY3V0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgY2FsbGJhY2spO1xuICB9XG5cbiAgYnVtcFBhdGNoTnVtYmVyKCkgeyB0aGlzLnZlcnNpb24uYnVtcFBhdGNoTnVtYmVyKCk7IH1cblxuICBleGVjdXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aCA9IHByb2Nlc3MuY3dkKCk7XG5cbiAgICBwcm9jZXNzLmNoZGlyKHRoaXMuc3ViRGlyZWN0b3J5UGF0aCk7XG5cbiAgICBleGVjdXRlUHJvbXB0bHkoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgKHN1Y2Nlc3MpID0+IHtcbiAgICAgIHByb2Nlc3MuY2hkaXIoY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoKTtcblxuICAgICAgY2FsbGJhY2soc3VjY2Vzcyk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVEZXBlbmRlbmN5VmVyc2lvbihuYW1lLCB2ZXJzaW9uU3RyaW5nKSB7XG4gICAgY29uc3Qgc3VjY2VzcyA9IHVwZGF0ZVNlbXZlcihuYW1lLCB2ZXJzaW9uU3RyaW5nLCB0aGlzLmRlcGVuZGVuY3lNYXApO1xuXG4gICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICBjb25zb2xlLmxvZyhgRWl0aGVyIHRoZSB2ZXJzaW9uIG9mIHRoZSAnJHt0aGlzLnN1YkRpcmVjdG9yeVBhdGh9JyByZWxlYXNlJ3MgJyR7bmFtZX0nIGRlcGVuZGVuY3kgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBwcm9wYWdhdGVkICcke3ZlcnNpb25TdHJpbmd9JyB2ZXJzaW9uIG9yIGl0IGNhbm5vdCBiZSBwYXJzZWQuYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICB1cGRhdGVEZXZEZXBlbmRlbmN5VmVyc2lvbihuYW1lLCB2ZXJzaW9uU3RyaW5nKSB7XG4gICAgY29uc3Qgc3VjY2VzcyA9IHVwZGF0ZVNlbXZlcihuYW1lLCB2ZXJzaW9uU3RyaW5nLCB0aGlzLmRldkRlcGVuZGVuY3lNYXApO1xuXG4gICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICBjb25zb2xlLmxvZyhgRWl0aGVyIHRoZSB2ZXJzaW9uIG9mIHRoZSAnJHt0aGlzLnN1YkRpcmVjdG9yeVBhdGh9JyByZWxlYXNlJ3MgJyR7bmFtZX0nIGRldmVsb3BlciBkZXBlbmRlbmN5IGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgcHJvcGFnYXRlZCAnJHt2ZXJzaW9uU3RyaW5nfScgdmVyc2lvbiBvciBpdCBjYW5ub3QgYmUgcGFyc2VkLmApO1xuICAgIH1cblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgc3RhdGljIGZyb21TdWJEaXJlY3RvcnlQYXRoKHN1YkRpcmVjdG9yeVBhdGgpIHtcbiAgICBsZXQgcmVsZWFzZSA9IG51bGw7XG5cbiAgICBjb25zdCBwYWNrYWdlSlNPTiA9IHJlYWRQYWNrYWdlSlNPTkZpbGUoc3ViRGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAocGFja2FnZUpTT04gIT09IG51bGwpIHtcbiAgICAgIGxldCB7IHZlcnNpb24gPSBudWxsIH0gPSBwYWNrYWdlSlNPTjtcblxuICAgICAgY29uc3QgeyBuYW1lID0gbnVsbCwgZGVwZW5kZW5jaWVzID0ge30sIGRldkRlcGVuZGVuY2llcyA9IHt9IH0gPSBwYWNrYWdlSlNPTixcbiAgICAgICAgICAgIHZlcnNpb25TdHJpbmcgPSB2ZXJzaW9uLCAgLy8vXG4gICAgICAgICAgICBkZXBlbmRlbmN5TWFwID0gZGVwZW5kZW5jaWVzLCAvLy9cbiAgICAgICAgICAgIGRldkRlcGVuZGVuY3lNYXAgPSBkZXZEZXBlbmRlbmNpZXM7IC8vL1xuXG4gICAgICB2ZXJzaW9uID0gVmVyc2lvbi5mcm9tVmVyc2lvblN0cmluZyh2ZXJzaW9uU3RyaW5nKTtcblxuICAgICAgcmVsZWFzZSA9IG5ldyBSZWxlYXNlKG5hbWUsIHZlcnNpb24sIGRlcGVuZGVuY3lNYXAsIGRldkRlcGVuZGVuY3lNYXAsIHN1YkRpcmVjdG9yeVBhdGgpO1xuICAgIH1cblxuICAgIHJldHVybiByZWxlYXNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNlbXZlcihuYW1lLCB2ZXJzaW9uU3RyaW5nLCBtYXApIHtcbiAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICBsZXQgc2VtdmVyID0gbWFwW25hbWVdIHx8IG51bGw7XG5cbiAgY29uc3QgdmVyc2lvbiA9IFZlcnNpb24uZnJvbVZlcnNpb25TdHJpbmcodmVyc2lvblN0cmluZyksXG4gICAgICAgIGV4aXN0aW5nU2VtdmVyID0gc2VtdmVyLCAvLy9cbiAgICAgICAgZXhpc3RpbmdWZXJzaW9uID0gVmVyc2lvbi5mcm9tU3RyaW5nKGV4aXN0aW5nU2VtdmVyKTtcblxuICBpZiAoZXhpc3RpbmdWZXJzaW9uICE9PSBudWxsKSB7XG4gICAgY29uc3QgdmVyc2lvbkdyZWF0ZXJUaGFuRXhpc3RpbmdWZXJzaW9uID0gdmVyc2lvbi5pc0dyZWF0ZXJUaGFuKGV4aXN0aW5nVmVyc2lvbik7XG5cbiAgICBzdWNjZXNzID0gdmVyc2lvbkdyZWF0ZXJUaGFuRXhpc3RpbmdWZXJzaW9uOyAgLy8vXG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgc2VtdmVyID0gdmVyc2lvbi51cGRhdGVTZW12ZXIoc2VtdmVyKTtcblxuICAgICAgbWFwW25hbWVdID0gc2VtdmVyO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdWNjZXNzO1xufVxuXG5mdW5jdGlvbiBzaGVsbENvbW1hbmRzRnJvbURlcGVuZGVuY3koZGVwZW5kZW5jeSkge1xuICBsZXQgc2hlbGxDb21tYW5kcyA9IHJldHJpZXZlU2hlbGxDb21tYW5kcygpO1xuXG4gIGNvbnN0IHsgcG9sbCB9ID0gc2hlbGxDb21tYW5kcyxcbiAgICAgICAgcG9sbFNoZWxsQ29tbWFuZHMgPSBwb2xsLCAvLy9cbiAgICAgICAgYXJncyA9IHtcbiAgICAgICAgICBkZXBlbmRlbmN5XG4gICAgICAgIH07XG5cbiAgc2hlbGxDb21tYW5kcyA9IHBhcnNlQ29udGVudChwb2xsU2hlbGxDb21tYW5kcywgYXJncyk7XG5cbiAgcmV0dXJuIHNoZWxsQ29tbWFuZHM7XG59XG4iXSwibmFtZXMiOlsiUmVsZWFzZSIsImV2ZW50dWFsbHkiLCJhc3luY2hyb25vdXNVdGlsaXRpZXMiLCJwYXJzZUNvbnRlbnQiLCJ0ZW1wbGF0ZVV0aWxpdGllcyIsInBydW5lIiwiYXJyYXlVdGlsaXRpZXMiLCJmaWx0ZXIiLCJuYW1lIiwidmVyc2lvbiIsImRlcGVuZGVuY3lNYXAiLCJkZXZEZXBlbmRlbmN5TWFwIiwic3ViRGlyZWN0b3J5UGF0aCIsImdldE5hbWUiLCJnZXRWZXJzaW9uIiwiZ2V0RGVwZW5kZW5jeU1hcCIsImdldERldkRlcGVuZGVuY3lNYXAiLCJnZXRTdWJEaXJlY3RvcnlQYXRoIiwiaXNQdWJsaXNoYWJsZSIsInB1Ymxpc2hhYmxlIiwiZ2V0VmVyc2lvblN0cmluZyIsInZlcnNpb25TdHJpbmciLCJhc1N0cmluZyIsImdldERlcGVuZGVuY3lOYW1lcyIsImRlcGVuZGVuY3lOYW1lcyIsIk9iamVjdCIsImtleXMiLCJnZXREZXZEZXBlbmRlbmN5TmFtZXMiLCJkZXZEZXBlbmRlbmN5TmFtZXMiLCJnZXREZXBlbmRlbmNpZXMiLCJuYW1lcyIsImRlcGVuZGVuY3lOYW1lIiwibmFtZXNJbmNsdWRlRGVwZW5kZW5jeU5hbWUiLCJpbmNsdWRlcyIsImRldkRlcGVuZGVuY3lOYW1lIiwibmFtZXNJbmNsdWRlRGV2RGVwZW5kZW5jeU5hbWUiLCJkZXBlbmRlbmNpZXMiLCJtYXAiLCJyZXBsYWNlIiwiRU1QVFlfU1RSSU5HIiwicHJvcGFnYXRlZERlcGVuZGVuY3kiLCJnaXQiLCJxdWlldGx5IiwiY2FsbGJhY2siLCJzaGVsbENvbW1hbmRzIiwicmV0cmlldmVTaGVsbENvbW1hbmRzIiwiZ2l0U2hlbGxDb21tYW5kcyIsImV4ZWN1dGVTaGVsbENvbW1hbmRzIiwicG9sbCIsImRlcGVuZGVuY2llc0xlbmd0aCIsImxlbmd0aCIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwib3BlcmF0aW9ucyIsImRlcGVuZGVuY3kiLCJuZXh0IiwiZG9uZSIsImNvbnRleHQiLCJpbmRleCIsInNoZWxsQ29tbWFuZHNGcm9tRGVwZW5kZW5jeSIsImV4ZWN1dGVSZXBlYXRlZGx5IiwicG9sbGVkRGVwZW5kZW5jeSIsImluc3RhbGwiLCJpbnN0YWxsU2hlbGxDb21tYW5kcyIsImJ1aWxkIiwiaWdub3JlZEJ1aWxkcyIsInJldHJpZXZlSWdub3JlZEJ1aWxkcyIsInN1YkRpcmVjdG9yeVBhdGhzIiwic3ViRGlyZWN0b3J5UGF0aHNJbmNsdWRlc1N1YkRpcmVjdG9yeVBhdGgiLCJidWlsZElnbm9yZWQiLCJidWlsZFNoZWxsQ29tbWFuZHMiLCJwdWJsaXNoIiwiaWdub3JlZFB1Ymxpc2hlcyIsInJldHJpZXZlSWdub3JlZFB1Ymxpc2hlcyIsIm5hbWVzSW5jbHVkZXNOYW1lIiwicHVibGlzaElnbm9yZWQiLCJwdWJsaXNoU2hlbGxDb21tYW5kcyIsImJ1bXBQYXRjaE51bWJlciIsImN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aCIsInByb2Nlc3MiLCJjd2QiLCJjaGRpciIsImV4ZWN1dGVQcm9tcHRseSIsInVwZGF0ZURlcGVuZGVuY3lWZXJzaW9uIiwidXBkYXRlU2VtdmVyIiwidXBkYXRlRGV2RGVwZW5kZW5jeVZlcnNpb24iLCJmcm9tU3ViRGlyZWN0b3J5UGF0aCIsInJlbGVhc2UiLCJwYWNrYWdlSlNPTiIsInJlYWRQYWNrYWdlSlNPTkZpbGUiLCJkZXZEZXBlbmRlbmNpZXMiLCJWZXJzaW9uIiwiZnJvbVZlcnNpb25TdHJpbmciLCJzZW12ZXIiLCJleGlzdGluZ1NlbXZlciIsImV4aXN0aW5nVmVyc2lvbiIsImZyb21TdHJpbmciLCJ2ZXJzaW9uR3JlYXRlclRoYW5FeGlzdGluZ1ZlcnNpb24iLCJpc0dyZWF0ZXJUaGFuIiwicG9sbFNoZWxsQ29tbWFuZHMiLCJhcmdzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztlQWVxQkE7Ozt5QkFib0Q7OERBRXJEO3lCQUVTOzJCQUNPO3FCQUNlOzZCQUNvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFdkYsSUFBTSxBQUFFQyxhQUFlQyxnQ0FBcUIsQ0FBcENELFlBQ0YsQUFBRUUsZUFBaUJDLDRCQUFpQixDQUFsQ0QsY0FDQUUsUUFBa0JDLHlCQUFjLENBQWhDRCxPQUFPRSxTQUFXRCx5QkFBYyxDQUF6QkM7QUFFQSxJQUFBLEFBQU1QLHdCQUFOO2FBQU1BLFFBQ1BRLElBQUksRUFBRUMsT0FBTyxFQUFFQyxhQUFhLEVBQUVDLGdCQUFnQixFQUFFQyxnQkFBZ0I7Z0NBRHpEWjtRQUVqQixJQUFJLENBQUNRLElBQUksR0FBR0E7UUFDWixJQUFJLENBQUNDLE9BQU8sR0FBR0E7UUFDZixJQUFJLENBQUNDLGFBQWEsR0FBR0E7UUFDckIsSUFBSSxDQUFDQyxnQkFBZ0IsR0FBR0E7UUFDeEIsSUFBSSxDQUFDQyxnQkFBZ0IsR0FBR0E7O2tCQU5QWjs7WUFTbkJhLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0wsSUFBSTtZQUNsQjs7O1lBRUFNLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0wsT0FBTztZQUNyQjs7O1lBRUFNLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0wsYUFBYTtZQUMzQjs7O1lBRUFNLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0wsZ0JBQWdCO1lBQzlCOzs7WUFFQU0sS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDTCxnQkFBZ0I7WUFDOUI7OztZQUVBTSxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBTUMsY0FBYyxBQUFDLElBQUksQ0FBQ1gsSUFBSSxLQUFLLFFBQVUsSUFBSSxDQUFDQyxPQUFPLEtBQUs7Z0JBRTlELE9BQU9VO1lBQ1Q7OztZQUVBQyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBTUMsZ0JBQWdCLElBQUksQ0FBQ1osT0FBTyxDQUFDYSxRQUFRO2dCQUUzQyxPQUFPRCxlQUFlLEdBQUc7WUFDM0I7OztZQUVBRSxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBTUMsa0JBQWtCQyxPQUFPQyxJQUFJLENBQUMsSUFBSSxDQUFDaEIsYUFBYTtnQkFFdEQsT0FBT2M7WUFDVDs7O1lBRUFHLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxJQUFNQyxxQkFBcUJILE9BQU9DLElBQUksQ0FBQyxJQUFJLENBQUNmLGdCQUFnQjtnQkFFNUQsT0FBT2lCO1lBQ1Q7OztZQUVBQyxLQUFBQTttQkFBQUEsU0FBQUEsZ0JBQWdCQyxLQUFLOztnQkFDbkIsSUFBTU4sa0JBQWtCLElBQUksQ0FBQ0Qsa0JBQWtCLElBQ3pDSyxxQkFBcUIsSUFBSSxDQUFDRCxxQkFBcUI7Z0JBRXJEcEIsT0FBT2lCLGlCQUFpQixTQUFDTztvQkFDdkIsSUFBTUMsNkJBQTZCRixNQUFNRyxRQUFRLENBQUNGO29CQUVsRCxJQUFJQyw0QkFBNEI7d0JBQzlCLE9BQU87b0JBQ1Q7Z0JBQ0Y7Z0JBRUF6QixPQUFPcUIsb0JBQW9CLFNBQUNNO29CQUMxQixJQUFNQyxnQ0FBZ0NMLE1BQU1HLFFBQVEsQ0FBQ0M7b0JBRXJELElBQUlDLCtCQUErQjt3QkFDakMsT0FBTztvQkFDVDtnQkFDRjtnQkFFQUwsUUFBUSxBQUNOLHFCQUFHTix3QkFDSCxxQkFBR0k7Z0JBR0wsSUFBTVEsZUFBZU4sTUFBTU8sR0FBRyxDQUFDLFNBQUM3QjtvQkFDOUIsSUFBSUMsVUFBVSxNQUFLQyxhQUFhLENBQUNGLEtBQUssSUFBSSxNQUFLRyxnQkFBZ0IsQ0FBQ0gsS0FBSztvQkFFckVDLFVBQVVBLFFBQVE2QixPQUFPLENBQUMsVUFBVUMsdUJBQVk7b0JBRWhELElBQU1DLHVCQUF1QixBQUFDLEdBQVUvQixPQUFSRCxNQUFLLEtBQVcsT0FBUkM7b0JBRXhDLE9BQU8rQjtnQkFDVDtnQkFFQSxPQUFPSjtZQUNUOzs7WUFFQUssS0FBQUE7bUJBQUFBLFNBQUFBLElBQUlDLE9BQU8sRUFBRUMsUUFBUTtnQkFDbkIsSUFBSUMsZ0JBQWdCQyxJQUFBQSxvQ0FBcUI7Z0JBRXpDLElBQU0sQUFBRUosTUFBUUcsY0FBUkgsS0FDTkssbUJBQW1CTDtnQkFFckJHLGdCQUFnQkUsa0JBQWtCLEdBQUc7Z0JBRXJDLElBQUksQ0FBQ0Msb0JBQW9CLENBQUNILGVBQWVGLFNBQVNDO1lBQ3BEOzs7WUFFQUssS0FBQUE7bUJBQUFBLFNBQUFBLEtBQUtsQixLQUFLLEVBQUVZLE9BQU8sRUFBRUMsUUFBUTtnQkFDM0IsSUFBTVAsZUFBZSxJQUFJLENBQUNQLGVBQWUsQ0FBQ0MsUUFDcENtQixxQkFBcUJiLGFBQWFjLE1BQU07Z0JBRTlDLElBQUlELHVCQUF1QixHQUFHO29CQUM1QixJQUFNRSxVQUFVO29CQUVoQlIsU0FBU1E7b0JBRVQ7Z0JBQ0Y7Z0JBRUNGLHVCQUF1QixJQUN0QkcsUUFBUUMsR0FBRyxDQUFDLGlDQUNWRCxRQUFRQyxHQUFHLENBQUM7Z0JBRWhCLElBQU1DLGFBQWFsQixhQUFhQyxHQUFHLENBQUMsU0FBQ2tCO29CQUNuQyxPQUFPLFNBQUNDLE1BQU1DLE1BQU1DLFNBQVNDO3dCQUMzQixJQUFNZixnQkFBZ0JnQiw0QkFBNEJMO3dCQUVsREgsUUFBUUMsR0FBRyxDQUFDLEFBQUMsTUFBZ0IsT0FBWEUsWUFBVzt3QkFFN0JNLElBQUFBLHdCQUFpQixFQUFDakIsZUFBZUYsU0FBUyxTQUFDUzs0QkFDekMsSUFBSUEsU0FBUztnQ0FDWCxJQUFNVyxtQkFBbUJQLFlBQVksR0FBRztnQ0FFeENsRCxNQUFNK0IsY0FBYyxTQUFDbUI7b0NBQ25CLElBQUlBLGVBQWVPLGtCQUFrQjt3Q0FDbkMsT0FBTztvQ0FDVDtnQ0FDRjs0QkFDRjs0QkFFQU47d0JBQ0Y7b0JBQ0Y7Z0JBQ0Y7Z0JBRUF2RCxXQUFXcUQsWUFBWTtvQkFDckIsSUFBTUwscUJBQXFCYixhQUFhYyxNQUFNLEVBQ3hDQyxVQUFXRix1QkFBdUI7b0JBRXhDTixTQUFTUTtnQkFDWDtZQUNGOzs7WUFFQVksS0FBQUE7bUJBQUFBLFNBQUFBLFFBQVFyQixPQUFPLEVBQUVDLFFBQVE7Z0JBQ3ZCLElBQUlDLGdCQUFnQkMsSUFBQUEsb0NBQXFCO2dCQUV6QyxJQUFNLEFBQUVrQixVQUFZbkIsY0FBWm1CLFNBQ0ZDLHVCQUF1QkQ7Z0JBRTdCbkIsZ0JBQWdCb0Isc0JBQXNCLEdBQUc7Z0JBRXpDLElBQUksQ0FBQ2pCLG9CQUFvQixDQUFDSCxlQUFlRixTQUFTQztZQUNwRDs7O1lBRUFzQixLQUFBQTttQkFBQUEsU0FBQUEsTUFBTXZCLE9BQU8sRUFBRUMsUUFBUTtnQkFDckIsSUFBTXVCLGdCQUFnQkMsSUFBQUEsb0NBQXFCLEtBQ3JDQyxvQkFBb0JGLGVBQ3BCRyw0Q0FBNENELGtCQUFrQm5DLFFBQVEsQ0FBQyxJQUFJLENBQUNyQixnQkFBZ0IsR0FDNUYwRCxlQUFlRCwyQ0FBMkMsR0FBRztnQkFFbkUsSUFBSUMsY0FBYztvQkFDaEJsQixRQUFRQyxHQUFHLENBQUMsQUFBQyxpQkFBc0MsT0FBdEIsSUFBSSxDQUFDekMsZ0JBQWdCLEVBQUM7b0JBRW5ELElBQU11QyxVQUFVO29CQUVoQlIsU0FBU1E7b0JBRVQ7Z0JBQ0Y7Z0JBRUEsSUFBSVAsZ0JBQWdCQyxJQUFBQSxvQ0FBcUI7Z0JBRXpDLElBQU0sQUFBRW9CLFFBQVVyQixjQUFWcUIsT0FDRk0scUJBQXFCTjtnQkFFM0JyQixnQkFBZ0IyQixvQkFBb0IsR0FBRztnQkFFdkMsSUFBSSxDQUFDeEIsb0JBQW9CLENBQUNILGVBQWVGLFNBQVNDO1lBQ3BEOzs7WUFFQTZCLEtBQUFBO21CQUFBQSxTQUFBQSxRQUFROUIsT0FBTyxFQUFFQyxRQUFRO2dCQUN2QixJQUFNOEIsbUJBQW1CQyxJQUFBQSx1Q0FBd0IsS0FDM0M1QyxRQUFRMkMsa0JBQ1JFLG9CQUFvQjdDLE1BQU1HLFFBQVEsQ0FBQyxJQUFJLENBQUN6QixJQUFJLEdBQzVDb0UsaUJBQWlCRCxtQkFBbUIsR0FBRztnQkFFN0MsSUFBSUMsZ0JBQWdCO29CQUNsQnhCLFFBQVFDLEdBQUcsQ0FBQyxBQUFDLGlCQUEwQixPQUFWLElBQUksQ0FBQzdDLElBQUksRUFBQztvQkFFdkMsSUFBTTJDLFVBQVU7b0JBRWhCUixTQUFTUTtvQkFFVDtnQkFDRjtnQkFFQSxJQUFJUCxnQkFBZ0JDLElBQUFBLG9DQUFxQjtnQkFFekMsSUFBTSxBQUFFMkIsVUFBWTVCLGNBQVo0QixTQUNGSyx1QkFBdUJMO2dCQUU3QjVCLGdCQUFnQmlDLHNCQUFzQixHQUFHO2dCQUV6QyxJQUFJLENBQUM5QixvQkFBb0IsQ0FBQ0gsZUFBZUYsU0FBU0M7WUFDcEQ7OztZQUVBbUMsS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUFvQixJQUFJLENBQUNyRSxPQUFPLENBQUNxRSxlQUFlO1lBQUk7OztZQUVwRC9CLEtBQUFBO21CQUFBQSxTQUFBQSxxQkFBcUJILGFBQWEsRUFBRUYsT0FBTyxFQUFFQyxRQUFRO2dCQUNuRCxJQUFNb0MsOEJBQThCQyxRQUFRQyxHQUFHO2dCQUUvQ0QsUUFBUUUsS0FBSyxDQUFDLElBQUksQ0FBQ3RFLGdCQUFnQjtnQkFFbkN1RSxJQUFBQSxzQkFBZSxFQUFDdkMsZUFBZUYsU0FBUyxTQUFDUztvQkFDdkM2QixRQUFRRSxLQUFLLENBQUNIO29CQUVkcEMsU0FBU1E7Z0JBQ1g7WUFDRjs7O1lBRUFpQyxLQUFBQTttQkFBQUEsU0FBQUEsd0JBQXdCNUUsSUFBSSxFQUFFYSxhQUFhO2dCQUN6QyxJQUFNOEIsVUFBVWtDLGFBQWE3RSxNQUFNYSxlQUFlLElBQUksQ0FBQ1gsYUFBYTtnQkFFcEUsSUFBSSxDQUFDeUMsU0FBUztvQkFDWkMsUUFBUUMsR0FBRyxDQUFDLEFBQUMsOEJBQWtFN0MsT0FBckMsSUFBSSxDQUFDSSxnQkFBZ0IsRUFBQyxpQkFBK0VTLE9BQWhFYixNQUFLLDZEQUF5RSxPQUFkYSxlQUFjO2dCQUMvSjtnQkFFQSxPQUFPOEI7WUFDVDs7O1lBRUFtQyxLQUFBQTttQkFBQUEsU0FBQUEsMkJBQTJCOUUsSUFBSSxFQUFFYSxhQUFhO2dCQUM1QyxJQUFNOEIsVUFBVWtDLGFBQWE3RSxNQUFNYSxlQUFlLElBQUksQ0FBQ1YsZ0JBQWdCO2dCQUV2RSxJQUFJLENBQUN3QyxTQUFTO29CQUNaQyxRQUFRQyxHQUFHLENBQUMsQUFBQyw4QkFBa0U3QyxPQUFyQyxJQUFJLENBQUNJLGdCQUFnQixFQUFDLGlCQUF5RlMsT0FBMUViLE1BQUssdUVBQW1GLE9BQWRhLGVBQWM7Z0JBQ3pLO2dCQUVBLE9BQU84QjtZQUNUOzs7O1lBRU9vQyxLQUFBQTttQkFBUCxTQUFPQSxxQkFBcUIzRSxnQkFBZ0I7Z0JBQzFDLElBQUk0RSxVQUFVO2dCQUVkLElBQU1DLGNBQWNDLElBQUFBLGdDQUFtQixFQUFDOUU7Z0JBRXhDLElBQUk2RSxnQkFBZ0IsTUFBTTtvQkFDeEIsMkJBQXlCQSxZQUFuQmhGLFNBQUFBLDRDQUFVO29CQUVoQix3QkFBaUVnRixZQUF6RGpGLE1BQUFBLHNDQUFPLHNEQUFrRGlGLFlBQTVDckQsY0FBQUEsc0RBQWUsQ0FBQyw4REFBNEJxRCxZQUF6QkUsaUJBQUFBLDREQUFrQixDQUFDLGtDQUNyRHRFLGdCQUFnQlosU0FDaEJDLGdCQUFnQjBCLGNBQ2hCekIsbUJBQW1CZ0YsaUJBQWlCLEdBQUc7b0JBRTdDbEYsVUFBVW1GLGdCQUFPLENBQUNDLGlCQUFpQixDQUFDeEU7b0JBRXBDbUUsVUFBVSxJQXBRS3hGLFFBb1FPUSxNQUFNQyxTQUFTQyxlQUFlQyxrQkFBa0JDO2dCQUN4RTtnQkFFQSxPQUFPNEU7WUFDVDs7O1dBeFFtQnhGOztBQTJRckIsU0FBU3FGLGFBQWE3RSxJQUFJLEVBQUVhLGFBQWEsRUFBRWdCLEdBQUc7SUFDNUMsSUFBSWMsVUFBVTtJQUVkLElBQUkyQyxTQUFTekQsR0FBRyxDQUFDN0IsS0FBSyxJQUFJO0lBRTFCLElBQU1DLFVBQVVtRixnQkFBTyxDQUFDQyxpQkFBaUIsQ0FBQ3hFLGdCQUNwQzBFLGlCQUFpQkQsUUFDakJFLGtCQUFrQkosZ0JBQU8sQ0FBQ0ssVUFBVSxDQUFDRjtJQUUzQyxJQUFJQyxvQkFBb0IsTUFBTTtRQUM1QixJQUFNRSxvQ0FBb0N6RixRQUFRMEYsYUFBYSxDQUFDSDtRQUVoRTdDLFVBQVUrQyxtQ0FBb0MsR0FBRztRQUVqRCxJQUFJL0MsU0FBUztZQUNYMkMsU0FBU3JGLFFBQVE0RSxZQUFZLENBQUNTO1lBRTlCekQsR0FBRyxDQUFDN0IsS0FBSyxHQUFHc0Y7UUFDZDtJQUNGO0lBRUEsT0FBTzNDO0FBQ1Q7QUFFQSxTQUFTUyw0QkFBNEJMLFVBQVU7SUFDN0MsSUFBSVgsZ0JBQWdCQyxJQUFBQSxvQ0FBcUI7SUFFekMsSUFBTSxBQUFFRyxPQUFTSixjQUFUSSxNQUNGb0Qsb0JBQW9CcEQsTUFDcEJxRCxPQUFPO1FBQ0w5QyxZQUFBQTtJQUNGO0lBRU5YLGdCQUFnQnpDLGFBQWFpRyxtQkFBbUJDO0lBRWhELE9BQU96RDtBQUNUIn0=