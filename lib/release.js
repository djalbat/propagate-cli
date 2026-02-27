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
const _necessary = require("necessary");
const _version = /*#__PURE__*/ _interop_require_default(require("./version"));
const _packageJSON = require("./utilities/packageJSON");
const _terminal = require("./utilities/terminal");
const _shell = require("./utilities/shell");
const _configuration = require("./configuration");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { prune } = _necessary.arrayUtilities, { eventually } = _necessary.asynchronousUtilities, { parseContent } = _necessary.templateUtilities;
class Release {
    constructor(name, version, dependencyMap, devDependencyMap, subDirectoryPath){
        this.name = name;
        this.version = version;
        this.dependencyMap = dependencyMap;
        this.devDependencyMap = devDependencyMap;
        this.subDirectoryPath = subDirectoryPath;
    }
    getName() {
        return this.name;
    }
    getVersion() {
        return this.version;
    }
    getDependencyMap() {
        return this.dependencyMap;
    }
    getDevDependencyMap() {
        return this.devDependencyMap;
    }
    getSubDirectoryPath() {
        return this.subDirectoryPath;
    }
    isPublishable() {
        const publishable = this.name !== null && this.version !== null;
        return publishable;
    }
    getVersionString() {
        const versionString = this.version.asString();
        return versionString; ///
    }
    getDependencyNames() {
        const dependencyNames = Object.keys(this.dependencyMap);
        return dependencyNames;
    }
    getDevDependencyNames() {
        const devDependencyNames = Object.keys(this.devDependencyMap);
        return devDependencyNames;
    }
    git(quietly, callback) {
        let shellCommands = (0, _configuration.retrieveShellCommands)();
        const { git } = shellCommands, gitShellCommands = git;
        shellCommands = gitShellCommands; ///
        this.executeShellCommands(shellCommands, quietly, callback);
    }
    poll(specifiers, quietly, callback) {
        const specifiersLength = specifiers.length;
        if (specifiersLength === 0) {
            const success = true;
            callback(success);
            return;
        }
        specifiersLength === 1 ? console.log(`Polling for the dependency:`) : console.log(`Polling for the dependenies:`);
        (0, _terminal.hideCursor)();
        specifiers.forEach((specifier)=>{
            console.log(` - ${specifier}`);
        });
        const length = specifiersLength, operations = specifiers.map((specifier, index)=>{
            return (next, done, context)=>{
                const shellCommands = shellCommandsFromSpecifier(specifier);
                (0, _shell.executeRepeatedly)(shellCommands, specifier, index, length, quietly, (success)=>{
                    if (success) {
                        const polledSpecifier = specifier; ///
                        prune(specifiers, (specifier)=>{
                            if (specifier !== polledSpecifier) {
                                return true;
                            }
                        });
                    }
                    next();
                });
            };
        });
        eventually(operations, ()=>{
            const specifiersLength = specifiers.length, success = specifiersLength === 0;
            (0, _terminal.showCursor)();
            callback(success);
        });
    }
    install(quietly, callback) {
        let shellCommands = (0, _configuration.retrieveShellCommands)();
        const { install } = shellCommands, installShellCommands = install;
        shellCommands = installShellCommands; ///
        this.executeShellCommands(shellCommands, quietly, callback);
    }
    build(quietly, callback) {
        const ignoredBuilds = (0, _configuration.retrieveIgnoredBuilds)(), subDirectoryPaths = ignoredBuilds, subDirectoryPathsIncludesSubDirectoryPath = subDirectoryPaths.includes(this.subDirectoryPath), buildIgnored = subDirectoryPathsIncludesSubDirectoryPath; ///
        if (buildIgnored) {
            console.log(`Ignoring the '${this.subDirectoryPath}' build.`);
            const success = true;
            callback(success);
            return;
        }
        let shellCommands = (0, _configuration.retrieveShellCommands)();
        const { build } = shellCommands, buildShellCommands = build;
        shellCommands = buildShellCommands; ///
        this.executeShellCommands(shellCommands, quietly, callback);
    }
    publish(quietly, callback) {
        const ignoredPublishes = (0, _configuration.retrieveIgnoredPublishes)(), names = ignoredPublishes, namesIncludesName = names.includes(this.name), publishIgnored = namesIncludesName; ///
        if (publishIgnored) {
            console.log(`Ignoring the '${this.name}' publish.`);
            const success = true;
            callback(success);
            return;
        }
        let shellCommands = (0, _configuration.retrieveShellCommands)();
        const { publish } = shellCommands, publishShellCommands = publish;
        shellCommands = publishShellCommands; ///
        this.executeShellCommands(shellCommands, quietly, callback);
    }
    bumpPatchNumber() {
        this.version.bumpPatchNumber();
    }
    executeShellCommands(shellCommands, quietly, callback) {
        const currentWorkingDirectoryPath = process.cwd();
        process.chdir(this.subDirectoryPath);
        (0, _shell.executePromptly)(shellCommands, quietly, (success)=>{
            process.chdir(currentWorkingDirectoryPath);
            callback(success);
        });
    }
    updateDependencyVersion(name, versionString) {
        const success = updateSemver(name, versionString, this.dependencyMap);
        if (!success) {
            console.log(`Either the version of the '${this.subDirectoryPath}' release's '${name}' dependency is greater than or equal to the propagated '${versionString}' version or it cannot be parsed.`);
        }
        return success;
    }
    updateDevDependencyVersion(name, versionString) {
        const success = updateSemver(name, versionString, this.devDependencyMap);
        if (!success) {
            console.log(`Either the version of the '${this.subDirectoryPath}' release's '${name}' developer dependency is greater than or equal to the propagated '${versionString}' version or it cannot be parsed.`);
        }
        return success;
    }
    static fromSubDirectoryPath(subDirectoryPath) {
        let release = null;
        const packageJSON = (0, _packageJSON.readPackageJSONFile)(subDirectoryPath);
        if (packageJSON !== null) {
            let { version = null } = packageJSON;
            const { name = null, dependencies = {}, devDependencies = {} } = packageJSON, versionString = version; ///
            version = _version.default.fromVersionString(versionString);
            const dependencyMap = dependencies, devDependencyMap = devDependencies; ///
            release = new Release(name, version, dependencyMap, devDependencyMap, subDirectoryPath);
        }
        return release;
    }
}
function updateSemver(name, versionString, map) {
    let success = false;
    let semver = map[name] || null;
    const version = _version.default.fromVersionString(versionString), existingSemver = semver, existingVersion = _version.default.fromString(existingSemver);
    if (existingVersion !== null) {
        const versionGreaterThanExistingVersion = version.isGreaterThan(existingVersion);
        success = versionGreaterThanExistingVersion; ///
        if (success) {
            semver = version.updateSemver(semver);
            map[name] = semver;
        }
    }
    return success;
}
function shellCommandsFromSpecifier(specifier) {
    let shellCommands = (0, _configuration.retrieveShellCommands)();
    const { poll } = shellCommands, pollShellCommands = poll, args = {
        specifier
    };
    shellCommands = parseContent(pollShellCommands, args);
    return shellCommands;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWxlYXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcywgdGVtcGxhdGVVdGlsaXRpZXMsIGFzeW5jaHJvbm91c1V0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIlxuXG5pbXBvcnQgVmVyc2lvbiBmcm9tIFwiLi92ZXJzaW9uXCI7XG5cbmltcG9ydCB7IHJlYWRQYWNrYWdlSlNPTkZpbGUgfSBmcm9tIFwiLi91dGlsaXRpZXMvcGFja2FnZUpTT05cIjtcbmltcG9ydCB7IHNob3dDdXJzb3IsIGhpZGVDdXJzb3IgfSBmcm9tIFwiLi91dGlsaXRpZXMvdGVybWluYWxcIjtcbmltcG9ydCB7IGV4ZWN1dGVQcm9tcHRseSwgZXhlY3V0ZVJlcGVhdGVkbHkgfSBmcm9tIFwiLi91dGlsaXRpZXMvc2hlbGxcIjtcbmltcG9ydCB7IHJldHJpZXZlU2hlbGxDb21tYW5kcywgcmV0cmlldmVJZ25vcmVkQnVpbGRzLCByZXRyaWV2ZUlnbm9yZWRQdWJsaXNoZXMgfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uXCI7XG5cbmNvbnN0IHsgcHJ1bmUgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBldmVudHVhbGx5IH0gPSBhc3luY2hyb25vdXNVdGlsaXRpZXMsXG4gICAgICB7IHBhcnNlQ29udGVudCB9ID0gdGVtcGxhdGVVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbGVhc2Uge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB2ZXJzaW9uLCBkZXBlbmRlbmN5TWFwLCBkZXZEZXBlbmRlbmN5TWFwLCBzdWJEaXJlY3RvcnlQYXRoKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIHRoaXMuZGVwZW5kZW5jeU1hcCA9IGRlcGVuZGVuY3lNYXA7XG4gICAgdGhpcy5kZXZEZXBlbmRlbmN5TWFwID0gZGV2RGVwZW5kZW5jeU1hcDtcbiAgICB0aGlzLnN1YkRpcmVjdG9yeVBhdGggPSBzdWJEaXJlY3RvcnlQYXRoO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0VmVyc2lvbigpIHtcbiAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICB9XG5cbiAgZ2V0RGVwZW5kZW5jeU1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZXBlbmRlbmN5TWFwO1xuICB9XG5cbiAgZ2V0RGV2RGVwZW5kZW5jeU1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZXZEZXBlbmRlbmN5TWFwO1xuICB9XG5cbiAgZ2V0U3ViRGlyZWN0b3J5UGF0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJEaXJlY3RvcnlQYXRoO1xuICB9XG5cbiAgaXNQdWJsaXNoYWJsZSgpIHtcbiAgICBjb25zdCBwdWJsaXNoYWJsZSA9ICh0aGlzLm5hbWUgIT09IG51bGwpICYmICh0aGlzLnZlcnNpb24gIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHB1Ymxpc2hhYmxlO1xuICB9XG5cbiAgZ2V0VmVyc2lvblN0cmluZygpIHtcbiAgICBjb25zdCB2ZXJzaW9uU3RyaW5nID0gdGhpcy52ZXJzaW9uLmFzU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdmVyc2lvblN0cmluZzsgLy8vXG4gIH1cblxuICBnZXREZXBlbmRlbmN5TmFtZXMoKSB7XG4gICAgY29uc3QgZGVwZW5kZW5jeU5hbWVzID0gT2JqZWN0LmtleXModGhpcy5kZXBlbmRlbmN5TWFwKTtcblxuICAgIHJldHVybiBkZXBlbmRlbmN5TmFtZXM7XG4gIH1cblxuICBnZXREZXZEZXBlbmRlbmN5TmFtZXMoKSB7XG4gICAgY29uc3QgZGV2RGVwZW5kZW5jeU5hbWVzID0gT2JqZWN0LmtleXModGhpcy5kZXZEZXBlbmRlbmN5TWFwKTtcblxuICAgIHJldHVybiBkZXZEZXBlbmRlbmN5TmFtZXM7XG4gIH1cblxuICBnaXQocXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBsZXQgc2hlbGxDb21tYW5kcyA9IHJldHJpZXZlU2hlbGxDb21tYW5kcygpO1xuXG4gICAgY29uc3QgeyBnaXQgfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICBnaXRTaGVsbENvbW1hbmRzID0gZ2l0O1xuXG4gICAgc2hlbGxDb21tYW5kcyA9IGdpdFNoZWxsQ29tbWFuZHM7IC8vL1xuXG4gICAgdGhpcy5leGVjdXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjayk7XG4gIH1cblxuICBwb2xsKHNwZWNpZmllcnMsIHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gICAgY29uc3Qgc3BlY2lmaWVyc0xlbmd0aCA9IHNwZWNpZmllcnMubGVuZ3RoO1xuXG4gICAgaWYgKHNwZWNpZmllcnNMZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICBjYWxsYmFjayhzdWNjZXNzKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIChzcGVjaWZpZXJzTGVuZ3RoID09PSAxKSA/XG4gICAgICBjb25zb2xlLmxvZyhgUG9sbGluZyBmb3IgdGhlIGRlcGVuZGVuY3k6YCkgOlxuICAgICAgICBjb25zb2xlLmxvZyhgUG9sbGluZyBmb3IgdGhlIGRlcGVuZGVuaWVzOmApO1xuXG4gICAgaGlkZUN1cnNvcigpO1xuXG4gICAgc3BlY2lmaWVycy5mb3JFYWNoKChzcGVjaWZpZXIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGAgLSAke3NwZWNpZmllcn1gKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHNwZWNpZmllcnNMZW5ndGgsICAvLy9cbiAgICAgICAgICBvcGVyYXRpb25zID0gc3BlY2lmaWVycy5tYXAoKHNwZWNpZmllciwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAobmV4dCwgZG9uZSwgY29udGV4dCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzaGVsbENvbW1hbmRzID0gc2hlbGxDb21tYW5kc0Zyb21TcGVjaWZpZXIoc3BlY2lmaWVyKTtcblxuICAgICAgICAgICAgICBleGVjdXRlUmVwZWF0ZWRseShzaGVsbENvbW1hbmRzLCBzcGVjaWZpZXIsIGluZGV4LCBsZW5ndGgsIHF1aWV0bHksIChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbGxlZFNwZWNpZmllciA9IHNwZWNpZmllcjsgLy8vXG5cbiAgICAgICAgICAgICAgICAgIHBydW5lKHNwZWNpZmllcnMsIChzcGVjaWZpZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWNpZmllciAhPT0gcG9sbGVkU3BlY2lmaWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuXG4gICAgZXZlbnR1YWxseShvcGVyYXRpb25zLCAoKSA9PiB7XG4gICAgICBjb25zdCBzcGVjaWZpZXJzTGVuZ3RoID0gc3BlY2lmaWVycy5sZW5ndGgsXG4gICAgICAgICAgICBzdWNjZXNzID0gKHNwZWNpZmllcnNMZW5ndGggPT09IDApO1xuXG4gICAgICBzaG93Q3Vyc29yKCk7XG5cbiAgICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5zdGFsbChxdWlldGx5LCBjYWxsYmFjaykge1xuICAgIGxldCBzaGVsbENvbW1hbmRzID0gcmV0cmlldmVTaGVsbENvbW1hbmRzKCk7XG5cbiAgICBjb25zdCB7IGluc3RhbGwgfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICAgICAgaW5zdGFsbFNoZWxsQ29tbWFuZHMgPSBpbnN0YWxsO1xuXG4gICAgc2hlbGxDb21tYW5kcyA9IGluc3RhbGxTaGVsbENvbW1hbmRzOyAvLy9cblxuICAgIHRoaXMuZXhlY3V0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgY2FsbGJhY2spO1xuICB9XG5cbiAgYnVpbGQocXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBpZ25vcmVkQnVpbGRzID0gcmV0cmlldmVJZ25vcmVkQnVpbGRzKCksXG4gICAgICAgICAgc3ViRGlyZWN0b3J5UGF0aHMgPSBpZ25vcmVkQnVpbGRzLCAgLy8vXG4gICAgICAgICAgc3ViRGlyZWN0b3J5UGF0aHNJbmNsdWRlc1N1YkRpcmVjdG9yeVBhdGggPSBzdWJEaXJlY3RvcnlQYXRocy5pbmNsdWRlcyh0aGlzLnN1YkRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgIGJ1aWxkSWdub3JlZCA9IHN1YkRpcmVjdG9yeVBhdGhzSW5jbHVkZXNTdWJEaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgIGlmIChidWlsZElnbm9yZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBJZ25vcmluZyB0aGUgJyR7dGhpcy5zdWJEaXJlY3RvcnlQYXRofScgYnVpbGQuYCk7XG5cbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICBjYWxsYmFjayhzdWNjZXNzKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzaGVsbENvbW1hbmRzID0gcmV0cmlldmVTaGVsbENvbW1hbmRzKCk7XG5cbiAgICBjb25zdCB7IGJ1aWxkIH0gPSBzaGVsbENvbW1hbmRzLFxuICAgICAgICAgIGJ1aWxkU2hlbGxDb21tYW5kcyA9IGJ1aWxkO1xuXG4gICAgc2hlbGxDb21tYW5kcyA9IGJ1aWxkU2hlbGxDb21tYW5kczsgLy8vXG5cbiAgICB0aGlzLmV4ZWN1dGVTaGVsbENvbW1hbmRzKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1Ymxpc2gocXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBpZ25vcmVkUHVibGlzaGVzID0gcmV0cmlldmVJZ25vcmVkUHVibGlzaGVzKCksXG4gICAgICAgICAgbmFtZXMgPSBpZ25vcmVkUHVibGlzaGVzLFxuICAgICAgICAgIG5hbWVzSW5jbHVkZXNOYW1lID0gbmFtZXMuaW5jbHVkZXModGhpcy5uYW1lKSxcbiAgICAgICAgICBwdWJsaXNoSWdub3JlZCA9IG5hbWVzSW5jbHVkZXNOYW1lOyAvLy9cblxuICAgIGlmIChwdWJsaXNoSWdub3JlZCkge1xuICAgICAgY29uc29sZS5sb2coYElnbm9yaW5nIHRoZSAnJHt0aGlzLm5hbWV9JyBwdWJsaXNoLmApO1xuXG4gICAgICBjb25zdCBzdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgY2FsbGJhY2soc3VjY2Vzcyk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc2hlbGxDb21tYW5kcyA9IHJldHJpZXZlU2hlbGxDb21tYW5kcygpO1xuXG4gICAgY29uc3QgeyBwdWJsaXNoIH0gPSBzaGVsbENvbW1hbmRzLFxuICAgICAgICAgIHB1Ymxpc2hTaGVsbENvbW1hbmRzID0gcHVibGlzaDtcblxuICAgIHNoZWxsQ29tbWFuZHMgPSBwdWJsaXNoU2hlbGxDb21tYW5kczsgLy8vXG5cbiAgICB0aGlzLmV4ZWN1dGVTaGVsbENvbW1hbmRzKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGJ1bXBQYXRjaE51bWJlcigpIHsgdGhpcy52ZXJzaW9uLmJ1bXBQYXRjaE51bWJlcigpOyB9XG5cbiAgZXhlY3V0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBjdXJyZW50V29ya2luZ0RpcmVjdG9yeVBhdGggPSBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgcHJvY2Vzcy5jaGRpcih0aGlzLnN1YkRpcmVjdG9yeVBhdGgpO1xuXG4gICAgZXhlY3V0ZVByb21wdGx5KHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIChzdWNjZXNzKSA9PiB7XG4gICAgICBwcm9jZXNzLmNoZGlyKGN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRGVwZW5kZW5jeVZlcnNpb24obmFtZSwgdmVyc2lvblN0cmluZykge1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSB1cGRhdGVTZW12ZXIobmFtZSwgdmVyc2lvblN0cmluZywgdGhpcy5kZXBlbmRlbmN5TWFwKTtcblxuICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgY29uc29sZS5sb2coYEVpdGhlciB0aGUgdmVyc2lvbiBvZiB0aGUgJyR7dGhpcy5zdWJEaXJlY3RvcnlQYXRofScgcmVsZWFzZSdzICcke25hbWV9JyBkZXBlbmRlbmN5IGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgcHJvcGFnYXRlZCAnJHt2ZXJzaW9uU3RyaW5nfScgdmVyc2lvbiBvciBpdCBjYW5ub3QgYmUgcGFyc2VkLmApO1xuICAgIH1cblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgdXBkYXRlRGV2RGVwZW5kZW5jeVZlcnNpb24obmFtZSwgdmVyc2lvblN0cmluZykge1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSB1cGRhdGVTZW12ZXIobmFtZSwgdmVyc2lvblN0cmluZywgdGhpcy5kZXZEZXBlbmRlbmN5TWFwKTtcblxuICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgY29uc29sZS5sb2coYEVpdGhlciB0aGUgdmVyc2lvbiBvZiB0aGUgJyR7dGhpcy5zdWJEaXJlY3RvcnlQYXRofScgcmVsZWFzZSdzICcke25hbWV9JyBkZXZlbG9wZXIgZGVwZW5kZW5jeSBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHByb3BhZ2F0ZWQgJyR7dmVyc2lvblN0cmluZ30nIHZlcnNpb24gb3IgaXQgY2Fubm90IGJlIHBhcnNlZC5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tU3ViRGlyZWN0b3J5UGF0aChzdWJEaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IHJlbGVhc2UgPSBudWxsO1xuXG4gICAgY29uc3QgcGFja2FnZUpTT04gPSByZWFkUGFja2FnZUpTT05GaWxlKHN1YkRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHBhY2thZ2VKU09OICE9PSBudWxsKSB7XG4gICAgICBsZXQgeyB2ZXJzaW9uID0gbnVsbCB9ID0gcGFja2FnZUpTT047XG5cbiAgICAgIGNvbnN0IHsgbmFtZSA9IG51bGwsIGRlcGVuZGVuY2llcyA9IHt9LCBkZXZEZXBlbmRlbmNpZXMgPSB7fSB9ID0gcGFja2FnZUpTT04sXG4gICAgICAgICAgICB2ZXJzaW9uU3RyaW5nID0gdmVyc2lvbjsgIC8vL1xuXG4gICAgICB2ZXJzaW9uID0gVmVyc2lvbi5mcm9tVmVyc2lvblN0cmluZyh2ZXJzaW9uU3RyaW5nKTtcblxuICAgICAgY29uc3QgZGVwZW5kZW5jeU1hcCA9IGRlcGVuZGVuY2llcywgLy8vXG4gICAgICAgICAgICBkZXZEZXBlbmRlbmN5TWFwID0gZGV2RGVwZW5kZW5jaWVzOyAvLy9cblxuICAgICAgcmVsZWFzZSA9IG5ldyBSZWxlYXNlKG5hbWUsIHZlcnNpb24sIGRlcGVuZGVuY3lNYXAsIGRldkRlcGVuZGVuY3lNYXAsIHN1YkRpcmVjdG9yeVBhdGgpO1xuICAgIH1cblxuICAgIHJldHVybiByZWxlYXNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNlbXZlcihuYW1lLCB2ZXJzaW9uU3RyaW5nLCBtYXApIHtcbiAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICBsZXQgc2VtdmVyID0gbWFwW25hbWVdIHx8IG51bGw7XG5cbiAgY29uc3QgdmVyc2lvbiA9IFZlcnNpb24uZnJvbVZlcnNpb25TdHJpbmcodmVyc2lvblN0cmluZyksXG4gICAgICAgIGV4aXN0aW5nU2VtdmVyID0gc2VtdmVyLCAvLy9cbiAgICAgICAgZXhpc3RpbmdWZXJzaW9uID0gVmVyc2lvbi5mcm9tU3RyaW5nKGV4aXN0aW5nU2VtdmVyKTtcblxuICBpZiAoZXhpc3RpbmdWZXJzaW9uICE9PSBudWxsKSB7XG4gICAgY29uc3QgdmVyc2lvbkdyZWF0ZXJUaGFuRXhpc3RpbmdWZXJzaW9uID0gdmVyc2lvbi5pc0dyZWF0ZXJUaGFuKGV4aXN0aW5nVmVyc2lvbik7XG5cbiAgICBzdWNjZXNzID0gdmVyc2lvbkdyZWF0ZXJUaGFuRXhpc3RpbmdWZXJzaW9uOyAgLy8vXG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgc2VtdmVyID0gdmVyc2lvbi51cGRhdGVTZW12ZXIoc2VtdmVyKTtcblxuICAgICAgbWFwW25hbWVdID0gc2VtdmVyO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdWNjZXNzO1xufVxuXG5mdW5jdGlvbiBzaGVsbENvbW1hbmRzRnJvbVNwZWNpZmllcihzcGVjaWZpZXIpIHtcbiAgbGV0IHNoZWxsQ29tbWFuZHMgPSByZXRyaWV2ZVNoZWxsQ29tbWFuZHMoKTtcblxuICBjb25zdCB7IHBvbGwgfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICAgIHBvbGxTaGVsbENvbW1hbmRzID0gcG9sbCwgLy8vXG4gICAgICAgIGFyZ3MgPSB7XG4gICAgICAgICAgc3BlY2lmaWVyXG4gICAgICAgIH07XG5cbiAgc2hlbGxDb21tYW5kcyA9IHBhcnNlQ29udGVudChwb2xsU2hlbGxDb21tYW5kcywgYXJncyk7XG5cbiAgcmV0dXJuIHNoZWxsQ29tbWFuZHM7XG59XG4iXSwibmFtZXMiOlsiUmVsZWFzZSIsInBydW5lIiwiYXJyYXlVdGlsaXRpZXMiLCJldmVudHVhbGx5IiwiYXN5bmNocm9ub3VzVXRpbGl0aWVzIiwicGFyc2VDb250ZW50IiwidGVtcGxhdGVVdGlsaXRpZXMiLCJuYW1lIiwidmVyc2lvbiIsImRlcGVuZGVuY3lNYXAiLCJkZXZEZXBlbmRlbmN5TWFwIiwic3ViRGlyZWN0b3J5UGF0aCIsImdldE5hbWUiLCJnZXRWZXJzaW9uIiwiZ2V0RGVwZW5kZW5jeU1hcCIsImdldERldkRlcGVuZGVuY3lNYXAiLCJnZXRTdWJEaXJlY3RvcnlQYXRoIiwiaXNQdWJsaXNoYWJsZSIsInB1Ymxpc2hhYmxlIiwiZ2V0VmVyc2lvblN0cmluZyIsInZlcnNpb25TdHJpbmciLCJhc1N0cmluZyIsImdldERlcGVuZGVuY3lOYW1lcyIsImRlcGVuZGVuY3lOYW1lcyIsIk9iamVjdCIsImtleXMiLCJnZXREZXZEZXBlbmRlbmN5TmFtZXMiLCJkZXZEZXBlbmRlbmN5TmFtZXMiLCJnaXQiLCJxdWlldGx5IiwiY2FsbGJhY2siLCJzaGVsbENvbW1hbmRzIiwicmV0cmlldmVTaGVsbENvbW1hbmRzIiwiZ2l0U2hlbGxDb21tYW5kcyIsImV4ZWN1dGVTaGVsbENvbW1hbmRzIiwicG9sbCIsInNwZWNpZmllcnMiLCJzcGVjaWZpZXJzTGVuZ3RoIiwibGVuZ3RoIiwic3VjY2VzcyIsImNvbnNvbGUiLCJsb2ciLCJoaWRlQ3Vyc29yIiwiZm9yRWFjaCIsInNwZWNpZmllciIsIm9wZXJhdGlvbnMiLCJtYXAiLCJpbmRleCIsIm5leHQiLCJkb25lIiwiY29udGV4dCIsInNoZWxsQ29tbWFuZHNGcm9tU3BlY2lmaWVyIiwiZXhlY3V0ZVJlcGVhdGVkbHkiLCJwb2xsZWRTcGVjaWZpZXIiLCJzaG93Q3Vyc29yIiwiaW5zdGFsbCIsImluc3RhbGxTaGVsbENvbW1hbmRzIiwiYnVpbGQiLCJpZ25vcmVkQnVpbGRzIiwicmV0cmlldmVJZ25vcmVkQnVpbGRzIiwic3ViRGlyZWN0b3J5UGF0aHMiLCJzdWJEaXJlY3RvcnlQYXRoc0luY2x1ZGVzU3ViRGlyZWN0b3J5UGF0aCIsImluY2x1ZGVzIiwiYnVpbGRJZ25vcmVkIiwiYnVpbGRTaGVsbENvbW1hbmRzIiwicHVibGlzaCIsImlnbm9yZWRQdWJsaXNoZXMiLCJyZXRyaWV2ZUlnbm9yZWRQdWJsaXNoZXMiLCJuYW1lcyIsIm5hbWVzSW5jbHVkZXNOYW1lIiwicHVibGlzaElnbm9yZWQiLCJwdWJsaXNoU2hlbGxDb21tYW5kcyIsImJ1bXBQYXRjaE51bWJlciIsImN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aCIsInByb2Nlc3MiLCJjd2QiLCJjaGRpciIsImV4ZWN1dGVQcm9tcHRseSIsInVwZGF0ZURlcGVuZGVuY3lWZXJzaW9uIiwidXBkYXRlU2VtdmVyIiwidXBkYXRlRGV2RGVwZW5kZW5jeVZlcnNpb24iLCJmcm9tU3ViRGlyZWN0b3J5UGF0aCIsInJlbGVhc2UiLCJwYWNrYWdlSlNPTiIsInJlYWRQYWNrYWdlSlNPTkZpbGUiLCJkZXBlbmRlbmNpZXMiLCJkZXZEZXBlbmRlbmNpZXMiLCJWZXJzaW9uIiwiZnJvbVZlcnNpb25TdHJpbmciLCJzZW12ZXIiLCJleGlzdGluZ1NlbXZlciIsImV4aXN0aW5nVmVyc2lvbiIsImZyb21TdHJpbmciLCJ2ZXJzaW9uR3JlYXRlclRoYW5FeGlzdGluZ1ZlcnNpb24iLCJpc0dyZWF0ZXJUaGFuIiwicG9sbFNoZWxsQ29tbWFuZHMiLCJhcmdzIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFlQTs7O2VBQXFCQTs7OzJCQWJvRDtnRUFFckQ7NkJBRWdCOzBCQUNHO3VCQUNZOytCQUNvQzs7Ozs7O0FBRXZGLE1BQU0sRUFBRUMsS0FBSyxFQUFFLEdBQUdDLHlCQUFjLEVBQzFCLEVBQUVDLFVBQVUsRUFBRSxHQUFHQyxnQ0FBcUIsRUFDdEMsRUFBRUMsWUFBWSxFQUFFLEdBQUdDLDRCQUFpQjtBQUUzQixNQUFNTjtJQUNuQixZQUFZTyxJQUFJLEVBQUVDLE9BQU8sRUFBRUMsYUFBYSxFQUFFQyxnQkFBZ0IsRUFBRUMsZ0JBQWdCLENBQUU7UUFDNUUsSUFBSSxDQUFDSixJQUFJLEdBQUdBO1FBQ1osSUFBSSxDQUFDQyxPQUFPLEdBQUdBO1FBQ2YsSUFBSSxDQUFDQyxhQUFhLEdBQUdBO1FBQ3JCLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUdBO1FBQ3hCLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUdBO0lBQzFCO0lBRUFDLFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQ0wsSUFBSTtJQUNsQjtJQUVBTSxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUNMLE9BQU87SUFD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