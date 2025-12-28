"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "migrateConfigurationToVersion_1_9", {
    enumerable: true,
    get: function() {
        return migrateConfigurationToVersion_1_9;
    }
});
var _versions = require("../versions");
var _defaults = require("../defaults");
function migrateConfigurationToVersion_1_9(configuration) {
    var version = _versions.VERSION_1_9;
    var shellCommands = configuration.shellCommands;
    var install = _defaults.DEFAULT_INSTALL_SHELL_COMMANDS;
    shellCommands = Object.assign(shellCommands, {
        install: install
    });
    configuration = Object.assign(configuration, {
        version: version,
        shellCommands: shellCommands
    });
    return configuration;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWd1cmF0aW9uL3ZlcnNpb25fMV85LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBWRVJTSU9OXzFfOSB9IGZyb20gXCIuLi92ZXJzaW9uc1wiO1xuaW1wb3J0IHsgREVGQVVMVF9JTlNUQUxMX1NIRUxMX0NPTU1BTkRTIH0gZnJvbSBcIi4uL2RlZmF1bHRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzkoY29uZmlndXJhdGlvbikge1xuICBjb25zdCB2ZXJzaW9uID0gVkVSU0lPTl8xXzk7XG5cbiAgbGV0IHsgc2hlbGxDb21tYW5kcyB9ID0gY29uZmlndXJhdGlvbjtcblxuICBjb25zdCBpbnN0YWxsID0gREVGQVVMVF9JTlNUQUxMX1NIRUxMX0NPTU1BTkRTO1xuXG4gIHNoZWxsQ29tbWFuZHMgPSBPYmplY3QuYXNzaWduKHNoZWxsQ29tbWFuZHMsIHtcbiAgICBpbnN0YWxsXG4gIH0pO1xuXG4gIGNvbmZpZ3VyYXRpb24gPSBPYmplY3QuYXNzaWduKGNvbmZpZ3VyYXRpb24sIHtcbiAgICB2ZXJzaW9uLFxuICAgIHNoZWxsQ29tbWFuZHNcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZ3VyYXRpb247XG59XG4iXSwibmFtZXMiOlsibWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV85IiwiY29uZmlndXJhdGlvbiIsInZlcnNpb24iLCJWRVJTSU9OXzFfOSIsInNoZWxsQ29tbWFuZHMiLCJpbnN0YWxsIiwiREVGQVVMVF9JTlNUQUxMX1NIRUxMX0NPTU1BTkRTIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFLZ0JBOzs7ZUFBQUE7Ozt3QkFIWTt3QkFDbUI7QUFFeEMsU0FBU0Esa0NBQWtDQyxhQUFhO0lBQzdELElBQU1DLFVBQVVDLHFCQUFXO0lBRTNCLElBQUksQUFBRUMsZ0JBQWtCSCxjQUFsQkc7SUFFTixJQUFNQyxVQUFVQyx3Q0FBOEI7SUFFOUNGLGdCQUFnQkcsT0FBT0MsTUFBTSxDQUFDSixlQUFlO1FBQzNDQyxTQUFBQTtJQUNGO0lBRUFKLGdCQUFnQk0sT0FBT0MsTUFBTSxDQUFDUCxlQUFlO1FBQzNDQyxTQUFBQTtRQUNBRSxlQUFBQTtJQUNGO0lBRUEsT0FBT0g7QUFDVCJ9