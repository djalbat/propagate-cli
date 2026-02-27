"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "migrateConfigurationToVersion_1_10", {
    enumerable: true,
    get: function() {
        return migrateConfigurationToVersion_1_10;
    }
});
const _versions = require("../versions");
function migrateConfigurationToVersion_1_10(configuration) {
    const version = _versions.VERSION_1_10, ignoredBuilds = [], ignoredPublishes = [];
    configuration = Object.assign(configuration, {
        version,
        ignoredBuilds,
        ignoredPublishes
    });
    return configuration;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWd1cmF0aW9uL3ZlcnNpb25fMV8xMC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgVkVSU0lPTl8xXzEwIH0gZnJvbSBcIi4uL3ZlcnNpb25zXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzEwKGNvbmZpZ3VyYXRpb24pIHtcbiAgY29uc3QgdmVyc2lvbiA9IFZFUlNJT05fMV8xMCxcbiAgICAgICAgaWdub3JlZEJ1aWxkcyA9IFtdLFxuICAgICAgICBpZ25vcmVkUHVibGlzaGVzID0gW107XG5cbiAgY29uZmlndXJhdGlvbiA9IE9iamVjdC5hc3NpZ24oY29uZmlndXJhdGlvbiwge1xuICAgIHZlcnNpb24sXG4gICAgaWdub3JlZEJ1aWxkcyxcbiAgICBpZ25vcmVkUHVibGlzaGVzXG4gIH0pO1xuXG4gIHJldHVybiBjb25maWd1cmF0aW9uO1xufVxuIl0sIm5hbWVzIjpbIm1pZ3JhdGVDb25maWd1cmF0aW9uVG9WZXJzaW9uXzFfMTAiLCJjb25maWd1cmF0aW9uIiwidmVyc2lvbiIsIlZFUlNJT05fMV8xMCIsImlnbm9yZWRCdWlsZHMiLCJpZ25vcmVkUHVibGlzaGVzIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFJZ0JBOzs7ZUFBQUE7OzswQkFGYTtBQUV0QixTQUFTQSxtQ0FBbUNDLGFBQWE7SUFDOUQsTUFBTUMsVUFBVUMsc0JBQVksRUFDdEJDLGdCQUFnQixFQUFFLEVBQ2xCQyxtQkFBbUIsRUFBRTtJQUUzQkosZ0JBQWdCSyxPQUFPQyxNQUFNLENBQUNOLGVBQWU7UUFDM0NDO1FBQ0FFO1FBQ0FDO0lBQ0Y7SUFFQSxPQUFPSjtBQUNUIn0=