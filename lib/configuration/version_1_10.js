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
    get migrateConfigurationToVersion_1_10 () {
        return migrateConfigurationToVersion_1_10;
    }
});
var _versions = require("../versions");
var _defaults = require("../defaults");
function createConfiguration() {
    var git = _defaults.DEFAULT_GIT_SHELL_COMMANDS, build = _defaults.DEFAULT_BUILD_SHELL_COMMANDS, install = _defaults.DEFAULT_INSTALL_SHELL_COMMANDS, publish = _defaults.DEFAULT_PUBLISH_SHELL_COMMANDS, version = _versions.VERSION_1_10, directories = [], shellCommands = {
        git: git,
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
function migrateConfigurationToVersion_1_10(configuration) {
    var version = _versions.VERSION_1_10, ignoredBuilds = [], ignoredPublishes = [];
    configuration = Object.assign(configuration, {
        version: version,
        ignoredBuilds: ignoredBuilds,
        ignoredPublishes: ignoredPublishes
    });
    return configuration;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWd1cmF0aW9uL3ZlcnNpb25fMV8xMC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgVkVSU0lPTl8xXzEwIH0gZnJvbSBcIi4uL3ZlcnNpb25zXCI7XG5pbXBvcnQgeyBERUZBVUxUX0dJVF9TSEVMTF9DT01NQU5EUywgREVGQVVMVF9JTlNUQUxMX1NIRUxMX0NPTU1BTkRTLCBERUZBVUxUX0JVSUxEX1NIRUxMX0NPTU1BTkRTLCBERUZBVUxUX1BVQkxJU0hfU0hFTExfQ09NTUFORFMgfSBmcm9tIFwiLi4vZGVmYXVsdHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gIGNvbnN0IGdpdCA9IERFRkFVTFRfR0lUX1NIRUxMX0NPTU1BTkRTLCAgLy8vXG4gICAgICAgIGJ1aWxkID0gREVGQVVMVF9CVUlMRF9TSEVMTF9DT01NQU5EUywgIC8vL1xuICAgICAgICBpbnN0YWxsID0gREVGQVVMVF9JTlNUQUxMX1NIRUxMX0NPTU1BTkRTLCAgLy8vXG4gICAgICAgIHB1Ymxpc2ggPSBERUZBVUxUX1BVQkxJU0hfU0hFTExfQ09NTUFORFMsICAvLy9cbiAgICAgICAgdmVyc2lvbiA9IFZFUlNJT05fMV8xMCwgIC8vL1xuICAgICAgICBkaXJlY3RvcmllcyA9IFtdLFxuICAgICAgICBzaGVsbENvbW1hbmRzID0ge1xuICAgICAgICAgIGdpdCxcbiAgICAgICAgICBidWlsZCxcbiAgICAgICAgICBpbnN0YWxsLFxuICAgICAgICAgIHB1Ymxpc2hcbiAgICAgICAgfSxcbiAgICAgICAgaWdub3JlZEJ1aWxkcyA9IFtdLFxuICAgICAgICBpZ25vcmVkUHVibGlzaGVzID0gW10sXG4gICAgICAgIGlnbm9yZWREZXBlbmRlbmNpZXMgPSBbXSxcbiAgICAgICAgZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucyA9IFtdLFxuICAgICAgICBjb25maWd1cmF0aW9uID0ge1xuICAgICAgICAgIHZlcnNpb24sXG4gICAgICAgICAgZGlyZWN0b3JpZXMsXG4gICAgICAgICAgc2hlbGxDb21tYW5kcyxcbiAgICAgICAgICBpZ25vcmVkQnVpbGRzLFxuICAgICAgICAgIGlnbm9yZWRQdWJsaXNoZXMsXG4gICAgICAgICAgaWdub3JlZERlcGVuZGVuY2llcyxcbiAgICAgICAgICBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zXG4gICAgICAgIH07XG5cbiAgcmV0dXJuIGNvbmZpZ3VyYXRpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzEwKGNvbmZpZ3VyYXRpb24pIHtcbiAgY29uc3QgdmVyc2lvbiA9IFZFUlNJT05fMV8xMCwgIC8vL1xuICAgICAgICBpZ25vcmVkQnVpbGRzID0gW10sXG4gICAgICAgIGlnbm9yZWRQdWJsaXNoZXMgPSBbXTtcblxuICBjb25maWd1cmF0aW9uID0gT2JqZWN0LmFzc2lnbihjb25maWd1cmF0aW9uLCB7XG4gICAgdmVyc2lvbixcbiAgICBpZ25vcmVkQnVpbGRzLFxuICAgIGlnbm9yZWRQdWJsaXNoZXNcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZ3VyYXRpb247XG59XG4iXSwibmFtZXMiOlsiY3JlYXRlQ29uZmlndXJhdGlvbiIsIm1pZ3JhdGVDb25maWd1cmF0aW9uVG9WZXJzaW9uXzFfMTAiLCJnaXQiLCJERUZBVUxUX0dJVF9TSEVMTF9DT01NQU5EUyIsImJ1aWxkIiwiREVGQVVMVF9CVUlMRF9TSEVMTF9DT01NQU5EUyIsImluc3RhbGwiLCJERUZBVUxUX0lOU1RBTExfU0hFTExfQ09NTUFORFMiLCJwdWJsaXNoIiwiREVGQVVMVF9QVUJMSVNIX1NIRUxMX0NPTU1BTkRTIiwidmVyc2lvbiIsIlZFUlNJT05fMV8xMCIsImRpcmVjdG9yaWVzIiwic2hlbGxDb21tYW5kcyIsImlnbm9yZWRCdWlsZHMiLCJpZ25vcmVkUHVibGlzaGVzIiwiaWdub3JlZERlcGVuZGVuY2llcyIsImZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnMiLCJjb25maWd1cmF0aW9uIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7UUFLZ0JBO2VBQUFBOztRQThCQUM7ZUFBQUE7Ozt3QkFqQ2E7d0JBQzRHO0FBRWxJLFNBQVNEO0lBQ2QsSUFBTUUsTUFBTUMsb0NBQTBCLEVBQ2hDQyxRQUFRQyxzQ0FBNEIsRUFDcENDLFVBQVVDLHdDQUE4QixFQUN4Q0MsVUFBVUMsd0NBQThCLEVBQ3hDQyxVQUFVQyxzQkFBWSxFQUN0QkMsY0FBYyxFQUFFLEVBQ2hCQyxnQkFBZ0I7UUFDZFgsS0FBQUE7UUFDQUUsT0FBQUE7UUFDQUUsU0FBQUE7UUFDQUUsU0FBQUE7SUFDRixHQUNBTSxnQkFBZ0IsRUFBRSxFQUNsQkMsbUJBQW1CLEVBQUUsRUFDckJDLHNCQUFzQixFQUFFLEVBQ3hCQyw0QkFBNEIsRUFBRSxFQUM5QkMsZ0JBQWdCO1FBQ2RSLFNBQUFBO1FBQ0FFLGFBQUFBO1FBQ0FDLGVBQUFBO1FBQ0FDLGVBQUFBO1FBQ0FDLGtCQUFBQTtRQUNBQyxxQkFBQUE7UUFDQUMsMkJBQUFBO0lBQ0Y7SUFFTixPQUFPQztBQUNUO0FBRU8sU0FBU2pCLG1DQUFtQ2lCLGFBQWE7SUFDOUQsSUFBTVIsVUFBVUMsc0JBQVksRUFDdEJHLGdCQUFnQixFQUFFLEVBQ2xCQyxtQkFBbUIsRUFBRTtJQUUzQkcsZ0JBQWdCQyxPQUFPQyxNQUFNLENBQUNGLGVBQWU7UUFDM0NSLFNBQUFBO1FBQ0FJLGVBQUFBO1FBQ0FDLGtCQUFBQTtJQUNGO0lBRUEsT0FBT0c7QUFDVCJ9