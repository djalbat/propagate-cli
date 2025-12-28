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
var _version_1_11 = require("./configuration/version_1_11");
var _version_1_3 = require("./configuration/version_1_3");
var _version_1_7 = require("./configuration/version_1_7");
var _version_1_9 = require("./configuration/version_1_9");
var _version_1_10 = require("./configuration/version_1_10");
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
    var configuration = (0, _version_1_11.createConfiguration)(), json = configuration; ///
    writeRCFile(json);
}
function migrateConfigurationFile() {
    assertConfigurationFileExists();
    var json = readRCFile();
    var _obj;
    var migrationMap = (_obj = {}, _define_property(_obj, _versions.VERSION_1_0, _version_1_3.migrateConfigurationToVersion_1_3), _define_property(_obj, _versions.VERSION_1_3, _version_1_7.migrateConfigurationToVersion_1_7), _define_property(_obj, _versions.VERSION_1_7, _version_1_9.migrateConfigurationToVersion_1_9), _define_property(_obj, _versions.VERSION_1_9, _version_1_10.migrateConfigurationToVersion_1_10), _define_property(_obj, _versions.VERSION_1_10, _version_1_11.migrateConfigurationToVersion_1_11), _obj), latestVersion = _versions.VERSION_1_11;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWd1cmF0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyB2ZXJzaW9uVXRpbGl0aWVzLCBjb25maWd1cmF0aW9uVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBQUk9QQUdBVEUgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGNyZWF0ZUNvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uL3ZlcnNpb25fMV8xMVwiO1xuaW1wb3J0IHsgbWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV8zIH0gZnJvbSBcIi4vY29uZmlndXJhdGlvbi92ZXJzaW9uXzFfM1wiO1xuaW1wb3J0IHsgbWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV83IH0gZnJvbSBcIi4vY29uZmlndXJhdGlvbi92ZXJzaW9uXzFfN1wiO1xuaW1wb3J0IHsgbWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV85IH0gZnJvbSBcIi4vY29uZmlndXJhdGlvbi92ZXJzaW9uXzFfOVwiO1xuaW1wb3J0IHsgbWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV8xMCB9IGZyb20gXCIuL2NvbmZpZ3VyYXRpb24vdmVyc2lvbl8xXzEwXCI7XG5pbXBvcnQgeyBtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzExIH0gZnJvbSBcIi4vY29uZmlndXJhdGlvbi92ZXJzaW9uXzFfMTFcIjtcbmltcG9ydCB7IENPTkZJR1VSQVRJT05fRklMRV9ET0VTX05PVF9FWElTVF9NRVNTQUdFIH0gZnJvbSBcIi4vbWVzc2FnZXNcIjtcbmltcG9ydCB7IFZFUlNJT05fMV8wLCBWRVJTSU9OXzFfMywgVkVSU0lPTl8xXzcsIFZFUlNJT05fMV85LCBWRVJTSU9OXzFfMTAsIFZFUlNJT05fMV8xMSB9IGZyb20gXCIuL3ZlcnNpb25zXCI7XG5cbmNvbnN0IHsgcmMgfSA9IGNvbmZpZ3VyYXRpb25VdGlsaXRpZXMsXG4gICAgICB7IG1pZ3JhdGUgfSA9IHZlcnNpb25VdGlsaXRpZXMsXG4gICAgICB7IHNldFJDQmFzZUV4dGVuc2lvbiwgY2hlY2tSQ0ZpbGVFeGlzdHMsIHVwZGF0ZVJDRmlsZSwgd3JpdGVSQ0ZpbGUsIHJlYWRSQ0ZpbGUgfSA9IHJjO1xuXG5zZXRSQ0Jhc2VFeHRlbnNpb24oUFJPUEFHQVRFKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJldHJpZXZlRGlyZWN0b3JpZXMoKSB7XG4gIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSByZWFkQ29uZmlndXJhdGlvbkZpbGUoKSxcbiAgICAgICAgeyBkaXJlY3RvcmllcyB9ID0gY29uZmlndXJhdGlvbjtcblxuICByZXR1cm4gZGlyZWN0b3JpZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXRyaWV2ZVNoZWxsQ29tbWFuZHMoKSB7XG4gIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSByZWFkQ29uZmlndXJhdGlvbkZpbGUoKSxcbiAgICAgICAgeyBzaGVsbENvbW1hbmRzIH0gPSBjb25maWd1cmF0aW9uO1xuXG4gIHJldHVybiBzaGVsbENvbW1hbmRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV0cmlldmVJZ25vcmVkQnVpbGRzKCkge1xuICBjb25zdCBjb25maWd1cmF0aW9uID0gcmVhZENvbmZpZ3VyYXRpb25GaWxlKCksXG4gICAgICAgIHsgaWdub3JlZEJ1aWxkcyB9ID0gY29uZmlndXJhdGlvbjtcblxuICByZXR1cm4gaWdub3JlZEJ1aWxkcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldHJpZXZlSWdub3JlZFB1Ymxpc2hlcygpIHtcbiAgY29uc3QgY29uZmlndXJhdGlvbiA9IHJlYWRDb25maWd1cmF0aW9uRmlsZSgpLFxuICAgICAgICB7IGlnbm9yZWRQdWJsaXNoZXMgfSA9IGNvbmZpZ3VyYXRpb247XG5cbiAgcmV0dXJuIGlnbm9yZWRQdWJsaXNoZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXRyaWV2ZUlnbm9yZWREZXBlbmRlbmNpZXMoKSB7XG4gIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSByZWFkQ29uZmlndXJhdGlvbkZpbGUoKSxcbiAgICAgICAgeyBpZ25vcmVkRGVwZW5kZW5jaWVzIH0gPSBjb25maWd1cmF0aW9uO1xuXG4gIHJldHVybiBpZ25vcmVkRGVwZW5kZW5jaWVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV0cmlldmVGb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zKCkge1xuICBjb25zdCBjb25maWd1cmF0aW9uID0gcmVhZENvbmZpZ3VyYXRpb25GaWxlKCksXG4gICAgICAgIHsgZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucyB9ID0gY29uZmlndXJhdGlvbjtcblxuICByZXR1cm4gZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZURpcmVjdG9yaWVzKGRpcmVjdG9yaWVzKSB7XG4gIHVwZGF0ZUNvbmZpZ3VyYXRpb25GaWxlKHtcbiAgICBkaXJlY3Rvcmllc1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcykge1xuICB1cGRhdGVDb25maWd1cmF0aW9uRmlsZSh7XG4gICAgc2hlbGxDb21tYW5kc1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUlnbm9yZWREZXBlbmRlbmNpZXMoaWdub3JlZERlcGVuZGVuY2llcykge1xuICB1cGRhdGVDb25maWd1cmF0aW9uRmlsZSh7XG4gICAgaWdub3JlZERlcGVuZGVuY2llc1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnMoZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucykge1xuICB1cGRhdGVDb25maWd1cmF0aW9uRmlsZSh7XG4gICAgZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uc1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbmZpZ3VyYXRpb25GaWxlKCkge1xuICBjb25zdCBjb25maWd1cmF0aW9uID0gY3JlYXRlQ29uZmlndXJhdGlvbigpLFxuICAgICAgICBqc29uID0gY29uZmlndXJhdGlvbjsgLy8vXG5cbiAgd3JpdGVSQ0ZpbGUoanNvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaWdyYXRlQ29uZmlndXJhdGlvbkZpbGUoKSB7XG4gIGFzc2VydENvbmZpZ3VyYXRpb25GaWxlRXhpc3RzKCk7XG5cbiAgbGV0IGpzb24gPSByZWFkUkNGaWxlKCk7XG5cbiAgY29uc3QgbWlncmF0aW9uTWFwID0ge1xuICAgICAgICAgIFsgVkVSU0lPTl8xXzAgXTogbWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV8zLFxuICAgICAgICAgIFsgVkVSU0lPTl8xXzMgXTogbWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV83LFxuICAgICAgICAgIFsgVkVSU0lPTl8xXzcgXSA6bWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV85LFxuICAgICAgICAgIFsgVkVSU0lPTl8xXzkgXSA6bWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV8xMCxcbiAgICAgICAgICBbIFZFUlNJT05fMV8xMCBdIDptaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzExXG4gICAgICAgIH0sXG4gICAgICAgIGxhdGVzdFZlcnNpb24gPSBWRVJTSU9OXzFfMTE7XG5cbiAganNvbiA9IG1pZ3JhdGUoanNvbiwgbWlncmF0aW9uTWFwLCBsYXRlc3RWZXJzaW9uKTtcblxuICB3cml0ZVJDRmlsZShqc29uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrQ29uZmlndXJhdGlvbkZpbGVFeGlzdHMoKSB7XG4gIGNvbnN0IHJjRmlsZUV4aXN0cyA9IGNoZWNrUkNGaWxlRXhpc3RzKCksXG4gICAgICAgIGNvbmZpZ3VyYXRpb25GaWxlRXhpc3RzID0gcmNGaWxlRXhpc3RzOyAvLy9cblxuICByZXR1cm4gY29uZmlndXJhdGlvbkZpbGVFeGlzdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRDb25maWd1cmF0aW9uRmlsZUV4aXN0cygpIHtcbiAgY29uc3QgY29uZmlndXJhdGlvbkZpbGVFeGlzdHMgPSBjaGVja0NvbmZpZ3VyYXRpb25GaWxlRXhpc3RzKCk7XG5cbiAgaWYgKCFjb25maWd1cmF0aW9uRmlsZUV4aXN0cykge1xuICAgIGNvbnNvbGUubG9nKENPTkZJR1VSQVRJT05fRklMRV9ET0VTX05PVF9FWElTVF9NRVNTQUdFKTtcblxuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWFkQ29uZmlndXJhdGlvbkZpbGUoKSB7XG4gIGFzc2VydENvbmZpZ3VyYXRpb25GaWxlRXhpc3RzKCk7XG5cbiAgY29uc3QganNvbiA9IHJlYWRSQ0ZpbGUoKSxcbiAgICAgICAgY29uZmlndXJhdGlvbiA9IGpzb247IC8vL1xuXG4gIHJldHVybiBjb25maWd1cmF0aW9uO1xufVxuXG5mdW5jdGlvbiB3cml0ZUNvbmZpZ3VyYXRpb25GaWxlKGNvbmZpZ3VyYXRpb24pIHtcbiAgYXNzZXJ0Q29uZmlndXJhdGlvbkZpbGVFeGlzdHMoKTtcblxuICBjb25zdCBqc29uID0gY29uZmlndXJhdGlvbjsgLy8vXG5cbiAgd3JpdGVSQ0ZpbGUoanNvbik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbmZpZ3VyYXRpb25GaWxlKGFkZGVkQ29uZmlndXJhdGlvbiwgLi4uZGVsZXRlQ29uZmlndXJhdGlvbk5hbWVzKSB7XG4gIGFzc2VydENvbmZpZ3VyYXRpb25GaWxlRXhpc3RzKCk7XG5cbiAgY29uc3QgYWRkZWRQcm9wZXJ0aWVzID0gYWRkZWRDb25maWd1cmF0aW9uLCAvLy9cbiAgICAgICAgZGVsZXRlZFByb3BlcnR5TmFtZXMgPSBkZWxldGVDb25maWd1cmF0aW9uTmFtZXM7ICAvLy9cblxuICB1cGRhdGVSQ0ZpbGUoYWRkZWRQcm9wZXJ0aWVzLCAuLi5kZWxldGVkUHJvcGVydHlOYW1lcyk7XG59XG4iXSwibmFtZXMiOlsiYXNzZXJ0Q29uZmlndXJhdGlvbkZpbGVFeGlzdHMiLCJjaGVja0NvbmZpZ3VyYXRpb25GaWxlRXhpc3RzIiwiY3JlYXRlQ29uZmlndXJhdGlvbkZpbGUiLCJtaWdyYXRlQ29uZmlndXJhdGlvbkZpbGUiLCJyZXRyaWV2ZURpcmVjdG9yaWVzIiwicmV0cmlldmVGb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zIiwicmV0cmlldmVJZ25vcmVkQnVpbGRzIiwicmV0cmlldmVJZ25vcmVkRGVwZW5kZW5jaWVzIiwicmV0cmlldmVJZ25vcmVkUHVibGlzaGVzIiwicmV0cmlldmVTaGVsbENvbW1hbmRzIiwidXBkYXRlRGlyZWN0b3JpZXMiLCJ1cGRhdGVGb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zIiwidXBkYXRlSWdub3JlZERlcGVuZGVuY2llcyIsInVwZGF0ZVNoZWxsQ29tbWFuZHMiLCJyYyIsImNvbmZpZ3VyYXRpb25VdGlsaXRpZXMiLCJtaWdyYXRlIiwidmVyc2lvblV0aWxpdGllcyIsInNldFJDQmFzZUV4dGVuc2lvbiIsImNoZWNrUkNGaWxlRXhpc3RzIiwidXBkYXRlUkNGaWxlIiwid3JpdGVSQ0ZpbGUiLCJyZWFkUkNGaWxlIiwiUFJPUEFHQVRFIiwiY29uZmlndXJhdGlvbiIsInJlYWRDb25maWd1cmF0aW9uRmlsZSIsImRpcmVjdG9yaWVzIiwic2hlbGxDb21tYW5kcyIsImlnbm9yZWRCdWlsZHMiLCJpZ25vcmVkUHVibGlzaGVzIiwiaWdub3JlZERlcGVuZGVuY2llcyIsImZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnMiLCJ1cGRhdGVDb25maWd1cmF0aW9uRmlsZSIsImNyZWF0ZUNvbmZpZ3VyYXRpb24iLCJqc29uIiwibWlncmF0aW9uTWFwIiwiVkVSU0lPTl8xXzAiLCJtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzMiLCJWRVJTSU9OXzFfMyIsIm1pZ3JhdGVDb25maWd1cmF0aW9uVG9WZXJzaW9uXzFfNyIsIlZFUlNJT05fMV83IiwibWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV85IiwiVkVSU0lPTl8xXzkiLCJtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzEwIiwiVkVSU0lPTl8xXzEwIiwibWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV8xMSIsImxhdGVzdFZlcnNpb24iLCJWRVJTSU9OXzFfMTEiLCJyY0ZpbGVFeGlzdHMiLCJjb25maWd1cmF0aW9uRmlsZUV4aXN0cyIsImNvbnNvbGUiLCJsb2ciLCJDT05GSUdVUkFUSU9OX0ZJTEVfRE9FU19OT1RfRVhJU1RfTUVTU0FHRSIsInByb2Nlc3MiLCJleGl0Iiwid3JpdGVDb25maWd1cmF0aW9uRmlsZSIsImFkZGVkQ29uZmlndXJhdGlvbiIsImRlbGV0ZUNvbmZpZ3VyYXRpb25OYW1lcyIsImFkZGVkUHJvcGVydGllcyIsImRlbGV0ZWRQcm9wZXJ0eU5hbWVzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7UUF1SGdCQTtlQUFBQTs7UUFQQUM7ZUFBQUE7O1FBMUJBQztlQUFBQTs7UUFPQUM7ZUFBQUE7O1FBekVBQztlQUFBQTs7UUFtQ0FDO2VBQUFBOztRQXJCQUM7ZUFBQUE7O1FBY0FDO2VBQUFBOztRQVBBQztlQUFBQTs7UUFkQUM7ZUFBQUE7O1FBbUNBQztlQUFBQTs7UUFrQkFDO2VBQUFBOztRQU5BQztlQUFBQTs7UUFOQUM7ZUFBQUE7Ozt5QkFsRXlDO3lCQUUvQjs0QkFDVTsyQkFDYzsyQkFDQTsyQkFDQTs0QkFDQzt3QkFFTzt3QkFDcUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUUvRixJQUFNLEFBQUVDLEtBQU9DLGlDQUFzQixDQUE3QkQsSUFDRixBQUFFRSxVQUFZQywyQkFBZ0IsQ0FBNUJELFNBQ0FFLHFCQUFpRkosR0FBakZJLG9CQUFvQkMsb0JBQTZETCxHQUE3REssbUJBQW1CQyxlQUEwQ04sR0FBMUNNLGNBQWNDLGNBQTRCUCxHQUE1Qk8sYUFBYUMsYUFBZVIsR0FBZlE7QUFFMUVKLG1CQUFtQkssb0JBQVM7QUFFckIsU0FBU25C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