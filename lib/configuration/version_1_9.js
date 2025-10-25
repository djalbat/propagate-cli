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
    var install = _defaults.DEFAULT_INSTALL_SHELL_COMMANDS; ///
    shellCommands = Object.assign(shellCommands, {
        install: install
    });
    configuration = Object.assign(configuration, {
        version: version,
        shellCommands: shellCommands
    });
    return configuration;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWd1cmF0aW9uL3ZlcnNpb25fMV85LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBWRVJTSU9OXzFfOSB9IGZyb20gXCIuLi92ZXJzaW9uc1wiO1xuaW1wb3J0IHsgREVGQVVMVF9JTlNUQUxMX1NIRUxMX0NPTU1BTkRTIH0gZnJvbSBcIi4uL2RlZmF1bHRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzkoY29uZmlndXJhdGlvbikge1xuICBjb25zdCB2ZXJzaW9uID0gVkVSU0lPTl8xXzk7XG5cbiAgbGV0IHsgc2hlbGxDb21tYW5kcyB9ID0gY29uZmlndXJhdGlvbjtcblxuICBjb25zdCBpbnN0YWxsID0gREVGQVVMVF9JTlNUQUxMX1NIRUxMX0NPTU1BTkRTOyAgLy8vXG5cbiAgc2hlbGxDb21tYW5kcyA9IE9iamVjdC5hc3NpZ24oc2hlbGxDb21tYW5kcywge1xuICAgIGluc3RhbGxcbiAgfSk7XG5cbiAgY29uZmlndXJhdGlvbiA9IE9iamVjdC5hc3NpZ24oY29uZmlndXJhdGlvbiwge1xuICAgIHZlcnNpb24sXG4gICAgc2hlbGxDb21tYW5kc1xuICB9KTtcblxuICByZXR1cm4gY29uZmlndXJhdGlvbjtcbn1cbiJdLCJuYW1lcyI6WyJtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzkiLCJjb25maWd1cmF0aW9uIiwidmVyc2lvbiIsIlZFUlNJT05fMV85Iiwic2hlbGxDb21tYW5kcyIsImluc3RhbGwiLCJERUZBVUxUX0lOU1RBTExfU0hFTExfQ09NTUFORFMiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQUtnQkE7OztlQUFBQTs7O3dCQUhZO3dCQUNtQjtBQUV4QyxTQUFTQSxrQ0FBa0NDLGFBQWE7SUFDN0QsSUFBTUMsVUFBVUMscUJBQVc7SUFFM0IsSUFBSSxBQUFFQyxnQkFBa0JILGNBQWxCRztJQUVOLElBQU1DLFVBQVVDLHdDQUE4QixFQUFHLEdBQUc7SUFFcERGLGdCQUFnQkcsT0FBT0MsTUFBTSxDQUFDSixlQUFlO1FBQzNDQyxTQUFBQTtJQUNGO0lBRUFKLGdCQUFnQk0sT0FBT0MsTUFBTSxDQUFDUCxlQUFlO1FBQzNDQyxTQUFBQTtRQUNBRSxlQUFBQTtJQUNGO0lBRUEsT0FBT0g7QUFDVCJ9