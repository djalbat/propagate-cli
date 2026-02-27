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
const _versions = require("../versions");
const _defaults = require("../defaults");
function migrateConfigurationToVersion_1_9(configuration) {
    const version = _versions.VERSION_1_9;
    let { shellCommands } = configuration;
    const install = _defaults.DEFAULT_INSTALL_SHELL_COMMANDS;
    shellCommands = Object.assign(shellCommands, {
        install
    });
    configuration = Object.assign(configuration, {
        version,
        shellCommands
    });
    return configuration;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWd1cmF0aW9uL3ZlcnNpb25fMV85LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBWRVJTSU9OXzFfOSB9IGZyb20gXCIuLi92ZXJzaW9uc1wiO1xuaW1wb3J0IHsgREVGQVVMVF9JTlNUQUxMX1NIRUxMX0NPTU1BTkRTIH0gZnJvbSBcIi4uL2RlZmF1bHRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzkoY29uZmlndXJhdGlvbikge1xuICBjb25zdCB2ZXJzaW9uID0gVkVSU0lPTl8xXzk7XG5cbiAgbGV0IHsgc2hlbGxDb21tYW5kcyB9ID0gY29uZmlndXJhdGlvbjtcblxuICBjb25zdCBpbnN0YWxsID0gREVGQVVMVF9JTlNUQUxMX1NIRUxMX0NPTU1BTkRTO1xuXG4gIHNoZWxsQ29tbWFuZHMgPSBPYmplY3QuYXNzaWduKHNoZWxsQ29tbWFuZHMsIHtcbiAgICBpbnN0YWxsXG4gIH0pO1xuXG4gIGNvbmZpZ3VyYXRpb24gPSBPYmplY3QuYXNzaWduKGNvbmZpZ3VyYXRpb24sIHtcbiAgICB2ZXJzaW9uLFxuICAgIHNoZWxsQ29tbWFuZHNcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZ3VyYXRpb247XG59XG4iXSwibmFtZXMiOlsibWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV85IiwiY29uZmlndXJhdGlvbiIsInZlcnNpb24iLCJWRVJTSU9OXzFfOSIsInNoZWxsQ29tbWFuZHMiLCJpbnN0YWxsIiwiREVGQVVMVF9JTlNUQUxMX1NIRUxMX0NPTU1BTkRTIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFLZ0JBOzs7ZUFBQUE7OzswQkFIWTswQkFDbUI7QUFFeEMsU0FBU0Esa0NBQWtDQyxhQUFhO0lBQzdELE1BQU1DLFVBQVVDLHFCQUFXO0lBRTNCLElBQUksRUFBRUMsYUFBYSxFQUFFLEdBQUdIO0lBRXhCLE1BQU1JLFVBQVVDLHdDQUE4QjtJQUU5Q0YsZ0JBQWdCRyxPQUFPQyxNQUFNLENBQUNKLGVBQWU7UUFDM0NDO0lBQ0Y7SUFFQUosZ0JBQWdCTSxPQUFPQyxNQUFNLENBQUNQLGVBQWU7UUFDM0NDO1FBQ0FFO0lBQ0Y7SUFFQSxPQUFPSDtBQUNUIn0=