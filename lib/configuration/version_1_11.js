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
    get createConfiguration () {
        return createConfiguration;
    },
    get migrateConfigurationToVersion_1_11 () {
        return migrateConfigurationToVersion_1_11;
    }
});
var _versions = require("../versions");
var _defaults = require("../defaults");
function createConfiguration() {
    var git = _defaults.DEFAULT_GIT_SHELL_COMMANDS, poll = _defaults.DEFAULT_POLL_SHELL_COMMANDS, build = _defaults.DEFAULT_BUILD_SHELL_COMMANDS, install = _defaults.DEFAULT_INSTALL_SHELL_COMMANDS, publish = _defaults.DEFAULT_PUBLISH_SHELL_COMMANDS, version = _versions.VERSION_1_11, directories = [], shellCommands = {
        git: git,
        poll: poll,
        build: build,
        install: install,
        publish: publish
    }, ignoredBuilds = [], ignoredPublishes = [], ignoredDependencies = [], forcedDependencyRelations = [], configuration = {
        version: version,
        directories: directories,
        shellCommands: shellCommands,
        ignoredBuilds: ignoredBuilds,
        ignoredPublishes: ignoredPublishes,
        ignoredDependencies: ignoredDependencies,
        forcedDependencyRelations: forcedDependencyRelations
    };
    return configuration;
}
function migrateConfigurationToVersion_1_11(configuration) {
    var version = _versions.VERSION_1_11;
    var shellCommands = configuration.shellCommands;
    var poll = _defaults.DEFAULT_POLL_SHELL_COMMANDS;
    shellCommands = Object.assign(shellCommands, {
        poll: poll
    });
    configuration = Object.assign(configuration, {
        version: version,
        shellCommands: shellCommands
    });
    return configuration;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWd1cmF0aW9uL3ZlcnNpb25fMV8xMS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgVkVSU0lPTl8xXzExIH0gZnJvbSBcIi4uL3ZlcnNpb25zXCI7XG5pbXBvcnQgeyBERUZBVUxUX0dJVF9TSEVMTF9DT01NQU5EUywgREVGQVVMVF9QT0xMX1NIRUxMX0NPTU1BTkRTLCBERUZBVUxUX0lOU1RBTExfU0hFTExfQ09NTUFORFMsIERFRkFVTFRfQlVJTERfU0hFTExfQ09NTUFORFMsIERFRkFVTFRfUFVCTElTSF9TSEVMTF9DT01NQU5EUyB9IGZyb20gXCIuLi9kZWZhdWx0c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgY29uc3QgZ2l0ID0gREVGQVVMVF9HSVRfU0hFTExfQ09NTUFORFMsXG4gICAgICAgIHBvbGwgPSBERUZBVUxUX1BPTExfU0hFTExfQ09NTUFORFMsXG4gICAgICAgIGJ1aWxkID0gREVGQVVMVF9CVUlMRF9TSEVMTF9DT01NQU5EUyxcbiAgICAgICAgaW5zdGFsbCA9IERFRkFVTFRfSU5TVEFMTF9TSEVMTF9DT01NQU5EUyxcbiAgICAgICAgcHVibGlzaCA9IERFRkFVTFRfUFVCTElTSF9TSEVMTF9DT01NQU5EUyxcbiAgICAgICAgdmVyc2lvbiA9IFZFUlNJT05fMV8xMSxcbiAgICAgICAgZGlyZWN0b3JpZXMgPSBbXSxcbiAgICAgICAgc2hlbGxDb21tYW5kcyA9IHtcbiAgICAgICAgICBnaXQsXG4gICAgICAgICAgcG9sbCxcbiAgICAgICAgICBidWlsZCxcbiAgICAgICAgICBpbnN0YWxsLFxuICAgICAgICAgIHB1Ymxpc2hcbiAgICAgICAgfSxcbiAgICAgICAgaWdub3JlZEJ1aWxkcyA9IFtdLFxuICAgICAgICBpZ25vcmVkUHVibGlzaGVzID0gW10sXG4gICAgICAgIGlnbm9yZWREZXBlbmRlbmNpZXMgPSBbXSxcbiAgICAgICAgZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucyA9IFtdLFxuICAgICAgICBjb25maWd1cmF0aW9uID0ge1xuICAgICAgICAgIHZlcnNpb24sXG4gICAgICAgICAgZGlyZWN0b3JpZXMsXG4gICAgICAgICAgc2hlbGxDb21tYW5kcyxcbiAgICAgICAgICBpZ25vcmVkQnVpbGRzLFxuICAgICAgICAgIGlnbm9yZWRQdWJsaXNoZXMsXG4gICAgICAgICAgaWdub3JlZERlcGVuZGVuY2llcyxcbiAgICAgICAgICBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zXG4gICAgICAgIH07XG5cbiAgcmV0dXJuIGNvbmZpZ3VyYXRpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzExKGNvbmZpZ3VyYXRpb24pIHtcbiAgY29uc3QgdmVyc2lvbiA9IFZFUlNJT05fMV8xMTtcblxuICBsZXQgeyBzaGVsbENvbW1hbmRzIH0gPSBjb25maWd1cmF0aW9uO1xuXG4gIGNvbnN0IHBvbGwgPSBERUZBVUxUX1BPTExfU0hFTExfQ09NTUFORFM7XG5cbiAgc2hlbGxDb21tYW5kcyA9IE9iamVjdC5hc3NpZ24oc2hlbGxDb21tYW5kcywge1xuICAgIHBvbGxcbiAgfSk7XG5cbiAgY29uZmlndXJhdGlvbiA9IE9iamVjdC5hc3NpZ24oY29uZmlndXJhdGlvbiwge1xuICAgIHZlcnNpb24sXG4gICAgc2hlbGxDb21tYW5kc1xuICB9KTtcblxuICByZXR1cm4gY29uZmlndXJhdGlvbjtcbn1cbiJdLCJuYW1lcyI6WyJjcmVhdGVDb25maWd1cmF0aW9uIiwibWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV8xMSIsImdpdCIsIkRFRkFVTFRfR0lUX1NIRUxMX0NPTU1BTkRTIiwicG9sbCIsIkRFRkFVTFRfUE9MTF9TSEVMTF9DT01NQU5EUyIsImJ1aWxkIiwiREVGQVVMVF9CVUlMRF9TSEVMTF9DT01NQU5EUyIsImluc3RhbGwiLCJERUZBVUxUX0lOU1RBTExfU0hFTExfQ09NTUFORFMiLCJwdWJsaXNoIiwiREVGQVVMVF9QVUJMSVNIX1NIRUxMX0NPTU1BTkRTIiwidmVyc2lvbiIsIlZFUlNJT05fMV8xMSIsImRpcmVjdG9yaWVzIiwic2hlbGxDb21tYW5kcyIsImlnbm9yZWRCdWlsZHMiLCJpZ25vcmVkUHVibGlzaGVzIiwiaWdub3JlZERlcGVuZGVuY2llcyIsImZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnMiLCJjb25maWd1cmF0aW9uIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7UUFLZ0JBO2VBQUFBOztRQWdDQUM7ZUFBQUE7Ozt3QkFuQ2E7d0JBQ3lJO0FBRS9KLFNBQVNEO0lBQ2QsSUFBTUUsTUFBTUMsb0NBQTBCLEVBQ2hDQyxPQUFPQyxxQ0FBMkIsRUFDbENDLFFBQVFDLHNDQUE0QixFQUNwQ0MsVUFBVUMsd0NBQThCLEVBQ3hDQyxVQUFVQyx3Q0FBOEIsRUFDeENDLFVBQVVDLHNCQUFZLEVBQ3RCQyxjQUFjLEVBQUUsRUFDaEJDLGdCQUFnQjtRQUNkYixLQUFBQTtRQUNBRSxNQUFBQTtRQUNBRSxPQUFBQTtRQUNBRSxTQUFBQTtRQUNBRSxTQUFBQTtJQUNGLEdBQ0FNLGdCQUFnQixFQUFFLEVBQ2xCQyxtQkFBbUIsRUFBRSxFQUNyQkMsc0JBQXNCLEVBQUUsRUFDeEJDLDRCQUE0QixFQUFFLEVBQzlCQyxnQkFBZ0I7UUFDZFIsU0FBQUE7UUFDQUUsYUFBQUE7UUFDQUMsZUFBQUE7UUFDQUMsZUFBQUE7UUFDQUMsa0JBQUFBO1FBQ0FDLHFCQUFBQTtRQUNBQywyQkFBQUE7SUFDRjtJQUVOLE9BQU9DO0FBQ1Q7QUFFTyxTQUFTbkIsbUNBQW1DbUIsYUFBYTtJQUM5RCxJQUFNUixVQUFVQyxzQkFBWTtJQUU1QixJQUFJLEFBQUVFLGdCQUFrQkssY0FBbEJMO0lBRU4sSUFBTVgsT0FBT0MscUNBQTJCO0lBRXhDVSxnQkFBZ0JNLE9BQU9DLE1BQU0sQ0FBQ1AsZUFBZTtRQUMzQ1gsTUFBQUE7SUFDRjtJQUVBZ0IsZ0JBQWdCQyxPQUFPQyxNQUFNLENBQUNGLGVBQWU7UUFDM0NSLFNBQUFBO1FBQ0FHLGVBQUFBO0lBQ0Y7SUFFQSxPQUFPSztBQUNUIn0=