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
var _version = /*#__PURE__*/ _interop_require_default(require("./version"));
var _shell = require("./utilities/shell");
var _packageJSON = require("./utilities/packageJSON");
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
                    console.log("Ignoring the '".concat(this.name, "' build."));
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
                (0, _shell.execute)(shellCommands, quietly, function(success) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWxlYXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgVmVyc2lvbiBmcm9tIFwiLi92ZXJzaW9uXCI7XG5cbmltcG9ydCB7IGV4ZWN1dGUgfSBmcm9tIFwiLi91dGlsaXRpZXMvc2hlbGxcIjtcbmltcG9ydCB7IHJlYWRQYWNrYWdlSlNPTkZpbGUgfSBmcm9tIFwiLi91dGlsaXRpZXMvcGFja2FnZUpTT05cIjtcbmltcG9ydCB7IHJldHJpZXZlU2hlbGxDb21tYW5kcywgcmV0cmlldmVJZ25vcmVkQnVpbGRzLCByZXRyaWV2ZUlnbm9yZWRQdWJsaXNoZXMgfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbGVhc2Uge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB2ZXJzaW9uLCBkZXBlbmRlbmN5TWFwLCBkZXZEZXBlbmRlbmN5TWFwLCBzdWJEaXJlY3RvcnlQYXRoKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIHRoaXMuZGVwZW5kZW5jeU1hcCA9IGRlcGVuZGVuY3lNYXA7XG4gICAgdGhpcy5kZXZEZXBlbmRlbmN5TWFwID0gZGV2RGVwZW5kZW5jeU1hcDtcbiAgICB0aGlzLnN1YkRpcmVjdG9yeVBhdGggPSBzdWJEaXJlY3RvcnlQYXRoO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0VmVyc2lvbigpIHtcbiAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICB9XG5cbiAgZ2V0RGVwZW5kZW5jeU1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZXBlbmRlbmN5TWFwO1xuICB9XG5cbiAgZ2V0RGV2RGVwZW5kZW5jeU1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZXZEZXBlbmRlbmN5TWFwO1xuICB9XG5cbiAgZ2V0U3ViRGlyZWN0b3J5UGF0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJEaXJlY3RvcnlQYXRoO1xuICB9XG5cbiAgaXNQdWJsaXNoYWJsZSgpIHtcbiAgICBjb25zdCBwdWJsaXNoYWJsZSA9ICh0aGlzLm5hbWUgIT09IG51bGwpICYmICh0aGlzLnZlcnNpb24gIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHB1Ymxpc2hhYmxlO1xuICB9XG5cbiAgZ2V0VmVyc2lvblN0cmluZygpIHtcbiAgICBjb25zdCB2ZXJzaW9uU3RyaW5nID0gdGhpcy52ZXJzaW9uLmFzU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdmVyc2lvblN0cmluZzsgLy8vXG4gIH1cblxuICBnZXREZXBlbmRlbmN5TmFtZXMoKSB7XG4gICAgY29uc3QgZGVwZW5kZW5jeU5hbWVzID0gT2JqZWN0LmtleXModGhpcy5kZXBlbmRlbmN5TWFwKTtcblxuICAgIHJldHVybiBkZXBlbmRlbmN5TmFtZXM7XG4gIH1cblxuICBnZXREZXZEZXBlbmRlbmN5TmFtZXMoKSB7XG4gICAgY29uc3QgZGV2RGVwZW5kZW5jeU5hbWVzID0gT2JqZWN0LmtleXModGhpcy5kZXZEZXBlbmRlbmN5TWFwKTtcblxuICAgIHJldHVybiBkZXZEZXBlbmRlbmN5TmFtZXM7XG4gIH1cblxuICBnaXQocXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBsZXQgc2hlbGxDb21tYW5kcyA9IHJldHJpZXZlU2hlbGxDb21tYW5kcygpO1xuXG4gICAgY29uc3QgeyBnaXQgfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICAgICAgZ2l0U2hlbGxDb21tYW5kcyA9IGdpdDtcblxuICAgIHNoZWxsQ29tbWFuZHMgPSBnaXRTaGVsbENvbW1hbmRzOyAvLy9cblxuICAgIHRoaXMuZXhlY3V0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgY2FsbGJhY2spO1xuICB9XG5cbiAgaW5zdGFsbChxdWlldGx5LCBjYWxsYmFjaykge1xuICAgIGxldCBzaGVsbENvbW1hbmRzID0gcmV0cmlldmVTaGVsbENvbW1hbmRzKCk7XG5cbiAgICBjb25zdCB7IGluc3RhbGwgfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICAgICAgaW5zdGFsbFNoZWxsQ29tbWFuZHMgPSBpbnN0YWxsO1xuXG4gICAgc2hlbGxDb21tYW5kcyA9IGluc3RhbGxTaGVsbENvbW1hbmRzOyAvLy9cblxuICAgIHRoaXMuZXhlY3V0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgY2FsbGJhY2spO1xuICB9XG5cbiAgYnVpbGQocXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBpZ25vcmVkQnVpbGRzID0gcmV0cmlldmVJZ25vcmVkQnVpbGRzKCksXG4gICAgICAgICAgc3ViRGlyZWN0b3J5UGF0aHMgPSBpZ25vcmVkQnVpbGRzLFxuICAgICAgICAgIHN1YkRpcmVjdG9yeVBhdGhzSW5jbHVkZXNTdWJEaXJlY3RvcnlQYXRoID0gc3ViRGlyZWN0b3J5UGF0aHMuaW5jbHVkZXModGhpcy5zdWJEaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgICBidWlsZElnbm9yZWQgPSBzdWJEaXJlY3RvcnlQYXRoc0luY2x1ZGVzU3ViRGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICBpZiAoYnVpbGRJZ25vcmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhgSWdub3JpbmcgdGhlICcke3RoaXMubmFtZX0nIGJ1aWxkLmApO1xuXG4gICAgICBjb25zdCBzdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgY2FsbGJhY2soc3VjY2Vzcyk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc2hlbGxDb21tYW5kcyA9IHJldHJpZXZlU2hlbGxDb21tYW5kcygpO1xuXG4gICAgY29uc3QgeyBidWlsZCB9ID0gc2hlbGxDb21tYW5kcyxcbiAgICAgICAgICBidWlsZFNoZWxsQ29tbWFuZHMgPSBidWlsZDtcblxuICAgIHNoZWxsQ29tbWFuZHMgPSBidWlsZFNoZWxsQ29tbWFuZHM7IC8vL1xuXG4gICAgdGhpcy5leGVjdXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjayk7XG4gIH1cblxuICBwdWJsaXNoKHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaWdub3JlZFB1Ymxpc2hlcyA9IHJldHJpZXZlSWdub3JlZFB1Ymxpc2hlcygpLFxuICAgICAgICAgIG5hbWVzID0gaWdub3JlZFB1Ymxpc2hlcyxcbiAgICAgICAgICBuYW1lc0luY2x1ZGVzTmFtZSA9IG5hbWVzLmluY2x1ZGVzKHRoaXMubmFtZSksXG4gICAgICAgICAgcHVibGlzaElnbm9yZWQgPSBuYW1lc0luY2x1ZGVzTmFtZTsgLy8vXG5cbiAgICBpZiAocHVibGlzaElnbm9yZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBJZ25vcmluZyB0aGUgJyR7dGhpcy5uYW1lfScgcHVibGlzaC5gKTtcblxuICAgICAgY29uc3Qgc3VjY2VzcyA9IHRydWU7XG5cbiAgICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHNoZWxsQ29tbWFuZHMgPSByZXRyaWV2ZVNoZWxsQ29tbWFuZHMoKTtcblxuICAgIGNvbnN0IHsgcHVibGlzaCB9ID0gc2hlbGxDb21tYW5kcyxcbiAgICAgICAgICBwdWJsaXNoU2hlbGxDb21tYW5kcyA9IHB1Ymxpc2g7XG5cbiAgICBzaGVsbENvbW1hbmRzID0gcHVibGlzaFNoZWxsQ29tbWFuZHM7IC8vL1xuXG4gICAgdGhpcy5leGVjdXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjayk7XG4gIH1cblxuICBidW1wUGF0Y2hOdW1iZXIoKSB7IHRoaXMudmVyc2lvbi5idW1wUGF0Y2hOdW1iZXIoKTsgfVxuXG4gIGV4ZWN1dGVTaGVsbENvbW1hbmRzKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoID0gcHJvY2Vzcy5jd2QoKTtcblxuICAgIHByb2Nlc3MuY2hkaXIodGhpcy5zdWJEaXJlY3RvcnlQYXRoKTtcblxuICAgIGV4ZWN1dGUoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgKHN1Y2Nlc3MpID0+IHtcbiAgICAgIHByb2Nlc3MuY2hkaXIoY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoKTtcblxuICAgICAgY2FsbGJhY2soc3VjY2Vzcyk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVEZXBlbmRlbmN5VmVyc2lvbihuYW1lLCB2ZXJzaW9uU3RyaW5nKSB7XG4gICAgY29uc3Qgc3VjY2VzcyA9IHVwZGF0ZVNlbXZlcihuYW1lLCB2ZXJzaW9uU3RyaW5nLCB0aGlzLmRlcGVuZGVuY3lNYXApO1xuXG4gICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICBjb25zb2xlLmxvZyhgRWl0aGVyIHRoZSB2ZXJzaW9uIG9mIHRoZSAnJHt0aGlzLnN1YkRpcmVjdG9yeVBhdGh9JyByZWxlYXNlJ3MgJyR7bmFtZX0nIGRlcGVuZGVuY3kgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBwcm9wYWdhdGVkICcke3ZlcnNpb25TdHJpbmd9JyB2ZXJzaW9uIG9yIGl0IGNhbm5vdCBiZSBwYXJzZWQuYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICB1cGRhdGVEZXZEZXBlbmRlbmN5VmVyc2lvbihuYW1lLCB2ZXJzaW9uU3RyaW5nKSB7XG4gICAgY29uc3Qgc3VjY2VzcyA9IHVwZGF0ZVNlbXZlcihuYW1lLCB2ZXJzaW9uU3RyaW5nLCB0aGlzLmRldkRlcGVuZGVuY3lNYXApO1xuXG4gICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICBjb25zb2xlLmxvZyhgRWl0aGVyIHRoZSB2ZXJzaW9uIG9mIHRoZSAnJHt0aGlzLnN1YkRpcmVjdG9yeVBhdGh9JyByZWxlYXNlJ3MgJyR7bmFtZX0nIGRldmVsb3BlciBkZXBlbmRlbmN5IGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgcHJvcGFnYXRlZCAnJHt2ZXJzaW9uU3RyaW5nfScgdmVyc2lvbiBvciBpdCBjYW5ub3QgYmUgcGFyc2VkLmApO1xuICAgIH1cblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgc3RhdGljIGZyb21TdWJEaXJlY3RvcnlQYXRoKHN1YkRpcmVjdG9yeVBhdGgpIHtcbiAgICBsZXQgcmVsZWFzZSA9IG51bGw7XG5cbiAgICBjb25zdCBwYWNrYWdlSlNPTiA9IHJlYWRQYWNrYWdlSlNPTkZpbGUoc3ViRGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAocGFja2FnZUpTT04gIT09IG51bGwpIHtcbiAgICAgIGxldCB7IHZlcnNpb24gPSBudWxsIH0gPSBwYWNrYWdlSlNPTjtcblxuICAgICAgY29uc3QgeyBuYW1lID0gbnVsbCwgZGVwZW5kZW5jaWVzID0ge30sIGRldkRlcGVuZGVuY2llcyA9IHt9IH0gPSBwYWNrYWdlSlNPTixcbiAgICAgICAgICAgIHZlcnNpb25TdHJpbmcgPSB2ZXJzaW9uLCAgLy8vXG4gICAgICAgICAgICBkZXBlbmRlbmN5TWFwID0gZGVwZW5kZW5jaWVzLCAvLy9cbiAgICAgICAgICAgIGRldkRlcGVuZGVuY3lNYXAgPSBkZXZEZXBlbmRlbmNpZXM7IC8vL1xuXG4gICAgICB2ZXJzaW9uID0gVmVyc2lvbi5mcm9tVmVyc2lvblN0cmluZyh2ZXJzaW9uU3RyaW5nKTtcblxuICAgICAgcmVsZWFzZSA9IG5ldyBSZWxlYXNlKG5hbWUsIHZlcnNpb24sIGRlcGVuZGVuY3lNYXAsIGRldkRlcGVuZGVuY3lNYXAsIHN1YkRpcmVjdG9yeVBhdGgpO1xuICAgIH1cblxuICAgIHJldHVybiByZWxlYXNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNlbXZlcihuYW1lLCB2ZXJzaW9uU3RyaW5nLCBtYXApIHtcbiAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICBsZXQgc2VtdmVyID0gbWFwW25hbWVdIHx8IG51bGw7XG5cbiAgY29uc3QgdmVyc2lvbiA9IFZlcnNpb24uZnJvbVZlcnNpb25TdHJpbmcodmVyc2lvblN0cmluZyksXG4gICAgICAgIGV4aXN0aW5nU2VtdmVyID0gc2VtdmVyLCAvLy9cbiAgICAgICAgZXhpc3RpbmdWZXJzaW9uID0gVmVyc2lvbi5mcm9tU3RyaW5nKGV4aXN0aW5nU2VtdmVyKTtcblxuICBpZiAoZXhpc3RpbmdWZXJzaW9uICE9PSBudWxsKSB7XG4gICAgY29uc3QgdmVyc2lvbkdyZWF0ZXJUaGFuRXhpc3RpbmdWZXJzaW9uID0gdmVyc2lvbi5pc0dyZWF0ZXJUaGFuKGV4aXN0aW5nVmVyc2lvbik7XG5cbiAgICBzdWNjZXNzID0gdmVyc2lvbkdyZWF0ZXJUaGFuRXhpc3RpbmdWZXJzaW9uOyAgLy8vXG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgc2VtdmVyID0gdmVyc2lvbi51cGRhdGVTZW12ZXIoc2VtdmVyKTtcblxuICAgICAgbWFwW25hbWVdID0gc2VtdmVyO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdWNjZXNzO1xufVxuIl0sIm5hbWVzIjpbIlJlbGVhc2UiLCJuYW1lIiwidmVyc2lvbiIsImRlcGVuZGVuY3lNYXAiLCJkZXZEZXBlbmRlbmN5TWFwIiwic3ViRGlyZWN0b3J5UGF0aCIsImdldE5hbWUiLCJnZXRWZXJzaW9uIiwiZ2V0RGVwZW5kZW5jeU1hcCIsImdldERldkRlcGVuZGVuY3lNYXAiLCJnZXRTdWJEaXJlY3RvcnlQYXRoIiwiaXNQdWJsaXNoYWJsZSIsInB1Ymxpc2hhYmxlIiwiZ2V0VmVyc2lvblN0cmluZyIsInZlcnNpb25TdHJpbmciLCJhc1N0cmluZyIsImdldERlcGVuZGVuY3lOYW1lcyIsImRlcGVuZGVuY3lOYW1lcyIsIk9iamVjdCIsImtleXMiLCJnZXREZXZEZXBlbmRlbmN5TmFtZXMiLCJkZXZEZXBlbmRlbmN5TmFtZXMiLCJnaXQiLCJxdWlldGx5IiwiY2FsbGJhY2siLCJzaGVsbENvbW1hbmRzIiwicmV0cmlldmVTaGVsbENvbW1hbmRzIiwiZ2l0U2hlbGxDb21tYW5kcyIsImV4ZWN1dGVTaGVsbENvbW1hbmRzIiwiaW5zdGFsbCIsImluc3RhbGxTaGVsbENvbW1hbmRzIiwiYnVpbGQiLCJpZ25vcmVkQnVpbGRzIiwicmV0cmlldmVJZ25vcmVkQnVpbGRzIiwic3ViRGlyZWN0b3J5UGF0aHMiLCJzdWJEaXJlY3RvcnlQYXRoc0luY2x1ZGVzU3ViRGlyZWN0b3J5UGF0aCIsImluY2x1ZGVzIiwiYnVpbGRJZ25vcmVkIiwiY29uc29sZSIsImxvZyIsInN1Y2Nlc3MiLCJidWlsZFNoZWxsQ29tbWFuZHMiLCJwdWJsaXNoIiwiaWdub3JlZFB1Ymxpc2hlcyIsInJldHJpZXZlSWdub3JlZFB1Ymxpc2hlcyIsIm5hbWVzIiwibmFtZXNJbmNsdWRlc05hbWUiLCJwdWJsaXNoSWdub3JlZCIsInB1Ymxpc2hTaGVsbENvbW1hbmRzIiwiYnVtcFBhdGNoTnVtYmVyIiwiY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoIiwicHJvY2VzcyIsImN3ZCIsImNoZGlyIiwiZXhlY3V0ZSIsInVwZGF0ZURlcGVuZGVuY3lWZXJzaW9uIiwidXBkYXRlU2VtdmVyIiwidXBkYXRlRGV2RGVwZW5kZW5jeVZlcnNpb24iLCJmcm9tU3ViRGlyZWN0b3J5UGF0aCIsInJlbGVhc2UiLCJwYWNrYWdlSlNPTiIsInJlYWRQYWNrYWdlSlNPTkZpbGUiLCJkZXBlbmRlbmNpZXMiLCJkZXZEZXBlbmRlbmNpZXMiLCJWZXJzaW9uIiwiZnJvbVZlcnNpb25TdHJpbmciLCJtYXAiLCJzZW12ZXIiLCJleGlzdGluZ1NlbXZlciIsImV4aXN0aW5nVmVyc2lvbiIsImZyb21TdHJpbmciLCJ2ZXJzaW9uR3JlYXRlclRoYW5FeGlzdGluZ1ZlcnNpb24iLCJpc0dyZWF0ZXJUaGFuIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztlQVFxQkE7Ozs4REFORDtxQkFFSTsyQkFDWTs2QkFDbUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFeEUsSUFBQSxBQUFNQSx3QkFBTjthQUFNQSxRQUNQQyxJQUFJLEVBQUVDLE9BQU8sRUFBRUMsYUFBYSxFQUFFQyxnQkFBZ0IsRUFBRUMsZ0JBQWdCO2dDQUR6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