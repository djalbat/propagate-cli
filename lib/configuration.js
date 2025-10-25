"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get assertConfigurationFileExists () {
        return assertConfigurationFileExists;
    },
    get checkConfigurationFileExists () {
        return checkConfigurationFileExists;
    },
    get createConfigurationFile () {
        return createConfigurationFile;
    },
    get migrateConfigurationFile () {
        return migrateConfigurationFile;
    },
    get retrieveDirectories () {
        return retrieveDirectories;
    },
    get retrieveForcedDependencyRelations () {
        return retrieveForcedDependencyRelations;
    },
    get retrieveIgnoredBuilds () {
        return retrieveIgnoredBuilds;
    },
    get retrieveIgnoredDependencies () {
        return retrieveIgnoredDependencies;
    },
    get retrieveIgnoredPublishes () {
        return retrieveIgnoredPublishes;
    },
    get retrieveShellCommands () {
        return retrieveShellCommands;
    },
    get updateDirectories () {
        return updateDirectories;
    },
    get updateForcedDependencyRelations () {
        return updateForcedDependencyRelations;
    },
    get updateIgnoredDependencies () {
        return updateIgnoredDependencies;
    },
    get updateShellCommands () {
        return updateShellCommands;
    }
});
var _necessary = require("necessary");
var _constants = require("./constants");
var _version_1_10 = require("./configuration/version_1_10");
var _version_1_3 = require("./configuration/version_1_3");
var _version_1_7 = require("./configuration/version_1_7");
var _version_1_9 = require("./configuration/version_1_9");
var _messages = require("./messages");
var _versions = require("./versions");
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
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
var rc = _necessary.configurationUtilities.rc, migrate = _necessary.versionUtilities.migrate, setRCBaseExtension = rc.setRCBaseExtension, checkRCFileExists = rc.checkRCFileExists, updateRCFile = rc.updateRCFile, writeRCFile = rc.writeRCFile, readRCFile = rc.readRCFile;
setRCBaseExtension(_constants.PROPAGATE);
function retrieveDirectories() {
    var configuration = readConfigurationFile(), directories = configuration.directories;
    return directories;
}
function retrieveShellCommands() {
    var configuration = readConfigurationFile(), shellCommands = configuration.shellCommands;
    return shellCommands;
}
function retrieveIgnoredBuilds() {
    var configuration = readConfigurationFile(), ignoredBuilds = configuration.ignoredBuilds;
    return ignoredBuilds;
}
function retrieveIgnoredPublishes() {
    var configuration = readConfigurationFile(), ignoredPublishes = configuration.ignoredPublishes;
    return ignoredPublishes;
}
function retrieveIgnoredDependencies() {
    var configuration = readConfigurationFile(), ignoredDependencies = configuration.ignoredDependencies;
    return ignoredDependencies;
}
function retrieveForcedDependencyRelations() {
    var configuration = readConfigurationFile(), forcedDependencyRelations = configuration.forcedDependencyRelations;
    return forcedDependencyRelations;
}
function updateDirectories(directories) {
    updateConfigurationFile({
        directories: directories
    });
}
function updateShellCommands(shellCommands) {
    updateConfigurationFile({
        shellCommands: shellCommands
    });
}
function updateIgnoredDependencies(ignoredDependencies) {
    updateConfigurationFile({
        ignoredDependencies: ignoredDependencies
    });
}
function updateForcedDependencyRelations(forcedDependencyRelations) {
    updateConfigurationFile({
        forcedDependencyRelations: forcedDependencyRelations
    });
}
function createConfigurationFile() {
    var configuration = (0, _version_1_10.createConfiguration)(), json = configuration; ///
    writeRCFile(json);
}
function migrateConfigurationFile() {
    assertConfigurationFileExists();
    var json = readRCFile();
    var _obj;
    var migrationMap = (_obj = {}, _define_property(_obj, _versions.VERSION_1_0, _version_1_3.migrateConfigurationToVersion_1_3), _define_property(_obj, _versions.VERSION_1_3, _version_1_7.migrateConfigurationToVersion_1_7), _define_property(_obj, _versions.VERSION_1_7, _version_1_9.migrateConfigurationToVersion_1_9), _define_property(_obj, _versions.VERSION_1_9, _version_1_10.migrateConfigurationToVersion_1_10), _obj), latestVersion = _versions.VERSION_1_10;
    json = migrate(json, migrationMap, latestVersion);
    writeRCFile(json);
}
function checkConfigurationFileExists() {
    var rcFileExists = checkRCFileExists(), configurationFileExists = rcFileExists; ///
    return configurationFileExists;
}
function assertConfigurationFileExists() {
    var configurationFileExists = checkConfigurationFileExists();
    if (!configurationFileExists) {
        console.log(_messages.CONFIGURATION_FILE_DOES_NOT_EXIST_MESSAGE);
        process.exit(1);
    }
}
function readConfigurationFile() {
    assertConfigurationFileExists();
    var json = readRCFile(), configuration = json; ///
    return configuration;
}
function writeConfigurationFile(configuration) {
    assertConfigurationFileExists();
    var json = configuration; ///
    writeRCFile(json);
}
function updateConfigurationFile(addedConfiguration) {
    for(var _len = arguments.length, deleteConfigurationNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        deleteConfigurationNames[_key - 1] = arguments[_key];
    }
    assertConfigurationFileExists();
    var addedProperties = addedConfiguration, deletedPropertyNames = deleteConfigurationNames; ///
    updateRCFile.apply(void 0, [
        addedProperties
    ].concat(_to_consumable_array(deletedPropertyNames)));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWd1cmF0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyB2ZXJzaW9uVXRpbGl0aWVzLCBjb25maWd1cmF0aW9uVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBQUk9QQUdBVEUgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGNyZWF0ZUNvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uL3ZlcnNpb25fMV8xMFwiO1xuaW1wb3J0IHsgbWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV8zIH0gZnJvbSBcIi4vY29uZmlndXJhdGlvbi92ZXJzaW9uXzFfM1wiO1xuaW1wb3J0IHsgbWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV83IH0gZnJvbSBcIi4vY29uZmlndXJhdGlvbi92ZXJzaW9uXzFfN1wiO1xuaW1wb3J0IHsgbWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV85IH0gZnJvbSBcIi4vY29uZmlndXJhdGlvbi92ZXJzaW9uXzFfOVwiO1xuaW1wb3J0IHsgbWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV8xMCB9IGZyb20gXCIuL2NvbmZpZ3VyYXRpb24vdmVyc2lvbl8xXzEwXCI7XG5pbXBvcnQgeyBDT05GSUdVUkFUSU9OX0ZJTEVfRE9FU19OT1RfRVhJU1RfTUVTU0FHRSB9IGZyb20gXCIuL21lc3NhZ2VzXCI7XG5pbXBvcnQgeyBWRVJTSU9OXzFfMCwgVkVSU0lPTl8xXzMsIFZFUlNJT05fMV83LCBWRVJTSU9OXzFfOSwgVkVSU0lPTl8xXzEwIH0gZnJvbSBcIi4vdmVyc2lvbnNcIjtcblxuY29uc3QgeyByYyB9ID0gY29uZmlndXJhdGlvblV0aWxpdGllcyxcbiAgICAgIHsgbWlncmF0ZSB9ID0gdmVyc2lvblV0aWxpdGllcyxcbiAgICAgIHsgc2V0UkNCYXNlRXh0ZW5zaW9uLCBjaGVja1JDRmlsZUV4aXN0cywgdXBkYXRlUkNGaWxlLCB3cml0ZVJDRmlsZSwgcmVhZFJDRmlsZSB9ID0gcmM7XG5cbnNldFJDQmFzZUV4dGVuc2lvbihQUk9QQUdBVEUpO1xuXG5leHBvcnQgZnVuY3Rpb24gcmV0cmlldmVEaXJlY3RvcmllcygpIHtcbiAgY29uc3QgY29uZmlndXJhdGlvbiA9IHJlYWRDb25maWd1cmF0aW9uRmlsZSgpLFxuICAgICAgICB7IGRpcmVjdG9yaWVzIH0gPSBjb25maWd1cmF0aW9uO1xuXG4gIHJldHVybiBkaXJlY3Rvcmllcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldHJpZXZlU2hlbGxDb21tYW5kcygpIHtcbiAgY29uc3QgY29uZmlndXJhdGlvbiA9IHJlYWRDb25maWd1cmF0aW9uRmlsZSgpLFxuICAgICAgICB7IHNoZWxsQ29tbWFuZHMgfSA9IGNvbmZpZ3VyYXRpb247XG5cbiAgcmV0dXJuIHNoZWxsQ29tbWFuZHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXRyaWV2ZUlnbm9yZWRCdWlsZHMoKSB7XG4gIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSByZWFkQ29uZmlndXJhdGlvbkZpbGUoKSxcbiAgICAgICAgeyBpZ25vcmVkQnVpbGRzIH0gPSBjb25maWd1cmF0aW9uO1xuXG4gIHJldHVybiBpZ25vcmVkQnVpbGRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV0cmlldmVJZ25vcmVkUHVibGlzaGVzKCkge1xuICBjb25zdCBjb25maWd1cmF0aW9uID0gcmVhZENvbmZpZ3VyYXRpb25GaWxlKCksXG4gICAgICAgIHsgaWdub3JlZFB1Ymxpc2hlcyB9ID0gY29uZmlndXJhdGlvbjtcblxuICByZXR1cm4gaWdub3JlZFB1Ymxpc2hlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldHJpZXZlSWdub3JlZERlcGVuZGVuY2llcygpIHtcbiAgY29uc3QgY29uZmlndXJhdGlvbiA9IHJlYWRDb25maWd1cmF0aW9uRmlsZSgpLFxuICAgICAgICB7IGlnbm9yZWREZXBlbmRlbmNpZXMgfSA9IGNvbmZpZ3VyYXRpb247XG5cbiAgcmV0dXJuIGlnbm9yZWREZXBlbmRlbmNpZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXRyaWV2ZUZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnMoKSB7XG4gIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSByZWFkQ29uZmlndXJhdGlvbkZpbGUoKSxcbiAgICAgICAgeyBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zIH0gPSBjb25maWd1cmF0aW9uO1xuXG4gIHJldHVybiBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRGlyZWN0b3JpZXMoZGlyZWN0b3JpZXMpIHtcbiAgdXBkYXRlQ29uZmlndXJhdGlvbkZpbGUoe1xuICAgIGRpcmVjdG9yaWVzXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzKSB7XG4gIHVwZGF0ZUNvbmZpZ3VyYXRpb25GaWxlKHtcbiAgICBzaGVsbENvbW1hbmRzXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSWdub3JlZERlcGVuZGVuY2llcyhpZ25vcmVkRGVwZW5kZW5jaWVzKSB7XG4gIHVwZGF0ZUNvbmZpZ3VyYXRpb25GaWxlKHtcbiAgICBpZ25vcmVkRGVwZW5kZW5jaWVzXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucyhmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zKSB7XG4gIHVwZGF0ZUNvbmZpZ3VyYXRpb25GaWxlKHtcbiAgICBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29uZmlndXJhdGlvbkZpbGUoKSB7XG4gIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSBjcmVhdGVDb25maWd1cmF0aW9uKCksXG4gICAgICAgIGpzb24gPSBjb25maWd1cmF0aW9uOyAvLy9cblxuICB3cml0ZVJDRmlsZShqc29uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pZ3JhdGVDb25maWd1cmF0aW9uRmlsZSgpIHtcbiAgYXNzZXJ0Q29uZmlndXJhdGlvbkZpbGVFeGlzdHMoKTtcblxuICBsZXQganNvbiA9IHJlYWRSQ0ZpbGUoKTtcblxuICBjb25zdCBtaWdyYXRpb25NYXAgPSB7XG4gICAgICAgICAgWyBWRVJTSU9OXzFfMCBdOiBtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzMsXG4gICAgICAgICAgWyBWRVJTSU9OXzFfMyBdOiBtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzcsXG4gICAgICAgICAgWyBWRVJTSU9OXzFfNyBdIDptaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzksXG4gICAgICAgICAgWyBWRVJTSU9OXzFfOSBdIDptaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzEwXG4gICAgICAgIH0sXG4gICAgICAgIGxhdGVzdFZlcnNpb24gPSBWRVJTSU9OXzFfMTA7XG5cbiAganNvbiA9IG1pZ3JhdGUoanNvbiwgbWlncmF0aW9uTWFwLCBsYXRlc3RWZXJzaW9uKTtcblxuICB3cml0ZVJDRmlsZShqc29uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrQ29uZmlndXJhdGlvbkZpbGVFeGlzdHMoKSB7XG4gIGNvbnN0IHJjRmlsZUV4aXN0cyA9IGNoZWNrUkNGaWxlRXhpc3RzKCksXG4gICAgICAgIGNvbmZpZ3VyYXRpb25GaWxlRXhpc3RzID0gcmNGaWxlRXhpc3RzOyAvLy9cblxuICByZXR1cm4gY29uZmlndXJhdGlvbkZpbGVFeGlzdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRDb25maWd1cmF0aW9uRmlsZUV4aXN0cygpIHtcbiAgY29uc3QgY29uZmlndXJhdGlvbkZpbGVFeGlzdHMgPSBjaGVja0NvbmZpZ3VyYXRpb25GaWxlRXhpc3RzKCk7XG5cbiAgaWYgKCFjb25maWd1cmF0aW9uRmlsZUV4aXN0cykge1xuICAgIGNvbnNvbGUubG9nKENPTkZJR1VSQVRJT05fRklMRV9ET0VTX05PVF9FWElTVF9NRVNTQUdFKTtcblxuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWFkQ29uZmlndXJhdGlvbkZpbGUoKSB7XG4gIGFzc2VydENvbmZpZ3VyYXRpb25GaWxlRXhpc3RzKCk7XG5cbiAgY29uc3QganNvbiA9IHJlYWRSQ0ZpbGUoKSxcbiAgICAgICAgY29uZmlndXJhdGlvbiA9IGpzb247IC8vL1xuXG4gIHJldHVybiBjb25maWd1cmF0aW9uO1xufVxuXG5mdW5jdGlvbiB3cml0ZUNvbmZpZ3VyYXRpb25GaWxlKGNvbmZpZ3VyYXRpb24pIHtcbiAgYXNzZXJ0Q29uZmlndXJhdGlvbkZpbGVFeGlzdHMoKTtcblxuICBjb25zdCBqc29uID0gY29uZmlndXJhdGlvbjsgLy8vXG5cbiAgd3JpdGVSQ0ZpbGUoanNvbik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbmZpZ3VyYXRpb25GaWxlKGFkZGVkQ29uZmlndXJhdGlvbiwgLi4uZGVsZXRlQ29uZmlndXJhdGlvbk5hbWVzKSB7XG4gIGFzc2VydENvbmZpZ3VyYXRpb25GaWxlRXhpc3RzKCk7XG5cbiAgY29uc3QgYWRkZWRQcm9wZXJ0aWVzID0gYWRkZWRDb25maWd1cmF0aW9uLCAvLy9cbiAgICAgICAgZGVsZXRlZFByb3BlcnR5TmFtZXMgPSBkZWxldGVDb25maWd1cmF0aW9uTmFtZXM7ICAvLy9cblxuICB1cGRhdGVSQ0ZpbGUoYWRkZWRQcm9wZXJ0aWVzLCAuLi5kZWxldGVkUHJvcGVydHlOYW1lcyk7XG59XG4iXSwibmFtZXMiOlsiYXNzZXJ0Q29uZmlndXJhdGlvbkZpbGVFeGlzdHMiLCJjaGVja0NvbmZpZ3VyYXRpb25GaWxlRXhpc3RzIiwiY3JlYXRlQ29uZmlndXJhdGlvbkZpbGUiLCJtaWdyYXRlQ29uZmlndXJhdGlvbkZpbGUiLCJyZXRyaWV2ZURpcmVjdG9yaWVzIiwicmV0cmlldmVGb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zIiwicmV0cmlldmVJZ25vcmVkQnVpbGRzIiwicmV0cmlldmVJZ25vcmVkRGVwZW5kZW5jaWVzIiwicmV0cmlldmVJZ25vcmVkUHVibGlzaGVzIiwicmV0cmlldmVTaGVsbENvbW1hbmRzIiwidXBkYXRlRGlyZWN0b3JpZXMiLCJ1cGRhdGVGb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zIiwidXBkYXRlSWdub3JlZERlcGVuZGVuY2llcyIsInVwZGF0ZVNoZWxsQ29tbWFuZHMiLCJyYyIsImNvbmZpZ3VyYXRpb25VdGlsaXRpZXMiLCJtaWdyYXRlIiwidmVyc2lvblV0aWxpdGllcyIsInNldFJDQmFzZUV4dGVuc2lvbiIsImNoZWNrUkNGaWxlRXhpc3RzIiwidXBkYXRlUkNGaWxlIiwid3JpdGVSQ0ZpbGUiLCJyZWFkUkNGaWxlIiwiUFJPUEFHQVRFIiwiY29uZmlndXJhdGlvbiIsInJlYWRDb25maWd1cmF0aW9uRmlsZSIsImRpcmVjdG9yaWVzIiwic2hlbGxDb21tYW5kcyIsImlnbm9yZWRCdWlsZHMiLCJpZ25vcmVkUHVibGlzaGVzIiwiaWdub3JlZERlcGVuZGVuY2llcyIsImZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnMiLCJ1cGRhdGVDb25maWd1cmF0aW9uRmlsZSIsImNyZWF0ZUNvbmZpZ3VyYXRpb24iLCJqc29uIiwibWlncmF0aW9uTWFwIiwiVkVSU0lPTl8xXzAiLCJtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzMiLCJWRVJTSU9OXzFfMyIsIm1pZ3JhdGVDb25maWd1cmF0aW9uVG9WZXJzaW9uXzFfNyIsIlZFUlNJT05fMV83IiwibWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV85IiwiVkVSU0lPTl8xXzkiLCJtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzEwIiwibGF0ZXN0VmVyc2lvbiIsIlZFUlNJT05fMV8xMCIsInJjRmlsZUV4aXN0cyIsImNvbmZpZ3VyYXRpb25GaWxlRXhpc3RzIiwiY29uc29sZSIsImxvZyIsIkNPTkZJR1VSQVRJT05fRklMRV9ET0VTX05PVF9FWElTVF9NRVNTQUdFIiwicHJvY2VzcyIsImV4aXQiLCJ3cml0ZUNvbmZpZ3VyYXRpb25GaWxlIiwiYWRkZWRDb25maWd1cmF0aW9uIiwiZGVsZXRlQ29uZmlndXJhdGlvbk5hbWVzIiwiYWRkZWRQcm9wZXJ0aWVzIiwiZGVsZXRlZFByb3BlcnR5TmFtZXMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztRQXFIZ0JBO2VBQUFBOztRQVBBQztlQUFBQTs7UUF6QkFDO2VBQUFBOztRQU9BQztlQUFBQTs7UUF6RUFDO2VBQUFBOztRQW1DQUM7ZUFBQUE7O1FBckJBQztlQUFBQTs7UUFjQUM7ZUFBQUE7O1FBUEFDO2VBQUFBOztRQWRBQztlQUFBQTs7UUFtQ0FDO2VBQUFBOztRQWtCQUM7ZUFBQUE7O1FBTkFDO2VBQUFBOztRQU5BQztlQUFBQTs7O3lCQWpFeUM7eUJBRS9COzRCQUNVOzJCQUNjOzJCQUNBOzJCQUNBO3dCQUVRO3dCQUN1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWpGLElBQU0sQUFBRUMsS0FBT0MsaUNBQXNCLENBQTdCRCxJQUNGLEFBQUVFLFVBQVlDLDJCQUFnQixDQUE1QkQsU0FDQUUscUJBQWlGSixHQUFqRkksb0JBQW9CQyxvQkFBNkRMLEdBQTdESyxtQkFBbUJDLGVBQTBDTixHQUExQ00sY0FBY0MsY0FBNEJQLEdBQTVCTyxhQUFhQyxhQUFlUixHQUFmUTtBQUUxRUosbUJBQW1CSyxvQkFBUztBQUVyQixTQUFTbkI7SUFDZCxJQUFNb0IsZ0JBQWdCQyx5QkFDaEIsQUFBRUMsY0FBZ0JGLGNBQWhCRTtJQUVSLE9BQU9BO0FBQ1Q7QUFFTyxTQUFTakI7SUFDZCxJQUFNZSxnQkFBZ0JDLHlCQUNoQixBQUFFRSxnQkFBa0JILGNBQWxCRztJQUVSLE9BQU9BO0FBQ1Q7QUFFTyxTQUFTckI7SUFDZCxJQUFNa0IsZ0JBQWdCQyx5QkFDaEIsQUFBRUcsZ0JBQWtCSixjQUFsQkk7SUFFUixPQUFPQTtBQUNUO0FBRU8sU0FBU3BCO0lBQ2QsSUFBTWdCLGdCQUFnQkMseUJBQ2hCLEFBQUVJLG1CQUFxQkwsY0FBckJLO0lBRVIsT0FBT0E7QUFDVDtBQUVPLFNBQVN0QjtJQUNkLElBQU1pQixnQkFBZ0JDLHlCQUNoQixBQUFFSyxzQkFBd0JOLGNBQXhCTTtJQUVSLE9BQU9BO0FBQ1Q7QUFFTyxTQUFTekI7SUFDZCxJQUFNbUIsZ0JBQWdCQyx5QkFDaEIsQUFBRU0sNEJBQThCUCxjQUE5Qk87SUFFUixPQUFPQTtBQUNUO0FBRU8sU0FBU3JCLGtCQUFrQmdCLFdBQVc7SUFDM0NNLHdCQUF3QjtRQUN0Qk4sYUFBQUE7SUFDRjtBQUNGO0FBRU8sU0FBU2Isb0JBQW9CYyxhQUFhO0lBQy9DSyx3QkFBd0I7UUFDdEJMLGVBQUFBO0lBQ0Y7QUFDRjtBQUVPLFNBQVNmLDBCQUEwQmtCLG1CQUFtQjtJQUMzREUsd0JBQXdCO1FBQ3RCRixxQkFBQUE7SUFDRjtBQUNGO0FBRU8sU0FBU25CLGdDQUFnQ29CLHlCQUF5QjtJQUN2RUMsd0JBQXdCO1FBQ3RCRCwyQkFBQUE7SUFDRjtBQUNGO0FBRU8sU0FBUzdCO0lBQ2QsSUFBTXNCLGdCQUFnQlMsSUFBQUEsaUNBQW1CLEtBQ25DQyxPQUFPVixlQUFlLEdBQUc7SUFFL0JILFlBQVlhO0FBQ2Q7QUFFTyxTQUFTL0I7SUFDZEg7SUFFQSxJQUFJa0MsT0FBT1o7UUFFVTtJQUFyQixJQUFNYSxnQkFBZSxXQUNiLGlCQURhLE1BQ1hDLHFCQUFXLEVBQUlDLDhDQUFpQyxHQUNsRCxpQkFGYSxNQUVYQyxxQkFBVyxFQUFJQyw4Q0FBaUMsR0FDbEQsaUJBSGEsTUFHWEMscUJBQVcsRUFBSUMsOENBQWlDLEdBQ2xELGlCQUphLE1BSVhDLHFCQUFXLEVBQUlDLGdEQUFrQyxHQUp0QyxPQU1mQyxnQkFBZ0JDLHNCQUFZO0lBRWxDWCxPQUFPbEIsUUFBUWtCLE1BQU1DLGNBQWNTO0lBRW5DdkIsWUFBWWE7QUFDZDtBQUVPLFNBQVNqQztJQUNkLElBQU02QyxlQUFlM0IscUJBQ2Y0QiwwQkFBMEJELGNBQWMsR0FBRztJQUVqRCxPQUFPQztBQUNUO0FBRU8sU0FBUy9DO0lBQ2QsSUFBTStDLDBCQUEwQjlDO0lBRWhDLElBQUksQ0FBQzhDLHlCQUF5QjtRQUM1QkMsUUFBUUMsR0FBRyxDQUFDQyxtREFBeUM7UUFFckRDLFFBQVFDLElBQUksQ0FBQztJQUNmO0FBQ0Y7QUFFQSxTQUFTM0I7SUFDUHpCO0lBRUEsSUFBTWtDLE9BQU9aLGNBQ1BFLGdCQUFnQlUsTUFBTSxHQUFHO0lBRS9CLE9BQU9WO0FBQ1Q7QUFFQSxTQUFTNkIsdUJBQXVCN0IsYUFBYTtJQUMzQ3hCO0lBRUEsSUFBTWtDLE9BQU9WLGVBQWUsR0FBRztJQUUvQkgsWUFBWWE7QUFDZDtBQUVBLFNBQVNGLHdCQUF3QnNCLGtCQUFrQjtJQUFFLElBQUEsSUFBQSxPQUFBLFVBQUEsUUFBQSxBQUFHQywyQkFBSCxVQUFBLE9BQUEsSUFBQSxPQUFBLFFBQUEsT0FBQSxHQUFBLE9BQUEsTUFBQTtRQUFHQSx5QkFBSCxPQUFBLEtBQUEsU0FBQSxDQUFBLEtBQTJCOztJQUM5RXZEO0lBRUEsSUFBTXdELGtCQUFrQkYsb0JBQ2xCRyx1QkFBdUJGLDBCQUEyQixHQUFHO0lBRTNEbkMsbUJBQUFBLEtBQUFBLEdBQUFBO1FBQWFvQztLQUF5QyxDQUF0RHBDLE9BQThCLHFCQUFHcUM7QUFDbkMifQ==