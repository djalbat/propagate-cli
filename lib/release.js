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
    poll(specifiers, quietly, delay, attempts, callback) {
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
                (0, _shell.executeRepeatedly)(shellCommands, specifier, index, length, quietly, delay, attempts, (success)=>{
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWxlYXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcywgdGVtcGxhdGVVdGlsaXRpZXMsIGFzeW5jaHJvbm91c1V0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIlxuXG5pbXBvcnQgVmVyc2lvbiBmcm9tIFwiLi92ZXJzaW9uXCI7XG5cbmltcG9ydCB7IHJlYWRQYWNrYWdlSlNPTkZpbGUgfSBmcm9tIFwiLi91dGlsaXRpZXMvcGFja2FnZUpTT05cIjtcbmltcG9ydCB7IHNob3dDdXJzb3IsIGhpZGVDdXJzb3IgfSBmcm9tIFwiLi91dGlsaXRpZXMvdGVybWluYWxcIjtcbmltcG9ydCB7IGV4ZWN1dGVQcm9tcHRseSwgZXhlY3V0ZVJlcGVhdGVkbHkgfSBmcm9tIFwiLi91dGlsaXRpZXMvc2hlbGxcIjtcbmltcG9ydCB7IHJldHJpZXZlU2hlbGxDb21tYW5kcywgcmV0cmlldmVJZ25vcmVkQnVpbGRzLCByZXRyaWV2ZUlnbm9yZWRQdWJsaXNoZXMgfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uXCI7XG5cbmNvbnN0IHsgcHJ1bmUgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBldmVudHVhbGx5IH0gPSBhc3luY2hyb25vdXNVdGlsaXRpZXMsXG4gICAgICB7IHBhcnNlQ29udGVudCB9ID0gdGVtcGxhdGVVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbGVhc2Uge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB2ZXJzaW9uLCBkZXBlbmRlbmN5TWFwLCBkZXZEZXBlbmRlbmN5TWFwLCBzdWJEaXJlY3RvcnlQYXRoKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIHRoaXMuZGVwZW5kZW5jeU1hcCA9IGRlcGVuZGVuY3lNYXA7XG4gICAgdGhpcy5kZXZEZXBlbmRlbmN5TWFwID0gZGV2RGVwZW5kZW5jeU1hcDtcbiAgICB0aGlzLnN1YkRpcmVjdG9yeVBhdGggPSBzdWJEaXJlY3RvcnlQYXRoO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0VmVyc2lvbigpIHtcbiAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICB9XG5cbiAgZ2V0RGVwZW5kZW5jeU1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZXBlbmRlbmN5TWFwO1xuICB9XG5cbiAgZ2V0RGV2RGVwZW5kZW5jeU1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZXZEZXBlbmRlbmN5TWFwO1xuICB9XG5cbiAgZ2V0U3ViRGlyZWN0b3J5UGF0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJEaXJlY3RvcnlQYXRoO1xuICB9XG5cbiAgaXNQdWJsaXNoYWJsZSgpIHtcbiAgICBjb25zdCBwdWJsaXNoYWJsZSA9ICh0aGlzLm5hbWUgIT09IG51bGwpICYmICh0aGlzLnZlcnNpb24gIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHB1Ymxpc2hhYmxlO1xuICB9XG5cbiAgZ2V0VmVyc2lvblN0cmluZygpIHtcbiAgICBjb25zdCB2ZXJzaW9uU3RyaW5nID0gdGhpcy52ZXJzaW9uLmFzU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdmVyc2lvblN0cmluZzsgLy8vXG4gIH1cblxuICBnZXREZXBlbmRlbmN5TmFtZXMoKSB7XG4gICAgY29uc3QgZGVwZW5kZW5jeU5hbWVzID0gT2JqZWN0LmtleXModGhpcy5kZXBlbmRlbmN5TWFwKTtcblxuICAgIHJldHVybiBkZXBlbmRlbmN5TmFtZXM7XG4gIH1cblxuICBnZXREZXZEZXBlbmRlbmN5TmFtZXMoKSB7XG4gICAgY29uc3QgZGV2RGVwZW5kZW5jeU5hbWVzID0gT2JqZWN0LmtleXModGhpcy5kZXZEZXBlbmRlbmN5TWFwKTtcblxuICAgIHJldHVybiBkZXZEZXBlbmRlbmN5TmFtZXM7XG4gIH1cblxuICBnaXQocXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBsZXQgc2hlbGxDb21tYW5kcyA9IHJldHJpZXZlU2hlbGxDb21tYW5kcygpO1xuXG4gICAgY29uc3QgeyBnaXQgfSA9IHNoZWxsQ29tbWFuZHMsXG4gICAgICBnaXRTaGVsbENvbW1hbmRzID0gZ2l0O1xuXG4gICAgc2hlbGxDb21tYW5kcyA9IGdpdFNoZWxsQ29tbWFuZHM7IC8vL1xuXG4gICAgdGhpcy5leGVjdXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjayk7XG4gIH1cblxuICBwb2xsKHNwZWNpZmllcnMsIHF1aWV0bHksIGRlbGF5LCBhdHRlbXB0cywgY2FsbGJhY2spIHtcbiAgICBjb25zdCBzcGVjaWZpZXJzTGVuZ3RoID0gc3BlY2lmaWVycy5sZW5ndGg7XG5cbiAgICBpZiAoc3BlY2lmaWVyc0xlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3Qgc3VjY2VzcyA9IHRydWU7XG5cbiAgICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgKHNwZWNpZmllcnNMZW5ndGggPT09IDEpID9cbiAgICAgIGNvbnNvbGUubG9nKGBQb2xsaW5nIGZvciB0aGUgZGVwZW5kZW5jeTpgKSA6XG4gICAgICAgIGNvbnNvbGUubG9nKGBQb2xsaW5nIGZvciB0aGUgZGVwZW5kZW5pZXM6YCk7XG5cbiAgICBoaWRlQ3Vyc29yKCk7XG5cbiAgICBzcGVjaWZpZXJzLmZvckVhY2goKHNwZWNpZmllcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coYCAtICR7c3BlY2lmaWVyfWApO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGVuZ3RoID0gc3BlY2lmaWVyc0xlbmd0aCwgIC8vL1xuICAgICAgICAgIG9wZXJhdGlvbnMgPSBzcGVjaWZpZXJzLm1hcCgoc3BlY2lmaWVyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChuZXh0LCBkb25lLCBjb250ZXh0KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNoZWxsQ29tbWFuZHMgPSBzaGVsbENvbW1hbmRzRnJvbVNwZWNpZmllcihzcGVjaWZpZXIpO1xuXG4gICAgICAgICAgICAgIGV4ZWN1dGVSZXBlYXRlZGx5KHNoZWxsQ29tbWFuZHMsIHNwZWNpZmllciwgaW5kZXgsIGxlbmd0aCwgcXVpZXRseSwgZGVsYXksIGF0dGVtcHRzLCAoc3VjY2VzcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwb2xsZWRTcGVjaWZpZXIgPSBzcGVjaWZpZXI7IC8vL1xuXG4gICAgICAgICAgICAgICAgICBwcnVuZShzcGVjaWZpZXJzLCAoc3BlY2lmaWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGVjaWZpZXIgIT09IHBvbGxlZFNwZWNpZmllcikge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcblxuICAgIGV2ZW50dWFsbHkob3BlcmF0aW9ucywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3BlY2lmaWVyc0xlbmd0aCA9IHNwZWNpZmllcnMubGVuZ3RoLFxuICAgICAgICAgICAgc3VjY2VzcyA9IChzcGVjaWZpZXJzTGVuZ3RoID09PSAwKTtcblxuICAgICAgc2hvd0N1cnNvcigpO1xuXG4gICAgICBjYWxsYmFjayhzdWNjZXNzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluc3RhbGwocXVpZXRseSwgY2FsbGJhY2spIHtcbiAgICBsZXQgc2hlbGxDb21tYW5kcyA9IHJldHJpZXZlU2hlbGxDb21tYW5kcygpO1xuXG4gICAgY29uc3QgeyBpbnN0YWxsIH0gPSBzaGVsbENvbW1hbmRzLFxuICAgICAgICAgIGluc3RhbGxTaGVsbENvbW1hbmRzID0gaW5zdGFsbDtcblxuICAgIHNoZWxsQ29tbWFuZHMgPSBpbnN0YWxsU2hlbGxDb21tYW5kczsgLy8vXG5cbiAgICB0aGlzLmV4ZWN1dGVTaGVsbENvbW1hbmRzKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGJ1aWxkKHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaWdub3JlZEJ1aWxkcyA9IHJldHJpZXZlSWdub3JlZEJ1aWxkcygpLFxuICAgICAgICAgIHN1YkRpcmVjdG9yeVBhdGhzID0gaWdub3JlZEJ1aWxkcywgIC8vL1xuICAgICAgICAgIHN1YkRpcmVjdG9yeVBhdGhzSW5jbHVkZXNTdWJEaXJlY3RvcnlQYXRoID0gc3ViRGlyZWN0b3J5UGF0aHMuaW5jbHVkZXModGhpcy5zdWJEaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgICBidWlsZElnbm9yZWQgPSBzdWJEaXJlY3RvcnlQYXRoc0luY2x1ZGVzU3ViRGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICBpZiAoYnVpbGRJZ25vcmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhgSWdub3JpbmcgdGhlICcke3RoaXMuc3ViRGlyZWN0b3J5UGF0aH0nIGJ1aWxkLmApO1xuXG4gICAgICBjb25zdCBzdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgY2FsbGJhY2soc3VjY2Vzcyk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc2hlbGxDb21tYW5kcyA9IHJldHJpZXZlU2hlbGxDb21tYW5kcygpO1xuXG4gICAgY29uc3QgeyBidWlsZCB9ID0gc2hlbGxDb21tYW5kcyxcbiAgICAgICAgICBidWlsZFNoZWxsQ29tbWFuZHMgPSBidWlsZDtcblxuICAgIHNoZWxsQ29tbWFuZHMgPSBidWlsZFNoZWxsQ29tbWFuZHM7IC8vL1xuXG4gICAgdGhpcy5leGVjdXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjayk7XG4gIH1cblxuICBwdWJsaXNoKHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaWdub3JlZFB1Ymxpc2hlcyA9IHJldHJpZXZlSWdub3JlZFB1Ymxpc2hlcygpLFxuICAgICAgICAgIG5hbWVzID0gaWdub3JlZFB1Ymxpc2hlcyxcbiAgICAgICAgICBuYW1lc0luY2x1ZGVzTmFtZSA9IG5hbWVzLmluY2x1ZGVzKHRoaXMubmFtZSksXG4gICAgICAgICAgcHVibGlzaElnbm9yZWQgPSBuYW1lc0luY2x1ZGVzTmFtZTsgLy8vXG5cbiAgICBpZiAocHVibGlzaElnbm9yZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBJZ25vcmluZyB0aGUgJyR7dGhpcy5uYW1lfScgcHVibGlzaC5gKTtcblxuICAgICAgY29uc3Qgc3VjY2VzcyA9IHRydWU7XG5cbiAgICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHNoZWxsQ29tbWFuZHMgPSByZXRyaWV2ZVNoZWxsQ29tbWFuZHMoKTtcblxuICAgIGNvbnN0IHsgcHVibGlzaCB9ID0gc2hlbGxDb21tYW5kcyxcbiAgICAgICAgICBwdWJsaXNoU2hlbGxDb21tYW5kcyA9IHB1Ymxpc2g7XG5cbiAgICBzaGVsbENvbW1hbmRzID0gcHVibGlzaFNoZWxsQ29tbWFuZHM7IC8vL1xuXG4gICAgdGhpcy5leGVjdXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjayk7XG4gIH1cblxuICBidW1wUGF0Y2hOdW1iZXIoKSB7IHRoaXMudmVyc2lvbi5idW1wUGF0Y2hOdW1iZXIoKTsgfVxuXG4gIGV4ZWN1dGVTaGVsbENvbW1hbmRzKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoID0gcHJvY2Vzcy5jd2QoKTtcblxuICAgIHByb2Nlc3MuY2hkaXIodGhpcy5zdWJEaXJlY3RvcnlQYXRoKTtcblxuICAgIGV4ZWN1dGVQcm9tcHRseShzaGVsbENvbW1hbmRzLCBxdWlldGx5LCAoc3VjY2VzcykgPT4ge1xuICAgICAgcHJvY2Vzcy5jaGRpcihjdXJyZW50V29ya2luZ0RpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBjYWxsYmFjayhzdWNjZXNzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZURlcGVuZGVuY3lWZXJzaW9uKG5hbWUsIHZlcnNpb25TdHJpbmcpIHtcbiAgICBjb25zdCBzdWNjZXNzID0gdXBkYXRlU2VtdmVyKG5hbWUsIHZlcnNpb25TdHJpbmcsIHRoaXMuZGVwZW5kZW5jeU1hcCk7XG5cbiAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBFaXRoZXIgdGhlIHZlcnNpb24gb2YgdGhlICcke3RoaXMuc3ViRGlyZWN0b3J5UGF0aH0nIHJlbGVhc2UncyAnJHtuYW1lfScgZGVwZW5kZW5jeSBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHByb3BhZ2F0ZWQgJyR7dmVyc2lvblN0cmluZ30nIHZlcnNpb24gb3IgaXQgY2Fubm90IGJlIHBhcnNlZC5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIHVwZGF0ZURldkRlcGVuZGVuY3lWZXJzaW9uKG5hbWUsIHZlcnNpb25TdHJpbmcpIHtcbiAgICBjb25zdCBzdWNjZXNzID0gdXBkYXRlU2VtdmVyKG5hbWUsIHZlcnNpb25TdHJpbmcsIHRoaXMuZGV2RGVwZW5kZW5jeU1hcCk7XG5cbiAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBFaXRoZXIgdGhlIHZlcnNpb24gb2YgdGhlICcke3RoaXMuc3ViRGlyZWN0b3J5UGF0aH0nIHJlbGVhc2UncyAnJHtuYW1lfScgZGV2ZWxvcGVyIGRlcGVuZGVuY3kgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBwcm9wYWdhdGVkICcke3ZlcnNpb25TdHJpbmd9JyB2ZXJzaW9uIG9yIGl0IGNhbm5vdCBiZSBwYXJzZWQuYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICBzdGF0aWMgZnJvbVN1YkRpcmVjdG9yeVBhdGgoc3ViRGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCByZWxlYXNlID0gbnVsbDtcblxuICAgIGNvbnN0IHBhY2thZ2VKU09OID0gcmVhZFBhY2thZ2VKU09ORmlsZShzdWJEaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChwYWNrYWdlSlNPTiAhPT0gbnVsbCkge1xuICAgICAgbGV0IHsgdmVyc2lvbiA9IG51bGwgfSA9IHBhY2thZ2VKU09OO1xuXG4gICAgICBjb25zdCB7IG5hbWUgPSBudWxsLCBkZXBlbmRlbmNpZXMgPSB7fSwgZGV2RGVwZW5kZW5jaWVzID0ge30gfSA9IHBhY2thZ2VKU09OLFxuICAgICAgICAgICAgdmVyc2lvblN0cmluZyA9IHZlcnNpb247ICAvLy9cblxuICAgICAgdmVyc2lvbiA9IFZlcnNpb24uZnJvbVZlcnNpb25TdHJpbmcodmVyc2lvblN0cmluZyk7XG5cbiAgICAgIGNvbnN0IGRlcGVuZGVuY3lNYXAgPSBkZXBlbmRlbmNpZXMsIC8vL1xuICAgICAgICAgICAgZGV2RGVwZW5kZW5jeU1hcCA9IGRldkRlcGVuZGVuY2llczsgLy8vXG5cbiAgICAgIHJlbGVhc2UgPSBuZXcgUmVsZWFzZShuYW1lLCB2ZXJzaW9uLCBkZXBlbmRlbmN5TWFwLCBkZXZEZXBlbmRlbmN5TWFwLCBzdWJEaXJlY3RvcnlQYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVsZWFzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVTZW12ZXIobmFtZSwgdmVyc2lvblN0cmluZywgbWFwKSB7XG4gIGxldCBzdWNjZXNzID0gZmFsc2U7XG5cbiAgbGV0IHNlbXZlciA9IG1hcFtuYW1lXSB8fCBudWxsO1xuXG4gIGNvbnN0IHZlcnNpb24gPSBWZXJzaW9uLmZyb21WZXJzaW9uU3RyaW5nKHZlcnNpb25TdHJpbmcpLFxuICAgICAgICBleGlzdGluZ1NlbXZlciA9IHNlbXZlciwgLy8vXG4gICAgICAgIGV4aXN0aW5nVmVyc2lvbiA9IFZlcnNpb24uZnJvbVN0cmluZyhleGlzdGluZ1NlbXZlcik7XG5cbiAgaWYgKGV4aXN0aW5nVmVyc2lvbiAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHZlcnNpb25HcmVhdGVyVGhhbkV4aXN0aW5nVmVyc2lvbiA9IHZlcnNpb24uaXNHcmVhdGVyVGhhbihleGlzdGluZ1ZlcnNpb24pO1xuXG4gICAgc3VjY2VzcyA9IHZlcnNpb25HcmVhdGVyVGhhbkV4aXN0aW5nVmVyc2lvbjsgIC8vL1xuXG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIHNlbXZlciA9IHZlcnNpb24udXBkYXRlU2VtdmVyKHNlbXZlcik7XG5cbiAgICAgIG1hcFtuYW1lXSA9IHNlbXZlcjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VjY2Vzcztcbn1cblxuZnVuY3Rpb24gc2hlbGxDb21tYW5kc0Zyb21TcGVjaWZpZXIoc3BlY2lmaWVyKSB7XG4gIGxldCBzaGVsbENvbW1hbmRzID0gcmV0cmlldmVTaGVsbENvbW1hbmRzKCk7XG5cbiAgY29uc3QgeyBwb2xsIH0gPSBzaGVsbENvbW1hbmRzLFxuICAgICAgICBwb2xsU2hlbGxDb21tYW5kcyA9IHBvbGwsIC8vL1xuICAgICAgICBhcmdzID0ge1xuICAgICAgICAgIHNwZWNpZmllclxuICAgICAgICB9O1xuXG4gIHNoZWxsQ29tbWFuZHMgPSBwYXJzZUNvbnRlbnQocG9sbFNoZWxsQ29tbWFuZHMsIGFyZ3MpO1xuXG4gIHJldHVybiBzaGVsbENvbW1hbmRzO1xufVxuIl0sIm5hbWVzIjpbIlJlbGVhc2UiLCJwcnVuZSIsImFycmF5VXRpbGl0aWVzIiwiZXZlbnR1YWxseSIsImFzeW5jaHJvbm91c1V0aWxpdGllcyIsInBhcnNlQ29udGVudCIsInRlbXBsYXRlVXRpbGl0aWVzIiwibmFtZSIsInZlcnNpb24iLCJkZXBlbmRlbmN5TWFwIiwiZGV2RGVwZW5kZW5jeU1hcCIsInN1YkRpcmVjdG9yeVBhdGgiLCJnZXROYW1lIiwiZ2V0VmVyc2lvbiIsImdldERlcGVuZGVuY3lNYXAiLCJnZXREZXZEZXBlbmRlbmN5TWFwIiwiZ2V0U3ViRGlyZWN0b3J5UGF0aCIsImlzUHVibGlzaGFibGUiLCJwdWJsaXNoYWJsZSIsImdldFZlcnNpb25TdHJpbmciLCJ2ZXJzaW9uU3RyaW5nIiwiYXNTdHJpbmciLCJnZXREZXBlbmRlbmN5TmFtZXMiLCJkZXBlbmRlbmN5TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwiZ2V0RGV2RGVwZW5kZW5jeU5hbWVzIiwiZGV2RGVwZW5kZW5jeU5hbWVzIiwiZ2l0IiwicXVpZXRseSIsImNhbGxiYWNrIiwic2hlbGxDb21tYW5kcyIsInJldHJpZXZlU2hlbGxDb21tYW5kcyIsImdpdFNoZWxsQ29tbWFuZHMiLCJleGVjdXRlU2hlbGxDb21tYW5kcyIsInBvbGwiLCJzcGVjaWZpZXJzIiwiZGVsYXkiLCJhdHRlbXB0cyIsInNwZWNpZmllcnNMZW5ndGgiLCJsZW5ndGgiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsImhpZGVDdXJzb3IiLCJmb3JFYWNoIiwic3BlY2lmaWVyIiwib3BlcmF0aW9ucyIsIm1hcCIsImluZGV4IiwibmV4dCIsImRvbmUiLCJjb250ZXh0Iiwic2hlbGxDb21tYW5kc0Zyb21TcGVjaWZpZXIiLCJleGVjdXRlUmVwZWF0ZWRseSIsInBvbGxlZFNwZWNpZmllciIsInNob3dDdXJzb3IiLCJpbnN0YWxsIiwiaW5zdGFsbFNoZWxsQ29tbWFuZHMiLCJidWlsZCIsImlnbm9yZWRCdWlsZHMiLCJyZXRyaWV2ZUlnbm9yZWRCdWlsZHMiLCJzdWJEaXJlY3RvcnlQYXRocyIsInN1YkRpcmVjdG9yeVBhdGhzSW5jbHVkZXNTdWJEaXJlY3RvcnlQYXRoIiwiaW5jbHVkZXMiLCJidWlsZElnbm9yZWQiLCJidWlsZFNoZWxsQ29tbWFuZHMiLCJwdWJsaXNoIiwiaWdub3JlZFB1Ymxpc2hlcyIsInJldHJpZXZlSWdub3JlZFB1Ymxpc2hlcyIsIm5hbWVzIiwibmFtZXNJbmNsdWRlc05hbWUiLCJwdWJsaXNoSWdub3JlZCIsInB1Ymxpc2hTaGVsbENvbW1hbmRzIiwiYnVtcFBhdGNoTnVtYmVyIiwiY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoIiwicHJvY2VzcyIsImN3ZCIsImNoZGlyIiwiZXhlY3V0ZVByb21wdGx5IiwidXBkYXRlRGVwZW5kZW5jeVZlcnNpb24iLCJ1cGRhdGVTZW12ZXIiLCJ1cGRhdGVEZXZEZXBlbmRlbmN5VmVyc2lvbiIsImZyb21TdWJEaXJlY3RvcnlQYXRoIiwicmVsZWFzZSIsInBhY2thZ2VKU09OIiwicmVhZFBhY2thZ2VKU09ORmlsZSIsImRlcGVuZGVuY2llcyIsImRldkRlcGVuZGVuY2llcyIsIlZlcnNpb24iLCJmcm9tVmVyc2lvblN0cmluZyIsInNlbXZlciIsImV4aXN0aW5nU2VtdmVyIiwiZXhpc3RpbmdWZXJzaW9uIiwiZnJvbVN0cmluZyIsInZlcnNpb25HcmVhdGVyVGhhbkV4aXN0aW5nVmVyc2lvbiIsImlzR3JlYXRlclRoYW4iLCJwb2xsU2hlbGxDb21tYW5kcyIsImFyZ3MiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQWVBOzs7ZUFBcUJBOzs7MkJBYm9EO2dFQUVyRDs2QkFFZ0I7MEJBQ0c7dUJBQ1k7K0JBQ29DOzs7Ozs7QUFFdkYsTUFBTSxFQUFFQyxLQUFLLEVBQUUsR0FBR0MseUJBQWMsRUFDMUIsRUFBRUMsVUFBVSxFQUFFLEdBQUdDLGdDQUFxQixFQUN0QyxFQUFFQyxZQUFZLEVBQUUsR0FBR0MsNEJBQWlCO0FBRTNCLE1BQU1OO0lBQ25CLFlBQVlPLElBQUksRUFBRUMsT0FBTyxFQUFFQyxhQUFhLEVBQUVDLGdCQUFnQixFQUFFQyxnQkFBZ0IsQ0FBRTtRQUM1RSxJQUFJLENBQUNKLElBQUksR0FBR0E7UUFDWixJQUFJLENBQUNDLE9BQU8sR0FBR0E7UUFDZixJQUFJLENBQUNDLGFBQWEsR0FBR0E7UUFDckIsSUFBSSxDQUFDQyxnQkFBZ0IsR0FBR0E7UUFDeEIsSUFBSSxDQUFDQyxnQkFBZ0IsR0FBR0E7SUFDMUI7SUFFQUMsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFD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